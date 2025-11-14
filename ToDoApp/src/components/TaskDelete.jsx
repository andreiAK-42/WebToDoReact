import { useState, useEffect } from "react";
import { deleteTaskFromLocalStorage } from "./LocalStorageUtils.js";

function TaskDelete({ taskId, onCancelDelete, setTasks }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!taskId);
  }, [taskId]);

  const handleConfirmDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    onCancelDelete();
    setIsVisible(false);

    deleteTaskFromLocalStorage(taskId);
  };

  const handleCancelDelete = () => {
    setIsVisible(false);
    onCancelDelete();
  };

  return (
    <>
      <div
        className={`delete-task-container ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="delete-task-horizontal-wall"></div>
        <h1>Delete this task?</h1>
        <div className="delete-task-buttons-container">
          <div className="delete-task-buttons">
            <div
              className="confirm-delete-task-button"
              onClick={handleConfirmDelete}
            >
              <p>Yes</p>
            </div>
            <div
              className="cancel-delete-task-button"
              onClick={handleCancelDelete}
            >
              <p>No</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDelete;
