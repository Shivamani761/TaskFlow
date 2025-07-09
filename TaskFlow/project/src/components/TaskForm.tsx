import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { generateId } from '../utils/taskHelpers';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue) return;

    setIsSubmitting(true);
    
    const newTask: Task = {
      id: generateId(),
      text: trimmedValue,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate a brief delay for better UX
    setTimeout(() => {
      onAddTask(newTask);
      setInputValue('');
      setIsSubmitting(false);
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </form>
  );
};