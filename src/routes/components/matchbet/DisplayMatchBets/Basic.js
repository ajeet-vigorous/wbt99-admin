// import React, { useEffect, useState } from "react";
// import { Card, Col, Row, Select, Table } from "antd";
// import { useParams } from "react-router-dom";
// import { httpPost } from "../../../../http/http";
// import moment from "moment";
// import BackButton from "../../Hoc/BackButton";
// import { Option } from "antd/lib/mentions";
// import { useDispatch, useSelector } from "react-redux";
// import { getClientListByMarketId, getSportsBetsList } from "../../../../appRedux/actions/User";


// const Basic = () => {
//   const [userLists, setUserLists] = useState([]);
//   const [userListData, setUserListData] = useState();
//   const [OddsPositionData, setOddsPositionData] = useState([])
//   const [teamDataList, setTeamDataList] = useState([])
//   const [showClientList, setClientList] = useState([])
//   const { marketId } = useParams();
//   const dispatch = useDispatch();
//   const { sportsBetsList, clientListByMarketId } = useSelector(state => state.UserReducer);

//   useEffect(() => {
//     getSportsBetsListFun();
//     oddsPosition();
//     getClientByMarketId();
//     getMatchDataByMarketIdWise();
//   }, [marketId]);

//   useEffect(() => {
//     if (sportsBetsList && sportsBetsList.data && sportsBetsList.data.oddsBetData) {
//       const filteredData = sportsBetsList.data.oddsBetData.map((item, index) => {
//         let profit = 0;
//         let loss = 0;


//         item.type = item.type == "L" ? "K" : "L"

//         if (item.profit) {
//           profit = Number.parseFloat(Math.abs(item.profit)).toFixed(2);
//         }

//         if (item.loss) {
//           loss = Number.parseFloat(Math.abs(item.loss)).toFixed(2);
//         }

//         if (item.type === "L") {
//           profit = item.positionInfo[item.selectionId];
//           loss = -1 * item.amount;
//         } else if (item.type === "K" || item.type === "k") {
//           profit = item.amount;
//           loss = -1 * (item.amount * item.odds);
//         }

//         return {
//           key: `${index}`,
//           odds: item.odds,
//           amount: item.amount,
//           type: item.type === "N" ? "NO" :
//             item.type === "L" ? "Lagai" :
//               item.type === "K" || item.type === "k" ? "Khai" :
//                 "",
//           loss: Number.parseFloat(Math.abs(loss)).toFixed(2),
//           profit: Number.parseFloat(Math.abs(profit)).toFixed(2),
//           clientCode: item.userInfo.clientCode,
//           teamName: item.teamName,
//           clientName: item.userInfo.clientName,
//           creatorName: item.userInfo.creatorName,
//           createdAt: item.createdAt,

//         };
//       });

//       setUserLists(filteredData);
//     }

//     if (clientListByMarketId) {
//       setClientList(clientListByMarketId);
//     }
//   }, [sportsBetsList, clientListByMarketId]);


//   const getSportsBetsListFun = async () => {
//     let reqData = {
//       "marketId": marketId,
//       "oddsBet": true,
//       "isDeleted": 0,
//       "downlineUserType": "client",
//     }
//     dispatch(getSportsBetsList(reqData))
//   }

//   const oddsPosition = async () => {
//     let reqData = {
//       "marketId": marketId
//     }
//     let response = await httpPost("sports/getOddsPosition", reqData);

//     if (response) {
//       const convertKeyObject = (objectData, objectKey) => {
//         return objectData.reduce((acc, data) => {
//           acc[data[objectKey]] = data;
//           return acc;
//         }, {});
//       };
//       const finalPos = convertKeyObject(response.data, "_id");
//       setOddsPositionData(response.data);
//     }
//   }

//   const getClientByMarketId = async () => {
//     let reqData = {
//       "marketId": marketId,
//       'isMatchBet': true
//     }
//     dispatch(getClientListByMarketId(reqData))
//   }

//   const getMatchDataByMarketIdWise = async () => {
//     let reqData = {
//       "marketId": marketId
//     }
//     let matchDetails = await httpPost("sports/sportByMarketId", reqData);
//     if (matchDetails) {

