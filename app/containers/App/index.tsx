/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import map from 'lodash-es/map';
import { ThemeProvider } from 'styled-components';
import { colors } from '@app/themes';
import { HEADER_HEIGHT, MIN_SIDEBAR_WIDTH } from '@app/utils/constants';
import { For, ProtectedRoute } from '@app/components';
import { routeConfig } from '@app/routeConfig';
import { Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoggedIn, selectUserData } from './selector';
import { isEmpty } from 'lodash-es';
const theme = {
  fg: colors.primary,
  bg: colors.secondaryText,
  headerHeight: HEADER_HEIGHT,
  sidebarWidth: MIN_SIDEBAR_WIDTH
};

export function App({ isLoggedIn }: any) {
  return (
    <ThemeProvider theme={theme}>
      <For
        ParentComponent={(props) => <Switch {...props} />}
        of={map(Object.keys(routeConfig))}
        renderItem={(routeKey, index) => {
          const Component = routeConfig[routeKey].component;
          return (
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              exact={routeConfig[routeKey].exact}
              key={index}
              path={routeConfig[routeKey].route}
              render={(props) => {
                const updatedProps = {
                  ...props,
                  ...routeConfig[routeKey].props
                };
                return <Component {...updatedProps} />;
              }}
            />
          );
        }}
      />
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  userData: selectUserData(),
  isLoggedIn: selectIsUserLoggedIn()
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, withRouter)(App);
