import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const MatchListBets = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/displaymatchbets`}/>
    <Route path={`${match.url}/displaymatchbets/:marketId?`} component={asyncComponent(() => import('./DisplayMatchBets'))}/>
  </Switch>
);

export default MatchListBets;