import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Completed = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/completedbets`}/>
    <Route path={`${match.url}/completedbets/:marketId?`} component={asyncComponent(() => import('./CompletedBet'))}/>
  </Switch>
);

export default Completed;