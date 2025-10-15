import React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { Box, Text } from '../styles';
import { theme } from '../styles';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  loading?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  loading = false
}) => {
  if (loading) {
    return (
      <Box
        $padding={theme.spacing.xl}
        $background={theme.colors.white}
        $borderRadius={theme.borderRadius.lg}
        $shadow={theme.shadows.md}
        style={{ textAlign: 'center' }}
      >
        <Text $size="lg" $color={theme.colors.gray[600]}>
          Loading todos...
        </Text>
      </Box>
    );
  }

  if (todos.length === 0) {
    return (
      <Box
        $padding={theme.spacing.xl}
        $background={theme.colors.white}
        $borderRadius={theme.borderRadius.lg}
        $shadow={theme.shadows.md}
        style={{ textAlign: 'center' }}
      >
        <Text $size="lg" $color={theme.colors.gray[500]}>
          No todos found. Add one above to get started!
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </Box>
  );
};