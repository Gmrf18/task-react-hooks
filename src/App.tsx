import React, { useEffect, useState } from "react";
import "./App.scss";
import { Tasks } from "./components/Tasks";
import { TaskDetail } from "./components/TaskDetail";
import { TaskModal } from "./components/TaskModal";
import { CurrentTaskProvider } from "./application/CurrentTaskProvider";
import { ITask } from "./interfaces/task.interface";

function App() {
  const [showModalSidebar, setShowModalSidebar] = useState({
    sidebar: false,
    modal: false,
  });

  const validateExistTasks = () => {
    const tasksLocal: ITask[] = JSON.parse(localStorage.getItem("tasks") || "");
    return tasksLocal
      ? tasksLocal.map((task) => {
          return {
            ...task,
            created: new Date(task.created),
            update: new Date(task.created),
          };
        })
      : [];
  };

  const [tasks, setTask] = useState<ITask[]>(validateExistTasks());
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
          tasks={tasks}
          setTask={setTask}
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
