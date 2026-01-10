import React, { createContext, useContext } from 'react';
import { useTaskManager } from '../hook/useTodoTaskManager';

const TaskContext = createContext<ReturnType<typeof useTaskManager> | null>(
  null
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const taskManager = useTaskManager();

  return (
    <TaskContext.Provider value={taskManager}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
