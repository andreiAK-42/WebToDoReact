import { useState, useEffect } from "react";
import TaskEdit from "../TaskEdit/TaskEdit.jsx";
import TaskDelete from "../TaskDelete/TaskDelete.jsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";

export const Task = ({ id, title, about }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleTaskClick = (event) => {
    if (event.target.className == "task-card") {
      if (selectedTaskId === true) {
        setSelectedTaskId(false);
      } else {
        setSelectedTaskId(true);
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

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="task-card"
        onClick={() => handleTaskClick(event)}
      >
        <div className="text-task-card">
          <h1>{title}</h1>
          <p>{about}</p>
        </div>
        <div
          className="delete-button-task-card"
          onClick={() => handleDeleteClick(event, id)}
        ></div>
      </div>
      <div
        className={`menu-task-container ${
          selectedTaskId === id ? "visible" : ""
        }`}
      >
        <div
          className="share-task-button"
          onClick={() => handleShareTask(event, id)}
        ></div>
        <div className="about-task-button"></div>
        <div
          className="edit-task-button"
          onClick={() => handleEditTask(event, id)}
        ></div>
      </div>

      <TaskDelete onCancelDelete={() => setTaskToDelete(null)} />
    </>
  );
};
