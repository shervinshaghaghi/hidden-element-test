import { titleGenerator } from 'utils/title-generator';
import { VisiblePizzaType } from 'components/pizza-type';
import { VisiblePizzaSize } from 'components/pizza-size';
import { VisibleHeader } from 'components/visible-header';
import { SubmitOrderButton } from 'components/submit-order-button';

import LOGO_IMAGE from 'assets/pizza.png';

function VisibleElementPage() {
  titleGenerator('Visible Element');

  return (
    <div>
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
        <VisiblePizzaSize />
        <VisiblePizzaType />
        <SubmitOrderButton />
      </div>
    </div>
  );
}

export { VisibleElementPage };
