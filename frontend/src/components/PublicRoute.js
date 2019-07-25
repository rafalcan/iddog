import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'providers/Auth';

const PublicRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={
          props => !isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/feed", state: { from: props.location } }} />
          )
        }
      />
    )}
  </AuthConsumer>
);

export default PublicRoute;
