import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const USERSEARCH = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/search`}/>
    <Route path={`${match.url}/searchUser`} component={asyncComponent(() => import('./UserSearch/'))}/>
  </Switch>
);

export default USERSEARCH;