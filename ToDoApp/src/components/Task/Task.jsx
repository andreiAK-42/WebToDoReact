import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { removeTask, togglePin } from "../../app/tasksSlice";
import "./Task.css";

export const Task = ({ id, title, about, pinned }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const sortable = pinned
    ? null
    : useSortable({
        id,
        activationConstraint: { distance: 5 },
      });
  const attributes = sortable ? sortable.attributes : {};
  const listeners = sortable ? sortable.listeners : {};
  const setNodeRef = sortable ? sortable.setNodeRef : undefined;
  const style = sortable
    ? { transition: sortable.transition, transform: CSS.Transform.toString(sortable.transform) }
    : {};

  const handleCardClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(removeTask(id));
    setMenuOpen(false);
  };

  const handlePin = (event) => {
    event.stopPropagation();
    dispatch(togglePin(id));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`task-card ${pinned ? "pinned" : ""}`}
        onClick={handleCardClick}
      >
        <div className="text-task-card">
          <h1>{title}</h1>
          <p>{about}</p>
        </div>
        <div className="delete-button-task-card" onClick={handleDelete}></div>
      </div>
      <div className={`menu-task-container ${menuOpen ? "visible" : ""}`}>
        <div className="pin-task-button" onClick={handlePin}>
          {pinned ? "Unpin" : "Pin"}
        </div>
        <div className="share-task-button"></div>
        <div className="about-task-button"></div>
      </div>
    </>
  );
};
