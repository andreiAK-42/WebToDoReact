import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder/TaskAdder.jsx";
import TaskShare from "./components/TaskShare/TaskShare.jsx";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./components/LocalStorageUtils.js";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Column } from "./components/Column/column.jsx";
import { reorderTasks, setTasks } from "./app/tasksSlice";

function Index() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(setTasks(loadTasksFromLocalStorage()));
  }, [dispatch]);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    dispatch(reorderTasks({ activeId: active.id, overId: over.id }));
  };

  return (
    <>
      <TaskAdder />

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>

      {tasks.length === 0 && (
        <div className="no-task-container">
          <div className="wall-no-task"></div>
          <div className="text-no-task-container">
            <p>No tasks</p>
          </div>
          <div className="wall-no-task"></div>
        </div>
      )}

      <TaskShare />
    </>
  );
}

export default Index;
