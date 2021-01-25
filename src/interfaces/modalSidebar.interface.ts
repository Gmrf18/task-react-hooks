export interface Props {
  setModalSidebar: React.Dispatch<React.SetStateAction<IShowModalSidebar>>;
  showModalSidebar: IShowModalSidebar;
}

export interface IShowModalSidebar {
  sidebar: boolean;
  modal: boolean;
}