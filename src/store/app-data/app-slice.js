/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducer-names';
import { DARK_MODE_STORAGE_KEY } from 'constants/local-storage-keys';

const initialState = {
  count: 1,
  cart: {},
  _cart: {},
  clicks: [],
  userAge: '',
  userJob: '',
  name: '',
  userEmail: '',
  userSex: '',
  username: '',
  password: '',
  isHiddenTest: false,
  darkMode: !!localStorage.getItem(DARK_MODE_STORAGE_KEY)
};

const appSlice = createSlice({
  name: REDUCER_NAMES.APP,
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.userEmail = action.payload.email;
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    changeTestType: (state, action) => {
      state.isHiddenTest = action.payload;
    },
    changeCount: (state, action) => {
      state.count = action.payload;
    },
    setUserDataAction: (state, action) => {
      state.userAge = action.payload.age;
      state.userJob = action.payload.job;
      state.userSex = action.payload.sex;
      state.name = action.payload.name;
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
      state.count = 1;
      state.name = '';
      state.username = '';
      state.password = '';
    },
    clickAction: (state, action) => {
      const currentClicks = state.clicks;
      currentClicks.push(action.payload);
      state.clicks = currentClicks;
    },
    removeCartItems: (state) => {
      state.count = 1;
      state.cart = {};
      state._cart = {};
    }
  }
});

export const {
  resetAction,
  clickAction,
  changeCount,
  registerAction,
  changeTestType,
  toggleDarkMode,
  removeCartItems,
  updateCartAction,
  setUserDataAction,
  setUserEmailAction
} = appSlice.actions;

export default appSlice.reducer;
