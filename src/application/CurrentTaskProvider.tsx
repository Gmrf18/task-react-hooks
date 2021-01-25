import { createContext } from "react";
import { ITask } from "../interfaces/task.interface";

export const CurrentTaskProvider = createContext<{
  currentTask: ITask | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<any>> | any;
}>({ currentTask: null, setCurrentTask: null });
