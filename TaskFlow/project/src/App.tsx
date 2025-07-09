import React, { useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import { Task, TaskFilter } from './types/Task';
import { TaskForm } from './components/TaskForm';
import { TaskFilterComponent } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useLocalStorage<TaskFilter>('filter', 'all');

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  }), [tasks]);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleUpdateTask = (id: string, text: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, text, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <CheckSquare size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Stay organized and productive with our beautiful task management system.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <TaskForm onAddTask={handleAddTask} />
          
          <TaskFilterComponent
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            taskCounts={taskCounts}
          />
          
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Your tasks are automatically saved locally in your browser.</p>
        </div>
      </div>
    </div>
  );
}

export default App;