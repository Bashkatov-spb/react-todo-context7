import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoFilter, TodoState, TodoActions, TodoPriority } from '@/types';

const STORAGE_KEY = 'react-todo-context7-todos';

// Utility functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        priority: todo.priority || 'medium', // Default priority for existing todos
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Error loading todos from storage:', error);
  }
  return [];
};

const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage:', error);
  }
};

export const useTodos = (): TodoState & TodoActions => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const loadedTodos = loadTodosFromStorage();
      setTodos(loadedTodos);
    } catch (err) {
      setError('Failed to load todos from storage');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      saveTodosToStorage(todos);
    }
  }, [todos, loading]);

  // Filter todos based on current filter - OPTIMIZED with useMemo
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Action handlers - OPTIMIZED with useCallback
  const addTodo = useCallback((text: string, priority: TodoPriority = 'medium') => {
    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
    setError(null);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, text: string, priority?: TodoPriority) => {
    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              text: text.trim(), 
              priority: priority || todo.priority,
              updatedAt: new Date() 
            }
          : todo
      )
    );
    setError(null);
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  // Statistics - OPTIMIZED with useMemo
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const priorityCounts = todos.reduce((acc, todo) => {
      acc[todo.priority]++;
      return acc;
    }, {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0
    });
    
    return {
      total,
      completed,
      active,
      hasCompleted: completed > 0,
      priorityCounts
    };
  }, [todos]);

  // Clear error after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    loading,
    error,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    clearCompleted
  };
};