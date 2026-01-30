import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

import {
  CASINO_DIAMOND_BET_LIST_REQUEST,
  COIN_UPDATE_REQUEST,
  COMPLETE_SPORT_LIST_REQUEST,
  INPLAY_ODD_POSITION_REQUEST,
  MATCH_LIST_REQUEST,
  PlusMinusByMarketIdByUserWise_LIST_REQUEST,
  USER_CREATE_REQUEST,
  USER_LEDGER_LIST_REQUEST,
  USER_LIST_REQUEST,
  USER_PROFITLOSS_REQUEST,
  USER_UPDATE_REQUEST,
  MATCH_DETAIL_REQUEST,
  FETCH_DIAMOND_CASINO_REPORT_REQUEST,
  USER_LENA_DENA_REQUEST,
  USER_LEDGER_CREDIT_DEBIT_REQUEST,
  FETCH_SHARE_DETAILS_REQUEST,
  USER_STATEMENT_REQUEST,
  USER_ACTIVITY_REQUEST,
  USER_LOGIN_ACTIVITY_REQUEST,
  SPORTS_BET_LIST_REQUEST,
  GET_PLUS_MINUS_BY_MARKET_ID_REQUEST,
  CLIENT_LIST_BY_MARKET_ID_REQUEST,
  USER_COMMISSION_REPORT_REQUEST,
  USER_SEARCH_REQUEST,
  USER_DETAIL_REQUEST,
  USER_BALANCE_REQUEST,
  CASINO_ROUND_WISE_REQUEST,
  CASINO_DAY_WISE_REQUEST,
  DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  SECURE_CODE_REQUEST,
  COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  SESSION_POSITION_BY_SELECTION_ID_REQUEST,
  ODDS_POSSITION_REQUEST,
  DECISION_RESET_COMM_REQUEST,
  DECISION_RESET_COMM_LIST_REQUEST,
  GET_PLUS_MINUS_CASINO_DETAIL_REQUEST,
  CASINO_PROFIT_LOSS_REQUEST,
  CASINO_REPORT_BY_USER_REQUEST,
  GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  USER_POSITION_BY_MARKETID_REQUEST,
  USER_DOMAIN_LIST_REQUEST,
  GET_MATKA_LIST_REQUEST,
  MATKA_BET_LIST_REQUEST,
  DAY_WISE_MATKA_REPORT_REQUEST,
  COUNT_MATKA_BETS_REQUEST,
  MATKA_COIN_UPDATE_REQUEST,
  MATKA_PROFIT_LOSS_REQUEST


} from "../../constants/ActionTypes";
import {
  casinoDiamondBetListFailure,
  casinoDiamondBetListSuccess,
  coinUpdateFailure,
  coinUpdateSuccess,
  completeSportListFailure,
  completeSportListSuccess,
  getDiamondCasinoReportFailure,
  getDiamondCasinoReportSuccess,
  getMatchDetailFailure,
  getMatchDetailSuccess,
  getMatchListFailure,
  getMatchListSuccess,
  getShareDetailsFailure,
  getShareDetailsSuccess,
  getUserLenaDenaFailure,
  getUserLenaDenaSuccess,
  getUserListFailure,
  getUserListSuccess,
  getUserLoginActivityFailure,
  getUserLoginActivitySuccess,
  getUserStatementFailure,
  getUserStatementSuccess,
  getSportsBetsListFailure,
  getSportsBetsListSuccess,
  getuserActivityFailure,
  getuserActivitySuccess,
  inplayOddPositionFailure,
  inplayOddPositionSuccess,
  plusMinusByMarketIdByUserWiseListFailure,
  plusMinusByMarketIdByUserWiseListSuccess,
  userCreateFailure, userCreateSuccess,
  userLedgerCreditDebitFailure,
  userLedgerCreditDebitSuccess,
  userLedgerListFailure,
  userLedgerListSuccess,
  userProfitLossFailure,
  userProfitLossSuccess,
  userUpdateFailure,
  userUpdateSuccess,
  getPlusMinusByMarketIdSuccess,
  getPlusMinusByMarketIdFailure,
  getClientListByMarketIdSuccess,
  getClientListByMarketIdFailure,
  userCommissionReportSuccess,
  userCommissionReportFailure,
  getuserSearchSuccess,
  getuserSearchFailure,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  userBalanceFailure,
  userBalanceSuccess,
  // getUserList,
  casinoRoundWiseSuccess,
  casinoRoundWiseFailure,
  casinoDayWiseSuccess,
  casinoDayWiseFailure,
  // domainSettingByDomainSuccess,
  // domainSettingByDomainFailure,
  secureCodeSuccess,
  secureCodeFailure,
  getCompletedFancyByMarketIdSuccess,
  getCompletedFancyByMarketIdFailure,
  getSessionPositionBySelectionIdSuccess,
  getSessionPositionBySelectionIdFailure,
  getOddsPositionSuccess,
  getOddsPositionFailure,
  decisionresetCommSuccess,
  decisionresetCommFailure,
  decisionresetCommListSuccess,
  decisionresetCommListFailure,
  domainSettingByDomainSuccess,
  domainSettingByDomainFailure,
  getPlusMinusCasinoDetailSuccess,
  getPlusMinusCasinoDetailFailure,
  getProfitLossPosSuccess,
  getProfitLossPosFailure,
  getcasinoReportByUserSuccess,
  getcasinoReportByUserFailure,
  getDiamondCasinoByEventIdFailure,
  getDiamondCasinoByEventIdSuccess,
  userPositionByMarketIdFailure,
  userPositionByMarketIdSuccess,
  userDominListSuccess,
  userDominListFailure,
  getMatkaListSuccess,
  getMatkaListFailure,
  getMatkaBetListSuccess,
  getMatkaBetListFailure,
  matkaDayWiseSuccess,
  matkaDayWiseFailure,
  matkaListCountSuccess,
  matkaListCountFailure,
  matkaCoinUpdateSuccess,
  matkaCoinUpdateFailure,
  getMatkaProfitLossPosSuccess,
  getMatkaProfitLossPosFailure,
} from "../actions/User";

