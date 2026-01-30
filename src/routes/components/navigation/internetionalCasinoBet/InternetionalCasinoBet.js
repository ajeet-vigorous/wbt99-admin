// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   DatePicker,
//   Row,
//   Table,
//   Col,
//   Typography
// } from "antd";
// import { useParams } from "react-router-dom";
// import moment from "moment";
// import { Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { casinoDiamondBetList, getSportsBetsList } from "../../../../appRedux/actions/User";
// import Loader from "../../../../components/loader";
// import BackButton from "../../Hoc/BackButton";


// const InternetionalCasinoBet = () => {
//   const RangePicker = DatePicker.RangePicker;
//   const { _id } = useParams();
//   const { Text } = Typography;
//   const [userLists, setUserLists] = useState([]);
//   const [ShowUserLists, setShowUserLists] = useState([]);
//   const [selectUser, setSelectUser] = useState();

//   const [showDate, setShowDate] = useState({

//     startDate: moment(),
//     // endDate: moment().subtract(7, 'days'),
//     endDate: moment(),
//   });
//   const [infoMenu, setInfoMenu] = useState({ visible: false, data: null, });

//   const dispatch = useDispatch()
//   const { casinoBetList, loading, sportsBetsList } = useSelector((state) => state.UserReducer);
//   const [finalUserList, setFinalUserList] = useState();


//   useEffect(() => {
//     casinoList();
//   }, []);


//   const casinoList = async () => {
//     let reqData = {
//       gameId: _id,
//       toDate: showDate.startDate.format('YYYY-MM-DD'),
//       fromDate: showDate.endDate.format('YYYY-MM-DD'),
//       pageNo: 1,
//       size: '20',
//       casinoBet: true,
//       // isDeleted: false,
//       sortData: {
//         "createdAt": 1
//       }
//     };
//     dispatch(getSportsBetsList(reqData));
//   };

//   useEffect(() => {
//     if (sportsBetsList) {

   



//       const filteredData = sportsBetsList?.data?.casinoBetData?.map((item, index) => {

//         const profit = item.isDeclare ? (item.creditAmount > 0 ? item.creditAmount - item.debitAmount : 0) : "0";
//         const loss = item.isDeclare ? (item.creditAmount === 0 ? item.debitAmount : "0") : "0";
//         // console.log(loss,"lllll");
//         // console.log(item.creditAmount,"tt111");
      
//         const profitLoss =  item.creditAmount - item.debitAmount + item.rollbackAmount;
//         console.log(profitLoss, "profitLossprofitLoss");
//         return {
//           key: `${item._id}-${index}`,
//           _id: `${item._id}`,
//           createdAt: `${item.createdAt}`,
//           client: `${item.userInfo.name}(${item.userInfo.username})`,
//           roundId: item.roundId,
//           playerName: item.gameName,
//           showResult: item.isDeclare ? 'Declear' : "Not Declear",
//           isDeclare: item.isDeclare,
//           amount: item.debitAmount,
//           profit: profit,
//           loss: loss,
//           profitLoss: profitLoss,
//           resultDetails: item.resultDetails,
//           creditAmount: item.creditAmount,
//           debitAmount: item.debitAmount
          
//         }
//       });
//       setUserLists(filteredData);
//       const uniqueClientName = filteredData
//         ? [...new Set(filteredData?.map((item) => item.client))]
//         : null;
//       setFinalUserList(uniqueClientName)
//     }

//   }, [sportsBetsList?.data?.casinoBetData]);

//   useEffect(() => {
//     const finalUserData = selectUser ? ShowUserLists : userLists;
//     setShowUserLists(finalUserData);
//   }, [selectUser, ShowUserLists, userLists]);

//   const renderContent = (value, row) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     const profitLoss = row.profit;
//     const showResult = row?.showResult

//     if (profitLoss > 0 && showResult === 'Declear') {
//       obj.props.style = { backgroundColor: "green", color: "White" };
//     } else if (profitLoss <= 0 && showResult === 'Declear') {
//       obj.props.style = { backgroundColor: "red", color: "White" };
//     }
//     return obj;
//   };

//   async function getCompleteCasinoList() {
//     let reqData = {
//       gameId: _id,
//       toDate: showDate.startDate.format('YYYY-MM-DD'),
//       fromDate: showDate.endDate.format('YYYY-MM-DD'),
//       pageNo: 1,
//       size: '20',
//       casinoBet: true,
//       isDeleted: false,
//       sortData: {
//         "createdAt": 1
//       }

