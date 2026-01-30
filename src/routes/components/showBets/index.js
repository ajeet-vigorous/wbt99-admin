import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const ShowBetsList = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/details-show-bet-list`}/>
    <Route path={`${match.url}/details-show-bet-list/:marketId/:userId`} component={asyncComponent(() => import('./ShowBetsList'))}/>
  </Switch>
);

export default ShowBetsList;
