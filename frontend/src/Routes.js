import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'providers/Auth';
import Menu from "components/Menu";
import SignUp from "pages/SignUp";
import Feed from "pages/Feed";
import Picture from "pages/Picture";
import NotFound from "pages/NotFound";

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={
          props => isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    )}
  </AuthConsumer>
);

const Routes = () => (
  <div className="routes">
    <AuthConsumer>
      {({ isAuthenticated }) => (
        isAuthenticated() ? <Menu /> : null
      )}
    </AuthConsumer>
    <Switch>
      <PublicRoute exact path="/" component={SignUp} />
      <PrivateRoute path="/feed" component={Feed} />
      <PrivateRoute path="/picture" component={Picture} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
