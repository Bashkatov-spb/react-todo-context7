export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormData {
  text: string;
  priority?: TodoPriority;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  hasCompleted: boolean;
  priorityCounts: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}

export interface TodoState {
  todos: Todo[];
  allTodos: Todo[];
  filter: TodoFilter;
  loading: boolean;
  error: string | null;
  stats: TodoStats;
}

export interface TodoActions {
  addTodo: (text: string, priority?: TodoPriority) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string, priority?: TodoPriority) => void;
  setFilter: (filter: TodoFilter) => void;
  clearCompleted: () => void;
}