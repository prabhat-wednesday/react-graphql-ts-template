/**
 *
 * ProtectedRoute
 *
 */

import React, { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import routeConstants from '@utils/routeConstants';

interface ProtectedRouteProps {
  render: ComponentType<RouteComponentProps>;
  isLoggedIn: boolean;
  handleLogout?: () => void;
  path: string;
  exact: boolean;
}

const ProtectedRoute = ({ render: Component, isLoggedIn, handleLogout = () => {}, ...rest }: ProtectedRouteProps) => {
  const isUnprotectedRoute =
    Object.keys(routeConstants)
      .filter((key) => !routeConstants[key].isProtected)
      .map((key) => routeConstants[key].route)
      .includes(rest.path) && rest.exact;

  function handleRedirection(renderProps: RouteComponentProps) {
    let to;
    if (!isLoggedIn) {
      // user is not logged in
      if (!isUnprotectedRoute) {
        to = routeConstants.login.route;
        handleLogout();
      } else {
        // not logged in and trying to access an unprotected route so don't redirect
        return <Component {...renderProps} />;
      }
    } else {
      // user is logged in
      if (isUnprotectedRoute) {
        to = routeConstants.itune.route;
      } else {
        // logged in and accessing a protected route
        return <Component {...renderProps} />;
      }
    }
    return <Redirect to={to} />;
  }
  return <Route {...rest} render={handleRedirection} />;
};

ProtectedRoute.propTypes = {
  render: PropTypes.any,
  isLoggedIn: PropTypes.bool,
  isUserVerified: PropTypes.bool,
  handleLogout: PropTypes.func
};

export default ProtectedRoute;
