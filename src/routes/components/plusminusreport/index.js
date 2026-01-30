import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const PlusMinusReport = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/plusminusreport`}/>
    <Route path={`${match.url}/plus-minus-report/:marketId?/:matchName?`} component={asyncComponent(() => import('./Limit'))}/>

  </Switch>
);

export default PlusMinusReport;
