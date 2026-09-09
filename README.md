# @gaddario98/react-state

A lightweight yet powerful React state management library built on top of [Jotai](https://jotai.org/). It provides a streamlined factory to generate atoms with custom hooks and includes a built-in compressed storage adapter to optimize `localStorage` usage.

## ✨ Features

- ⚛️ **Jotai Under the Hood**: Leverages Jotai's atomic state management for high performance and minimal re-renders.
- 🪝 **Auto-generated Hooks**: Automatically generates `useValue`, `useState`, and `useReset` hooks for each state atom.
- 💾 **Compressed Persistence**: Built-in support for `localStorage` persistence with automatic deflate compression (via `fflate`) to save space on large payloads.
- 🎯 **Type-Safe**: Full TypeScript support with generics for state definition.

## 📦 Installation

```bash
npm install @gaddario98/react-state jotai fflate
# or
yarn add @gaddario98/react-state jotai fflate
```

### Peer Dependencies

Make sure you have `react` (>=18.0.0) installed.

## 🚀 Quick Start

### 1. Generating State

Use `atomStateGenerator` to create a global state. It returns a Jotai atom and ready-to-use hooks.

```tsx
import { atomStateGenerator } from '@gaddario98/react-state';

interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export const {
  atom: userSettingsAtom,
  useValue: useUserSettingsValue,
  useState: useUserSettingsState,
  useReset: useUserSettingsReset,
} = atomStateGenerator<UserSettings>({
  key: 'user-settings',
  defaultValue: { theme: 'light', notifications: true },
  persist: true, // Automatically persists to localStorage with compression!
});
```

### 2. Using the Hooks in Components

You can now use the generated hooks directly in your React components without needing to import Jotai primitives or the atom itself.

```tsx
import React from 'react';
import { useUserSettingsState, useUserSettingsReset } from './store';

export const SettingsPanel = () => {
  const [settings, setSettings] = useUserSettingsState();
  const resetSettings = useUserSettingsReset();

  const toggleTheme = () => {
    setSettings({ ...settings, theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <div>
      <p>Current Theme: {settings.theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={resetSettings}>Reset to Defaults</button>
    </div>
  );
};
```

## 📚 API Reference

### `atomStateGenerator<T>(options: AtomGeneratorOptions<T>)`

Generates state hooks and a Jotai atom. 

#### Options
- `key` (string): Unique identifier for the atom, used as the storage key when `persist` is enabled.
- `defaultValue` (T): The initial value of the state.
- `persist` (boolean, optional): If `true`, the state is persisted to storage. Defaults to `false`.
- `storage` (Storage, optional): Custom storage implementation. Defaults to the internal compressed `localStorage`.

#### Returns
An object containing:
- `atom`: The raw Jotai `PrimitiveAtom<T>`.
- `useValue`: A hook returning only the current value `() => T`.
- `useState`: A hook returning the value and setter `() => [T, (value: T) => void]`.
- `useReset`: A hook returning a function to reset the state to `defaultValue`.

### Compressed Storage

By default, when `persist: true` is passed, the library uses a custom storage implementation that automatically compresses large payloads using `fflate` before saving them to `localStorage`. This is handled transparently, debouncing writes to avoid blocking the main thread.

If you need to override the default storage implementation globally, you can use `setCustomStorage`:

```tsx
import { setCustomStorage } from '@gaddario98/react-state';

// Use a different storage mechanism (e.g., sessionStorage or uncompressed storage)
setCustomStorage(window.sessionStorage);
```

## 📄 License

MIT
