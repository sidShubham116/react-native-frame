import { useMemo } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { usePressScale } from '../hooks/usePressScale';
import { AnimatedPressable } from './AnimatedPressable';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  /** Button ke andar dikhne wala text */
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Loading spinner dikhao (tap disable ho jata hai) */
  loading?: boolean;
  disabled?: boolean;
  /** Poori width le le */
  fullWidth?: boolean;
  /** Text ke aage/peeche custom element (icon, etc.) */
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const sizeMap = {
  sm: { padV: 8, padH: 14, font: 14 },
  md: { padV: 12, padH: 20, font: 16 },
  lg: { padV: 16, padH: 28, font: 18 },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  left,
  right,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const { scale, onPressIn, onPressOut } = usePressScale();
  const isDisabled = disabled || loading;
  const s = sizeMap[size];

  const { container, textColor } = useMemo(() => {
    const c = theme.colors;
    switch (variant) {
      case 'secondary':
        return { container: { backgroundColor: c.secondary }, textColor: c.onSecondary };
      case 'outline':
        return {
          container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: c.primary },
          textColor: c.primary,
        };
      case 'ghost':
        return { container: { backgroundColor: 'transparent' }, textColor: c.primary };
      case 'primary':
      default:
        return { container: { backgroundColor: c.primary }, textColor: c.onPrimary };
    }
  }, [theme, variant]);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.base,
        { paddingVertical: s.padV, paddingHorizontal: s.padH, borderRadius: theme.radius.md },
        container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        { transform: [{ scale }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.row}>
          {left}
          <Text style={[styles.text, { color: textColor, fontSize: s.font }]}>{label}</Text>
          {right}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
  text: { fontWeight: '600' },
});
