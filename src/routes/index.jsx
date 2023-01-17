import {
  Route,
  Navigate,
  Routes as Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import { store } from 'store';
import { useEffect } from 'react';
import { AppLayout } from 'layouts';
import { ScrollToTop } from 'routes/scroll-to-top';
import { toggleDarkMode } from 'store/app-data/app-slice';
import { DARK_MODE_STORAGE_KEY } from 'constants/local-storage-keys';

// PAGES
import {
  HOME_URL,
  NOT_FOUNT_URL,
  ABOUT_US_PAGE_URL,
  THANK_YOU_PAGE_URL,
  CONTACT_US_PAGE_URL,
  NEWSLETTERS_PAGE_URL,
  HIDDEN_ELEMENT_PAGE_URL,
  VISIBLE_ELEMENT_PAGE_URL
} from 'constants/app-routes';

import { HomePage } from 'pages';
import { NotFoundPage } from 'pages/404';
import { AboutUsPage } from 'pages/about-us';
import { ContactUsPage } from 'pages/contact-us';
import { NewslettersPage } from 'pages/newsletters';
import { HiddenElementPage } from 'pages/hidden-element';
import { VisibleElementPage } from 'pages/visible-element';
import { ThankYouPage } from 'pages/thank-you';

function Routes() {
  useEffect(() => {
    const hasDarkMode = !!localStorage.getItem(DARK_MODE_STORAGE_KEY);
    store.dispatch(toggleDarkMode(hasDarkMode));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Switch>
          <Route path={ABOUT_US_PAGE_URL} element={<AboutUsPage />} />
          <Route path={THANK_YOU_PAGE_URL} element={<ThankYouPage />} />
          <Route path={CONTACT_US_PAGE_URL} element={<ContactUsPage />} />
          <Route path={NEWSLETTERS_PAGE_URL} element={<NewslettersPage />} />
          <Route path={HIDDEN_ELEMENT_PAGE_URL} element={<HiddenElementPage />} />
          <Route path={VISIBLE_ELEMENT_PAGE_URL} element={<VisibleElementPage />} />

          <Route path={NOT_FOUNT_URL} element={<HomePage />} />
          <Route path={HOME_URL} element={<HomePage />} exact />
          <Route path="*" element={<Navigate to={NOT_FOUNT_URL} />} />
        </Switch>
      </AppLayout>
    </Router>
  );
}

export { Routes };
