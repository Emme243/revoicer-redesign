import { useContext } from 'react';
import { IOsTheme, ThemeContext } from '../providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Label from './Label';

function ThemeButtonGroup() {
  const { osTheme, setTheme, themeOptions } = useContext(ThemeContext);

  function getThemeIcon(theme: IOsTheme): IconDefinition {
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
      <Label>Theme</Label>
      <div className="border-dark-100 border-2 rounded-lg overflow-hidden dark:border-dark-800 inline-block divide-dark-100 divide-x dark:divide-dark-800">
        {themeOptions.map(themeOption => (
          <button
            aria-selected={osTheme === themeOption}
            className="w-10 py-2 text-dark-500 hover:bg-gray-100 transition-all duration-200 aria-selected:text-sky-600 aria-selected:bg-sky-100 dark:hover:bg-dark-800 dark:aria-selected:bg-sky-800 dark:aria-selected:text-sky-100 dark:text-dark-300"
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            style={{ backgroundColor: themeOption }}
          >
            <FontAwesomeIcon icon={getThemeIcon(themeOption)} />
          </button>
        ))}
      </div>
    </>
  );
}

export default ThemeButtonGroup;
