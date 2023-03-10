import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Cart } from 'components/cart';
import { BurgerMenu } from 'components/burger-menu';
import { titleGenerator } from 'utils/title-generator';
import { VisiblePizzaSize } from 'components/pizza-size';
import { VisiblePizzaType } from 'components/pizza-type';
import { changeTestType } from 'store/app-data/app-slice';
import { VisiblePizzaCategory } from 'components/pizza-category';
import { SubmitOrderButton } from 'components/submit-order-button';

import LOGO_IMAGE from 'assets/pizza.png';

function HiddenElementPage() {
  titleGenerator('Hidden Element');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTestType(true));
  }, []);

  return (
    <div className="w-full relative p-5 overflow-hidden min-h-screen">
      <Cart isVisible={false} />
      <BurgerMenu />
      <img
        src={LOGO_IMAGE}
        alt="PIZZA WIZARD"
        className="mb-5 mx-auto animate__animated animate__bounceIn"
      />
      <h1 className="text-center text-2xl mt-10 text-slate-500 dark:text-slate-200 font-bold">
        Please Select Your Favorite Pizza
      </h1>
      <div className="w-full p-5 mx-auto max-w-5xl">
        <VisiblePizzaCategory isVisible={false} />
        <VisiblePizzaSize isVisible={false} />
        <VisiblePizzaType isVisible={false} />
        <SubmitOrderButton hideSubmitBtn />
      </div>
    </div>
  );
}

export { HiddenElementPage };
