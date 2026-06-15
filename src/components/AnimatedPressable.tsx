import { Animated, Pressable } from 'react-native';

/**
 * Pressable ka animated version — iske transform/opacity ko
 * Animated.Value se control kar sakte hain (scale, fade, etc.).
 */
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
