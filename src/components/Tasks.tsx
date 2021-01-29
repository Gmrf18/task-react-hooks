import React, { useContext, useState } from "react";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";
import { Props } from "../interfaces/modalSidebar.interface";
import { ITask } from "../interfaces/task.interface";
import { format, isSameDay, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle as Incomplete,
} from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as Complete } from "@fortawesome/free-solid-svg-icons";
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

  const [filterDay, setFilterDay] = useState<string | any | null>(null);

  return (
    <div className="task-root">
      <h1 className="Title">{title}</h1>
      <div className="card">
        <div className="card-container">
          <div className="HeaderTable">
            <span className="task__title">Task</span>
            <div>
              <input
                className=""
                type="date"
                value={filterDay || ""}
                onChange={(e: any) => setFilterDay(e.target.value)}
              ></input>
              <button onClick={() => setFilterDay(null)}>X</button>
            </div>
            <button className="addButton" onClick={newTask}>
              <FontAwesomeIcon
                style={{ transform: "rotate(45deg)" }}
                icon={faTimesCircle}
              />
              Add Task
            </button>
          </div>
          <table className="">
            <thead>
              <tr>
                <th></th>
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
                  <tr
                    key={task.id}
                    className={task.status === "Complete" ? "complete" : ""}
                    onClick={() => openSidebar(task)}
                  >
                    <td className="status ">
                      {task.status === "Pending" ? (
                        <FontAwesomeIcon icon={Incomplete} />
                      ) : (
                        <FontAwesomeIcon
                          style={{ color: "green" }}
                          icon={Complete}
                        />
                      )}
                    </td>
                    <td className="title">{task.title}</td>
                    <td className="created">
                      {format(task.created, "dd/MMM/yyyy")}
                    </td>
                    <td className="description">
                      <p>{task.description}</p>
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
