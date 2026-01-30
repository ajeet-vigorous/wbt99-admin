import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Statement = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/transaction`}/>
    <Route path={`${match.url}/transaction/:userId?`} component={asyncComponent(() => import('./Transaction/'))}/>
    <Route path={`${match.url}/account-operations/:userId?`} component={asyncComponent(() => import('./Operations/'))}/>
  </Switch>
);

export default Statement;