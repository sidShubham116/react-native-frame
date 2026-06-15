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

export type TabItem = {
  key: string;
  label: string;
};

export type TabsProps = {
  items: TabItem[];
  /** Abhi selected tab ki key */
  value: string;
  onChange?: (key: string) => void;
  style?: StyleProp<ViewStyle>;
};

type Box = { x: number; width: number };

// Pill aur tab ke beech ka chhota gap
const GUTTER = 4;

/**
 * Segmented control style tabs — selected ke peeche ek pill
 * smoothly slide karta hai (spring) jab tab change hota hai.
 *
 * Container ki padding 0 rakhi gayi hai taaki flex tabs aur
 * absolute indicator dono ek hi origin (0) se align ho — gutter
 * indicator par manually inset kiya jata hai.
 */
export function Tabs({ items, value, onChange, style }: TabsProps) {
  const theme = useTheme();
  const [layouts, setLayouts] = useState<Record<string, Box>>({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;
  const ready = useRef(false);

  const active = layouts[value];

  useEffect(() => {
    if (!active) return;
    const x = active.x + GUTTER;
    const w = active.width - GUTTER * 2;
    const config = { useNativeDriver: false, speed: 18, bounciness: 8 };

    // Pehli baar measure hone par bina animation ke set karo (jump na dikhe)
    if (!ready.current) {
      indicatorX.setValue(x);
      indicatorW.setValue(w);
      ready.current = true;
      return;
    }
    Animated.spring(indicatorX, { toValue: x, ...config }).start();
    Animated.spring(indicatorW, { toValue: w, ...config }).start();
  }, [active, indicatorX, indicatorW]);

  const onTabLayout = (key: string) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setLayouts((prev) =>
      prev[key]?.x === x && prev[key]?.width === width
        ? prev
        : { ...prev, [key]: { x, width } }
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.radius.md,
        },
        style,
      ]}
    >
      {active ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              left: indicatorX,
              width: indicatorW,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.sm,
            },
          ]}
        />
      ) : null}

      {items.map((item) => {
        const isActive = item.key === value;
        return (
          <Pressable
            key={item.key}
            onLayout={onTabLayout(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange?.(item.key)}
            style={styles.tab}
          >
            <Text
              variant="label"
              center
              style={{
                color: isActive ? theme.colors.primary : theme.colors.textMuted,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 0 },
  indicator: {
    position: 'absolute',
    top: GUTTER,
    bottom: GUTTER,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
