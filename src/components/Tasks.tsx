import React, { useContext, useState } from "react";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";
import { Props } from "../interfaces/modalSidebar.interface";
import { ITask } from "../interfaces/task.interface";
import { format, isSameDay, parseISO } from "date-fns";

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

  const [filterDay, setFilterDay] = useState<string | null>(null);

  return (
    <div className="task-root">
      <h1 className="Title">{title}</h1>

      <div className="card">
        <div className="card-container">
          <div className="HeaderTable">
            Task{" "}
            <div>
              <input
                type="date"
                onChange={(e: any) => setFilterDay(e.target.value)}
              ></input>
              <button onClick={() => setFilterDay(null)}>✖️</button>
            </div>
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
              {tasks
                .filter((task) =>
                  filterDay
                    ? isSameDay(task.created, parseISO(filterDay))
                    : true
                )
                .map((task: ITask) => (
                  <tr key={task.id} onClick={() => openSidebar(task)}>
                    <td className="title">
                      {task.status === "Pending" ? "🛎️ " : "✔️ "} {task.title}
                    </td>
                    <td className="created">
                      {format(task.created, "dd/MMM/yyyy")}
                    </td>
                    <td>
                      <p className="description">{task.description}</p>
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
