/* eslint-disable no-console */
import { EMAIL } from 'constants/email';
import { msToTime } from 'utils/ms-to-time';
import { CLICK_NAMES } from 'constants/click-names';
import {
  REGISTER_TIME_STORAGE_KEY,
  START_TIME_STORAGE_KEY
} from 'constants/local-storage-keys';

const isLocal = window.location.hostname === 'localhost';
const serverURL = isLocal ? '' : 'https://api.emailjs.com/api/v1.0/email/send';

const saveDataRequest = (data) => {
  fetch(serverURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: EMAIL.PUBLIC_KEY,
      service_id: EMAIL.SERVICE_ID,
      template_id: EMAIL.TEMPLATE_ID,
      template_params: {
        data: JSON.stringify(data),
        // EMAIL DATA
        cta: data.cta,
        back: data.back,
        time: data.time,
        theme: data.theme,
        name: data.user.name,
        password: data.user.password,
        age: data.user.age,
        job: data.user.job,
        sex: data.user.sex,
        submit: data.submit,
        email: data.user.email,
        hidden_size: data.hidden.size,
        hidden_type: data.hidden.type,
        visible_type: data.visible.type,
        visible_size: data.visible.size,
        registerTime: data.registerTime,
        visible_header: data.visible.headerItem,
        hidden_accordion: data.hidden.accordion,
        hidden_size_hover: data.hidden.sizeHover,
        hidden_type_hover: data.hidden.typeHover,
        hidden_burger_menu: data.hidden.burgerItem,
        //
        counter_change: data.counterChange,
        hidden_category: data.hidden.category,
        visible_category: data.visible.category,
        hidden_cart_hover: data.hidden.cartHover,
        hidden_category_hover: data.hidden.categoryHover
      }
    })
  })
    .then((response) => response.json())
    .then((res) => console.log(res));
};

export const calculateData = (user, data = [], saveData = false) => {
  const filterByName = (eventName) => data.filter((item) => item === eventName)?.length;

  const result = {
    user,
    back: filterByName(CLICK_NAMES.BACK),
    cta: filterByName(CLICK_NAMES.CTA_BTN),
    submit: filterByName(CLICK_NAMES.SUBMIT_BTN),
    theme: filterByName(CLICK_NAMES.TOGGLE_THEME),
    counterChange: filterByName(CLICK_NAMES.CART_COUNTER_CHANGE_BTN),
    visible: {
      type: filterByName(CLICK_NAMES.VISIBLE_TYPE_ITEM),
      size: filterByName(CLICK_NAMES.VISIBLE_SIZE_ITEM),
      category: filterByName(CLICK_NAMES.VISIBLE_CATEGORY_ITEM),
      headerItem: filterByName(CLICK_NAMES.VISIBLE_HEADER_ITEM)
    },
    hidden: {
      type: filterByName(CLICK_NAMES.HIDDEN_TYPE_ITEM),
      size: filterByName(CLICK_NAMES.HIDDEN_SIZE_ITEM),
      accordion: filterByName(CLICK_NAMES.TOGGLE_ACCORDION),
      cartHover: filterByName(CLICK_NAMES.HIDDEN_CART__HOVER),
      category: filterByName(CLICK_NAMES.HIDDEN_CATEGORY_ITEM),
      burgerItem: filterByName(CLICK_NAMES.HIDDEN_HEADER_ITEM),
      sizeHover: filterByName(CLICK_NAMES.HIDDEN_SIZE_ITEM__HOVER),
      typeHover: filterByName(CLICK_NAMES.HIDDEN_TYPE_ITEM__HOVER),
      categoryHover: filterByName(CLICK_NAMES.HIDDEN_CATEGORY_ITEM__HOVER)
    },
    registerTime: localStorage.getItem(REGISTER_TIME_STORAGE_KEY),
    time: msToTime(new Date().getTime() - localStorage.getItem(START_TIME_STORAGE_KEY))
  };

  if (saveData) {
    console.log('Your Data: ', result);
    saveDataRequest(result);
  }

  return result;
};
