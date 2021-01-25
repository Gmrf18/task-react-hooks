import React, { Fragment } from "react";
import "./App.scss";
import { Tasks } from "./components/Tasks";
import { TaskDetail } from "./components/TaskDetail";
import { TaskModal } from "./components/TaskModal";

function App() {
  return (
    <Fragment>
      <Tasks />
      <TaskDetail />
      {false && <TaskModal />}
    </Fragment>
  );
}

export default App;
