import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const CommLenaDenaHistoryList = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/commlenadena`}/>
    <Route path={`${match.url}/comm-lenadena-history/:userId?`} component={asyncComponent(() => import('./CommLenaDenaHistory/'))}/>

  </Switch>
);

export default CommLenaDenaHistoryList;
