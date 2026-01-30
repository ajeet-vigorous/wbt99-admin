import {
  MATCH_LIST_REQUEST,
  MATCH_LIST_SUCCESS,
  MATCH_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  COIN_UPDATE_REQUEST,
  COIN_UPDATE_SUCCESS,
  COIN_UPDATE_FAILURE,

  USER_LEDGER_CLEAR,

  COMPLETE_SPORT_LIST_REQUEST,
  COMPLETE_SPORT_LIST_SUCCESS,
  COMPLETE_SPORT_LIST_FAILURE,

  INPLAY_ODD_POSITION_REQUEST,
  INPLAY_ODD_POSITION_SUCCESS,
  INPLAY_ODD_POSITION_FAILURE,


  CASINO_DIAMOND_BET_LIST_REQUEST,
  CASINO_DIAMOND_BET_LIST_SUCCESS,
  CASINO_DIAMOND_BET_LIST_FAILURE,

  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  USER_PROFITLOSS_REQUEST,
  USER_PROFITLOSS_SUCCESS,
  USER_PROFITLOSS_FAILURE,

  MATCH_DETAIL_REQUEST,
  MATCH_DETAIL_SUCCESS,
  MATCH_DETAIL_FAILURE,

  USER_LEDGER_LIST_REQUEST,
  USER_LEDGER_LIST_SUCCESS,
  USER_LEDGER_LIST_FAILURE,


  USER_LEDGER_CREDIT_DEBIT_REQUEST,
  USER_LEDGER_CREDIT_DEBIT_SUCCESS,
  USER_LEDGER_CREDIT_DEBIT_FAILURE,


  USER_LENA_DENA_REQUEST,
  USER_LENA_DENA_SUCCESS,
  USER_LENA_DENA_FAILURE,

  PlusMinusByMarketIdByUserWise_LIST_REQUEST,
  PlusMinusByMarketIdByUserWise_LIST_SUCCESS,
  PlusMinusByMarketIdByUserWise_LIST_FAILURE,

  FETCH_DIAMOND_CASINO_REPORT_REQUEST,
  FETCH_DIAMOND_CASINO_REPORT_SUCCESS,
  FETCH_DIAMOND_CASINO_REPORT_FAILURE,


  FETCH_SHARE_DETAILS_REQUEST,
  FETCH_SHARE_DETAILS_SUCCESS,
  FETCH_SHARE_DETAILS_FAILURE,

  USER_STATEMENT_REQUEST,
  USER_STATEMENT_SUCCESS,
  USER_STATEMENT_FAILURE,

  USER_ACTIVITY_REQUEST,
  USER_ACTIVITY_SUCCESS,
  USER_ACTIVITY_FAILURE,

  USER_LOGIN_ACTIVITY_REQUEST,
  USER_LOGIN_ACTIVITY_SUCCESS,
  USER_LOGIN_ACTIVITY_FAILURE,

  SPORTS_BET_LIST_REQUEST,
  SPORTS_BET_LIST_SUCCESS,
  SPORTS_BET_LIST_FAILURE,

  GET_PLUS_MINUS_BY_MARKET_ID_REQUEST,
  GET_PLUS_MINUS_BY_MARKET_ID_SUCCESS,
  GET_PLUS_MINUS_BY_MARKET_ID_FAILURE,

  CLIENT_LIST_BY_MARKET_ID_REQUEST,
  CLIENT_LIST_BY_MARKET_ID_SUCCESS,
  CLIENT_LIST_BY_MARKET_ID_FAILURE,


  USER_COMMISSION_REPORT_REQUEST,
  USER_COMMISSION_REPORT_SUCCESS,
  USER_COMMISSION_REPORT_FAILURE,

  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAILURE,


  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE,
  USER_DETAIL_CLEAR,

  USER_BALANCE_SUCCESS,
  USER_BALANCE_REQUEST,
  USER_BALANCE_FAILURE,
  USER_SEARCH_CLIEAR,

  CASINO_ROUND_WISE_SUCCESS,
  CASINO_ROUND_WISE_REQUEST,
  CASINO_ROUND_WISE_FAILURE,


  CASINO_DAY_WISE_REQUEST,
  CASINO_DAY_WISE_SUCCESS,
  CASINO_DAY_WISE_FAILURE,

  SECURE_CODE_REQUEST,
  SECURE_CODE_SUCCESS,
  SECURE_CODE_FAILURE,


  DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS,
  DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE,
  COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  COMPLATED_FANCY_BY_MARKET_ID_SUCCESS,
  COMPLATED_FANCY_BY_MARKET_ID_FAILURE,
  SESSION_POSITION_BY_SELECTION_ID_SUCCESS,
  SESSION_POSITION_BY_SELECTION_ID_REQUEST,
  SESSION_POSITION_BY_SELECTION_ID_FAILURE,
  ODDS_POSSITION_REQUEST,
  ODDS_POSSITION_SUCCESS,
  ODDS_POSSITION_FAILURE,

  DECISION_RESET_COMM_REQUEST,
  DECISION_RESET_COMM_SUCCESS,
  DECISION_RESET_COMM_FAILURE,

  DECISION_RESET_COMM_LIST_REQUEST,
  DECISION_RESET_COMM_LIST_SUCCESS,
  DECISION_RESET_COMM_LIST_FAILURE,

  GET_PLUS_MINUS_CASINO_DETAIL_REQUEST,
  GET_PLUS_MINUS_CASINO_DETAIL_SUCCESS,
  GET_PLUS_MINUS_CASINO_DETAIL_FAILURE,

  CASINO_PROFIT_LOSS_REQUEST,
  CASINO_PROFIT_LOSS_SUCCESS,
  CASINO_PROFIT_LOSS_FAILURE,


  CASINO_REPORT_BY_USER_REQUEST,
  CASINO_REPORT_BY_USER_SUCCESS,
  CASINO_REPORT_BY_USER_FAILURE,

  GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS,
  GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE,

  USER_POSITION_BY_MARKETID_REQUEST,
  USER_POSITION_BY_MARKETID_SUCCESS,
  USER_POSITION_BY_MARKETID_FAILURE,
  USER_DOMAIN_LIST_REQUEST,
  USER_DOMAIN_LIST_SUCCESS,
  USER_DOMAIN_LIST_FAILURE,
  USER_SEARCH_CLEAN,
  GET_MATKA_LIST_REQUEST,
  GET_MATKA_LIST_SUCCESS,
  GET_MATKA_LIST_FAILURE,
  MATKA_BET_LIST_REQUEST,
  MATKA_BET_LIST_SUCCESS,
  MATKA_BET_LIST_FAILURE,
  SPORTS_BET_LIST_CLEAN,
  DAY_WISE_MATKA_REPORT_REQUEST,
  DAY_WISE_MATKA_REPORT_SUCCESS,
  DAY_WISE_MATKA_REPORT_FAILURE,
  COUNT_MATKA_BETS_REQUEST,
  COUNT_MATKA_BETS_SUCCESS,
  COUNT_MATKA_BETS_FAILURE,
  MATKA_PROFIT_LOSS_REQUEST,
  MATKA_PROFIT_LOSS_SUCCESS,
  MATKA_PROFIT_LOSS_FAILURE,
  MATKA_COIN_UPDATE_REQUEST,
  MATKA_COIN_UPDATE_SUCCESS,
  MATKA_COIN_UPDATE_FAILURE,
  
  
} from "../../constants/ActionTypes";

