import {
  View,
  Text,
  Image,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type AvatarProps = {
  /** Image URL */
  source?: string;
  /** Naam — image na ho to initials dikhenge (e.g. "Shubham Mishra" -> "SM") */
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

function initials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + second).toUpperCase();
}

export function Avatar({ source, name, size = 48, style }: AvatarProps) {
  const theme = useTheme();
  const radius = size / 2;

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={
          [{ width: size, height: size, borderRadius: radius }, style] as StyleProp<ImageStyle>
        }
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: radius, backgroundColor: theme.colors.primary },
        style,
      ]}
    >
      <Text style={{ color: theme.colors.onPrimary, fontSize: size * 0.4, fontWeight: '700' }}>
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
