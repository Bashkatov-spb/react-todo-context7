import React, { useCallback } from 'react';
import { TodoPriority } from '../types';
import { Box, Flex, Button, Text } from '../styles';
import { theme } from '../styles';

interface PrioritySelectorProps {
  selectedPriority: TodoPriority;
  onPriorityChange: (priority: TodoPriority) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

const priorityConfig = {
  low: {
    label: 'Low',
    color: theme.colors.success,
    icon: '🟢',
    description: 'Low priority'
  },
  medium: {
    label: 'Medium',
    color: theme.colors.warning,
    icon: '🟡',
    description: 'Medium priority'
  },
  high: {
    label: 'High',
    color: theme.colors.error,
    icon: '🔴',
    description: 'High priority'
  },
  urgent: {
    label: 'Urgent',
    color: theme.colors.dark,
    icon: '⚫',
    description: 'Urgent priority'
  }
} as const;

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
  size = 'md',
  showLabels = true
}) => {
  const handlePriorityChange = useCallback((priority: TodoPriority) => {
    onPriorityChange(priority);
  }, [onPriorityChange]);

  const priorities: TodoPriority[] = ['low', 'medium', 'high', 'urgent'];

  return (
    <Flex $gap={theme.spacing.sm} $align="center">
      {showLabels && (
        <Text $size="sm" $color={theme.colors.gray[600]}>
          Priority:
        </Text>
      )}
      
      <Flex $gap={theme.spacing.xs}>
        {priorities.map((priority) => {
          const config = priorityConfig[priority];
          const isSelected = selectedPriority === priority;
          
          return (
            <Button
              key={priority}
              $variant={isSelected ? 'primary' : 'ghost'}
              $size={size}
              onClick={() => handlePriorityChange(priority)}
              aria-label={config.description}
              aria-pressed={isSelected}
              style={{
                minWidth: 'auto',
                padding: size === 'sm' ? theme.spacing.xs : theme.spacing.sm,
                backgroundColor: isSelected ? config.color : 'transparent',
                borderColor: config.color,
                color: isSelected ? theme.colors.white : config.color
              }}
            >
              <Flex $gap={theme.spacing.xs} $align="center">
                <Text $size="sm">{config.icon}</Text>
                {showLabels && (
                  <Text $size="sm" $weight="medium">
                    {config.label}
                  </Text>
                )}
              </Flex>
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};