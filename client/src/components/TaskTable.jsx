// import { useEffect, useState } from "react";
// import { useTasks } from "../context/TasksContext";
// import { useAuth } from "../context/AuthContext";
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
// import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Importar el ícono de carga

// dayjs.extend(utc);
// dayjs.extend(timezone);

// function TaskTable() {
//     const { tasks, getTasks, deleteTask } = useTasks();
//     const { user } = useAuth();
//     const [loading, setLoading] = useState(true); // Estado de loading

//     useEffect(() => {
//         async function fetchTasks() {
//             await getTasks();
//             setLoading(false); // Detener el loading cuando las tareas están listas
//             console.log("tasks", tasks)
//         }
//         fetchTasks(); // Obtener las tareas
//     }, [getTasks]);

//     // Filtrar tareas basadas en el email del usuario
//     const filteredTasks = loading
//         ? [] // Mientras se carga, no hay tareas que mostrar
//         : user?.email === 'panamerican.pi@gmail.com'
//             ? tasks
//             : tasks.filter(task => task.user.email === user.email);

//     const handleDelete = (taskId) => {
//         const confirmed = window.confirm("Are you sure you want to delete this item?");
//         if (confirmed) {
//             deleteTask(taskId);
//         }
//     };

//     // if (loading) return <h1>Loading tasks...</h1>; // Mostrar loading mientras se obtienen las tareas
//     if (loading) return (
//         <div className="flex">
//           <ArrowPathIcon className="animate-spin h-5 w-5" /> {/* Indicador de carga */}
//           <span className="ml-2">Loading tasks...</span>
//         </div>
//       );

//     return (
//         <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
//             <table className="min-w-full text-left border-collapse">
//                 <thead>
//                     <tr className="border-b">
//                         <th className="text-white px-2 py-2 text-sm sm:text-xs">#</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Username</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Email</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Project ID</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Title</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Description</th>
//                         <th className="text-white px-2 py-1 text-sm sm:text-xs">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredTasks.map((task, index) => (
//                         <tr key={task._id} className="border-b border-zinc-600">
//                             <td className="text-zinc-400 px-2 py-2 text-sm sm:text-xs">{index + 1}</td>
//                             <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.username}</td>
//                             <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.email}</td>
//                             <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.projectId}</td>
//                             <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.title}</td>
//                             <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.description}</td>
//                             <td className={`px-2 py-1 text-sm sm:text-xs ${task.status === "Sent" ? "text-zinc-400" : ""} 
//                                 ${task.status === "Rejected" ? "text-red-700" : ""} 
//                                 ${task.status === "Accepted" ? "text-green-600" : ""}`}>
//                                 {task.status}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default TaskTable;

import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Importar el ícono de carga

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
            console.log(tasks)
        }
        fetchTasks();
    }, []);

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
        <div className="overflow-x-auto max-w-full"> {/* Asegúrate de que el contenedor sea del 100% */}
            <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-white px-2 py-2 text-sm sm:text-xs">#</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Username</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Email</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Project ID</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Title</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Description</th>
                        <th className="text-white px-2 py-1 text-sm sm:text-xs">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr key={task._id} className="border-b border-zinc-600">
                            <td className="text-zinc-400 px-2 py-2 text-sm sm:text-xs">{index + 1}</td>
                            <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.username}</td>
                            <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.email}</td>
                            <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.projectId}</td>
                            <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.title}</td>
                            <td className="text-zinc-400 px-2 py-1 text-sm sm:text-xs">{task.description}</td>
                            <td className={`px-2 py-1 text-sm sm:text-xs ${task.status === "Sent" ? "text-zinc-400" : ""} 
                                ${task.status === "Rejected" ? "text-red-700" : ""} 
                                ${task.status === "Accepted" ? "text-green-600" : ""}`}>
                                {task.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
