import { useTaskStore } from "./store/taskStore";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { Dashboard } from "./components/Dashboard";
import { Modal } from "./components/Modal";
import "./scss/main.scss";
import { TaskForm } from "./components/AddTaskForm";
import type { TaskFormData } from "./schemas/taskSchema";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (data: TaskFormData) => {
    addTask(data);
    setIsOpen(false);
  };

  return (
    <div className="layout">
      <header>
        <SearchBar />
      </header>
      <main>
        <Dashboard onAddTaskClick={() => setIsOpen(true)} />
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add a new task"
        >
          <TaskForm onSubmit={handleSubmit} />
        </Modal>
      </main>
    </div>
  );
}

export default App;
