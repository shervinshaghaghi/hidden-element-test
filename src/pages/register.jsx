import classNames from 'classnames';
import { toast } from 'react-hot-toast';
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
        <p>For ordering your pizza you should be have an account.</p>

        <br />

        <div className="w-full flex flex-col gap-y-2">
          <div className="text-sm">
            Email Address <span className="text-rose-500 ml-1">*</span>
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

        <div className="w-full flex flex-col gap-y-2 my-4">
          <div className="text-sm">
            Name <span className="text-rose-500 ml-1">*</span>
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

        <div className="w-full flex flex-col gap-y-2">
          <div className="text-sm">
            Password <span className="text-rose-500 ml-1">*</span>
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
    </div>
  );
}
