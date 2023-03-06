import { configureStore } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducer-names';
import { localStorageMiddleware } from 'store/middlewares/local-storage';

import appReducer from 'store/app-data/app-slice';

const store = configureStore({
  reducer: {
    [REDUCER_NAMES.APP]: appReducer
  },
  middleware: [localStorageMiddleware]
});

export { store };
