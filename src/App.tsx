import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Todo } from "./types/todo";

function App() {
  const { todos, addTodo } = useTodos();

  const handleAddTodo = (todo: Todo) => {
    addTodo(todo);
    toast.success('Todo added successfully!');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-5xl px-4">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">React To Do List Challenge</h1>
                <TodoForm onSubmit={handleAddTodo} />
                <TodoList todos={todos} />
              </div>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
