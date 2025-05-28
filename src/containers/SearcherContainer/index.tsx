import React from "react";
import "./index.scss";
import { TaskForm } from "./TaskForm";
import { RiTodoLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { useTaskStore } from "../../stores/taskStore";
export default function SearcherContainer() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);
  return (
    <div className="containerSearcher">
      <div className="headContainer">
        <RiTodoLine size={80} />
        <h1>TodoList Ravn</h1>
      </div>
      <div className="inputContainer">
        <input
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <>
          <button onClick={() => setIsModalOpen(true)}>
            <span className="button-text">Create task</span>
            <IoCreateOutline size={30} />
          </button>
          <TaskForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      </div>
    </div>
  );
}
