import { RiAddLine, RiTodoLine } from "@remixicon/react";
import SidebarLinks from "./components/sidebar-links/sidebar-links";
import styles from "./sidebar.module.css";
import Modal from "../ui/modal/modal";
import CreateTodo from "../ui/create-todo/create-todo";
import { useModalStore } from "../../store/modal/modal-store";
import Button from "../ui/button/button";
export default function Sidebar() {
  const links = [
    {
      label: "Your Tasks",
      link: "/",
      icon: <RiTodoLine size={20} color="white" />,
    },
    {
      label: "Completed Tasks",
      link: "/completed-tasks",
      icon: <RiTodoLine size={20} color="white" />,
    },
  ];

  const { toggleModal } = useModalStore();

  return (
    <aside className={styles.container}>
      <Modal>
        <CreateTodo />
      </Modal>
      <SidebarLinks links={links} />
      <Button onClick={() => toggleModal()}>
        Create New <RiAddLine size={15} color="white" />
      </Button>
    </aside>
  );
}
