/* eslint-disable */
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { CLICK_NAMES } from 'constants/click-names';
import { HOME_URL, THANK_YOU_PAGE_URL } from 'constants/app-routes';
import { appSelectors } from 'store/app-data/app-selectors';

function SubmitOrderButton({ hidePrice = false }) {
  const navigate = useNavigate();
  const { cart, userEmail } = useSelector(appSelectors.appData);

  const onSubmit = () => {
    if (!userEmail) {
      toast.error('Please, join to our newsletters.');
      return;
    }
    navigate(THANK_YOU_PAGE_URL);
  };
  return (
    <div className={classNames("pb-4 flex gap-x-4 justify-center items-center", {
      'my-8': !hidePrice
    })}>
      <button
        type="button"
        onClick={onSubmit}
        data-click={CLICK_NAMES.SUBMIT_BTN}
        className={classNames("text-sm text-slate-50 bg-green-500 hover:bg-green-600 duration-300 leading-10 rounded-lg", {
          'px-3': hidePrice,
          'py-1 px-4': !hidePrice
        })}
        >
        {hidePrice ? 'Submit Order' : `Submit Order ( ${Object.values(cart).reduce(
          (partialSum, a) => partialSum + a,
          0
          )}$ )`}
      </button>
      <Link
        to={HOME_URL}
        className={classNames("text-sm text-slate-50 bg-rose-500 hover:bg-rose-600 duration-300 leading-10 rounded-lg", {
          'px-3': hidePrice,
          'py-1 px-4': !hidePrice,
        })}
      >
        Cancel
      </Link>
    </div>
  );
}

export { SubmitOrderButton };