//     };
//     dispatch(getSportsBetsList(reqData));
//   }

//   async function todayCompleteCasinoList() {
//     let reqData = {
//       gameId: _id,
//       toDate: moment().format('YYYY-MM-DD'),
//       fromDate: moment().format('YYYY-MM-DD'),
//       pageNo: 1,
//       size: '20',
//       casinoBet: true,
//       isDeleted: false,
//       sortData: {
//         "createdAt": 1
//       }
//     };
//     dispatch(getSportsBetsList(reqData));
//   }

//   const renderShowResult = (value, row, index) => {
//     const obj = renderContent(value, row, index);
//     if (row.showResult) {
//       obj.props.onClick = (e) => handleInfo(e, row.resultDetails);
//       obj.props.style = { ...obj.props.style, cursor: "pointer" }; // Change cursor to pointer to indicate it's clickable
//     }
//     return obj;
//   };

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "createdAt",
//       render: renderContent,
//       // render: (date) => (
//       //   <span>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</span>
//       // ),

//     },
//     {
//       title: "Client",
//       dataIndex: "client",
//       render: renderContent,
//     },
//     {
//       title: "Player",
//       dataIndex: "playerName",
//       render: renderContent,
//     },
//     {
//       title: "RoundId",
//       dataIndex: "roundId",
//       render: renderContent,
//     },



//     // {
//     //   title: "Winner",
//     //   dataIndex: "showResult",
//     //   // render: renderShowResult,
//     //   render: renderContent,
//     // },

//     {
//       title: "Stake",
//       dataIndex: "amount",
//       render: renderContent,
//     },

//     // {
//     //   title: "Profit",
//     //   dataIndex: "profit",
//     //   render: renderContent,
//     // },

//     // {
//     //   title: "Loss",
//     //   dataIndex: "loss",
//     //   render: renderContent,
//     // },

//     // {
//     //   title: "LossAmount",
//     //   dataIndex: "loss",
//     //   render: renderContent,
//     // },
//     // {
//     //   title: "WinAmount",
//     //   dataIndex: "profit",
//     //   render: renderContent,
//     // },

//     {
//       title: "PNL",
//       dataIndex: "profitLoss",
//       // render: renderShowResult,
//       render: renderContent,
//     },
//   ];

//   async function onChange(dates, dateStrings) {
//     setShowDate({
//       startDate: dates[0],
//       endDate: dates[1],
//     });

//   }

//   const handleInputChange = async (value) => {
//     setSelectUser(value);
//     if (value === "All") {
//       setShowUserLists(userLists); // Show all users if "All" is selected
//     } else {
//       const filteredData = userLists.filter((item) => item.client === value);
//       setShowUserLists(filteredData);
//     }
//   };

//   const handleInfo = (e, showResult) => {
//     e.preventDefault();
//     setInfoMenu({
//       visible: true,
//       data: showResult,
//     });
//   };

//   const handleClose = () => {
//     setInfoMenu({
//       visible: false,
//     });
//   };
//   const Option = Select.Option;

//   const components = {
//     body: {
//       row: ({ children, ...restProps }) => (
//         <tr {...restProps} className="no-hover">
//           {children}
//         </tr>
//       ),
//     },
//   };



//   return (
//     <>
//       {loading ? <Loader props={loading} /> :
//         <Card className="gx-card">
//           <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex">
//             <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`International Casino Details`}</span>
//             <BackButton />
//           </div>

//           <div className="gx-mt-3">
//             <Row style={{ gap: 16 }} className="gx-px-5" >
//               <Col className="gx-bg-flex gx-gap-3" style={{ gap: 5 }}>
//                 <RangePicker
//                   className="gx-border-redius0"
//                   ranges={{
//                     Today: [moment(), moment()],
//                     Yesterday: [
//                       moment().subtract(1, "days"),
//                       moment().subtract(1, "days"),
//                     ],
//                     "This Week": [moment().startOf("week"), moment().endOf("week")],
//                     "Last Week": [
//                       moment().subtract(1, "week").startOf("week"),
//                       moment().subtract(1, "week").endOf("week"),
//                     ],
//                     "This Month": [
//                       moment().startOf("month"),
//                       moment().endOf("month"),
//                     ],
//                     "Last Month": [
//                       moment().subtract(1, "month").startOf("month"),
//                       moment().subtract(1, "month").endOf("month"),
//                     ],
//                   }}
//                   onChange={onChange}
//                   defaultValue={[showDate.startDate, showDate.endDate]}
//                 />

