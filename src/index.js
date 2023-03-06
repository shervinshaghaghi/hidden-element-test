/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { store } from 'store';
import { Routes } from 'routes';
import reportWebVitals from 'reportWebVitals';

import 'utils/click';

import 'animate.css';
import 'styles/index.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster reverseOrder position="bottom-center" />
      <Routes />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