import { apiCall } from "./HTTP";
import { NotificationManager } from "react-notifications";
import { message } from "antd";

function* getMatchListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'sports/matchList', payload);
    if (response) {
      localStorage.removeItem('matchList');
      yield put(getMatchListSuccess(response.data));
      localStorage.setItem('matchList', JSON.stringify(response?.data?.data));
    } else {
      yield put(getMatchListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatchListFailure(error));
  }
}


function* fetchUserList({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userList', payload);
    if (response.status === 200) {
      // yield delay(1500)
      yield put(getUserListSuccess(response.data));
    } else {
      yield put(getUserListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserListFailure(error.message));
  }
}

function* userBalanceSaga() {
  try {
    const response = yield call(apiCall, "POST", 'user/userBalance')

    if (response) {
      yield put(userBalanceSuccess(response.data));
      localStorage.setItem('client-wallet-balance', JSON.stringify(response.data.data.coins));
      localStorage.setItem('client-wallet-exposure', JSON.stringify(response.data.data.exposure));
    } else {
      yield put(userBalanceFailure(response.data.message));
    }
  } catch (error) {
    yield put(userBalanceFailure(error));
  }
}


// getUserDetailSaga

function* getUserDetailsSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userDetails', payload);
    if (response.status === 200) {
      yield put(getUserDetailsSuccess(response.data));
    } else {
      yield put(getUserDetailsFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserDetailsFailure(error.message));
  }
}

function* fetchUserLenaDena({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/lenaDena', payload);
    if (response.status === 200) {
      yield put(getUserLenaDenaSuccess(response.data));
    } else {
      yield put(getUserLenaDenaFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserLenaDenaFailure(error.message));
  }
}

function* userLedgerCreditDebitSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/ledgerCreditDebit', payload);
    if (response.status === 200) {
      message.success(response?.data?.message)

      yield put(userLedgerCreditDebitSuccess(response.data));
      // window.location.reload();
    } else {
      NotificationManager.error(response.data.message, "Somthing Wrong", 1000, () => {
        alert('callback');
      });
      yield put(userLedgerCreditDebitFailure(response.data.message));
      message.error(response?.data?.message)

    }
  } catch (error) {
    NotificationManager.error(error.message, "Somthing Wrong", 1000, () => {
      alert('callback');
    });
    message.error(error?.data?.message)

    yield put(userLedgerCreditDebitFailure(error.message));
  }
}

