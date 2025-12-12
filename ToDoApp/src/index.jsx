import { useState, useEffect } from "react";
import "./assets/styles/index_mobile.css";
import TaskAdder from "./components/TaskAdder.jsx";
import TaskShare from "./components/TaskShare.jsx";
import { loadTasksFromLocalStorage } from "./components/LocalStorageUtils.js";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Column } from "./components/Column/column.jsx";
import { arrayMove } from "@dnd-kit/sortable";

function Index() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const getTaskPos = id => tasks.findIndex(task => task.id == id)

  const handleDragEnd = event => {
    const { active, over } = event

    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    })
  }

  return (
    <>
      <TaskAdder onAddTask={handleAddTask} />

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} setTasks={setTasks} />
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
