import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";
import "./Column.css";

export const Column = ({ tasks }) => {
  const pinnedTasks = tasks.filter((task) => task.pinned);
  const regularTasks = tasks.filter((task) => !task.pinned);

  return (
    <>
      <div className="tasks-container">
        {pinnedTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.taskTitle}
            about={task.taskAbout}
            pinned={true}
          />
        ))}

        <SortableContext
          items={regularTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {regularTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.taskTitle}
              about={task.taskAbout}
              pinned={false}
            />
          ))}
        </SortableContext>
      </div>
      <div className="black-background"></div>
    </>
  );
};
