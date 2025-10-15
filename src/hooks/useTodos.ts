import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoFilter, TodoState, TodoActions, TodoTag } from '@/types';

const STORAGE_KEY = 'react-todo-context7-todos';
const TAGS_STORAGE_KEY = 'react-todo-context7-tags';

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
        tags: todo.tags || [], // Default empty tags for existing todos
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Error loading todos from storage:', error);
  }
  return [];
};

const loadTagsFromStorage = (): TodoTag[] => {
  try {
    const stored = localStorage.getItem(TAGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((tag: any) => ({
        ...tag,
        createdAt: new Date(tag.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading tags from storage:', error);
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

const saveTagsToStorage = (tags: TodoTag[]): void => {
  try {
    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
  } catch (error) {
    console.error('Error saving tags to storage:', error);
  }
};

export const useTodos = (): TodoState & TodoActions => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<TodoTag[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos and tags from localStorage on mount
  useEffect(() => {
    try {
      const loadedTodos = loadTodosFromStorage();
      const loadedTags = loadTagsFromStorage();
      setTodos(loadedTodos);
      setTags(loadedTags);
    } catch (err) {
      setError('Failed to load data from storage');
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

  // Save tags to localStorage whenever tags change
  useEffect(() => {
    if (!loading) {
      saveTagsToStorage(tags);
    }
  }, [tags, loading]);

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
  const addTodo = useCallback((text: string, tags: string[] = []) => {
    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      tags,
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

  const updateTodo = useCallback((id: string, text: string, tags?: string[]) => {
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
              tags: tags !== undefined ? tags : todo.tags,
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

  // Tag management functions
  const addTag = useCallback((name: string, color: string) => {
    if (!name.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    const newTag: TodoTag = {
      id: generateId(),
      name: name.trim(),
      color,
      createdAt: new Date()
    };

    setTags(prevTags => [...prevTags, newTag]);
    setError(null);
  }, []);

  const updateTag = useCallback((id: string, name: string, color: string) => {
    if (!name.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    setTags(prevTags =>
      prevTags.map(tag =>
        tag.id === id
          ? { ...tag, name: name.trim(), color }
          : tag
      )
    );
    setError(null);
  }, []);

  const deleteTag = useCallback((id: string) => {
    // Remove tag from all todos
    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        tags: todo.tags.filter(tagId => tagId !== id)
      }))
    );
    
    // Remove tag from tags list
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  }, []);

  // Statistics - OPTIMIZED with useMemo
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const tagCounts = todos.reduce((acc, todo) => {
      todo.tags.forEach(tagId => {
        acc[tagId] = (acc[tagId] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      completed,
      active,
      hasCompleted: completed > 0,
      tagCounts
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
    tags,
    filter,
    loading,
    error,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    clearCompleted,
    addTag,
    updateTag,
    deleteTag
  };
};