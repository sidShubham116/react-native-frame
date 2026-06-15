import { createContext, useContext } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Typography';

type RadioGroupContextValue = {
  value?: string;
  onChange?: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = {
  /** Abhi selected option ki value */
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** RadioButton ka parent — kaunsa option selected hai ye yahan control hota hai */
export function RadioGroup({
  value,
  onValueChange,
  children,
  style,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange: onValueChange }}>
      <View style={style}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

export type RadioButtonProps = {
  /** Iss option ki value — RadioGroup ki value se match hua to selected */
  value: string;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const SIZE = 22;

/** Single radio option — hamesha <RadioGroup> ke andar use karo */
export function RadioButton({
  value,
  label,
  disabled = false,
  style,
}: RadioButtonProps) {
  const theme = useTheme();
  const group = useContext(RadioGroupContext);
  const selected = group?.value === value;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={() => group?.onChange?.(value)}
      style={[styles.row, disabled && styles.disabled, style]}
    >
      <View
        style={[
          styles.outer,
          {
            borderColor: selected ? theme.colors.primary : theme.colors.border,
          },
        ]}
      >
        {selected ? (
          <View
            style={[styles.inner, { backgroundColor: theme.colors.primary }]}
          />
        ) : null}
      </View>
      {label ? (
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: { width: SIZE / 2, height: SIZE / 2, borderRadius: SIZE / 4 },
  label: { flexShrink: 1 },
  disabled: { opacity: 0.5 },
});
