import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Flex, Input, Button, Text } from '../styles';
import { theme } from '../styles';
import { TagManager } from './TagManager';
import { TodoTag } from '../types';

interface AddTodoProps {
  onAdd: (text: string, tags?: string[]) => void;
  tags: TodoTag[];
  loading?: boolean;
  error?: string | null;
}

export const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  tags,
  loading = false,
  error
}) => {
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onAdd(text.trim(), selectedTags);
      setText('');
      setSelectedTags([]);
    }
  }, [text, selectedTags, onAdd, loading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const handleTagToggle = useCallback((tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  }, []);

  const handleTagCreate = useCallback((name: string, color: string) => {
    // This will be handled by the parent component
    // For now, we'll just log it
    console.log('Creating tag:', { name, color });
  }, []);

  const handleTagDelete = useCallback((tagId: string) => {
    // This will be handled by the parent component
    console.log('Deleting tag:', tagId);
  }, []);

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
          
          {/* Tag Manager */}
          <Box>
            <Text $size="sm" $color={theme.colors.gray[600]} $margin={`0 0 ${theme.spacing.sm} 0`}>
              Tags:
            </Text>
            <TagManager
              tags={tags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onTagCreate={handleTagCreate}
              onTagDelete={handleTagDelete}
              maxHeight="120px"
            />
          </Box>
          
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