export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormData {
  text: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  hasCompleted: boolean;
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
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setFilter: (filter: TodoFilter) => void;
  clearCompleted: () => void;
}