import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CLICK_NAMES } from 'constants/click-names';
import { appSelectors } from 'store/app-data/app-selectors';
import { HOME_URL, THANK_YOU_PAGE_URL } from 'constants/app-routes';
import { useEffect } from 'react';
import { CATEGOREIS, SIZES, TYPES } from 'constants/pizza';

function SubmitOrderButton({
  hidePrice = false,
  hideSubmitBtn = false,
  hideCancelBtn = false
}) {
  const navigate = useNavigate();
  const { count, _cart, cart, name, password } = useSelector(appSelectors.appData);

  const showItem =
    CATEGOREIS[_cart?.category?.id]?.title &&
    TYPES[_cart?.type?.id]?.title &&
    SIZES[_cart?.size?.id]?.title;

  const onSuccess = (id) => () => {
    toast.dismiss(id);
  };

  const onSubmit = () => {
    if (!name || !password) {
      // toast.error('Please, Create an account.');
      toast(
        (t) => (
          <div className="flex flex-col items-center p-6">
            <div>Please, Create an account.</div>
            <button
              type="button"
              className="font-bold bg-red-500 mt-4 px-5 rounded-md py-2 text-slate-50"
              onClick={onSuccess(t.id)}
            >
              OK
            </button>
          </div>
        ),
        { duration: 6000, position: 'bottom-center' }
      );
      return;
    }
    navigate(THANK_YOU_PAGE_URL);
  };

  const onLeave = (id) => () => {
    toast.dismiss(id);
    navigate(HOME_URL);
  };

  useEffect(() => {
    if (Object.keys(cart).length === 3) {
      window.scroll(0, 0);
    }
  }, [Object.keys(cart).length]);

  const showLeaveModal = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center p-6">
          <div>Are You Sure To Exit The Test ?</div>
          <div className="flex items-center gap-x-3 mt-2">
            <button
              type="button"
              className="font-bold bg-green-500 mt-4 px-5 rounded-md py-2 text-slate-50"
              onClick={onLeave(t.id)}
            >
              Yes
            </button>
            <button
              type="button"
              className="font-bold bg-rose-500 mt-4 px-5 rounded-md py-2 text-slate-50"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 10000, position: 'top-center' }
    );
  };

  return (
    <div className="flex flex-col items-center">
      {showItem && !hideCancelBtn && (
        <div className="mt-4 mb-7 text-yellow-600">
          Please, Submit your order in the shopping cart.
        </div>
      )}

      <div
        className={classNames('pb-4 flex gap-x-4 justify-center items-center', {
          'my-8': !hidePrice
        })}
      >
        {!hideSubmitBtn && (
          <button
            type="button"
            onClick={onSubmit}
            data-click={CLICK_NAMES.SUBMIT_BTN}
            className={classNames(
              'text-sm text-slate-50 bg-green-500 hover:bg-green-600 duration-300 leading-10 rounded-lg',
              {
                'px-3': hidePrice,
                'py-1 px-4': !hidePrice
              }
            )}
          >
            {hidePrice
              ? 'Submit Order'
              : `Submit Order ( ${
                  count * Object.values(cart).reduce((partialSum, a) => partialSum + a, 0)
                }$ )`}
          </button>
        )}

        {!hideCancelBtn && (
          <button
            type="button"
            onClick={showLeaveModal}
            className={classNames(
              'text-sm text-slate-50 bg-rose-500 hover:bg-rose-600 duration-300 leading-10 rounded-lg',
              {
                'px-3': hidePrice,
                'py-1 px-4': !hidePrice
              }
            )}
          >
            Cancel Prototype
          </button>
        )}
      </div>
    </div>
  );
}

export { SubmitOrderButton };
