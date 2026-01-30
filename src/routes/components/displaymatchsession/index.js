import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const MatchSessionBets = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/matchsessionbet`}/>
    <Route path={`${match.url}/match-sessionbet/:marketId?`} component={asyncComponent(() => import('./MatchSession/'))}/>
  </Switch>
);

export default MatchSessionBets;
