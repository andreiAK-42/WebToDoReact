import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (_state, action) => action.payload,
    addTask: (state, action) => {
      state.push(action.payload);
    },
    replaceTask: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    removeTask: (state, action) =>
      state.filter((task) => task.id !== action.payload),
  },
});

export const { setTasks, addTask, replaceTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;

