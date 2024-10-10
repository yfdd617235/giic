import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import { ADMIN } from "../projects"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ArrowPathIcon, PaperClipIcon, PencilIcon, PencilSquareIcon, TrashIcon, XCircleIcon, FolderArrowDownIcon } from '@heroicons/react/24/outline';

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
        : user?.email === ADMIN
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
        <div className="overflow-x-auto max-w-full pt-20 "> {/* Asegúrate de que el contenedor sea del 100% */}
            <h1 className="font-bold mb-1">Payments History</h1>
            <table className="bg-white bg-opacity-50 min-w-full text-left border-collapse rounded-md">

                <thead className="">
                    <tr className="border-b border-black">
                        <th className="text-black px-2 py-1 text-xs sm:text-sm"><FolderArrowDownIcon className="h-4 w-4 text-sky-800" /></th>
                        <th className="text-black px-2 py-2 text-xs sm:text-sm">#</th>
                        {/* <th className="text-black px-2 py-1 text-xs sm:text-sm">Username</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Email</th> */}
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Project ID</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Client</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Amount</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Status</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Uploaded</th>
                        <th className="text-black px-2 py-1 text-xs sm:text-sm">Actions</th>

                    </tr>
                </thead>
                <tbody className="">
                    {filteredTasks.map((task, index) => (
                        <tr key={task._id} className="border-b border-black">

                            <td className="text-xs sm:text-sm">
                                {task.file && (
                                    <a href={task.file} target="_blank" rel="noopener noreferrer" className="text-black flex justify-center">
                                        <PaperClipIcon className="h-5 w-5 text-sky-800" />
                                        <span className="sr-only">Attachment</span> {/* Texto oculto solo para lectores de pantalla */}
                                    </a>
                                )}
                            </td>
                            <td className="px-2 py-2 text-sm sm:text-xs">{index + 1}</td>
                            {/* <td className="px-2 py-1 text-sm sm:text-xs">{task.username}</td>
                            <td className="px-2 py-1 text-sm sm:text-xs">{task.email}</td> */}
                            <td className="px-2 py-1 text-sm sm:text-xs">{task.projectId}</td>
                            <td className="px-2 py-1 text-sm sm:text-xs">{task.title}</td>
                            <td className="px-2 py-1 text-sm sm:text-xs">{task.description} <strong>USD</strong></td>
                            <td className={`px-2 py-1 text-sm sm:text-xs ${task.status === "Sent" ? "text-zinc-500" : ""} 
                                ${task.status === "Rejected" ? "text-red-600 font-bold" : ""} 
                                ${task.status === "Accepted" ? "text-green-600 font-bold" : ""}`}>
                                {task.status}
                            </td>
                            <td className="text-black px-2 py-1 text-sm sm:text-xs">
                                {dayjs(task.updatedAt).tz("America/Bogota").format("DD/MMM/YYYY hh:mm:ss A")}
                            </td>

                            <td className="text-xs sm:text-sm">
                                <div className="flex gap-x-3 justify-center">
                                    <Link to={`/tasks/${task._id}`} className="">
                                        <PencilSquareIcon className="h-4 w-4 text-zinc-700" />
                                    </Link>
                                    <button onClick={() => handleDelete(task._id)} className="">
                                        <XCircleIcon className="h-4 w-4 text-red-600 " />
                                    </button>
                                </div>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
