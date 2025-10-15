import React, { useState, useCallback } from 'react';
import { Todo, TodoTag } from '../types';
import { Box, Flex, Text, Button, Input } from '../styles';
import { theme } from '../styles';
import { TagManager } from './TagManager';

interface TodoItemProps {
  todo: Todo;
  tags: TodoTag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string, tags?: string[]) => void;
  onTagCreate: (name: string, color: string) => void;
  onTagDelete: (tagId: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  tags,
  onToggle,
  onDelete,
  onUpdate,
  onTagCreate,
  onTagDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editTags, setEditTags] = useState<string[]>(todo.tags);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditTags(todo.tags);
  }, [todo.text, todo.tags]);

  const handleSave = useCallback(() => {
    if (editText.trim() && (editText.trim() !== todo.text || JSON.stringify(editTags.sort()) !== JSON.stringify(todo.tags.sort()))) {
      onUpdate(todo.id, editText.trim(), editTags);
    }
    setIsEditing(false);
  }, [todo.id, editText, todo.text, editTags, todo.tags, onUpdate]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditTags(todo.tags);
  }, [todo.text, todo.tags]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  const handleTagToggle = useCallback((tagId: string) => {
    setEditTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  }, []);

  // Get tag objects for display
  const todoTagObjects = tags.filter(tag => todo.tags.includes(tag.id));

  return (
    <Box
      $padding={theme.spacing.md}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.md}
      $shadow={theme.shadows.sm}
      $margin={`0 0 ${theme.spacing.sm} 0`}
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
              <Box>
                <Text $size="sm" $color={theme.colors.gray[600]} $margin={`0 0 ${theme.spacing.xs} 0`}>
                  Tags:
                </Text>
                <TagManager
                  tags={tags}
                  selectedTags={editTags}
                  onTagToggle={handleTagToggle}
                  onTagCreate={onTagCreate}
                  onTagDelete={onTagDelete}
                  maxHeight="80px"
                />
              </Box>
            </Flex>
          ) : (
            <Flex $direction="column" $gap={theme.spacing.sm} style={{ flex: 1 }}>
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
              
              {/* Display Tags */}
              {todoTagObjects.length > 0 && (
                <Flex $wrap="wrap" $gap={theme.spacing.xs}>
                  {todoTagObjects.map((tag) => (
                    <Box
                      key={tag.id}
                      $padding={`${theme.spacing.xs} ${theme.spacing.sm}`}
                      $background={tag.color}
                      $borderRadius={theme.borderRadius.sm}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: theme.spacing.xs
                      }}
                    >
                      <Text $size="xs" $color={theme.colors.white}>
                        🏷️
                      </Text>
                      <Text $size="xs" $color={theme.colors.white} $weight="medium">
                        {tag.name}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              )}
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