# react-native-frame

A lightweight, theme-driven UI component library for React Native and Expo — buttons, inputs, cards, dialogs, tabs, sliders, bottom feedback, and more, with built-in light/dark theming and smooth 60/120 Hz animations.

> **100% JavaScript — no native code.** No `pod install`, works in Expo Go out of the box, and runs on both the old and the New Architecture (Fabric).

## Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/sidShubham116/react-native-frame/main/assets/demo.gif" width="300" alt="react-native-frame live demo" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/sidShubham116/react-native-frame/main/assets/showcase-1.png" width="45%" alt="Buttons, Input, Avatar, Badge and Chips" />
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/sidShubham116/react-native-frame/main/assets/showcase-2.png" width="45%" alt="Tabs, Checkbox, Radio, Slider, Progress and Skeleton" />
</p>

## Features

- **26 components** covering layout, typography, inputs, actions, feedback and navigation
- **Theme-driven** — one `ThemeProvider`, automatic light/dark, and fully customizable design tokens (colors, spacing, radius, font sizes)
- **Smooth animations** — press-scale springs, sliding tab indicator, spring-based accordion, animated switch/checkbox, fade + slide mount entrance
- Runs on the **native thread** (`useNativeDriver: true`) wherever possible for 60/120 Hz performance
- Works with both **Expo** and **bare React Native**
- **TypeScript support** built-in — every component ships its prop types
- **Zero required dependencies** — only `react` and `react-native`
- Accessible by default — proper `accessibilityRole` / `accessibilityState` on interactive components

## Requirements

- **React Native >= 0.71** (uses the flexbox `gap` style)
- **React >= 17**

## Installation

```sh
npm install react-native-frame
# or
yarn add react-native-frame
```

## Quick Start

Wrap your app in `ThemeProvider` once, then use any component anywhere inside it:

```tsx
import { ThemeProvider, Card, Text, Button } from "react-native-frame";

export default function App() {
  return (
    <ThemeProvider mode="system">
      <Card>
        <Text variant="h3">Hello 👋</Text>
        <Text muted>Built with react-native-frame.</Text>
        <Button label="Press me" onPress={() => {}} />
      </Card>
    </ThemeProvider>
  );
}
```

## Theming

Every component reads its colours, spacing and radii from the active theme. You control the theme via `ThemeProvider` and read it with the `useTheme` hook.

```tsx
import { useTheme } from "react-native-frame";

function MyComponent() {
  const theme = useTheme();
  return <View style={{ backgroundColor: theme.colors.surface }} />;
}
```

### `ThemeProvider`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `mode` | `"light" \| "dark" \| "system"` | No | `"system"` | `"system"` follows the device colour scheme |
| `theme` | `Theme` | No | -- | Provide a fully custom theme (overrides `mode`) |
| `children` | `ReactNode` | Yes | -- | Your app tree |

### Custom theme

```tsx
import { ThemeProvider, lightTheme, type Theme } from "react-native-frame";

const myTheme: Theme = {
  ...lightTheme,
  colors: { ...lightTheme.colors, primary: "#FF6B6B" },
};

<ThemeProvider theme={myTheme}>{/* ... */}</ThemeProvider>;
```

The theme shape is `{ dark, colors, spacing, radius, fontSize }`. Exported tokens: `lightTheme`, `darkTheme`. Exported types: `Theme`, `ThemeColors`, `ThemeSpacing`, `ThemeRadius`, `ThemeFontSizes`.

---

## Components

### Layout

#### `Surface`

Raised background container — the base that `Card` and `Dialog` build on.

```tsx
import { Surface } from "react-native-frame";

<Surface elevation={2} radius="lg">
  {/* content */}
</Surface>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4` | No | `1` | Shadow depth (`0` = flat) |
| `radius` | `"sm" \| "md" \| "lg" \| "xl"` | No | `"lg"` | Corner radius (theme key) |
| `children` | `ReactNode` | No | -- | Content |
| ...`ViewProps` | -- | No | -- | All `View` props are forwarded |

#### `Card`

