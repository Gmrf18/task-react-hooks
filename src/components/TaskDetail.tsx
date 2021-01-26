import { formatDistanceToNow } from "date-fns";
import React, { useContext } from "react";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";
import { Props } from "../interfaces/modalSidebar.interface";
import { ITask } from "../interfaces/task.interface";

interface taskModal extends Props {
  tasks: ITask[];
  setTask: any;
}
export const TaskDetail: React.FC<taskModal> = ({
  setModalSidebar,
  showModalSidebar,
  setTask,
  tasks,
}) => {
  const { currentTask, setCurrentTask } = useContext(CurrentTaskProvider);

  const closeSidebar = () => {
    setCurrentTask(null);
    setModalSidebar({
      ...showModalSidebar,
      sidebar: false,
    });
  };

  const setStatus = (e: any) => {
    console.log(e.target.value);

    const taskE = {
      ...currentTask,
      status: e.target.value,
    };
    setCurrentTask(taskE);
    setTask(tasks.map((task) => (task.id == taskE.id ? taskE : task)));
  };

  const editTask = () => {
    setModalSidebar({
      ...showModalSidebar,
      modal: true,
      sidebar: false,
    });
  };

  const deleteTask = () => {
    setTask(tasks.filter((task) => task.id !== currentTask?.id));
    closeSidebar();
  };

  return (
    <div className="TaskDetail">
      <button className="close" onClick={closeSidebar}>
        X
      </button>
      <h3>{currentTask?.title}</h3>
      <select value={currentTask?.status} onChange={setStatus}>
        <option value="Pending">Pending</option>
        <option value="Complete">Complete</option>
      </select>
      <h5>Description</h5>
      <p>{currentTask?.description}</p>
      <br />
      <p>
        {formatDistanceToNow(currentTask ? currentTask.update : new Date())}
      </p>
      <p>This application is created by Gerardo Reyes</p>
      <button onClick={editTask}>Edit</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};
