import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CLICK_NAMES } from 'constants/click-names';
import {
  ABOUT_US_PAGE_URL,
  REGISTER_PAGE_URL,
  CONTACT_US_PAGE_URL,
  // NEWSLETTERS_PAGE_URL,
  HIDDEN_ELEMENT_PAGE_URL
} from 'constants/app-routes';

import MENU_IMAGE from 'assets/menu-bar.png';
import MENU_CLOSE_IMAGE from 'assets/close.png';

function BurgerMenu() {
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  const itemClasses =
    'w-full pointer-events-none font-bold leading-10 px-4 border-b-2 border-solid border-transparent hover:border-slate-200 dark:hover:border-slate-800 mb-3';

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="absolute z-30 dark:invert px-6 text-sm rounded-lg leading-9 py-1 left-5 top-5"
      >
        {show ? (
          <img width={40} alt="CLOSE" src={MENU_CLOSE_IMAGE} />
        ) : (
          <img width={40} alt="MENU" src={MENU_IMAGE} />
        )}
      </button>

      {show && (
        <div className="animate__animated animate__fadeInLeft shadow-lg flex items-center justify-center px-5 absolute top-0 left-0 right-0 bottom-0 w-full h-screen bg-burger-menu z-20">
          <ul className="flex flex-col items-center w-full">
            <Link
              onClick={toggleMenu}
              to={HIDDEN_ELEMENT_PAGE_URL}
              data-click={CLICK_NAMES.HIDDEN_HEADER_ITEM}
            >
              <li className={itemClasses}>Home</li>
            </Link>
            <Link
              onClick={toggleMenu}
              to={ABOUT_US_PAGE_URL}
              data-click={CLICK_NAMES.HIDDEN_HEADER_ITEM}
            >
              <li className={itemClasses}>About Us</li>
            </Link>
            <Link
              onClick={toggleMenu}
              to={CONTACT_US_PAGE_URL}
              data-click={CLICK_NAMES.HIDDEN_HEADER_ITEM}
            >
              <li className={itemClasses}>Contact Us</li>
            </Link>
            {/* <Link
              onClick={toggleMenu}
              to={NEWSLETTERS_PAGE_URL}
              data-click={CLICK_NAMES.HIDDEN_HEADER_ITEM}
            >
              <li className={itemClasses}>Newsletters</li>
            </Link> */}
            <Link
              onClick={toggleMenu}
              to={REGISTER_PAGE_URL}
              data-click={CLICK_NAMES.HIDDEN_HEADER_ITEM}
            >
              <li className={itemClasses}>Register</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export { BurgerMenu };
