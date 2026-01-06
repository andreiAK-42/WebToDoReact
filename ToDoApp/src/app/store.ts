import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { loadTasksFromLocalStorage } from "../components/LocalStorageUtils";
import type { Task } from "../types/task";

const preloadedState = {
  tasks: loadTasksFromLocalStorage().map((task: Task) => ({
    ...task,
    pinned: !!task.pinned,
  })),
};

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
