import React, { useContext, useState } from "react";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";
import { Props } from "../interfaces/modalSidebar.interface";
import { ITask } from "../interfaces/task.interface";

interface ITasks extends Props {
  tasks: ITask[];
}

export const Tasks: React.FC<ITasks> = ({
  setModalSidebar,
  showModalSidebar,
  tasks,
}) => {
  const title = "My Task";
  const { setCurrentTask } = useContext(CurrentTaskProvider);

  const openSidebar = (task: any) => {
    setCurrentTask(task);
    setModalSidebar({
      ...showModalSidebar,
      sidebar: true,
    });
  };
  const newTask = () => {
    setModalSidebar({ ...showModalSidebar, modal: true });
  };

  return (
    <div className="task-root">
      <div>{title}</div>

      <div className="card">
        <div className="card-container">
          <div className="HeaderTable">
            Task <input type="date"></input>
            <button onClick={newTask}>Add Task</button>
          </div>
          <table className="">
            <thead>
              <tr>
                <th className="title">Title</th>
                <th className="created">Created</th>
                <th className="description">Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: ITask) => (
                <tr key={task.id} onDoubleClick={() => openSidebar(task)}>
                  <td className="title">{task.title}</td>
                  <td className="created">{task.created}</td>
                  <td className="description">
                    {task.description.substr(0, 50)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
