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
  USER_LEDGER_CLEAR,

  USER_LENA_DENA_REQUEST,
  USER_LENA_DENA_SUCCESS,
  USER_LENA_DENA_FAILURE,

  USER_LEDGER_CREDIT_DEBIT_REQUEST,
  USER_LEDGER_CREDIT_DEBIT_SUCCESS,
  USER_LEDGER_CREDIT_DEBIT_FAILURE,

  PlusMinusByMarketIdByUserWise_LIST_REQUEST,
  PlusMinusByMarketIdByUserWise_LIST_SUCCESS,
  PlusMinusByMarketIdByUserWise_LIST_FAILURE,

  GET_PLUS_MINUS_BY_MARKET_ID_REQUEST,
  GET_PLUS_MINUS_BY_MARKET_ID_SUCCESS,
  GET_PLUS_MINUS_BY_MARKET_ID_FAILURE,

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

  CLIENT_LIST_BY_MARKET_ID_REQUEST,
  CLIENT_LIST_BY_MARKET_ID_SUCCESS,
  CLIENT_LIST_BY_MARKET_ID_FAILURE,

  USER_COMMISSION_REPORT_REQUEST,
  USER_COMMISSION_REPORT_SUCCESS,
  USER_COMMISSION_REPORT_FAILURE,

  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAILURE,
  // USER_DETAIL

  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE,
  USER_DETAIL_CLEAR,

  //.........
  USER_BALANCE_REQUEST,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAILURE,
  USER_SEARCH_CLIEAR,


  CASINO_ROUND_WISE_REQUEST,
  CASINO_ROUND_WISE_SUCCESS,
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
  SESSION_POSITION_BY_SELECTION_ID_REQUEST,
  SESSION_POSITION_BY_SELECTION_ID_SUCCESS,
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
  COUNT_MATKA_BETS_REQUEST,
  COUNT_MATKA_BETS_SUCCESS,
  COUNT_MATKA_BETS_FAILURE,
  MATKA_PROFIT_LOSS_REQUEST,
  MATKA_PROFIT_LOSS_SUCCESS,
  MATKA_PROFIT_LOSS_FAILURE,
  GET_MATKA_LIST_REQUEST,
  GET_MATKA_LIST_SUCCESS,
  GET_MATKA_LIST_FAILURE,
  MATKA_BET_LIST_REQUEST,
  MATKA_BET_LIST_SUCCESS,
  MATKA_BET_LIST_FAILURE,
  MATKA_COIN_UPDATE_REQUEST,
  MATKA_COIN_UPDATE_SUCCESS,
  MATKA_COIN_UPDATE_FAILURE,
  DAY_WISE_MATKA_REPORT_REQUEST,
  DAY_WISE_MATKA_REPORT_SUCCESS,
  DAY_WISE_MATKA_REPORT_FAILURE,
  SPORTS_BET_LIST_CLEAN,
  
} from "../../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
};


