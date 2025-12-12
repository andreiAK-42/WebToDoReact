import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { removeTask, togglePin } from "../../app/tasksSlice";
import "./Task.css";
import TaskEdit from "../TaskEdit/TaskEdit.jsx";
import TaskShare from "../TaskShare/TaskShare.jsx";

export const Task = ({ id, title, about, pinned }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const clickStartRef = useRef({ x: 0, y: 0 });
  const [shareOpen, setShareOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const sortable = pinned
    ? null
    : useSortable({
        id,
        activationConstraint: { distance: 8 },
      });
  const attributes = sortable ? sortable.attributes : {};
  const listeners = pinned ? {} : (sortable?.listeners || {});
  const setNodeRef = sortable ? sortable.setNodeRef : undefined;
  const style = sortable
    ? { transition: sortable.transition, transform: CSS.Transform.toString(sortable.transform) }
    : {};

  const handleMouseDown = (e) => {
    clickStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    const deltaX = Math.abs(e.clientX - clickStartRef.current.x);
    const deltaY = Math.abs(e.clientY - clickStartRef.current.y);
    
    if (deltaX < 8 && deltaY < 8) {
      setMenuOpen((prev) => !prev);
    }
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

  const handleShare = (event) => {
    event.stopPropagation();
    setShareOpen(true);
  };

  const handleAbout = (event) => {
    event.stopPropagation();
    setAboutOpen((prev) => !prev);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setEditOpen(true);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`task-card ${pinned ? "pinned" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="text-task-card">
          <h1>{title}</h1>
          <p>{about}</p>
        </div>
        <div className="delete-button-task-card" onClick={handleDelete}></div>
      </div>
      <div className={`menu-task-container ${menuOpen ? "visible" : ""}`}>
        <div className="share-task-button" onClick={handleShare}></div>
        <div className="about-task-button" onClick={handleAbout}></div>
        <div className="edit-task-button" onClick={handleEdit}></div>
        <div className="pin-task-button" onClick={handlePin}>
          {pinned ? "Unpin" : "Pin"}
        </div>
      </div>
      {aboutOpen && (
        <div className="about-task-panel">
          <h2>{title}</h2>
          <p>{about}</p>
        </div>
      )}
      <TaskShare
        visible={shareOpen}
        onClose={() => setShareOpen(false)}
        taskTitle={title}
        taskAbout={about}
      />
      <TaskEdit taskId={editOpen ? id : null} onCancelEdit={() => setEditOpen(false)} />
    </>
  );
};
