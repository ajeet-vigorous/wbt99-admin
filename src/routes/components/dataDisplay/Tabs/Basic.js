// // import React, { useEffect, useState } from "react";
// // import { Button, Card, Table, Input, DatePicker, Row, Col } from "antd";
// // import moment from "moment";
// // import BackButton from "../../Hoc/BackButton";
// // import { decisionresetComm, getuserCommissionReport } from "../../../../appRedux/actions/User";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom/cjs/react-router-dom.min";
// // import Loader from "../../../../components/loader";

// // const RangePicker = DatePicker.RangePicker;
// // const Basic = () => {
// //   const dispatch = useDispatch();
// //   // reset ke action per ye api jayegiu with userId Payload ke sath decision/resetComm"
// //   const [userLists, setUserLists] = useState([]);
// //   const [username, setUsername] = useState("");

// //   const [showDate, setShowDate] = useState({
// //     startDate: moment().subtract(7, 'days'),
// //     endDate: moment()
// //   });
// //   const { userCommissionReport, loading } = useSelector(state => state.UserReducer);

// //   useEffect(() => {
// //     if (userCommissionReport) {
// //       setUserLists(userCommissionReport);
// //     }
// //   }, [userCommissionReport])


// //   const renderContent = (value, row, index) => {
// //     const obj = {
// //       children: value,
// //       props: {},
// //     };
// //     if (index === 12) {
// //       obj.props.colSpan = 0;
// //     }
// //     return obj;
// //   };

// //   const ResetUserLeneDena = (data) => {

// //     const payload = {
// //       userId: data,
// //     };
// //     dispatch(decisionresetComm(payload))


// //   }


// //   const columns = [
// //     {
// //       title: "Mila Hai",
// //       children: [
// //         {
// //           title: 'Name',
// //           dataIndex: 'username',
// //           render: (value, row) => (
// //             <span className="gx-text-black">{`${row.userInfo.name} (${row.userInfo.username})`}</span>
// //           ),
// //         },
// //         {
// //           title: 'M.Comm.',
// //           dataIndex: 'oddsComm',
// //           // render: renderContent,
// //           render: (value, row) => <span className="gx-text-green-0">{`${row.oddsComm}`}</span>

// //         },
// //         {
// //           title: 'S.Comm.',
// //           dataIndex: 'sessionComm',
// //           // render: renderContent,
// //           render: (value, row) => <span className="gx-text-green-0">{`${row.sessionComm}`}</span>
// //         },
// //         {
// //           title: 'C.Comm.',
// //           dataIndex: 'casinoComm',
// //           // render: renderContent,
// //           render: (value, row) => <span className="gx-text-green-0">{`${row.casinoComm}`}</span>

// //         },
// //         {
// //           title: 'T.Comm.',
// //           // dataIndex: 'tComm',
// //           render: (value, row) => <span className="gx-text-green-0">{parseInt(row.oddsComm) + parseInt(row.sessionComm) + parseInt(row.casinoComm)}</span>



// //         },
// //         {
// //           title: 'Action.',
// //           dataIndex: 'action',
// //           render: (value, row) => (
// //             <Row className="gx-pl-4">
// //               <Col > 
// //             <Button className="gx-bg-grey gx-text-white" onClick={() => ResetUserLeneDena(row._id)}> Reset </Button>
// //             <Link  to={`/components/commlenadena/comm-lenadena-history/${row?._id}`}>
// //             <Button className="gx-bg-grey gx-text-white"> History </Button>
// //             </Link>
// //             </Col>
// //             </Row>
// //           ),
// //         },
// //       ]
// //     },
// //     {
// //       title: "Dena hai",
// //       children: [{
// //         title: 'M.Comm.',
// //         dataIndex: 'downlineOddsComm',
// //         // render: renderContent,
// //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineOddsComm}`}</span>
// //       },
// //       {
// //         title: 'S.Comm.',
// //         dataIndex: 'downlineSessionComm',
// //         // render: renderContent,
// //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineSessionComm}`}</span>

// //       },
// //       {
// //         title: 'C.Comm.',
// //         dataIndex: 'downlineCasinoComm',
// //         // render: renderContent,
// //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineCasinoComm}`}</span>

// //       },
// //       {
// //         title: 'T.Comm.',
// //         // dataIndex: 'tComm',
// //         // render: renderContent,
// //         render: (value, row) => <span className="gx-text-red ">{parseInt(row.downlineOddsComm) + parseInt(row.downlineSessionComm) + parseInt(row.downlineCasinoComm)}</span>

// //       }]
// //     }
// //   ];

// //   const handleUsernameChange = (e) => {

// //     setUsername(e.target.value);
// //   };

// //   function onChange(dates, dateStrings) {
// //     setShowDate({
// //       startDate: dates[0],
// //       endDate: dates[1]
// //     });
// //   }

// //   const handleApplyClick = async () => {
// //     const payload = {
// //       username,
// //       fromDate: showDate.startDate.format('YYYY-MM-DD'),
// //       toDate: showDate.endDate.format('YYYY-MM-DD'),
// //     };
// //     dispatch(getuserCommissionReport(payload))
// //   };


// //   return (
// //     <>

// //       <Card className="gx-card gx-w-100">
// //         <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
// //           <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
// //             Commission Len Den
// //           </span>
// //           <BackButton />
// //         </div>

// //         {/* <FormItem  className="" > */}
// //         <div className="gx-mt-3">

// //         <Row style={{gap: 20}} className="gx-px-5" >
// //           <Col>
// //             <RangePicker className=" gx-border-redius0 "

