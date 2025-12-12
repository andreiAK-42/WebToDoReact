import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceTask } from "../../app/tasksSlice";
import "./TaskEdit.css";

function TaskEdit({ taskId, onCancelEdit }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [isVisible, setIsVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAbout, setEditedAbout] = useState("");

  useEffect(() => {
    setIsVisible(!!taskId);
    if (taskId) {
      const taskToEdit = tasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        setEditedTitle(taskToEdit.taskTitle || "");
        setEditedAbout(taskToEdit.taskAbout || "");
      }
    }
  }, [taskId, tasks]);

  const handleConfirmEdit = () => {
    if (!taskId) return;

    dispatch(
      replaceTask({
        id: taskId,
        changes: { taskTitle: editedTitle, taskAbout: editedAbout },
      })
    );

    setIsVisible(false);
    onCancelEdit?.();

    setEditedTitle("");
    setEditedAbout("");
  };

  const handleCancelEdit = () => {
    setIsVisible(false);
    onCancelEdit?.();
    setEditedTitle("");
    setEditedAbout("");
  };

  return (
    <>
      <div
        className={`edit-task-container ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="edit-task">
          <div className="edit-task-inputs-container">
            <input
              id="inputEditTaskTitle"
              placeholder="Mini Input..."
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              id="inputEditTaskAbout"
              placeholder="Max Input..."
              value={editedAbout}
              onChange={(e) => setEditedAbout(e.target.value)}
            />
          </div>

          <div className="edit-buttons-container">
            <div className="cancel-edit-task-button" onClick={handleCancelEdit}>
              <p>Cancel</p>
            </div>
            <div
              className="confirm-edit-task-button"
              onClick={handleConfirmEdit}
            >
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskEdit;

