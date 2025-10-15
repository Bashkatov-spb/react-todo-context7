import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Button } from '../styles';
import { theme } from '../styles';

interface ErrorAlertProps {
  error: string | null;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onDismiss,
  autoHide = true,
  autoHideDelay = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onDismiss) {
            onDismiss();
          }
        }, autoHideDelay);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHide, autoHideDelay, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!error || !isVisible) {
    return null;
  }

  return (
    <Box
      $padding={theme.spacing.md}
      $background={theme.colors.error}
      $borderRadius={theme.borderRadius.md}
      $shadow={theme.shadows.md}
      $margin={`0 0 ${theme.spacing.md} 0`}
      style={{
        animation: 'slideDown 0.3s ease-out'
      }}
    >
      <Flex $justify="space-between" $align="center" $gap={theme.spacing.md}>
        <Text $size="md" $color={theme.colors.white} style={{ flex: 1 }}>
          {error}
        </Text>
        <Button
          $variant="ghost"
          $size="sm"
          onClick={handleDismiss}
          aria-label="Dismiss error"
          style={{ color: theme.colors.white }}
        >
          ✕
        </Button>
      </Flex>
    </Box>
  );
};