Padded, elevated container. Pass `onPress` to make it pressable with a press-scale animation.

```tsx
import { Card, Text } from "react-native-frame";

<Card onPress={() => {}} padding="md" elevation={2}>
  <Text variant="label">Tap me</Text>
</Card>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | Yes | -- | Card content |
| `onPress` | `() => void` | No | -- | Makes the card pressable + animated |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4` | No | `2` | Shadow depth |
| `padding` | `"sm" \| "md" \| "lg"` | No | `"md"` | Inner padding (theme key) |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Divider`

Thin separator line, horizontal or vertical.

```tsx
import { Divider } from "react-native-frame";

<Divider spacing="md" />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | No | `"horizontal"` | Line direction |
| `spacing` | `"none" \| "sm" \| "md" \| "lg"` | No | `"md"` | Surrounding gap |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `ListItem`

A list row with optional left/right slots, title and description. Pass `onPress` to make it tappable.

```tsx
import { ListItem, Avatar, Badge } from "react-native-frame";

<ListItem
  title="Notifications"
  description="Push and email alerts"
  left={<Avatar name="N" size={36} />}
  right={<Badge label={3} status="error" />}
  onPress={() => {}}
/>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | Yes | -- | Primary text |
| `description` | `string` | No | -- | Secondary text below the title |
| `left` | `ReactNode` | No | -- | Leading element (avatar, icon) |
| `right` | `ReactNode` | No | -- | Trailing element (chevron, switch, badge) |
| `onPress` | `() => void` | No | -- | Makes the row tappable |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Accordion`

Collapsible section that springs its content height open/closed (Fabric-safe, no `LayoutAnimation`).

```tsx
import { Accordion } from "react-native-frame";

<Accordion title="What is react-native-frame?" defaultExpanded>
  A lightweight, theme-driven UI component library.
</Accordion>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | Yes | -- | Header text |
| `children` | `ReactNode` | Yes | -- | Collapsible content (a string is auto-wrapped in `Text`) |
| `defaultExpanded` | `boolean` | No | `false` | Start open |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

---

### Typography

#### `Text`

Theme-aware text with semantic variants.

```tsx
import { Text } from "react-native-frame";

<Text variant="h1">Heading</Text>
<Text muted>Muted body text</Text>
<Text color="primary" weight="700" center>Accent</Text>
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `variant` | `"h1" \| "h2" \| "h3" \| "body" \| "caption" \| "label"` | No | `"body"` | Size + weight preset |
| `muted` | `boolean` | No | `false` | Use the muted text colour |
| `color` | `string` | No | -- | Override colour (any colour string) |
| `weight` | `TextStyle["fontWeight"]` | No | -- | Override font weight |
| `center` | `boolean` | No | `false` | Center-align |
| `children` | `ReactNode` | Yes | -- | Text content |
| ...`TextProps` | -- | No | -- | All `Text` props are forwarded |

---

### Inputs

#### `Input`

Text field with floating label, focus animation, error/helper text and left/right slots.

```tsx
import { Input } from "react-native-frame";

<Input
  label="Name"
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
  helper="Focus to see the animation"
  error={error}
/>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | No | -- | Label above the field |
| `error` | `string` | No | -- | Error message (turns the border red) |
| `helper` | `string` | No | -- | Helper text (shown when there is no error) |
| `left` | `ReactNode` | No | -- | Element inside, on the left (icon) |
| `right` | `ReactNode` | No | -- | Element inside, on the right |
| `containerStyle` | `StyleProp<ViewStyle>` | No | -- | Wrapper styles |
| ...`TextInputProps` | -- | No | -- | All `TextInput` props except `style` |

#### `Checkbox`

Animated checkbox with a spring tick + box fill.

```tsx
import { Checkbox } from "react-native-frame";

<Checkbox value={checked} onValueChange={setChecked} label="I accept the terms" />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `boolean` | Yes | -- | Checked state |
| `onValueChange` | `(value: boolean) => void` | No | -- | Change callback |
| `label` | `string` | No | -- | Label to the right |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `RadioGroup` + `RadioButton`