export const getMatchList = (payload) => ({

  type: MATCH_LIST_REQUEST,
  payload: payload,
});

export const getMatchListSuccess = (payload) => (
  {
    type: MATCH_LIST_SUCCESS,
    payload: payload.data,
  });

export const getMatchListFailure = (error) => ({
  type: MATCH_LIST_FAILURE,
  payload: error,
});

// user details 

export const getUserDetails = (payload) => ({
  type: USER_DETAIL_REQUEST,
  payload,
});

export const getUserDetailsSuccess = (payload) => ({
  type: USER_DETAIL_SUCCESS,
  payload,
});

export const getUserDetailsFailure = (error) => ({
  type: USER_DETAIL_FAILURE,
  payload: error,
});

export const userDetailsClear = (payload) => ({
  type: USER_DETAIL_CLEAR,
  payload
});

//user list ...

export const getUserList = (payload) => ({
  type: USER_LIST_REQUEST,
  payload,
});

export const getUserListSuccess = (payload) => ({
  type: USER_LIST_SUCCESS,
  payload: payload,
});

export const getUserListFailure = (error) => ({
  type: USER_LIST_FAILURE,
  payload: error,
});



//user lena dena 


export const getUserLenaDena = (payload) => ({
  type: USER_LENA_DENA_REQUEST,
  payload,
});

