import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const MatkaInplay = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/matka`}/>
    <Route path={`${match.url}/inplay-matka`} component={asyncComponent(() => import('./InplayMatka/'))}/>
    <Route path={`${match.url}/view-matka/:eventIdMatka?/:matkaDate?`} component={asyncComponent(() => import('./MatkaView/'))}/>
    <Route path={`${match.url}/view-matka-details/:eventIdMatka?/:matkaDate?`} component={asyncComponent(() => import('./MatkaViewDetails/'))}/>
    <Route path={`${match.url}/matkaviewdetails/:eventId?/:date?`} component={asyncComponent(() => import('./MatkaDetails/'))}/>
  </Switch>
);

export default MatkaInplay;
