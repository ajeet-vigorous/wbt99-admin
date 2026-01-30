import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const InplayCasino = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/casino`}/>
    <Route path={`${match.url}/inplaycasino`} component={asyncComponent(() => import('./InplayCasino/'))}/>
    <Route path={`${match.url}/inplaycasinodetails/:name?/:id?/:payloadDate?`} component={asyncComponent(() => import('./InplayCasinoDetails/'))}/>
    <Route path={`${match.url}/casinoviewdetails/:eventId?/:date?/:userId?/:userType?`} component={asyncComponent(() => import('./ViewCasino/'))}/>
    <Route path={`${match.url}/casinoinplayview/:eventId?/:gameName?`} component={asyncComponent(() => import('./CasinoViewInplay/'))}/>
    <Route path={`${match.url}/casinobets/:gameId?`} component={asyncComponent(() => import('./CasinoBets/'))}/>
    <Route path={`${match.url}/completedcasino`} component={asyncComponent(() => import('./CompletedCasino/'))}/>
    <Route path={`${match.url}/plusminuscasinodeatils-data/:date?`} component={asyncComponent(() => import('./PlusminusCasinoDetails/'))}/>
    <Route path={`${match.url}/internetionalcasinodeatils/:fromDate?&:toDate?`} component={asyncComponent(() => import('./InternetionalCasino/'))}/>

  </Switch>
);

export default InplayCasino;
