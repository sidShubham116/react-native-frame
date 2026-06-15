import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type DividerProps = {
  /** horizontal line (default) ya vertical */
  orientation?: 'horizontal' | 'vertical';
  /** Aas-paas ka gap (theme.spacing key) */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
};

export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  style,
}: DividerProps) {
  const theme = useTheme();
  const gap =
    spacing === 'none'
      ? 0
      : { sm: theme.spacing.sm, md: theme.spacing.md, lg: theme.spacing.lg }[spacing];

  const isH = orientation === 'horizontal';

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.border,
          ...(isH
            ? { height: StyleSheet.hairlineWidth, alignSelf: 'stretch', marginVertical: gap }
            : { width: StyleSheet.hairlineWidth, alignSelf: 'stretch', marginHorizontal: gap }),
        },
        style,
      ]}
    />
  );
}
