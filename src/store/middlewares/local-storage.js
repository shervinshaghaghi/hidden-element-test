import { toggleDarkMode } from 'store/app-data/app-slice';
import { DARK_MODE_STORAGE_KEY } from 'constants/local-storage-keys';

const localStorageMiddleware = (store) => (next) => (action) => {
  if (toggleDarkMode.match(action)) {
    const darkMode = action.payload;

    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem(DARK_MODE_STORAGE_KEY, darkMode);
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem(DARK_MODE_STORAGE_KEY);
    }
  }

  return next(action);
};

export { localStorageMiddleware };
