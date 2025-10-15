export interface TodoTag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  tags: string[]; // Array of tag IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormData {
  text: string;
  tags?: string[];
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  hasCompleted: boolean;
  tagCounts: Record<string, number>;
}

export interface TodoState {
  todos: Todo[];
  allTodos: Todo[];
  tags: TodoTag[];
  filter: TodoFilter;
  loading: boolean;
  error: string | null;
  stats: TodoStats;
}

export interface TodoActions {
  addTodo: (text: string, tags?: string[]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string, tags?: string[]) => void;
  setFilter: (filter: TodoFilter) => void;
  clearCompleted: () => void;
  addTag: (name: string, color: string) => void;
  updateTag: (id: string, name: string, color: string) => void;
  deleteTag: (id: string) => void;
}