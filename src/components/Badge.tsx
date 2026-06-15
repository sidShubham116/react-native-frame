import { View, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type BadgeStatus = 'primary' | 'success' | 'error' | 'warning' | 'info';

export type BadgeProps = {
  /** Number ya text. Khali chhodo to chhota dot dikhega */
  label?: string | number;
  status?: BadgeStatus;
  /** Sirf dot (count ke bina) */
  dot?: boolean;
  /** 99+ jaise cap ke liye max number */
  max?: number;
  style?: StyleProp<ViewStyle>;
};

export function Badge({ label, status = 'error', dot = false, max = 99, style }: BadgeProps) {
  const theme = useTheme();
  const bg = theme.colors[status];

  if (dot || label === undefined) {
    return <View style={[styles.dot, { backgroundColor: bg }, style]} />;
  }

  const text =
    typeof label === 'number' && label > max ? `${max}+` : String(label);

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: theme.radius.full }, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: { width: 10, height: 10, borderRadius: 5 },
  badge: { minWidth: 20, height: 20, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
