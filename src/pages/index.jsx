/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { store } from 'store';
import { CLICK_NAMES } from 'constants/click-names';
import { titleGenerator } from 'utils/title-generator';
import { resetAction, setUserDataAction } from 'store/app-data/app-slice';
import { START_TIME_STORAGE_KEY } from 'constants/local-storage-keys';
import { HIDDEN_ELEMENT_PAGE_URL, VISIBLE_ELEMENT_PAGE_URL } from 'constants/app-routes';

import LOGO_IMAGE from 'assets/pizza.png';
import classNames from 'classnames';

const TESTS = {
  HIDDEN_ELEMENT: 'HIDDEN_ELEMENT',
  VISIBLE_ELEMENT: 'VISIBLE_ELEMENT'
};

function HomePage() {
  titleGenerator();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    age: 'Prefer not to answer',
    job: 'Prefer not to answer',
    sex: 'Prefer not to answer'
  });

  useEffect(() => {
    dispatch(resetAction());
  }, []);

  const onChanges = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const onStart = (testName) => () => {
    const testIsHiddenType = testName === TESTS.HIDDEN_ELEMENT;
    if (testName === TESTS.HIDDEN_ELEMENT) {
      navigate(HIDDEN_ELEMENT_PAGE_URL);
    }
    if (testName === TESTS.VISIBLE_ELEMENT) {
      navigate(VISIBLE_ELEMENT_PAGE_URL);
    }
    store.dispatch(setUserDataAction({ ...userData, isHiddenTest: testIsHiddenType }));
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
          <li>1 - Create an account.</li>
          <li>2 - Order your favorite pizza.</li>
        </ul>
      </div>

      {/* <div className="w-full flex flex-col gap-y-2">
        <div className="text-sm">What's Your Name? (optional)</div>
        <input
          name="name"
          onChange={onChanges}
          value={userData.name}
          placeholder="Enter Your Name"
          className={classNames('bg-transparent h-11', classes.input)}
        />
      </div> */}

      <div className="w-full flex flex-col gap-y-2">
        <div className="text-sm">
          To which gender identity do you most identify?
          <span className="text-rose-500 ml-1">*</span>
        </div>
        <select
          name="sex"
          onChange={onChanges}
          className={classNames('bg-transparent h-11', classes.input)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Prefer not to answer" selected>
            Prefer not to answer
          </option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <div className="text-sm">
          What is your age?
          <span className="text-rose-500 ml-1">*</span>
        </div>
        <select
          name="age"
          onChange={onChanges}
          className={classNames('bg-transparent h-11', classes.input)}
        >
          <option value="18 - 24">18 - 24 years old</option>
          <option value="25 - 34">25 - 34 years old</option>
          <option value="35 - 44">35 - 44 years old</option>
          <option value="45 - 54">45 - 54 years old</option>
          <option value="55 - 64">55 - 64 years old</option>
          <option value="65+">65+ years old</option>
          <option value="Prefer not to answer" selected>
            Prefer not to answer
          </option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-y-2 mb-2">
        <span className="text-sm">
          What is the highest dgree or school level you have completed (optional)
        </span>
        <select
          name="job"
          onChange={onChanges}
          className={classNames('bg-transparent h-11', classes.input)}
        >
          <option value="Less than a high school">Less than a high school</option>
          <option value="High school graduate or equivalent">
            High school graduate or equivalent
          </option>
          <option value="Some college credit, but no degree">
            Some college credit, but no degree
          </option>
          <option value="Bachelor's degree">Bachelor's degree</option>
          <option value="Master's degree">Master's degree</option>
          <option value="PhD or higher">PhD or higher</option>
          <option value="Prefer not to answer" selected>
            Prefer not to answer
          </option>
        </select>
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
      <br />
      <br />
      <br />
    </div>
  );
}

export { HomePage };