export const getUserLenaDenaSuccess = (payload) => ({
  type: USER_LENA_DENA_SUCCESS,
  payload,
});

export const getUserLenaDenaFailure = (error) => ({
  type: USER_LENA_DENA_FAILURE,
  payload: error,
});



export const userUpdate = (payload) => ({

  type: USER_UPDATE_REQUEST,
  payload: payload,
});

export const userUpdateSuccess = (payload) => ({
  type: USER_UPDATE_SUCCESS,
  payload,
});

export const userUpdateFailure = (error) => ({
  type: USER_UPDATE_FAILURE,
  payload: error,
});

//.............
export const coinUpdate = (payload) => ({

  type: COIN_UPDATE_REQUEST,
  payload: payload,
});

export const coinUpdateSuccess = (payload) => ({
  type: COIN_UPDATE_SUCCESS,
  payload,
});

export const coinUpdateFailure = (error) => ({
  type: COIN_UPDATE_FAILURE,
  payload: error,
});
//............Complete Sport List
export const completeSportList = (payload) => ({

  type: COMPLETE_SPORT_LIST_REQUEST,
  payload: payload,
});

export const completeSportListSuccess = (payload) => (
  {
    type: COMPLETE_SPORT_LIST_SUCCESS,
    payload,
  });

export const completeSportListFailure = (error) => ({
  type: COMPLETE_SPORT_LIST_FAILURE,
  payload: error,
});

//.................Inplay Odds Possition
export const inplayOddPosition = (payload) => ({

  type: INPLAY_ODD_POSITION_REQUEST,
  payload: payload,
});

export const inplayOddPositionSuccess = (payload) => (
  {
    type: INPLAY_ODD_POSITION_SUCCESS,
    payload,
  });

export const inplayOddPositionFailure = (error) => ({
  type: INPLAY_ODD_POSITION_FAILURE,
  payload: error,
});


//............Casino Daimond Bet List
export const casinoDiamondBetList = (payload) => ({

  type: CASINO_DIAMOND_BET_LIST_REQUEST,
  payload: payload,
});

export const casinoDiamondBetListSuccess = (payload) => ({

  type: CASINO_DIAMOND_BET_LIST_SUCCESS,
  payload,
});

export const casinoDiamondBetListFailure = (error) => ({
  type: CASINO_DIAMOND_BET_LIST_FAILURE,
  payload: error,
});

//. cetae user
export const userCreate = (payload) => ({
  type: USER_CREATE_REQUEST,
  payload,
});

export const userCreateSuccess = (payload) => (
  {
    type: USER_CREATE_SUCCESS,
    payload,
  });

export const userCreateFailure = (error) => ({
  type: USER_CREATE_FAILURE,
  payload: error,
});

//........user profit loss
export const userProfitLoss = (payload) => ({
  type: USER_PROFITLOSS_REQUEST,
  payload,
});

export const userProfitLossSuccess = (payload) => ({
  type: USER_PROFITLOSS_SUCCESS,
  payload,
});

export const userProfitLossFailure = (error) => ({
  type: USER_PROFITLOSS_FAILURE,
  payload: error,
});
//...............user ladger list

export const userLedgerList = (payload) => ({
  type: USER_LEDGER_LIST_REQUEST,
  payload,
});

