
import React, { useEffect, useRef, useState } from "react";
import Widget from "components/Widget/index";

import axios from "axios";
import io from 'socket.io-client';
import { Card, Col, Divider, Row, Table, Tag, Typography } from "antd";
const CasinoIframeResult = ({ diamondcasinobyeventid, eventId, gameName, betLists }) => {
  const [casinoData, setCasinoData] = useState({});
  const [isposArray, setIsposArray] = useState({})
  const socketRef = useRef(null);
  let userInfo = JSON.parse(localStorage.getItem('user_id'));

  const { Text } = Typography;
  useEffect(() => {
    casinoByEventIdList();


    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [eventId, diamondcasinobyeventid]);

  useEffect(() => {
    updatePos(casinoData?.data?.t1[0]?.mid)
  }, [casinoData])

  const getTagStyle = (result) => {
    switch (result) {
      case "1":
        return {
          backgroundColor: "#fff2e8",
          borderColor: "#ffbb96",
          color: "#d4380d",
        };
      case "2":
        return {
          backgroundColor: "#e6f4ff",
          borderColor: "#91caff",
          color: "#0958d9",
        };
      case "3":
        return {
          backgroundColor: "#f6ffed",
          borderColor: "#b7eb8f",
          color: "#389e0d",
        };
      default:
        return {
          backgroundColor: "#f5f5f5",
          borderColor: "#d9d9d9",
          color: "#999",
        };
    }
  };

  const getTagStyle1 = (result) => {
    switch (result) {
      case "31": // D
        return {
          backgroundColor: "#FFF1F0",
          borderColor: "#FF4D4F",
          color: "#FF4D4F",
        };

      case "11": // T
        return {
          backgroundColor: "#F6FFED",
          borderColor: "#52C41A",
          color: "#52C41A",
        };

      case "21": // L
        return {
          backgroundColor: "#E6F7FF",
          borderColor: "#1890FF",
          color: "#1890FF",
        };

      default:
        return {
          backgroundColor: "#F5F5F5",
          borderColor: "#D9D9D9",
          color: "#999",
        };
    }
  };

  // useEffect(() => {
  //   casinoByEventIdList();
  // }, [diamondcasinobyeventid]); // Add diamondcasinobyeventid to dependency array if needed

  const casinoByEventIdList = () => {
    if (diamondcasinobyeventid?.fetchData === "socket") {
      callSocket(diamondcasinobyeventid?.socketURL, diamondcasinobyeventid?.shortName);
    } else {
      callCache(diamondcasinobyeventid?.cacheURL);
    }
  };

  const callSocket = (socketURL, shortName) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.disconnect();
    }



    const socket = io.connect(socketURL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99,
    });

    socket.emit('JoinRoom', shortName);

    socket.on(shortName, data => {
      setCasinoData(data);
      updatePos(data?.data?.t1[0]?.mid)
    });



    socketRef.current = socket;

  };




  const getMarketCacheUrl = (cacheURL) => {
    axios.get(cacheURL)
      .then((response) => {
        setCasinoData(response.data.data);
      })
      .catch((error) => {
        console.error('Cache data URL error:', error);
      });
  };

  const callCache = (cacheUrl) => {
    if (cacheUrl) {
      getMarketCacheUrl(cacheUrl);
      let cacheInterval = setInterval(() => {
        getMarketCacheUrl(cacheUrl);
      }, 1000);
      // Optional: Clear interval on component unmount
      return () => clearInterval(cacheInterval);
    } else {
      console.error('Cache URL is undefined or null');
    }
  };


  const updatePos = async (currentRoundId) => {
    console.log(userInfo, "userInfouserInfouserInfo");


    if (betLists) {
      const filteredBets = betLists?.filter((element) => element?.roundId == currentRoundId);

      let pushPos = {};
      filteredBets?.forEach((bet) => {
        const posArray = bet?.posArray;


        Object.entries(posArray).forEach(([key, value]) => {
          pushPos[key] = (pushPos[key] || 0) + Number(value * (100 - userInfo?.data?.casinoShare) / 100);
        });
      });




      setIsposArray(pushPos)

      // this.setState({ posArray: pushPos });
    }
  }




  let t1 = casinoData?.data && casinoData?.data.t1 && casinoData?.data.t1[0] ? casinoData?.data.t1[0] : {};
  let t2 = casinoData?.data && casinoData?.data.t1 && casinoData?.data.t1[1] ? casinoData?.data.t1[1] : {};
  let image = t1 && t1.cards ? t1.cards.split(",") : [];
  let resultCard;
  if (t1 && t1.desc && typeof t1.desc === 'string') {
    resultCard = t1.desc.split(',');
  } else {

    resultCard = [];
  }


  let Dragon = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[0] ? casinoData?.data.t2[0] : {};
  let Tiger = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[1] ? casinoData?.data.t2[1] : {};
  let Tie = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[2] ? casinoData?.data.t2[2] : {};
  let Even = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[3] ? casinoData?.data.t2[3] : {};




  let SA = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[0] ? casinoData?.data.t2[0] : {};
  let SAFBet = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[1] ? casinoData?.data.t2[1] : {};
  let SASBet = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[2] ? casinoData?.data.t2[2] : {};
  let SB = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[3] ? casinoData?.data.t2[3] : {};
  let SBFBet = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[4] ? casinoData?.data.t2[4] : {};
  let SBSBet = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[5] ? casinoData?.data.t2[5] : {};
  let Odd = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[4] ? casinoData?.data.t2[4] : {};
  let Red = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[5] ? casinoData?.data.t2[5] : {};
  let Black = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[6] ? casinoData?.data.t2[6] : {};
  let CardA = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[7] ? casinoData?.data.t2[7] : {};
  let Card2 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[8] ? casinoData?.data.t2[8] : {};
  let Card3 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[9] ? casinoData?.data.t2[9] : {};
  let Card4 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[10] ? casinoData?.data.t2[10] : {};
  let Card5 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[11] ? casinoData?.data.t2[11] : {};

  let Card6 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[12] ? casinoData?.data.t2[12] : {};
  let Card7 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[13] ? casinoData?.data.t2[13] : {};
  let Card8 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[14] ? casinoData?.data.t2[14] : {};
  let Card9 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[15] ? casinoData?.data.t2[15] : {};
  let Card10 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[16] ? casinoData?.data.t2[16] : {};
  let CardJ = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[17] ? casinoData?.data.t2[17] : {};
  let CardQ = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[18] ? casinoData?.data.t2[18] : {};
  let CardK = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[19] ? casinoData?.data.t2[19] : {};
  let Under7 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[20] ? casinoData?.data.t2[20] : {};
  let Over7 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[21] ? casinoData?.data.t2[21] : {};
  let Single9 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[22] ? casinoData?.data.t2[22] : {};
  let Single0 = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[23] ? casinoData?.data.t2[23] : {};
  let TwoRed = casinoData?.data && casinoData?.data.t2 && casinoData?.data.t2[26] ? casinoData?.data.t2[26] : {};


  // let CardBlack = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  //       let CardRed = data && data.t2 && data.t2[13] ? data.t2[13] : {};



  //       let Single1 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  //       let Single2 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
  //       let Single3 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
  //       let Single4 = data && data.t2 && data.t2[17] ? data.t2[17] : {};
  //       let Single5 = data && data.t2 && data.t2[18] ? data.t2[18] : {};
  //       let Single6 = data && data.t2 && data.t2[19] ? data.t2[19] : {};
  //       let Single7 = data && data.t2 && data.t2[20] ? data.t2[20] : {};
  //       let Single8 = data && data.t2 && data.t2[21] ? data.t2[21] : {};


  const columns = [
    {
      title: 'Player Name',
      dataIndex: 'name',
      align: 'center',
      render: (values, row) => <div>
        <div> {row?.name}</div>
        <div className={`gx-fs-md gx-font-weight-bold ${row?.pos > 0 ? 'gx-text-green-0' : row?.pos < 0 ? 'gx-text-red' : 'gx-text-black'}`}>{row?.pos ? row?.pos : 0}</div>
      </div>
    },

    {
      title: 'Rate',
      dataIndex: 'rate',
      render: (text) => {
        return <span className="">{text}</span>
      },
    }
  ];




  let data = [];

  if (eventId == 3056) {
    data = [
      { key: '1', rate: Dragon?.b1, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '2', rate: Tiger?.b1, name: Tiger.nat ? Tiger.nat : Tiger.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.b1 },
      // { key: '19', name: Even.nat, rate: Even.b1 },
      // { key: '20', name: Odd.nat, rate: Odd.b1 },
      { key: '21', name: Red.nat, rate: Red.b1 },
      { key: '5', name: Black.nat, rate: Black.b1 },
      { key: '6', name: <img src="/images/cards/1.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardA.b1 },
      { key: '7', name: <img src="/images/cards/2.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card2.b1 },
      { key: '8', name: <img src="/images/cards/3.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card3.b1 },
      { key: '9', name: <img src="/images/cards/4.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card4.b1 },
      { key: '10', name: <img src="/images/cards/5.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card5.b1 },
      { key: '11', name: <img src="/images/cards/6.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card6.b1 },
      { key: '12', name: <img src="/images/cards/7.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card7.b1 },
      { key: '13', name: <img src="/images/cards/8.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card8.b1 },
      { key: '14', name: <img src="/images/cards/9.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card9.b1 },
      { key: '15', name: <img src="/images/cards/10.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card10.b1 },
      { key: '16', name: <img src="/images/cards/11.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardJ.b1 },
      { key: '17', name: <img src="/images/cards/12.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardQ.b1 },
      { key: '18', name: <img src="/images/cards/13.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardK.b1 },
    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });
  } else if (eventId == 3035) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.rate },
      { key: '2', rate: Tiger?.rate, name: Tiger.nat ? Tiger.nat : Tiger.nation },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3031) {
    data = [
      { key: '1', rate: t1?.b1, name: t1.nat ? t1.nat : t1.nation },
      { key: '2', name: t2?.nat ? t2?.nat : t2?.nation, rate: t2.b1 },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3059) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.rate },
      { key: '2', rate: Tiger?.rate, name: Tiger.nat ? Tiger.nat : Tiger.nation },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3032) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      // { key: '3', name: Tie.nat, rate: Tie.rate },
      { key: '2', rate: Tiger?.rate, name: Tiger.nat ? Tiger.nat : Tiger.nation },
      { key: '20', name: Odd.nat ? Odd.nat : Odd.nation, rate: Odd.rate },
      { key: '21', name: Red.nat ? Red.nat : Red.nation, rate: Red.rate },
      { key: '6', name: <img src="/images/cards/1.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardA.rate },
      { key: '7', name: <img src="/images/cards/2.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card2.rate },
      { key: '8', name: <img src="/images/cards/3.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card3.rate },
      { key: '9', name: <img src="/images/cards/4.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card4.rate },
      { key: '10', name: <img src="/images/cards/5.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card5.rate },
      { key: '11', name: <img src="/images/cards/6.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card6.rate },
      { key: '12', name: <img src="/images/cards/7.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card7.rate },
      { key: '13', name: <img src="/images/cards/8.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card8.rate },
      { key: '14', name: <img src="/images/cards/9.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card9.rate },
      { key: '15', name: <img src="/images/cards/10.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card10.rate },
      { key: '16', name: <img src="/images/cards/11.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardJ.rate },
      { key: '17', name: <img src="/images/cards/12.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardQ.rate },
      { key: '18', name: <img src="/images/cards/13.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardK.rate },
      // { key: '3', name: Tie.nat, rate: Tie.rate },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3030) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.rate },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        console.log(item.key, "item.keyitem.key");

        item.pos = isposArray[item.key];
      }
    });

  } else if (eventId == 3054) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.rate },
      { key: '2', rate: Tiger?.rate, name: Tiger.nat ? Tiger.nat : Tiger.nation },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3043) {
    data = [
      { key: '1', rate: SA?.b1, name: SA.nat ? SA.nat : SA.nation },
      { key: '3', name: SAFBet.nat ? SAFBet.nat : SAFBet.nation, rate: SAFBet.b1 },
      { key: '2', rate: SASBet?.b1, name: SASBet.nat ? SASBet.nat : SASBet.nation },
      { key: '4', rate: SB?.b1, name: SB.nat ? SB.nat : SB.nation },
      { key: '5', name: SBFBet.nat ? SBFBet.nat : SBFBet.nation, rate: SBFBet.b1 },
      { key: '6', rate: SBSBet?.b1, name: SBSBet.nat ? SBSBet.nat : SBSBet.nation },
      { key: '6', name: <img src="/images/cards/1.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardA.b1 },
      { key: '7', name: <img src="/images/cards/2.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card2.b1 },
      { key: '8', name: <img src="/images/cards/3.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card3.b1 },
      { key: '9', name: <img src="/images/cards/4.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card4.b1 },
      { key: '10', name: <img src="/images/cards/5.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card5.b1 },
      { key: '11', name: <img src="/images/cards/6.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card6.b1 },
      { key: '12', name: <img src="/images/cards/7.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card7.b1 },
      { key: '13', name: <img src="/images/cards/8.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card8.b1 },
      { key: '14', name: <img src="/images/cards/9.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card9.b1 },
      { key: '15', name: <img src="/images/cards/10.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: Card10.b1 },
      { key: '16', name: <img src="/images/cards/11.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardJ.b1 },
      { key: '17', name: <img src="/images/cards/12.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardQ.b1 },
      { key: '18', name: <img src="/images/cards/13.jpg" alt="card" className="h-full w-full" width={30} height={40} />, rate: CardK.b1 },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3055) {
    data = [
      { key: '1', rate: Dragon?.b1, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '2', rate: Tiger?.b1, name: Tiger.nat ? Tiger.nat : Tiger.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.b1 },
      { key: '4', rate: Even?.b1, name: Even.nat ? Even.nat : Even.nation },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  } else if (eventId == 3034) {
    data = [
      { key: '1', rate: Dragon?.b1, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '2', rate: Tiger?.b1, name: Tiger.nat ? Tiger.nat : Tiger.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.b1 },
      { key: '4', rate: Even?.b1, name: Even.nat ? Even.nat : Even.nation },




      { key: '5', rate: Card6?.b1, name: Card6.nat ? Card6.nat : Card6.nation },
      { key: '6', rate: Card7?.b1, name: Card7.nat ? Card7.nat : Card7.nation },
      { key: '16', rate: TwoRed?.b1, name: TwoRed.nat ? TwoRed.nat : TwoRed.nation },
      { key: '7', rate: Card8?.b1, name: Card8.nat ? Card8.nat : Card8.nation },
      { key: '8', rate: Card9?.b1, name: Card9.nat ? Card9.nat : Card9.nation },
      { key: '9', rate: Card10?.b1, name: Card10.nat ? Card10.nat : Card10.nation },
      { key: '10', rate: CardJ?.b1, name: CardJ.nat ? CardJ.nat : CardJ.nation },
      { key: '11', rate: CardQ?.b1, name: CardQ.nat ? CardQ.nat : CardQ.nation },
      { key: '12', rate: CardK?.b1, name: CardK.nat ? CardK.nat : CardK.nation },
      { key: '13', rate: Under7?.b1, name: Under7.nat ? Under7.nat : Under7.nation },
      { key: '14', rate: Single9?.b1, name: Single9.nat ? Single9.nat : Single9.nation },
      // { key: '15', rate: Single0?.rate, name: Single0.nat ? Single0.nat : Single0.nation },


    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }
  else if (eventId == 3048) {
    data = [
      { key: '1', rate: Dragon?.rate, name: Dragon.nat ? Dragon.nat : Dragon.nation },
      { key: '3', name: Tie.nat ? Tie.nat : Tie.nation, rate: Tie.rate },
      { key: '2', rate: Tiger?.rate, name: Tiger.nat ? Tiger.nat : Tiger.nation },

      { key: '4', rate: Odd?.rate, name: Odd.nat ? Odd.nat : Odd.nation },
      { key: '5', rate: Even?.rate, name: Even.nat ? Even.nat : Even.nation },
      { key: '6', rate: Red?.rate, name: Red.nat ? Red.nat : Red.nation },

    ];
    data.forEach(item => {
      if (isposArray.hasOwnProperty(item.key)) {
        item.pos = isposArray[item.key];
      }
    });

  }







  const videoUrlType = diamondcasinobyeventid?.videoUrlType;
  // const videoUrlMap = {
  //   "1": diamondcasinobyeventid?.videoUrl1,
  //   "2": diamondcasinobyeventid?.videoUrl2,
  //   "3": diamondcasinobyeventid?.videoUrl3
  // };
  // const selectedVideoUrl = videoUrlMap[videoUrlType] || "";
  const selectedVideoUrl = diamondcasinobyeventid?.[`videoUrl${videoUrlType}`]


  return (
    <Widget>
      <Row className="">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="gx-news-itemgnn">
            <div className="gx-news-contenttt ">
              <div className="gx-bg-flex gx-justify-content-between gx-px-3 gx-bg-grey  gx-py-2">
                <span className="gx-text-white">{gameName}</span>
                <span className="gx-text-white">{`ROUNDED ID: ${t1?.mid}`}</span>
                <span className="timer">
                  {t1?.autotime}</span>
              </div>
              <div style={{ marginTop: '150px' }} className="gx-news-tags-row gx-px-4">
                <iframe src={selectedVideoUrl} title=" " style={{ height: 300, position: 'relative' }} className="gx-reletive gx-w-100" />

                {eventId == 3056 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)' }}>
                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="" height={62} width={50} />
                  </div>
                )}

                {eventId == 3035 && (
                  <div className="gx-pl-3 gx-d-flex" style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <div>
                      <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={82} width={60} />
                      <div className="gx-mt-1"><span class="ant-tag ant-tag-red css-1v5z42l">Dragon</span></div>
                    </div>
                    <div> <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={82} width={60} />
                      <div className="gx-mt-1 gx-px-2"><span class="ant-tag ant-tag-green css-1v5z42l">Tiger</span></div>
                    </div>
                  </div>
                )}

                {eventId == 3031 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)' }}>
                    {/* <span className="gx-text-blue"> Player A</span> */}
                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                    <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                    <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                    <br />
                    {/* Player B: */}
                    <img src={`/cards/${t2 && t2.C1 ? t2.C1 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                    <img src={`/cards/${t2 && t2.C2 ? t2.C2 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                    <img src={`/cards/${t2 && t2.C3 ? t2.C3 : 1}.png`} alt="card" className="gx-border gx-border-yellow" height={55} width={35} />
                  </div>
                )}

                {eventId == 3030 && (
                  <div className="">
                    <div className="gx-pl-3" >
                      <div style={{ position: 'absolute', transform: 'translateX(-50%)', gap: '8px' }} className="playerA gx-d-flex">
                        <div>PLAYER A</div>
                        <div style={{ gap: '5px' }} className="gx-d-flex">
                          <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                          <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                          <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                        </div>
                      </div>
                      <br />
                      {/* Player B: */}
                      <div style={{ position: 'absolute', transform: 'translateX(-50%)', gap: '8px' }} className="playerB gx-d-flex">
                        <div>PLAYER B</div>
                        <div style={{ gap: '5px' }} className="gx-d-flex">
                          <img src={`/cards/${t2 && t2.C1 ? t2.C1 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                          <img src={`/cards/${t2 && t2.C2 ? t2.C2 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                          <img src={`/cards/${t2 && t2.C3 ? t2.C3 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={45} width={35} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {eventId == 3054 && (
                  <div className="gx-pl-3 gx-d-flex" style={{ position: 'absolute', top: '80px', left: '20%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="" height={45} width={35} />
                    <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="" height={45} width={35} />
                    <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="" height={45} width={35} />

                  </div>
                )}
                {eventId == 3059 && (
                  <div className="gx-pl-3 gx-d-flex" style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <div>
                      <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={82} width={60} />
                      <div className="gx-mt-1"><span class="ant-tag ant-tag-red css-1v5z42l">Dragon</span></div>
                    </div>
                    <div> <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="gx-border-yellow gx-border-2" height={82} width={60} />
                      <div className="gx-mt-1 "><span class="ant-tag gx-px-2 ant-tag-green css-1v5z42l">Tiger</span></div>
                    </div>
                  </div>
                )}

                {/* new Casino  */}
                {eventId == 3032 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="" height={62} width={40} />

                    {/* <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="" height={45} width={35} /> */}
                  </div>
                )}


                {eventId == 3043 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '52px', left: '32%', transform: 'translateX(-50%)', gap: '8px' }}>
                    {/* <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="" height={45} width={35} />
                    <img src={`/cards/${image && image[2] ? image[2] : "1"}.png`}
                      alt="card"
                      className="gx-rounded-sm"
                      height={45} width={35}
                    /> */}
                    {/* <div className="h-full p-2 gx-d-flex gx-justify-content-center"> */}
                    <Row
                      className="gx-d-flex gx-align-items-center"
                    >
                      {/* First column: Card with number 9 (left side) */}
                      <Col xs={4} md={4} className="">
                        <img
                          src={`/cards/${t1 && t1.C1 ? t1.C1 : "1"}.png`}
                          alt="card"
                          style={{ border: '1px solid yellow' }}
                          className=""
                          height={62} width={50}
                        />
                      </Col>

                      {/* Second column: Andar and Bahar cards */}
                      <Col xs={18} md={18} className="">
                        {/* Andar row */}
                        <div className="gx-mb-2">
                          {/* <Col className=" gx-pr-2 gx-bg-flex gx-justify-content-center gx-align-items-center"> */}
                          <div className="gx-text-black gx-font-weight-semi-bold lg:text-base gx-fs-sm">
                            Andar
                          </div>
                          {/* </Col> */}
                          <div
                            className="gx-d-flex"
                          >
                            <img
                              src={`/cards/${image && image[2] ? image[2] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[4] ? image[4] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[6] ? image[6] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[8] ? image[8] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[10] ? image[10] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[12] ? image[12] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />

                          </div>
                        </div>

                        {/* Bahar row */}
                        <div className="">
                          {/* <Col className="gx-bg-flex gx-pr-2 gx-justify-content-center gx-align-items-center"> */}
                          <div className="gx-text-black gx-font-weight-semi-bold lg:text-base gx-fs-sm">
                            Bahar
                          </div>
                          {/* </Col> */}
                          <div
                            className="gx-d-flex"
                          >
                            <img
                              src={`/cards/${image && image[1] ? image[1] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />

                            <img
                              src={`/cards/${image && image[3] ? image[3] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[5] ? image[5] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[7] ? image[7] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[9] ? image[9] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />
                            <img
                              src={`/cards/${image && image[11] ? image[11] : "1"
                                }.png`}
                              alt="card"
                              style={{ border: '1px solid yellow' }}
                              className=""
                              height={43} width={35}
                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                    {/* </div> */}

                  </div>
                )}

                {eventId == 3034 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '50px', left: '10%', transform: 'translateX(-50%)', gap: '8px' }}>

                    <Row gutter={[16, 8]} className="gx-pt-2">
                      <div className="gx-w-100 gx-px-1 lg:space-y-1 space-y-0">
                        <div>
                          {/* <Text className="gx-text-white gx-font-weight-semi-bold " > Card</Text> */}
                          <div
                            className={`gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4
                              ? "gx-text-green-0"
                              : "gx-text-black"
                              }`}
                          >
                            Player 8 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C1 ? t1.C1 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[0] &&
                              resultCard[0] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[0]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[4] &&
                              resultCard[4] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[4]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[8] &&
                              resultCard[8] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[8]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[12] &&
                              resultCard[12] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[12]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[16] &&
                              resultCard[16] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[16]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[20] &&
                              resultCard[20] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[20]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[24] &&
                              resultCard[24] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[24]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[28] &&
                              resultCard[28] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[28]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[32] &&
                              resultCard[32] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[32]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          {/* ${getColorClass(
                              t1.C2
                            // )} */}
                          <div
                            className={`  gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 9 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C2 ? t1.C2 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[1] &&
                              resultCard[1] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[1]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[5] &&
                              resultCard[5] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[5]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[9] &&
                              resultCard[9] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[9]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[13] &&
                              resultCard[13] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[13]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[17] &&
                              resultCard[17] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[17]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[21] &&
                              resultCard[21] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[21]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[25] &&
                              resultCard[25] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[25]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[29] &&
                              resultCard[29] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[29]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[33] &&
                              resultCard[33] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[33]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          {/* //   ${getColorClass(
                            //   t1.C3
                            // )
                          } */}
                          <div
                            className={` 
                          
                           gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 10 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C3 ? t1.C3 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[2] &&
                              resultCard[2] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[2]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[6] &&
                              resultCard[6] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[6]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[10] &&
                              resultCard[10] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[10]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[14] &&
                              resultCard[14] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[14]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[18] &&
                              resultCard[18] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[18]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[22] &&
                              resultCard[22] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[22]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[26] &&
                              resultCard[26] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[26]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[30] &&
                              resultCard[30] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[30]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[34] &&
                              resultCard[34] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[34]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <div
                            className={` 
                            )} gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 11 :
                            <span className="gx-text-yellow">{t1.C4}</span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[3] &&
                              resultCard[3] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[3]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[7] &&
                              resultCard[7] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[7]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[11] &&
                              resultCard[11] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[11]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[15] &&
                              resultCard[15] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[15]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[19] &&
                              resultCard[19] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[19]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[23] &&
                              resultCard[23] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[23]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[27] &&
                              resultCard[27] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[27]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[31] &&
                              resultCard[31] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[31]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[35] &&
                              resultCard[35] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[35]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                )}

                {eventId == 3048 && (
                  <div className="gx-pl-3 gx-w-full" style={{ width: '100%', position: 'absolute', top: '50px', left: '20%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <Row gutter={[16, 8]} className="gx-pt-2 gx-w-full">
                      {/* <Col>
                        <Text className="gx-text-black" strong> TIGER </Text>
                      </Col> */}
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={[8, 8]} className="gx-d-flex gx-flex-column gx-align-items-center">
                          <Text className="gx-text-black" strong> TIGER </Text>
                          <div className="gx-d-flex">
                            {[t1?.C1, t1?.C2, t1?.C3]?.map((card, index) => (
                              <Col key={index}>
                                <img src={`/cards/${card || 1}.png`} alt="card" className="" style={{ height: "44px" }} />
                              </Col>
                            ))}
                          </div>
                        </Row>
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={[8, 8]} className="gx-d-flex gx-flex-column gx-align-items-center">
                          <Text className="gx-text-black" strong> LION</Text>
                          <div className="gx-d-flex">
                            {[t1?.C4, t1?.C5, t1?.C6]?.map((card, index) => (
                              <Col key={index}>
                                <img src={`/cards/${card || 1}.png`} alt="card" className="" style={{ height: "44px" }} />
                              </Col>
                            ))}
                          </div>
                        </Row>
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={[8, 8]} className="gx-d-flex gx-flex-column gx-align-items-center">
                          <Text className="gx-text-black" strong> DRAGON</Text>
                          <div className="gx-d-flex">
                            {[t1?.C7, t1?.C8, t1?.C9]?.map((card, index) => (
                              <Col key={index}>
                                <img src={`/cards/${card || 1}.png`} alt="card" className="" style={{ height: "44px" }} />
                              </Col>
                            ))}
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}

                {eventId == 3055 && (
                  <div className="gx-pl-3" style={{ position: 'absolute', top: '50px', left: '14%', transform: 'translateX(-50%)', gap: '8px' }}>
                    <Row gutter={[16, 8]} className="gx-pt-2">
                      <div className="gx-w-100 gx-px-1 lg:space-y-1 space-y-0">
                        <div>
                          {/* <Text className="gx-text-white gx-font-weight-semi-bold " > Card</Text> */}
                          <div
                            className={`gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4
                              ? "gx-text-green-0"
                              : "gx-text-black"
                              }`}
                          >
                            Player 8 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C1 ? t1.C1 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[0] &&
                              resultCard[0] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[0]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[4] &&
                              resultCard[4] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[4]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[8] &&
                              resultCard[8] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[8]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[12] &&
                              resultCard[12] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[12]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[16] &&
                              resultCard[16] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[16]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[20] &&
                              resultCard[20] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[20]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[24] &&
                              resultCard[24] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[24]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[28] &&
                              resultCard[28] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[28]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[32] &&
                              resultCard[32] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[32]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          {/* ${getColorClass(
                              t1.C2
                            // )} */}
                          <div
                            className={`  gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 9 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C2 ? t1.C2 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[1] &&
                              resultCard[1] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[1]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[5] &&
                              resultCard[5] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[5]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[9] &&
                              resultCard[9] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[9]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[13] &&
                              resultCard[13] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[13]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[17] &&
                              resultCard[17] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[17]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[21] &&
                              resultCard[21] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[21]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[25] &&
                              resultCard[25] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[25]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[29] &&
                              resultCard[29] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[29]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[33] &&
                              resultCard[33] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[33]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          {/* //   ${getColorClass(
                            //   t1.C3
                            // )
                          } */}
                          <div
                            className={` 
                          
                           gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 10 :
                            <span className="gx-text-yellow">
                              {t1 && t1.C3 ? t1.C3 : null}
                            </span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[2] &&
                              resultCard[2] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[2]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[6] &&
                              resultCard[6] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[6]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[10] &&
                              resultCard[10] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[10]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[14] &&
                              resultCard[14] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[14]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[18] &&
                              resultCard[18] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[18]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[22] &&
                              resultCard[22] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[22]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[26] &&
                              resultCard[26] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[26]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[30] &&
                              resultCard[30] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[30]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[34] &&
                              resultCard[34] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[34]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <div
                            className={` 
                            )} gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                          >
                            Player 11 :
                            <span className="gx-text-yellow">{t1.C4}</span>
                          </div>
                          <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                            {resultCard &&
                              resultCard[3] &&
                              resultCard[3] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[3]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[7] &&
                              resultCard[7] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[7]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[11] &&
                              resultCard[11] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[11]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[15] &&
                              resultCard[15] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[15]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[19] &&
                              resultCard[19] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[19]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[23] &&
                              resultCard[23] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[23]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[27] &&
                              resultCard[27] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[27]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[31] &&
                              resultCard[31] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[31]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                            {resultCard &&
                              resultCard[35] &&
                              resultCard[35] !== "1" ? (
                              <img
                                src={`/cards/${resultCard[35]}.png`}
                                alt="card"
                                className="gx-rounded-sm"
                                style={{ height: "2rem" }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                )}

              </div>

              <Row className="gx-mb-3 gx-pt-4 gx-px-4" >
                {/* <div>Last 10 winners:</div> */}
                {eventId == 3032 && (
                  <>
                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element.result === '1' ? "L" : element.result === '2' ? "H" : "-"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Low</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">asa</div>
                              <div className="bet-amount">1222</div>
                            </div>
                          </Card>
                        </Col> */}
                        {console.log(data, "datadatadata")
                        }
                        {data?.filter(item => item.name === 'LOW Card').map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <div style={{ height: '100%' }} className='gx-d-flex gx-align-items-center gx-justify-content-center gx-h-full'>
                            <img style={{ width: '35px', height: '50px' }} src='/images/cards/7.jpg' />
                          </div>
                        </Col>

                        {data?.filter(item => item.name === 'HIGH Card').map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">High</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">tr</div>
                              <div className="bet-amount">rttttttttttttt</div>
                            </div>
                          </Card>
                        </Col> */}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3031 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9" className={`${element && element.result && element.result === "1" ? "text-[#F75500]" : element && element.result && element.result === "2" ? "text-[#FFF523]" : "text-[#33c6ff]"} font-[700] text-[14px]`}>
                                {element && element.result && element.result === "1" ? "A" : element && element.result && element.result === "2" ? "B" : element && element.result && element.result === "3" ? "C" : "-"}
                                {/* <Tag style={{ borderRadius: '0' }} color="#108ee9">
                              {element.result === '1' ? "dragon" : element.result === '2' ? "tiger" : "-"} */}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">Amar</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">asa</div>
                            <div className="bet-amount">1222</div>
                          </div>
                        </Card>
                      </Col>

                      <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">Akbar</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">4545</div>
                            <div className="bet-amount">454545</div>
                          </div>
                        </Card>
                      </Col>

                      <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">Anthony</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">tr</div>
                            <div className="bet-amount">rttttttttttttt</div>
                          </div>
                        </Card>
                      </Col> */}
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3030 && (
                  <>


                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element.result === '1' ? "A" : element.result === '3' ? "B" : "T"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Player A</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">asa</div>
                              <div className="bet-amount">1222</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Player B</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">4545</div>
                              <div className="bet-amount">454545</div>
                            </div>
                          </Card>
                        </Col> */}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3059 && (
                  <>
                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element.result === '1' ? "D" : element.result === '2' ? "T" : "-"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Dragon</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">asa</div>
                              <div className="bet-amount">1222</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Tie</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">4545</div>
                              <div className="bet-amount">454545</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Tiger</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">tr</div>
                              <div className="bet-amount">rttttttttttttt</div>
                            </div>
                          </Card>
                        </Col> */}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3056 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9" className={`${element && element.result && element.result === "1" ? "text-[#F75500]" : element && element.result && element.result === "2" ? "text-[#FFF523]" : "text-[#33c6ff]"} font-[700] text-[14px]`}>
                                {element && element.result && element.result === "1" ? "A" : element && element.result && element.result === "2" ? "B" : element && element.result && element.result === "3" ? "C" : "-"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.slice(0, 3)?.map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}

                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Amar</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">b1 ka data </div>
                              <div className="bet-amount">0</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Akbar</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">b1 ka data </div>
                              <div className="bet-amount">0</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Anthony</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">b1 ka data</div>
                              <div className="bet-amount">0</div>
                            </div>
                          </Card>
                        </Col> */}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3035 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}
                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element.result === '1' ? "D" : element.result === '2' ? "T" : "-"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Dragon</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">asa</div>
                              <div className="bet-amount">1222</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Tie</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">4545</div>
                              <div className="bet-amount">454545</div>
                            </div>
                          </Card>
                        </Col>

                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">Tiger</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">tr</div>
                              <div className="bet-amount">rttttttttttttt</div>
                            </div>
                          </Card>
                        </Col> */}
                      </Row>
                    </Col>
                  </>
                )}
                {eventId == 3054 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}
                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element && element.result && element.result === "1" ? "R" : element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "2" ? "R" : "R"}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {/* <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">0</div>

                            <div className="bet-card-body">
                              <div className="bet-amount">1</div>
                            </div>
                          </Card>
                        </Col> */}
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </>
                )}

                {/* new add  */}
                {eventId == 3043 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element &&
                                  element.result &&
                                  element.result == "1"
                                  ? "A"
                                  : "B"
                                }
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>

                        {data?.filter(item => item.name === 'SA').map((item, idx) => (
                          <Col key={idx} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">ANDER</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}

                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">ANDAR</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">asa</div>
                              <div className="bet-amount">1222</div>
                            </div>
                          </Card>
                        </Col> */}

                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Card
                            bordered={false}
                            className="main-bet-card"
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="bet-card-header">BAHAR</div>

                            <div className="bet-card-body">
                              <div className="bet-rate">tr</div>
                              <div className="bet-amount">rttttttttttttt</div>
                            </div>
                          </Card>
                        </Col> */}

                        {data?.filter(item => item.name === 'SB').map((item, idx) => (
                          <Col key={idx} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">BAHAR</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </>
                )}

                {eventId == 3055 && (
                  <>
                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">


                                {element && element.result === "1" ? (
                                  "8"
                                ) : element && element.result === "2" ? (

                                  "9"

                                ) : element && element.result === "3" ? (

                                  " 10"

                                ) : element && element.result === "4" ? (

                                  "11"

                                ) : (
                                  "-"
                                )}

                                {/* {element && element.result && element.result === "1" ? "R" : element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "2" ? "R" : "R"} */}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">ANDAR</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">asa</div>
                            <div className="bet-amount">1222</div>
                          </div>
                        </Card>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">BAHAR</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">tr</div>
                            <div className="bet-amount">rttttttttttttt</div>
                          </div>
                        </Card>
                      </Col> */}
                      </Row>
                    </Col>
                  </>
                )}

                {eventId == 3034 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle(element?.result),
                              }} color="#108ee9">
                                {element && element.result === '1' ? "8" : element && element.result === '2' ? "9" : element && element.result === '3' ? "10" : element && element.result === '4' ? "11" : "-"}
                                {/* {element && element.result && element.result === "1" ? "R" : element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "2" ? "R" : "R"} */}
                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} sm={6} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </>
                )}

                {eventId == 3048 && (
                  <>

                    <Col className="gx-d-flex gx-flex-column" xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        LAST WINNERS
                      </Divider>
                      <div style={{ flexWrap: 'wrap', gap: '1' }} className="gx-d-flex gx-align-items-center">
                        {/* <div>Last 10 winners:</div> */}

                        {casinoData?.result && casinoData?.result.length > 0 ? (
                          casinoData?.result.map((element, index) => (
                            <div key={index}>
                              <Tag style={{
                                borderRadius: 0,
                                borderWidth: 1,
                                borderStyle: "solid",
                                fontWeight: 700,
                                fontSize: "14px",
                                borderRadius: '5px',
                                ...getTagStyle1(element?.result),
                              }} color="#108ee9">
                                {element && element.result === '31' ? "D" : element && element.result === '11' ? "T" : element && element.result === '21' ? "L" : "-"}

                              </Tag>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                      <Divider orientation="left" className="custom-divider">
                        MAIN BETS
                      </Divider>
                      <Row className="gx-w-full" gutter={[16, 16]}>
                        {data?.map((item, idx) => (
                          <Col key={idx} xs={8}>
                            <Card bordered={false} className="main-bet-card" bodyStyle={{ padding: 0 }}>
                              <div className="bet-card-header">{item.name}</div>
                              <div className="bet-card-body">
                                <div className="bet-rate">{item.rate}</div>
                                <div className="bet-amount">{0}</div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                        {/* <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">ANDAR</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">asa</div>
                            <div className="bet-amount">1222</div>
                          </div>
                        </Card>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card
                          bordered={false}
                          className="main-bet-card"
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="bet-card-header">BAHAR</div>

                          <div className="bet-card-body">
                            <div className="bet-rate">tr</div>
                            <div className="bet-amount">rttttttttttttt</div>
                          </div>
                        </Card>
                      </Col> */}
                      </Row>
                    </Col>

                  </>
                )}
              </Row>
            </div>
          </div>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="gx-table-responsive">
            <Table className="" columns={columns} dataSource={data} pagination={false} bordered={true}
              size="small" />
          </div>
        </Col>
      </Row>
    </Widget >
  );
};

export default CasinoIframeResult;

