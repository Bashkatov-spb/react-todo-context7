import React, { useState, useCallback } from 'react';
import { Todo } from '../types';
import { Box, Flex, Text, Button, Input } from '../styles';
import { theme } from '../styles';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(todo.text);
  }, [todo.text]);

  const handleSave = useCallback(() => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onUpdate(todo.id, editText.trim());
    }
    setIsEditing(false);
  }, [todo.id, editText, todo.text, onUpdate]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditText(todo.text);
  }, [todo.text]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  return (
    <Box
      $padding={theme.spacing.md}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.md}
      $shadow={theme.shadows.sm}
      $margin={`0 0 ${theme.spacing.sm} 0`}
    >
      <Flex $align="center" $gap={theme.spacing.md}>
        <Button
          $variant="ghost"
          $size="sm"
          onClick={handleToggle}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Box
            $padding={theme.spacing.xs}
            $background={todo.completed ? theme.colors.success : 'transparent'}
            $borderRadius="50%"
            style={{
              width: '20px',
              height: '20px',
              border: `2px solid ${todo.completed ? theme.colors.success : theme.colors.gray[400]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {todo.completed && (
              <Text
                $size="sm"
                $color={theme.colors.white}
                style={{ fontWeight: 'bold' }}
              >
                ✓
              </Text>
            )}
          </Box>
        </Button>

        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            $fullWidth
            $size="md"
            autoFocus
          />
        ) : (
          <Text
            $size="md"
            $color={todo.completed ? theme.colors.gray[500] : theme.colors.gray[800]}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1,
              cursor: 'pointer'
            }}
            onClick={handleEdit}
          >
            {todo.text}
          </Text>
        )}

        <Flex $gap={theme.spacing.sm}>
          {isEditing ? (
            <>
              <Button
                $variant="success"
                $size="sm"
                onClick={handleSave}
                aria-label="Save changes"
              >
                Save
              </Button>
              <Button
                $variant="secondary"
                $size="sm"
                onClick={handleCancel}
                aria-label="Cancel editing"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                $variant="ghost"
                $size="sm"
                onClick={handleEdit}
                aria-label="Edit todo"
              >
                Edit
              </Button>
              <Button
                $variant="error"
                $size="sm"
                onClick={handleDelete}
                aria-label="Delete todo"
              >
                Delete
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};