const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //..................match list 
    case MATCH_LIST_REQUEST: {
      return {
        ...state,
        loadingMatch: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case MATCH_LIST_SUCCESS: {
      return {
        ...state,
        loadingMatch: false,
        showMessage: true,
        matchList: action.payload,
      };
    }
    case MATCH_LIST_FAILURE: {
      return {
        ...state,
        loadingMatch: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // USER DETAILS
    case USER_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        userDetails: action.payload.data,
      };
    }
    case USER_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    case USER_DETAIL_CLEAR: {
      return {
        ...state,
        userDetails: null,
      };
    }

    //.........................

    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        checkRedirect: false,
        // showMessage: false,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // showMessage: true,
        userListItems: action.payload.data.list,
        userListTotal: action.payload.data.total,
        alertMessage: action.payload.message,
        userListCall: false,
        checkRedirect: false,

      };
    case USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        // showMessage: true,
        alertMessage: action.payload,
        userListCall: false,
        checkRedirect: false,
      };

    // LENA DENA 

    case USER_LENA_DENA_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_LENA_DENA_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        userLenaDenaItems: action.payload,
        alertMessage: action.payload.message,
      };
    case USER_LENA_DENA_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.payload,
      };

    // USER LEDGER CREDIT DEBIT

    case USER_LEDGER_CREDIT_DEBIT_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
        succesApi: false,
      };
    case USER_LEDGER_CREDIT_DEBIT_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        userLedgerCreditDebit: action.payload,
        alertMessage: action.payload.message,
        succesApi: true,

      };
    case USER_LEDGER_CREDIT_DEBIT_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.payload,
        succesApi: false,

      };

    // user Update 
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false,
        userListChnage: false
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        loader: false,
        alertMessage: 'user Updated successfully',
        userUpdateData: action.payload,
        showMessage: true,
        userListCall: true,
        userListChnage: true
      };
    }
    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        userListChnage: false
      };
    }
    //................

    case COIN_UPDATE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false,
        userListChnage: false
      };
    }
    case COIN_UPDATE_SUCCESS: {
      return {
        ...state,
        loader: false,
        alertMessage: 'Coins Updated successfully',
        userCoinsData: action.payload,
        showMessage: true,
        userListCall: true,
        userListChnage:true
      };
    }
    case COIN_UPDATE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        userListChnage: false
      };
    }
    // Complete Sport List
    case COMPLETE_SPORT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case COMPLETE_SPORT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        sportList: action.payload.data,
        sportListTotal: action.payload.data.total,

        // alertMessage: action.payload.message,
      };
    case COMPLETE_SPORT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.payload,
      };

    //iNPLAY ODD POSITION 
    case INPLAY_ODD_POSITION_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case INPLAY_ODD_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        oddpositionList: action.payload.data,
        // sportListTotal: action.payload.data.total,

        // alertMessage: action.payload.message,
      };
    case INPLAY_ODD_POSITION_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.payload,
      };

    // CASINO BET LIST 
    //iNPLAY ODD POSITION 
    case CASINO_DIAMOND_BET_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case CASINO_DIAMOND_BET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        casinoBetList: action.payload.data,
        // sportListTotal: action.payload.data.total,

        // alertMessage: action.payload.message,
      };
    case CASINO_DIAMOND_BET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.payload,
      };



    // USER_CRETAE
    case USER_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
        checkRedirect: false,
      };
    }
    case USER_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        // userCreate: action.payload,
        alertMessage: action.payload.message,
        checkRedirect: true,

      };
    }
    case USER_CREATE_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error,
        checkRedirect: false,

      };
    }


    // USER PROFIT LOSS...........

    case USER_PROFITLOSS_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case USER_PROFITLOSS_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        userProfitLossList: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case USER_PROFITLOSS_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    //...............USER LEDEGR LIST
    case USER_LEDGER_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case USER_LEDGER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        userLedgerListData: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case USER_LEDGER_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }
    case USER_LEDGER_CLEAR: {
      return {
        ...state,
        userLedger: null,
      };
    }
    //.............................PlusMinusByMarketIdByUserWise

    case PlusMinusByMarketIdByUserWise_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case PlusMinusByMarketIdByUserWise_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        plusMinusByMarketIdByUserWiseListdata: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case PlusMinusByMarketIdByUserWise_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    //.........................
    // GET_PLUS_MINUS_BY_MARKET_ID_REQUEST,
    // GET_PLUS_MINUS_BY_MARKET_ID_SUCCESS,
    // GET_PLUS_MINUS_BY_MARKET_ID_FAILURE,


    case GET_PLUS_MINUS_BY_MARKET_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case GET_PLUS_MINUS_BY_MARKET_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        plusMinusByMarketId: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case GET_PLUS_MINUS_BY_MARKET_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    case MATCH_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
        matchDetailsResponse: '',
      };
    }
    case MATCH_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        matchDetailsResponse: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case MATCH_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error,
        matchDetailsResponse: '',
      };
    }

    case FETCH_DIAMOND_CASINO_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case FETCH_DIAMOND_CASINO_REPORT_SUCCESS:
      return {
        ...state,
        diamondCasinoReport: action.payload,
        loading: false,
        // alertMessage: action.payload.message,
        showMessage: true,
      };
    case FETCH_DIAMOND_CASINO_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    //......

    case FETCH_SHARE_DETAILS_REQUEST:
      return {
        ...state,
        // loading: true,
        showMessage: false,
      };
    case FETCH_SHARE_DETAILS_SUCCESS:
      return {
        ...state,
        shareDetails: action.payload.data.data,
        // loading: false,
        showMessage: true,
      };
    case FETCH_SHARE_DETAILS_FAILURE:
      return {
        ...state,
        // loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    // USER STATEMENT.......

    case USER_STATEMENT_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_STATEMENT_SUCCESS:
      return {
        ...state,
        userStatement: action.payload.data,
        userStatementMessage: action.payload,
        loading: false,
        showMessage: true,
      };
    case USER_STATEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    //User ACTIVITY
    case USER_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_ACTIVITY_SUCCESS:
      return {
        ...state,
        userActivity: action.payload.data,
        loading: false,
        showMessage: true,
      };
    case USER_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    //User Login ACTIVITY
    case USER_LOGIN_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_LOGIN_ACTIVITY_SUCCESS:
      return {
        ...state,
        userLoginActivity: action.payload.data,
        loading: false,
        showMessage: true,
      };
    case USER_LOGIN_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    // sportsBetsList
    case SPORTS_BET_LIST_REQUEST:
      return {
        ...state,
        sportsBetsList: null,
        loading: true,
        showMessage: false,
      };
    case SPORTS_BET_LIST_SUCCESS:
      return {
        ...state,
        sportsBetsList: action.payload,
        loading: false,
        showMessage: true,
      };
    case SPORTS_BET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };


      case SPORTS_BET_LIST_CLEAN:
        return {
          ...state,
          sportsBetsList:null,
         
        };
    // clientListByMarketId

    case CLIENT_LIST_BY_MARKET_ID_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case CLIENT_LIST_BY_MARKET_ID_SUCCESS:
      return {
        ...state,
        clientListByMarketId: action.payload.data,
        loading: false,
        showMessage: true,
      };
    case CLIENT_LIST_BY_MARKET_ID_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    //userCommissionReport



    case USER_COMMISSION_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_COMMISSION_REPORT_SUCCESS:
      return {
        ...state,
        userCommissionReport: action.payload.data,
        userCommissionReportMess: action.payload.message,
        loading: false,
        showMessage: true,
      };
    case USER_COMMISSION_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };


    //USER sEARCH aPI



    case USER_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_SEARCH_SUCCESS:
      return {
        ...state,
        userSearchList: action.payload.data,
        loading: false,
        showMessage: true,
      };
    case USER_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    case USER_SEARCH_CLIEAR:
      return {
        ...state,
        userSearchList: null
      };

    case USER_BALANCE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_BALANCE_SUCCESS: {
      return {
        ...state,
        loader: false,
        // alertMessage: action.payload.message,
        balance: action.payload.data.coins,
        // showMessage: true
      };
    }
    case USER_BALANCE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    //...........casino round Wind

    case CASINO_ROUND_WISE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case CASINO_ROUND_WISE_SUCCESS: {
      return {
        ...state,
        loader: false,
        // alertMessage: action.payload.message,
        casinoRoundWiseData: action.payload.data,
        // showMessage: true
      };
    }
    case CASINO_ROUND_WISE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // dayWiseCasinoReport

    case CASINO_DAY_WISE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case CASINO_DAY_WISE_SUCCESS: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        casinoDayWise: action.payload.data,
      };
    }
    case CASINO_DAY_WISE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }


    case DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        doaminsettingData: action.payload.data,
      };
    }
    case DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }


    case SECURE_CODE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case SECURE_CODE_SUCCESS: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        secureCodeData: action.payload.data,
      };
    }
    case SECURE_CODE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    //COMPLATED_FANCY_BY_MARKET_ID_REQUEST

    case COMPLATED_FANCY_BY_MARKET_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false,
        completeDataLoading: true
      };
    }
    case COMPLATED_FANCY_BY_MARKET_ID_SUCCESS: {

      return {
        ...state,
        loading: false,
        showMessage: false,
        complatedFancy: action.payload.data,
        completeDataLoading: false

      };
    }
    case COMPLATED_FANCY_BY_MARKET_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true,
        completeDataLoading: false
      };
    }

    // SESSION_POSITION_BY_SELECTION_ID

    case SESSION_POSITION_BY_SELECTION_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case SESSION_POSITION_BY_SELECTION_ID_SUCCESS: {

      return {
        ...state,
        loading: false,
        showMessage: false,
        sessionPosition: action.payload.data,
      };
    }
    case SESSION_POSITION_BY_SELECTION_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    // ODDS_POSSITION_REQUEST

    case ODDS_POSSITION_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case ODDS_POSSITION_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        oddsPossition: action.payload.data,
      };
    }
    case ODDS_POSSITION_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }


    case DECISION_RESET_COMM_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case DECISION_RESET_COMM_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        decisionCommData: action.payload.data,
      };
    }
    case DECISION_RESET_COMM_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    case DECISION_RESET_COMM_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case DECISION_RESET_COMM_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        decisionCommDataList: action.payload.data,
      };
    }
    case DECISION_RESET_COMM_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    // GETPLUSMINUS CASINO DEATILS

    case GET_PLUS_MINUS_CASINO_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case GET_PLUS_MINUS_CASINO_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        getplusminuscasinodetailsList: action.payload.data,
      };
    }
    case GET_PLUS_MINUS_CASINO_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // cASINO geT prOFIT lOSS

    case CASINO_PROFIT_LOSS_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case CASINO_PROFIT_LOSS_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        getcasinoProfitLossList: action.payload.data,
      };
    }
    case CASINO_PROFIT_LOSS_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }


    // cASINO REPORT BY USER

    case CASINO_REPORT_BY_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case CASINO_REPORT_BY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        casinoReportListbyUser: action.payload.data,
      };
    }
    case CASINO_REPORT_BY_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    
    //GET_DIAMOND_CASINO_BY_EVENT_ID


    case GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        diamondcasinobyeventid: action.payload.data,
      };
    }
    case GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // USERPOSITION bY MARKET ID 

    case USER_POSITION_BY_MARKETID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false,
        userpositionbymarketId: null
      };
    }
    case USER_POSITION_BY_MARKETID_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        userpositionbymarketId: action.payload.data,
      };
    }
    case USER_POSITION_BY_MARKETID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