// function* userUpadeSaga({ payload }) {
//   try {
//     const response = yield call(apiCall, "PATCH", 'user/userUpdate', payload)
//     if (response.status === 200) {
//       yield put(userUpdateSuccess(response.data));
//       // yield put(getUserList());
//       NotificationManager.success(response.data.message, "Congratulation", 1000, () => {
//         alert('callback');
//       });
//     } else {
//       yield put(userUpdateFailure(response.data.message));
//       NotificationManager.error(response.data.message, "Somthing Wrong", 1000, () => {
//         alert('callback');
//       });
//     }
//   } catch (error) {
//     yield put(userUpdateFailure(error));
//     NotificationManager.error(error.data.message, "Error", 1000, () => {
//       alert('callback');
//     });
//   }
// }


let msg = "";


function* userUpadeSaga({ payload }) {
  try {
    const response = yield call(apiCall, "PATCH", 'user/userUpdate', payload);
    if (response.status === 200) {
      msg = response.data.message;

      message.success(msg)
      // NotificationManager.success(msg, "Sucess", 1000, () => {
      //   alert('callback');
      // });
      yield delay(1000)
      yield put(userUpdateSuccess(response.data));
    } else {
      msg = response.data.message;
      message.error(msg)
      
      yield put(userUpdateFailure(response.data.message));
      // NotificationManager.error(msg, "Something Wrong", 2000, () => {
      //   alert('callback');
      // });
    }
  } catch (error) {
    msg = error.data?.message || "Error occurred";
    message.error(msg)
    yield put(userUpdateFailure(error));
    // NotificationManager.error(msg, "Error", 2000, () => {
    //   alert('callback');
    // });
  }
}

function* coinUpadeSaga({ payload }) {
  try {
    const response = yield call(apiCall, "PATCH", 'user/updateCoins', payload);
    if (response.status === 200) {

      msg = response.data.message;
      NotificationManager.success(msg, "Sucess", 3000, () => {
        alert('callback');
      });
      yield delay(2000)
      yield put(coinUpdateSuccess(response.data));
    } else {
      msg = response.data.message;
      yield put(coinUpdateFailure(response.data.message));
      NotificationManager.error(msg, "Something Wrong", 3000, () => {
        alert('callback');
      });
    }
  } catch (error) {
    msg = error.data?.message || "Error occurred";
    yield put(coinUpdateFailure(error));
    NotificationManager.error(msg, "Error", 1000, () => {
      alert('callback');
    });
  }
}



// function* coinUpadeSaga({ payload }) {
//   try {
//     const response = yield call(apiCall, "PATCH", 'user/updateCoins', payload);
//     if (response.status === 200) {

//       msg = response.data.message;
//       yield put(coinUpdateSuccess(response.data));
//     }  else {
//       msg = "An error occurred";
//       yield put(coinUpdateFailure(response.data));
//       NotificationManager.error(msg, "Error", 1000, () => {
//         alert('callback');
//       });
//     }
//   } catch (error) {
//     msg = error.data?.message || "Error occurred";
//     yield put(coinUpdateFailure(error));
//     NotificationManager.error(msg, "Error", 1000, () => {
//       alert('callback');
//     });
//   } finally {
//     // Set a timeout to ensure the notification is displayed for 2 seconds
//     // setTimeout(() => {
//       // NotificationManager.success(msg, "Congratulation", 2000, () => {
//         // alert('callback');
//       // });
//     // }, 2000);
//   }
// }


function* completeSportListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'decision/completeSportList', payload)
    if (response.status === 200) {
      NotificationManager.success(response.data.message, "Congratulation", 1000, () => {
        alert('callback');
      });
      yield delay(1000)
      yield put(completeSportListSuccess(response.data));

    } else {
      yield put(completeSportListFailure(response.data.message));
    }
  } catch (error) {
    yield put(completeSportListFailure(error));
  }
}

function* inplayOddPositionSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'sports/inplayOddsPosition', payload)
    if (response.status === 200) {
      yield put(inplayOddPositionSuccess(response.data));
      NotificationManager.success(response.data.message, "Congratulation", 1000, () => {
        alert('callback');
      });
    } else {
      yield put(inplayOddPositionFailure(response.data.message));
    }
  } catch (error) {
    yield put(inplayOddPositionFailure(error));
  }
}

function* casinoDiamondBetListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'casino/diamondBetsList', payload)
    if (response.status === 200) {
      yield put(casinoDiamondBetListSuccess(response.data));
      NotificationManager.success(response.data.message, "Congratulation", 1000, () => {
        alert('callback');
      });
    } else {
      yield put(casinoDiamondBetListFailure(response.data.message));
    }
  } catch (error) {
    yield put(casinoDiamondBetListFailure(error));
  }
}

