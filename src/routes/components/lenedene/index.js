import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const LenaDenaDeleted = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/lenedena`}/>
    <Route path={`${match.url}/deleted-lenedena/:userId?/:userType`} component={asyncComponent(() => import('./DeletedLenaDena/'))}/>
  </Switch>
);

export default LenaDenaDeleted;
