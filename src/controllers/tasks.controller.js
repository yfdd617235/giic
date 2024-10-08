import Task from '../models/task.model.js';
import { uploadFileToCloudinary } from '../middlewares/multermiddleware.js';
import cloudinary from '../cloudinary.js';
import { ADMIN_EMAIL } from '../config.js'

export const getTasks = async (req, res) => {
    const { projectId } = req.query;
    try {
        const query = {};
        if (projectId) {
            query.projectId = projectId;
        }

        const tasks = await Task.find(query).populate('user');
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// export const getTasks = async (req, res) => {
//     const { projectId } = req.query;

//     try {
//         // Verifica si el usuario logueado es el administrador
//         const isAdmin = req.user.email === ADMIN_EMAIL;

//         // Construye la consulta según si es administrador o no
//         let query = {};
//         if (!isAdmin) {
//             // Si no es administrador, filtra por el usuario logueado
//             query.user = req.user.id;
//         }

//         // Filtra por projectId si fue proporcionado
//         if (projectId) {
//             query.projectId = projectId;
//         }

//         const tasks = await Task.find(query).populate('user');
//         res.json(tasks);
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// };


export const createTask = async (req, res) => {
    try {
        const { title, description, date, projectId, status, email, username } = req.body;
        const file = req.file;

        let fileUrl = null;
        let filePublicId = null;

        if (file) {
            const uploadResult = await uploadFileToCloudinary(file);
            fileUrl = uploadResult.secure_url;
            filePublicId = uploadResult.public_id;  // Guardamos el `public_id` del archivo en Cloudinary
        }

        const newTask = new Task({
            projectId,
            title,
            description,
            date,
            user: req.user.id,
            username,  // Guardamos el nombre de usuario
            email,     // Guardamos el email
            file: fileUrl,  // Guardamos la URL del archivo
            filePublicId,   // Guardamos el `public_id` para futuras eliminaciones
            status
        });

        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};

// export const deleteTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) return res.status(404).json({ message: 'Task not found' });

//         //Si existe un archivo, lo eliminamos de Cloudinary
//         if (task.filePublicId) {
//             await cloudinary.uploader.destroy(task.filePublicId);
//         }
//         return res.sendStatus(204);
//     } catch (error) {
//         return res.status(404).json({ message: "Task not found" });
//     }
// };

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Si existe un archivo, lo eliminamos de Cloudinary
        if (task.filePublicId) {
            try {
                // Intenta eliminar el archivo como 'raw'
                const result = await cloudinary.uploader.destroy(task.filePublicId, { resource_type: "Raw" });
                console.log("Cloudinary destroy result:", result);

                if (result.result !== 'ok') {
                    // Si la eliminación falla, intenta eliminarlo como imagen/video
                    const fallbackResult = await cloudinary.uploader.destroy(task.filePublicId);
                    console.log("Fallback Cloudinary destroy result:", fallbackResult);
                }
            } catch (error) {
                console.error("Error deleting file from Cloudinary:", error);
            }
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};



export const updateTask = async (req, res) => {
    try {
        const existingTask = await Task.findById(req.params.id);
        if (!existingTask) return res.status(404).json({ message: 'Task not found' });

        const { title, description, date, projectId, status } = req.body;
        const file = req.file;

        const updateData = { title, description, date, status };

        // Solo actualiza el projectId si fue proporcionado, de lo contrario, mantén el actual
        if (projectId) {
            updateData.projectId = projectId;
        } else {
            updateData.projectId = existingTask.projectId;
        }

        if (file) {
            // Si hay un archivo existente, lo eliminamos de Cloudinary
            if (existingTask.filePublicId) {
                await cloudinary.uploader.destroy(existingTask.filePublicId);
            }

            // Subimos el nuevo archivo
            const uploadResult = await uploadFileToCloudinary(file);
            updateData.file = uploadResult.secure_url;
            updateData.filePublicId = uploadResult.public_id;
        } else {
            updateData.file = existingTask.file;
            updateData.filePublicId = existingTask.filePublicId;
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