// USER CREATE 

function* userCreateSaga({ payload }) {

  try {
    const response = yield call(apiCall, "POST", 'user/create', payload)
    if (response.status === 200) {

      message.success(response?.data?.message)
      // NotificationManager.success(response.data.message, "Congratulation", 1000, () => {
      //   alert('callback');
      // });
      // yield delay(1000)
      yield put(userCreateSuccess(response.data));
    } else {
         message.error(response?.data.message)
      yield put(userCreateFailure(response.data.message));
    }
  } catch (error) {
    console.log(error);
       message.error(error?.data.message)
       
    yield put(userCreateFailure(error));
  }
}

// User Profit Loss

function* userProfitLossSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'reports/userProfitLoss', payload)
    if (response) {
      yield put(userProfitLossSuccess(response.data));
    } else {
      yield put(userProfitLossFailure(response.data.message));
    }
  } catch (error) {
    yield put(userProfitLossFailure(error));
  }
}

//................user ledger list

function* userLedgerListSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'user/userLedger', payload)
    if (response) {
      yield put(userLedgerListSuccess(response.data));
    } else {
      yield put(userLedgerListFailure(response.data.message));
    }
  } catch (error) {
    yield put(userLedgerListFailure(error));
  }
}

//..................PlusMinusByMarketIdByUserWise
function* plusMinusByMarketIdByUserWiseSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'reports/getPlusMinusByMarketIdByUserWise', payload)
    if (response) {
      yield put(plusMinusByMarketIdByUserWiseListSuccess(response.data));
    } else {
      yield put(plusMinusByMarketIdByUserWiseListFailure(response.data.message));
    }
  } catch (error) {
    yield put(plusMinusByMarketIdByUserWiseListFailure(error));
  }
}

//getPlusMinusByMarketId

function* getPlusMinusByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'decision/getPlusMinusByMarketId', payload)
    if (response) {
      yield put(getPlusMinusByMarketIdSuccess(response.data));
    } else {
      yield put(getPlusMinusByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getPlusMinusByMarketIdFailure(error));
  }
}

// get match list
function* getMatchDetailSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'sports/sportByMarketId', payload);
    if (response) {
      yield put(getMatchDetailSuccess(response.data));
    } else {
      yield put(getMatchDetailFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatchDetailFailure(error));
  }
}


//.................. DiamondCasinoReport
function* getDiamondCasinoReportSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'casino/diamondCasinoReportByUser', payload)
    if (response) {
      yield put(getDiamondCasinoReportSuccess(response.data));
    } else {
      yield put(getDiamondCasinoReportFailure(response.data.message));
    }
  } catch (error) {
    yield put(getDiamondCasinoReportFailure(error));
  }
}

//................

function* getShareDetailsSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/shareDetails', payload);
    if (response.status === 200) {
      yield put(getShareDetailsSuccess(response.data));
    } else {
      yield put(getShareDetailsFailure(response.data.message));
    }
  } catch (error) {
    yield put(getShareDetailsFailure(error.message));
  }
}

// user statement 

function* getUserStatementSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userStatement', payload);
    if (response.status === 200) {
      yield put(getUserStatementSuccess(response.data));
    } else {
      yield put(getUserStatementFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserStatementFailure(error.message));
  }
}

// userActivity

function* getUserActivitySaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userActivity', payload);
    if (response.status === 200) {
      yield put(getuserActivitySuccess(response.data));
    } else {
      yield put(getuserActivityFailure(response.data.message));
    }
  } catch (error) {
    yield put(getuserActivityFailure(error.message));
  }
}

// userLoginActivity

function* getUserLoginActivitySaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userLoginActivity', payload);
    if (response.status === 200) {
      yield put(getUserLoginActivitySuccess(response.data));
    } else {
      yield put(getUserLoginActivityFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserLoginActivityFailure(error.message));
  }
}

//sportsBetsList

function* getSportsBetsListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/betsList', payload);
    if (response.status === 200) {
      yield put(getSportsBetsListSuccess(response.data));
    } else {
      yield put(getSportsBetsListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getSportsBetsListFailure(error.message));
  }
}


function* getMatkaListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/getMatkaList', payload);
    if (response.status === 200) {
      yield put(getMatkaListSuccess(response.data));
    } else {
      yield put(getMatkaListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaListFailure(error.message));
  }
}


function* getMatkaBetListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/matkaBetList', payload);
    if (response.status === 200) {
      yield put(getMatkaBetListSuccess(response.data));
    } else {
      yield put(getMatkaBetListFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaBetListFailure(error.message));
  }
}

function* MatkaDayWiseSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/dayWiseMatkaReport', payload);
    if (response.status === 200) {
      yield put(matkaDayWiseSuccess(response.data));
    } else {
      yield put(matkaDayWiseFailure(response.data.message));
    }
  } catch (error) {
    yield put(matkaDayWiseFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

function* MatkaListsSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/countMatkaBets', payload);
    if (response.status === 200) {
      yield put(matkaListCountSuccess(response.data));
    } else {
      yield put(matkaListCountFailure(response.data.message));
    }
  } catch (error) {
    yield put(matkaListCountFailure(error.message));
  }
}


function* MatkaCoinUpadeSaga({ payload }) {
  try {
    const response = yield call(apiCall, "POST", 'user/updateMatkaLimit', payload);
    if (response.status === 200) {

      msg = response.data.message;
      NotificationManager.success(msg, "Sucess", 1000, () => {
        alert('callback');
      });
      yield delay(1000)
      yield put(matkaCoinUpdateSuccess(response.data));
    } else {
      msg = response.data.message;
      yield put(matkaCoinUpdateFailure(response.data.message));
      NotificationManager.error(msg, "Something Wrong", 1000, () => {
        alert('callback');
      });
    }
  } catch (error) {
    msg = error.data?.message || "Error occurred";
    yield put(matkaCoinUpdateFailure(error));
    NotificationManager.error(msg, "Error", 1000, () => {
      alert('callback');
    });
  }
}



function* getMatkaProfitLossPosSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'matka/getProfitLossPosMatka', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(getMatkaProfitLossPosSuccess(response.data));

    } else {
      yield put(getMatkaProfitLossPosFailure(response.data.message));
    }
  } catch (error) {
    yield put(getMatkaProfitLossPosFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}



// clientListByMarketId

function* getClientListByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/clientListByMarketId', payload);
    if (response.status === 200) {
      yield put(getClientListByMarketIdSuccess(response.data));
    } else {
      yield put(getClientListByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getClientListByMarketIdFailure(error.message));
  }
}
// userCommissionReport

function* userCommissionReportSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'decision/userCommissionReport', payload);
    if (response.status === 200) {
      yield put(userCommissionReportSuccess(response.data));
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
    } else {
      yield put(userCommissionReportFailure(response.data.message));
    }
  } catch (error) {
    yield put(userCommissionReportFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Wrong", 1000, () => {
      alert('callback');
    });
  }
}

// USER lSIT dATAAAAAAAAAAAAAAA
function* userSearchReportSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/userSearch', payload);
    if (response.status === 200) {
      yield put(getuserSearchSuccess(response.data));
    } else {
      yield put(getuserSearchFailure(response.data.message));
    }
  } catch (error) {
    yield put(getuserSearchFailure(error.message));
  }
}


// casino round wise data 

function* casinoRoundWiseSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/roundWiseResult', payload);
    if (response.status === 200) {
      // alert('1')
      yield put(casinoRoundWiseSuccess(response.data));
    } else {
      // alert('2')

      yield put(casinoRoundWiseFailure(response.data.message));
    }
  } catch (error) {
    yield put(casinoRoundWiseFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

// dayWiseCasinoReport

function* casinoDayWiseSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/dayWiseCasinoReport', payload);
    if (response.status === 200) {
      yield put(casinoDayWiseSuccess(response.data));
    } else {
      yield put(casinoDayWiseFailure(response.data.message));
    }
  } catch (error) {
    yield put(casinoDayWiseFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

function* domainSettingByDomainSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'website/domainSettingByDomainName', payload);
    if (response.status === 200) {
      yield put(domainSettingByDomainSuccess(response?.data));

      if (response?.data?.data !== null) {
        localStorage.setItem('notification', response.data?.data.userNotification);
      }
    } else {
      yield put(domainSettingByDomainFailure(response?.data?.message));
    }
  } catch (error) {
    yield put(domainSettingByDomainFailure(error?.data?.message));
    NotificationManager.error(error?.data?.message, 'Error', 1000, () => {
      alert('callback');
    });
  }
}


function* secureCodeSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/secureCode', payload);
    if (response.status === 200) {
      yield put(secureCodeSuccess(response.data));

    } else {
      yield put(secureCodeFailure(response.data.message));
    }
  } catch (error) {
    yield put(secureCodeFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

// .....

function* getCompletedFancyByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/completedFancyByMarketId', payload);
    if (response.status === 200) {
      yield put(getCompletedFancyByMarketIdSuccess(response.data));
    } else {
      yield put(getCompletedFancyByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getCompletedFancyByMarketIdFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

//getSessionPositionBySelectionId

function* getSessionPositionBySelectionIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/getSessionPositionBySelectionId', payload);
    if (response.status === 200) {
      yield put(getSessionPositionBySelectionIdSuccess(response.data));
    } else {
      yield put(getSessionPositionBySelectionIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getSessionPositionBySelectionIdFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

// getOddsPosition

function* getOddsPositionSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/getOddsPosition', payload);
    if (response.status === 200) {
      yield put(getOddsPositionSuccess(response.data));
    } else {
      yield put(getOddsPositionFailure(response.data.message));
    }
  } catch (error) {
    yield put(getOddsPositionFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}


function* decisionResetCommSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'decision/resetComm', payload);
    if (response.status === 200) {
      message.success(response?.data?.message)
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield delay(1000)
      yield put(decisionresetCommSuccess(response.data));
      window.location.reload()
    } else {
      yield put(decisionresetCommFailure(response.data.message));
    }
  } catch (error) {
    yield put(decisionresetCommFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

function* decisionResetCommListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'decision/resetCommList', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(decisionresetCommListSuccess(response.data));

    } else {
      yield put(decisionresetCommListFailure(response.data.message));
    }
  } catch (error) {
    yield put(decisionresetCommFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

function* getPlusMinusCasinoDetailSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/getPlusMinusCasinoDetail', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(getPlusMinusCasinoDetailSuccess(response.data));

    } else {
      yield put(getPlusMinusCasinoDetailFailure(response.data.message));
    }
  } catch (error) {
    yield put(decisionresetCommFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

function* getProfitLossPosSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/getProfitLossPos', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(getProfitLossPosSuccess(response.data));

    } else {
      yield put(getProfitLossPosFailure(response.data.message));
    }
  } catch (error) {
    yield put(decisionresetCommFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}


function* getcasinoReportByUserSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/casinoReportByUser', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(getcasinoReportByUserSuccess(response.data));

    } else {
      yield put(getcasinoReportByUserFailure(response.data.message));
    }
  } catch (error) {
    yield put(decisionresetCommFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}


function* getDiamondCasinoByEventIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'casino/getDiamondCasinoByEventId', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(getDiamondCasinoByEventIdSuccess(response.data));

    } else {
      yield put(getDiamondCasinoByEventIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getDiamondCasinoByEventIdFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}


function* userPositionByMarketIdSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'sports/userPositionByMarketId', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(userPositionByMarketIdSuccess(response.data));

    } else {
      yield put(userPositionByMarketIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(userPositionByMarketIdFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}

// domail List

function* userDominListSaga({ payload }) {
  try {
    const response = yield call(apiCall, 'POST', 'user/domainList', payload);
    if (response.status === 200) {
      NotificationManager.success(response?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      yield put(userDominListSuccess(response.data));

    } else {
      yield put(userDominListFailure(response.data.message));
    }
  } catch (error) {
    yield put(userDominListFailure(error.data.message));
    NotificationManager.error(error?.data?.message, "Error", 1000, () => {
      alert('callback');
    });
  }
}







export function* watchuserDominListSaga() {
  yield takeEvery(USER_DOMAIN_LIST_REQUEST, userDominListSaga);
}




export function* watchgetDiamondCasinoByEventIdSaga() {
  yield takeEvery(GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST, getDiamondCasinoByEventIdSaga);
}


export function* watchuserPositionByMarketIdSaga() {
  yield takeEvery(USER_POSITION_BY_MARKETID_REQUEST, userPositionByMarketIdSaga);
}



export function* watchgetcasinoReportByUserSaga() {
  yield takeEvery(CASINO_REPORT_BY_USER_REQUEST, getcasinoReportByUserSaga);
}


export function* watchgetProfitLossPosSaga() {
  yield takeEvery(CASINO_PROFIT_LOSS_REQUEST, getProfitLossPosSaga);
}

export function* watchgetPlusMinusCasinoDetailSaga() {
  yield takeEvery(GET_PLUS_MINUS_CASINO_DETAIL_REQUEST, getPlusMinusCasinoDetailSaga);
}

export function* watchUserDomainSettingByDomainSaga() {
  yield takeEvery(DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST, domainSettingByDomainSaga);
}


export function* watchsecureCode() {
  yield takeEvery(SECURE_CODE_REQUEST, secureCodeSaga);
}

export function* watchDecisionResetComm() {
  yield takeEvery(DECISION_RESET_COMM_REQUEST, decisionResetCommSaga);
}

export function* watchDecisionResetCommList() {
  yield takeEvery(DECISION_RESET_COMM_LIST_REQUEST, decisionResetCommListSaga);
}



export function* watchUserSearchReport() {
  yield takeEvery(USER_SEARCH_REQUEST, userSearchReportSaga);
}


export function* watchCasinoRoundWiseSaga() {
  yield takeEvery(CASINO_ROUND_WISE_REQUEST, casinoRoundWiseSaga);
}

export function* watchUserUpdate() {
  yield takeEvery(USER_UPDATE_REQUEST, userUpadeSaga);
}
export function* watchgetMatchList() {
  yield takeEvery(MATCH_LIST_REQUEST, getMatchListSaga);
}
export function* watchgetUserDetail() {
  yield takeEvery(USER_DETAIL_REQUEST, getUserDetailsSaga);
}

export function* watchgetUserList() {
  yield takeEvery(USER_LIST_REQUEST, fetchUserList);
}
export function* watchgetLedgerCreditDebit() {
  yield takeEvery(USER_LEDGER_CREDIT_DEBIT_REQUEST, userLedgerCreditDebitSaga);
}

export function* watchgetUserLenaDena() {
  yield takeEvery(USER_LENA_DENA_REQUEST, fetchUserLenaDena);
}

export function* watchCoinUpdate() {
  yield takeEvery(COIN_UPDATE_REQUEST, coinUpadeSaga);
}
export function* watchCompleteSportList() {
  yield takeEvery(COMPLETE_SPORT_LIST_REQUEST, completeSportListSaga);
}

export function* watchInplayOddPosition() {
  yield takeEvery(INPLAY_ODD_POSITION_REQUEST, inplayOddPositionSaga);
}
export function* watchcasinoDiamondBetList() {
  yield takeEvery(CASINO_DIAMOND_BET_LIST_REQUEST, casinoDiamondBetListSaga);
}

export function* watchUserCreate() {
  yield takeEvery(USER_CREATE_REQUEST, userCreateSaga);
}

export function* watchUserProfitLoss() {
  yield takeEvery(USER_PROFITLOSS_REQUEST, userProfitLossSaga);
}

export function* watchUserLedgerList() {
  yield takeEvery(USER_LEDGER_LIST_REQUEST, userLedgerListSaga);
}

export function* watchplusMinusByMarketIdByUserWise() {
  yield takeEvery(PlusMinusByMarketIdByUserWise_LIST_REQUEST, plusMinusByMarketIdByUserWiseSaga);
}

export function* watchgetMatchDetail() {
  yield takeEvery(MATCH_DETAIL_REQUEST, getMatchDetailSaga);
}

export function* watchgetDiamondCasinoReport() {
  yield takeEvery(FETCH_DIAMOND_CASINO_REPORT_REQUEST, getDiamondCasinoReportSaga);
}

export function* watchgetShareDetails() {
  yield takeEvery(FETCH_SHARE_DETAILS_REQUEST, getShareDetailsSaga);
}

export function* watchgetUserStatement() {
  yield takeEvery(USER_STATEMENT_REQUEST, getUserStatementSaga);
}

export function* watchgetUserActivity() {

  yield takeEvery(USER_ACTIVITY_REQUEST, getUserActivitySaga);
}


export function* watchgetUserLoginActivity() {
  yield takeEvery(USER_LOGIN_ACTIVITY_REQUEST, getUserLoginActivitySaga);
}

export function* watchgetSportsBetsList() {
  yield takeEvery(SPORTS_BET_LIST_REQUEST, getSportsBetsListSaga);
}

export function* watchgetPlusMinusByMarketId() {
  yield takeEvery(GET_PLUS_MINUS_BY_MARKET_ID_REQUEST, getPlusMinusByMarketIdSaga);
}

export function* watchgetClientListByMarketId() {
  yield takeEvery(CLIENT_LIST_BY_MARKET_ID_REQUEST, getClientListByMarketIdSaga);
}

export function* watchgetUserCommissionReportSaga() {
  yield takeEvery(USER_COMMISSION_REPORT_REQUEST, userCommissionReportSaga);
}

export function* watchUserBalance() {
  yield takeEvery(USER_BALANCE_REQUEST, userBalanceSaga);
}

export function* watchCasinoDayWise() {
  yield takeEvery(CASINO_DAY_WISE_REQUEST, casinoDayWiseSaga);
}
//getCompletedFancyByMarketIdSaga

export function* watchGetCompletedFancyByMarketId() {
  yield takeEvery(COMPLATED_FANCY_BY_MARKET_ID_REQUEST, getCompletedFancyByMarketIdSaga);
}

// getSessionPositionBySelectionIdSaga

export function* watchGetSessionPositionBySelectionId() {
  yield takeEvery(SESSION_POSITION_BY_SELECTION_ID_REQUEST, getSessionPositionBySelectionIdSaga);
}
// getOddsPositionSaga
export function* watchgetOddsPosition() {
  yield takeEvery(ODDS_POSSITION_REQUEST, getOddsPositionSaga);
}


export function* watchGetMatkaList() {
  yield takeEvery(GET_MATKA_LIST_REQUEST, getMatkaListSaga);
}

export function* watchGetMatkaBetList() {
  yield takeEvery(MATKA_BET_LIST_REQUEST, getMatkaBetListSaga);
}


export function* watchMatkaDayWise() {
  yield takeEvery(DAY_WISE_MATKA_REPORT_REQUEST, MatkaDayWiseSaga);
}

export function* watchMatkaLists() {
  yield takeEvery(COUNT_MATKA_BETS_REQUEST, MatkaListsSaga);
}

export function* watchMatkaCoinUpdate() {
  yield takeEvery(MATKA_COIN_UPDATE_REQUEST, MatkaCoinUpadeSaga);
}


export function* watchgetMatkaProfitLossPosSaga() {
  yield takeEvery(MATKA_PROFIT_LOSS_REQUEST, getMatkaProfitLossPosSaga);
}
// end Mata Saga




export default function* rootSaga() {
  yield all(
    [
      fork(watchgetMatchList),
      fork(watchgetUserList),
      fork(watchUserUpdate),
      fork(watchCoinUpdate),
      fork(watchCompleteSportList),
      fork(watchInplayOddPosition),
      fork(watchcasinoDiamondBetList),
      fork(watchUserCreate),
      fork(watchUserProfitLoss),
      fork(watchUserLedgerList),
      fork(watchplusMinusByMarketIdByUserWise),
      fork(watchgetMatchDetail),
      fork(watchgetDiamondCasinoReport),
      fork(watchgetUserLenaDena),
      fork(watchgetLedgerCreditDebit),
      fork(watchgetShareDetails),
      fork(watchgetUserStatement),
      fork(watchgetUserActivity),
      fork(watchgetUserLoginActivity),
      fork(watchgetSportsBetsList),
      fork(watchgetPlusMinusByMarketId),
      fork(watchgetClientListByMarketId),
      fork(watchgetUserCommissionReportSaga),
      fork(watchUserSearchReport),
      fork(watchgetUserDetail),
      fork(watchUserBalance),
      fork(watchCasinoRoundWiseSaga),
      fork(watchCasinoDayWise),
      fork(watchsecureCode),
      fork(watchGetCompletedFancyByMarketId),
      fork(watchGetSessionPositionBySelectionId),
      fork(watchgetOddsPosition),
      fork(watchDecisionResetComm),
      fork(watchDecisionResetCommList),
      fork(watchUserDomainSettingByDomainSaga),
      fork(watchgetPlusMinusCasinoDetailSaga),
      fork(watchgetProfitLossPosSaga),
      fork(watchgetcasinoReportByUserSaga),
      fork(watchgetDiamondCasinoByEventIdSaga),
      fork(watchuserPositionByMarketIdSaga),
      fork(watchuserDominListSaga),
fork(watchGetMatkaList),
      fork(watchGetMatkaBetList),
      fork(watchMatkaCoinUpdate),
      fork(watchMatkaDayWise),
      fork(watchMatkaLists),

      fork(watchgetMatkaProfitLossPosSaga),



    ]
  );
}
