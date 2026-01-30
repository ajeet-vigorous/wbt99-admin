import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

// new chnages
const Account = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/create-account`}/>
    <Route path={`${match.url}/create-account/:userType?/:userId?/:userPriority?`} component={asyncComponent(() => import('./CreateAccount/'))}/>
  </Switch>
);

export default Account;
