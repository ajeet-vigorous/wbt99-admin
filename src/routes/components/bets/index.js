import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Bets = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/bets`}/>
    <Route path={`${match.url}/bets`} component={asyncComponent(() => import('./BetsManage'))}/>
  </Switch>
);

export default Bets;