// //                 ranges={{
// //                   Today: [moment(), moment()],
// //                   Yesterday: [
// //                     moment().subtract(1, "days"),
// //                     moment().subtract(1, "days"),
// //                   ],
// //                   "This Week": [moment().startOf("week"), moment().endOf("week")],
// //                   "Last Week": [
// //                     moment().subtract(1, "week").startOf("week"),
// //                     moment().subtract(1, "week").endOf("week"),
// //                   ],
// //                   "This Month": [
// //                     moment().startOf("month"),
// //                     moment().endOf("month"),
// //                   ],
// //                   "Last Month": [
// //                     moment().subtract(1, "month").startOf("month"),
// //                     moment().subtract(1, "month").endOf("month"),
// //                   ],
// //                 }}
// //               onChange={onChange}
// //               style={{ width: 300 }}
// //               value={[showDate.startDate, showDate.endDate]}
// //             />
// //           </Col>
// //           <Col>
// //             <Input className=" gx-border-redius0 " placeholder="Username"
// //               value={username}
// //               onChange={handleUsernameChange}
// //               style={{ width: 300 }}
// //             />
// //           </Col>
// //           <Col>
// //           <Button  style={{backgroundColor : username ? "#D2042D" : "#AA4A44"}} className="gx-border-redius0 gx-text-white" onClick={username ? () => handleApplyClick(): null}>Apply</Button>
// //             {/* <Button type="danger" className="gx-border-redius0" onClick={() => handleApplyClick()}>Apply</Button> */}
// //           </Col>

// //         </Row>

// //         </div>
// //         {/* </FormItem> */}
// //         {loading ? <Loader props={loading} /> :
// //         <Table
// //           className="gx-table-responsive"
// //           columns={columns}
// //           dataSource={userLists}
// //           bordered
// //           pagination={false}
// //           size="small"
// //         />
// //       } 
// //       </Card>
// //     </>

// //   );
// // };

// // export default Basic;










// // // import React, { useEffect, useState } from "react";
// // // import { Button, Card, Table, Input, DatePicker, Row, Col } from "antd";
// // // import Loader from "../../../../components/loader";
// // // import moment from "moment";
// // // import BackButton from "../../Hoc/BackButton";
// // // import { getuserCommissionReport, userCommissionReport } from "../../../../appRedux/actions/User";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { start } from "nprogress";

// // // const RangePicker = DatePicker.RangePicker;
// // // const Basic = () => {
// // //   const dispatch = useDispatch();
// // //   // reset ke action per ye api jayegiu with userId Payload ke sath decision/resetComm"
// // //   const [userLists, setUserLists] = useState([]);
// // //   const [username, setUsername] = useState("");
// // //   const [showDate, setShowDate] = useState({
// // //     startDate: null,
// // //     endDate: null
// // //   });
// // //   const { userCommissionReport, loading } = useSelector(state => state.UserReducer);

// // //   useEffect(() => {
// // //     if (userCommissionReport) {
// // //       setUserLists(userCommissionReport);
// // //     }
// // //   }, [userCommissionReport])
// // //   const renderContent = (value, row, index) => {
// // //     const obj = {
// // //       children: value,
// // //       props: {},
// // //     };
// // //     if (index === 12) {
// // //       obj.props.colSpan = 0;
// // //     }
// // //     return obj;
// // //   };


// // //   const columns = [
// // //     {
// // //       title: "Mila Hai",
// // //       children: [
// // //         {
// // //           title: 'Name',
// // //           dataIndex: 'username',
// // //           render: (value, row) => (
// // //             <span className="gx-text-black">{`${row.userInfo.name} (${row.userInfo.username})`}</span>
// // //           ),
// // //         },
// // //         {
// // //           title: 'M.Comm.',
// // //           dataIndex: 'oddsComm',
// // //           // render: renderContent,
// // //           render: (value, row) => <span className="gx-text-green-0">{`${row.oddsComm}`}</span>

// // //         },
// // //         {
// // //           title: 'S.Comm.',
// // //           dataIndex: 'sessionComm',
// // //           // render: renderContent,
// // //           render: (value, row) => <span className="gx-text-green-0 ">{`${row.sessionComm}`}</span>
// // //         },
// // //         {
// // //           title: 'C.Comm.',
// // //           dataIndex: 'casinoComm',
// // //           // render: renderContent,
// // //           render: (value, row) => <span className="gx-text-green-0 ">{`${row.casinoComm}`}</span>

// // //         },
// // //         {
// // //           title: 'T.Comm.',
// // //           // dataIndex: 'tComm',
// // //           render: (value, row) => <span className="gx-text-green-0 ">{parseInt(row.oddsComm) + parseInt(row.sessionComm) + parseInt(row.casinoComm)}</span>



// // //         },
// // //         {
// // //           title: 'Action.',
// // //           dataIndex: 'action',
// // //           render: () => (
// // //             <Row className="gx-pl-4"><Col > <Button className="gx-bg-grey gx-text-white" onClick={() => alert(userLists._id)}> Reset </Button> <Button className="gx-bg-grey gx-text-white"> History </Button></Col></Row>
// // //           ),
// // //         },
// // //       ]
// // //     },
// // //     {
// // //       title: "Dena hai",
// // //       children: [{
// // //         title: 'M.Comm.',
// // //         dataIndex: 'downlineOddsComm',
// // //         // render: renderContent,
// // //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineOddsComm}`}</span>
// // //       },
// // //       {
// // //         title: 'S.Comm.',
// // //         dataIndex: 'downlineSessionComm',
// // //         // render: renderContent,
// // //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineSessionComm}`}</span>

// // //       },
// // //       {
// // //         title: 'C.Comm.',
// // //         dataIndex: 'downlineCasinoComm',
// // //         // render: renderContent,
// // //         render: (value, row) => <span className="gx-text-red ">{`${row.downlineCasinoComm}`}</span>

// // //       },
// // //       {
// // //         title: 'T.Comm.',
// // //         // dataIndex: 'tComm',
// // //         // render: renderContent,
// // //         render: (value, row) => <span className="gx-text-red ">{parseInt(row.downlineOddsComm) + parseInt(row.downlineSessionComm) + parseInt(row.downlineCasinoComm)}</span>

// // //       }]
// // //     }
// // //   ];

// // //   const handleUsernameChange = (e) => {
// // //     setUsername(e.target.value);
// // //   };

// // //   function onChange(dates, dateStrings) {
// // //     setShowDate({
// // //       startDate: dates[0],
// // //       endDate: dates[1]
// // //     });
// // //   }

// // //   const handleApplyClick = async () => {
// // //     const payload = {
// // //       username,
// // //       fromDate: showDate.startDate.format('YYYY-MM-DD'),
// // //       toDate: showDate.endDate.format('YYYY-MM-DD'),
// // //     };

