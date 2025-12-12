import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { loadTasksFromLocalStorage } from "../components/LocalStorageUtils.js";

const preloadedState = {
  tasks: loadTasksFromLocalStorage().map((task) => ({
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

export default store;
