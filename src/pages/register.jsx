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
  titleGenerator('Register');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerTime, setRegisterTime] = useState(0);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const { username, password } = useSelector(appSelectors.appData);
  const [userData, setUserData] = useState({
    username: '',
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

  const register = () => {
    if (!passwordIsValid) {
      toast.error('Your Password Is Not Strong.');
      return;
    }
    if (!userData.username) {
      toast.error('Please, Enter Your Username.');
      return;
    }
    if (!userData.email) {
      toast.error('Please, Enter Your Email Address.');
      return;
    }

    const time = msToTime(new Date().getTime() - registerTime);
    localStorage.setItem(REGISTER_TIME_STORAGE_KEY, time);

    dispatch(registerAction(userData));
    toast.success('Your registration was successful.');
    navigate(-1);
  };

  const classes = {
    input:
      'px-4 bg-transparent duration-300 rounded-lg leading-10 outline-none border-2 border-solid focus:border-amber-500',
    button: classNames('w-full mt-6 duration-300 rounded-lg py-1 leading-9', {
      'bg-slate-300 text-slate-400': !passwordIsValid,
      'text-slate-50 bg-rose-700 hover:bg-rose-600': passwordIsValid
    })
  };

  if (username.length && password.length) {
    return (
      <div className="w-full px-5">
        <div className="animate__animated animate__fadeIn flex shadow-lg flex-col bg-slate-100 dark:bg-slate-700 p-5 rounded-lg max-w-lg mx-auto mt-10">
          <h3 className="mb-2 text-2xl font-bold text-rose-500">
            Register - You Are Already Registered
          </h3>
          <br />
          <p>
            You have already done this step. <br /> You can order your pizza now
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
        <h3 className="mb-2 text-2xl font-bold text-rose-500">Register</h3>
        <p>For ordering your pizza you should be registered.</p>

        <br />
        <div className="w-full flex flex-col gap-y-2">
          <div className="text-sm">
            Username <span className="text-rose-500 ml-1">*</span>
          </div>
          <input
            name="username"
            onChange={onChanges}
            value={userData.username}
            placeholder="Enter Your Username"
            className={classNames('bg-transparent h-11', classes.input)}
          />
        </div>

        <div className="w-full flex flex-col gap-y-2 mt-4">
          <div className="text-sm">
            Email Address <span className="text-rose-500 ml-1">*</span>
          </div>
          <input
            type="email"
            name="email"
            onChange={onChanges}
            value={userData.email}
            placeholder="Enter Your Email Address"
            className={classNames('w-full', classes.input)}
          />
        </div>

        <div className="w-full flex flex-col gap-y-2 mt-4">
          <div className="text-sm">
            Password <span className="text-rose-500 ml-1">*</span>
          </div>
          <input
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
          type="button"
          onClick={register}
          className={classes.button}
          disabled={!passwordIsValid}
          data-click={CLICK_NAMES.CTA_BTN}
        >
          Register
        </button>
        <br />
        <BackButton />
      </div>
    </div>
  );
}
