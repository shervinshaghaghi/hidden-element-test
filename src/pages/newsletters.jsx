import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { store } from 'store';
import { BackButton } from 'components/back-button';
import { CLICK_NAMES } from 'constants/click-names';
import { titleGenerator } from 'utils/title-generator';
import { setUserEmailAction } from 'store/app-data/app-slice';

function NewslettersPage() {
  titleGenerator('Newsletters');
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  const submit = () => {
    if (!userEmail) {
      toast.error('Please, Enter Your Email Address.');
      return;
    }
    store.dispatch(setUserEmailAction(userEmail));
    toast.success('Your Registration Was Successful.');
    setUserEmail('');
    navigate(-1);
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
          Join
        </button>

        <BackButton />
      </div>
    </div>
  );
}
export { NewslettersPage };
