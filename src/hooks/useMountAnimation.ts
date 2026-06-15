import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export type MountAnimationOptions = {
  /** Entrance start hone se pehle ka delay (ms) — stagger ke liye useful */
  delay?: number;
  /** Kitne px neeche se slide-up ho (default 12) */
  offset?: number;
  /** Animation duration (ms) */
  duration?: number;
};

/**
 * Mount par fade + slide-up entrance. Returned object ko seedha
 * kisi Animated.View ke style me daal do.
 *
 * Use:
 *   const enter = useMountAnimation({ delay: 100 });
 *   <Animated.View style={enter}>...</Animated.View>
 *
 * Native driver use hota hai (opacity + transform) — JS thread free, 60fps.
 */
export function useMountAnimation({
  delay = 0,
  offset = 12,
  duration = 350,
}: MountAnimationOptions = {}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, delay, duration]);

  return {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
    ],
  };
}
