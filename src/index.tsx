// ---- Theme ----
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export type { ThemeProviderProps } from './theme/ThemeProvider';
export { lightTheme, darkTheme } from './theme/tokens';
export type {
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeRadius,
  ThemeFontSizes,
} from './theme/types';

// ---- Hooks ----
export { usePressScale } from './hooks/usePressScale';
export { useMountAnimation } from './hooks/useMountAnimation';
export type { MountAnimationOptions } from './hooks/useMountAnimation';

// ---- Components ----
export { Button } from './components/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from './components/Button';

export { Text } from './components/Typography';
export type { TextProps, TextVariant } from './components/Typography';

export { Surface } from './components/Surface';
export type { SurfaceProps } from './components/Surface';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeStatus } from './components/Badge';

export { Chip } from './components/Chip';
export type { ChipProps } from './components/Chip';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';

export { Dialog } from './components/Dialog';
export type { DialogProps } from './components/Dialog';

export { MenuButton } from './components/MenuButton';
export type { MenuButtonProps } from './components/MenuButton';

export { Drawer } from './components/Drawer';
export type { DrawerProps } from './components/Drawer';

// ---- Form controls ----
export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { RadioButton, RadioGroup } from './components/RadioButton';
export type {
  RadioButtonProps,
  RadioGroupProps,
} from './components/RadioButton';

export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

// ---- Feedback ----
export { Snackbar } from './components/Snackbar';
export type { SnackbarProps } from './components/Snackbar';

export { ProgressBar } from './components/ProgressBar';
export type { ProgressBarProps } from './components/ProgressBar';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps } from './components/Skeleton';

// ---- Navigation & Layout ----
export { Tabs } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { Accordion } from './components/Accordion';
export type { AccordionProps } from './components/Accordion';

export { ListItem } from './components/ListItem';
export type { ListItemProps } from './components/ListItem';

// ---- Actions ----
export { FAB } from './components/FAB';
export type { FABProps } from './components/FAB';

export { IconButton } from './components/IconButton';
export type {
  IconButtonProps,
  IconButtonVariant,
} from './components/IconButton';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
