import { Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { usePressScale } from '../hooks/usePressScale';
import { AnimatedPressable } from './AnimatedPressable';

export type ChipProps = {
  label: string;
  /** Selected state — color fill ho jata hai */
  selected?: boolean;
  onPress?: () => void;
  left?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Selectable pill — filters, tags ke liye */
export function Chip({ label, selected = false, onPress, left, disabled = false, style }: ChipProps) {
  const theme = useTheme();
  const { scale, onPressIn, onPressOut } = usePressScale(0.95);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.base,
        {
          borderRadius: theme.radius.full,
          backgroundColor: selected ? theme.colors.primary : theme.colors.surfaceVariant,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
          transform: [{ scale }],
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {left}
      <Text
        style={{
          color: selected ? theme.colors.onPrimary : theme.colors.text,
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  disabled: { opacity: 0.5 },
});
