import React from 'react'
import Container from '../components/container'
import TaskItem from '../components/tasks/TaskItem'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store';

export default function TaskPage() {
    const tasks = useSelector((state: RootState)=>state.tasks.lists);
  return (
    <Container>
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Les taches</h2>
            <button>Nouveau</button>
        </div>
        <ul className="space-y-3">
            {tasks.map((task)=>(
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    </Container>
  )
}
