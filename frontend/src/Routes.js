import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthConsumer } from 'providers/Auth';
import Menu from 'components/Menu';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import SignUp from 'pages/SignUp';
import Feed from 'pages/Feed';
import Picture from 'pages/Picture';
import NotFound from 'pages/NotFound';

class Routes extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;

    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    if (!isModal && location.state && location.state.modal) {
      location.state.modal = false;
    }

    return (
      <div className="routes">
        <AuthConsumer>
          {({ isAuthenticated }) => (
            isAuthenticated() && <Menu />
          )}
        </AuthConsumer>
        <Switch location={isModal ? this.previousLocation : location}>
          <PublicRoute exact path="/" component={SignUp} />
          <PrivateRoute path="/feed" component={Feed} />
          <PrivateRoute path="/picture" component={Picture} location={location} />
          <Route path="*" component={NotFound} />
        </Switch>
        {isModal && <PrivateRoute path="/picture" component={Picture} />}
      </div>
    );
  }
}

export default withRouter(Routes);
