import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  tasks: tasksReducer,
});
