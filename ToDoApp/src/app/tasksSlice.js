import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

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
    togglePin: (state, action) => {
      const id = action.payload;
      const target = state.find((t) => t.id === id);
      if (!target) return state;

      const pinned = state.filter((t) => t.pinned);
      const regular = state.filter((t) => !t.pinned);

      if (target.pinned) {
        const newPinned = pinned.filter((t) => t.id !== id);
        const newRegular = [{ ...target, pinned: false }, ...regular];
        return [...newPinned, ...newRegular];
      }

      if (pinned.length >= 3) return state;
      const newRegular = regular.filter((t) => t.id !== id);
      const newPinned = [...pinned, { ...target, pinned: true }];
      return [...newPinned, ...newRegular];
    },
    reorderTasks: (state, action) => {
      const { activeId, overId } = action.payload;
      if (!overId || activeId === overId) return state;

      const pinned = state.filter((t) => t.pinned);
      const regular = state.filter((t) => !t.pinned);

      const oldIndex = regular.findIndex((t) => t.id === activeId);
      const newIndex = regular.findIndex((t) => t.id === overId);
      if (oldIndex === -1 || newIndex === -1) return state;

      const reordered = arrayMove(regular, oldIndex, newIndex);
      return [...pinned, ...reordered];
    },
  },
});

export const {
  setTasks,
  addTask,
  replaceTask,
  removeTask,
  togglePin,
  reorderTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;