// // //     // try {
// // //     // userCommissionReport
// // //     dispatch(getuserCommissionReport(payload))
// // //     // const response = await httpPost('decision/userCommissionReport', payload);
// // //     //   setUserLists(response.data);
// // //     // } catch (error) {
// // //     //   console.error("There was an error fetching the data!", error);
// // //     // }
// // //   };


// // //   return (
// // //     <>
// // //       {/* {loading ? <Loader props={loading} /> : */}
// // //       <Card className="gx-card gx-w-100">
// // //         <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
// // //           <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
// // //             Commission Len Den
// // //           </span>
// // //           <BackButton />
// // //         </div>

// // //         {/* <FormItem  className="" > */}
// // //         <div className="gx-mt-3">

// // //         <Row style={{gap: 20}} className="gx-px-5" >
// // //           <Col>
// // //             <RangePicker className=" gx-border-redius0 "

// // //                 ranges={{
// // //                   Today: [moment(), moment()],
// // //                   Yesterday: [
// // //                     moment().subtract(1, "days"),
// // //                     moment().subtract(1, "days"),
// // //                   ],
// // //                   "This Week": [moment().startOf("week"), moment().endOf("week")],
// // //                   "Last Week": [
// // //                     moment().subtract(1, "week").startOf("week"),
// // //                     moment().subtract(1, "week").endOf("week"),
// // //                   ],
// // //                   "This Month": [
// // //                     moment().startOf("month"),
// // //                     moment().endOf("month"),
// // //                   ],
// // //                   "Last Month": [
// // //                     moment().subtract(1, "month").startOf("month"),
// // //                     moment().subtract(1, "month").endOf("month"),
// // //                   ],
// // //                 }}
// // //               onChange={onChange}
// // //               style={{ width: 300 }}
// // //             />
// // //           </Col>
// // //           <Col>
// // //             <Input className=" gx-border-redius0 " placeholder="Username"
// // //               value={username}
// // //               onChange={handleUsernameChange}
// // //               style={{ width: 300 }}
// // //             />
// // //           </Col>
// // //           <Col>
// // //             <Button type="danger" className="gx-border-redius0" onClick={() => handleApplyClick()}>Apply</Button>
// // //           </Col>

// // //         </Row>

// // //         </div>
// // //         {/* </FormItem> */}

// // //         <Table
// // //           className="gx-table-responsive"
// // //           columns={columns}
// // //           dataSource={userLists}
// // //           bordered
// // //           pagination={false}
// // //           size="small"
// // //         />
// // //       </Card>
// // //       {/* } */}
// // //     </>

// // //   );
// // // };

// // // export default Basic;










// import React, { useEffect, useState } from "react";
// import { Button, Card, Table, Input, DatePicker, Row, Col } from "antd";
// import moment from "moment";
// import BackButton from "../../Hoc/BackButton";
// import { decisionresetComm, getuserCommissionReport } from "../../../../appRedux/actions/User";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import Loader from "../../../../components/loader";
// import CommissionModal from "./CommissionModal";


// const RangePicker = DatePicker.RangePicker;
// const Basic = () => {
//   const dispatch = useDispatch();
//   const [modalOpen, setModalOpen] = useState(false)
//   const [showModalData, setModalData] = useState([])

//   const [userLists, setUserLists] = useState([]);
//   const [username, setUsername] = useState("");
//   const [showDate, setShowDate] = useState({
//     startDate: moment().subtract(7, 'days'),
//     endDate: moment()
//   });
//   const { userCommissionReport, userCommissionReportMess, loading } = useSelector(state => state.UserReducer);
//   const agentUser = JSON.parse(localStorage.getItem("user_id"))



//   useEffect(() => {
//     setUserLists([])
//     if (userCommissionReport) {
//       let data = userCommissionReport || [];

//       let oddsCommArray = data.map(item => item.oddsComm);
//       let totalOddsComm = oddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let sessionCommArray = data.map(item => item.sessionComm);
//       let totalSessionComm = sessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let casinoCommArray = data.map(item => item.casinoComm);
//       let totalCasinoComm = casinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineOddsCommArray = data.map(item => item.downlineOddsComm);
//       let totalDownlineOddsComm = downlineOddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineSessionCommArray = data.map(item => item.downlineSessionComm);
//       let totalDownlineSessionComm = downlineSessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineCasinoCommArray = data.map(item => item.downlineCasinoComm);
//       let totalDownlineCasinoComm = downlineCasinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);



//       // Create a total row and add it to the end of the data array
//       const totalRow = {

//         oddsComm: totalOddsComm,
//         sessionComm: totalSessionComm,
//         casinoComm: totalCasinoComm,
//         downlineOddsComm: totalDownlineOddsComm,
//         downlineSessionComm: totalDownlineSessionComm,
//         downlineCasinoComm: totalDownlineCasinoComm,
//       };

//       setUserLists([totalRow, ...userCommissionReport]);
//     }
//   }, [userCommissionReport]);







//   useEffect(() => {
//     setUserLists([])
//     if (agentUser?.data?.userType === "agent") {
//       handleApplyClick();
//     }
//   }, [])

//   const ResetUserLeneDena = (data) => {

//     const payload = {
//       userId: data,
//     };
//     dispatch(decisionresetComm(payload))

//   }

//   const modalopen = (data) => {
//     setModalData(data)
//     setModalOpen(true)
//     // showCommissionModal
//   }

//   const modalClose = () => {
//     setModalData([])
//     setModalOpen(false)
//     // showCommissionModal
//   }

//   const columns = [
//     {
//       title: "Mila Hai",
//       children: [
//         {
//           title: 'Name',
//           dataIndex: 'username',
//           render: (value, row) => (
//             <span className="gx-text-blue gx-text-nowrap" onClick={() => modalopen(row)}>
//               {row?.userInfo?.username ? (
//                 <>
//                   <span className="gx-px-2 ">{row.userInfo.name} ({row.userInfo.username})</span>
//                   <i className="icon icon-view-o" />
//                 </>
//               ) : (
//                 <span className="gx-text-white">
//                   {userCommissionReportMess?.name ?
//                     `${userCommissionReportMess.name} [${userCommissionReportMess.username}]`
//                     : ""
//                   }
//                 </span>


//               )}
//             </span>

//           ),
//         },
//         {
//           title: 'M.Comm.',
//           dataIndex: 'oddsComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.oddsComm).toFixed(2)}`}</span>

