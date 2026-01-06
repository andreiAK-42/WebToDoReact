import type { Task } from "../types/task";

const STORAGE_KEY = "saveTaskList";

export const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const localTasksString = window.localStorage.getItem(STORAGE_KEY);
    if (localTasksString) {
      return JSON.parse(localTasksString) as Task[];
    }
  } catch (error) {
    console.error("Ошибка чтения localStorage", error);
  }
  return [];
};

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Ошибка записи localStorage", error);
  }
};