export const userLedgerListSuccess = (payload) => ({
  type: USER_LEDGER_LIST_SUCCESS,
  payload,
});

export const userLedgerListFailure = (error) => ({
  type: USER_LEDGER_LIST_FAILURE,
  payload: error,
});

// user LEDGER_CREDIT_DEBIT
export const userLedgerCreditDebit = (payload) => ({
  type: USER_LEDGER_CREDIT_DEBIT_REQUEST,
  payload,
});

export const userLedgerCreditDebitSuccess = (payload) => ({
  type: USER_LEDGER_CREDIT_DEBIT_SUCCESS,
  payload,
});

export const userLedgerCreditDebitFailure = (error) => ({
  type: USER_LEDGER_CREDIT_DEBIT_FAILURE,
  payload: error,
});

//....................getPlusMinusByMarketIdByUserWise


export const plusMinusByMarketIdByUserWiseList = (payload) => ({
  type: PlusMinusByMarketIdByUserWise_LIST_REQUEST,
  payload,
});

export const plusMinusByMarketIdByUserWiseListSuccess = (payload) => ({
  type: PlusMinusByMarketIdByUserWise_LIST_SUCCESS,
  payload,
});

export const plusMinusByMarketIdByUserWiseListFailure = (error) => ({
  type: PlusMinusByMarketIdByUserWise_LIST_FAILURE,
  payload: error,
});

// getPlusMinusByMarketId

export const getPlusMinusByMarketId = (payload) => ({
  type: GET_PLUS_MINUS_BY_MARKET_ID_REQUEST,
  payload,
});

export const getPlusMinusByMarketIdSuccess = (payload) => ({
  type: GET_PLUS_MINUS_BY_MARKET_ID_SUCCESS,
  payload,
});

export const getPlusMinusByMarketIdFailure = (error) => ({
  type: GET_PLUS_MINUS_BY_MARKET_ID_FAILURE,
  payload: error,
});

//...........................

export const getMatchDetail = (payload) => ({

  type: MATCH_DETAIL_REQUEST,
  payload,
});

export const getMatchDetailSuccess = (payload) => (
  {
    type: MATCH_DETAIL_SUCCESS,
    payload,
  });

export const getMatchDetailFailure = (error) => ({
  type: MATCH_DETAIL_FAILURE,
  payload: error,
});


export const userLedgerClear = (payload) => ({
  type: USER_LEDGER_CLEAR,
  payload
});


// DiamondCasinoReport...

export const getDiamondCasinoReport = (payload) => ({
  type: FETCH_DIAMOND_CASINO_REPORT_REQUEST,
  payload,
});

export const getDiamondCasinoReportSuccess = (payload) => ({
  type: FETCH_DIAMOND_CASINO_REPORT_SUCCESS,
  payload,
});

export const getDiamondCasinoReportFailure = (error) => ({
  type: FETCH_DIAMOND_CASINO_REPORT_FAILURE,
  payload: error,
});

//shareDetails

export const getShareDetails = (payload) => ({
  type: FETCH_SHARE_DETAILS_REQUEST,
  payload,
});

export const getShareDetailsSuccess = (payload) => ({
  type: FETCH_SHARE_DETAILS_SUCCESS,
  payload,
});

export const getShareDetailsFailure = (error) => ({
  type: FETCH_SHARE_DETAILS_FAILURE,
  payload: error,
});

// userStatement.........

export const getUserStatement = (payload) => ({
  type: USER_STATEMENT_REQUEST,
  payload,
});

export const getUserStatementSuccess = (payload) => ({
  type: USER_STATEMENT_SUCCESS,
  payload,
});

export const getUserStatementFailure = (error) => ({
  type: USER_STATEMENT_FAILURE,
  payload: error,
});

// userActivity..........

export const getuserActivity = (payload) => ({
  type: USER_ACTIVITY_REQUEST,
  payload,
});

export const getuserActivitySuccess = (payload) => ({
  type: USER_ACTIVITY_SUCCESS,
  payload,
});

