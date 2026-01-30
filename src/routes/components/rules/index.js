import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Rules = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/rules-regulation`}/>
    <Route path={`${match.url}/rules-regulation`} component={asyncComponent(() => import('./RulesRegulation'))}/>
  </Switch>
);

export default Rules;
