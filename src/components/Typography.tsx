import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  /** Muted (halka) text color */
  muted?: boolean;
  /** Theme color key se override (e.g. 'primary', 'error') */
  color?: string;
  weight?: TextStyle['fontWeight'];
  center?: boolean;
  children: React.ReactNode;
};

export function Text({
  variant = 'body',
  muted = false,
  color,
  weight,
  center = false,
  style,
  children,
  ...rest
}: TextProps) {
  const theme = useTheme();

  const variantStyle: Record<TextVariant, TextStyle> = {
    h1: { fontSize: theme.fontSize.xxl, fontWeight: '700' },
    h2: { fontSize: theme.fontSize.xl, fontWeight: '700' },
    h3: { fontSize: theme.fontSize.lg, fontWeight: '600' },
    body: { fontSize: theme.fontSize.md, fontWeight: '400' },
    caption: { fontSize: theme.fontSize.sm, fontWeight: '400' },
    label: { fontSize: theme.fontSize.sm, fontWeight: '600' },
  };

  return (
    <RNText
      style={[
        { color: color ?? (muted ? theme.colors.textMuted : theme.colors.text) },
        variantStyle[variant],
        weight ? { fontWeight: weight } : null,
        center ? { textAlign: 'center' } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
