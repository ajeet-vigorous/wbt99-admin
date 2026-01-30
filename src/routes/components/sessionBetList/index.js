import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const SessionBetList = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/displaysessionbet`}/>
    <Route path={`${match.url}/displaysessionbet/:marketId?`} component={asyncComponent(() => import('./SessionBetList'))}/>
  </Switch>
);

export default SessionBetList;