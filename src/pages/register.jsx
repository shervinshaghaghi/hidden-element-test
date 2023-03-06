/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { msToTime } from 'utils/ms-to-time';
import { BackButton } from 'components/back-button';
import { CLICK_NAMES } from 'constants/click-names';
import { titleGenerator } from 'utils/title-generator';
import { CheckPassword } from 'components/check-password';
import { registerAction } from 'store/app-data/app-slice';
import { appSelectors } from 'store/app-data/app-selectors';
import { REGISTER_TIME_STORAGE_KEY } from 'constants/local-storage-keys';

import INFO_IMAGE from 'assets/info.png';
import SUCCESS_IMAGE from 'assets/success.png';

import 'react-tooltip/dist/react-tooltip.css';

export function RegisterPage() {
  titleGenerator('Create Account');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerTime, setRegisterTime] = useState(0);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const { name, password, isHiddenTest } = useSelector(appSelectors.appData);
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    email: ''
  });

  useEffect(() => {
    setRegisterTime(new Date().getTime());
  }, []);

  const onChanges = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const checkPassword = (value) => {
    if (value === 'Strong') {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const onSuccess = (id) => () => {
    toast.dismiss(id);
    setUserData({
      name: '',
      password: '',
      email: ''
    });
    navigate(-1);
  };

  const emailValidation = (email = '') => {
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const register = (e) => {
    e.preventDefault();
    if (!emailValidation(userData.email)) {
      toast.error('Please, Enter Your Valid Email Address.');
      return;
    }
    if (!userData.name) {
      toast.error('Please, Enter Your Name.');
      return;
    }
    if (!passwordIsValid) {
      toast.error('Your Password Is Not Strong.');
      return;
    }

    const time = msToTime(new Date().getTime() - registerTime);
    localStorage.setItem(REGISTER_TIME_STORAGE_KEY, time);

    dispatch(registerAction(userData));
    toast(
      (t) => (
        <div className="flex flex-col items-center py-3">
          <img alt="" src={SUCCESS_IMAGE} width={48} />
          <div className="font-bold mt-4">Your Registration Was Successful.</div>
          <div className="mt-2 text-sm text-center text-yellow-600">
            Now, you can submit the order in the shopping cart.
          </div>
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
    button: classNames('w-full mt-6 duration-300 rounded-lg py-1 leading-9', {
      'bg-slate-300 text-slate-400':
        !passwordIsValid || !emailValidation(userData.email) || !userData.name.length,
      'text-slate-50 bg-rose-700 hover:bg-rose-600':
        passwordIsValid && userData.name.length && emailValidation(userData.email)
    })
  };

  if (name.length && password.length) {
    return (
      <div className="w-full px-5">
        <div className="animate__animated animate__fadeIn flex shadow-lg flex-col bg-slate-100 dark:bg-slate-700 p-5 rounded-lg max-w-lg mx-auto mt-10">
          <h3 className="mb-2 text-2xl font-bold text-rose-500">
            Create Account - You Are Already Registered
          </h3>
          <br />
          <p>
            You have already done this step. <br /> You can order your pizza now!
          </p>
          <br />
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-5">
      <div className="animate__animated animate__fadeIn flex shadow-lg flex-col bg-slate-100 dark:bg-slate-700 p-5 rounded-lg max-w-lg mx-auto mt-10">
        <h3 className="mb-2 text-2xl font-bold text-rose-500">Create Account</h3>
        <p>For ordering your pizza, you should create an account.</p>
        <p className="mt-4 text-sm text-yellow-600">
          The blanks must be filled currectly in order to the create account button to
          turn on.
        </p>
        <br />

        <div className="w-full flex flex-col gap-y-2 relative">
          <div className="text-sm flex items-center">
            Email Address <span className="text-rose-500 ml-1">*</span>
            {isHiddenTest && (
              <div className="ml-1">
                <img
                  width={26}
                  alt="INFO"
                  src={INFO_IMAGE}
                  id="info-tooltip-name"
                  className="opacity-90"
                />
                <Tooltip
                  anchorId="info-tooltip-name"
                  content="Your email address must be have @ and valid email domain."
                />
              </div>
            )}
          </div>
          <input
            required
            type="email"
            name="email"
            onChange={onChanges}
            value={userData.email}
            autoComplete="off"
            placeholder="Enter Your Email Address"
            className={classNames('w-full', classes.input)}
          />

          {!isHiddenTest && (
            <p
              className={classNames('text-xs', {
                'text-slate-500': !emailValidation(userData.email),
                'text-green-500': emailValidation(userData.email)
              })}
            >
              Your email address must be have @ and valid email domain.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-2 my-4 relative">
          <div className="text-sm flex items-center">
            Name <span className="text-rose-500 ml-1">*</span>
            {isHiddenTest && (
              <div className="ml-1">
                <img
                  width={26}
                  alt="INFO"
                  src={INFO_IMAGE}
                  id="info-tooltip-email"
                  className="opacity-90"
                />
                <Tooltip
                  anchorId="info-tooltip-email"
                  content="Your name must be not empty."
                />
              </div>
            )}
          </div>
          <input
            required
            name="name"
            onChange={onChanges}
            value={userData.name}
            placeholder="Enter Your Name"
            className={classNames('bg-transparent h-11', classes.input)}
          />

          {!isHiddenTest && (
            <p
              className={classNames('text-xs', {
                'text-slate-500': !userData.name.length,
                'text-green-500': userData.name.length
              })}
            >
              Your name must be not empty.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-2 relative">
          <div className="flex items-center text-sm">
            <div className="flex flex-col">
              <div className="flex items-center">
                <label>Password</label>
                <span className="text-rose-500 ml-1">*</span>
                {isHiddenTest && (
                  <div className="ml-1">
                    <img
                      width={26}
                      alt="INFO"
                      src={INFO_IMAGE}
                      id="info-tooltip-pass"
                      className="opacity-90"
                    />
                    <Tooltip
                      anchorId="info-tooltip-pass"
                      content={
                        <ul className="text-sm leading-6">
                          <li>Must have at least 10 characters</li>
                          <li>Must contain at least one number</li>
                          <li>Must have at least one uppercase character</li>
                          <li>Must have at least one lowercase character</li>
                          <li>Must have at least one special character (symbol).</li>
                        </ul>
                      }
                    />
                  </div>
                )}
              </div>
              <label className="mt-1 mb-1 text-xs text-yellow-600">
                Please set a strong password.
              </label>
            </div>
          </div>
          <input
            required
            type="password"
            name="password"
            autoComplete="off"
            onChange={onChanges}
            aria-autocomplete="none"
            value={userData.password}
            placeholder="Enter Your Password"
            className={classNames('bg-transparent h-11', classes.input)}
          />
          <CheckPassword password={userData.password} onChange={checkPassword} />
        </div>

        <button
          type="submit"
          onClick={register}
          className={classes.button}
          disabled={
            !passwordIsValid || !emailValidation(userData.email) || !userData.name.length
          }
          data-click={CLICK_NAMES.CTA_BTN}
        >
          Create Account
        </button>
        <br />
        <BackButton />
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}
