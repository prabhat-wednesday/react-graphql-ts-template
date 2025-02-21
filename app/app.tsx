/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// Import all the third party stuff
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import history from '@utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from '@containers/App';

// Import Language Provider
import LanguageProvider from '@containers/LanguageProvider';
import ErrorBoundary from '@components/ErrorBoundary';
import ScrollToTop from '@components/ScrollToTop';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import i18n messages
import { translationMessages } from './i18n';
import { Router } from 'react-router-dom';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState);
const MOUNT_NODE = document.getElementById('app');
let root: Root;
const render = (messages: typeof translationMessages) => {
  root = createRoot(MOUNT_NODE as HTMLElement);
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LanguageProvider messages={messages}>
            <Router history={history}>
              <ScrollToTop>
                <App />
              </ScrollToTop>
            </Router>
          </LanguageProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    root.unmount();
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('@lcdp/offline-plugin/runtime').install({
    onUpdated: () => {
      // Reload the webpage to load into the new version
      window.location.reload();
    }
  }); // eslint-disable-line global-require
}
