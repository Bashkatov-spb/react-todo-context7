import styled from 'styled-components';
import { theme } from './theme';

// Enhanced base components with better performance

// Base components
export const Box = styled.div<{
  $padding?: string;
  $margin?: string;
  $background?: string;
  $borderRadius?: string;
  $shadow?: string;
}>`
  padding: ${props => props.$padding || '0'};
  margin: ${props => props.$margin || '0'};
  background: ${props => props.$background || 'transparent'};
  border-radius: ${props => props.$borderRadius || '0'};
  box-shadow: ${props => props.$shadow || 'none'};
`;

export const Flex = styled(Box)<{
  $direction?: 'row' | 'column';
  $align?: string;
  $justify?: string;
  $gap?: string;
  $wrap?: 'wrap' | 'nowrap';
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'stretch'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap || '0'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
`;

export const Grid = styled(Box)<{
  $columns?: string;
  $gap?: string;
  $alignItems?: string;
  $justifyItems?: string;
}>`
  display: grid;
  grid-template-columns: ${props => props.$columns || '1fr'};
  gap: ${props => props.$gap || '0'};
  align-items: ${props => props.$alignItems || 'stretch'};
  justify-items: ${props => props.$justifyItems || 'stretch'};
`;

// Typography components
export const Text = styled.p<{
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  $color?: string;
  $align?: 'left' | 'center' | 'right';
}>`
  font-size: ${props => {
    const sizes = {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    };
    return sizes[props.$size || 'md'];
  }};
  font-weight: ${props => {
    const weights = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    };
    return weights[props.$weight || 'normal'];
  }};
  color: ${props => props.$color || 'inherit'};
  text-align: ${props => props.$align || 'left'};
  line-height: 1.5;
`;

export const Heading = styled.h1<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6;
  $color?: string;
  $align?: 'left' | 'center' | 'right';
}>`
  font-size: ${props => {
    const sizes = {
      1: '2.5rem',
      2: '2rem',
      3: '1.75rem',
      4: '1.5rem',
      5: '1.25rem',
      6: '1rem'
    };
    return sizes[props.$level || 1];
  }};
  font-weight: 700;
  color: ${props => props.$color || 'inherit'};
  text-align: ${props => props.$align || 'left'};
  line-height: 1.2;
  margin: 0;
`;

// Button component
export const Button = styled.button<{
  $variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${props => {
    const sizes = {
      sm: `${theme.spacing.sm} ${theme.spacing.md}`,
      md: `${theme.spacing.md} ${theme.spacing.lg}`,
      lg: `${theme.spacing.lg} ${theme.spacing.xl}`
    };
    return sizes[props.$size || 'md'];
  }};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  border-radius: ${theme.borderRadius.md};
  font-size: ${props => {
    const sizes = {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem'
    };
    return sizes[props.$size || 'md'];
  }};
  font-weight: 500;
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};

  ${props => {
    const variants = {
      primary: `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background-color: #0056b3;
          border-color: #0056b3;
        }
      `,
      secondary: `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.secondary};
        
        &:hover:not(:disabled) {
          background-color: #545b62;
          border-color: #545b62;
        }
      `,
      success: `
        background-color: ${theme.colors.success};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.success};
        
        &:hover:not(:disabled) {
          background-color: #1e7e34;
          border-color: #1e7e34;
        }
      `,
      warning: `
        background-color: ${theme.colors.warning};
        color: ${theme.colors.dark};
        border: 1px solid ${theme.colors.warning};
        
        &:hover:not(:disabled) {
          background-color: #e0a800;
          border-color: #e0a800;
        }
      `,
      error: `
        background-color: ${theme.colors.error};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.error};
        
        &:hover:not(:disabled) {
          background-color: #c82333;
          border-color: #c82333;
        }
      `,
      ghost: `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        }
      `
    };
    return variants[props.$variant || 'primary'];
  }}

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Input component
export const Input = styled.input<{
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $error?: boolean;
}>`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  padding: ${props => {
    const sizes = {
      sm: `${theme.spacing.sm} ${theme.spacing.md}`,
      md: `${theme.spacing.md} ${theme.spacing.lg}`,
      lg: `${theme.spacing.lg} ${theme.spacing.xl}`
    };
    return sizes[props.$size || 'md'];
  }};
  font-size: ${props => {
    const sizes = {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem'
    };
    return sizes[props.$size || 'md'];
  }};
  border: 1px solid ${props => props.$error ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray[800]};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${props => props.$error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
  }
`;

// Card component
export const Card = styled(Box)<{
  $padding?: string;
  $shadow?: string;
  $hover?: boolean;
}>`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${props => props.$shadow || theme.shadows.md};
  transition: ${props => props.$hover ? `box-shadow ${theme.transitions.fast}` : 'none'};

  ${props => props.$hover && `
    &:hover {
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

// Enhanced Container component
export const Container = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

// Enhanced Button with better accessibility
export const AccessibleButton = styled(Button)<{
  $variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $disabled?: boolean;
}>`
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

// Enhanced Input with better accessibility
export const AccessibleInput = styled(Input)<{
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $error?: boolean;
}>`
  &:focus {
    border-color: ${props => props.$error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;