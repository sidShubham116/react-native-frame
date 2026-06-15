import { View, StyleSheet, Platform, type ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type SurfaceProps = ViewProps & {
  /** Shadow ki gehrai — 0 (flat) se 4 tak */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Corner radius — theme.radius ki key */
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
};

/** Raised background container — Card, Dialog jaise components iske upar bante hain */
export function Surface({
  elevation = 1,
  radius = 'lg',
  style,
  children,
  ...rest
}: SurfaceProps) {
  const theme = useTheme();

  const shadow =
    Platform.OS === 'android'
      ? { elevation: elevation * 2 }
      : {
          shadowColor: '#000',
          shadowOpacity: 0.04 + elevation * 0.04,
          shadowRadius: elevation * 3,
          shadowOffset: { width: 0, height: elevation },
        };

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius[radius],
        },
        elevation > 0 && shadow,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'visible' },
});
