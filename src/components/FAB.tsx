import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { usePressScale } from '../hooks/usePressScale';
import { AnimatedPressable } from './AnimatedPressable';
import { Text } from './Typography';

export type FABProps = {
  /** Icon element ya text (e.g. '+') */
  icon: React.ReactNode;
  onPress?: () => void;
  /** Diya to extended FAB (icon + text) ban jata hai */
  label?: string;
  size?: 'md' | 'lg';
  /** Background color (default: primary) */
  color?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/** Floating action button — press par halki spring scale animation */
export function FAB({
  icon,
  onPress,
  label,
  size = 'lg',
  color,
  accessibilityLabel,
  style,
}: FABProps) {
  const theme = useTheme();
  const { scale, onPressIn, onPressOut } = usePressScale();
  const dim = size === 'lg' ? 56 : 44;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.base,
        styles.shadow,
        {
          backgroundColor: color ?? theme.colors.primary,
          height: dim,
          minWidth: dim,
          borderRadius: label ? theme.radius.lg : dim / 2,
          paddingHorizontal: label ? 20 : 0,
          transform: [{ scale }],
        },
        style,
      ]}
    >
      {typeof icon === 'string' ? (
        <Text
          weight="700"
          style={{ color: theme.colors.onPrimary, fontSize: 24 }}
        >
          {icon}
        </Text>
      ) : (
        icon
      )}
      {label ? (
        <Text
          weight="600"
          style={{ color: theme.colors.onPrimary, marginLeft: 8 }}
        >
          {label}
        </Text>
      ) : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
