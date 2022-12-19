import { createContext, ReactNode, useEffect, useState } from 'react';

interface IThemeContext {
  theme: ITheme;
  osTheme: IOsTheme;
  setTheme: (osTheme: IOsTheme) => void;
}
type ITheme = 'light' | 'dark';
type IOsTheme = 'light' | 'dark' | 'system';

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  osTheme: 'system',
  setTheme: () => {},
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
      .addEventListener('change', e => onOsThemeChange(e.matches ? 'dark' : 'light'));
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
    <ThemeContext.Provider value={{ theme, setTheme: onOsThemeChange, osTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