//       if (matchDetails?.data?.teamData) {
//         const parsedData2 = JSON.parse(matchDetails.data.teamData);
//         setTeamDataList(parsedData2)
//       }
//     }
//   }


//   const getOddsPositionByUserId = async (data) => {
//     let reqData = {
//       "marketId": marketId,
//       "userId": data,
//       "userType": "client"
//     }
//     let response = await httpPost("sports/getOddsPosition", reqData);
//     if (response) {
//       const convertKeyObject = (objectData, objectKey) => {
//         return objectData.reduce((acc, data) => {
//           acc[data[objectKey]] = data;
//           return acc;
//         }, {});
//       };
//       const finalPos = convertKeyObject(response.data, "_id");
//       setOddsPositionData(response.data);
//     }
//   }

//   const renderContent = (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };

//     return obj;
//   };



//   const columns = [
//     {
//       title: "Rate",
//       dataIndex: "odds",
//       render: (value) => (
//         Number.parseFloat(Math.abs(value) * 100).toFixed(2)
//       ),
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       render: (value) => (
//         Number.parseFloat(Math.abs(value)).toFixed(2)
//       ),
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       render: renderContent,
//     },
//     {
//       title: "Team",
//       dataIndex: "teamName",
//       render: renderContent,
//     },
//     {
//       title: "Client",
//       dataIndex: "clientName",
//       render: (value, row) => `${row.clientName} (${row.clientCode})`,
//     },
//     {
//       title: "Agent",
//       dataIndex: "creatorName",
//       render: renderContent,
//     },
//     {
//       title: "Date",
//       dataIndex: "createdAt",
//       render: (createdAt) => moment(createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
//     },
//     {
//       title: "Loss",
//       dataIndex: "loss",
//       render: (value) => (
//         Number.parseFloat(Math.abs(value)).toFixed(2)
//       ),
//     },
//     {
//       title: "Profit",
//       dataIndex: "profit",
//       render: (value) => (
//         Number.parseFloat(Math.abs(value)).toFixed(2)
//       ),
//     },
//   ];

//   async function onChange(value, option) {

//     getOddsPositionByUserId(option.key);

//     if (value === null) {
//       // getOddsPositionByUserId(option.key);
//       return setUserListData('');

//     }
//     const filteredData = userLists?.filter(item => item.clientCode === value);
//     if (filteredData.length < 0) {
//       // getOddsPositionByUserId(option.key);
//       return setUserListData('')
//     }
//     setUserListData(filteredData);
//     // getOddsPositionByUserId(option.key);
//   }

//   const onSearch = (value) => {
//     // console.log('search:', value);
//   };

//   // const filterOption = (input, option) => {
//   //   if (typeof option?.children == 'string') {
//   //     return option.children.toLowerCase().includes(input.toLowerCase());
//   //   }
//   //   return false; // Default to false if children is not a string
//   // };

//   const filterOption = (input, option) =>
//     (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


//   const groupByOddsType = (OddsPositionData) => {
//     return OddsPositionData.reduce((acc, item) => {
//       (acc[item.oddsType] = acc[item.oddsType] || []).push(item);
//       return acc;
//     }, {});
//   };
//   const groupedData = groupByOddsType(OddsPositionData || []);


//   return (
//     <>
//       <Row className="">


//       {teamDataList && teamDataList.length > 0 ?
//           <>
//             {Object.entries(groupedData).map(([oddsType, items]) => (
//               <>
//                 <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-mx-2 gx-bg-grey gx-py-2  gx-w-100"><h2 className="gx-text-uppercase gx-text-white gx-mt-1 gx-fs-lg gx-font-weight-bold ">{oddsType}</h2></div>
//                 <div key={oddsType} className="gx-bg-flex gx-overflow-auto">


//                   {items
//                     .sort((a, b) => a.teamName.localeCompare(b.teamName))  // Sort items by teamName alphabetically
//                     .map((item, index) => (
//                       <Col className="gx-my-3 gx-mx-1 gx-px-1 " key={index}>
//                         <div className={`gx-fillchart ${item?.totalPosition && item?.totalPosition > 0 ? "gx-bg-green-0" : "gx-bg-red"} gx-overlay-fillchart`}>
//                           <div className="gx-media gx-align-items-center gx-my-3 gx-px-3 gx-fs-xl">
//                             <div className="gx-mr-xl-3 gx-d-none gx-d-md-block">
//                               <i className={`icon icon-chart gx-fs-icon-lg`} />
//                             </div>
//                             <div className="gx-media-body">
//                               <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white">
//                                 {item?.totalPosition ? item?.totalPosition.toFixed(2) : 0}
//                               </h1>{`(${item?.Position ? item?.Position.toFixed(2) : 0})`}<br />
//                               <h3></h3>
//                               <p className="gx-mb-0 gx-text-nowrap">{item.teamName}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </Col>
//                     ))}
//                 </div>
//               </>
//             ))}</> : null}
//         {/* {OddsPositionData
//               ?.filter(item => item.oddsType === 'bookmaker')  // Filter items where oddsType is 'bookmaker'
//               .sort((a, b) => a.teamName.localeCompare(b.teamName))  // Sort items by teamName alphabetically
//               .map((item, index) => {
//                 return (
//                   <Col className="gx-my-3 gx-mx-1 " key={index}>
//                     <div className={`gx-fillchart ${item?.totalPosition && item?.totalPosition > 0 ? "gx-bg-red" : "gx-bg-green-0"}  gx-overlay-fillchart`}>
//                       <div className="gx-media gx-align-items-center gx-my-3  gx-px-3 gx-fs-xl">
//                         <div className=" gx-mr-xl-3 hide-on-mobile" >
//                           <i className={`icon icon-chart gx-fs-icon-lg  `} />
//                         </div>
//                         <div className="gx-media-body">
//                           <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white">
//                             {item?.totalPosition ? item?.totalPosition : 0}
//                           </h1>
//                           <p className="gx-mb-0">{item.teamName}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Col>
//                 );
//               })}</> : null} */}




//         {/* {teamDataList && teamDataList.length > 0 ? teamDataList?.map((element, index) => (
//           <Col className="gx-my-3 gx-mx-2 " key={index}>
//             <div className={`gx-fillchart ${OddsPositionData[element.selection_id] && Math.round(OddsPositionData[element.selection_id].totalPosition) > 0 ? "gx-bg-red" : "gx-bg-green-0"}  gx-overlay-fillchart`}>
//               <div className="gx-media gx-align-items-center gx-my-3  gx-px-3 gx-fs-xl">
//                 <div className=" gx-mr-xl-3">
//                   <i className={`icon icon-chart gx-fs-icon-lg`} />
//                 </div>
//                 <div className="gx-media-body">
//                   <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white">
//                     {OddsPositionData[element.selection_id] ? Math.round(-1 * OddsPositionData[element.selection_id].totalPosition) : 0}
//                   </h1>
//                   <p className="gx-mb-0">{element.runner_name}</p>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         )) : null} */}
//       </Row>
//       {/* <Row>
  
      
//         {teamDataList && teamDataList.length > 0 ?
//           <>
//             {OddsPositionData
//               ?.filter(item => item.oddsType === 'matchOdds')  // Filter items where oddsType is 'bookmaker'
//               .sort((a, b) => a.teamName.localeCompare(b.teamName))  // Sort items by teamName alphabetically
//               .map((item, index) => {
//                 return (
//                   <Col className="gx-my-3 gx-mx-2 " key={index}>

//                     <div className={`gx-fillchart ${item?.totalPosition && item?.totalPosition > 0 ? "gx-bg-red" : "gx-bg-green-0"}  gx-overlay-fillchart`}>
//                       <div className="gx-media gx-align-items-center gx-my-3  gx-px-3 gx-fs-xl">
//                         <div className=" gx-mr-xl-3 hide-on-mobile ">
                       
//                         </div>
//                         <div className="gx-media-body">
//                           <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white">
//                             {item?.totalPosition ? item?.totalPosition : 0}
//                           </h1>
//                           <p className="gx-mb-0">{item.teamName}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Col>
//                 );
//               })}</> : null}
//       </Row> */}
//       <Card className="gx-card">
//         <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
//           <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`Match Bets`}</span>
//           <BackButton />
//         </div>
//         <div className=" gx-py-2 gx-px-3 gx-text-black">
//           Select
//           <Select className="gx-bg-flex gx-justify-content-start "
//             placeholder="Select a person"
//             showSearch
//             optionFilterProp="children"
//             onChange={onChange}
//             // getPopupContainer={trigger => trigger.parentElement}
//             style={{ width: 300 }}
//             onSearch={onSearch}
//             filterOption={filterOption}

//           >
//             <Option>
//               All User
//             </Option>
//             {showClientList && showClientList.length > 0 ? showClientList?.map(user => (
//               <Option
//                 key={user.clientId}
//                 value={user.userInfo.username}
//                 label={`${user?.userInfo?.name} ${user?.userInfo?.username}`}
//               >
//                 {user.userInfo.username} ({user.userInfo.name})
//               </Option>
//             )) : null}
//           </Select>
//         </div>

//         {/* <Select
//                         showSearch
//                         placeholder="Select a person"
//                         optionFilterProp="children"
//                         onChange={this.onChange}
//                         onSearch={this.onSearch}
//                         filterOption={this.filterOption}
//                         className='w-full'
//                       >
//                         <Option value={""} label={"All User"}>
//                           All User
//                         </Option>
//                         {clientList && clientList.length > 0 ? clientList.map(user => (
//                           <Option key={user.clientId} value={user.clientId}
//                             label={`${user.userInfo.username} ${user.userInfo.name}`}
//                           >
//                             {user.userInfo.name} ({user.userInfo.username})
//                           </Option>
//                         )) : null}
//                       </Select> */}
//         <Table
//           className="gx-table-responsive"
//           columns={columns}
//           dataSource={userListData ? userListData : userLists}
//           bordered
//           pagination={false}
//           size="small"
//           rowClassName={(row, index) => row.type === 'Lagai' ? 'matchdtailsYesBackground gx-font-weight-bold gx-text-dark displayMatchLagai' : row.type === 'Khai' ? 'matchdtailsNoBackground gx-text-dark gx-font-weight-bold displayMatchKhaai' : ' gx-font-weight-bold gx-bg-dark'}
//         />
//       </Card>

//     </>
//   );
// };

// export default Basic;










import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select, Table } from "antd";
import { useParams } from "react-router-dom";
import { httpPost } from "../../../../http/http";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { getClientListByMarketId, getSportsBetsList } from "../../../../appRedux/actions/User";
import TablePagination from "../../../../components/TablePagination";

