import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Props } from "../interfaces/modalSidebar.interface";
import { nanoid } from "nanoid";
import { ITask } from "../interfaces/task.interface";
import { CurrentTaskProvider } from "../application/CurrentTaskProvider";

interface taskModal extends Props {
  tasks: ITask[];
  setTask: any;
}

export const TaskModal: React.FC<taskModal> = ({
  setModalSidebar,
  showModalSidebar,
  setTask,
  tasks,
}) => {
  const { currentTask } = useContext(CurrentTaskProvider);

  useEffect(() => {
    if (currentTask) {
      setTaskForm({ ...currentTask });
    }
  }, [currentTask]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });

  const closeModal = () => {
    setModalSidebar({ ...showModalSidebar, modal: false });
  };

  const saveTask = (e: SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    if (currentTask) {
      const editedTask: ITask = {
        ...currentTask,
        ...taskForm,
        update: date,
      };
      setTask(
        tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
    } else {
      const newTask: ITask = {
        ...taskForm,
        status: "Pending",
        id: nanoid(8),
        created: date,
        update: date,
      };
      setTask([...tasks, newTask]);
    }
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
            value={taskForm.title}
            onChange={handleChangeInput}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={taskForm.description}
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
