import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Flex, Input, Button, Text } from '../styles';
import { theme } from '../styles';

interface SearchTodosProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  resultsCount?: number;
}

export const SearchTodos: React.FC<SearchTodosProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  resultsCount = 0
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        onSearchChange(localQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, searchQuery, onSearchChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setLocalQuery('');
    onClearSearch();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [onClearSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  }, [handleClear]);

  return (
    <Box
      $padding={theme.spacing.lg}
      $background={theme.colors.white}
      $borderRadius={theme.borderRadius.lg}
      $shadow={theme.shadows.md}
      $margin={`0 0 ${theme.spacing.lg} 0`}
    >
      <Flex $gap={theme.spacing.md} $align="center">
        <Box style={{ position: 'relative', flex: 1 }}>
          <Input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search todos..."
            $fullWidth
            $size="md"
            aria-label="Search todos"
            style={{
              paddingLeft: '2.5rem'
            }}
          />
          <Box
            style={{
              position: 'absolute',
              left: theme.spacing.md,
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.gray[500],
              pointerEvents: 'none'
            }}
          >
            🔍
          </Box>
        </Box>
        
        {searchQuery && (
          <Button
            $variant="ghost"
            $size="md"
            onClick={handleClear}
            aria-label="Clear search"
          >
            Clear
          </Button>
        )}
      </Flex>
      
      {searchQuery && (
        <Text
          $size="sm"
          $color={theme.colors.gray[600]}
          style={{ marginTop: theme.spacing.sm }}
        >
          {resultsCount === 0 
            ? 'No todos found' 
            : `Found ${resultsCount} ${resultsCount === 1 ? 'todo' : 'todos'}`
          }
        </Text>
      )}
    </Box>
  );
};