// Domain Setting  

    case USER_DOMAIN_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_DOMAIN_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        domainListData: action.payload.data,
      };
    }
    case USER_DOMAIN_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    case USER_SEARCH_CLEAN: {
      return {
        ...state,
        userDetails: null
      };
    }

   
      case  COUNT_MATKA_BETS_REQUEST: {
        return {
          ...state,
          loader: true,
          alertMessage: '',
          showMessage: false
        };
      }
      case  COUNT_MATKA_BETS_SUCCESS: {
        return {
          ...state,
          loader: false,
          showMessage: false,
          matkaBetsCount: action.payload.data,
        };
      }
      case  COUNT_MATKA_BETS_FAILURE: {
        return {
          ...state,
          loader: false,
          alertMessage: action.payload,
          showMessage: true
        };
      }

      case MATKA_PROFIT_LOSS_REQUEST: {
        return {
          ...state,
          loading: true,
          alertMessage: '',
          showMessage: false
        };
      }
      case MATKA_PROFIT_LOSS_SUCCESS: {
        return {
          ...state,
          loading: false,
          showMessage: false,
          getMatkaProfitLossList: action.payload.data,
        };
      }
      case MATKA_PROFIT_LOSS_FAILURE: {
        return {
          ...state,
          loading: false,
          alertMessage: action.payload,
          showMessage: true
        };
      }


      case GET_MATKA_LIST_REQUEST: {
        return {
          ...state,
          loading: true,
          showMessage: false,
        }
      }
      case GET_MATKA_LIST_SUCCESS: {
        return {
          ...state,
          getMatkaListData: action.payload.data,
          loading: false,
          showMessage: true,
      
        };
      }
      case GET_MATKA_LIST_FAILURE: {
        return {
          ...state,
          loading: false,
          showMessage: true,
          alertMessage: action.error
        };
      }
  
  
      case MATKA_BET_LIST_REQUEST: {
        return {
          ...state,
          loading: true,
          showMessage: false,
        }
      }
      case MATKA_BET_LIST_SUCCESS: {
        return {
          ...state,
          matkaBetListReport: action.payload.data,
          loading: false,
          showMessage: true,
      
        };
      }
      case MATKA_BET_LIST_FAILURE: {
        return {
          ...state,
          loading: false,
          showMessage: true,
          alertMessage: action.error
        };
      }


    case MATKA_COIN_UPDATE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false,
        userListChnage: false
      };
    }
    case MATKA_COIN_UPDATE_SUCCESS: {
      return {
        ...state,
        loader: false,
        alertMessage: 'Coins Updated successfully',
        matkauserCoinsData: action.payload,
        showMessage: true,
        userListCall: true,
        userListChnage: true
      };
    }
    case MATKA_COIN_UPDATE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        userListChnage: false
      };
    }

    case  DAY_WISE_MATKA_REPORT_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case  DAY_WISE_MATKA_REPORT_SUCCESS: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        matkaDayWise: action.payload.data,
      };
    }
    case  DAY_WISE_MATKA_REPORT_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

  

  


    default:
      return state;
  }
}

export default UserReducer;
