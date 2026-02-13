import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Spin, Table, Select } from "antd";
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
    userpositionbymarketId
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

      // const finalOddsTotalPosTemp = bookmakerTeamData.map((teamData) => {
      //   let pushPos = 0;
      //   if (returnDataObjectTemp[teamData.betfairSelectionId]) {
      //     pushPos += returnDataObjectTemp[teamData.betfairSelectionId];
      //   }
      //   if (returnDataObjectTemp[teamData.bookmakerSelectionId]) {
      //     pushPos += returnDataObjectTemp[teamData.bookmakerSelectionId];
      //   }
      //   return { ...teamData, finalPos: pushPos };
      // });

      // setFinalOddsTotalPos(finalOddsTotalPosTemp);
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

  const columns = [
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center " >
          <div style={{ display: "flex " }}>
            <div class="flex bg-pink-400 p-2">
              <button class="px-5 py-2 bg-white gx-text-black gx-fs-xs gx-text-uppercase gx-font-weight-bold" onClick={() => handleTabClick(2)}>My Book</button>
              <button class="px-5 py-2 mr-2 bg-white gx-text-black gx-fs-xs gx-text-uppercase gx-font-weight-bold" onClick={() => handleTabClick(1)}>Ttl Book</button>
            </div>
          </div>




        </div>
      ),
      dataIndex: "teamName",
      className: "matchdtailsBlackBackground",
      key: "teamName",
      onHeaderCell: (column) => ({
        style: {
          background:
            column.key === "teamName"
              ? "gx-bg-grey"
              : "",
        },
      }),
      width: "60%",
      render: (text, record, index) => (
        <div className="">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div className={`${-1 * record?.position > 0 ? 'gx-text-primary' : -1 * record?.position < 0 ? 'gx-text-red' : record?.position == 0 ? "gx-text-black" : 'gx-text-primary'} `} >
            {record?.position ? (-1 * record?.position.toFixed(2)) : 0}
          </div>
        </div>
      ),
    },
    {
      title: "Lagai",
      dataIndex: "lgaai",
      key: "lgaai",

      width: "20%",
      className: "gx-text-uppercase matchdtailsYesBackground",
      align: "center",
      render: (text, record, index) => <div className="gx-font-weight-semi-bold">
        {(Number(text) * 100).toFixed(0)}
      </div>,
    },
    {
      title: "Khai",
      dataIndex: "khaai",
      className: "gx-text-uppercase matchdtailsNoBackground",
      key: "khaai",
      width: "20%",
      align: "center",
      render: (text, record, index) => <div className="gx-font-weight-semi-bold">
        {(Number(text) * 100).toFixed(0)}
      </div>,
    },
  ];

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
  ///////////////////////////////////-------------------odds data --------------////////////////////////
  const oddsData = [];
  if (socketDetails) {
    const matchoddsData = socketDetails?.find((el) => el.marketType === "Match Odds")




    const sortedSelectionIdData = matchDetailsResponse?.marketList
      ?.filter(el => el.marketType === 'Match Odds')[0]
      ?.selectionIdData?.slice()
      ?.sort((a, b) => a.runnerName.localeCompare(b.runnerName));

    if (matchoddsData) {
      matchoddsData.runners?.forEach((ele, i) => {

        oddsData.push({
          key: i,
          runnerName: ele?.selectionName,
          selectionId: ele.selectionId,
          lgaaiprice: socketDetails?.find(el => el.marketType === "Match Odds")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToLay[0]?.price,
          lgaaisize: socketDetails?.find(el => el.marketType === "Match Odds")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToLay[0]?.size?.toFixed(2),
          khaaiprice: socketDetails?.find(el => el.marketType === "Match Odds")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToBack[0]?.price,
          khaaisize: socketDetails?.find(el => el.marketType === "Match Odds")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToBack[0]?.size?.toFixed(2),
          oddsposition:
            activesubMatchOddTab === 2
              ? (returnDataObjectPosition[ele.selectionId] != 0
                ? returnDataObjectPosition[ele.selectionId]
                : 0)
              : (returnDataObject[ele.selectionId] != 0
                ? returnDataObject[ele.selectionId]
                : 0)
        });

      });
    }
  }
  const oddsColumn = [
    {
      title: (
        <div
          style={{ display: "flex " }}
          className="gx-bg-flex gx-justify-content-between minMax"
        >
          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
            <div style={{ display: "flex " }}>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubMatchOddTab === 1 ? "#fff" : "#eb6d88",

                  color: activesubMatchOddTab === 1 ? "black" : "white ",
                }}
                onClick={() => handleTabMatchOddsClick(1)}
              >
                Ttl Book
              </div>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubMatchOddTab === 2 ? "#fff" : "#eb6d88",
                  color: activesubMatchOddTab === 2 ? "black" : "white",
                }}
                onClick={() => handleTabMatchOddsClick(2)}
              >
                My Book
              </div>
            </div>
          </div>
          <div>
            <div style={{ textWrap: "nowrap" }}>
              Min: {isMatchCoin?.min} Max: {isMatchCoin?.max}
            </div>
            <div className="gx-text-center">Match Odds</div>
          </div>
        </div>
      ),
      dataIndex: "runnerName",
      className: "matchdtailsBlackBackground",
      key: "runnerName",
      onHeaderCell: (column) => ({
        style: {
          background:
            column.key === "runnerName"
              ? "linear-gradient(to right, #ef839b, #63b7f7)"
              : "",
        },
      }),
      width: "60%",
      render: (text, record, index) => (
        <div className="">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div className={`gx-font-weight-semi-bold ${(record?.oddsposition ? -1 * record?.oddsposition : 0) >= 0 ? "gx-text-primary" : "gx-text-red"}`} >{record?.oddsposition ? -1 * record?.oddsposition : 0}</div>
        </div>
      ),
    }
    ,
    {
      title: "Lagai",
      dataIndex: "khaai",
      className: "matchdtailsYesBackground",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "khaai" ? " #63b7f7" : "",
        },
      }),
      key: "khaai",
      width: "20%",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {record.khaaiprice}
          </span>
          <span className="gx-fs-xs">
            {record.khaaisize}
          </span>
        </div>
      ),
    },
    {
      title: "Khai",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "lgaai" ? "#ef839b " : "",
        },
      }),
      className: "matchdtailsNoBackground",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {record.lgaaiprice}
          </span>
          <span className="gx-fs-xs">
            {record.lgaaisize}
          </span>
        </div>
      ),
    }
  ];



  ///////////////////////////////////-------------------Tied data --------------////////////////////////

  const tiedData = [];
  // if (matchDetailsResponse) {
  //   const sortedSelectionIdData = matchDetailsResponse?.marketList
  //     ?.filter(el => el.marketType === 'Tied Match')[0]
  //     ?.selectionIdData?.slice()
  //     ?.sort((a, b) => a.sortPriority - b.sortPriority);

  //   sortedSelectionIdData?.forEach((ele, i) => {
  //     tiedData.push({

  if (socketDetails) {

    const tiedMatchData = socketDetails?.find((el) => el?.marketType === "Tied Match")

    // const sortedSelectionIdData = tiedMatchData?.selectionIdData?.slice()
    //   ?.sort((a, b) => a.sortPriority - b.sortPriority);
    if (tiedMatchData) {
      tiedMatchData.runners?.forEach((ele, i) => {
        tiedData.push({
          key: i,
          runnerName: ele?.selectionName,
          selectionId: ele.selectionId,
          lgaaiprice: socketDetails?.find(el => el?.marketType === "Tied Match")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToLay[0]?.price,
          lgaaisize: socketDetails?.find(el => el?.marketType === "Tied Match")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToLay[0]?.size.toFixed(2),
          khaaiprice: socketDetails?.find(el => el?.marketType === "Tied Match")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToBack[0]?.price,
          khaaisize: socketDetails?.find(el => el?.marketType === "Tied Match")?.runners?.find(item => item.selectionId === ele.selectionId)?.ex?.availableToBack[0]?.size.toFixed(2),
          tiedposition:
            activesubTiedTab === 2
              ? (returnDataObject2Position[ele?.selectionId] != 0
                ? returnDataObject2Position[ele?.selectionId]
                : 0)
              : (returnDataObject2[ele?.selectionId] != 0
                ? returnDataObject2[ele?.selectionId]
                : 0)
        });

      });
    }
  }
  const tiedColumn = [
    {
      title: (
        <div
          style={{ display: "flex " }}
          className="gx-bg-flex gx-justify-content-between minMax"
        >
          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
            <div style={{ display: "flex " }}>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubTiedTab === 1 ? "#fff" : "#eb6d88",

                  color: activesubTiedTab === 1 ? "black" : "white ",
                }}
                onClick={() => handleTabTiedClick(1)}
              >
                Ttl Book
              </div>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubTiedTab === 2 ? "#fff" : "#eb6d88",
                  color: activesubTiedTab === 2 ? "black" : "white",
                }}
                onClick={() => handleTabTiedClick(2)}
              >
                My Book
              </div>
            </div>
          </div>
          <div>
            <div style={{ textWrap: "nowrap" }}>
              Min: {isTieCoin?.min} Max: {isTieCoin?.max}
            </div>
            <div className="gx-text-center">Tied Match</div>
          </div>
        </div>
      ),

      dataIndex: "runnerName",
      className: "matchdtailsBlackBackground",
      key: "runnerName",
      onHeaderCell: (column) => ({
        style: {
          background:
            column.key === "runnerName"
              ? "linear-gradient(to right, #ef839b, #63b7f7)"
              : "",
        },
      }),
      width: "60%",
      render: (text, record, index) => (
        <div className="">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div className={`gx-font-weight-semi-bold  ${(record?.tiedposition ? -1 * record?.tiedposition : 0) >= 0 ? 'gx-text-primary' : 'gx-text-red'} `}>{record?.tiedposition ? -1 * record?.tiedposition : 0}</div>
        </div>
      ),
    }
    ,
    {
      title: "Lagai",
      dataIndex: "khaai",
      className: "matchdtailsYesBackground",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "khaai" ? " #63b7f7" : "",
        },
      }),
      key: "khaai",
      width: "20%",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {record.khaaiprice}
          </span>
          <span className="gx-fs-xs">
            {record.khaaisize}
          </span>
        </div>
      ),
    },
    {
      title: "Khai",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "lgaai" ? "#ef839b" : "",
        },
      }),
      className: "matchdtailsNoBackground",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {record.lgaaiprice}
          </span>
          <span className="gx-fs-xs">
            {record.lgaaisize}
          </span>
        </div>
      ),
    }
  ];



  ///////////////////////////////////-------------------Toss data --------------////////////////////////
  const tossData = [];
  if (matchScoreDetails) {
    const tossMarket = matchScoreDetails?.toss_data;

    if (tossMarket) {
      tossMarket.forEach((ele, i) => {
        tossData.push({
          key: i,
          runnerName: ele?.team_name,
          selectionId: ele.selectionid,
          lgaaiprice: ele.lgaai,
          lgaaisize: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToLay[0]?.size.toFixed(2),
          khaaiprice: ele.khaai,
          khaaisize: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToBack[0]?.size.toFixed(2),
          tossposition:
            activesubTossTab === 2
              ? (returnDataObject3Position[ele?.selectionid] != 0
                ? returnDataObject3Position[ele?.selectionid]
                : 0)
              : (returnDataObject3[ele?.selectionid] != 0
                ? returnDataObject3[ele?.selectionid]
                : 0)

          // lgaaiprice: Number(ele.lgaai) * 100,
          // lgaaisize: socketDetails
          //   ?.find((el) => el.marketType === "To Win the Toss")
          //   ?.runners?.find((item) => item.selectionId === ele.selectionid)
          //   ?.ex?.availableToLay[0]?.size.toFixed(2),
          // khaaiprice: Number(ele.khaai) * 100,
          // khaaisize: socketDetails
          //   ?.find((el) => el.marketType === "To Win the Toss")
          //   ?.runners?.find((item) => item.selectionId === ele.selectionid)
          //   ?.ex?.availableToBack[0]?.size.toFixed(2),
        });
      });
    }
  }

  const tossColumn = [
    {
      title: (
        <div
          style={{ display: "flex " }}
          className="gx-bg-flex gx-justify-content-between minMax"
        >
          <div className="gx-bg-flex gx-justify-content-between gx-align-items-center minMax">
            <div style={{ display: "flex " }}>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubTossTab === 1 ? "#fff" : "#eb6d88",

                  color: activesubTossTab === 1 ? "black" : "white ",
                }}
                onClick={() => handleTabTossClick(1)}
              >
                Ttl Book
              </div>
              <div
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activesubTossTab === 2 ? "#fff" : "#eb6d88",
                  color: activesubTossTab === 2 ? "black" : "white",
                }}
                onClick={() => handleTabTossClick(2)}
              >
                My Book
              </div>
            </div>
          </div>
          <div>
            <div style={{ textWrap: "nowrap" }}>
              Min: {isTossCoin?.min} Max: {isTossCoin?.max}
            </div>
            <div className="gx-text-center">Toss Data</div>
          </div>
        </div>
      ),
      dataIndex: "runnerName",
      className: "matchdtailsBlackBackground",
      key: "runnerName",
      onHeaderCell: (column) => ({
        style: {
          background:
            column.key === "runnerName"
              ? "linear-gradient(to right, #ef839b, #63b7f7)"
              : "",
        },
      }),
      width: "60%",
      render: (text, record, index) => (
        <div className="">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div className={` gx-font-weight-semi-bold   ${(record?.tossposition ? -1 * record?.tossposition : 0) >= 0 ? 'gx-text-primary' : 'gx-text-red'}`}>{record?.tossposition ? -1 * record?.tossposition : 0}</div>
        </div>
      ),
    }
    ,
    {
      title: "Lagai",
      dataIndex: "khaai",
      className: "matchdtailsYesBackground",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "khaai" ? "#63b7f7" : "",
        },
      }),
      key: "khaai",
      width: "20%",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {Number(record.lgaaiprice) * 100}
          </span>
          <span className="gx-fs-xs">
            100
          </span>
        </div>
      ),
    },
    {
      title: "Lay",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "lgaai" ? "#ef839b" : "",
        },
      }),
      className: "matchdtailsNoBackground",
      align: "center",
      render: (text, record, index) => (
        <div className="gx-font-weight-semi-bold gx-bg-flex gx-flex-column">
          <span>
            {0}
          </span>
          <span className="gx-fs-xs">
            {100}
          </span>
        </div>
      ),
    }
  ];




  //  //////////////////////--------------------------fancy data----------------------/////////////////////////////////
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageChangeFancy = (page) => {
    setCurrentPageFancy(page);
  };

  const handlePageChangesss = (page) => {
    setCurrentPageFancy(page);
  };

  // const data2 = [];
  // if (matchScoreDetails) {

  //   const sortedSessions = matchScoreDetails.session.sort((a, b) => {
  //     const getInitialChar = (str) => str.trim().charAt(0);

  //     // Extract starting characters
  //     const charA = getInitialChar(a.session_name);
  //     const charB = getInitialChar(b.session_name);

  //     // Check if characters are digits
  //     const isDigitA = /\d/.test(charA);
  //     const isDigitB = /\d/.test(charB);

  //     // Sorting by whether the characters are digits or letters
  //     if (isDigitA && !isDigitB) return -1;
  //     if (!isDigitA && isDigitB) return 1;

  //     // If both are digits or both are letters, sort by the actual name
  //     if (isDigitA && isDigitB) {
  //       // Sort numerically if both start with digits
  //       return parseInt(charA, 10) - parseInt(charB, 10);
  //     } else {
  //       // Sort alphabetically if both start with letters
  //       return a.session_name.localeCompare(b.session_name);
  //     }
  //   });

  //   sortedSessions?.forEach((ele, i) => {

  //     if (ele.com_perm === 'YES') {
  //       data2.push({
  //         key: i,
  //         session_name: ele.session_name,
  //         oddsYes: ele.oddsYes,
  //         oddsNo: ele.oddsNo,
  //         runsNo: ele.runsNo,
  //         runsYes: ele.runsYes,
  //         running_status: ele.running_status,
  //         session_id: ele.session_id,
  //         remark: ele.remark ? ele.remark : null,
  //       });
  //     }
  //   });
  // }
  // const fancyColumns = [
  //   {
  //     title: (
  //       <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
  //         <span className="gx-px-3 gx-py-1 gx-bg-primary ">Fancy</span>
  //         <span style={{ textWrap: "nowrap" }}>
  //           Min: {sessionCoin?.min}<br /> Max: {sessionCoin?.max}
  //         </span>
  //       </div>
  //     ),
  //     dataIndex: "session_name",
  //     key: "session_name",
  //     width: "60%",
  //     padding: "0px",
  //     onHeaderCell: (column) => ({
  //       style: {
  //         background:
  //           column.key === "session_name"
  //             ? "linear-gradient(to right, #ef839b, #63b7f7)"
  //             : "",
  //       },
  //     }),
  //     className: "",

  //     render: (text, record, index) => {
  //       return (
  //         <div className="gx-bg-flex gx-flex-column">


  //           <div className="gx-bg-flex gx-my-0">
  //             <div className="gx-font-weight-semi-bold">{text}</div>

  //             <Button
  //               onClick={() =>
  //                 setFancyBetToggle(record.session_name, record.session_id)
  //               }
  //               style={{
  //                 height: "30px",
  //                 backgroundColor: "#98D77F",
  //                 color: "white",
  //               }}
  //               className=" gx-my-0  "
  //             >
  //               Book
  //             </Button>
  //           </div>

  //           {record?.remark && (
  //             <marquee className="gx-font-weight-semi-bold gx-text-red ">
  //               {record?.remark}
  //             </marquee>
  //           )}

  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: "No",
  //     dataIndex: "oddsNo",
  //     key: "oddsNo",
  //     width: "20%",
  //     onCell: (record, rowIndex) => ({
  //       className:
  //         record.running_status === "SUSPENDED"
  //           ? "matchdtailsSuspendBackground"
  //           : "matchdtailsNoBackground",
  //     }),

  //     align: "center",
  //     onHeaderCell: (column) => ({
  //       style: {
  //         backgroundColor: column.key === "oddsNo" ? " #ef839b" : "",
  //       },
  //     }),
  //     render: (text, record) => {
  //       return record.running_status !== "SUSPENDED" ? (
  //         <div>
  //           <div className="gx-font-weight-semi-bold">{record.runsNo}</div>
  //           <div className="gx-font-weight-semi-bold">
  //             {(Number(text) * 100).toFixed(0)}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className=" gx-font-weight-light gx-py-1" style={{ fontSize: '8px' }}>SUSPENDED</div>
  //       );
  //     },
  //   },
  //   {
  //     title: "YES",
  //     dataIndex: "oddsYes",
  //     width: "20%",
  //     onCell: (record) => ({
  //       className:
  //         record.running_status === "SUSPENDED"
  //           ? "matchdtailsSuspendBackground"
  //           : "matchdtailsYesBackground",
  //     }),
  //     key: "oddsYes",
  //     onHeaderCell: (column) => ({
  //       style: {
  //         backgroundColor: column.key === "oddsYes" ? "#63b7f7" : "",
  //       },
  //     }),
  //     align: "center",
  //     render: (text, record) => {
  //       return record.running_status !== "SUSPENDED" ? (
  //         <div>
  //           <div className="gx-font-weight-semi-bold">{record.runsYes}</div>
  //           <div className="gx-font-weight-semi-bold">
  //             {(Number(text) * 100).toFixed(0)}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="gx-fs-xs gx-py-1" style={{ fontSize: '8px' }}>SUSPENDED</div>
  //       );
  //     },
  //   },
  // ];


  //...................................................... No Comm Fancy ..............................................//


  const [data2, setData2] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  useEffect(() => {
    if (matchScoreDetails) {
      // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
      //   const getInitialChar = (str) => str.trim().charAt(0);

      //   // Extract starting characters
      //   const charA = getInitialChar(a.session_name);
      //   const charB = getInitialChar(b.session_name);

      //   // Check if characters are digits
      //   const isDigitA = /\d/.test(charA);
      //   const isDigitB = /\d/.test(charB);

      //   // Sorting by whether the characters are digits or letters
      //   if (isDigitA && !isDigitB) return -1;
      //   if (!isDigitA && isDigitB) return 1;

      //   // If both are digits or both are letters, sort by the actual name
      //   if (isDigitA && isDigitB) {
      //     // Sort numerically if both start with digits
      //     return parseInt(charA, 10) - parseInt(charB, 10);
      //   } else {
      //     // Sort alphabetically if both start with letters
      //     return a.session_name.localeCompare(b.session_name);
      //   }
      // });


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






  const [NoCommFancyData, setNoCommFancyData] = useState([]);
  const [expandedRowKeysNoComm, setExpandedRowKeysNoComm] = useState([]);
  useEffect(() => {
    if (matchScoreDetails) {
      // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
      //   const getInitialChar = (str) => str.trim().charAt(0);

      //   // Extract starting characters
      //   const charA = getInitialChar(a.session_name);
      //   const charB = getInitialChar(b.session_name);

      //   // Check if characters are digits
      //   const isDigitA = /\d/.test(charA);
      //   const isDigitB = /\d/.test(charB);

      //   // Sorting by whether the characters are digits or letters
      //   if (isDigitA && !isDigitB) return -1;
      //   if (!isDigitA && isDigitB) return 1;

      //   // If both are digits or both are letters, sort by the actual name
      //   if (isDigitA && isDigitB) {
      //     // Sort numerically if both start with digits
      //     return parseInt(charA, 10) - parseInt(charB, 10);
      //   } else {
      //     // Sort alphabetically if both start with letters
      //     return a.session_name.localeCompare(b.session_name);
      //   }
      // });

      const order = {
        "STRING": 0,
        "ONLY": 1,
        "OVER": 2,
        // "FALL OF": 3,
        "BHAV": 3,
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
        if (ele.com_perm === "NO") {
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
      setNoCommFancyData(newData);
      setExpandedRowKeysNoComm(newExpandedKeys);
    }
  }, [matchScoreDetails]);


  const NoCommfancyColumns = [
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-between gx-align-items-center gx-px-1">
          <span className="gx-px-3 gx-py-1 gx-bg-primary">No Comm. Fancy</span>
          <span style={{ textWrap: "nowrap" }}>
            Min: {sessionCoin?.min}
            <br />
            Max: {sessionCoin?.max}
          </span>
        </div>
      ),
      dataIndex: "session_name",
      key: "session_name",
      width: "60%",
      onHeaderCell: (column) => ({
        style: {
          background:
            column.key === "session_name"
              ? "linear-gradient(to right, #ef839b, #63b7f7)"
              : "",
        },
      }),
      render: (text, record) => (
        <div className="gx-bg-flex gx-flex-column">
          <div className="gx-bg-flex gx-my-0">
            <div className="gx-font-weight-semi-bold">{text}</div>
            <Button
              onClick={() =>
                setFancyBetToggle(record.session_name, record.session_id)
              }
              style={{
                height: "30px",
                backgroundColor: "#98D77F",
                color: "white",
              }}
              className="gx-my-0"
            >
              Book
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "No",
      dataIndex: "oddsNo",
      key: "oddsNo",
      width: "20%",
      align: "center",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsNoBackground",
      }),
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "oddsNo" ? " #ef839b" : "",
        },
      }),
      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div>
            <div className="gx-font-weight-semi-bold">{record.runsNo}</div>
            <div className="gx-font-weight-semi-bold">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <div className="gx-font-weight-light gx-py-1" style={{ fontSize: "8px" }}>
            SUSPENDED
          </div>
        );
      },
    },
    {
      title: "YES",
      dataIndex: "oddsYes",
      width: "20%",
      align: "center",

      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsYesBackground",
      }),
      key: "oddsYes",
      onHeaderCell: (column) => ({
        style: {
          backgroundColor: column.key === "oddsYes" ? "#63b7f7" : "",
        },
      }),

      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div>
            <div className="gx-font-weight-semi-bold">{record.runsYes}</div>
            <div className="gx-font-weight-semi-bold">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <div className="gx-fs-xs gx-py-1" style={{ fontSize: "8px" }}>
            SUSPENDED
          </div>
        );
      },
    },
  ];







  //.......................................................End Of No Fancy ................................................//

  const handleFancyList = async (session_id) => {
    const BetListData = {
      fancyBet: true,
      isDeclare: false,
      marketId: marketId,
      selectionId: session_id,
      pageNo: currentPageFancy,
      size: pageSizefancy,

    };
    dispatch(getSportsBetsList(BetListData));
    try {
      // let userBetHistory = await httpPost("sports/betsList", BetListData);
      // if (userBetHistory && userBetHistory.data) {
      //   const { fancyBetData } = userBetHistory.data;
      //   setFancyBetDatafinalFiltered(fancyBetData)
      // }
    } catch (error) {
      console.error("Error fetching session position details:", error);
    }
  };

  const setFancyBetToggle = (session_name, session_id) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    // call leader

    setActiveFancy(true);
    setActiveFancyId(session_id)
    setCurrentPageFancy(1)
    setCurrentPage(1)
    // setActiveFancyRow(session_name)
    handleFancyList(session_id);
    handleFancyBetList(session_id);
  };

  //  //////////////////////--------------------------match bets data----------------------/////////////////////////////////
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
    // Insert "Odds Type" before the "Type" column
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
        // fancyBet: true,
        isDeclare: false,
        oddsBet: true,
        marketId: marketId,
        pageNo: currentPage,
        size: pageSize,
      };
      dispatch(getSportsBetsList(BetListData));
      // const userBetHistory = await httpPost("sports/betsList", BetListData);
      // if (userBetHistory && userBetHistory.data) {
      //   const { oddsBetData, fancyBetData, totalOddsCount } = userBetHistory.data;

      //   // setFancyBetDatafinal(fancyBetData)
      //   setOddsBetDatafinal(oddsBetData);
      //   setOddsBetDataTotal(totalOddsCount);
      // }
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

  ////////////////////////////////////----------------------Runs And PL ----------------------////////////////////
  const [sessionPositionData, setSessionPositionData] = useState(null);
  const runpldata =
    sessionPositionData &&
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
    },
  ];
  const handleFancyBetList = async (session_id) => {
    let reqData = {
      marketId: marketId,
      selectionId: session_id,
    };
    dispatch(getSessionPositionBySelectionId(reqData));
    try {
      // let sessionPositionDetails = await httpPost("sports/getSessionPositionBySelectionId", reqData);
      // if (sessionPositionDetails && sessionPositionDetails.data) {
      //   setSessionPositionData(sessionPositionDetails.data);
      // setSessionPositionData(sessionPositionDetails.data); setSessionPositionData(sessionPositionDetails.data); setSessionPositionData(sessionPositionDetails.data);
      // }
    } catch (error) {
      console.error("Error fetching session position details:", error);
    }
  };

  //  //////////////////////--------------------------Completed Fancy----------------------/////////////////////////////////
  const completedFancyColumn = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "P&L",
      dataIndex: "pl",
      key: "pl",
    },
    {
      title: "Won By",
      dataIndex: "wonBy",
      key: "wonBy",
    },
    {
      title: "Net P&L",
      dataIndex: "netPl",
      key: "netPl",
      render: (text, record) => (
        <div className={`${Number(text) > 0 ? "gx-text-green-0" : Number(text) < 0 ? "gx-text-red" : "gx-text-black"}`}>
          {text}
        </div>

      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Link
          to={`/components/showBetsList/details-show-bet-list/${marketId}/${record._id}`}
        >
          <Button
            style={{ backgroundColor: "#FF5500" }}
            className="gx-text-white gx-border-redius0"
            size="small"
          >
            Show Bets
          </Button>
        </Link>
      ),
    },
  ];


  const generateCompleteBetData = () => {
    const data = [];
    if (!completeFancyList) {
      return;
    }
    // selfProfitLoss
    completeFancyList?.forEach((element, index) => {
      data.push({
        key: index,
        title: element.fancyName ? element.fancyName : "",
        pl: element.selfProfitLoss
          ? Number.parseFloat(Math.abs(element?.selfProfitLoss)).toFixed(2)
          : 0,
        wonBy: element.declareRun ? element.declareRun : 0,
        netPl: element.selfProfitLoss
          ? Number.parseFloat(-1 * element?.selfProfitLoss).toFixed(2)
          : 0,
        _id: element._id,
      });
    });
    return data;
  };

  let completedData = generateCompleteBetData();
  completedData = completedData?.sort((a, b) => {
    // Helper functions
    const getInitialChar = (str) => str.trim().charAt(0);
    const startsWithDigit = (str) => /^\d/.test(str);
    const includesOver = (str) => /OVER/.test(str);
    const getNumericPart = (str) =>
      parseInt(str.match(/^\d+/)?.[0] || "0", 10);
    const containsFirst = (str) =>
      /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

    // Extract session names
    const nameA = a.title;
    const nameB = b.title;

    // Check properties of the session names
    const isDigitA = startsWithDigit(nameA);
    const isDigitB = startsWithDigit(nameB);
    const includesOverA = includesOver(nameA);
    const includesOverB = includesOver(nameB);
    const containsFirstA = containsFirst(nameA);
    const containsFirstB = containsFirst(nameB);

    // Handle cases where either session contains "1ST" or "FIRST"
    if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
    if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

    // First priority: Digits with "OVER" come before digits without "OVER"
    if (isDigitA && isDigitB) {
      if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
      if (!includesOverA && includesOverB) return 1; // "OVER" comes after non-"OVER"

      // If both have or don't have "OVER", sort numerically
      const numA = getNumericPart(nameA);
      const numB = getNumericPart(nameB);
      return numA - numB;
    }

    // Second priority: Digits come before letters
    if (isDigitA && !isDigitB) return -1; // Digits come before letters
    if (!isDigitA && isDigitB) return 1; // Letters come after digits

    // Third priority: Sort alphabetically for letters
    return nameA.localeCompare(nameB);
  });




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
        <div className="" style={{ height: `${activeTabs.tab1 ? "260px" : "80px"}` }}>
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
            className="gx-w-100 gx-mx-0 gx-my-0"
            size="small"
            rowHoverable={false}
            title=""
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered
            style={{ marginTop: "16px" }}
          />
          {settings?.isMatchOddsFlag && matchDetailsResponse?.isMatchOdds && socketDetails?.find(el => el.marketType === "Match Odds") &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              dataSource={oddsData}
              columns={oddsColumn}
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />}
          {settings?.isTiedFlag && matchDetailsResponse?.isTieOdds && matchScoreDetails?.team_data?.length <= 2 && socketDetails?.find(el => el.marketType === "Tied Match") &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              dataSource={tiedData}
              columns={tiedColumn}
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />}
          {matchDetailsResponse?.isToss && socketDetails?.find(el => el.marketType === "To Win the Toss") && tossData?.length > 0 &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              dataSource={tossData}
              columns={tossColumn}
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />
          }
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
          {/* <Table
            className="gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
            size="small"
            title=""
            dataSource={data2}
            columns={fancyColumns}
            cellPaddingBlockSM
            pagination={false}
            bordered
            style={{ marginTop: "16px" }}
          /> */}
          {/* {NoCommFancyData && NoCommFancyData.length > 0 &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
              size="small"
              title=""
              dataSource={NoCommFancyData}
              columns={NoCommfancyColumns}
              cellPaddingBlockSM
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />} */}
          {settings?.noFancyMatchDetails && NoCommFancyData && NoCommFancyData.length > 0 &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0 gx-table-responsive"
              size="small"
              dataSource={NoCommFancyData}
              columns={NoCommfancyColumns}
              pagination={false}
              rowKey="session_id"
              expandable={{
                expandedRowRender,
                rowExpandable: (record) => !!record.remark,
              }}
              expandedRowKeys={expandedRowKeysNoComm}
              onExpand={(expanded, record) => {
                setExpandedRowKeysNoComm((prevKeys) =>
                  expanded
                    ? [...prevKeys, record.session_id]
                    : prevKeys.filter((key) => key !== record.session_id)
                );
              }}
              bordered
              style={{ marginTop: "16px" }}
            />
          }
        </Col>
      </Row>

      <Row className="gx-px-1 gx-py-0">
        <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-2 gx-fs-xl gx-text-uppercase  gx-text-white">
          {/* {activeFancy ? "Fancy Bets" : "Match Bets"}{" "}
          {activeFancy
            ? [`- ${sportsbetListFinal ? sportsbetListFinal.length : ""}`]
            : [`- ${oddsBetDataTotal ? oddsBetDataTotal : 0}`]} */}
          {/* {activeFancy && (

            <Button
              onClick={() => {
                setActiveFancy()
                setActiveFancyId(null)
                setCurrentPageFancy(1)
                setCurrentPage(1)
              }}
              className="gx-my-0  gx-bg-primary gx-text-white"
            >
              Match Bets
            </Button>

          )} */}
          <div>Match Stats</div>
          <div className=" gx-py-2 gx-px-1  gx-text-white gx-text-uppercase">
            <Select className="gx-text-uppercase  gx-bg-grey  "
              placeholder="Select a OddsType "
              showSearch
              optionFilterProp="children"
              onChange={onChangeBetList}
              style={{ width: 150 }}
            >
              <Option className="gx-text-uppercase"> All OddsType </Option>
              {uniqueOddsType && uniqueOddsType?.length > 0 ? uniqueOddsType?.map((item, index) => (
                <Option className="gx-text-uppercase"
                  key={index}
                  value={item.oddsType}
                  label={`${item.oddsType}`}
                >
                  {item.oddsType}
                </Option>
              )) : null}
            </Select>
          </div>
          {/* <DownloadFilePdf data={mybetsData} fileName={`matchbetlist`} /> */}
        </div>

        {/* loadin */}
        {showLoder ? (
          <>
            {/* LOADING...... */}
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
      <Row className="gx-px-1 gx-py-0 gx-my-3">
        <div className="gx-bg-grey gx-w-100 gx-bg-flex gx-align-items-center gx-px-2 gx-py-3 gx-mb-1 gx-text-uppercase gx-text-white">
          <span className="gx-fs-lg">{`Completed Fancy`}</span>{" "}
          <Button
            onClick={() => completeBetLists()}
            type="default"
            loading={completeDataLoading}
            size="small"
            className="gx-bg-light-grey btn  "
          >
            Refresh
          </Button>
        </div>
        {/* 

        <Col xl={10} xs={24}>
          <div className="gx-fs-lg gx-py-2 gx-font-weight-semi-bold">Total :
            <span className={`gx-px-2 ${totalSelfProfitLoss > 0 ? 'gx-text-green-0' : totalSelfProfitLoss < 0 ? 'gx-text-red' : 'gx-text-black'}`}> {totalSelfProfitLoss}</span>

          </div>
        </Col> */}

        <Table
          pagination={false}
          className="gx-text-uppercase gx-w-100"
          bordered
          dataSource={completedData}
          columns={completedFancyColumn}
          scroll={{ x: true }}
          size="small"
        />
      </Row>
    </div>
  );
};

export default MatchDetails;