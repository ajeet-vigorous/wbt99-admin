import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const navigation = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/affix`}/>
    <Route path={`${match.url}/affix`} component={asyncComponent(() => import('./Affix/'))}/>
    <Route path={`${match.url}/breadcrumb`} component={asyncComponent(() => import('./Breadcrumb/'))}/>
    <Route path={`${match.url}/dropdown`} component={asyncComponent(() => import('./Dropdown/'))}/>
    <Route path={`${match.url}/Menu`} component={asyncComponent(() => import('./Menu/'))}/>
    <Route path={`${match.url}/Demo/:_id?`} component={asyncComponent(() => import('./Demo/'))}/>
    <Route path={`${match.url}/internetionalcasino-bet/:_id?/:fromDate?&:toDate?`} component={asyncComponent(() => import('./internetionalCasinoBet/'))}/>
  </Switch>
);

export default navigation;
