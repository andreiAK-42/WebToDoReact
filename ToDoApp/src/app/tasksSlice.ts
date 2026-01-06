import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task } from "../types/task";

interface ReplaceTaskPayload {
  id: number;
  changes: Partial<Omit<Task, "id">>;
}

interface ReorderTasksPayload {
  activeId: number | string;
  overId: number | string;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    setTasks: (_state: Task[], action: PayloadAction<Task[]>) => action.payload,
    addTask: (state: Task[], action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    replaceTask: (state: Task[], action: PayloadAction<ReplaceTaskPayload>) => {
      const { id, changes } = action.payload;
      const index = state.findIndex((task: Task) => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    removeTask: (state: Task[], action: PayloadAction<number>) =>
      state.filter((task: Task) => task.id !== action.payload),
    togglePin: (state: Task[], action: PayloadAction<number>) => {
      const id = action.payload;
      const target = state.find((t: Task) => t.id === id);
      if (!target) return state;

      const pinned = state.filter((t: Task) => t.pinned);
      const regular = state.filter((t: Task) => !t.pinned);

      if (target.pinned) {
        const newPinned = pinned.filter((t: Task) => t.id !== id);
        const newRegular = [{ ...target, pinned: false }, ...regular];
        return [...newPinned, ...newRegular];
      }

      if (pinned.length >= 3) return state;
      const newRegular = regular.filter((t: Task) => t.id !== id);
      const newPinned = [...pinned, { ...target, pinned: true }];
      return [...newPinned, ...newRegular];
    },
    reorderTasks: (state: Task[], action: PayloadAction<ReorderTasksPayload>) => {
      const { activeId, overId } = action.payload;
      if (!overId || activeId === overId) return state;

      const pinned = state.filter((t: Task) => t.pinned);
      const regular = state.filter((t: Task) => !t.pinned);

      const oldIndex = regular.findIndex((t: Task) => t.id === activeId);
      const newIndex = regular.findIndex((t: Task) => t.id === overId);
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
