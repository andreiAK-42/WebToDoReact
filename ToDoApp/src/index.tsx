import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder/TaskAdder";
import TaskShare from "./components/TaskShare/TaskShare";
import { saveTasksToLocalStorage } from "./components/LocalStorageUtils";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { reorderTasks } from "./app/tasksSlice";
import type { RootState, AppDispatch } from "./app/store";

function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
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

    </>
  );
}

export default Index;