Single-choice group. The selected value is controlled by `RadioGroup`.

```tsx
import { RadioGroup, RadioButton } from "react-native-frame";

<RadioGroup value={value} onValueChange={setValue}>
  <RadioButton value="react" label="React" />
  <RadioButton value="native" label="React Native" />
  <RadioButton value="expo" label="Expo" />
</RadioGroup>;
```

**`RadioGroup`**

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | No | -- | Currently selected value |
| `onValueChange` | `(value: string) => void` | No | -- | Selection callback |
| `children` | `ReactNode` | Yes | -- | `RadioButton`s |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

**`RadioButton`** (use inside a `RadioGroup`)

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | Yes | -- | This option's value |
| `label` | `string` | No | -- | Label to the right |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Switch`

Animated on/off toggle (thumb slide + track colour).

```tsx
import { Switch } from "react-native-frame";

<Switch value={on} onValueChange={setOn} />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `boolean` | Yes | -- | On/off state |
| `onValueChange` | `(value: boolean) => void` | No | -- | Change callback |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Slider`

Draggable slider — tap the track or drag the thumb.

```tsx
import { Slider } from "react-native-frame";

<Slider value={volume} onValueChange={setVolume} minimumValue={0} maximumValue={1} step={0.1} />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `number` | Yes | -- | Current value |
| `onValueChange` | `(value: number) => void` | No | -- | Change callback |
| `minimumValue` | `number` | No | `0` | Lower bound |
| `maximumValue` | `number` | No | `1` | Upper bound |
| `step` | `number` | No | `0` | Step size (`0` = continuous) |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

---

### Actions

#### `Button`

Primary action button with variants, sizes, loading state and icon slots.

```tsx
import { Button } from "react-native-frame";

<Button label="Primary" onPress={() => {}} />
<Button label="Outline" variant="outline" size="lg" />
<Button label="Saving…" loading fullWidth />
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | -- | Button text |
| `onPress` | `() => void` | No | -- | Press callback |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost"` | No | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | No | `"md"` | Size preset |
| `loading` | `boolean` | No | `false` | Show spinner + disable |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `fullWidth` | `boolean` | No | `false` | Stretch to full width |
| `left` / `right` | `ReactNode` | No | -- | Element before/after the label |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `IconButton`

Round, icon-only button with a press-scale spring.

```tsx
import { IconButton, Text } from "react-native-frame";

<IconButton icon={<Text>♥</Text>} variant="tonal" accessibilityLabel="Like" />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `icon` | `ReactNode` | Yes | -- | Icon element |
| `onPress` | `() => void` | No | -- | Press callback |
| `size` | `number` | No | `40` | Touch-target diameter |
| `variant` | `"plain" \| "tonal" \| "filled"` | No | `"plain"` | Background style |
| `color` | `string` | No | -- | Background colour for `filled` |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `accessibilityLabel` | `string` | No | -- | Screen-reader label |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `FAB`

Floating action button. Pass a `label` to make it an extended FAB.

```tsx
import { FAB } from "react-native-frame";

<FAB icon="+" onPress={() => {}} />
<FAB icon="+" label="Compose" size="lg" />
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `icon` | `ReactNode` | Yes | -- | Icon element or text (e.g. `"+"`) |
| `onPress` | `() => void` | No | -- | Press callback |
| `label` | `string` | No | -- | Turns it into an extended FAB |
| `size` | `"md" \| "lg"` | No | `"lg"` | Size preset |
| `color` | `string` | No | -- | Background colour |
| `accessibilityLabel` | `string` | No | -- | Screen-reader label |
| `style` | `StyleProp<ViewStyle>` | No | -- | Position it (e.g. absolute) |

#### `Chip`

Selectable pill for filters and tags.