export const getuserActivityFailure = (error) => ({
  type: USER_ACTIVITY_FAILURE,
  payload: error,
});

// userLoginActivity

export const getUserLoginActivity = (payload) => ({
  type: USER_LOGIN_ACTIVITY_REQUEST,
  payload,
});

export const getUserLoginActivitySuccess = (payload) => ({
  type: USER_LOGIN_ACTIVITY_SUCCESS,
  payload,
});

export const getUserLoginActivityFailure = (error) => ({
  type: USER_LOGIN_ACTIVITY_FAILURE,
  payload: error,
});

// sportsBetsList 

export const getSportsBetsList = (payload) => ({
  type: SPORTS_BET_LIST_REQUEST,
  payload,
});

export const getSportsBetsListSuccess = (payload) => ({
  type: SPORTS_BET_LIST_SUCCESS,
  payload,
});

export const getSportsBetsListFailure = (error) => ({
  type: SPORTS_BET_LIST_FAILURE,
  payload: error,
});

// clientListByMarketId

export const getClientListByMarketId = (payload) => ({
  type: CLIENT_LIST_BY_MARKET_ID_REQUEST,
  payload,
});

export const getClientListByMarketIdSuccess = (payload) => ({
  type: CLIENT_LIST_BY_MARKET_ID_SUCCESS,
  payload,
});

export const getClientListByMarketIdFailure = (error) => ({
  type: CLIENT_LIST_BY_MARKET_ID_FAILURE,
  payload: error,
});


//userCommissionReport

export const getuserCommissionReport = (payload) => ({
  type: USER_COMMISSION_REPORT_REQUEST,
  payload,
});

export const userCommissionReportSuccess = (payload) => ({
  type: USER_COMMISSION_REPORT_SUCCESS,
  payload,
});

export const userCommissionReportFailure = (error) => ({
  type: USER_COMMISSION_REPORT_FAILURE,
  payload: error,
});

// USERsEARCH aPI dATAAAAAAAAAAAAAAAA

export const getuserSearchReport = (payload) => ({
  type: USER_SEARCH_REQUEST,
  payload,
});

export const getuserSearchSuccess = (payload) => ({
  type: USER_SEARCH_SUCCESS,
  payload,
});

export const getuserSearchFailure = (error) => ({
  type: USER_SEARCH_FAILURE,
  payload: error,
});


export const getuserSearchClear = (payload) => ({
  type: USER_SEARCH_CLIEAR,
  payload
});


//.......................user balance 
export const userBalance = (data) => ({
  type: USER_BALANCE_REQUEST,
  payload: data,
});

export const userBalanceSuccess = (balance) => ({
  type: USER_BALANCE_SUCCESS,
  payload: balance
});

export const userBalanceFailure = (error) => ({
  type: USER_BALANCE_FAILURE,
  payload: error,
});

//...........cASINO ROUND WISE DATA

export const casinoRoundWise = (data) => ({
  type: CASINO_ROUND_WISE_REQUEST,
  payload: data,
});

export const casinoRoundWiseSuccess = (payload) => ({
  type: CASINO_ROUND_WISE_SUCCESS,
  payload: payload
});

export const casinoRoundWiseFailure = (error) => ({
  type: CASINO_ROUND_WISE_FAILURE,
  payload: error,
});



// dayWiseCasinoReport
export const getCasinoDayWise = (data) => ({
  type: CASINO_DAY_WISE_REQUEST,
  payload: data,
});

export const casinoDayWiseSuccess = (payload) => ({
  type: CASINO_DAY_WISE_SUCCESS,
  payload
});

export const casinoDayWiseFailure = (error) => ({
  type: CASINO_DAY_WISE_FAILURE,
  payload: error,
});

// DOMAIN SETTING BAY DOMAIN NAME


export const domainSettingByDomain = (data) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  payload: data,
});

export const domainSettingByDomainSuccess = (payload) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS,
  payload
});

export const domainSettingByDomainFailure = (error) => ({
  type: DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE,
  payload: error,
});

