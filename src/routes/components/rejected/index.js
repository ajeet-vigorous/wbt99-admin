import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Rejected = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/cancelBets`}/>
    <Route path={`${match.url}/cancelBets/:marketId?`} component={asyncComponent(() => import('./CancelBets'))}/>
    <Route path={`${match.url}/cancelmatchoddsBets/:marketId?`} component={asyncComponent(() => import('./CancelBetsMatchOdds'))}/>
  </Switch>
);

export default Rejected;