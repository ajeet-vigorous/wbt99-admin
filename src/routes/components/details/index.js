import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const UserLayerDetails = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/client-details`}/>
    <Route path={`${match.url}/client-details`} component={asyncComponent(() => import('./UserLayer'))}/>
  </Switch>
);

export default UserLayerDetails;