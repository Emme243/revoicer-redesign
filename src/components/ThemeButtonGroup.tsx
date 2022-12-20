import { useContext } from 'react';
import { ITheme, ThemeContext } from '../providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import DefaultLabel from './DefaultLabel';

function ThemeButtonGroup() {
  const { theme, setTheme, themeOptions } = useContext(ThemeContext);

  function getThemeIcon(theme: ITheme): IconDefinition {
    switch (theme) {
      case 'dark':
        return faMoon;
      case 'light':
        return faSun;
      default:
        return faDesktop;
    }
  }

  return (
    <>
      <DefaultLabel className="block">Theme</DefaultLabel>
      <div className="border-dark-100 border rounded-lg overflow-hidden dark:border-dark-800 inline-block divide-dark-100 divide-x dark:divide-dark-800">
        {themeOptions.map(themeOption => (
          <button
            aria-selected={theme === themeOption}
            className="w-10 py-2 text-dark-500 hover:bg-gray-100 transition-all duration-200 aria-selected:text-sky-600 aria-selected:bg-sky-100 dark:hover:bg-dark-800 dark:aria-selected:bg-sky-800 dark:aria-selected:text-sky-100 dark:text-dark-300"
            key={themeOption}
            onClick={() => setTheme(themeOption)}
          >
            <FontAwesomeIcon icon={getThemeIcon(themeOption)} />
          </button>
        ))}
      </div>
    </>
  );
}

export default ThemeButtonGroup;
