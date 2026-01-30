import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const Components = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/matchplusminus`}/>
    <Route path={`${match.url}/plus-minus-report/:marketId?/:matchName?/:userId?/:userType?`} component={asyncComponent(() => import('./Limit/'))}/>

  </Switch>
);

export default Components;
