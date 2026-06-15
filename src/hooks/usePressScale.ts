import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Press hone par element ko thoda chhota karta hai (spring animation).
 * useNativeDriver: true — yaani 60fps, JS thread free.
 *
 * Use:
 *   const { scale, onPressIn, onPressOut } = usePressScale();
 *   <Animated.View style={{ transform: [{ scale }] }} ... />
 */
export function usePressScale(toValue = 0.96) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
}
