import { useState, useEffect } from "react";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder.jsx";
import TaskShare from "./components/TaskShare.jsx";
import TaskEdit from "./components/TaskEdit.jsx";
import TaskDelete from "./components/TaskDelete.jsx";
import { loadTasksFromLocalStorage } from "./components/LocalStorageUtils.js";

function Index() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToShare, setTaskToShare] = useState(null);

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const handleTaskClick = (event, taskId) => {
    if (event.target.className == "task-card") {
      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
      } else {
        setSelectedTaskId(taskId);
      }
    }
  };

  const handleDeleteClick = (event, taskId) => {
    event.stopPropagation();
    setTaskToDelete(taskId);
  };

  const handleShareTask = (event, taskId) => {
    if (taskToShare === taskId) {
      setTaskToShare(null);
    } else {
      setTaskToShare(taskId);
    }
  };

    const handleEditTask = (event, taskId) => {
      setTaskToEdit(taskId);
    };

  return (
    <>
      <TaskAdder onAddTask={handleAddTask} />

      <div className="tasks-container">
        {tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <div key={task.id}>
              <div
                className="task-card"
                onClick={() => handleTaskClick(event, task.id)}
              >
                <div className="text-task-card">
                  <h1>{task.taskTitle}</h1>
                  <p>{task.taskAbout}</p>
                </div>
                <div
                  className="delete-button-task-card"
                  onClick={() => handleDeleteClick(event, task.id)}
                ></div>
              </div>
              <div
                className={`menu-task-container ${
                  selectedTaskId === task.id ? "visible" : ""
                }`}
              >
                <div
                  className="share-task-button"
                  onClick={() => handleShareTask(event, task.id)}
                ></div>
                <div className="about-task-button"></div>
                <div
                  className="edit-task-button"
                  onClick={() => handleEditTask(event, task.id)}
                ></div>
              </div>
            </div>
          ))}
      </div>

      {tasks.length === 0 && (
        <div className="no-task-container">
          <div className="wall-no-task"></div>
          <div className="text-no-task-container">
            <p>No tasks</p>
          </div>
          <div className="wall-no-task"></div>
        </div>
      )}

      <div className="black-background"></div>

      <TaskDelete
        taskId={taskToDelete}
        onCancelDelete={() => setTaskToDelete(null)}
        setTasks={setTasks}
      />
      <TaskEdit
        taskId={taskToEdit}
        onCancelEdit={() => setTaskToEdit(null)}
        setTasks={setTasks}
        tasks={tasks}
      />
      <TaskShare
        taskId={taskToShare}
        onTaskShare={() => setTaskToShare(null)}
      />
    </>
  );
}

export default Index;
