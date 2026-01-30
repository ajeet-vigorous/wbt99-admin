import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const DataDisplay = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/avatar`}/>
    <Route path={`${match.url}/avatar-:usertype?/:userName?/:name?/:userIds?`} component={asyncComponent(() => import('./Avatar/'))}/>
    <Route path={`${match.url}/tabs`} component={asyncComponent(() => import('./Tabs/'))}/>
  </Switch>
);

export default DataDisplay;
