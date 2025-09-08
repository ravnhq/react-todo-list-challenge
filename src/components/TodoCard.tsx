import type { Task } from '../types/Task';

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
  isSmallCard,
}: {
  task: Task;
  isSmallCard: boolean;
  onToggle?: (taskId: string) => void;
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
          {!isSmallCard && <StoryPointBadge points={task.storyPoints} />}
        </div>

        <div className="todo-bottom-row">
          <PriorityBadge
            priority={task.priority}
            isCompleted={task.completed}
          />
          {!isSmallCard && <AssignedPeople people={task.assignedTo} />}
        </div>
      </div>
    </div>
  );
};
