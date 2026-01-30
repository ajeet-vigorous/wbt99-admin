import React from "react";
import { Route, Switch } from "react-router-dom";
import DataDisplay from "./dataDisplay";
import DataEntry from "./dataEntry";
import InplayCasino from "./casino";
import Feedback from "./feedback";
import Navigation from "./navigation";
import Others from "./others";
import General from "./general";
import Statement from "./statement";
import Rejected from "./rejected";
import Completed from "./completed";
import PlusMinusReport from "./plusminusreport";
import ShowPlusMinusReport from "./showplusminusreport";
import MatchListBets from "./matchbet";
import Account from "./account";
import MatchSessionBets from "./displaymatchsession";
import PlusMinus from "./plusminus";
import PartnershipLedger from "./partnership";
import AgentPlusMinus from "./agent";
import MatchPlusMinus from "./matchplusminus";
import Edit from "./edit";
import Rules from "./rules";
import Event from "./event";
import CaseTransections from "./cash";
import UserLayerDetails from "./details";
import MatchDetailPage from "./matchDetail";
import ShowBetsList from "./showBets";
import LenaDenaDeleted from "./lenedene";
// import CommLenaDenaHistoryList from "./commlenadena";
import CasinoShowPlusMinusReport from "./casinoshowplusminusreport";
import SessionBetList from "./sessionBetList";
import USERSEARCH from "./searchUser";
import MatkaInplay from "./Matka";
import Bets from "./bets";



const Components = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/dataDisplay`} component={DataDisplay}/>
    <Route path={`${match.url}/dataEntry`} component={DataEntry}/>
    <Route path={`${match.url}/casino`} component={InplayCasino}/>
    <Route path={`${match.url}/matka`} component={MatkaInplay}/>
    <Route path={`${match.url}/feedback`} component={Feedback}/>
    <Route path={`${match.url}/general`} component={General}/>
    <Route path={`${match.url}/navigation`} component={Navigation}/>
    <Route path={`${match.url}/others`} component={Others}/>
    <Route path={`${match.url}/statement`} component={Statement}/>
    <Route path={`${match.url}/rejected`} component={Rejected}/>
    <Route path={`${match.url}/completed`} component={Completed}/>
    <Route path={`${match.url}/plusminusreport`} component={PlusMinusReport}/>
    <Route path={`${match.url}/showplusminusreport`} component={ShowPlusMinusReport}/>
    <Route path={`${match.url}/matchbet`} component={MatchListBets}/>
    <Route path={`${match.url}/account`} component={Account}/>
    <Route path={`${match.url}/matchsessionbet`} component={MatchSessionBets}/>
    <Route path={`${match.url}/plusminus`} component={PlusMinus}/>
    <Route path={`${match.url}/partnership`} component={PartnershipLedger}/>
    <Route path={`${match.url}/agent`} component={AgentPlusMinus}/>
    <Route path={`${match.url}/matchplusminus`} component={MatchPlusMinus}/>
    <Route path={`${match.url}/edit`} component={Edit}/>
    <Route path={`${match.url}/lenedena`} component={LenaDenaDeleted}/>
    <Route path={`${match.url}/rules`} component={Rules}/>
    <Route path={`${match.url}/casinoshowplusminusreport`} component={CasinoShowPlusMinusReport}/>
    <Route path={`${match.url}/search`} component={USERSEARCH}/>
    {/* <Route path={`${match.url}/dataDisplay`} component={DataDisplay} /> */}
    {/* <Route path={`${match.url}/dataEntry`} component={DataEntry} /> */}
    {/* <Route path={`${match.url}/feedback`} component={Feedback} /> */}
    {/* <Route path={`${match.url}/general`} component={General} /> */}
    {/* <Route path={`${match.url}/navigation`} component={Navigation} /> */}
    {/* <Route path={`${match.url}/others`} component={Others} />
    <Route path={`${match.url}/statement`} component={Statement} />
    <Route path={`${match.url}/rejected`} component={Rejected} />
    <Route path={`${match.url}/completed`} component={Completed} /> */}
    {/* <Route path={`${match.url}/plusminusreport`} component={PlusMinusReport} />
    <Route path={`${match.url}/showplusminusreport`} component={ShowPlusMinusReport} /> */}
    {/* <Route path={`${match.url}/matchbet`} component={MatchListBets} />
    <Route path={`${match.url}/account`} component={Account} /> */}
    {/* <Route path={`${match.url}/plusminus`} component={PlusMinus} /> */}
 
    <Route path={`${match.url}/event`} component={Event} />
    <Route path={`${match.url}/case`} component={CaseTransections} />
    <Route path={`${match.url}/details`} component={UserLayerDetails} />
    <Route path={`${match.url}/matchviewdetail`} component={MatchDetailPage} />
    <Route path={`${match.url}/showBetsList`} component={ShowBetsList} />
    {/* <Route path={`${match.url}/commlenadena`} component={CommLenaDenaHistoryList} /> */}
    <Route path={`${match.url}/displaysession`} component={SessionBetList} />
    <Route path={`${match.url}/bets`} component={Bets} />

    
   
  </Switch>
);

export default Components;
