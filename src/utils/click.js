import { store } from 'store';
import { clickAction } from 'store/app-data/app-slice';

export const click = (type = 'click') => {
  store.dispatch(clickAction(type));
};

document.addEventListener('click', ({ target }) => {
  const clickType = target.dataset?.click || '';
  if (clickType) {
    click(clickType);
  }
});
