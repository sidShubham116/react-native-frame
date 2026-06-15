# react-native-frame

A lightweight, theme-driven React Native UI component library — buttons, inputs, cards, dialogs, and more, with built-in light/dark theming and smooth animations.

> 100% JavaScript — **no native code**, so no `pod install` and works in Expo Go out of the box.

## Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/sidShubham116/react-native-frame/main/assets/showcase-1.png" width="45%" alt="Buttons, Input, Avatar, Badge and Chips" />
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/sidShubham116/react-native-frame/main/assets/showcase-2.png" width="45%" alt="Tabs, Checkbox, Radio, Slider, Progress and Skeleton" />
</p>

## Requirements

- **React Native >= 0.71** (uses the flexbox `gap` style)
- **React >= 17**
- Works on both the old and the New Architecture (Fabric) — animations use the built-in `Animated` API, no extra dependencies.

## Installation

```sh
npm install react-native-frame
# or
yarn add react-native-frame
```

## Usage

Wrap your app in `ThemeProvider`, then use any component:

```tsx
import { ThemeProvider, Button, Card, Text } from 'react-native-frame';

export default function App() {
  return (
    <ThemeProvider mode="system">
      <Card>
        <Text variant="h3">Hello 👋</Text>
        <Text muted>react-native-frame se bana hua.</Text>
        <Button label="Press me" onPress={() => {}} />
      </Card>
    </ThemeProvider>
  );
}
```

`mode` can be `'light'`, `'dark'`, or `'system'` (default — follows the device). You can also pass a fully custom `theme`.

## Components

| Category | Components |
| --- | --- |
| **Layout** | `Surface`, `Card`, `Divider`, `ListItem`, `Accordion` |
| **Typography** | `Text` |
| **Inputs** | `Input`, `Checkbox`, `RadioGroup` + `RadioButton`, `Switch`, `Slider` |
| **Actions** | `Button`, `IconButton`, `FAB`, `MenuButton`, `Chip` |
| **Feedback** | `Spinner`, `ProgressBar`, `Skeleton`, `Snackbar`, `Dialog`, `Badge`, `Tooltip` |
| **Navigation** | `Tabs`, `Drawer` |
| **Display** | `Avatar` |

### Theming & hooks

```tsx
import { useTheme, useMountAnimation, usePressScale } from 'react-native-frame';

const theme = useTheme(); // { colors, spacing, radius, fontSize, dark }
```

- `useMountAnimation()` — fade + slide-up entrance for any `Animated.View`.
- `usePressScale()` — spring press-scale for custom pressables.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
