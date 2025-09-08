import { PlusIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { TodoFormData } from '../../schema/schemaNewTaskForm';
import { todoNewTaskSchema } from '../../schema/schemaNewTaskForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskContext } from '../../contexts/TaskContext';

export const NewTodoPage = () => {
  const [assignees, setAssignees] = useState<string[]>(['User 1']); // Start with one default user
  const [storyPointsValue, setStoryPointsValue] = useState(5);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    mode: 'onChange',
    resolver: zodResolver(todoNewTaskSchema),
    defaultValues: {
      storyPoints: 5,
      assignedTo: ['User 1'],
    },
  });

  const { addTask } = useTaskContext();

  const onSubmit = (data: TodoFormData) => {
    try {
      const validatedData = todoNewTaskSchema.parse(data);
      console.log('Form submitted with valid data:', validatedData);
      addTask({
        ...validatedData,
        completed: false,
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleStoryPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setStoryPointsValue(value);
    setValue('storyPoints', value);
  };

  const addAssignee = () => {
    const newAssignee = `User ${assignees.length + 1}`;
    const updatedAssignees = [...assignees, newAssignee];
    setAssignees(updatedAssignees);
    setValue('assignedTo', updatedAssignees);
  };

  const removeAssignee = (index: number) => {
    if (assignees.length > 1) {
      const updatedAssignees = assignees.filter((_, i) => i !== index);
      setAssignees(updatedAssignees);
      setValue('assignedTo', updatedAssignees);
    }
  };

  return (
    <div className="page-container new-task-container">
      <div className="newtodo-content">
        <h1>Create a New Todo</h1>
        <form className="newtodo-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label>Todo title</label>
            <input
              type="text"
              placeholder="Enter title"
              {...register('title')}
            />
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Priority</label>
            <select {...register('priority')}>
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            {errors.priority && (
              <span className="error">{errors.priority.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Story Points</label>
            <input
              type="range"
              min="1"
              max="20"
              value={storyPointsValue}
              onChange={handleStoryPointsChange}
            />
            <span className="story-points-value">{storyPointsValue} SP</span>
            {errors.storyPoints && (
              <span className="error">{errors.storyPoints.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Assignees</label>
            <div className="assignees-container">
              <div className="assigned-users">
                {assignees.map((assignee, index) => (
                  <div key={index} className="assignee-bubble">
                    <span>{assignee}</span>
                    {assignees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAssignee(index)}
                        className="remove-assignee"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="add-assignee-btn"
                onClick={addAssignee}
              >
                <PlusIcon />
                Add User
              </button>
            </div>
            {errors.assignedTo && (
              <span className="error">{errors.assignedTo.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Due Date</label>
            <input type="datetime-local" {...register('dueDate')} />
            {errors.dueDate && (
              <span className="error">{errors.dueDate.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};
