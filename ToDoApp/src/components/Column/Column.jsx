import { useState, useEffect } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";
import "./Column.css";

export const Column = ({ tasks, setTasks }) => {

  return (
    <>
      <div className="tasks-container">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task key={task.id}
              id={task.id}
              title={task.taskTitle}
              about={task.taskAbout}
              setTasks={setTasks}
            ></Task>
          ))}
        </SortableContext>
      </div>
      <div className="black-background"></div>
    </>
  );
};
