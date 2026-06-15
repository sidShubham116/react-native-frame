import { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type InputProps = Omit<TextInputProps, 'style'> & {
  /** Upar dikhne wala label */
  label?: string;
  /** Error message — diye to border red ho jata hai */
  error?: string;
  /** Helper text (error na ho to) */
  helper?: string;
  /** Input ke andar bayi taraf element (icon) */
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  error,
  helper,
  left,
  right,
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const focusAnim = useRef(new Animated.Value(0)).current;

  const animateTo = (v: number) =>
    Animated.timing(focusAnim, {
      toValue: v,
      duration: 150,
      useNativeDriver: false, // borderColor animate kar rahe hain
    }).start();

  // 0 -> normal border, 1 -> primary (focused)
  const borderColor = error
    ? theme.colors.error
    : focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.border, theme.colors.primary],
      });

  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
      ) : null}

      <Animated.View
        style={[
          styles.field,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderColor,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        {left}
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholderTextColor={theme.colors.textMuted}
          onFocus={(e) => {
            animateTo(1);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            animateTo(0);
            onBlur?.(e);
          }}
          {...rest}
        />
        {right}
      </Animated.View>

      {error ? (
        <Text style={[styles.helper, { color: theme.colors.error }]}>{error}</Text>
      ) : helper ? (
        <Text style={[styles.helper, { color: theme.colors.textMuted }]}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 16 },
  helper: { fontSize: 12, marginTop: 6 },
});