//         },
//         {
//           title: 'S.Comm.',
//           dataIndex: 'sessionComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.sessionComm).toFixed(2)}`}</span>
//         },
//         {
//           title: 'C.Comm.',
//           dataIndex: 'casinoComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.casinoComm).toFixed(2)}`}</span>

//         },
//         {
//           title: 'T.Comm.',
//           // dataIndex: 'tComm',
//           render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)}</span>



//         },
//         {
//           title: 'Action.',
//           dataIndex: 'action',
//           render: (value, row, index) => (
//             index !== 0 && <Row className="gx-pl-4" key={index}>
//               <Col className="">
//                 <Button
//                   className="gx-bg-grey gx-text-white"
//                   onClick={() => ResetUserLeneDena(row?._id)}
//                 >
//                   Reset
//                 </Button>
//                 <Link to={`/components/commlenadena/comm-lenadena-history/${row?._id}`}>
//                   <Button className="gx-bg-grey gx-text-white">History</Button>
//                 </Link>
//               </Col>
//             </Row>
//           ),
//         }

//       ]
//     },
//     {
//       title: "Dena hai",
//       children: [{
//         title: 'M.Comm.',
//         dataIndex: 'downlineOddsComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineOddsComm).toFixed(2)}`}</span>
//       },
//       {
//         title: 'S.Comm.',
//         dataIndex: 'downlineSessionComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineSessionComm).toFixed(2)}`}</span>

//       },
//       {
//         title: 'C.Comm.',
//         dataIndex: 'downlineCasinoComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineCasinoComm).toFixed(2)}`}</span>

//       },
//       {
//         title: 'T.Comm.',
//         // dataIndex: 'tComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm)).toFixed(2)}</span>

//       }]
//     },




//     {
//       title: "Bacha Hai",
//       children: [
//         {
//           title: 'Comm',
//           render: (value, row) => {
//             // Calculate the value
//             const total = (parseInt(row?.oddsComm) || 0) + (parseInt(row?.sessionComm) || 0) + (parseInt(row?.casinoComm) || 0);
//             const downlineTotal = (parseInt(row?.downlineOddsComm) || 0) + (parseInt(row?.downlineSessionComm) || 0) + (parseInt(row?.downlineCasinoComm) || 0);
//             const result = total - downlineTotal;

//             // Determine the CSS class based on the value
//             const textColorClass = result >= 0 ? 'gx-text-green-0' : 'gx-text-red';

//             // Render the result with the appropriate CSS class
//             return <span className={textColorClass}>{result.toFixed(2)}</span>;
//           }
//         }


//         // {
//         //   title: 'T Comm',
//         //   // dataIndex: 'oddsComm',
//         //   // render: renderContent,
//         //   render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)-(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm))}</span>

//         // },


//       ]
//     },
//   ];




//   const handleUsernameChange = (e) => {

//     setUsername(e.target.value);
//   };

//   function onChange(dates, dateStrings) {
//     setShowDate({
//       startDate: dates[0],
//       endDate: dates[1]
//     });
//   }

//   const handleApplyClick = async () => {
//     let payload = {};
//     if (agentUser?.data?.userType === "agent") {
//       payload = {
//         fromDate: showDate.startDate.format('YYYY-MM-DD'),
//         toDate: showDate.endDate.format('YYYY-MM-DD'),
//       };
//       return dispatch(getuserCommissionReport(payload))
//     }
//     else if (agentUser?.data?.userType !== "agent" && username) {
//       payload = {
//         username,
//         fromDate: showDate.startDate.format('YYYY-MM-DD'),
//         toDate: showDate.endDate.format('YYYY-MM-DD'),
//       };
//       return dispatch(getuserCommissionReport(payload))
//     }
//   };

//   return (
//     <>
//       <Card className="gx-card gx-w-100">
//         <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
//           <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
//             Commission Len Den
//           </span>
//           <BackButton />
//         </div>
//         <div className="gx-mt-3">
//           <Row style={{ gap: 20 }} className="gx-px-5" >
//             <Col>
//               <RangePicker className=" gx-border-redius0 "

//                 ranges={{
//                   Today: [moment(), moment()],
//                   Yesterday: [
//                     moment().subtract(1, "days"),
//                     moment().subtract(1, "days"),
//                   ],
//                   "This Week": [moment().startOf("week"), moment().endOf("week")],
//                   "Last Week": [
//                     moment().subtract(1, "week").startOf("week"),
//                     moment().subtract(1, "week").endOf("week"),
//                   ],
//                   "This Month": [
//                     moment().startOf("month"),
//                     moment().endOf("month"),
//                   ],
//                   "Last Month": [
//                     moment().subtract(1, "month").startOf("month"),
//                     moment().subtract(1, "month").endOf("month"),
//                   ],
//                 }}
//                 onChange={onChange}
//                 style={{ width: 300 }}
//                 value={[showDate.startDate, showDate.endDate]}
//               />
//             </Col>

//             {agentUser?.data?.userType !== "agent" ?
//               <Col>
//                 <Input className=" gx-border-redius0 " placeholder="Agent Username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   style={{ width: 300 }}
//                 />
//               </Col>
//               : null}
//             <Col>
//               <Button style={{ backgroundColor: username ? "#D2042D" : "#AA4A44" }} className="gx-border-redius0 gx-text-white" onClick={() => handleApplyClick()}>Apply</Button>
//               {/* <Button  style={{backgroundColor : username ? "#D2042D" : "#AA4A44"}} className="gx-border-redius0 gx-text-white" onClick={username ? () => handleApplyClick(): null}>Apply</Button> */}
//               {/* <Button type="danger" className="gx-border-redius0" onClick={() => handleApplyClick()}>Apply</Button> */}
//             </Col>
//           </Row>

//         </div>
//         {/* </FormItem> */}
//         {loading ? <Loader props={loading} /> :
//           <Table
//             className="gx-table-responsive"
//             columns={columns}
//             dataSource={userLists}
//             bordered
//             pagination={false}
//             size="small"
//             rowClassName={(row, index) => index === 0 ? 'gx-bg-dark gx-font-weight-semi-bold' : 'gx-font-weight-semi-bold'}
//           />
//         }
//       </Card>


