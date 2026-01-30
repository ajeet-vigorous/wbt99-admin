import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const general = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/button`}/>
    <Route path={`${match.url}/button-:userType?/:userId?/:userPriority?`} component={asyncComponent(() => import('./Button/'))}/>
  </Switch>
);

export default general;
