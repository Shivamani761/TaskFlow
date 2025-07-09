import React from 'react';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { Task, TaskFilter } from '../types/Task';
import { TaskItem } from './TaskItem';
import { sortTasks } from '../utils/taskHelpers';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const sortedTasks = sortTasks(filteredTasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ListTodo size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Add your first task to get started!</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    const emptyStateConfig = {
      completed: {
        icon: CheckCircle2,
        title: 'No completed tasks',
        description: 'Complete some tasks to see them here.',
      },
      pending: {
        icon: Circle,
        title: 'No pending tasks',
        description: 'Great job! All tasks are completed.',
      },
    };

    const config = emptyStateConfig[filter as keyof typeof emptyStateConfig];
    
    if (config) {
      const { icon: Icon, title, description } = config;
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      );
    }
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};