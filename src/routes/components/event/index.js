import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Event = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/lader-details`}/>
    <Route path={`${match.url}/lader-details`} component={asyncComponent(() => import('./Ladger'))}/>
  </Switch>
);

export default Event;