//       {modalOpen && (
//         <CommissionModal
//           handleClose={modalClose}
//           datalist={showModalData}
//         // marketId={marketId}
//         />
//       )}
//     </>

//   );
// };
// export default Basic;













// import React, { useEffect, useState } from "react";
// import { Button, Card, Table, Input, DatePicker, Row, Col } from "antd";
// import moment from "moment";
// import BackButton from "../../Hoc/BackButton";
// import { decisionresetComm, getuserCommissionReport } from "../../../../appRedux/actions/User";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import Loader from "../../../../components/loader";
// import CommissionModal from "./CommissionModal";


// const RangePicker = DatePicker.RangePicker;
// const Basic = () => {
//   const dispatch = useDispatch();
//   const [modalOpen, setModalOpen] = useState(false)
//   const [showModalData, setModalData] = useState([])

//   const [userLists, setUserLists] = useState([]);
//   const [username, setUsername] = useState("");
//   const [showDate, setShowDate] = useState([null, null]); 
//   const { userCommissionReport, userCommissionReportMess, loading } = useSelector(state => state.UserReducer);
//   const agentUser = JSON.parse(localStorage.getItem("user_id"))



//   useEffect(() => {
//     setUserLists([])
//     if (userCommissionReport) {
//       let data = userCommissionReport || [];

//       let oddsCommArray = data.map(item => item.oddsComm);
//       let totalOddsComm = oddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let sessionCommArray = data.map(item => item.sessionComm);
//       let totalSessionComm = sessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let casinoCommArray = data.map(item => item.casinoComm);
//       let totalCasinoComm = casinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineOddsCommArray = data.map(item => item.downlineOddsComm);
//       let totalDownlineOddsComm = downlineOddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineSessionCommArray = data.map(item => item.downlineSessionComm);
//       let totalDownlineSessionComm = downlineSessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//       let downlineCasinoCommArray = data.map(item => item.downlineCasinoComm);
//       let totalDownlineCasinoComm = downlineCasinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);



//       // Create a total row and add it to the end of the data array
//       const totalRow = {

//         oddsComm: totalOddsComm,
//         sessionComm: totalSessionComm,
//         casinoComm: totalCasinoComm,
//         downlineOddsComm: totalDownlineOddsComm,
//         downlineSessionComm: totalDownlineSessionComm,
//         downlineCasinoComm: totalDownlineCasinoComm,
//       };

//       setUserLists([totalRow, ...userCommissionReport]);
//     }
//   }, [userCommissionReport]);







//   useEffect(() => {
//     setUserLists([])
//     if (agentUser?.data?.userType === "agent") {
//       handleApplyClick();
//     }
//   }, [])

//   const ResetUserLeneDena = (data) => {

//     const payload = {
//       userId: data,
//     };
//     dispatch(decisionresetComm(payload))

//   }

//   const modalopen = (data) => {
//     setModalData(data)
//     setModalOpen(true)
//     // showCommissionModal
//   }

//   const modalClose = () => {
//     setModalData([])
//     setModalOpen(false)
//     // showCommissionModal
//   }

//   const columns = [
//     {
//       title: "Mila Hai",
//       children: [
//         {
//           title: 'Name',
//           dataIndex: 'username',
//           render: (value, row) => (
//             <span className="gx-text-blue gx-text-nowrap" onClick={() => modalopen(row)}>
//               {row?.userInfo?.username ? (
//                 <>
//                   <span className="gx-px-2 ">{row.userInfo.name} ({row.userInfo.username})</span>
//                   <i className="icon icon-view-o" />
//                 </>
//               ) : (
//                 <span className="gx-text-white">
//                   {userCommissionReportMess?.name ?
//                     `${userCommissionReportMess.name} [${userCommissionReportMess.username}]`
//                     : ""
//                   }
//                 </span>


//               )}
//             </span>

//           ),
//         },
//         {
//           title: 'M.Comm.',
//           dataIndex: 'oddsComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.oddsComm).toFixed(2)}`}</span>

//         },
//         {
//           title: 'S.Comm.',
//           dataIndex: 'sessionComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.sessionComm).toFixed(2)}`}</span>
//         },
//         {
//           title: 'C.Comm.',
//           dataIndex: 'casinoComm',
//           // render: renderContent,
//           render: (value, row) => <span className="gx-text-green-0">{`${(row?.casinoComm).toFixed(2)}`}</span>

//         },
//         {
//           title: 'T.Comm.',
//           // dataIndex: 'tComm',
//           render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)}</span>



//         },
//         {
//           title: 'Action.',
//           dataIndex: 'action',
//           render: (value, row, index) => (
//             index !== 0 && <Row className="gx-pl-4" key={index}>
//               <Col className="">
//                 <Button
//                   className="gx-bg-grey gx-text-white"
//                   onClick={() => ResetUserLeneDena(row?._id)}
//                 >
//                   Reset
//                 </Button>
//                 <Link to={`/components/commlenadena/comm-lenadena-history/${row?._id}`}>
//                   <Button className="gx-bg-grey gx-text-white">History</Button>
//                 </Link>
//               </Col>
//             </Row>
//           ),
//         }

//       ]
//     },
//     {
//       title: "Dena hai",
//       children: [{
//         title: 'M.Comm.',
//         dataIndex: 'downlineOddsComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineOddsComm).toFixed(2)}`}</span>
//       },
//       {
//         title: 'S.Comm.',
//         dataIndex: 'downlineSessionComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineSessionComm).toFixed(2)}`}</span>

//       },
//       {
//         title: 'C.Comm.',
//         dataIndex: 'downlineCasinoComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineCasinoComm).toFixed(2)}`}</span>

//       },
//       {
//         title: 'T.Comm.',
//         // dataIndex: 'tComm',
//         // render: renderContent,
//         render: (value, row) => <span className="gx-text-red ">{(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm)).toFixed(2)}</span>

//       }]
//     },




//     {
//       title: "Bacha Hai",
//       children: [
//         {
//           title: 'Comm',
//           render: (value, row) => {
//             // Calculate the value
//             const total = (parseInt(row?.oddsComm) || 0) + (parseInt(row?.sessionComm) || 0) + (parseInt(row?.casinoComm) || 0);
//             const downlineTotal = (parseInt(row?.downlineOddsComm) || 0) + (parseInt(row?.downlineSessionComm) || 0) + (parseInt(row?.downlineCasinoComm) || 0);
//             const result = total - downlineTotal;

