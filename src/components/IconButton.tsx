import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { usePressScale } from '../hooks/usePressScale';
import { AnimatedPressable } from './AnimatedPressable';

export type IconButtonVariant = 'plain' | 'tonal' | 'filled';

export type IconButtonProps = {
  /** Icon element (ya emoji/text node) */
  icon: React.ReactNode;
  onPress?: () => void;
  /** Touch target ka diameter */
  size?: number;
  /** plain (transparent) | tonal (halka bg) | filled (primary bg) */
  variant?: IconButtonVariant;
  /** filled variant ka bg override */
  color?: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/** Round pressable icon-only button — press par spring scale */
export function IconButton({
  icon,
  onPress,
  size = 40,
  variant = 'plain',
  color,
  disabled = false,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  const theme = useTheme();
  const { scale, onPressIn, onPressOut } = usePressScale();

  const backgroundColor =
    variant === 'filled'
      ? (color ?? theme.colors.primary)
      : variant === 'tonal'
        ? theme.colors.surfaceVariant
        : 'transparent';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          transform: [{ scale }],
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.5 },
});
