import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { AnimatedPressable } from './AnimatedPressable';

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  /** Kis taraf se aaye (default: left) */
  side?: 'left' | 'right';
  /** Panel ki width (default: screen ka 80%, max 320) */
  width?: number;
};

/**
 * Slide-in side panel — overlay fade + panel translateX animation ke saath.
 * Band hone par bhi smoothly slide-out hota hai (close animation ke baad unmount).
 */
export function Drawer({ open, onClose, children, side = 'left', width }: DrawerProps) {
  const theme = useTheme();
  const { width: screenW } = useWindowDimensions();
  const panelW = width ?? Math.min(320, screenW * 0.8);

  const anim = useRef(new Animated.Value(open ? 1 : 0)).current;
  // Modal ko close-animation ke dauraan mounted rakhne ke liye
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 260,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !open) setMounted(false);
    });
  }, [open, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [side === 'left' ? -panelW : panelW, 0],
  });

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <AnimatedPressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.overlay, opacity: anim }]}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.panel,
            side === 'left' ? { left: 0 } : { right: 0 },
            {
              width: panelW,
              backgroundColor: theme.colors.surface,
              transform: [{ translateX }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingTop: 56,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 16,
  },
});
