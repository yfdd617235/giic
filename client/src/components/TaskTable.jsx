// import { useEffect, useState } from "react";
// import { useTasks } from "../context/TasksContext";
// import { useAuth } from "../context/AuthContext";
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { ArrowPathIcon, PaperClipIcon } from '@heroicons/react/24/outline'; // Importar el ícono de carga

// dayjs.extend(utc);
// dayjs.extend(timezone);

// function TaskTable() {
//     const { tasks, getTasks, deleteTask } = useTasks();
//     const { user } = useAuth();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchTasks() {
//             await getTasks();
//             setLoading(false);
//             console.log(tasks)
//         }
//         fetchTasks();
//     }, []);

//     const filteredTasks = loading
//         ? []
//         : user?.email === 'panamerican.pi@gmail.com'
//             ? tasks
//             : tasks.filter(task => task.user.email === user.email);

//     const handleDelete = (taskId) => {
//         const confirmed = window.confirm("Are you sure you want to delete this item?");
//         if (confirmed) {
//             deleteTask(taskId);
//         }
//     };

//     if (loading) return (
//         <div className="flex items-center justify-center h-screen">
//             <ArrowPathIcon className="animate-spin h-5 w-5" />
//             <span className="ml-2">Loading tasks...</span>
//         </div>
//     );

//     return (
//         <div className='flex h-screen w-screen items-center justify-center overflow-auto'
//             style={{
//                 backgroundImage: `
//       linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
//       url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundPosition: 'center center'
//             }}>
//             <div className="bg-white bg-opacity-35 overflow-x-auto max-w-full"> {/* Asegúrate de que el contenedor sea del 100% */}
//                 <table className="min-w-full text-left border-collapse">
//                     <thead>
//                         <tr className="border-b">
//                             <th className="text-black px-2 py-2 text-sm sm:text-xs">#</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Username</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Email</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Project ID</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Title</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Description</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Status</th>
//                             <th className="text-black px-2 py-1 text-sm sm:text-xs">Attachment</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredTasks.map((task, index) => (
//                             <tr key={task._id} className="border-b border-zinc-600">
//                                 <td className="text-black px-2 py-2 text-sm sm:text-xs">{index + 1}</td>
//                                 <td className="text-black px-2 py-1 text-sm sm:text-xs">{task.username}</td>
//                                 <td className="text-black px-2 py-1 text-sm sm:text-xs">{task.email}</td>
//                                 <td className="text-black px-2 py-1 text-sm sm:text-xs">{task.projectId}</td>
//                                 <td className="text-black px-2 py-1 text-sm sm:text-xs">{task.title}</td>
//                                 <td className="text-black px-2 py-1 text-sm sm:text-xs">{task.description}</td>
//                                 <td className={`px-2 py-1 text-sm sm:text-xs ${task.status === "Sent" ? "text-zinc-400" : ""} 
//                                 ${task.status === "Rejected" ? "text-red-700" : ""} 
//                                 ${task.status === "Accepted" ? "text-green-600 font-bold" : ""}`}>
//                                     {task.status}
//                                 </td>
//                                 <td className="px-2 py-1 text-sm sm:text-xs">
//                                     {task.file && (
//                                         <a href={task.file} target="_blank" rel="noopener noreferrer" className="text-black flex items-center space-x-1">
//                                             <PaperClipIcon className="h-4 w-4 text-sky-800" />
//                                             <span className="sr-only">Attachment</span>
//                                         </a>
//                                     )}
//                                 </td>
                                
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default TaskTable;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ArrowPathIcon, PaperClipIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

dayjs.extend(utc);
dayjs.extend(timezone);

function TaskTable() {
    const { tasks, getTasks, deleteTask } = useTasks();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            await getTasks();
            setLoading(false);
        }
        fetchTasks();
    }, [getTasks]);

    const filteredTasks = loading
        ? []
        : user?.email === 'panamerican.pi@gmail.com'
            ? tasks
            : tasks.filter(task => task.user.email === user.email);

    const handleDelete = (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            deleteTask(taskId);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <ArrowPathIcon className="animate-spin h-5 w-5" />
            <span className="ml-2">Loading tasks...</span>
        </div>
    );

    return (
        // <div className='flex h-full w-full items-center justify-center'
        //     style={{
        //         backgroundImage: `linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
        //         url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
        //         backgroundSize: 'cover',
        //         backgroundRepeat: 'no-repeat',
        //         backgroundPosition: 'center center'
        //     }}>
        <div className="w-full h-full bg-blue-900 bg-opacity-15 pt-32 border border-red-700">
        <div className="border border-yellow-600 lg:px-28">
            <table className="lg:w-4/5 text-center">
                <thead>
                    <tr className="border-b border-black">
                        <th className="text-black px-2 py-2 text-xs sm:text-sm">#</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Username</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Email</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Project ID</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Title</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Description</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Status</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Updated</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Actions</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Attachment</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr key={task._id} className="border-b border-black">
                            <td className="text-black px-2 py-2 text-xs sm:text-sm">{index + 1}</td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">{task.username}</td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">{task.email}</td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">{task.projectId}</td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">{task.title}</td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">{task.description}</td>
                            <td className={`px-2 py-1 text-xs sm:text-sm 
                                ${task.status === "Sent" ? "text-zinc-400" : ""} 
                                ${task.status === "Rejected" ? "text-red-700" : ""} 
                                ${task.status === "Accepted" ? "text-green-600 font-bold" : ""}`}>
                                {task.status}
                            </td>
                            <td className="text-black px-2 py-1 text-xs sm:text-sm">
                                {dayjs(task.updatedAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}
                            </td>
                            <td className="text-xs sm:text-sm ">
                                <div className="flex gap-x-2 justify-center">
                                    <Link to={`/tasks/${task._id}`} className="text-black">
                                        <PencilIcon className="h-4 w-4" />
                                    </Link>
                                    <button onClick={() => handleDelete(task._id)} className="text-black">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                            <td className=" text-xs sm:text-sm ">
                                {task.file && (
                                    <a href={task.file} target="_blank" rel="noopener noreferrer" className="text-black flex justify-center space-x-1">
                                        <PaperClipIcon className="h-4 w-4 text-sky-800" />
                                        <span className="sr-only">Attachment</span>
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    
        // </div>
    );
}

export default TaskTable;
