import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Flex, Input, Button, Text } from '../styles';
import { theme } from '../styles';
import { PrioritySelector } from './PrioritySelector';
import { TodoPriority } from '../types';

interface AddTodoProps {
  onAdd: (text: string, priority?: TodoPriority) => void;
  loading?: boolean;
  error?: string | null;
}

export const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  loading = false,
  error
}) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onAdd(text.trim(), priority);
      setText('');
      setPriority('medium');
    }
  }, [text, priority, onAdd, loading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Box
      $padding={theme.spacing.lg}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.lg}
      $shadow={theme.shadows.md}
      $margin={`0 0 ${theme.spacing.lg} 0`}
    >
      <form onSubmit={handleSubmit}>
        <Flex $direction="column" $gap={theme.spacing.md}>
          {/* Text Input */}
          <Flex $gap={theme.spacing.md} $align="center">
            <Input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              $fullWidth
              $size="lg"
              $error={!!error}
              disabled={loading}
              aria-label="Add new todo"
              aria-describedby={error ? 'todo-error' : undefined}
            />
            <Button
              type="submit"
              $variant="primary"
              $size="lg"
              $disabled={!text.trim() || loading}
              aria-label="Add todo"
            >
              {loading ? 'Adding...' : 'Add Todo'}
            </Button>
          </Flex>
          
          {/* Priority Selector */}
          <PrioritySelector
            selectedPriority={priority}
            onPriorityChange={setPriority}
            size="md"
            showLabels={true}
          />
          
          {/* Error Message */}
          {error && (
            <Text
              id="todo-error"
              $size="sm"
              $color={theme.colors.error}
              $align="left"
            >
              {error}
            </Text>
          )}
        </Flex>
      </form>
    </Box>
  );
};