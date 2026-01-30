import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";


const DataEntry = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/autoComplete`}/>
    <Route path={`${match.url}/autoComplete`} component={asyncComponent(() => import('./AutoComplete/'))}/>
    <Route path={`${match.url}/checkbox`} component={asyncComponent(() => import('./Checkbox/'))}/>
    <Route path={`${match.url}/cascader-:userType?/:priority?`} component={asyncComponent(() => import('./Cascader/'))}/>
  </Switch>
);

export default DataEntry;
