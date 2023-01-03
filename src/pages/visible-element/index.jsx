import { titleGenerator } from 'utils/title-generator';
import { VisiblePizzaType } from 'components/pizza-type';
import { VisiblePizzaSize } from 'components/pizza-size';
import { VisibleHeader } from 'components/visible-header';
import { SubmitOrderButton } from 'components/submit-order-button';

function VisibleElementPage() {
  titleGenerator('Visible Element');

  return (
    <div>
      <VisibleHeader />
      <h1 className="text-center text-2xl mt-10 text-slate-500 dark:text-slate-200 font-bold">
        Please Select the Size & Type Of Your Pizza
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
