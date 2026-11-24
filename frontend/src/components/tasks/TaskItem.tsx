import { useDispatch } from "react-redux";
import type { Task } from "../../types/task"
import { deleteTask } from "../../app/features/taskSlice";

type Props = {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    const dispatch = useDispatch();
    const remove = () => {
        dispatch(deleteTask(task.id));
    }

    return (
        <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg ${task.status ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                }`}>
            <div className="flex items-center gap-3">
                <span className={`text-gray-700 ${task.status ? "line-through text-gray-400" : ""
                    }`}>{task.title}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${task.status ? "bg-greeen-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {task.status ? "Termnee" : "en cours"}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <button type="button" className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md">Editer</button>
                <button onClick={()=>remove()} type="button" className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md">Supprimer</button>
            </div>
        </li>
    )
}