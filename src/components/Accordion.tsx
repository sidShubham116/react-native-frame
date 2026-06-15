import { useEffect, useRef, useState } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

export type AccordionProps = {
  title: string;
  children: React.ReactNode;
  /** Shuru me khula rahe */
  defaultExpanded?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Collapsible section — content ki natural height measure karke
 * usse 0 tak spring animate karta hai. New Architecture (Fabric) par
 * bhi clean chalta hai (LayoutAnimation use nahi hota).
 */
export function Accordion({
  title,
  children,
  defaultExpanded = false,
  style,
}: AccordionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const progress = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: false, // height animate ho rahi hai
      speed: 14,
      bounciness: 4,
    }).start();
  }, [expanded, progress]);

  const onContentLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== contentHeight) setContentHeight(h);
  };

  // Measure hone se pehle: expanded ho to natural height (undefined), warna 0
  const measured = contentHeight > 0;
  const height = measured
    ? progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
      })
    : expanded
      ? undefined
      : 0;
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={[styles.container, { borderColor: theme.colors.border }, style]}
    >
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        style={styles.header}
      >
        <Text variant="label" style={styles.title}>
          {title}
        </Text>
        <Animated.Text
          style={[
            styles.chevron,
            { color: theme.colors.textMuted, transform: [{ rotate }] },
          ]}
        >
          ⌄
        </Animated.Text>
      </Pressable>

      <Animated.View style={{ height, opacity: progress, overflow: 'hidden' }}>
        {/* In-flow wrapper — iski natural height measure hoti hai, parent clip karta hai */}
        <View onLayout={onContentLayout} style={styles.body}>
          {typeof children === 'string' ? (
            <Text variant="body">{children}</Text>
          ) : (
            children
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  title: { flexShrink: 1 },
  chevron: { fontSize: 18, fontWeight: '700' },
  body: { paddingHorizontal: 16, paddingBottom: 14 },
});