//                 <Select style={{ width: 300 }} defaultValue="All" onChange={value => handleInputChange(value)}
//                 // getPopupContainer={trigger => trigger.parentElement}
//                 >
//                   <Select.Option value="All"  >All</Select.Option>
//                   {finalUserList && finalUserList?.map((item, index) => (
//                     <Select.Option key={`${index}`} value={item}  >{item}</Select.Option>
//                   ))}
//                 </Select>
//               </Col>
//               <div className="gx-px-2">
//                 <Button type="danger" onClick={() => getCompleteCasinoList()}>Apply</Button>
//                 <Button type="primary" onClick={() => todayCompleteCasinoList()} >Today P/L</Button>
//               </div>
//             </Row>
//           </div>


//           <div>
//             <Table
//               className="gx-table-responsive"
//               columns={columns}
//               dataSource={ShowUserLists}
//               bordered
//               pagination={false}
//               size="small"
//               components={components}
//               summary={(ShowUserLists) => {
//                 console.log(ShowUserLists, "datadatadatadata");
//                 let totalProfit = 0;
//                   let totalLoss = 0;
//                   let totalprofitloss =  0;
//                 ShowUserLists?.forEach((data, key) => {
//                   totalprofitloss += data?.profitLoss
//                     // if (data.creditAmount > 0 && data.isDeclare) {
//                     //   totalProfit += (data.creditAmount - data.debitAmount);
//                     // }
//                     // if (data.creditAmount === 0 && data.isDeclare) {
//                     //   totalLoss += data.debitAmount;
//                     // }
                
//                 });

//                 return (
//                   <Table.Summary.Row >
//                     <Table.Summary.Cell index={0} className="gx-font-weight-bold "></Table.Summary.Cell>
//                     <Table.Summary.Cell index={1}>
//                       <Text></Text>
//                     </Table.Summary.Cell>

//                     <Table.Summary.Cell index={2}>
//                       <Text></Text>
//                     </Table.Summary.Cell>

//                     <Table.Summary.Cell index={3}>
//                     <Text className="gx-font-weight-bold gx-fs-lg">Total</Text>
//                     </Table.Summary.Cell>
                  


//                     <Table.Summary.Cell index={6}>
//                     <Text></Text>
//                       {/* <Text className="gx-text-black gx-font-weight-bold gx-fs-lg">{totalLoss}</Text> */}
//                     </Table.Summary.Cell>
//                     <Table.Summary.Cell index={7}>
//                       <Text className="gx-text-black gx-font-weight-bold gx-fs-lg">{totalprofitloss}</Text>
//                     </Table.Summary.Cell>


//                   </Table.Summary.Row>
//                 )
//               }}




//             // footer={() => 
//             //   <>
//             // <div className="gx-w-75 gx-text-black gx-font-weight-semi-bold gx-fs-lg">Total</div>
//             // <div>{totalProfit}</div>
//             // </>
//             // }


//             />
//           </div>


//         </Card>}
//     </>
//   );
// };

// export default InternetionalCasinoBet;


