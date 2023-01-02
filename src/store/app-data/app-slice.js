/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducer-names';
import { DARK_MODE_STORAGE_KEY } from 'constants/local-storage-keys';

const initialState = {
  cart: {},
  clicks: [],
  userAge: '',
  userJob: '',
  userEmail: '',
  darkMode: !!localStorage.getItem(DARK_MODE_STORAGE_KEY)
};

const appSlice = createSlice({
  name: REDUCER_NAMES.APP,
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setUserDataAction: (state, action) => {
      state.userAge = action.payload.age;
      state.userJob = action.payload.job;
    },
    setUserEmailAction: (state, action) => {
      state.userEmail = action.payload;
    },
    updateCartAction: (state, action) => {
      const currentCart = state.cart;
      currentCart[action.payload.name] = action.payload.price;
      state.cart = currentCart;
    },
    resetAction: (state) => {
      state.userEmail = '';
      state.userAge = '';
      state.userJob = '';
      state.clicks = [];
      state.cart = {};
    },
    clickAction: (state, action) => {
      const currentClicks = state.clicks;
      currentClicks.push(action.payload);
      state.clicks = currentClicks;
    }
  }
});

export const {
  resetAction,
  clickAction,
  toggleDarkMode,
  updateCartAction,
  setUserDataAction,
  setUserEmailAction
} = appSlice.actions;

export default appSlice.reducer;