// SECURE CODE 

export const secureCode = (data) => ({
  type: SECURE_CODE_REQUEST,
  payload: data,
});

export const secureCodeSuccess = (payload) => ({
  type: SECURE_CODE_SUCCESS,
  payload
});

export const secureCodeFailure = (error) => ({
  type: SECURE_CODE_FAILURE,
  payload: error,
});

//completedFancyByMarketId

export const getCompletedFancyByMarketId = (data) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  payload: data,
});

export const getCompletedFancyByMarketIdSuccess = (payload) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_SUCCESS,
  payload
});

export const getCompletedFancyByMarketIdFailure = (error) => ({
  type: COMPLATED_FANCY_BY_MARKET_ID_FAILURE,
  payload: error,
});

// getSessionPositionBySelectionId

export const getSessionPositionBySelectionId = (data) => ({
  type: SESSION_POSITION_BY_SELECTION_ID_REQUEST,
  payload: data,
});

export const getSessionPositionBySelectionIdSuccess = (payload) => ({
  type: SESSION_POSITION_BY_SELECTION_ID_SUCCESS,
  payload
});

export const getSessionPositionBySelectionIdFailure = (error) => ({
  type: SESSION_POSITION_BY_SELECTION_ID_FAILURE,
  payload: error,
});

// getOddsPosition


export const getOddsPosition = (data) => ({
  type: ODDS_POSSITION_REQUEST,
  payload: data,
});

export const getOddsPositionSuccess = (payload) => ({
  type: ODDS_POSSITION_SUCCESS,
  payload
});

export const getOddsPositionFailure = (error) => ({
  type: ODDS_POSSITION_FAILURE,
  payload: error,
});

// DECISION COMM RESET BUTTTON
export const decisionresetComm = (data) => ({
  type: DECISION_RESET_COMM_REQUEST,
  payload: data,
});

export const decisionresetCommSuccess = (payload) => ({
  type: DECISION_RESET_COMM_SUCCESS,
  payload
});

export const cleanSportsBetsList = (payload) => ({
  type: SPORTS_BET_LIST_CLEAN,
  payload,
});

export const decisionresetCommFailure = (error) => ({
  type: DECISION_RESET_COMM_FAILURE,
  payload: error,
});

// Desicion comm list

export const decisionresetCommList = (data) => ({
  type: DECISION_RESET_COMM_LIST_REQUEST,
  payload: data,
});

export const decisionresetCommListSuccess = (payload) => ({
  type: DECISION_RESET_COMM_LIST_SUCCESS,
  payload
});

export const decisionresetCommListFailure = (error) => ({
  type: DECISION_RESET_COMM_LIST_FAILURE,
  payload: error,
});


// get plusminuscasino details

export const getPlusMinusCasinoDetail = (data) => ({
  type: GET_PLUS_MINUS_CASINO_DETAIL_REQUEST,
  payload: data,
});

export const getPlusMinusCasinoDetailSuccess = (payload) => ({
  type: GET_PLUS_MINUS_CASINO_DETAIL_SUCCESS,
  payload
});

export const getPlusMinusCasinoDetailFailure = (error) => ({
  type: GET_PLUS_MINUS_CASINO_DETAIL_FAILURE,
  payload: error,
});

//CASINO PROFITLOSS

export const getProfitLossPos = (data) => ({
  type: CASINO_PROFIT_LOSS_REQUEST,
  payload: data,
});

export const getProfitLossPosSuccess = (payload) => ({
  type: CASINO_PROFIT_LOSS_SUCCESS,
  payload
});

export const getProfitLossPosFailure = (error) => ({
  type: CASINO_PROFIT_LOSS_FAILURE,
  payload: error,
});


//CASINO rEPORT bY USER

export const getcasinoReportByUser = (data) => ({
  type: CASINO_REPORT_BY_USER_REQUEST,
  payload: data,
});

export const getcasinoReportByUserSuccess = (payload) => ({
  type: CASINO_REPORT_BY_USER_SUCCESS,
  payload
});

