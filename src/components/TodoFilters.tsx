import React, { useCallback } from 'react';
import { TodoFilter } from '../types';
import { Box, Flex, Button, Text } from '../styles';
import { theme } from '../styles';

interface TodoFiltersProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  totalTodos: number;
  completedTodos: number;
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  totalTodos,
  completedTodos,
  onClearCompleted
}) => {
  const activeTodos = totalTodos - completedTodos;

  const handleFilterChange = useCallback((filter: TodoFilter) => {
    onFilterChange(filter);
  }, [onFilterChange]);

  const handleClearCompleted = useCallback(() => {
    onClearCompleted();
  }, [onClearCompleted]);

  const filters: { key: TodoFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <Box
      $padding={theme.spacing.lg}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.lg}
      $shadow={theme.shadows.md}
    >
      <Flex $justify="space-between" $align="center" $wrap="wrap" $gap={theme.spacing.md}>
        <Text $size="sm" $color={theme.colors.gray[600]}>
          {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
        </Text>

        <Flex $gap={theme.spacing.sm}>
          {filters.map(({ key, label }) => (
            <Button
              key={key}
              $variant={currentFilter === key ? 'primary' : 'ghost'}
              $size="sm"
              onClick={() => handleFilterChange(key)}
              aria-label={`Filter by ${label.toLowerCase()}`}
              aria-pressed={currentFilter === key}
            >
              {label}
            </Button>
          ))}
        </Flex>

        {completedTodos > 0 && (
          <Button
            $variant="ghost"
            $size="sm"
            onClick={handleClearCompleted}
            aria-label={`Clear ${completedTodos} completed ${completedTodos === 1 ? 'item' : 'items'}`}
          >
            Clear completed ({completedTodos})
          </Button>
        )}
      </Flex>
    </Box>
  );
};