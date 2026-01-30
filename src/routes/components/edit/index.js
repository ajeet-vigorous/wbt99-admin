import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Edit = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/edit-account`}/>
    <Route path={`${match.url}/edit-account/:userId?`} component={asyncComponent(() => import('./EditAccount'))}/>
  </Switch>
);

export default Edit;