//             // Determine the CSS class based on the value
//             const textColorClass = result >= 0 ? 'gx-text-green-0' : 'gx-text-red';

//             // Render the result with the appropriate CSS class
//             return <span className={textColorClass}>{result.toFixed(2)}</span>;
//           }
//         }


//         // {
//         //   title: 'T Comm',
//         //   // dataIndex: 'oddsComm',
//         //   // render: renderContent,
//         //   render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)-(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm))}</span>

//         // },


//       ]
//     },
//   ];




//   const handleUsernameChange = (e) => {

//     setUsername(e.target.value);
//   };

//   // function onChange(dates, dateStrings) {
//   //   setShowDate({
//   //     startDate: dates[0],
//   //     endDate: dates[1]
//   //   });
//   // }

//   function onChange(dates) {
//     if (dates && dates.length) {
//       setShowDate([dates[0], dates[1]]);
//     } else {
//       setShowDate([null, null]); // Reset to null if no date is selected
//     }
//   }

//   // const handleApplyClick = async () => {
//   //   let payload = {};
//   //   if (agentUser?.data?.userType === "agent") {
//   //     payload = {
//   //       fromDate: showDate.startDate.format('YYYY-MM-DD'),
//   //       toDate: showDate.endDate.format('YYYY-MM-DD'),
//   //     };
//   //     return dispatch(getuserCommissionReport(payload))
//   //   }
//   //   else if (agentUser?.data?.userType !== "agent" && username) {
//   //     payload = {
//   //       username,
//   //       // fromDate: showDate.startDate.format('YYYY-MM-DD'),
//   //       // toDate: showDate.endDate.format('YYYY-MM-DD'),
//   //     };
//   //     return dispatch(getuserCommissionReport(payload))
//   //   }
//   // };

// //   const handleApplyClick = async () => {
// //     let payload = {};

// //     if (agentUser?.data?.userType === "agent") {

// //         if (!showDate.startDate.isSame(moment().subtract(7, 'days'), 'day') || !showDate.endDate.isSame(moment(), 'day')) {
// //             payload = {
// //                 fromDate: showDate.startDate.format('YYYY-MM-DD'),
// //                 toDate: showDate.endDate.format('YYYY-MM-DD'),
// //             };
// //         }
// //     }

// //     else if (agentUser?.data?.userType !== "agent" && username) {
// //         payload = {
// //             username,
// //         };

// //         if (!showDate.startDate.isSame(moment().subtract(7, 'days'), 'day') || !showDate.endDate.isSame(moment(), 'day')) {
// //             payload.fromDate = showDate.startDate.format('YYYY-MM-DD');
// //             payload.toDate = showDate.endDate.format('YYYY-MM-DD');
// //         }
// //     }
// //     if (Object.keys(payload).length > 0) {
// //         return dispatch(getuserCommissionReport(payload));
// //     }
// // };


// const handleApplyClick = async () => {
//   let payload = {};

//   if (agentUser?.data?.userType === "agent") {
//     if (showDate[0] && showDate[1]) {
//       payload = {
//         fromDate: showDate[0].format('YYYY-MM-DD'),
//         toDate: showDate[1].format('YYYY-MM-DD'),
//       };
//     }
//   } else if (agentUser?.data?.userType !== "agent" && username) {
//     payload = { username };

//     if (showDate[0] && showDate[1]) {
//       payload.fromDate = showDate[0].format('YYYY-MM-DD');
//       payload.toDate = showDate[1].format('YYYY-MM-DD');
//     }
//   }

//   if (Object.keys(payload).length > 0) {
//     dispatch(getuserCommissionReport(payload));
//   }
// };

//   return (
//     <>
//       <Card className="gx-card gx-w-100">
//         <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
//           <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
//             Commission Len Den
//           </span>
//           <BackButton />
//         </div>
//         <div className="gx-mt-3">
//           <Row style={{ gap: 20 }} className="gx-px-5" >
//             <Col>
//               <RangePicker className=" gx-border-redius0 "

//                 ranges={{
//                   Today: [moment(), moment()],
//                   Yesterday: [
//                     moment().subtract(1, "days"),
//                     moment().subtract(1, "days"),
//                   ],
//                   "This Week": [moment().startOf("week"), moment().endOf("week")],
//                   "Last Week": [
//                     moment().subtract(1, "week").startOf("week"),
//                     moment().subtract(1, "week").endOf("week"),
//                   ],
//                   "This Month": [
//                     moment().startOf("month"),
//                     moment().endOf("month"),
//                   ],
//                   "Last Month": [
//                     moment().subtract(1, "month").startOf("month"),
//                     moment().subtract(1, "month").endOf("month"),
//                   ],
//                 }}
//                 onChange={onChange}
//                 style={{ width: 300 }}
//                 value={showDate[0] && showDate[1] ? showDate : [null, null]}
//               />
//             </Col>

//             {agentUser?.data?.userType !== "agent" ?
//               <Col>
//                 <Input className=" gx-border-redius0 " placeholder="Agent Username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   style={{ width: 300 }}
//                 />
//               </Col>
//               : null}
//             <Col>
//               <Button style={{ backgroundColor: username ? "#D2042D" : "#AA4A44" }} className="gx-border-redius0 gx-text-white" onClick={() => handleApplyClick()}>Apply</Button>
//               {/* <Button  style={{backgroundColor : username ? "#D2042D" : "#AA4A44"}} className="gx-border-redius0 gx-text-white" onClick={username ? () => handleApplyClick(): null}>Apply</Button> */}
//               {/* <Button type="danger" className="gx-border-redius0" onClick={() => handleApplyClick()}>Apply</Button> */}
//             </Col>
//           </Row>

//         </div>
//         {/* </FormItem> */}
//         {loading ? <Loader props={loading} /> :
//           <Table
//             className="gx-table-responsive"
//             columns={columns}
//             dataSource={userLists}
//             bordered
//             pagination={false}
//             size="small"
//             rowClassName={(row, index) => index === 0 ? 'gx-bg-dark gx-font-weight-semi-bold' : 'gx-font-weight-semi-bold'}
//           />
//         }
//       </Card>


