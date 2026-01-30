import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Feedback = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/alert`}/>
    <Route path={`${match.url}/alert/:userId?`} component={asyncComponent(() => import('./Alert/'))}/>
    <Route path={`${match.url}/modal`} component={asyncComponent(() => import('./Modal/'))}/>
  </Switch>
);

export default Feedback;
