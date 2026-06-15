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
 *
 * Measuring view absolute hai taaki uski height parent ki animated
 * height se constrain na ho — isse iOS + Android dono par measurement
 * sahi aata hai (clipped container ke andar measure karne wali bug nahi).
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
  const measured = contentHeight > 0;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: false, // height + opacity animate ho rahe hain
      speed: 14,
      bounciness: 5,
    }).start();
  }, [expanded, progress]);

  const onContentLayout = (e: LayoutChangeEvent) => {
    const h = Math.round(e.nativeEvent.layout.height);
    if (h > 0 && h !== contentHeight) setContentHeight(h);
  };

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const animatedHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
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

      <Animated.View
        style={{
          // Measure hone tak: collapsed ho to invisible (flash na ho), expanded ho to natural
          height: measured ? animatedHeight : undefined,
          opacity: measured ? progress : expanded ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <View
          onLayout={onContentLayout}
          // Measure hone ke baad absolute — taaki natural height pe rahe aur
          // parent ki clipped height isse compress na kare.
          style={measured ? [styles.body, styles.measure] : styles.body}
        >
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
  measure: { position: 'absolute', left: 0, right: 0, top: 0 },
  body: { paddingHorizontal: 16, paddingBottom: 14 },
});
