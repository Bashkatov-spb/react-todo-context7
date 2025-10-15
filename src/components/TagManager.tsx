import React, { useState, useCallback } from 'react';
import { TodoTag } from '../types';
import { Box, Flex, Button, Input, Text } from '../styles';
import { theme } from '../styles';

interface TagManagerProps {
  tags: TodoTag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onTagCreate: (name: string, color: string) => void;
  onTagDelete: (tagId: string) => void;
  maxHeight?: string;
}

const predefinedColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const TagManager: React.FC<TagManagerProps> = ({
  tags,
  selectedTags,
  onTagToggle,
  onTagCreate,
  onTagDelete,
  maxHeight = '200px'
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(predefinedColors[0]);

  const handleCreateTag = useCallback(() => {
    if (newTagName.trim()) {
      onTagCreate(newTagName.trim(), newTagColor);
      setNewTagName('');
      setIsCreating(false);
    }
  }, [newTagName, newTagColor, onTagCreate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTag();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTagName('');
    }
  }, [handleCreateTag]);

  return (
    <Box>
      {/* Existing Tags */}
      <Box
        style={{
          maxHeight,
          overflowY: 'auto',
          marginBottom: theme.spacing.md
        }}
      >
        <Flex $wrap="wrap" $gap={theme.spacing.sm}>
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <Button
                key={tag.id}
                $variant={isSelected ? 'primary' : 'ghost'}
                $size="sm"
                onClick={() => onTagToggle(tag.id)}
                aria-label={`Toggle ${tag.name} tag`}
                aria-pressed={isSelected}
                style={{
                  backgroundColor: isSelected ? tag.color : 'transparent',
                  borderColor: tag.color,
                  color: isSelected ? theme.colors.white : tag.color,
                  position: 'relative'
                }}
              >
                <Flex $align="center" $gap={theme.spacing.xs}>
                  <Text $size="sm">🏷️</Text>
                  <Text $size="sm" $weight="medium">
                    {tag.name}
                  </Text>
                  <Button
                    $variant="ghost"
                    $size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagDelete(tag.id);
                    }}
                    aria-label={`Delete ${tag.name} tag`}
                    style={{
                      padding: '2px',
                      minWidth: 'auto',
                      color: isSelected ? theme.colors.white : tag.color
                    }}
                  >
                    ✕
                  </Button>
                </Flex>
              </Button>
            );
          })}
        </Flex>
      </Box>

      {/* Create New Tag */}
      {isCreating ? (
        <Box
          $padding={theme.spacing.md}
          $background={theme.colors.gray[100]}
          $borderRadius={theme.borderRadius.md}
        >
          <Flex $direction="column" $gap={theme.spacing.sm}>
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tag name"
              $size="sm"
              autoFocus
            />
            
            <Flex $gap={theme.spacing.sm} $align="center">
              <Text $size="sm" $color={theme.colors.gray[600]}>
                Color:
              </Text>
              <Flex $gap={theme.spacing.xs}>
                {predefinedColors.map((color) => (
                  <Button
                    key={color}
                    $variant="ghost"
                    $size="sm"
                    onClick={() => setNewTagColor(color)}
                    style={{
                      width: '24px',
                      height: '24px',
                      padding: 0,
                      backgroundColor: color,
                      border: newTagColor === color ? `2px solid ${theme.colors.dark}` : `1px solid ${color}`,
                      borderRadius: '50%'
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex $gap={theme.spacing.sm}>
              <Button
                $variant="success"
                $size="sm"
                onClick={handleCreateTag}
                $disabled={!newTagName.trim()}
              >
                Create
              </Button>
              <Button
                $variant="secondary"
                $size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setNewTagName('');
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Button
          $variant="ghost"
          $size="sm"
          onClick={() => setIsCreating(true)}
          aria-label="Create new tag"
        >
          + Add Tag
        </Button>
      )}
    </Box>
  );
};