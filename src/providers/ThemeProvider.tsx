import { createContext, ReactNode, useState } from 'react';
import { useEvent, useLocalStorage, useMount } from 'react-use';

interface IThemeContext {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
  themeOptions: ITheme[];
}
export type ITheme = 'light' | 'dark' | 'system';

const THEME_OPTIONS: ITheme[] = ['light', 'dark', 'system'];
export const ThemeContext = createContext<IThemeContext>({
  theme: 'system',
  setTheme: () => {},
  themeOptions: THEME_OPTIONS,
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ITheme>('system');
  const [themeInLocalStorage, setThemeInLocalStorage] = useLocalStorage<ITheme>('theme', 'system');

  useMount(() => {
    setNewTheme(themeInLocalStorage || 'system');
  });
  useEvent('change', matchMediaListener, window.matchMedia('(prefers-color-scheme: dark)'));

  function matchMediaListener(): void {
    if (theme === 'system') setThemeClassOnHtmlElement('system');
  }
  function setNewTheme(theme: ITheme): void {
    const validTheme = theme || 'system';
    setTheme(validTheme);
    setThemeInLocalStorage(validTheme);
    setThemeClassOnHtmlElement(validTheme);
  }
  function setThemeClassOnHtmlElement(theme: ITheme): void {
    const preferredThemeBySystem = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const themeClass = theme === 'system' ? preferredThemeBySystem : theme;
    if (themeClass === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  return (
    <ThemeContext.Provider value={{ setTheme: setNewTheme, theme, themeOptions: THEME_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
