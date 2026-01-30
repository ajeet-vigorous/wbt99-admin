import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const CaseTransections = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/case-transection-details`}/>
    <Route path={`${match.url}/case-transection-details`} component={asyncComponent(() => import('./Transection'))}/>
  </Switch>
);

export default CaseTransections;