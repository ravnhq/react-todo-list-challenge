import { useState } from "react";
import type { SidebarProps } from "../../types/types";
import "./sidebar.css";

export const Sidebar = ({ onChangeView, activeView }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button
          onClick={() => {
            onChangeView("tasks");
            setIsOpen(false);
          }}
          className={activeView === "tasks" ? "active" : ""}
        >
          Tasks
        </button>
        <button
          onClick={() => {
            onChangeView("create");
            setIsOpen(false);
          }}
          className={activeView === "create" ? "active" : ""}
        >
          Create Task
        </button>
      </aside>
    </>
  );
};