export const getcasinoReportByUserFailure = (error) => ({
  type: CASINO_REPORT_BY_USER_FAILURE,
  payload: error,
});

// GET_DIAMOND_CASINO_BY_EVENT_ID

export const getDiamondCasinoByEventId = (data) => ({
  type: GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  payload: data,
});

export const getDiamondCasinoByEventIdSuccess = (payload) => ({
  type: GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS,
  payload
});

export const getDiamondCasinoByEventIdFailure = (error) => ({
  type: GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE,
  payload: error,
});

// USERPOSIITON BY MARKJET IFD

export const userPositionByMarketId = (data) => ({
  type: USER_POSITION_BY_MARKETID_REQUEST,
  payload: data,
});

export const userPositionByMarketIdSuccess = (payload) => ({
  type: USER_POSITION_BY_MARKETID_SUCCESS,
  payload
});

export const userPositionByMarketIdFailure = (error) => ({
  type: USER_POSITION_BY_MARKETID_FAILURE,
  payload: error,
});

// DOMAINlIST

export const userDominList = (data) => ({
  type: USER_DOMAIN_LIST_REQUEST,
  payload: data,
});

export const userDominListSuccess = (payload) => ({
  type: USER_DOMAIN_LIST_SUCCESS,
  payload
});

export const userDominListFailure = (error) => ({
  type: USER_DOMAIN_LIST_FAILURE,
  payload: error,
});

export const setuserEmpty = () => ({
  type: USER_SEARCH_CLEAN,
});



//MATKA LIST

export const getMatkaList = (payload) => ({
  type: GET_MATKA_LIST_REQUEST,
  payload,
});

export const getMatkaListSuccess = (payload) => ({
  type: GET_MATKA_LIST_SUCCESS,
  payload,
});

export const getMatkaListFailure = (error) => ({
  type: GET_MATKA_LIST_FAILURE,
  payload: error,
});




export const getMatkaBetList = (payload) => ({
  type: MATKA_BET_LIST_REQUEST,
  payload,
});

export const getMatkaBetListSuccess = (payload) => ({
  type: MATKA_BET_LIST_SUCCESS,
  payload,
});

export const getMatkaBetListFailure = (error) => ({
  type: MATKA_BET_LIST_FAILURE,
  payload: error,
});






export const getMatkaDayWise = (data) => ({
  type: DAY_WISE_MATKA_REPORT_REQUEST,
  payload: data,
});

export const matkaDayWiseSuccess = (payload) => ({
  type: DAY_WISE_MATKA_REPORT_SUCCESS,
  payload
});

export const matkaDayWiseFailure = (error) => ({
  type: DAY_WISE_MATKA_REPORT_FAILURE,
  payload: error,
});

// matka list 

export const getMatkaCountLists = (data) => ({
  type: COUNT_MATKA_BETS_REQUEST,
  payload: data,
});

export const matkaListCountSuccess = (payload) => ({
  type: COUNT_MATKA_BETS_SUCCESS,
  payload
});

export const matkaListCountFailure = (error) => ({
  type: COUNT_MATKA_BETS_FAILURE,
  payload: error,
});

// Matka pos list


export const getMatkaProfitLossPos = (data) => ({
  type: MATKA_PROFIT_LOSS_REQUEST,
  payload: data,
});

export const getMatkaProfitLossPosSuccess = (payload) => ({
  type: MATKA_PROFIT_LOSS_SUCCESS,
  payload
});

export const getMatkaProfitLossPosFailure = (error) => ({
  type: MATKA_PROFIT_LOSS_FAILURE,
  payload: error,
});

export const matkaCoinUpdate = (payload) => ({

  type: MATKA_COIN_UPDATE_REQUEST,
  payload: payload,
});

export const matkaCoinUpdateSuccess = (payload) => ({
  type: MATKA_COIN_UPDATE_SUCCESS,
  payload,
});

export const matkaCoinUpdateFailure = (error) => ({
  type: MATKA_COIN_UPDATE_FAILURE,
  payload: error,
});
