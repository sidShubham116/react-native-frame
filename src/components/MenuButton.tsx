import { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type MenuButtonProps = {
  /** true = ✕ (close), false = ≡ (hamburger) */
  open: boolean;
  onPress: () => void;
  /** Lines ka color (default: theme.text) */
  color?: string;
  /** Icon ka overall size */
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Animated hamburger button — `open` ke hisaab se ≡ se ✕ mein morph hota hai.
 * Teen lines: upar/niche wali center pe aake rotate (45°/-45°), beech wali fade out.
 */
export function MenuButton({ open, onPress, color, size = 26, style }: MenuButtonProps) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open, anim]);

  const barColor = color ?? theme.colors.text;
  const barW = size;
  const barH = Math.max(2, Math.round(size / 11));
  const gap = barH * 3; // lines ke beech ka faasla

  const topTranslate = anim.interpolate({ inputRange: [0, 1], outputRange: [-gap, 0] });
  const topRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const bottomTranslate = anim.interpolate({ inputRange: [0, 1], outputRange: [gap, 0] });
  const bottomRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });
  const midOpacity = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 0, 0] });

  const bar = { width: barW, height: barH, backgroundColor: barColor, borderRadius: barH / 2 };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={open ? 'Close menu' : 'Open menu'}
      hitSlop={10}
      onPress={onPress}
      style={[styles.btn, { width: size + 16, height: size + 16 }, style]}
    >
      <Animated.View
        style={[styles.line, bar, { transform: [{ translateY: topTranslate }, { rotate: topRotate }] }]}
      />
      <Animated.View style={[styles.line, bar, { opacity: midOpacity }]} />
      <Animated.View
        style={[
          styles.line,
          bar,
          { transform: [{ translateY: bottomTranslate }, { rotate: bottomRotate }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { alignItems: 'center', justifyContent: 'center' },
  line: { position: 'absolute' },
});
