import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/taskSlice';
import postReducer from './features/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    posts: postReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store