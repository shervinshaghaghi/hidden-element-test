/* eslint-disable */
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { store } from 'store';
import { CLICK_NAMES } from 'constants/click-names';
import { toggleDarkMode } from 'store/app-data/app-slice';
import { appSelectors } from 'store/app-data/app-selectors';

import SUN_IMAGE from 'assets/sun.svg';
import MOON_IMAGE from 'assets/moon.svg';

function DarkModeButton({ className }) {
  const { darkMode, isHiddenTest } = useSelector(appSelectors.appData);
  const toggleTheme = () => store.dispatch(toggleDarkMode(!darkMode));

  return (
    <div
      onClick={toggleTheme}
      className={classNames('flex items-center gap-x-4', className)}
    >
      {!isHiddenTest && (
        <p className="text-sm">{`Go To ${darkMode ? 'Light' : 'Dark'} Mode`}</p>
      )}
      <button
        type="button"
        data-click={CLICK_NAMES.TOGGLE_THEME}
        className="z-50 shadow-lg animate__animated animate__rotateIn hover:animate-pulse flex items-center justify-center w-11 h-11 rounded-full outline-0 bg-slate-700 dark:bg-slate-50"
      >
        <img width={24} alt="DARK MODE" src={darkMode ? SUN_IMAGE : MOON_IMAGE} />
      </button>
    </div>
  );
}

export { DarkModeButton };
