import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { CLICK_NAMES } from 'constants/click-names';

function BackButton({ className }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      data-click={CLICK_NAMES.BACK}
      className={classNames('text-sm', className)}
    >
      [ Go Back ]
    </button>
  );
}

export { BackButton };
