import { motion } from 'framer-motion';

export const NewTodoPage = () => {
  return (
    <div className="page-container">
      <div className="newtodo-content">
        <h1>Create a New Todo</h1>
        <form>
          <input type="text" placeholder="Todo title" />
          <textarea placeholder="Todo description"></textarea>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
};
