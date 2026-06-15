/**
 * Design tokens ke types — har theme inhi shapes ko follow karega.
 * Isse light/dark/custom themes sab type-safe rehte hain.
 */

export type ThemeColors = {
  /** Brand ka main color */
  primary: string;
  /** Primary ke upar dikhne wala text/icon color */
  onPrimary: string;
  /** Doosra accent color */
  secondary: string;
  onSecondary: string;
  /** Screen ka background */
  background: string;
  /** Card/Surface jaise raised elements ka background */
  surface: string;
  /** Halka alag surface (input bg, etc.) */
  surfaceVariant: string;
  /** Normal text */
  text: string;
  /** Halka/secondary text */
  textMuted: string;
  /** Borders / dividers */
  border: string;
  /** Status colors */
  error: string;
  success: string;
  warning: string;
  info: string;
  /** Modal ke peeche ka dark overlay */
  overlay: string;
};

export type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ThemeRadius = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  /** Pura round (pill / circle) */
  full: number;
};

export type ThemeFontSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type Theme = {
  /** dark mode active hai ya nahi */
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  fontSize: ThemeFontSizes;
};
