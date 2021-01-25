import React, { SyntheticEvent, useState } from "react";
import { Props } from "../interfaces/modalSidebar.interface";
import { nanoid } from "nanoid";
import { format } from "date-fns";

interface taskModal extends Props {
  task: any;
  setTask: any;
  taskExist?: any;
}

export const TaskModal: React.FC<taskModal> = ({
  setModalSidebar,
  showModalSidebar,
  setTask,
  task,
}) => {
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });
  const closeModal = () => {
    setModalSidebar({ ...showModalSidebar, modal: false });
  };

  const saveTask = (e: SyntheticEvent) => {
    e.preventDefault();
    const newTask = {
      ...taskForm,
      id: nanoid(5),
      created: format(new Date(), "dd/MMM/yyyy"),
    };
    setTask([...task, newTask]);
    setModalSidebar({ ...showModalSidebar, modal: false });
  };

  const handleChangeInput = (e: any) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  const blurModal = (e: any) => {
    const elements: string[] = e.nativeEvent.path.map(
      (el: HTMLElement) => el.className
    );
    !elements.includes("modalContent") && closeModal();
  };

  return (
    <div className="modal" onClick={blurModal}>
      <div className="modalContent">
        <button className="close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={saveTask}>
          <label htmlFor="title">Title</label>
          <input
            autoFocus
            id="title"
            type="text"
            name="title"
            onChange={handleChangeInput}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={handleChangeInput}
            name="description"
          ></textarea>
          <div>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
