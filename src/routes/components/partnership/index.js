import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const Components = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/partnership`}/>
    <Route path={`${match.url}/partnership-list/:priority`} component={asyncComponent(() => import('./PartnershipLedger/'))}/>

  </Switch>
);

export default Components;
