import { useRef, useState, type ComponentRef } from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

type Rect = { x: number; y: number; width: number; height: number };

export type TooltipProps = {
  /** Bubble ke andar ka text */
  content: string;
  /** Jis element par tooltip dikhana hai */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Child ko tap/long-press karne par uske neeche ek tooltip bubble dikhata hai.
 * Bahar tap karne se band ho jata hai.
 */
export function Tooltip({ content, children, style }: TooltipProps) {
  const theme = useTheme();
  const anchorRef = useRef<ComponentRef<typeof View>>(null);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);

  const open = () => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setRect({ x, y, width, height });
      setVisible(true);
    });
  };

  return (
    <>
      <View ref={anchorRef} collapsable={false} style={style}>
        <Pressable onPress={open} onLongPress={open} delayLongPress={200}>
          {children}
        </Pressable>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setVisible(false)}
        >
          {rect ? (
            <View
              style={[
                styles.bubble,
                {
                  top: rect.y + rect.height + 8,
                  left: rect.x,
                  backgroundColor: theme.colors.text,
                  borderRadius: theme.radius.sm,
                },
              ]}
            >
              <Text
                variant="caption"
                style={{ color: theme.colors.background }}
              >
                {content}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    maxWidth: 240,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});
