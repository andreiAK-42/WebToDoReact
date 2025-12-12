const STORAGE_KEY = "saveTaskList";

export const loadTasksFromLocalStorage = () => {
  try {
    const localTasksString = window.localStorage.getItem(STORAGE_KEY);
    if (localTasksString) {
      return JSON.parse(localTasksString);
    }
  } catch (error) {
    console.error("Ошибка чтения localStorage", error);
  }
  return [];
};

export const saveTasksToLocalStorage = (tasks) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Ошибка записи localStorage", error);
  }
};