const Basic = () => {
  const [userLists, setUserLists] = useState([]);
  const [userListData, setUserListData] = useState();
  const [OddsPositionData, setOddsPositionData] = useState([])
  const [teamDataList, setTeamDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [showClientList, setClientList] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { marketId } = useParams();
  const dispatch = useDispatch();
  const { sportsBetsList, clientListByMarketId , userSearchList} = useSelector(state => state.UserReducer);
  useEffect(() => {
    getSportsBetsListFun();
    oddsPosition();
    getClientByMarketId();
    getMatchDataByMarketIdWise();
  }, [marketId, currentPage]);
  let pageSize = 50
  useEffect(() => {
    if (sportsBetsList && sportsBetsList.data && sportsBetsList.data.oddsBetData) {
      const filteredData = sportsBetsList.data.oddsBetData.map((item, index) => {
        let profit = 0;
        let loss = 0;
        item.type = item.type == "L" ? "L" : "K"
        if (item.profit) {
          profit = Number.parseFloat(Math.abs(item.profit)).toFixed(2);
        }
        if (item.loss) {
          loss = Number.parseFloat(Math.abs(item.loss)).toFixed(2);
        }
        if (item.type === "L") {
          profit = item.positionInfo[item.selectionId];
          loss = -1 * item.amount;
        } else if (item.type === "K" || item.type === "k") {
          profit = item.amount;
          loss = -1 * (item.amount * item.odds);
        }
        return {
          key: `${index}`,
          odds: item.odds,
          amount: item.amount,
          type: item.type === "N" ? "NO" :
            item.type === "L" ? "Lagai" :
              item.type === "K" || item.type === "k" ? "Khai" :
                "",
          loss: Number.parseFloat(Math.abs(loss)).toFixed(2),
          profit: Number.parseFloat(Math.abs(profit)).toFixed(2),
          clientCode: item.userInfo.clientCode,
          teamName: item.teamName,
          clientName: item.userInfo.clientName,
          creatorName: item.userInfo.creatorName,
          createdAt: item.createdAt,
          oddsType: item.oddsType
        };
      });
      setUserLists(filteredData);
    }
    if (clientListByMarketId) {
      setClientList(clientListByMarketId);
    }
  }, [sportsBetsList, clientListByMarketId]);
  const getSportsBetsListFun = async () => {
    let reqData = {
      "marketId": marketId,
      "oddsBet": true,
      "isDeleted": 0,
      "downlineUserType": "client",
      "pageNo": currentPage,
      "size": pageSize,
    }
    dispatch(getSportsBetsList(reqData))
  }

  useEffect(() => {
    if (userSearchList) {
      setFilteredOptions(userSearchList);
    }
  }, [userSearchList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const oddsPosition = async () => {
    let reqData = {
      "marketId": marketId
    }
    let response = await httpPost("sports/getOddsPosition", reqData);
    if (response) {
      const convertKeyObject = (objectData, objectKey) => {
        return objectData.reduce((acc, data) => {
          acc[data[objectKey]] = data;
          return acc;
        }, {});
      };
      const finalPos = convertKeyObject(response.data, "_id");
      setOddsPositionData(response.data);
    }
  }

  const getClientByMarketId = async () => {
    let reqData = {
      "marketId": marketId,
      'isMatchBet': true
    }
    dispatch(getClientListByMarketId(reqData))
  }

  const getMatchDataByMarketIdWise = async () => {
    let reqData = {
      "marketId": marketId
    }
    let matchDetails = await httpPost("sports/sportByMarketId", reqData);
    if (matchDetails) {

      if (matchDetails?.data?.teamData) {
        const parsedData2 = JSON.parse(matchDetails.data.teamData);
        setTeamDataList(parsedData2)
      }
    }
  }

  const getOddsPositionByUserId = async (data) => {
    let reqData = {
      "marketId": marketId,
      "userId": data,
      "userType": "client"
    }
    let response = await httpPost("sports/getOddsPosition", reqData);
    if (response) {
      const convertKeyObject = (objectData, objectKey) => {
        return objectData.reduce((acc, data) => {
          acc[data[objectKey]] = data;
          return acc;
        }, {});
      };
      const finalPos = convertKeyObject(response.data, "_id");
      setOddsPositionData(response.data);
    }
  }

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };
  const columns = [
    {
      title: "Rate",
      dataIndex: "odds",
      render: (value) => (
        Number.parseFloat(Math.abs(value) * 100).toFixed(2)
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: renderContent,
    },
    {
      title: "Team",
      dataIndex: "teamName",
      render: renderContent,
    },
    {
      title: "Client",
      dataIndex: "clientName",
      render: (value, row) => `${row.clientName} (${row.clientCode})`,
    },
    {
      title: "OddsType",
      dataIndex: "oddsType",
      render: renderContent,
    },
    {
      title: "Agent",
      dataIndex: "creatorName",
      render: renderContent,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
    },
    {
      title: "Loss",
      dataIndex: "loss",
      render: (value) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },
    {
      title: "Profit",
      dataIndex: "profit",
      render: (value) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },
  ];

  async function onChange(value, option) {

    getOddsPositionByUserId(option.key);

    if (value === null) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('');

    }
    const filteredData = userLists?.filter(item => item.clientCode === value);
    if (filteredData.length < 0) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('')
    }
    setUserListData(filteredData);
    // getOddsPositionByUserId(option.key);
  }
  const onSearch = (value) => {
    // console.log('search:', value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const groupByOddsType = (OddsPositionData) => {
    return OddsPositionData.reduce((acc, item) => {
      (acc[item.oddsType] = acc[item.oddsType] || []).push(item);
      return acc;
    }, {});
  };
  const groupedData = groupByOddsType(OddsPositionData || []);

  async function onChange1(value, option) {
    if (value === null) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('');
    }
    const filteredData = userLists?.filter(item => item.oddsType === value);
    if (filteredData.length < 0) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('')
    }
    setUserListData(filteredData);
    // getOddsPositionByUserId(option.key);
  }


  const uniqueOddsType = userLists && userLists.length > 0
    ? [...new Map(userLists.map(user => [user.oddsType, user])).values()]
    : [];

  return (
    <>
      <Row className="">
    
        {teamDataList && teamDataList.length > 0 ?
          <>
            {Object.entries(groupedData).map(([oddsType, items]) => (
              <>
                <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-mx-2 gx-bg-grey gx-py-2  gx-w-100"><h2 className="gx-text-uppercase gx-text-white gx-mt-1 gx-fs-lg gx-font-weight-bold ">{oddsType}</h2></div>
                <div key={oddsType} className="gx-bg-flex gx-overflow-auto">
                  {items
                    .sort((a, b) => a.teamName.localeCompare(b.teamName))  // Sort items by teamName alphabetically
                    .map((item, index) => (
                      <Col className="gx-my-3 gx-mx-1 gx-px-1 " key={index}>
                        <div className={`gx-fillchart ${item?.totalPosition && -1 * item?.totalPosition > 0 ? "gx-bg-green-0" : "gx-bg-red"} gx-overlay-fillchart`}>
                          <div className="gx-media gx-align-items-center gx-my-3 gx-px-3 gx-fs-xl">
                            <div className="gx-mr-xl-3 gx-d-none gx-d-md-block">
                              <i className={`icon icon-chart gx-fs-icon-lg`} />
                            </div>
                            <div className="gx-media-body">
                              <h1 className="gx-fs-xl gx-font-weight-bold gx-text-white">
                                {item?.totalPosition ? -1 * item?.totalPosition.toFixed(2) : 0}
                              </h1>{`(${item?.Position ? -1 * item?.Position.toFixed(2) : 0})`}<br />
                              <h3></h3>
                              <p className="gx-mb-0 gx-text-nowrap">{item.teamName}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                </div>
              </>
            ))}</> : null}
      </Row>
      <Card className="gx-card">
        <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
          <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`Match Bets`}</span>
          <BackButton />
        </div>
        <Row className="gx-px-2"> <div className=" gx-py-2 gx-px-3 gx-text-black">
          Select
          <Select className="gx-bg-flex gx-justify-content-start "
            placeholder="Select a person"
            showSearch
            optionFilterProp="children"
            onChange={onChange}
            // getPopupContainer={trigger => trigger.parentElement}
            style={{ width: 300 }}
            onSearch={onSearch}
            filterOption={filterOption}
          >
            <Option>
              All User
            </Option>
            {showClientList && showClientList.length > 0 ? showClientList?.map(user => (
              <Option
                key={user.clientId}
                value={user.userInfo.username}
                label={`${user?.userInfo?.name} ${user?.userInfo?.username}`}
              >
                {user.userInfo.username} ({user.userInfo.name})
              </Option>
            )) : null}
          </Select>
        </div>

          {/* select oddsType */}
          <div className=" gx-py-2 gx-px-3 gx-text-black">
            Select OddsType
            <Select className="gx-bg-flex gx-justify-content-start gx-text-"
              placeholder="Select a OddsType"
              showSearch
              optionFilterProp="children"
              onChange={onChange1}
              style={{ width: 300 }}
            // filterOption={filterOption}
            >
              <Option> All OddsType </Option>
              {uniqueOddsType && uniqueOddsType.length > 0 ? uniqueOddsType?.map(user => (
                <Option className="gx-text-"
                  key={user.clientId}
                  value={user.oddsType}
                  label={`${user.oddsType}`}
                >
                  {user.oddsType}
                </Option>
              )) : null}
            </Select>
          </div>
        </Row>

        <Table
          className="gx-table-responsive"
          columns={columns}
          dataSource={userListData ? userListData : userLists}
          bordered
          pagination={false}
          size="small"
          rowClassName={(row, index) => row.type === 'Lagai' ? 'matchdtailsYesBackground gx-font-weight-bold gx-text-dark displayMatchLagai' : row.type === 'Khai' ? 'matchdtailsNoBackground gx-text-dark gx-font-weight-bold displayMatchKhaai' : ' gx-font-weight-bold gx-bg-dark'}
        />
        <TablePagination currentPage={currentPage} totalItems={sportsBetsList?.data?.totalOddsCount} pageSize={pageSize} onPageChange={handlePageChange} />
      </Card>
    </>
  );
};

export default Basic;