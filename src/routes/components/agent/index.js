import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const Components = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/agent`}/>
    <Route path={`${match.url}/agent-list/:marketId?/:matchName?`} component={asyncComponent(() => import('./Limit/'))}/>

  </Switch>
);

export default Components;
