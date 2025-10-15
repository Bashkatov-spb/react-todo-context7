import React, { useState, useCallback } from 'react';
import { Todo, TodoPriority } from '../types';
import { Box, Flex, Text, Button, Input } from '../styles';
import { theme } from '../styles';
import { PrioritySelector } from './PrioritySelector';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string, priority?: TodoPriority) => void;
}

const priorityConfig = {
  low: { color: theme.colors.success, icon: '🟢' },
  medium: { color: theme.colors.warning, icon: '🟡' },
  high: { color: theme.colors.error, icon: '🔴' },
  urgent: { color: theme.colors.dark, icon: '⚫' }
} as const;

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<TodoPriority>(todo.priority);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditPriority(todo.priority);
  }, [todo.text, todo.priority]);

  const handleSave = useCallback(() => {
    if (editText.trim() && (editText.trim() !== todo.text || editPriority !== todo.priority)) {
      onUpdate(todo.id, editText.trim(), editPriority);
    }
    setIsEditing(false);
  }, [todo.id, editText, todo.text, editPriority, todo.priority, onUpdate]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditPriority(todo.priority);
  }, [todo.text, todo.priority]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const priorityInfo = priorityConfig[todo.priority];

  return (
    <Box
      $padding={theme.spacing.md}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.md}
      $shadow={theme.shadows.sm}
      $margin={`0 0 ${theme.spacing.sm} 0`}
      style={{
        borderLeft: `4px solid ${priorityInfo.color}`
      }}
    >
      <Flex $direction="column" $gap={theme.spacing.sm}>
        {/* Main Content */}
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
            <Flex $direction="column" $gap={theme.spacing.sm} style={{ flex: 1 }}>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                $fullWidth
                $size="md"
                autoFocus
              />
              <PrioritySelector
                selectedPriority={editPriority}
                onPriorityChange={setEditPriority}
                size="sm"
                showLabels={false}
              />
            </Flex>
          ) : (
            <Flex $direction="column" $gap={theme.spacing.xs} style={{ flex: 1 }}>
              <Flex $align="center" $gap={theme.spacing.sm}>
                <Text
                  $size="sm"
                  $color={priorityInfo.color}
                  style={{ fontWeight: 'bold' }}
                >
                  {priorityInfo.icon}
                </Text>
                <Text
                  $size="sm"
                  $color={theme.colors.gray[600]}
                  style={{ textTransform: 'capitalize' }}
                >
                  {todo.priority}
                </Text>
              </Flex>
              <Text
                $size="md"
                $color={todo.completed ? theme.colors.gray[500] : theme.colors.gray[800]}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
                onClick={handleEdit}
              >
                {todo.text}
              </Text>
            </Flex>
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
      </Flex>
    </Box>
  );
};