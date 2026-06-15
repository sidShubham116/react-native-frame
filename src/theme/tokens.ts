import type { Theme, ThemeSpacing, ThemeRadius, ThemeFontSizes } from './types';

/** Spacing scale — saari padding/margin yahin se aati hai (consistency) */
const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/** Corner radius scale */
const radius: ThemeRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
};

/** Font size scale */
const fontSize: ThemeFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

/** Light theme — default */
export const lightTheme: Theme = {
  dark: false,
  spacing,
  radius,
  fontSize,
  colors: {
    primary: '#6C5CE7',
    onPrimary: '#FFFFFF',
    secondary: '#00CEC9',
    onSecondary: '#08313A',
    background: '#F7F7FB',
    surface: '#FFFFFF',
    surfaceVariant: '#EFEFF5',
    text: '#1A1A2E',
    textMuted: '#6B6B7B',
    border: '#E2E2EC',
    error: '#E74C3C',
    success: '#27AE60',
    warning: '#F39C12',
    info: '#3498DB',
    overlay: 'rgba(0,0,0,0.5)',
  },
};

/** Dark theme */
export const darkTheme: Theme = {
  dark: true,
  spacing,
  radius,
  fontSize,
  colors: {
    primary: '#8B7CF8',
    onPrimary: '#FFFFFF',
    secondary: '#00CEC9',
    onSecondary: '#08313A',
    background: '#0F0F1A',
    surface: '#1A1A2E',
    surfaceVariant: '#26263A',
    text: '#F2F2F7',
    textMuted: '#9A9AAE',
    border: '#33334A',
    error: '#FF6B5E',
    success: '#2ECC71',
    warning: '#F5B041',
    info: '#5DADE2',
    overlay: 'rgba(0,0,0,0.65)',
  },
};
