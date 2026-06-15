import { useRef, useState, type ComponentRef } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SliderProps = {
  value: number;
  onValueChange?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  /** Step size — 0 matlab continuous (smooth) */
  step?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const THUMB = 24;
const TRACK_H = 4;

/** Draggable slider — track tap ya thumb drag dono se value badalti hai */
export function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  step = 0,
  disabled = false,
  style,
}: SliderProps) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const containerRef = useRef<ComponentRef<typeof View>>(null);
  const originX = useRef(0);

  const range = maximumValue - minimumValue || 1;
  const clamp = (v: number) =>
    Math.min(maximumValue, Math.max(minimumValue, v));
  const snap = (v: number) => (step > 0 ? Math.round(v / step) * step : v);
  const ratio = (clamp(value) - minimumValue) / range;

  // Screen ki absolute X position se value nikalo
  const valueFromAbs = (absX: number) => {
    const w = widthRef.current;
    if (w <= 0) return value;
    const r = Math.min(1, Math.max(0, (absX - originX.current) / w));
    return clamp(snap(minimumValue + r * range));
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (_e, g) => {
        containerRef.current?.measureInWindow((x) => {
          originX.current = x;
          onValueChange?.(valueFromAbs(g.x0));
        });
      },
      onPanResponderMove: (_e, g) => onValueChange?.(valueFromAbs(g.moveX)),
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  return (
    <View
      ref={containerRef}
      onLayout={onLayout}
      style={[styles.container, disabled && styles.disabled, style]}
      {...responder.panHandlers}
    >
      <View style={[styles.track, { backgroundColor: theme.colors.border }]}>
        <View
          style={[
            styles.fill,
            { width: `${ratio * 100}%`, backgroundColor: theme.colors.primary },
          ]}
        />
      </View>
      <View
        style={[
          styles.thumb,
          {
            left: ratio * width - THUMB / 2,
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.surface,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: THUMB, justifyContent: 'center' },
  track: { height: TRACK_H, borderRadius: TRACK_H / 2, overflow: 'hidden' },
  fill: { height: '100%' },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 2,
    top: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  disabled: { opacity: 0.5 },
});
