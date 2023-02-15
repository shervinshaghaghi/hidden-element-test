import { useSelector } from 'react-redux';
import { passwordStrength } from 'check-password-strength';

import { appSelectors } from 'store/app-data/app-selectors';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export function CheckPassword({ password = '', onChange }) {
  const { isHiddenTest } = useSelector(appSelectors.appData);
  const [passwordData, setPasswordData] = useState({
    id: 0,
    length: 0,
    value: 'Weak',
    contains: []
  });

  useEffect(() => {
    const data = passwordStrength(password);
    setPasswordData(data);
    if (onChange) {
      onChange(data.value);
    }
  }, [password]);

  const classes = classNames('py-1 rounded w-full', {
    'bg-red-600': passwordData.id === 0,
    'bg-green-400': passwordData.id === 3,
    'bg-orange-400': passwordData.id === 1,
    'bg-yellow-400': passwordData.id === 2
  });

  if (isHiddenTest) {
    return (
      <div className="w-full grid grid-cols-4 grid-rows-1 gap-x-2 px-3 items-center">
        <div className={classes} />
        <div className={classes} />
        <div className={classes} />
        <div className={classes} />
      </div>
    );
  }

  return (
    <div className="text-slate-500">
      <p className="text-sm mt-1 mb-2">
        Your Password : <strong>{passwordData.value}</strong>
      </p>
      <ul className="text-sm leading-7 list-disc ml-6">
        <li className={passwordData.length >= 10 && 'text-green-500'}>
          Must have at least 10 characters
        </li>
        <li
          className={
            passwordData.contains.findIndex((item) => item === 'number') !== -1 &&
            'text-green-500'
          }
        >
          Must contain at least one number
        </li>
        <li
          className={
            passwordData.contains.findIndex((item) => item === 'uppercase') !== -1 &&
            'text-green-500'
          }
        >
          Must have at least one uppercase character
        </li>
        <li
          className={
            passwordData.contains.findIndex((item) => item === 'lowercase') !== -1 &&
            'text-green-500'
          }
        >
          Must have at least one lowercase character
        </li>
        <li
          className={
            passwordData.contains.findIndex((item) => item === 'symbol') !== -1 &&
            'text-green-500'
          }
        >
          Must have at least one special character (symbol).
        </li>
      </ul>
    </div>
  );
}
