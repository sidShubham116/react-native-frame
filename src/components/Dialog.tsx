import { useEffect, useRef } from 'react';
import { Modal, View, Pressable, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Surface } from './Surface';
import { Text } from './Typography';

export type DialogProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  /** Niche action buttons (e.g. Cancel / OK) */
  actions?: React.ReactNode;
  /** Overlay pe tap karne se band ho (default true) */
  dismissOnBackdrop?: boolean;
};

/** Modal popup — overlay fade + content scale-in animation ke saath */
export function Dialog({
  visible,
  onClose,
  title,
  children,
  actions,
  dismissOnBackdrop = true,
}: DialogProps) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { backgroundColor: theme.colors.overlay, opacity: anim }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismissOnBackdrop ? onClose : undefined}
        />
        <Animated.View style={{ transform: [{ scale }], width: '100%', maxWidth: 420 }}>
          <Surface elevation={4} style={styles.card}>
            {title ? (
              <Text variant="h3" style={styles.title}>
                {title}
              </Text>
            ) : null}
            <View style={styles.body}>{children}</View>
            {actions ? <View style={styles.actions}>{actions}</View> : null}
          </Surface>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { padding: 20 },
  title: { marginBottom: 8 },
  body: { marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
});
