import React, { useContext } from "react";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";
import { Props } from "../interfaces/modalSidebar.interface";

export const TaskDetail: React.FC<Props> = ({
  setModalSidebar,
  showModalSidebar,
}) => {
  const { currentTask } = useContext(CurrentTaskProvider);

  const closeSidebar = () => {
    setModalSidebar({
      ...showModalSidebar,
      sidebar: false,
    });
  };

  return (
    <div className="TaskDetail">
      <button className="close" onClick={closeSidebar}>
        X
      </button>
      <h3>{currentTask?.title}</h3>
      <select>
        <option>Pending</option>
      </select>
      <h5>Description</h5>
      <p>{currentTask?.description}</p>
      <br />
      <p>Updated Today at 6:30pm by Gerardo Reyes</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};