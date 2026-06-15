import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import type { Theme } from './types';
import { lightTheme, darkTheme } from './tokens';

const ThemeContext = createContext<Theme>(lightTheme);

export type ThemeProviderProps = {
  children: ReactNode;
  /**
   * 'light' | 'dark' force karo, ya 'system' (default) —
   * phone ke dark mode ke hisaab se khud switch hoga.
   */
  mode?: 'light' | 'dark' | 'system';
  /** Apna custom theme do to default override ho jayega */
  theme?: Theme;
};

/**
 * App ko isme wrap karo — andar ke saare frame components
 * automatically theme ke colors/spacing use karenge.
 */
export function ThemeProvider({
  children,
  mode = 'system',
  theme,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();

  const value = useMemo<Theme>(() => {
    if (theme) return theme;
    const resolved = mode === 'system' ? systemScheme : mode;
    return resolved === 'dark' ? darkTheme : lightTheme;
  }, [theme, mode, systemScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Kisi bhi component ke andar current theme paao */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
