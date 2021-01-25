import React, { useState } from "react";
import "./App.scss";
import { Tasks } from "./components/Tasks";
import { TaskDetail } from "./components/TaskDetail";
import { TaskModal } from "./components/TaskModal";
import { CurrentTaskProvider } from "./application/CurrentTaskProvider";

function App() {
  const [showModalSidebar, setShowModalSidebar] = useState({
    sidebar: false,
    modal: false,
  });

  const [tasks, setTask] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  return (
    <CurrentTaskProvider.Provider value={{ currentTask, setCurrentTask }}>
      <Tasks
        setModalSidebar={setShowModalSidebar}
        showModalSidebar={showModalSidebar}
        tasks={tasks}
      />
      {showModalSidebar.sidebar && (
        <TaskDetail
          setModalSidebar={setShowModalSidebar}
          showModalSidebar={showModalSidebar}
        />
      )}
      {showModalSidebar.modal && (
        <TaskModal
          setModalSidebar={setShowModalSidebar}
          showModalSidebar={showModalSidebar}
          tasks={tasks}
          setTask={setTask}
        />
      )}
    </CurrentTaskProvider.Provider>
  );
}

export default App;
