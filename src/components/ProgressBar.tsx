import { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type ProgressBarProps = {
  /** 0 se 1 ke beech. undefined chhodo to indeterminate (loop) chalega */
  progress?: number;
  height?: number;
  /** Fill color (default: primary) */
  color?: string;
  /** Track color (default: theme border) */
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
};

/** Determinate (progress diya) ya indeterminate (loop) progress bar */
export function ProgressBar({
  progress,
  height = 6,
  color,
  trackColor,
  style,
}: ProgressBarProps) {
  const theme = useTheme();
  const determinate = typeof progress === 'number';
  const [width, setWidth] = useState(0);

  const fillAnim = useRef(new Animated.Value(0)).current;
  const loopAnim = useRef(new Animated.Value(0)).current;

  // Determinate: width 0% -> progress%
  useEffect(() => {
    if (determinate) {
      Animated.timing(fillAnim, {
        toValue: Math.min(1, Math.max(0, progress as number)),
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, determinate, fillAnim]);

  // Indeterminate: chhoti bar ko left -> right loop me chalao
  useEffect(() => {
    if (!determinate) {
      const animation = Animated.loop(
        Animated.timing(loopAnim, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
    return undefined;
  }, [determinate, loopAnim]);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  const fillColor = color ?? theme.colors.primary;
  const widthInterpolate = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const indWidth = width * 0.3;
  const translateX = loopAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-indWidth, width],
  });

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: trackColor ?? theme.colors.border,
        },
        style,
      ]}
    >
      {determinate ? (
        <Animated.View
          style={[
            styles.fill,
            { width: widthInterpolate, backgroundColor: fillColor },
          ]}
        />
      ) : width > 0 ? (
        <Animated.View
          style={[
            styles.fill,
            {
              width: indWidth,
              backgroundColor: fillColor,
              transform: [{ translateX }],
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
});
