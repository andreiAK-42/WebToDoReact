const saveTaskToLocalStorage = (taskTitle, taskAbout, id) => {
  const localTasksString = window.localStorage.getItem("saveTaskList");
  var localTasksArray = [];

  if (localTasksString) {
    localTasksArray = JSON.parse(localTasksString);
  } else {
    localTasksArray = [];
  }

  localTasksArray.push({ id: id, taskTitle: taskTitle, taskAbout: taskAbout });
  window.localStorage.setItem("saveTaskList", JSON.stringify(localTasksArray));
};

const deleteTaskFromLocalStorage = (id) => {
  const localTasksString = window.localStorage.getItem("saveTaskList");

  if (localTasksString) {
    const localTasksArray = JSON.parse(localTasksString);

    localTasksArray.splice(
      localTasksArray.findIndex((task) => task.id === id),
      1
    );
    window.localStorage.setItem(
      "saveTaskList",
      JSON.stringify(localTasksArray)
    );
  }
};

const loadTasksFromLocalStorage = () => {
  const localTasksString = window.localStorage.getItem("saveTaskList");

  if (localTasksString) {
    return JSON.parse(localTasksString);
  }
  else {
    return []
  }
}

export {
  saveTaskToLocalStorage,
  deleteTaskFromLocalStorage,
  loadTasksFromLocalStorage
};
