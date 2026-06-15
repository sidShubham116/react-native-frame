import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { usePressScale } from '../hooks/usePressScale';
import { Surface } from './Surface';
import { AnimatedPressable } from './AnimatedPressable';

export type CardProps = {
  children: React.ReactNode;
  /** Tap karne par chalega — diye to card pressable + animated ban jayega */
  onPress?: () => void;
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Andar ki padding (theme.spacing key) */
  padding?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
};

export function Card({
  children,
  onPress,
  elevation = 2,
  padding = 'md',
  style,
}: CardProps) {
  const theme = useTheme();
  const { scale, onPressIn, onPressOut } = usePressScale(0.98);
  const pad = { sm: theme.spacing.sm, md: theme.spacing.md, lg: theme.spacing.lg }[padding];

  const content = (
    <Surface elevation={elevation} style={[{ padding: pad }, style]}>
      {children}
    </Surface>
  );

  if (!onPress) return content;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.pressable, { transform: [{ scale }] }]}
    >
      {content}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pressable: { alignSelf: 'stretch' },
});
