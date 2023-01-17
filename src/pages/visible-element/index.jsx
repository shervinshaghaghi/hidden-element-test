import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Cart } from 'components/cart';
import { titleGenerator } from 'utils/title-generator';
import { VisiblePizzaType } from 'components/pizza-type';
import { VisiblePizzaSize } from 'components/pizza-size';
import { VisibleHeader } from 'components/visible-header';
import { changeTestType } from 'store/app-data/app-slice';
import { VisiblePizzaCategory } from 'components/pizza-category';
import { SubmitOrderButton } from 'components/submit-order-button';

import LOGO_IMAGE from 'assets/pizza.png';

function VisibleElementPage() {
  titleGenerator('Visible Element');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTestType(false));
  }, []);

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-full">
        <VisibleHeader />
        <img
          src={LOGO_IMAGE}
          alt="PIZZA WIZARD"
          className="mb-5 mx-auto animate__animated animate__bounceIn"
        />
        <h1 className="text-center text-2xl mt-10 text-slate-500 dark:text-slate-200 font-bold">
          Please Select Your Favorite Pizza
        </h1>
        <div className="w-full p-5 mx-auto max-w-5xl">
          <VisiblePizzaCategory />
          <VisiblePizzaSize />
          <VisiblePizzaType />
          <SubmitOrderButton />
        </div>
      </div>
      <Cart />
    </div>
  );
}

export { VisibleElementPage };