```tsx
import { Chip } from "react-native-frame";

<Chip label="All" selected={tab === "all"} onPress={() => setTab("all")} />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | Yes | -- | Chip text |
| `selected` | `boolean` | No | `false` | Filled (selected) state |
| `onPress` | `() => void` | No | -- | Press callback |
| `left` | `ReactNode` | No | -- | Leading element |
| `disabled` | `boolean` | No | `false` | Dim and disable |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `MenuButton`

Animated hamburger that morphs between `≡` and `✕`.

```tsx
import { MenuButton } from "react-native-frame";

<MenuButton open={open} onPress={() => setOpen((v) => !v)} />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | Yes | -- | `true` = ✕, `false` = ≡ |
| `onPress` | `() => void` | Yes | -- | Press callback |
| `color` | `string` | No | theme text | Line colour |
| `size` | `number` | No | `26` | Icon size |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

---

### Feedback

#### `Spinner`

Themed loading indicator.

```tsx
import { Spinner } from "react-native-frame";

<Spinner size="large" />;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `color` | `string` | No | theme primary | Spinner colour |
| ...`ActivityIndicatorProps` | -- | No | -- | All props except `color` (e.g. `size`) |

#### `ProgressBar`

Determinate or indeterminate progress bar.

```tsx
import { ProgressBar } from "react-native-frame";

<ProgressBar progress={0.6} />   {/* determinate */}
<ProgressBar />                  {/* indeterminate loop */}
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `progress` | `number` | No | -- | `0`–`1`. Omit for an indeterminate loop |
| `height` | `number` | No | `6` | Bar height |
| `color` | `string` | No | theme primary | Fill colour |
| `trackColor` | `string` | No | theme border | Track colour |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Skeleton`

Pulsing placeholder shown while content loads.

```tsx
import { Skeleton } from "react-native-frame";

<Skeleton width={48} height={48} radius="round" />
<Skeleton width="70%" />
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `width` | `DimensionValue` | No | `"100%"` | Width |
| `height` | `DimensionValue` | No | `16` | Height |
| `radius` | `number \| "round"` | No | `8` | Corner radius (`"round"` for circle/pill) |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Snackbar`

Bottom slide-up status message with auto-dismiss and an optional action. Render it near the root of your screen — it positions itself absolutely.

```tsx
import { Snackbar } from "react-native-frame";

<Snackbar
  visible={visible}
  onDismiss={() => setVisible(false)}
  action={{ label: "Undo", onPress: handleUndo }}
>
  Saved successfully 🎉
</Snackbar>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `visible` | `boolean` | Yes | -- | Show/hide |
| `onDismiss` | `() => void` | Yes | -- | Called on auto-dismiss |
| `duration` | `number` | No | `3500` | Auto-dismiss ms (`0` = manual only) |
| `action` | `{ label: string; onPress: () => void }` | No | -- | Trailing action button |
| `children` | `ReactNode` | Yes | -- | Message |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Dialog`

Modal popup with overlay fade + content scale-in.

```tsx
import { Dialog, Button, Text } from "react-native-frame";

<Dialog
  visible={open}
  onClose={() => setOpen(false)}
  title="Delete item?"
  actions={
    <>
      <Button label="Cancel" variant="ghost" size="sm" onPress={() => setOpen(false)} />
      <Button label="Delete" size="sm" onPress={handleDelete} />
    </>
  }
>
  <Text muted>This action cannot be undone.</Text>
</Dialog>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `visible` | `boolean` | Yes | -- | Show/hide |
| `onClose` | `() => void` | Yes | -- | Close callback |
| `title` | `string` | No | -- | Dialog title |
| `children` | `ReactNode` | No | -- | Body content |
| `actions` | `ReactNode` | No | -- | Footer buttons |
| `dismissOnBackdrop` | `boolean` | No | `true` | Close on backdrop tap |

#### `Tooltip`

Shows a small bubble below an element on tap / long-press.

```tsx
import { Tooltip, IconButton, Text } from "react-native-frame";

<Tooltip content="This is a tooltip 👀">
  <IconButton icon={<Text>?</Text>} variant="tonal" />
</Tooltip>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `content` | `string` | Yes | -- | Bubble text |
| `children` | `ReactNode` | Yes | -- | The element to attach to |
| `style` | `StyleProp<ViewStyle>` | No | -- | Anchor wrapper styles |

---

### Navigation

#### `Tabs`

Segmented control with a pill indicator that springs between tabs.

```tsx
import { Tabs } from "react-native-frame";

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "done", label: "Done" },
  ]}
