import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const ShowPlusMinusReport = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/showplusminusreport`}/>
    <Route path={`${match.url}/show-plus-minus-report/:marketId?/:matchName?`} component={asyncComponent(() => import('./ShowReport'))}/>

  </Switch>
);

export default ShowPlusMinusReport;
