/* eslint-disable */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { store } from 'store';
import { click } from 'utils/click';
import { CATEGOREIS } from 'constants/pizza';
import { CLICK_NAMES } from 'constants/click-names';
import { updateCartAction } from 'store/app-data/app-slice';
import { appSelectors } from 'store/app-data/app-selectors';

import ARROW_IMAGE from 'assets/arrow.png';

import styles from './pizza-category.module.scss';

function VisiblePizzaCategory({ isVisible = true }) {
  const { pathname } = useLocation();
  const { cart } = useSelector(appSelectors.appData);

  const [show, setShow] = useState(isVisible);
  const [selectedValue, setSelectedValue] = useState();
  const [showAllCategory, setShowAllCategory] = useState(false);

  const onSelect = ({ target }) => {
    const id = +target.value;
    const item = CATEGOREIS[id];
    setSelectedValue(id);
    store.dispatch(updateCartAction({ name: 'category', price: item.price }));
  };

  const toggle = () => {
    if (!isVisible) {
      setShow(!show);
    }
  };

  const checkHover = () => {
    if (isVisible) return;
    click(CLICK_NAMES.HIDDEN_CATEGORY_ITEM__HOVER);
  };

  useEffect(() => {
    const filterd = Object.values(CATEGOREIS).filter((item) => item.price === cart?.category);
    setSelectedValue(filterd?.[0]?.id);
  }, [pathname]);

  const categoreisArray = Object.values(CATEGOREIS);
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
        Category
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
        <div
          style={{ minHeight: 120 }}
          className="w-full grid grid-cols-5 justify-center gap-4"
        >
          {categoreisArray.splice(0, showAllCategory || isVisible ? categoreisArray.length : 2).map((item) => (
            <label
              onMouseEnter={checkHover}
              htmlFor={item.title}
              data-click={
                isVisible ? CLICK_NAMES.VISIBLE_CATEGORY_ITEM : CLICK_NAMES.HIDDEN_CATEGORY_ITEM
              }
              className={classNames(
                'animate__animated animate__fadeIn cursor-pointer overflow-hidden border-2 border-transparent border-solid p-4 flex flex-col items-center justify-center rounded-lg dark:bg-slate-600 bg-slate-100 shadow-md',
                {
                  [styles.PizzaCategory__item]: !isVisible,
                  'border-green-500': selectedValue === item.id
                }
              )}
            >
              <h3 className="pointer-events-none font-bold">{item.title}</h3>
              <h3 className="pointer-events-none text-sm mt-2 whitespace-nowrap text-red-800 dark:text-rose-500">
                Price: {item.price}$
              </h3>
              {item.description && (
                <p className="pointer-events-none text-sm mt-2">
                  {item.description}
                </p>
              )}
              <input
                type="radio"
                name="category"
                id={item.title}
                value={item.id}
                className="hidden"
                onChange={onSelect}
                checked={item.id === selectedValue}
              />
            </label>
          ))}
          {
            !showAllCategory && !isVisible && (
              <button
                onClick={() => setShowAllCategory(true)}
                className={classNames(
                  'animate__animated animate__fadeIn cursor-pointer border-2 border-transparent border-solid py-4 px-6 flex flex-col items-center justify-center rounded-lg dark:bg-slate-600 bg-slate-100 shadow-md',
                  {
                    [styles.PizzaCategory__item]: !isVisible,
                  }
                )}
              >
                More ...
              </button>
            )
          }
        </div>
      )}
    </div>
  );
}

export { VisiblePizzaCategory };
