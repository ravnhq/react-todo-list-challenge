import { useState } from 'react';
import type { Task } from '../types/Task';
import { nanoid } from 'nanoid';

//helper hook :D
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue(prev => {
        const newValue = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useTaskManager = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todos', []);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks => {
      const updated = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return updated;
    });
  };

  const getTasksByPriority = (priority: string) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const getPendingTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  //getters tasks
  const getTodayTasks = () => {
    const today = new Date().toDateString();
    return tasks.filter(
      task => new Date(task.dueDate).toDateString() === today
    );
  };

  const getTomorrowTasks = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tasks.filter(
      task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()
    );
  };

  const getThisWeekTasks = () => {
    const today = new Date();
    const weekEnd = new Date();
    weekEnd.setDate(today.getDate() + 7);

    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= today && taskDate <= weekEnd;
    });
  };

  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(
      task => new Date(task.dueDate) < today && !task.completed
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksByPriority,
    getCompletedTasks,
    getPendingTasks,
    clearAllTasks,

    //getters
    getTodayTasks,
    getTomorrowTasks,
    getThisWeekTasks,
    getOverdueTasks,
  };
};
