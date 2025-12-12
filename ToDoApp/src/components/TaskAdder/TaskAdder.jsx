import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../app/tasksSlice";
import "./TaskAdder.css";

function TaskAdder() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAbout, setInputAbout] = useState("");
  const dispatch = useDispatch();

  const handleAddNewTaskClick = () => {
    if (!inputTitle.trim() && !inputAbout.trim()) return;
    const taskId = Math.floor(Date.now() / 1000);

    const newTask = {
      id: taskId,
      taskTitle: inputTitle,
      taskAbout: inputAbout,
      pinned: false,
    };

    dispatch(addTask(newTask));
    setInputTitle("");
    setInputAbout("");
  };

  const handleSetTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleSetAbout = (event) => {
    setInputAbout(event.target.value);
  };

  return (
    <>
      <div className="add-task-container">
        <div className="add-task-inputs-container">
          <input
            value={inputTitle}
            onInput={handleSetTitle}
            placeholder="Title..."
          />
          <input
            value={inputAbout}
            onInput={handleSetAbout}
            placeholder="About..."
          />
        </div>

        <div onClick={handleAddNewTaskClick} className="add-task-button"></div>
      </div>
    </>
  );
}

export default TaskAdder;

