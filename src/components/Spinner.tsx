import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SpinnerProps = Omit<ActivityIndicatorProps, 'color'> & {
  /** Theme se color (default: primary). Koi bhi color string bhi de sakte ho. */
  color?: string;
};

/** Loading spinner — theme primary color use karta hai by default */
export function Spinner({ color, size = 'small', ...rest }: SpinnerProps) {
  const theme = useTheme();
  return <ActivityIndicator color={color ?? theme.colors.primary} size={size} {...rest} />;
}
