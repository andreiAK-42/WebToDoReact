import React, { useState, useEffect } from "react";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder.jsx";
import { loadTasksFromLocalStorage } from "./components/LocalStorageUtils.js";

function Index() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const handleTaskClick = (event, taskId) => {
    if (event.target.className == "task-card") {
      setSelectedTaskId(taskId);
    }
  };

  return (
    <>
      <TaskAdder onAddTask={handleAddTask} />

      <div className="tasks-container">
        {tasks.map((task) => (
          <div>
            <div
              key={task.id}
              className="task-card"
              onClick={() => handleTaskClick(event, task.id)}
            >
              <div className="text-task-card">
                <h1>{task.taskTitle}</h1>
                <p>{task.taskAbout}</p>
              </div>
              <div className="delete-button-task-card"></div>
            </div>
            <div
              className={`menu-task-container ${
                selectedTaskId === task.id ? "visible" : ""
              }`}
            >
              <div className="share-task-button"></div>
              <div className="about-task-button"></div>
              <div className="edit-task-button"></div>
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

      <div className="delete-task-container">
        <div className="delete-task-horizontal-wall"></div>
        <h1>Delete this task?</h1>
        <div className="delete-task-buttons-container">
          <div className="delete-task-buttons">
            <div className="confirm-delete-task-button">
              <p>Yes</p>
            </div>
            <div className="cancel-delete-task-button">
              <p>No</p>
            </div>
          </div>
        </div>
      </div>

      <div className="edit-task-container">
        <div className="edit-task">
          <div className="edit-task-inputs-container">
            <input id="inputEditTaskTitle" placeholder="Mini Input..." />
            <input id="inputEditTaskAbout" placeholder="Max Input..." />
          </div>

          <div className="edit-buttons-container">
            <div className="cancel-edit-task-button">
              <p>Cancel</p>
            </div>
            <div className="confirm-edit-task-button">
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>

      <div className="share-menu-container">
        <div className="share-menu">
          <div id="copy" className="round-share-button">
            <img src="../assets/images/Content copy.png" />
          </div>
          <div id="vk" className="round-share-button">
            <img src="../assets/images/vk-svgrepo-com 1.png" />
          </div>
          <div id="telegram" className="round-share-button">
            <img src="../assets/images/telegram-svgrepo-com 1.png" />
          </div>
          <div id="whatsapp" className="round-share-button">
            <img src="../assets/images/whatsapp-svgrepo-com (1) 1.png" />
          </div>
          <div id="facebook" className="round-share-button">
            <img src="../assets/images/facebook-alt-svgrepo-com 1.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
