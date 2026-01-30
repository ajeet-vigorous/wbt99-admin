import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const CasinoShowPlusMinusReport = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/casinoshowplusminusreport`}/>
    <Route path={`${match.url}/casino-show-plus-minus-report/:date?/:eventArray?/:userType?/:userId?`} component={asyncComponent(() => import('./ShowReport'))}/>

  </Switch>
);

export default CasinoShowPlusMinusReport;
