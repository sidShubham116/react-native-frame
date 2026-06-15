import { useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

export type CheckboxProps = {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  /** Box ke right me dikhne wala label */
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const BOX = 22;

/** Animated checkbox — check hone par box fill + tick scale-in hota hai */
export function Checkbox({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
}: CheckboxProps) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: false, // bg + border color animate ho rahe hain
      speed: 18,
      bounciness: 8,
    }).start();
  }, [value, anim]);

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', theme.colors.primary],
  });
  const borderColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary],
  });

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onValueChange?.(!value)}
      style={[styles.row, disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.box,
          { backgroundColor, borderColor, borderRadius: theme.radius.sm },
        ]}
      >
        <Animated.Text
          style={[
            styles.tick,
            {
              color: theme.colors.onPrimary,
              opacity: anim,
              transform: [{ scale: anim }],
            },
          ]}
        >
          ✓
        </Animated.Text>
      </Animated.View>
      {label ? (
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  box: {
    width: BOX,
    height: BOX,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: { fontSize: 14, fontWeight: '900', lineHeight: 16 },
  label: { flexShrink: 1 },
  disabled: { opacity: 0.5 },
});
