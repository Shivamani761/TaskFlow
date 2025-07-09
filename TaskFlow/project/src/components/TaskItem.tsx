import React, { useState } from 'react';
import { Check, Edit3, Trash2, X } from 'lucide-react';
import { Task } from '../types/Task';
import { formatDate } from '../utils/taskHelpers';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.text) {
      onUpdateTask(task.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteTask(task.id);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200 ${
        isDeleting ? 'opacity-50 scale-95' : ''
      } ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-gray-300 hover:border-emerald-500'
          }`}
        >
          {task.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full px-2 py-1 text-gray-900 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <div>
              <p
                className={`text-gray-900 ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created {formatDate(task.createdAt)}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <button
              onClick={handleCancel}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};