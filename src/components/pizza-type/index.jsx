import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { store } from 'store';
import { click } from 'utils/click';
import { TYPES } from 'constants/pizza';
import { CLICK_NAMES } from 'constants/click-names';
import { updateCartAction } from 'store/app-data/app-slice';
import { appSelectors } from 'store/app-data/app-selectors';

import ARROW_IMAGE from 'assets/arrow.png';

import styles from './pizza-type.module.scss';

function VisiblePizzaType({ isVisible = true }) {
  const { pathname } = useLocation();
  const { cart } = useSelector(appSelectors.appData);

  const [show, setShow] = useState(isVisible);
  const [selectedValue, setSelectedValue] = useState();

  const onSelect = ({ target }) => {
    const id = +target.value;
    const item = TYPES[id];
    setSelectedValue(id);
    store.dispatch(updateCartAction({ name: 'type', price: item.price, item }));
  };

  const toggle = () => {
    if (!isVisible) {
      setShow(!show);
    }
  };

  const checkHover = () => {
    if (isVisible) return;
    click(CLICK_NAMES.HIDDEN_TYPE_ITEM__HOVER);
  };

  useEffect(() => {
    const filterd = Object.values(TYPES).filter((item) => item.price === cart?.type);
    setSelectedValue(filterd?.[0]?.id);
  }, [pathname, cart]);

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={toggle}
        data-click={CLICK_NAMES.TOGGLE_ACCORDION}
        className={classNames(
          'text-lg font-bold w-full flex items-center justify-between border-b-2 border-solid py-2 mb-4 rounded-t-lg',
          {
            'cursor-auto': isVisible,
            'cursor-pointer duration-300': !isVisible
          }
        )}
      >
        Type
        <img
          alt="MENU"
          width={16}
          height={16}
          className={classNames('mr-3', {
            'rotate-180': show,
            hidden: isVisible
          })}
          src={ARROW_IMAGE}
        />
      </button>

      {show && (
        <div className="w-full flex-wrap flex items-center justify-center gap-4">
          {Object.values(TYPES).map((item) => (
            <label
              onMouseEnter={checkHover}
              htmlFor={item.title}
              data-click={
                isVisible ? CLICK_NAMES.VISIBLE_TYPE_ITEM : CLICK_NAMES.HIDDEN_TYPE_ITEM
              }
              className={classNames(
                'animate__animated animate__fadeIn w-full cursor-pointer border-2 border-transparent border-solid p-4 flex flex-col rounded-lg dark:bg-slate-600 bg-slate-100 shadow-md',
                {
                  [styles.PizzaType__item]: !isVisible,
                  'border-green-500': selectedValue === item.id
                }
              )}
            >
              <h3 className="pointer-events-none font-bold">{item.title}</h3>
              <h3 className="pointer-events-none text-sm mt-2 whitespace-nowrap text-red-800 dark:text-rose-500">
                Price: {item.price}$
              </h3>
              {item.description && (
                <p className="text-sm mt-2 leading-7 pointer-events-none">
                  {item.description}
                </p>
              )}
              <input
                type="radio"
                name="type"
                id={item.title}
                value={item.id}
                className="hidden"
                onChange={onSelect}
                checked={item.id === selectedValue}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export { VisiblePizzaType };