/>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `items` | `TabItem[]` | Yes | -- | Tabs to render (`{ key, label }`) |
| `value` | `string` | Yes | -- | Selected tab key |
| `onChange` | `(key: string) => void` | No | -- | Change callback |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Drawer`

Slide-in side panel with an overlay fade.

```tsx
import { Drawer, Text } from "react-native-frame";

<Drawer open={open} onClose={() => setOpen(false)} side="left">
  <Text variant="h3">Menu</Text>
</Drawer>;
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | Yes | -- | Show/hide |
| `onClose` | `() => void` | Yes | -- | Close callback (backdrop tap) |
| `children` | `ReactNode` | No | -- | Panel content |
| `side` | `"left" \| "right"` | No | `"left"` | Slide-in side |
| `width` | `number` | No | `min(320, 80%)` | Panel width |

---

### Display

#### `Avatar`

Image avatar with initials fallback.

```tsx
import { Avatar } from "react-native-frame";

<Avatar source="https://example.com/me.jpg" size={48} />
<Avatar name="Shubham Mishra" /> {/* shows "SM" */}
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `source` | `string` | No | -- | Image URL |
| `name` | `string` | No | -- | Used for initials when there's no image |
| `size` | `number` | No | `48` | Diameter |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

#### `Badge`

Count / status badge. Leave `label` empty (or set `dot`) for a small dot.

```tsx
import { Badge } from "react-native-frame";

<Badge label={5} status="success" />
<Badge dot status="error" />
<Badge label={120} max={99} /> {/* renders "99+" */}
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string \| number` | No | -- | Count or text (empty = dot) |
| `status` | `"primary" \| "success" \| "error" \| "warning" \| "info"` | No | `"error"` | Colour |
| `dot` | `boolean` | No | `false` | Render a dot only |
| `max` | `number` | No | `99` | Cap (e.g. `99+`) |
| `style` | `StyleProp<ViewStyle>` | No | -- | Extra styles |

---

## Hooks

### `useTheme()`

Returns the active `Theme` (`{ dark, colors, spacing, radius, fontSize }`).

### `usePressScale(toValue?)`

Spring press-scale for building your own animated pressables.

```tsx
import { Animated, Pressable } from "react-native";
import { usePressScale } from "react-native-frame";

const { scale, onPressIn, onPressOut } = usePressScale(0.96);

<Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
  <Animated.View style={{ transform: [{ scale }] }}>{/* ... */}</Animated.View>
</Pressable>;
```

### `useMountAnimation(options?)`

Fade + slide-up entrance. Spread the returned object into an `Animated.View` style. Runs on the native driver.

```tsx
import { Animated } from "react-native";
import { useMountAnimation } from "react-native-frame";

function Reveal({ children, delay = 0 }) {
  const enter = useMountAnimation({ delay });
  return <Animated.View style={enter}>{children}</Animated.View>;
}
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `0` | Start delay in ms (great for staggering) |
| `offset` | `number` | `12` | Slide-up distance in px |
| `duration` | `number` | `350` | Animation duration in ms |

---

## Types

```ts
type TabItem = { key: string; label: string };
type BadgeStatus = "primary" | "success" | "error" | "warning" | "info";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "plain" | "tonal" | "filled";
type TextVariant = "h1" | "h2" | "h3" | "body" | "caption" | "label";

type Theme = {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing; // xs, sm, md, lg, xl, xxl
  radius: ThemeRadius;   // sm, md, lg, xl, full
  fontSize: ThemeFontSizes; // xs, sm, md, lg, xl, xxl
};
```

Every component also exports its own `*Props` type (e.g. `ButtonProps`, `DialogProps`, `TabsProps`).

## License

MIT — made by [Shubham Mishra](https://github.com/sidShubham116)
