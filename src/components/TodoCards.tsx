import React from 'react';
import type { Task } from '../types/Task';
import './styles/Todocards.css';

const PriorityBadge = ({
  isCompleted,
  priority,
}: {
  isCompleted: boolean;
  priority: string;
}) => {
  return (
    <span
      className={`priority-badge priority-${isCompleted ? 'done' : priority}`}
    >
      {isCompleted ? 'DONE' : priority.toUpperCase()}
    </span>
  );
};

const StoryPointBadge = ({ points }: { points: number }) => {
  return <div className="story-point-badge">{points} SP</div>;
};

const AssignedPeople = ({ people }: { people: string[] }) => {
  const displayPeople = people.slice(0, 3);
  const remainingCount = people.length - 3;

  return (
    <div className="assigned-people">
      {displayPeople.map((person, index) => (
        <div key={index} className="person-avatar">
          {person.charAt(0).toUpperCase()}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="person-avatar person-avatar-more">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export const TodoCard = ({
  task,
  onToggle,
}: {
  task: Task;
  onToggle?: (taskId: number) => void;
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    onToggle?.(task.id);
  };

  const handleCheckboxChange = () => {
    onToggle?.(task.id);
  };

  return (
    <div
      className="todo-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="todo-checkbox-section">
        <input
          id={`todo-checkbox-${task.id}`}
          type="checkbox"
          className="todo-checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="todo-content">
        <div className="todo-top-row">
          <h3 className="todo-title">{task.title}</h3>
          <StoryPointBadge points={task.storyPoints} />
        </div>

        <div className="todo-bottom-row">
          <PriorityBadge
            priority={task.priority}
            isCompleted={task.completed}
          />
          <AssignedPeople people={task.assignedTo} />
        </div>
      </div>
    </div>
  );
};

let fakeTasks: Task[] = [
  {
    id: 1,
    title: 'Stretch everyday for 15 mins',
    completed: false,
    priority: 'low',
    dueDate: new Date(2023, 11, 25),
    storyPoints: 3,
    assignedTo: ['Alice', 'Bob', 'Eve', 'Frank', 'Grace'],
  },
  {
    id: 2,
    title: 'Task 2',
    completed: true,
    priority: 'normal',
    dueDate: new Date(2023, 11, 26),
    storyPoints: 5,
    assignedTo: ['Charlie'],
  },
  {
    id: 3,
    title: 'Task 3',
    completed: false,
    priority: 'urgent',
    dueDate: new Date(2023, 11, 27),
    storyPoints: 2,
    assignedTo: ['David', 'Eve'],
  },
  {
    id: 4,
    title: 'Task 4',
    completed: true,
    priority: 'high',
    dueDate: new Date(2023, 11, 26),
    storyPoints: 5,
    assignedTo: ['Charlie'],
  },
  {
    id: 5,
    title: 'Task 5',
    completed: false,
    priority: 'urgent',
    dueDate: new Date(2023, 11, 27),
    storyPoints: 2,
    assignedTo: ['David', 'Eve'],
  },
];

export const TodoCards = ({
  initialTasks = fakeTasks,
  onToggleTask,
}: {
  initialTasks?: Task[];
  onToggleTask?: (taskId: number, newCompletedState: boolean) => void;
}) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const handleToggle = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      const updatedTask = updatedTasks.find(task => task.id === taskId);
      if (updatedTask) {
        onToggleTask?.(taskId, updatedTask.completed);
      }

      console.log(`Toggling task ${taskId}`);
      return updatedTasks;
    });
  };

  return (
    <div className="todo-cards">
      {tasks.map(task => (
        <TodoCard key={task.id} task={task} onToggle={handleToggle} />
      ))}
    </div>
  );
};
