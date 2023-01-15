import { BurgerMenu } from 'components/burger-menu';
import { titleGenerator } from 'utils/title-generator';
import { VisiblePizzaSize } from 'components/pizza-size';
import { VisiblePizzaType } from 'components/pizza-type';
import { SubmitOrderButton } from 'components/submit-order-button';

import LOGO_IMAGE from 'assets/pizza.png';

function HiddenElementPage() {
  titleGenerator('Hidden Element');
  return (
    <div className="w-full h-screen relative p-5 overflow-hidden">
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
        <VisiblePizzaSize isVisible={false} />
        <VisiblePizzaType isVisible={false} />
        <SubmitOrderButton />
      </div>
    </div>
  );
}

export { HiddenElementPage };
