import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const MatchDetailPage = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/matchviewdetail`}/>
    <Route path={`${match.url}/match-view-details/:marketId/:eventId?`} component={asyncComponent(() => import('./ViewMatch'))}/>
  </Switch>
);

export default MatchDetailPage;