//       {modalOpen && (
//         <CommissionModal
//           handleClose={modalClose}
//           datalist={showModalData}
//         // marketId={marketId}
//         />
//       )}
//     </>

//   );
// };
// export default Basic;




import React, { useEffect, useState } from "react";
import { Button, Card, Table, Input, DatePicker, Row, Col } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { decisionresetComm, decisionresetCommList, getuserCommissionReport } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../../../components/loader";
import CommissionModal from "./CommissionModal";
import BasicComm from "../../commlenadena/CommLenaDenaHistory/Basic";
import { httpPost } from "../../../../http/http";
import { NotificationManager } from "react-notifications";
import { HistoryOutlined, RedoOutlined } from "@ant-design/icons";


const RangePicker = DatePicker.RangePicker;
const Basic = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false)
  const [isResetCommModal, setResetCommModal] = useState(false)
  const [isResetCommData, setResetCommData] = useState()
  const [showModalData, setModalData] = useState([])

  const [userLists, setUserLists] = useState([]);
  const [username, setUsername] = useState("");
  const [showDate, setShowDate] = useState([null, null]);
  const { userCommissionReport, userCommissionReportMess, loading, dicisionReset } = useSelector(state => state.UserReducer);
  const agentUser = JSON.parse(localStorage.getItem("user_id"))



  useEffect(() => {
    setUserLists([])
    if (userCommissionReport) {
      let data = userCommissionReport || [];

      let oddsCommArray = data.map(item => item.oddsComm);
      let totalOddsComm = oddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let sessionCommArray = data.map(item => item.sessionComm);
      let totalSessionComm = sessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let casinoCommArray = data.map(item => item.casinoComm);
      let totalCasinoComm = casinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let downlineOddsCommArray = data.map(item => item.downlineOddsComm);
      let totalDownlineOddsComm = downlineOddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let downlineSessionCommArray = data.map(item => item.downlineSessionComm);
      let totalDownlineSessionComm = downlineSessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let downlineCasinoCommArray = data.map(item => item.downlineCasinoComm);
      let totalDownlineCasinoComm = downlineCasinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);



      // Create a total row and add it to the end of the data array
      const totalRow = {

        oddsComm: totalOddsComm,
        sessionComm: totalSessionComm,
        casinoComm: totalCasinoComm,
        downlineOddsComm: totalDownlineOddsComm,
        downlineSessionComm: totalDownlineSessionComm,
        downlineCasinoComm: totalDownlineCasinoComm,
      };

      setUserLists([totalRow, ...userCommissionReport]);
    }
  }, [userCommissionReport]);


  useEffect(() => {
    setUserLists([])
    if (agentUser?.data?.userType === "agent") {
      handleApplyClick();
    }
  }, [])

  const ResetUserLeneDena = async (data) => {

    let reqData = {
      userId: data,
    }
    let userLedger = await httpPost('decision/resetComm', reqData);
    if (userLedger) {
      NotificationManager.success(userLedger?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      let searchComm = {
        "username": username,
      };
      await dispatch(getuserCommissionReport(searchComm));
    }
  }

  const modalopen = (data) => {
    setModalData(data)
    setModalOpen(true)
    // showCommissionModal
  }

  const modalClose = () => {
    setModalData([])
    setModalOpen(false)
    setResetCommModal(false)
    // showCommissionModal
  }


  const resetCommModal = (value) => {
    setResetCommModal(true)
    setResetCommData(value)
    LoginReportFun(value)
  }
  const resetModalClose = () => {
    setResetCommModal(false)
    setResetCommData()

    // showCommissionModal
  }

  const LoginReportFun = async (payload) => {
    let loginData = {
      userId: payload
    }
    dispatch(decisionresetCommList(loginData))
  }

  const columns = [
    {
      title: "Mila Hai",
      children: [
        {
          title: 'Name',
          dataIndex: 'username',
          render: (value, row) => (
            <span className="gx-text-blue gx-text-nowrap" onClick={() => modalopen(row)}>
              {row?.userInfo?.username ? (
                <>
                  <span className="gx-px-2 ">{row.userInfo.name} ({row.userInfo.username})</span>
                  <i className="icon icon-view-o" />
                </>
              ) : (
                <span className="gx-text-white">
                  {userCommissionReportMess?.name ?
                    `${userCommissionReportMess.name} [${userCommissionReportMess.username}]`
                    : ""
                  }
                </span>


              )}
            </span>

          ),
        },
        {
          title: 'M.Comm.',
          dataIndex: 'oddsComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.oddsComm).toFixed(2)}`}</span>

        },
        {
          title: 'S.Comm.',
          dataIndex: 'sessionComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.sessionComm).toFixed(2)}`}</span>
        },
        {
          title: 'C.Comm.',
          dataIndex: 'casinoComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.casinoComm).toFixed(2)}`}</span>

        },
        {
          title: 'T.Comm.',
          // dataIndex: 'tComm',
          render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)}</span>



        },
        {
          title: 'Action.',
          dataIndex: 'action',
          render: (value, row, index) => (
            index !== 0 && <Row className="gx-pl-4" key={index}>
              <Col className="">
                <Button
                  className="gx-bg-primary gx-text-white"
                  onClick={() => ResetUserLeneDena(row?._id)}
                >
                  <RedoOutlined />
                  Reset
                </Button>
                {/* <Link to={`/components/commlenadena/comm-lenadena-history/${row?._id}`}> */}

                <Button className="gx-text-primary" onClick={() => resetCommModal(row?._id)}>
                  <HistoryOutlined />
                  History</Button>

                {/* </Link> */}
              </Col>
            </Row>
          ),
        }

      ]
    },
    {
      title: "Dena hai",
      children: [{
        title: 'M.Comm.',
        dataIndex: 'downlineOddsComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineOddsComm).toFixed(2)}`}</span>
      },
      {
        title: 'S.Comm.',
        dataIndex: 'downlineSessionComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineSessionComm).toFixed(2)}`}</span>

      },
      {
        title: 'C.Comm.',
        dataIndex: 'downlineCasinoComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.downlineCasinoComm).toFixed(2)}`}</span>

      },
      {
        title: 'T.Comm.',
        // dataIndex: 'tComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm)).toFixed(2)}</span>

      }]
    },




    {
      title: "Bacha Hai",
      children: [
        {
          title: 'Comm',
          render: (value, row) => {
            // Calculate the value
            const total = (parseInt(row?.oddsComm) || 0) + (parseInt(row?.sessionComm) || 0) + (parseInt(row?.casinoComm) || 0);
            const downlineTotal = (parseInt(row?.downlineOddsComm) || 0) + (parseInt(row?.downlineSessionComm) || 0) + (parseInt(row?.downlineCasinoComm) || 0);
            const result = total - downlineTotal;

            // Determine the CSS class based on the value
            const textColorClass = result >= 0 ? 'gx-text-green-0' : 'gx-text-red';

            // Render the result with the appropriate CSS class
            return <span className={textColorClass}>{result.toFixed(2)}</span>;
          }
        }


        // {
        //   title: 'T Comm',
        //   // dataIndex: 'oddsComm',
        //   // render: renderContent,
        //   render: (value, row) => <span className="gx-text-green-0">{(parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)).toFixed(2)-(parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm))}</span>

        // },


      ]
    },
  ];




  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };


  function onChange(dates) {
    if (dates && dates.length) {
      setShowDate([dates[0], dates[1]]);
    } else {
      setShowDate([null, null]); // Reset to null if no date is selected
    }
  }

  // const handleApplyClick = async () => {
  //   let payload = {};
  //   if (agentUser?.data?.userType === "agent") {
  //     payload = {
  //       fromDate: showDate.startDate.format('YYYY-MM-DD'),
  //       toDate: showDate.endDate.format('YYYY-MM-DD'),
  //     };
  //     return dispatch(getuserCommissionReport(payload))
  //   }
  //   else if (agentUser?.data?.userType !== "agent" && username) {
  //     payload = {
  //       username,
  //       // fromDate: showDate.startDate.format('YYYY-MM-DD'),
  //       // toDate: showDate.endDate.format('YYYY-MM-DD'),
  //     };
  //     return dispatch(getuserCommissionReport(payload))
  //   }
  // };

  //   const handleApplyClick = async () => {
  //     let payload = {};

  //     if (agentUser?.data?.userType === "agent") {

  //         if (!showDate.startDate.isSame(moment().subtract(7, 'days'), 'day') || !showDate.endDate.isSame(moment(), 'day')) {
  //             payload = {
  //                 fromDate: showDate.startDate.format('YYYY-MM-DD'),
  //                 toDate: showDate.endDate.format('YYYY-MM-DD'),
  //             };
  //         }
  //     }

  //     else if (agentUser?.data?.userType !== "agent" && username) {
  //         payload = {
  //             username,
  //         };

  //         if (!showDate.startDate.isSame(moment().subtract(7, 'days'), 'day') || !showDate.endDate.isSame(moment(), 'day')) {
  //             payload.fromDate = showDate.startDate.format('YYYY-MM-DD');
  //             payload.toDate = showDate.endDate.format('YYYY-MM-DD');
  //         }
  //     }
  //     if (Object.keys(payload).length > 0) {
  //         return dispatch(getuserCommissionReport(payload));
  //     }
  // };

  let userInfo = JSON.parse(localStorage.getItem("user_id"));
  const handleApplyClick = async () => {
    let payload = {};

    if (agentUser?.data?.userType === "agent") {
      if (showDate[0] && showDate[1]) {
        payload = {
          fromDate: showDate[0].format('YYYY-MM-DD'),
          toDate: showDate[1].format('YYYY-MM-DD'),
          username: userInfo.data.username
        };
      }
    } else if (agentUser?.data?.userType !== "agent" && username) {
      payload = { username };

      if (showDate[0] && showDate[1]) {
        payload.fromDate = showDate[0].format('YYYY-MM-DD');
        payload.toDate = showDate[1].format('YYYY-MM-DD');
      }
    }

    if (Object.keys(payload).length > 0) {
      dispatch(getuserCommissionReport(payload));
    }
  };


  useEffect(() => {
    let reqData = {
      username: userInfo.data.username
    }
    dispatch(getuserCommissionReport(reqData));
  }, [])

  // username

  return (
    <>
      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-pt-1 gx-text-uppercase">
            Commission Len Den
          </span>
          <BackButton />
        </div>
        <div className="gx-py-3">
          <Row style={{ gap: 20 }} className="gx-px-5" >
            <Col>
              <RangePicker className=" gx-border-redius0 "

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
                style={{ width: 300 }}
                value={showDate[0] && showDate[1] ? showDate : [null, null]}
              />
            </Col>

            {agentUser?.data?.userType !== "agent" ?
              <Col>
                <Input className=" gx-border-redius0 " placeholder="Agent Username"
                  value={username}
                  onChange={handleUsernameChange}
                  style={{ width: 300 }}
                />
              </Col>
              : null}
            <Col>
              <Button style={{ backgroundColor: username ? "#D2042D" : "#AA4A44" }} size="large" className="gx-border-redius gx-px-3 gx-text-white" onClick={() => handleApplyClick()}>Apply</Button>
              {/* <Button  style={{backgroundColor : username ? "#D2042D" : "#AA4A44"}} className="gx-border-redius0 gx-text-white" onClick={username ? () => handleApplyClick(): null}>Apply</Button> */}
              {/* <Button type="danger" className="gx-border-redius0" onClick={() => handleApplyClick()}>Apply</Button> */}
            </Col>
          </Row>

        </div>
        {/* </FormItem> */}
        {loading ? <Loader props={loading} /> :
          <Table
            className="gx-table-responsive gx-text-uppercase"
            columns={columns}
            dataSource={userLists}
            bordered
            pagination={false}
            size="small"
            rowClassName={(row, index) => index === 0 ? 'gx-bg-dark gx-font-weight-semi-bold' : 'gx-font-weight-semi-bold'}
          />
        }
      </Card>


      {modalOpen && (
        <CommissionModal
          handleClose={modalClose}
          datalist={showModalData}
        // marketId={marketId}
        />
      )}

      {isResetCommModal && (
        <BasicComm
          resetModalClose={resetModalClose}
          datalist={isResetCommData}
        // marketId={marketId}
        />
      )}
    </>

  );
};
export default Basic;