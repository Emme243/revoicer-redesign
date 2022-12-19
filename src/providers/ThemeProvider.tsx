import { createContext, ReactNode, useEffect, useState } from 'react';

interface IThemeContext {
  theme: ITheme;
  osTheme: IOsTheme;
  setTheme: (osTheme: IOsTheme) => void;
  themeOptions: IOsTheme[];
}
type ITheme = 'light' | 'dark';
export type IOsTheme = 'light' | 'dark' | 'system';

const THEME_OPTIONS: IOsTheme[] = ['light', 'dark', 'system'];
export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  osTheme: 'system',
  setTheme: () => {},
  themeOptions: THEME_OPTIONS,
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const preferredColorModeBySystem = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const [theme, setTheme] = useState<ITheme>(preferredColorModeBySystem);
  const [osTheme, setOsTheme] = useState<IOsTheme>('system');

  function getValidTheme(osTheme: IOsTheme): IOsTheme {
    return osTheme === 'light' || osTheme === 'dark' || osTheme === 'system' ? osTheme : 'system';
  }

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme') as IOsTheme;
    const validTheme = getValidTheme(themeFromLocalStorage);
    setOsTheme(validTheme);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));
  }, []);

  function onOsThemeChange(osColorMode: IOsTheme): void {
    const validTheme = getValidTheme(osColorMode);
    setOsTheme(validTheme);
    localStorage.setItem('theme', validTheme);
  }

  useEffect(() => {
    const theme = osTheme === 'system' ? preferredColorModeBySystem : osTheme;
    setTheme(theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [preferredColorModeBySystem, osTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: onOsThemeChange, osTheme, themeOptions: THEME_OPTIONS }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
