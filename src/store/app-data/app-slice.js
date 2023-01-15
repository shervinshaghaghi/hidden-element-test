/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducer-names';
import { DARK_MODE_STORAGE_KEY } from 'constants/local-storage-keys';

const initialState = {
  cart: {},
  _cart: {},
  clicks: [],
  userAge: '',
  userJob: '',
  userEmail: '',
  userSex: '',
  isHiddenTest: false,
  darkMode: !!localStorage.getItem(DARK_MODE_STORAGE_KEY)
};

const appSlice = createSlice({
  name: REDUCER_NAMES.APP,
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setUserDataAction: (state, action) => {
      state.userAge = action.payload.age;
      state.userJob = action.payload.job;
      state.userSex = action.payload.sex;
      state.isHiddenTest = action.payload.isHiddenTest;
    },
    setUserEmailAction: (state, action) => {
      state.userEmail = action.payload;
    },
    updateCartAction: (state, action) => {
      const _currentCart = state._cart;
      const currentCart = state.cart;
      currentCart[action.payload.name] = action.payload.price;
      _currentCart[action.payload.name] = action.payload.item;
      state.cart = currentCart;
      state._cart = _currentCart;
    },
    resetAction: (state) => {
      state.userEmail = '';
      state.userAge = '';
      state.userJob = '';
      state.userSex = '';
      state.isHiddenTest = false;
      state.clicks = [];
      state.cart = {};
      state._cart = {};
    },
    clickAction: (state, action) => {
      const currentClicks = state.clicks;
      currentClicks.push(action.payload);
      state.clicks = currentClicks;
    },
    removeCartItems: (state) => {
      state.cart = {};
      state._cart = {};
    }
  }
});

export const {
  resetAction,
  clickAction,
  toggleDarkMode,
  removeCartItems,
  updateCartAction,
  setUserDataAction,
  setUserEmailAction
} = appSlice.actions;

export default appSlice.reducer;
