import { Link } from 'react-router-dom';

import {
  ABOUT_US_PAGE_URL,
  REGISTER_PAGE_URL,
  CONTACT_US_PAGE_URL,
  // NEWSLETTERS_PAGE_URL,
  VISIBLE_ELEMENT_PAGE_URL
} from 'constants/app-routes';
import { CLICK_NAMES } from 'constants/click-names';

function VisibleHeader() {
  const hoverAnimation =
    'duration-300 hover:bg-slate-200 hover:dark:bg-slate-600 border-b-2 border-solid border-transparent hover:dark:border-slate-50 hover:border-slate-700';
  const itemClasses = 'leading-10 text-sm pointer-events-none duration-300 py-2 px-4';
  return (
    <header className="w-full shadow-md bg-slate-100 dark:bg-slate-700 px-5 mb-4">
      <ul className="flex items-center justify-center w-full mx-auto">
        <Link
          className={hoverAnimation}
          to={VISIBLE_ELEMENT_PAGE_URL}
          data-click={CLICK_NAMES.VISIBLE_HEADER_ITEM}
        >
          <li className={itemClasses}>Home</li>
        </Link>
        <Link
          to={ABOUT_US_PAGE_URL}
          className={hoverAnimation}
          data-click={CLICK_NAMES.VISIBLE_HEADER_ITEM}
        >
          <li className={itemClasses}>About Us</li>
        </Link>
        <Link
          to={CONTACT_US_PAGE_URL}
          className={hoverAnimation}
          data-click={CLICK_NAMES.VISIBLE_HEADER_ITEM}
        >
          <li className={itemClasses}>Contact Us</li>
        </Link>
        {/* <Link
          to={NEWSLETTERS_PAGE_URL}
          className={hoverAnimation}
          data-click={CLICK_NAMES.VISIBLE_HEADER_ITEM}
        >
          <li className={itemClasses}>Newsletters</li>
        </Link> */}
        <Link
          to={REGISTER_PAGE_URL}
          className={hoverAnimation}
          data-click={CLICK_NAMES.VISIBLE_HEADER_ITEM}
        >
          <li className={itemClasses}>Register</li>
        </Link>
      </ul>
    </header>
  );
}

export { VisibleHeader };
