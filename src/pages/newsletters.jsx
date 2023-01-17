import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { store } from 'store';
import { BackButton } from 'components/back-button';
import { CLICK_NAMES } from 'constants/click-names';
import { titleGenerator } from 'utils/title-generator';
import { appSelectors } from 'store/app-data/app-selectors';
import { setUserEmailAction } from 'store/app-data/app-slice';

import ARROW_IMAGE from 'assets/arrow.png';
import classNames from 'classnames';

function NewslettersPage() {
  titleGenerator('Newsletters');
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { isHiddenTest } = useSelector(appSelectors.appData);

  useEffect(() => {
    setShowForm(!isHiddenTest);
  }, [isHiddenTest]);

  const onSuccess = (id) => () => {
    toast.dismiss(id);
    setUserEmail('');
    navigate(-1);
  };

  const submit = () => {
    if (!userEmail) {
      toast.error('Please, Enter Your Email Address.');
      return;
    }
    store.dispatch(setUserEmailAction(userEmail));
    toast(
      (t) => (
        <div className="flex flex-col items-center p-6">
          <div>Your Registration Was Successful.</div>
          <button
            type="button"
            className="font-bold bg-green-500 mt-4 px-5 rounded-md py-2 text-slate-50"
            onClick={onSuccess(t.id)}
          >
            OK
          </button>
        </div>
      ),
      { duration: 10000, position: 'top-center' }
    );
  };

  const classes = {
    input:
      'px-4 bg-transparent duration-300 rounded-lg leading-10 outline-none border-2 border-solid focus:border-amber-500',
    button:
      'w-full duration-300 mb-5 rounded-lg py-1 mt-1 leading-9 text-slate-50 bg-rose-700 hover:bg-rose-600'
  };

  return (
    <div className="w-full px-5">
      <div className="animate__animated animate__fadeIn flex shadow-lg flex-col bg-slate-100 dark:bg-slate-700 p-5 rounded-lg max-w-lg mx-auto mt-10">
        <h3 className="mb-2 text-2xl font-bold text-rose-500">Pizza News</h3>
        <p>By subscribing to our newsletter,</p>
        <p>you can be aware of the latest news and new menu items.</p>

        <br />

        {showForm ? (
          <>
            <div className="w-full flex flex-col gap-y-2 mb-2">
              <span className="text-sm">Your Email Address</span>
              <input
                type="email"
                value={userEmail}
                className={classes.input}
                placeholder="Enter Your Email Address"
                onChange={({ target }) => setUserEmail(target.value)}
              />
            </div>

            <button
              type="button"
              onClick={submit}
              className={classes.button}
              data-click={CLICK_NAMES.CTA_BTN}
            >
              Register
            </button>
          </>
        ) : (
          <button
            type="button"
            className={classNames('flex items-center justify-center', classes.button)}
            data-click={CLICK_NAMES.CTA_BTN}
            onClick={() => setShowForm(true)}
          >
            Join
            <img width={10} className="-rotate-90 invert ml-2" alt="" src={ARROW_IMAGE} />
          </button>
        )}

        <BackButton />
      </div>
    </div>
  );
}
export { NewslettersPage };
