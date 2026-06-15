import { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

export type SnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  /** Kitni der baad khud band ho (ms). 0 = sirf manual */
  duration?: number;
  /** Right side action button — { label, onPress } */
  action?: { label: string; onPress: () => void };
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Bottom se slide-up hone wala status message.
 * Apne screen ke sabse neeche (parent ke andar) render karo —
 * ye absolute position leta hai.
 */
export function Snackbar({
  visible,
  onDismiss,
  duration = 3500,
  action,
  children,
  style,
}: SnackbarProps) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    if (visible && duration > 0) {
      const t = setTimeout(onDismiss, duration);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [visible, duration, onDismiss, anim]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 0],
  });

  return (
    <Animated.View
      pointerEvents={visible ? 'box-none' : 'none'}
      style={[styles.wrap, { opacity: anim, transform: [{ translateY }] }]}
    >
      <View
        style={[
          styles.bar,
          { backgroundColor: theme.colors.text, borderRadius: theme.radius.md },
          style,
        ]}
      >
        <Text style={[styles.msg, { color: theme.colors.background }]}>
          {children}
        </Text>
        {action ? (
          <Pressable onPress={action.onPress} hitSlop={8}>
            <Text variant="label" style={{ color: theme.colors.primary }}>
              {action.label}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  msg: { flexShrink: 1 },
});
