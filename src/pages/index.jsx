/* eslint-disable */
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { store } from 'store';
import { CLICK_NAMES } from 'constants/click-names';
import { titleGenerator } from 'utils/title-generator';
import { setUserDataAction } from 'store/app-data/app-slice';
import { START_TIME_STORAGE_KEY } from 'constants/local-storage-keys';
import { HIDDEN_ELEMENT_PAGE_URL, VISIBLE_ELEMENT_PAGE_URL } from 'constants/app-routes';

import LOGO_IMAGE from 'assets/pizza.png';

const TESTS = {
  HIDDEN_ELEMENT: 'HIDDEN_ELEMENT',
  VISIBLE_ELEMENT: 'VISIBLE_ELEMENT'
};

function HomePage() {
  titleGenerator();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    age: '',
    job: '',
    sex: ''
  });

  const onChanges = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const onStart = (testName) => () => {
    const AGE = parseInt(userData.age);
    const testIsHiddenType = testName === TESTS.HIDDEN_ELEMENT;
    // eslint-disable-next-line use-isnan
    if (AGE.toString().length !== 2 || AGE === NaN) {
      toast.error('Please, Enter your current age.');
      return;
    }
    if (userData.sex === '') {
      toast.error('Please, Select your gender.');
      return;
    }
    if (testName === TESTS.HIDDEN_ELEMENT) {
      navigate(HIDDEN_ELEMENT_PAGE_URL);
    }
    if (testName === TESTS.VISIBLE_ELEMENT) {
      navigate(VISIBLE_ELEMENT_PAGE_URL);
    }
    store.dispatch(setUserDataAction({...userData, isHiddenTest: testIsHiddenType }));
    localStorage.setItem(START_TIME_STORAGE_KEY, new Date().getTime());
  };

  const classes = {
    input:
      'px-4 bg-transparent duration-300 rounded-lg leading-10 outline-none border-2 border-solid focus:border-amber-500',
    button:
      'w-full duration-300 rounded-lg py-1 leading-9 text-slate-50 bg-rose-700 hover:bg-rose-600'
  };

  return (
    <div className="p-5 w-full max-w-sm mx-auto min-h-screen flex flex-col items-center justify-center gap-y-4">
      <img
        src={LOGO_IMAGE}
        alt="PIZZA WIZARD"
        className="mb-5 animate__animated animate__bounceIn"
      />

      <div className="animate__animated shadow-md animate__fadeIn flex flex-col w-full text-sm bg-slate-100 dark:bg-slate-600 p-4 rounded-lg">
        <h3 className="mb-2 font-bold text-md">Your Tasks:</h3>
        <ul className="flex flex-col gap-y-2 w-full">
          <li>1 - Join To Our Newsletters.</li>
          <li>2 - Order Your Favorite Pizza.</li>
        </ul>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <div className="text-sm">
          Your Sex
          <span className="text-rose-500 ml-1">*</span>
        </div>
        <div className='flex items-center gap-x-4'>
          <label htmlFor="male" className='cursor-pointer'>
            <input id="male" type="radio" name="sex" value="male" className='mr-2' onChange={onChanges} />
            Male
          </label>
          <label htmlFor="famale" className='cursor-pointer'>
            <input id="famale" type="radio" name="sex" value="famale" className='mr-2' onChange={onChanges} />
            Famale
          </label>
          <label htmlFor="other" className='cursor-pointer'>
            <input id="other" type="radio" name="sex" value="other" className='mr-2' onChange={onChanges} />
            Other
          </label>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <div className="text-sm">
          Your Age
          <span className="text-rose-500 ml-1">*</span>
        </div>
        <input
          name="age"
          maxLength={2}
          minLength={2}
          value={userData.age}
          onChange={onChanges}
          className={classes.input}
          placeholder="Enter Your Age"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2 mb-2">
        <span className="text-sm">Your Job Title (optional)</span>
        <input
          name="job"
          value={userData.job}
          onChange={onChanges}
          className={classes.input}
          placeholder="Enter Your Job Title"
        />
      </div>

      <button
        type="button"
        className={classes.button}
        data-click={CLICK_NAMES.CTA_BTN}
        onClick={onStart(TESTS.VISIBLE_ELEMENT)}
      >
        Visible Element Test
      </button>
      <button
        type="button"
        className={classes.button}
        data-click={CLICK_NAMES.CTA_BTN}
        onClick={onStart(TESTS.HIDDEN_ELEMENT)}
      >
        Hidden Element Test
      </button>
    </div>
  );
}

export { HomePage };
