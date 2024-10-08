// import { Link } from "react-router-dom";
// import { useTasks } from "../context/TasksContext";
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// dayjs.extend(utc);
// dayjs.extend(timezone);

// function TaskCard({ task }) {
//     const { deleteTask } = useTasks();

//     const handleDelete = () => {
//         const confirmed = window.confirm("Are you sure you want to delete this item?");
//         if (confirmed) {
//             deleteTask(task._id);
//         }
//     };

//     return (
//         <div className="max-w-md w-full p-4 rounded-md flex flex-col justify-between border border-zinc-700 transition-colors duration-300 hover:bg-zinc-900">
//             <header className="flex justify-between">
//                 <p className="text-zinc-600 break-words">#: {task.projectId}</p>
//                 <div className="flex gap-x-2 items-center">
//                     <Link className="text-zinc-400" to={`/tasks/${task._id}`}>
//                         <PencilIcon className="h-3 w-5" />
//                     </Link>
//                     <button className="text-zinc-400" onClick={handleDelete}>
//                         <TrashIcon className="h-4 w-5" />
//                     </button>
//                 </div>
//             </header>
//             <h1 className="text-lg font-bold break-words">{task.title}</h1>
//             <p className="text-zinc-400 break-words whitespace-normal">{task.description}</p>

//             {task.file && (
//                 <div className="flex items-center gap-2">
//                     <a href={task.file} className="text-sky-500" target="_blank" rel="noopener noreferrer" download>
//                         Download File
//                     </a>
//                 </div>
//             )}

//             <div className="text-xs text-zinc-600">
//                 <p className="break-words whitespace-normal">Created: {dayjs(task.createdAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}</p>
//                 <p className="break-words whitespace-normal">Updated: {dayjs(task.updatedAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}</p>
//             </div>
//             <div className="text-xs mt-2 flex justify-end">
//                 <p className={`
//                     ${task.status === "Sent" ? "text-zinc-400" : ""} 
//                     ${task.status === "Rejected" ? "text-red-700" : ""} 
//                     ${task.status === "Accepted" ? "text-green-600" : ""}`}
//                 >
//                     {task.status}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default TaskCard;
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

dayjs.extend(utc);
dayjs.extend(timezone);

function TaskCard({ task }) {
    const { deleteTask } = useTasks();

    const handleDelete = (e) => {
        e.preventDefault();  // Evita que el enlace principal maneje el clic
        e.stopPropagation();  // Evita la propagación del evento clic al enlace principal
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            deleteTask(task._id);
        }
    };

    return (
        <a 
            href={task.file || '#'} 
            className="relative max-w-md w-full p-4 rounded-md flex flex-col justify-between border border-zinc-700 transition-colors duration-300 hover:bg-zinc-800" 
            target="_blank" 
            rel="noopener noreferrer" 
            // download
        >
            <header className="flex justify-between relative z-20">
                <p className="text-zinc-600 break-words">#: {task.projectId}</p>
                <div className="flex gap-x-2 items-center">
                    <Link className="text-zinc-400" to={`/tasks/${task._id}`} onClick={(e) => e.stopPropagation()}>
                        <PencilIcon className="h-3 w-5" />
                    </Link>
                    <button className="text-zinc-400" onClick={handleDelete}>
                        <TrashIcon className="h-4 w-5" />
                    </button>
                </div>
            </header>
            <h1 className="text-lg font-bold break-words relative z-20">{task.title}</h1>
            <p className="text-zinc-400 break-words whitespace-normal relative z-20">{task.description}</p>

            <div className="text-xs text-zinc-600 relative z-20">
                <p className="break-words whitespace-normal">Created: {dayjs(task.createdAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}</p>
                <p className="break-words whitespace-normal">Updated: {dayjs(task.updatedAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}</p>
            </div>
            <div className="text-xs mt-2 flex justify-end relative z-20">
                <p className={` 
                    ${task.status === "Sent" ? "text-zinc-400" : ""} 
                    ${task.status === "Rejected" ? "text-red-700" : ""} 
                    ${task.status === "Accepted" ? "text-green-600" : ""}`}
                >
                    {task.status}
                </p>
            </div>
        </a>
    );
}

export default TaskCard;

