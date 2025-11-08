import React, { useState } from "react";
import { saveTaskToLocalStorage } from "./LocalStorageUtils.js";

function TaskAdder({ onAddTask }) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAbout, setInputAbout] = useState("");

  const handleAddNewTaskClick = () => {
    const taskId = Math.floor(Date.now() / 1000);

    const newTask = {
      id: taskId,
      taskTitle: inputTitle,
      taskAbout: inputAbout,
    };

    saveTaskToLocalStorage(inputTitle, inputAbout, taskId);
    onAddTask(newTask);
    setInputTitle("");
    setInputAbout("");
  };

  const handleSetTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleSetAbout = (event) => {
    setInputAbout(event.target.value);
  };

  return (
    <>
      <div className="add-task-container">
        <div className="add-task-inputs-container">
          <input
            value={inputTitle}
            onInput={handleSetTitle}
            placeholder="Title..."
          />
          <input
            value={inputAbout}
            onInput={handleSetAbout}
            placeholder="About..."
          />
        </div>

        <div onClick={handleAddNewTaskClick} className="add-task-button"></div>
      </div>
    </>
  );
}

export default TaskAdder;
