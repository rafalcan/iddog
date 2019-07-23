import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from "components/Menu";
import SignUp from "pages/SignUp";
import Feed from "pages/Feed";
import Picture from "pages/Picture";
import NotFound from "pages/NotFound";

const Routes = () => (
  <div className="routes">
    <Menu />
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/feed" component={Feed} />
      <Route path="/picture" component={Picture} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
