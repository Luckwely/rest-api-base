import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";

export interface initialStateInterface {
    lists: Task[];
}

const initialState: initialStateInterface = {
    lists: []
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updateTask: () => { },
    }
});

export const {
    updateTask
} = postSlice.actions;

export default postSlice.reducer;