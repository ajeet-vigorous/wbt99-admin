import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const Components = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/plusminus`}/>
    <Route path={`${match.url}/limitplusminus/:userType?/:userId?/:userPriority?`} component={asyncComponent(() => import('./Limit/'))}/>

  </Switch>
);

export default Components;
