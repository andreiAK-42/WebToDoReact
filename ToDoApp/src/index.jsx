import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder/TaskAdder.jsx";
import TaskShare from "./components/TaskShare/TaskShare.jsx";
import { saveTasksToLocalStorage } from "./components/LocalStorageUtils.js";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Column } from "./components/Column/column.jsx";
import { reorderTasks } from "./app/tasksSlice";

function Index() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    // Если не было реального перемещения (просто клик), не обрабатываем
    if (!over || active.id === over.id) return;
    // Проверяем, был ли реальный drag - если delta очень маленькая, это был клик
    if (delta && Math.abs(delta.x) < 8 && Math.abs(delta.y) < 8) {
      return;
    }
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
