import { createSlice } from "@reduxjs/toolkit";
import { loadTasksFromLocalStorage } from ".../components/LocalStorageUtils.js";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadTasksFromLocalStorage,
  reducers: {
    addTask: (state, action) => {
    },
    deleteTask: (state, action) => {
      
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default shoppingSlice.reducer;