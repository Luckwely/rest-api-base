import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";

export interface initialStateInterface {
    lists: Task[];
    favories: any | null;
}

const initialState: initialStateInterface = {
    lists: [
        {
            id: 'azer',
            title: 'react',
            status: true
        },
        {
            id: 'ertu',
            title: 'vue js',
            status: false
        },
        {
            id: 'poiu',
            title: 'svelte',
            status: true
        },
    ],
    favories: { id: 'azer' },
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.lists = state.lists.filter((task: Task) => task.id !== taskId);
        },
        createTask: () => { },
        editTask: () => { },
        updateTask: () => { },
    }
});

export const {
    deleteTask,
    editTask,
    createTask,
    updateTask
} = taskSlice.actions;

export default taskSlice.reducer;