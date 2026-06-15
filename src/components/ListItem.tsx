import {
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

export type ListItemProps = {
  title: string;
  /** Title ke neeche choti description */
  description?: string;
  /** Left element (Avatar, icon, etc.) */
  left?: React.ReactNode;
  /** Right element (chevron, Switch, Badge, etc.) */
  right?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** List row — left/right slots + title/description. onPress diya to tappable ho jata hai */
export function ListItem({
  title,
  description,
  left,
  right,
  onPress,
  disabled = false,
  style,
}: ListItemProps) {
  const theme = useTheme();

  const content = (
    <View style={[styles.row, disabled && styles.disabled, style]}>
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.text}>
        <Text variant="body" weight="600" numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text variant="caption" muted numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: theme.colors.surfaceVariant }}
      style={({ pressed }) =>
        pressed ? { backgroundColor: theme.colors.surfaceVariant } : null
      }
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  left: { justifyContent: 'center' },
  text: { flex: 1, gap: 2 },
  right: { justifyContent: 'center' },
  disabled: { opacity: 0.5 },
});
