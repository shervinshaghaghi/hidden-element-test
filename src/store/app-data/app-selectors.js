import { createDraftSafeSelector } from '@reduxjs/toolkit';

const appData = createDraftSafeSelector(
  (state) => state.APP,
  (state) => ({
    ...state
  })
);

const appSelectors = {
  appData
};

export { appSelectors };
