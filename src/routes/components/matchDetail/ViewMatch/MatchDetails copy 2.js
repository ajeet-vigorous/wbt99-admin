import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Spin, Table, Select, Modal, Tabs } from "antd";
import { Option } from "antd/lib/mentions";

import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedFancyByMarketId,
  getMatchDetail,
  getOddsPosition,
  getSessionPositionBySelectionId,
  getSportsBetsList,
  plusMinusByMarketIdByUserWiseList,
  userPositionByMarketId,
} from "../../../../appRedux/actions/User";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { DesktopOutlined, FundOutlined } from "@ant-design/icons";

import TablePagination from "../../../../components/TablePagination";
import { DownloadFilePdf } from "../../../../components/DownloadFile";
import MatchModal from "./MatchModal";
import settings from "../../../../domainConfig";

const MatchDetails = () => {
  const { marketId, eventId, cacheUrl } = useParams();
  const [activeTabs, setActiveTabs] = useState({ tab1: false, tab2: false });
  const toggleTab = (tab) => {
    setActiveTabs((prevState) => ({ ...prevState, [tab]: !prevState[tab] }));
  };
  const [activesubTab, setActivesubTab] = useState(2);

  const [matchModal, setMatchModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socketDetails, setsocketDetails] = useState(null);
  const [socket, setSocket] = useState(null);
  const [matchScoreDetails, setMatchScoreDetails] = useState(null);
  const [fancyBetDataTotal, setFancyBetDataTotal] = useState();
  const [oddsBetDatafinal, setOddsBetDatafinal] = useState();
  const [fancyCountTotal, setfancyCountTotal] = useState();
  const [oddsBetDataTotal, setOddsBetDataTotal] = useState();
  const [fancyBetDatafinal, setFancyBetDatafinal] = useState();
  const [fancyBetDatafinalFiltered, setFancyBetDatafinalFiltered] = useState();
  const [completeFancyList, setCompleteFancyList] = useState();
  const [totalSelfProfitLoss, setTotalSelfProfitLoss] = useState();
  const [bookmakerDataList, setBookmakerDataList] = useState("");
  const [activeFancy, setActiveFancy] = useState(false);
  const [activeFancyId, setActiveFancyId] = useState(null);
  const [activeFancyRow, setActiveFancyRow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFancy, setCurrentPageFancy] = useState(1);
  const [sportsbetListFinal, setSportsbetListFinal] = useState([]);
  const [showLoder, setLoader] = useState(false);
  const [bookmakerCoin, setBookmakerCoin] = useState({ max: null, min: null });
  const [sessionCoin, setSessionCoin] = useState({ max: null, min: null });
  const [isTieCoin, setIsTieCoin] = useState({ max: null, min: null });
  const [isTossCoin, setIsTossCoin] = useState({ max: null, min: null });
  const [isMatchCoin, setIsMatchCoin] = useState({ max: null, min: null });
  const [myBetsDataFilter, setMyBetsDataFilter] = useState([]);
  const [activesubMatchOddTab, setActivesubMatchOddTab] = useState(2);
  const [activesubTiedTab, setActivesubTiedTab] = useState(2);
  const [activesubTossTab, setActivesubTossTab] = useState(2);
  const [plusMinusData, setPlusMinusData] = useState([]);
  const [finalDataArray, setFinalDataArray] = useState([]);
  const [totalData, setTotalData] = useState({});







  const [fancyModalVisible, setFancyModalVisible] = useState(false);
  const [selectedFancySessionId, setSelectedFancySessionId] = useState(null);
  const [selectedFancyName, setSelectedFancyName] = useState("");
  // Naya state add karo
  const [selectedFancyBets, setSelectedFancyBets] = useState([]);
  const [selectedFancyCountTotal, setSelectedFancyCountTotal] = useState(0);
  const [selectedFancyCurrentPage, setSelectedFancyCurrentPage] = useState(1);




  const setFancyBetToggle = (session_name, session_id) => {
    setSelectedFancySessionId(session_id);
    setSelectedFancyName(session_name);
    setFancyModalVisible(true);
    setSelectedFancyCurrentPage(1);

    // Modal ke liye fetch
    handleFancyList(session_id, true);   // forModal = true
    handleFancyBetList(session_id);      // run pnl wala (yeh pehle jaisa hi rahega)
  };












  const dispatch = useDispatch();
  const history = useHistory();

  const {
    matchList,
    matchDetailsResponse,
    sportsBetsList,
    complatedFancy,
    sessionPosition,
    oddsPossition,
    completeDataLoading,
    userpositionbymarketId,
    plusMinusByMarketIdByUserWiseListdata
  } = useSelector((state) => state.UserReducer);

  const intervalIdRef = useRef(null);

  const pageSize = 20;
  const pageSizefancy = 30;


  const matchlistfromLocalStorage = JSON.parse(localStorage.getItem("matchList"))
  const matchCacheUrl = matchlistfromLocalStorage?.find(el => el.marketId === marketId)?.cacheUrl
  const eventCacheUrl = matchlistfromLocalStorage?.find(el => el.marketId === marketId)?.otherMarketCacheUrl
  const matchIframeUrl = matchlistfromLocalStorage?.find(({ marketId: id }) => id === marketId)?.scoreIframe ?? null;


  const handleTabClick = (tabIndex) => {
    setActivesubTab(tabIndex);
  };
  const handleTabMatchOddsClick = (tabIndex) => {
    setActivesubMatchOddTab(tabIndex);
  };
  const handleTabTiedClick = (tabIndex) => {
    setActivesubTiedTab(tabIndex);
  };
  const handleTabTossClick = (tabIndex) => {
    setActivesubTossTab(tabIndex);
  };



  /////////////////////////---------------------data fetching in socket and cache url  ------------------------------////////////////////////////
  useEffect(() => {

    getMarketCacheUrl(matchCacheUrl)
    getMarketEventUrl(eventCacheUrl)
    getMatchDataByMarketIdWise();
    fetchBetLists();
    completeBetLists();
    bookmakerData();
    getuserPositionByMarketIdWise()
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isConnected) {
        connectSocket();
      } else if (document.visibilityState === "hidden") {
        cleanupWebSocket();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);



    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanupWebSocket();
      clearInterval(intervalIdRef.current);
    };
  }, [eventId, marketId]);


  useEffect(() => {

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isConnected) {
        connectSocket();
      } else if (document.visibilityState === "hidden") {
        cleanupWebSocket();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);



    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanupWebSocket();
      clearInterval(intervalIdRef.current);
    };
  }, [isConnected]);

  // const setupAsyncActions = async () => {
  //   getMarketCacheUrl(matchCacheUrl)
  //   getMarketEventUrl(eventCacheUrl)
  //   getMatchDataByMarketIdWise();
  //   fetchBetLists();
  //   completeBetLists();
  //   bookmakerData();
  //   getuserPositionByMarketIdWise()

  // };

  const getMatchDataByMarketIdWise = async () => {
    let reqData = {
      marketId: marketId,
    };
    dispatch(getMatchDetail(reqData));
  };
  const getuserPositionByMarketIdWise = async () => {
    let reqData = {
      marketId: marketId,
    };
    dispatch(userPositionByMarketId(reqData));
  };

  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (
      matchDetailsResponse?.status === "COMPLETED" &&
      !hasRedirectedRef.current
    ) {
      hasRedirectedRef.current = true;
      window.location.href = "/main/dashboard/crm";
    }
  }, [matchDetailsResponse?.status]);


  useEffect(() => {
    // if(matchDetailsResponse?.status !== 'INPLAY'){
    //   history.push('/main/dashboard')

    // }
    clearInterval(intervalIdRef.current);
    getMarketCacheUrl(matchCacheUrl)
    if (matchDetailsResponse) {
      if (matchDetailsResponse?.socketPerm) {
        connectSocket(matchDetailsResponse.socketUrl);
      } else {
        callCache(matchDetailsResponse.cacheUrl);
      }
    }
  }, [matchDetailsResponse]);

  useEffect(() => {
    if (sportsBetsList) {
      const { totalFancyCount, oddsBetData, fancyBetData, totalOddsCount } =
        sportsBetsList?.data;

      setFancyBetDatafinalFiltered(fancyBetData);
      setFancyBetDatafinal(fancyBetData);
      setfancyCountTotal(sportsBetsList?.data?.totalFancyCount);
      setOddsBetDatafinal(oddsBetData);
      setOddsBetDataTotal(totalOddsCount);
      setFancyBetDataTotal(totalFancyCount)
    }
    if (!activeFancy && sportsBetsList?.data?.oddsBetData) {
      setSportsbetListFinal(sportsBetsList?.data?.oddsBetData);
    }
    if (activeFancy && sportsBetsList?.data?.fancyBetData) {
      setSportsbetListFinal(sportsBetsList?.data?.fancyBetData);
    }
    if (complatedFancy) {
      let selfProfitLossArray = complatedFancy?.map(
        (item) => item.selfProfitLoss
      );
      let totalSelfProfitLoss = selfProfitLossArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      setCompleteFancyList(complatedFancy);
      setTotalSelfProfitLoss(-1 * totalSelfProfitLoss.toFixed(2));
    }

    if (sessionPosition) {
      setSessionPositionData(sessionPosition);
    }
    if (oddsPossition) {
      setBookmakerDataList(oddsPossition);
    }
  }, [
    matchDetailsResponse,
    sportsBetsList,
    complatedFancy,
    sessionPosition,
    oddsPossition,
    activeFancy,
  ]);

  const connectSocket = (socketUrl = matchDetailsResponse?.socketUrl) => {
    if (socket && socket.connected) {
      return;
    }

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: false,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      newSocket.emit("marketByEvent", eventId);
    });

    newSocket.on(eventId, (data) => {
      setsocketDetails(JSON.parse(data));
    });

    if (matchDetailsResponse?.socketPerm) {
      newSocket.emit("JoinRoom", marketId);
      newSocket.on(marketId, (data) => {
        setMatchScoreDetails(JSON.parse(data).result);
      });
    }

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);
  };

  const callCache = (cacheUrl) => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    const newIntervalId = setInterval(() => getMarketCacheUrl(cacheUrl), 1000);
    intervalIdRef.current = newIntervalId;
  };


  // useEffect(() => {
  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [intervalId]);

  const getMarketCacheUrl = async (cacheUrl) => {
    try {
      const response = await axios.get(cacheUrl);
      setMatchScoreDetails(response?.data?.result);
    } catch (error) {
      setMatchScoreDetails(null);
      console.error("Error fetching market cache URL:", error);
    }
  };

  const getMarketEventUrl = async (eventurl) => {
    try {
      const response = await axios.get(eventurl);
      setsocketDetails(response?.data?.data);
    } catch (error) {
      setsocketDetails(null);
      console.error("Error fetching market cache URL:", error);
    }
  };


  const cleanupWebSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    const maxCoinData = matchDetailsResponse?.maxMinCoins
      ? JSON.parse(matchDetailsResponse?.maxMinCoins)
      : {
        maximum_match_bet: null,
        minimum_match_bet: null,
        maximum_session_bet: null,
        minimum_session_bet: null,
      };

    setBookmakerCoin({
      max: maxCoinData?.maximum_match_bet,
      min: maxCoinData?.minimum_match_bet,
    });
    setSessionCoin({
      max: maxCoinData?.maximum_session_bet,
      min: maxCoinData?.minimum_session_bet,
    });

    setIsTieCoin({
      max: maxCoinData?.maximum_tie_coins > 0 ? maxCoinData?.maximum_tie_coins : maxCoinData?.maximum_match_bet,
      min: maxCoinData?.minimum_match_bet,
    });

    setIsTossCoin({
      max: maxCoinData?.maximum_toss_coins > 0 ? maxCoinData?.maximum_toss_coins : maxCoinData?.maximum_match_bet,
      min: maxCoinData?.minimum_match_bet,
    });

    setIsMatchCoin({
      max: maxCoinData?.maximum_matchOdds_coins > 0 ? maxCoinData?.maximum_matchOdds_coins : maxCoinData?.maximum_match_bet,
      min: maxCoinData?.minimum_match_bet,
    });


  }, [matchDetailsResponse]);

  const [returnDataObject, setReturnDataObject] = useState({});
  const [returnDataObjectPosition, setReturnDataObjectPosition] = useState({});
  const [returnDataObject2, setReturnDataObject2] = useState({});
  const [returnDataObject2Position, setReturnDataObject2Position] = useState({});
  const [returnDataObject3, setReturnDataObject3] = useState({});
  const [returnDataObject3Position, setReturnDataObject3Position] = useState({});

  useEffect(() => {
    if (userpositionbymarketId) {
      let oddsPos = [];

      let returMatchOdds = {};
      let returMatchOddsPosition = {};
      let returnTossMatch = {};
      let returnTossMatchPosition = {};
      let returnTiedMatch = {};
      let returnTiedMatchposition = {};

      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId?.oddsPosition;
        oddsPos
          .filter((ele) => ele?.oddsType === "matchOdds")
          .forEach((data) => {
            returMatchOdds[data?._id] = data?.totalPosition.toFixed(2);
          });
        setReturnDataObject(returMatchOdds);

        oddsPos
          .filter((ele) => ele?.oddsType === "matchOdds")
          .forEach((data) => {
            returMatchOddsPosition[data?._id] = data?.Position.toFixed(2);
          });
        setReturnDataObjectPosition(returMatchOddsPosition);
      }


      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId?.oddsPosition;
        oddsPos
          .filter((ele) => ele?.oddsType === "toss")
          .forEach((data) => {
            returnTossMatch[data?._id] = data?.totalPosition.toFixed(2);
          });
        setReturnDataObject3(returnTossMatch);

        oddsPos
          .filter((ele) => ele?.oddsType === "toss")
          .forEach((data) => {
            returnTossMatchPosition[data?._id] = data?.Position.toFixed(2);
          });
        setReturnDataObject3Position(returnTossMatchPosition);
      }

      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId?.oddsPosition;
        oddsPos
          .filter((ele) => ele?.oddsType === "tiedMatch")
          .forEach((data) => {
            returnTiedMatch[data?._id] = data?.totalPosition.toFixed(2);
          });
        setReturnDataObject2(returnTiedMatch);
        oddsPos
          .filter((ele) => ele?.oddsType === "tiedMatch")
          .forEach((data) => {
            returnTiedMatchposition[data?._id] = data?.Position.toFixed(2);
          });
        setReturnDataObject2Position(returnTiedMatchposition);
      }
    }
  }, [userpositionbymarketId]);



  /////////////////////////////-------------------- bests calling every 10 sec ---------------------------------///////////////////////////////
  useEffect(() => {
    if (activeFancy) {
      handleFancyList(activeFancyId)
    } else {
      fetchBetLists();
    }
    const fetchBetListsInterval = setInterval(() => {
      if (activeFancy) {
        handleFancyList(activeFancyId)
      } else {
        fetchBetLists();
      }
    }, 7000);

    bookmakerData();
    const bookmakerDataInterval = setInterval(() => {
      bookmakerData();
    }, 5000);

    return () => {
      clearInterval(fetchBetListsInterval);
      clearInterval(bookmakerDataInterval);
    };
  }, [currentPage, pageSize, activeFancy, activeFancyId, currentPageFancy]);

  //  //////////////////////--------------------------team data and bokmaher----------------------/////////////////////////////////
  const data = [];
  if (matchScoreDetails) {

    const sortedSelectionIdData = matchScoreDetails?.team_data?.slice()  // Create a copy of the array
      .sort((a, b) => a.team_name.localeCompare(b.team_name));

    sortedSelectionIdData?.forEach((ele, i) => {
      data.push({
        key: i,
        teamName: ele.team_name,
        lgaai: ele.lgaai,
        khaai: ele.khaai,
        selectionid: ele.selectionid,
        position: activesubTab === 2 ? bookmakerDataList && bookmakerDataList?.find(item => item?._id == ele?.selectionid)?.Position : bookmakerDataList?.find(item => item?._id == ele?.selectionid)?.totalPosition

      });
    });
  }

  const bookmakerData = async () => {
    try {
      const reqData = {
        marketId: marketId,
      };
      dispatch(getOddsPosition(reqData));
    } catch (error) {
      console.error("Error fetching bet lists:", error);
      throw error;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageChangeFancy = (page) => {
    setCurrentPageFancy(page);
  };

  const handlePageChangesss = (page) => {
    setCurrentPageFancy(page);
  };

  const [data2, setData2] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  useEffect(() => {
    if (matchScoreDetails) {


      const order = {
        "STRING": 0,
        "ONLY": 1,
        "OVER": 2,
        "FALL OF": 3,
        "RUN": 4,
        "BOUNDARIES": 5,
        "HOW": 6,
        "BALLS": 7,
      };

      const sortedSessions = matchScoreDetails.session.sort((a, b) => {
        const getSessionType = (sessionName) => {
          if (sessionName.includes("ONLY")) return "ONLY";
          if (sessionName.includes("OVER")) return "OVER";
          if (sessionName.includes("FALL OF")) return "FALL OF";
          if (sessionName.includes("RUN")) return "RUN";
          if (sessionName.includes("BOUNDARIES")) return "BOUNDARIES";
          if (sessionName.includes("HOW")) return "HOW";
          if (sessionName.includes("BALLS")) return "BALLS";
          return "STRING"; // Default to STRING if none match
        };

        const typeA = getSessionType(a.session_name);
        const typeB = getSessionType(b.session_name);

        // Compare based on the defined order
        let orderComparison = order[typeA] - order[typeB];

        // If types are the same, further logic for "OVER" cases
        // If both are of type "OVER", sort based on the numeric value before "OVER"
        if (typeA === "OVER" && typeB === "OVER") {
          const numberA = parseInt(a.session_name.split(" ")[0]) || 0; // Extracting number before "OVER"
          const numberB = parseInt(b.session_name.split(" ")[0]) || 0; // Extracting number before "OVER"
          return numberA - numberB; // Compare based on numeric values
        }

        return orderComparison;
      });
      const newData = [];
      const newExpandedKeys = [];
      sortedSessions?.forEach((ele, i) => {
        if (ele.com_perm === "YES") {
          const record = {
            key: i,
            session_name: ele.session_name,
            oddsYes: ele.oddsYes,
            oddsNo: ele.oddsNo,
            runsNo: ele.runsNo,
            runsYes: ele.runsYes,
            running_status: ele.running_status,
            session_id: ele.session_id,
            remark: ele.remark ? ele.remark : null,
          };
          newData.push(record);
          if (record.remark) {
            newExpandedKeys.push(record.session_id);
          }
        }
      });
      setData2(newData);
      setExpandedRowKeys(newExpandedKeys); // Set expanded rows initially
    }
  }, [matchScoreDetails]);

  const fancyColumns = [
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
          <span className="gx-px-3 gx-py-1 gx-text-uppercase gx-fs-xl gx-font-weight-bold">
            Fancy (Comm.)
          </span>
        </div>
      ),
      dataIndex: "session_name",
      key: "session_name",
      width: "60%",

      render: (text, record) => (
        <div className="gx-bg-flex gx-flex-column">
          <div className="gx-bg-flex gx-my-0 gx-justify-content-between">
            <div className="gx-font-weight-semi-bold">
              {text}
              <div className="gx-fs-sm gx-font-weight-bold gx-text-uppercase">
                Session Limit : 50000
              </div>
            </div>

            <Button
              size="large"
              onClick={() =>
                setFancyBetToggle(record.session_name, record.session_id)
              }
            >
              B
            </Button>
          </div>
        </div>
      ),
    },

    // ================= NOT COLUMN =================
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
          <span className="gx-py-1 gx-text-uppercase gx-fs-lg gx-font-weight-bold">
            NOT
          </span>
        </div>
      ),
      dataIndex: "oddsNo",
      key: "oddsNo",
      width: "20%",
      align: "center",

      render: (text, record) => {
        if (record.running_status === "SUSPENDED") {
          return {
            children: (
              <div
                className="gx-font-weight-bold "
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                SUSPENDED
              </div>
            ),
            props: {
              colSpan: 2,
              className: "matchdtailsYesBackground",
            },
          };
        }

        return {
          children: (
            <div>
              <div className="gx-font-weight-semi-bold">
                {record.runsNo}
              </div>
              <div className="gx-font-weight-semi-bold">
                {(Number(text) * 100).toFixed(0)}
              </div>
            </div>
          ),
          props: {
            colSpan: 1,
            className: "matchdtailsNoBackground",
          },
        };
      },
    },

    // ================= YES COLUMN =================
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
          <span className="gx-py-1 gx-text-uppercase gx-fs-lg gx-font-weight-bold">
            YES
          </span>
        </div>
      ),
      dataIndex: "oddsYes",
      align: "center",
      width: "20%",

      render: (text, record) => {
        if (record.running_status === "SUSPENDED") {
          return {
            children: null,
            props: {
              colSpan: 0, // hide YES column
            },
          };
        }

        return {
          children: (
            <div>
              <div className="gx-font-weight-semi-bold">{record.runsYes}</div>
              <div className="gx-font-weight-semi-bold">
                {(Number(text) * 100).toFixed(0)}
              </div>
            </div>
          ),
          props: {
            className: "matchdtailsYesBackground",
          },
        };
      },
    }

  ];

  const expandedRowRender = (record) => {
    return record.remark ? (
      <div className="gx-font-weight-semi-bold gx-text-red">
        <span>{record.remark}</span>
      </div>
    ) : null;
  };

  //.......................................................End Of No Fancy ................................................//
  const handleFancyList = async (session_id, forModal = false) => {
    const BetListData = {
      fancyBet: true,
      isDeclare: false,
      marketId: marketId,
      selectionId: session_id,
      pageNo: forModal ? selectedFancyCurrentPage : currentPageFancy,
      size: pageSizefancy,
    };

    // Yeh dispatch karne ke baad reducer mein sportsBetsList update hoga
    // Lekin hum chahte hain modal ke liye alag rakhein
    // Option 1: Reducer mein alag field banao (better long-term)
    // Option 2: Simple — response ko yahan hi catch kar lo (temporary fix)

    // Temporary simple fix (API call direct karte hain)
    try {
      const response = await axios.post("/your-api-endpoint-for-bets", BetListData); // apna actual endpoint daalo
      const { data } = response.data;

      if (forModal) {
        setSelectedFancyBets(data?.fancyBetData || []);
        setSelectedFancyCountTotal(data?.totalFancyCount || 0);
      } else {
        // normal fancy list update (if needed elsewhere)
        setFancyBetDatafinal(data?.fancyBetData || []);
        setfancyCountTotal(data?.totalFancyCount || 0);
      }
    } catch (err) {
      console.error("Fancy bets fetch error", err);
    }
  };
  // const handleFancyList = async (session_id) => {
  //   const BetListData = {
  //     fancyBet: true,
  //     isDeclare: false,
  //     marketId: marketId,
  //     selectionId: session_id,
  //     pageNo: currentPageFancy,
  //     size: pageSizefancy,

  //   };
  //   dispatch(getSportsBetsList(BetListData));
  //   try {
  //   } catch (error) {
  //     console.error("Error fetching session position details:", error);
  //   }
  // };

  // const setFancyBetToggle = (session_name, session_id) => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  //   // call leader

  //   setActiveFancy(true);
  //   setActiveFancyId(session_id)
  //   setCurrentPageFancy(1)
  //   setCurrentPage(1)
  //   // setActiveFancyRow(session_name)
  //   handleFancyList(session_id);
  //   handleFancyBetList(session_id);
  // };


  const mybets = [
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },




    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
    },
    {
      title: "Client",
      dataIndex: "Client",
      key: "Client",
    },
    {
      title: "Agent",
      dataIndex: "Agent",
      key: "Agent",
    },

    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Loss",
      dataIndex: "Loss",
      key: "Loss",
    },
    {
      title: "Profit",
      dataIndex: "Profit",
      key: "Profit",
    },
  ];

  if (activeFancy) {
    mybets.unshift({
      title: "Runs",
      dataIndex: "Runs",
      key: "Runs",
    });
  } else {
    const pwdColumnIndex = mybets.findIndex(col => col.title === "Type");
    if (pwdColumnIndex !== -1) {
      mybets.splice(pwdColumnIndex + 1, 0, {
        title: "Odds Type",
        dataIndex: "oddsType",
        key: "oddsType",
      })
    }
  }




  const generateOddsData = () => {
    const data = [];
    sportsbetListFinal.forEach((element, index) => {
      let profit = `${element.profit
        ? Number.parseFloat(Math.abs(element.profit)).toFixed(2)
        : 0
        }`
      let loss = `${element.loss
        ? Number.parseFloat(Math.abs(element.loss)).toFixed(2)
        : 0
        }`

      if (element.type == "L") {
        profit = element.positionInfo[element.selectionId]
        loss = -1 * (element.amount)
      }

      if (element.type == "K" || element.type == "k") {
        profit = element.amount
        loss = -1 * (element.amount * element.odds)
      }

      data.push({
        key: index,
        Runs: activeFancy ? element.run : "",
        oddsType: element.oddsType,
        Rate: Number.parseFloat(100 * element.odds).toFixed(2),
        Amount: Number.parseFloat(element.amount).toFixed(2),
        Type: activeFancy
          ? element.type === "N"
            ? "NO"
            : "Yes"
          : element.type === "L"
            ? "Lagai"
            : "Khaai",
        Team: activeFancy ? element.sessionName : element.teamName,
        Client: `${element.userInfo && element.userInfo.clientName
          ? element.userInfo.clientName
          : ""
          } ${element.userInfo && element.userInfo.clientCode
            ? element.userInfo.clientCode
            : ""
          }`,
        Agent: `${element.userInfo && element.userInfo.creatorName
          ? element.userInfo.creatorName
          : ""
          }`,
        Date: `${element.createdAt
          ? moment(element.createdAt)
            .utcOffset("+05:30")
            .format("DD MMM hh:mm:ss A")
          : ""
          }`,
        Loss: Number.parseFloat(Math.abs(loss)).toFixed(2),
        Profit: Number.parseFloat(Math.abs(profit)).toFixed(2),
      });
    });
    return data;
  };

  const mybetsData = generateOddsData();
  const fetchBetLists = async () => {
    try {
      const BetListData = {
        isDeclare: false,
        oddsBet: true,
        marketId: marketId,
        pageNo: currentPage,
        size: pageSize,
      };
      dispatch(getSportsBetsList(BetListData));
    } catch (error) {
      console.error("Error fetching bet lists:", error);
      throw error;
    }
  };

  useEffect(() => {
    const filter = fancyBetDatafinal
      ? fancyBetDatafinal.filter((ele) => ele.sessionName === activeFancyRow)
      : [];

    setFancyBetDatafinalFiltered(filter);
  }, [activeFancy, fancyBetDatafinal, activeFancyRow]);

  const [sessionPositionData, setSessionPositionData] = useState(null);

  const runpldata = sessionPositionData &&
    Object.entries(sessionPositionData)?.map(([key, value]) => ({
      key,
      run: key,
      pnl: value,
    }));


  const runplcolumn = [
    {
      title: "Run",
      dataIndex: "run",
      key: "run",
    },
    {
      title: "PnL",
      dataIndex: "pnl",
      key: "pnl",
      render: (value) => (
        <span style={{ color: value >= 0 ? "green" : "red" }}>
          {value}
        </span>
      ),
    },
  ];
  const handleFancyBetList = async (session_id) => {
    let reqData = {
      marketId: marketId,
      selectionId: session_id,
    };
    dispatch(getSessionPositionBySelectionId(reqData));
    try {
    } catch (error) {
      console.error("Error fetching session position details:", error);
    }
  };

  //  //////////////////////--------------------------Completed Fancy----------------------/////////////////////////////////




  const completeBetLists = async () => {
    try {
      let reqData = {
        marketId: marketId,
      };

      await dispatch(getCompletedFancyByMarketId(reqData));
    } catch (error) {
      console.error("Error fetching bet lists:", error);
      throw error;
    }
  };
  const handleCloseMatchModal = () => {
    setMatchModal(false);
  };

  const uniqueOddsType = mybetsData && mybetsData.length > 0
    ? [...new Map(mybetsData.map(item => [item.oddsType, item])).values()]
    : [];

  // myBetsDataFilter
  async function onChangeBetList(value, option) {
    if (value === null) {
      return setMyBetsDataFilter([])
    }
    const filteredData = mybetsData?.filter(item => item.oddsType === value);
    if (filteredData.length < 0) {
      return setMyBetsDataFilter([])
    }
    return setMyBetsDataFilter(filteredData)
  }






  return (
    <div className="gx-w-100 gx-px-1">
      <div className="gx-bg-grey gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-3 gx-py-2">
        <div className="gx-fs-lg  gx-font-weight-bold gx-text-white gx-text-uppercase" >
          {matchDetailsResponse?.matchName}
        </div>
        <div className="gx-bg-flex gx-px-3">

          <button
            onClick={() => toggleTab("tab2")}
            type="button"
            className="ant-btn ant-btn-default ant-btn-sm"
          >
            <DesktopOutlined />
          </button>

          {/* Fund Button */}
          <button
            onClick={() => toggleTab("tab1")}
            type="button"
            className="ant-btn ant-btn-default ant-btn-sm"
          >
            <FundOutlined />
          </button>
        </div>
      </div>
      <Row>
        {matchDetailsResponse?.notification && (
          <Col className=" gx-text-white gx-fs-md gx-font-weight-semi-bold gx-py-1  gx-text-uppercase" xs={24} style={{ backgroundColor: "#73766F", borderTop: '2px solid white' }}>
            <marquee>{matchDetailsResponse.notification ? matchDetailsResponse.notification : null}</marquee>
          </Col>
        )}
      </Row>

      {activeTabs.tab2 && (
        <div >
          <iframe
            style={{ width: "100%", height: 280 }}
            src={matchDetailsResponse.tvUrl}
            title=" "
            className=""
          ></iframe>
        </div>

      )}
      {matchDetailsResponse?.scoreIframe || matchIframeUrl ? (
        <div className="" style={{ height: `${activeTabs.tab1 ? "310px" : "140px"}` }}>
          <iframe
            style={{ width: "100%", height: "100%", border: "none" }}
            src={matchDetailsResponse?.scoreIframe ? matchDetailsResponse?.scoreIframe : matchIframeUrl}
            title="Score-I-frame"
            className=""
          ></iframe>
        </div>
      ) : null}


      <Row className="gx-px-1 gx-py-0">
        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24}>
          <Table
            className="gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
            size="small"
            dataSource={data2}
            columns={fancyColumns}
            pagination={false}
            rowKey="session_id"
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => !!record.remark,
            }}
            expandedRowKeys={expandedRowKeys}
            onExpand={(expanded, record) => {
              setExpandedRowKeys((prevKeys) =>
                expanded
                  ? [...prevKeys, record.session_id]
                  : prevKeys.filter((key) => key !== record.session_id)
              );
            }}
            bordered
            style={{ marginTop: "16px" }}
          />
        </Col>
      </Row>
      <Row className="gx-px-1 gx-py-0">
        {showLoder ? (
          <>
            <div
              style={{ height: 70, display: "flex", justifyContent: "center" }}
              className="gx-px-3 gx-py-4 gx-w-100"
            >
              <Spin tip="Loading...."></Spin>
            </div>
          </>
        ) : (
          <Table
            rowClassName={(record, index) => {
              if (!activeFancy) {
                return record.Type === "Khaai"
                  ? "matchdtailsNoBackground"
                  : "matchdtailsYesBackground";
              } else {
                return record.Type === "NO"
                  ? "matchdtailsNoBackground"
                  : "matchdtailsYesBackground";
              }
            }}
            pagination={false}
            className="gx-w-100 gx-text-white gx-text-nowrap"
            dataSource={myBetsDataFilter && myBetsDataFilter.length > 0 ? myBetsDataFilter : mybetsData}
            columns={mybets}
            bordered
            scroll={{ x: true }}
          />
        )}

        {!activeFancy ? (
          <TablePagination
            currentPage={currentPage}
            totalItems={oddsBetDataTotal}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        ) :
          <TablePagination
            currentPage={currentPageFancy}
            totalItems={fancyCountTotal}
            pageSize={pageSizefancy}
            onPageChange={handlePageChangeFancy}
          />
        }
      </Row>

      {activeFancy && (
        <Row>
          <Table
            size="small"
            pagination={false}
            className="gx-w-100 gx-text-white gx-text-nowrap"
            dataSource={runpldata}
            bordered
            columns={runplcolumn}
            scroll={{ x: true }}
          />
        </Row>
      )}


      <Modal
        title={`${selectedFancyName || "Fancy"} Bets & Runs`}
        open={fancyModalVisible}
        onCancel={() => setFancyModalVisible(false)}
        footer={null}
        width={1000}
        destroyOnClose
      >

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "My Bets",
              children: (
                <>
                  {showLoder ? (
                    <div style={{ textAlign: "center", padding: 40 }}>
                      <Spin tip="Loading bets..." />
                    </div>
                  ) : (
                    <Table
                      rowClassName={(record) =>
                        record.Type === "NO" ? "matchdtailsNoBackground" : "matchdtailsYesBackground"
                      }
                      pagination={false}
                      dataSource={myBetsDataFilter && myBetsDataFilter.length > 0 ? myBetsDataFilter : mybetsData}
                      columns={mybets}
                      scroll={{ x: true }}
                      size="small"
                    />
                  )}

                  <div style={{ marginTop: 16 }}>
                    <TablePagination
                      currentPage={currentPageFancy}
                      totalItems={fancyCountTotal}
                      pageSize={pageSizefancy}
                      onPageChange={handlePageChangeFancy}
                    />
                  </div>
                </>
              ),
            },
            {
              key: "2",
              label: "My Run",
              children: (
                <Table
                  size="small"
                  pagination={false}
                  dataSource={runpldata}
                  columns={runplcolumn}
                  scroll={{ x: true }}
                  rowKey="run"
                />
              ),
            },
          ]}
        />

      </Modal>
    </div>
  );
};

export default MatchDetails;