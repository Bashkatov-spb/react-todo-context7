import React from 'react';
import { useTodos } from '@/hooks';
import { AddTodo, TodoList, TodoFilters, ErrorAlert, SearchTodos } from '@/components';
import { Box, Flex, Heading, Text } from '@/styles';
import { theme } from '@/styles';

const App: React.FC = () => {
  const {
    todos,
    allTodos,
    filter,
    searchQuery,
    loading,
    error,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    setSearchQuery,
    clearCompleted
  } = useTodos();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Box
      $padding={theme.spacing.lg}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.info} 100%)`
      }}
    >
      <Flex
        $direction="column"
        $align="center"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: `${theme.spacing.xl} 0`
        }}
      >
        {/* Header */}
        <Box
          $padding={theme.spacing.xl}
          $background={theme.colors.white}
          $borderRadius={theme.borderRadius.xl}
          $shadow={theme.shadows.xl}
          $margin={`0 0 ${theme.spacing.xl} 0`}
          style={{ textAlign: 'center', width: '100%' }}
        >
          <Heading $level={1} $color={theme.colors.primary} $align="center">
            React Todo App
          </Heading>
          <Text
            $size="lg"
            $color={theme.colors.gray[600]}
            $align="center"
            style={{ marginTop: theme.spacing.md }}
          >
            Built with React 19, TypeScript & Styled Components
          </Text>
        </Box>

        {/* Error Alert */}
        <ErrorAlert error={error} />

        {/* Search Todos */}
        <SearchTodos
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          resultsCount={todos.length}
        />

        {/* Add Todo Form */}
        <AddTodo
          onAdd={addTodo}
          loading={loading}
          error={error}
        />

        {/* Todo List */}
        <Box style={{ width: '100%' }}>
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            loading={loading}
          />
        </Box>

        {/* Filters */}
        {stats.total > 0 && (
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            totalTodos={stats.total}
            completedTodos={stats.completed}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* Footer */}
        <Box
          $padding={theme.spacing.lg}
          $background={theme.colors.white}
          $borderRadius={theme.borderRadius.lg}
          $shadow={theme.shadows.md}
          $margin={`${theme.spacing.xl} 0 0 0`}
          style={{ textAlign: 'center', width: '100%' }}
        >
          <Text $size="sm" $color={theme.colors.gray[500]}>
            Total: {stats.total} todos | Completed: {stats.completed} | Active: {stats.active}
            {searchQuery && ` | Search: "${searchQuery}"`}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;