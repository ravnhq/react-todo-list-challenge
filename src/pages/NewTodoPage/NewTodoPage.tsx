import { useForm } from 'react-hook-form';
import { useState } from 'react';

import type { TodoFormData } from '../../schema/schemaNewTaskForm';
import { todoNewTaskSchema } from '../../schema/schemaNewTaskForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskContext } from '../../contexts/TaskContext';

import '../styles/PageStyling.css';
import '../styles/NewTodoPage.css';
import '../../components/styles/BubbleUsers.css';

import { PlusIcon } from '@radix-ui/react-icons';
import { flushSync } from 'react-dom';

export const NewTodoPage = () => {
  const [storyPointsValue, setStoryPointsValue] = useState(5);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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

  // for bubble users
  const [assignees, setAssignees] = useState<string[]>(['Assign here']);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updateAssignee = (index: number, newValue: string) => {
    const isValidFormat = /^[a-zA-Z\s]*$/.test(newValue);
    const isValidLength = newValue.trim().length >= 1;

    if (isValidFormat && isValidLength) {
      flushSync(() => {
        const updatedAssignees = [...assignees];
        updatedAssignees[index] = newValue;
        setAssignees(updatedAssignees);
        setValue('assignedTo', updatedAssignees);
        trigger('assignedTo');
      });
    }
  };

  const addAssignee = () => {
    const newAssignee = 'Example';
    const updatedAssignees = [...assignees, newAssignee];
    setAssignees(updatedAssignees);
    setValue('assignedTo', updatedAssignees);
    trigger('assignedTo');
  };

  const removeAssignee = (index: number) => {
    if (assignees.length > 1) {
      const updatedAssignees = assignees.filter((_, i) => i !== index);
      setAssignees(updatedAssignees);
      setValue('assignedTo', updatedAssignees);
      trigger('assignedTo');
    }
  };

  const handleAssigneeClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleAssigneeBlur = () => {
    if (editingIndex !== null && assignees[editingIndex].trim() === '') {
      const updatedAssignees = [...assignees];
      updatedAssignees[editingIndex] = `User ${editingIndex + 1}`;
      setAssignees(updatedAssignees);
      setValue('assignedTo', updatedAssignees);
      trigger('assignedTo');
    }
    setEditingIndex(null);
  };

  const handleAssigneeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (editingIndex !== null && assignees[editingIndex].trim() === '') {
        const updatedAssignees = [...assignees];
        updatedAssignees[editingIndex] = `User ${editingIndex + 1}`;
        setAssignees(updatedAssignees);
        setValue('assignedTo', updatedAssignees);
      }
      setEditingIndex(null);
    }
  };

  return (
    <div className="page-container new-task-container">
      <div className="newtodo-content">
        <h1>Create a New Todo</h1>
        <div className="input-text form-container">
          <h2>New task</h2>
          <form className="newtodo-form" onSubmit={handleSubmit(onSubmit)}>
            {/* TODO: extract component later */}
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter title"
                {...register('title')}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </div>

            {/* TODO: extract component later */}
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

            {/* TODO: extract component later */}
            <div className="input-story-points form-field ">
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
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={assignee}
                          onChange={e => updateAssignee(index, e.target.value)}
                          onBlur={handleAssigneeBlur}
                          onKeyDown={e => handleAssigneeKeyDown(e)}
                          autoFocus
                        />
                      ) : (
                        <span
                          onClick={() => handleAssigneeClick(index)}
                          style={{
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: '3px',
                            border: '1px solid transparent',
                          }}
                          onMouseEnter={e => {
                            (e.target as HTMLElement).style.backgroundColor =
                              'rgba(0,0,0,0.05)';
                            (e.target as HTMLElement).style.borderColor =
                              'rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={e => {
                            (e.target as HTMLElement).style.backgroundColor =
                              'transparent';
                            (e.target as HTMLElement).style.borderColor =
                              'transparent';
                          }}
                        >
                          {assignee}
                        </span>
                      )}
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

            {/* TODO: extract component later */}
            <div className="form-field">
              <label>Due Date</label>
              <input type="datetime-local" {...register('dueDate')} />
              {errors.dueDate && (
                <span className="error">{errors.dueDate.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
