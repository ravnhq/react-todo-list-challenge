import { useEffect, useState } from "react";
import "./App.css";
import { NavBar } from "./components/nav-bar/nav-bar";
import { TaskList } from "./components/taskList/TaskList";
import { TaskSearch } from "./components/taskSearch/TaskSearch";
import { ToDoForm } from "./components/todoForm/form";
import type { Task } from "./types/types";
import { Sidebar } from "./components/sidebar/Sidebar";

const getTasksFromLocalStorage = (): Task[] => {
  const stored = localStorage.getItem("tasks");
  if (!stored) return [];
  try {
    return JSON.parse(stored) as Task[];
  } catch {
    return [];
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromLocalStorage());
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "incomplete"
  >("all");

  const [activeView, setActiveView] = useState<"tasks" | "create">("tasks");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (taskData: Omit<Task, "id">) => {
    const storedTasks = getTasksFromLocalStorage();
    const isDuplicate = storedTasks.some(
      (task) =>
        task.name === taskData.name &&
        task.priority === taskData.priority &&
        task.storyPoints === taskData.storyPoints &&
        task.assignee === taskData.assignee &&
        task.dueDate === taskData.dueDate
    );
    if (isDuplicate) {
      alert("This task already exists.");
      return;
    }
    const maxId =
      storedTasks.length > 0
        ? Math.max(...storedTasks.map((t) => Number(t.id)))
        : 0;
    const newTask: Task = {
      ...taskData,
      id: (maxId + 1).toString(),
    };
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) => {
      const term = searchTerm.toLowerCase();
      return (
        task.name.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term)
      );
    })
    .filter((task) => {
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "incomplete") return !task.completed;
      return true;
    });

  return (
    <>
      <NavBar />
      <Sidebar onChangeView={setActiveView} activeView={activeView} />
      <div className="main-content-container">
        {activeView === "tasks" && (
          <div className="search-and-list-container">
            <TaskSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <div className="filter-controls">
              <button
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={filterStatus === "completed" ? "active" : ""}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus("incomplete")}
                className={filterStatus === "incomplete" ? "active" : ""}
              >
                Incomplete
              </button>
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        )}

        {activeView === "create" && (
          <div className="todo-form-container">
            <ToDoForm onAddTask={handleAddTask} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