import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Row,
  Table,
  Col,
  Typography
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { casinoDiamondBetList, getSportsBetsList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const InternetionalCasinoBet = () => {
  const RangePicker = DatePicker.RangePicker;
  const history = useHistory();
  const { _id, fromDate, toDate } = useParams();
  const { Text } = Typography;
  const [userLists, setUserLists] = useState([]);
  const [ShowUserLists, setShowUserLists] = useState([]);
  const [selectUser, setSelectUser] = useState();

  const [showDate, setShowDate] = useState({
    // startDate: moment(),
    // endDate: moment(),
    startDate: moment(fromDate),
    endDate: moment(toDate),
  });
  const [infoMenu, setInfoMenu] = useState({ visible: false, data: null, });

  const dispatch = useDispatch()
  const { casinoBetList, loading, sportsBetsList } = useSelector((state) => state.UserReducer);
  const [finalUserList, setFinalUserList] = useState();


  useEffect(() => {
    casinoList();
  }, []);


  const casinoList = async () => {
    let reqData = {
      gameId: _id,
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: '50',
      casinoBet: true,
      // isDeleted: false,
      sortData: {
        "createdAt": 1
      }
    };
    dispatch(getSportsBetsList(reqData));
  };

  useEffect(() => {
    if (sportsBetsList) {
      const filteredData = sportsBetsList?.data?.casinoBetData?.map((item, index) => {
        const profit = item.isDeclare ? (item.creditAmount > 0 ? item.creditAmount - item.debitAmount : 0) : "0";
        const loss = item.isDeclare ? (item.creditAmount === 0 ? item.debitAmount : "0") : "0";

        const profitLoss = item.creditAmount - item.debitAmount + item.rollbackAmount;
        return {
          key: `${item._id}-${index}`,
          _id: `${item._id}`,
          createdAt: `${moment(item.createdAt).format("DD-MM-YYYY")}`,
          client: `${item.userInfo.name}(${item.userInfo.username})`,
          roundId: item.roundId,
          playerName: item.gameName,
          showResult: item.isDeclare ? 'Declear' : "Not Declear",
          isDeclare: item.isDeclare,
          amount: item.debitAmount,
          profit: profit,
          loss: loss,
          profitLoss: profitLoss,
          resultDetails: item.resultDetails,
          creditAmount: item.creditAmount,
          debitAmount: item.debitAmount

        }
      });
      setUserLists(filteredData);
      const uniqueClientName = filteredData
        ? [...new Set(filteredData?.map((item) => item.client))]
        : null;
      setFinalUserList(uniqueClientName)
    }

  }, [sportsBetsList?.data?.casinoBetData]);

  useEffect(() => {
    const finalUserData = selectUser ? ShowUserLists : userLists;
    setShowUserLists(finalUserData);
  }, [selectUser, ShowUserLists, userLists]);

  const renderContent = (value, row) => {
    const obj = {
      children: value,
      props: {},
    };
    const profitLoss = row.profit;
    const showResult = row?.showResult

    if (profitLoss > 0 && showResult === 'Declear') {
      obj.props.style = { backgroundColor: "green", color: "White" };
    } else if (profitLoss <= 0 && showResult === 'Declear') {
      obj.props.style = { backgroundColor: "red", color: "White" };
    }
    return obj;
  };

  async function getCompleteCasinoList() {
    let reqData = {
      gameId: _id,
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: '20',
      casinoBet: true,
      isDeleted: false,
      sortData: {
        "createdAt": 1
      }
    };
    dispatch(getSportsBetsList(reqData));
  }

  async function todayCompleteCasinoList() {
    let reqData = {
      gameId: _id,
      toDate: moment().format('YYYY-MM-DD'),
      fromDate: moment().format('YYYY-MM-DD'),
      pageNo: 1,
      size: '20',
      casinoBet: true,
      isDeleted: false,
      sortData: { "createdAt": 1 }
    };
    dispatch(getSportsBetsList(reqData));
  }

  const renderShowResult = (value, row, index) => {
    const obj = renderContent(value, row, index);
    if (row.showResult) {
      obj.props.onClick = (e) => handleInfo(e, row.resultDetails);
      obj.props.style = { ...obj.props.style, cursor: "pointer" }; // Change cursor to pointer to indicate it's clickable
    }
    return obj;
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: renderContent,
      // render: (date) => (
      //   <span>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</span>
      // ),
    },
    {
      title: "Client",
      dataIndex: "client",
      render: renderContent,
    },
    {
      title: "Player",
      dataIndex: "playerName",
      render: renderContent,
    },
    {
      title: "RoundId",
      dataIndex: "roundId",
      render: renderContent,
    },

    // {
    //   title: "Winner",
    //   dataIndex: "showResult",
    //   // render: renderShowResult,
    //   render: renderContent,
    // },

    {
      title: "Stake",
      dataIndex: "amount",
      render: renderContent,
    },

    // {
    //   title: "Profit",
    //   dataIndex: "profit",
    //   render: renderContent,
    // },

    // {
    //   title: "Loss",
    //   dataIndex: "loss",
    //   render: renderContent,
    // },

    // {
    //   title: "LossAmount",
    //   dataIndex: "loss",
    //   render: renderContent,
    // },
    // {
    //   title: "WinAmount",
    //   dataIndex: "profit",
    //   render: renderContent,
    // },

    {
      title: "PNL",
      dataIndex: "profitLoss",
      // render: renderShowResult,
      render: renderContent,
    },
  ];

  async function onChange(dates, dateStrings) {
    history.push(`/components/navigation/internetionalcasino-bet/${dates[0].format('YYYY-MM-DD')}&${dates[1].format('YYYY-MM-DD')}`);
    setShowDate({
      startDate: dates[0],
      endDate: dates[1],
    });
  }

  const handleInputChange = async (value) => {
    setSelectUser(value);
    if (value === "All") {
      setShowUserLists(userLists); // Show all users if "All" is selected
    } else {
      const filteredData = userLists.filter((item) => item.client === value);
      setShowUserLists(filteredData);
    }
  };

  const handleInfo = (e, showResult) => {
    e.preventDefault();
    setInfoMenu({
      visible: true,
      data: showResult,
    });
  };

  const handleClose = () => {
    setInfoMenu({
      visible: false,
    });
  };
  const Option = Select.Option;

  const components = {
    body: {
      row: ({ children, ...restProps }) => (
        <tr {...restProps} className="no-hover">
          {children}
        </tr>
      ),
    },
  };



  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex">
            <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`International Casino Details`}</span>
            <BackButton />
          </div>

          <div className="gx-mt-3">
            <Row style={{ gap: 16 }} className="gx-px-5" >
              <Col className="gx-bg-flex gx-gap-3" style={{ gap: 5 }}>
                <RangePicker
                  className="gx-border-redius0"
                  ranges={{
                    Today: [moment(), moment()],
                    Yesterday: [
                      moment().subtract(1, "days"),
                      moment().subtract(1, "days"),
                    ],
                    "This Week": [moment().startOf("week"), moment().endOf("week")],
                    "Last Week": [
                      moment().subtract(1, "week").startOf("week"),
                      moment().subtract(1, "week").endOf("week"),
                    ],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                    "Last Month": [
                      moment().subtract(1, "month").startOf("month"),
                      moment().subtract(1, "month").endOf("month"),
                    ],
                  }}
                  onChange={onChange}
                  defaultValue={[showDate.startDate, showDate.endDate]}
                />

                <Select style={{ width: 300 }} defaultValue="All" onChange={value => handleInputChange(value)}
                // getPopupContainer={trigger => trigger.parentElement}
                >
                  <Select.Option value="All"  >All</Select.Option>
                  {finalUserList && finalUserList?.map((item, index) => (
                    <Select.Option key={`${index}`} value={item}  >{item}</Select.Option>
                  ))}
                </Select>
              </Col>
              <div className="gx-px-2">
                {/* <Button type="danger" onClick={() => getCompleteCasinoList()}>Apply</Button> */}
                <Button type="primary" onClick={() => todayCompleteCasinoList()} >Today P/L</Button>
              </div>
            </Row>
          </div>


          <div>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={ShowUserLists}
              bordered
              pagination={false}
              size="small"
              components={components}
              summary={(ShowUserLists) => {
              
                let totalProfit = 0;
                let totalLoss = 0;
                let totalprofitloss = 0;
                ShowUserLists?.forEach((data, key) => {
                  totalprofitloss += data?.profitLoss
                  // if (data.creditAmount > 0 && data.isDeclare) {
                  //   totalProfit += (data.creditAmount - data.debitAmount);
                  // }
                  // if (data.creditAmount === 0 && data.isDeclare) {
                  //   totalLoss += data.debitAmount;
                  // }

                });

                return (
                  <Table.Summary.Row >
                    <Table.Summary.Cell index={0} className="gx-font-weight-bold "></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text></Text>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={2}>
                      <Text></Text>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={3}>
                      <Text className="gx-font-weight-bold gx-fs-lg">Total</Text>
                    </Table.Summary.Cell>



                    <Table.Summary.Cell index={6}>
                      <Text></Text>
                      {/* <Text className="gx-text-black gx-font-weight-bold gx-fs-lg">{totalLoss}</Text> */}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                      <Text className="gx-text-black gx-font-weight-bold gx-fs-lg">{totalprofitloss}</Text>
                    </Table.Summary.Cell>


                  </Table.Summary.Row>
                )
              }}




            // footer={() => 
            //   <>
            // <div className="gx-w-75 gx-text-black gx-font-weight-semi-bold gx-fs-lg">Total</div>
            // <div>{totalProfit}</div>
            // </>
            // }


            />
          </div>


        </Card>}
    </>
  );
};

export default InternetionalCasinoBet;

