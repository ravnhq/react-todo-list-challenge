import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, priorityEnum } from "../schemas/todoSchema";
import { Todo } from "../types/todo";
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (data: Todo) => void;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Todo>({
    resolver: zodResolver(todoSchema)
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSubmitHandler = (data: Todo) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleDropdown}
        className="bg-[#BCCCDC] hover:bg-[#a8b8c8] rounded px-4 py-2 transition-colors flex items-center gap-2 w-full mb-4"
      >
        <div className={`transform transition-transform duration-750 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <Plus size={16} />
        </div>
        {isOpen ? 'Hide Todo Form' : 'Create new To Do entry'}
      </button>
      
      <div className={`transition-all duration-750 ease-in-out ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'} overflow-y-auto`}>        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-wrap -mx-2">
          <div className="flex flex-col w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="taskName">Task name</label>
            <input {...register("taskName")} placeholder="Task name" id="taskName" className="border p-2" autoComplete="off"/>
            {errors.taskName && <p className="text-red-500">{errors.taskName.message}</p>}
          </div>

          <div className="flex flex-col w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="priority">Priority</label>
            <select {...register("priority")} id="priority" className="border p-2">
              {priorityEnum.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
            {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
          </div>

          <div className="flex flex-col w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="storyPoints">Story points</label>
            <input
              type="number"
              {...register("storyPoints", { valueAsNumber: true })}
              placeholder="Story points"
              id="storyPoints"
              className="border p-2"
            />
            {errors.storyPoints && <p className="text-red-500">{errors.storyPoints.message}</p>}
          </div>

          <div className="flex flex-col w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="assignee">Assignee</label>
            <input {...register("assignee")} placeholder="Assignee" id="assignee" className="border p-2" autoComplete="off"/>
            {errors.assignee && <p className="text-red-500">{errors.assignee.message}</p>}
          </div>

          <div className="flex flex-col w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="dueDate">Due date</label>
            <input
              type="date"
              {...register("dueDate", {
                setValueAs: (value) => value ? new Date(value) : undefined
              })}
              id="dueDate"
              className="border p-2"
            />
            {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
          </div>

          <div className="w-full md:w-1/3 px-2 mb-4 flex items-end">
            <button
              type="submit"
              className="bg-[#BCCCDC] hover:bg-[#a8b8c8] rounded px-4 py-2 transition-colors flex items-center gap-2 w-full"
            >
              <Plus size={16} /> Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};