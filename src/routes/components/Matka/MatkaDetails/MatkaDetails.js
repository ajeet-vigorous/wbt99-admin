// import React, { useEffect, useState } from "react";
// import { Card, Table, Typography } from "antd";
// import BackButton from "../../Hoc/BackButton";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getMatkaProfitLossPos, getProfitLossPos, plusMinusByMarketIdByUserWiseList } from "../../../../appRedux/actions/User";
// import Loader from "../../../../components/loader";
// import moment from "moment";

// const getUPDownlineUserType = (param) => {
//     let userDetails = param;
//     let downlineUserPriority = parseInt(userDetails) + 1;

//     // let downlineUserPriority = parseInt(userDetails);

//     if (!downlineUserPriority) {
//         return "";
//     }
//     let downlineUserType = "";

//     switch (downlineUserPriority) {
//         case 9:
//             downlineUserType = "owner";
//             downlineUserPriority = 9;
//             break;
//         case 8:
//             downlineUserType = "subowner";
//             downlineUserPriority = 8;
//             break;
//         case 7:
//             downlineUserType = "superadmin";
//             downlineUserPriority = 7;
//             break;
//         case 6:
//             downlineUserType = "admin";
//             downlineUserPriority = 6;
//             break;
//         case 5:
//             downlineUserType = "subadmin";
//             downlineUserPriority = 5;
//             break;
//         case 4:
//             downlineUserType = "master";
//             downlineUserPriority = 4;
//             break;
//         case 3:
//             downlineUserType = "superagent";
//             downlineUserPriority = 3;
//             break;
//         case 2:
//             downlineUserType = "agent";
//             downlineUserPriority = 2;
//             break;
//         case 1:
//             downlineUserType = "client";
//             downlineUserPriority = 1;
//             break;
//         default:
//             break;
//     }
//     return downlineUserType;
// };

// const MatkaDetails = () => {
//     const { Text } = Typography;
//     const { marketId, matchName, eventId, date } = useParams();
//     const [userLists, setUserLists] = useState([]);
//     const dispatch = useDispatch()
//     const { getMatkaProfitLossList, loading } = useSelector((state) => state.UserReducer);

//     useEffect(() => {
//         let userData = JSON.parse(localStorage.getItem('user_id'));
//         let childDetails = userData.data;
//         featchUserList(childDetails);
//     }, []);

//     const parsedDate = moment(date, "DD-MM-YYYY");

//     const featchUserList = async (data) => {
//         const downlineUserType = getUPDownlineUserType(data?.userPriority);
//         let reqData = {
//             "toDate": date,
//             "fromDate": date,
//             "userId": data.parentId ? data.parentId : data.userId,
//             "userType": downlineUserType ? downlineUserType : data.userType,
//             "eventId": eventId


//         };
//         dispatch(getMatkaProfitLossPos(reqData));
//         return setUserLists([]);
//     };

//     const redirectUserList = (data) => {
//         const { id, userType } = data;
//         const userId = id;
//         const reqData = { userId, userType };
//         featchUserList(reqData);

//     }

//     useEffect(() => {
//         if (getMatkaProfitLossList && getMatkaProfitLossList.length > 0) {
//             const filteredData = getMatkaProfitLossList?.map((item) => {


//                 let clientMatchSessionAmt = item.userData.userType != 'client' ? (-1 * item.clientOddsAmount) - (item.userOddsComm) : Number(item.clientOddsAmount) + Number(item.userOddsComm);
//                 let userMatchSessionComm = item.userOddsComm + item.userSessionComm
//                 let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm;
//                 let userMyComm = item.userData.userType !== 'client' ? clientMatchSessionAmt - ( item.userLedgerAmt): userTotalAmountAndComm - Number(item.userLedgerAmt) ;



//                 return {
//                     key: item._id,
//                     username: item.userData.username,
//                     name: item.userData.name,
//                     userData: item.userData,
//                     userType: item.userData.userType,
//                     userNetProfitLoss: item.userNetProfitLoss,
//                     downlineUserType: item.downlineUserType,
//                     clientNetAmount: item.clientNetAmount,
//                     clientOddsAmount: item.userData.userType !== 'client' ? -1 * item.clientOddsAmount : item.clientOddsAmount,
//                     clientSessionAmount: item.userData.userType !== 'client' ?  -1 * item.userOddsComm : item.userOddsComm,
//                     userOddsComm: item.userOddsComm,
//                     userSessionComm: item.userSessionComm,
//                     userLedgerAmt: item.userData.userType !== 'client' ?  item.userLedgerAmt : item.clientNetAmount,
//                     userTotalAmountAndComm: userTotalAmountAndComm,
//                     userMatchSessionComm: userMatchSessionComm,
//                     clientMatchSessionAmt: clientMatchSessionAmt,
//                     userMyComm: userMyComm
//                 };
//             });
//             setUserLists(filteredData);
//         }
//     }, [getMatkaProfitLossList]);
//     // const uniqueUserTypes = Array.from(new Set(userLists?.map((row) => row?.userData?.userType)));

//     const shareTitle = userLists?.map((row) => row?.userData?.userType);



//     const renderContent = (value, row, index) => {
//         if (value === 'client') {
//             return null; // Render null if downlineUserType is 'client'
//         } else {
//             return {
//                 children: value,
//                 props: {},
//             };
//         }
//     };


//     const columns = [
//         {
//             title: 'Code',
//             dataIndex: 'username',
//             render: (value, row) => {
//                 // Check if row.downlineUserType exists and render accordingly
//                 if (row.downlineUserType) {
//                     return (
//                         <span className="gx-pointer gx-font-weight-bold"
//                             onClick={() => redirectUserList(row?.userData)}

//                         >
//                             {`${row.username}`}
//                         </span>
//                     );
//                 } else {
//                     return <span className="gx-pointer gx-font-weight-bold">{row?.username}</span>;
//                 }
//             }
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             render: renderContent,
//         },
//         {
//             title: 'Casino Amt',
//             dataIndex: 'clientOddsAmount',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Casino Comm',
//             dataIndex: 'clientSessionAmount',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Total',
//             dataIndex: 'clientMatchSessionAmt',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             // title: `${shareTitle[0]} Share`,
//             title: `My Share`,
//             dataIndex: 'userMyComm', //userNetProfitLoss
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },


//         // {
//         //     title: 'Casino Comm+',
//         //     dataIndex: 'userOddsComm',
//         //     render: (value) => (
//         //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//         //             {Number(value).toFixed(2)}
//         //         </span>
//         //     ),

//         // },
//         // {
//         //     title: 'Session Comm+',
//         //     dataIndex: 'userSessionComm',
//         //     render: (value) => (
//         //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//         //             {Number(value).toFixed(2)}
//         //         </span>
//         //     ),

//         // },
//         // {
//         //     title: 'Total Comm',
//         //     dataIndex: 'userMatchSessionComm',
//         //     render: (value) => (
//         //         <span className={` gx-font-weight-bold ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//         //             {Number(value).toFixed(2)}
//         //         </span>
//         //     ),

//         // },
//         // {
//         //     title: 'Total Amount',
//         //     dataIndex: 'userTotalAmountAndComm',
//         //     render: (value) => (
//         //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//         //             {Number(value).toFixed(2)}
//         //         </span>
//         //     ),

//         // },

//         {
//             title: 'M.App',
//             dataIndex: 'n',
//             render: (value, row) => `0.00`,
//         },
//         {
//             title: 'Net Amount',
//             dataIndex: 'userLedgerAmt',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),
//         },
//     ];

//     return (
//         <>
//             {/* {loading ? <Loader props={loading} /> : */}
//             <Card className="gx-card ">
//                 <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
//                     <span className="gx-fs-xxl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">Company Matka Report<br />
//                         <p className="gx-fs-lg">{matchName}</p></span>
//                     <BackButton />
//                 </div>
//                 <div>
//                     <Table
//                         columns={columns}
//                         dataSource={userLists}
//                         scroll={{ x: true }}
//                         pagination={false}
//                         size="small"
//                         bordered
//                         summary={(userLists) => {
//                             let totalMatchAmt = 0;
//                             let totalSesionAmt = 0;
//                             let totalMatchSessionAmt = 0;
//                             let totalMatchComm = 0;
//                             let totalSessionComm = 0;
//                             let totalMatchSessionComm = 0;
//                             let totalShareAmt = 0;
//                             let totalLedgerAmt = 0;
//                             let totaluserMyComm = 0;
//                             let totalAmount = 0;

//                             userLists?.forEach((data, key) => {


//                                 let clientMatchSessionAmt =  data.clientOddsAmount - (-1 * data.clientSessionAmount)

//                                 let userMatchSessionComm = data.userOddsComm + data.userSessionComm
//                                 let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm
//                                 // let totaluserMyCommData =  clientMatchSessionAmt -  data.userLedgerAmt;

//                                 // clientNetAmount
//                                 totalMatchAmt += data.clientOddsAmount
//                                 totalSesionAmt += data.clientSessionAmount
//                                 totalMatchSessionAmt += clientMatchSessionAmt
//                                 totalMatchComm += data.userOddsComm
//                                 totalSessionComm += data.userSessionComm
//                                 totalMatchSessionComm += userMatchSessionComm
//                                 totalShareAmt += data.userNetProfitLoss
//                                 totalLedgerAmt += data.userLedgerAmt
//                                 totalAmount += userTotalAmountAndComm
//                                 totaluserMyComm += data.userMyComm
//                             });
//                             return (
//                                 <>
//                                     <Table.Summary.Row style={{ background: "#D5DC66" }}>
//                                         <Table.Summary.Cell index={0} className="gx-font-weight-bold ">Total</Table.Summary.Cell>

//                                         <Table.Summary.Cell index={1}>
//                                             <Text></Text>
//                                         </Table.Summary.Cell>
//                                         <Table.Summary.Cell index={2}>
//                                             <Text className={`gx-font-weight-bold ${totalMatchAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchAmt.toFixed(2)}</Text>
//                                         </Table.Summary.Cell>
//                                         <Table.Summary.Cell index={3}>
//                                             <Text className={`gx-font-weight-bold ${totalSesionAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSesionAmt.toFixed(2)}</Text>
//                                         </Table.Summary.Cell>
//                                         <Table.Summary.Cell index={4}>
//                                             <Text className={`gx-font-weight-bold ${totalMatchSessionAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionAmt.toFixed(2)}</Text>
//                                         </Table.Summary.Cell>
//                                         {/* <Table.Summary.Cell index={5}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell> */}
//                                         {/* <Table.Summary.Cell index={6}>
//                                                 <Text className={`gx-font-weight-bold ${totalSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSessionComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell> */}
//                                         {/* <Table.Summary.Cell index={7}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell> */}
//                                         {/* <Table.Summary.Cell index={8}>
//                                                 <Text className={`gx-font-weight-bold ${totalAmount >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalAmount.toFixed(2)}</Text>
//                                             </Table.Summary.Cell> */}
//                                         <Table.Summary.Cell index={9}>
//                                             <Text className={`gx-font-weight-bold ${totaluserMyComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totaluserMyComm.toFixed(2)}</Text>
//                                         </Table.Summary.Cell>
//                                         <Table.Summary.Cell index={10}>
//                                             <Text className={`gx-font-weight-bold ${'gx-text-green-0'}`}>0.00</Text>
//                                         </Table.Summary.Cell>

//                                         <Table.Summary.Cell index={11}>
//                                             <Text className={`gx-font-weight-bold ${totalLedgerAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalLedgerAmt.toFixed(2)}</Text>
//                                         </Table.Summary.Cell>
//                                     </Table.Summary.Row>
//                                 </>
//                             );
//                         }}
//                     />
//                 </div>
//             </Card>
//             {/* // } */}
//         </>
//     );
// };

// export default MatkaDetails;


import React, { useEffect, useState } from "react";
import { Card, Table, Typography } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMatkaProfitLossPos, getProfitLossPos, plusMinusByMarketIdByUserWiseList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import moment from "moment";

const getUPDownlineUserType = (param) => {
    let userDetails = param;
    let downlineUserPriority = parseInt(userDetails) + 1;

    // let downlineUserPriority = parseInt(userDetails);

    if (!downlineUserPriority) {
        return "";
    }
    let downlineUserType = "";

    switch (downlineUserPriority) {
        case 9:
            downlineUserType = "owner";
            downlineUserPriority = 9;
            break;
        case 8:
            downlineUserType = "subowner";
            downlineUserPriority = 8;
            break;
        case 7:
            downlineUserType = "superadmin";
            downlineUserPriority = 7;
            break;
        case 6:
            downlineUserType = "admin";
            downlineUserPriority = 6;
            break;
        case 5:
            downlineUserType = "subadmin";
            downlineUserPriority = 5;
            break;
        case 4:
            downlineUserType = "master";
            downlineUserPriority = 4;
            break;
        case 3:
            downlineUserType = "superagent";
            downlineUserPriority = 3;
            break;
        case 2:
            downlineUserType = "agent";
            downlineUserPriority = 2;
            break;
        case 1:
            downlineUserType = "client";
            downlineUserPriority = 1;
            break;
        default:
            break;
    }
    return downlineUserType;
};

const MatkaDetails = () => {
    const { Text } = Typography;
    const { marketId, matchName, eventId, date } = useParams();
    const [userLists, setUserLists] = useState([]);
    const dispatch = useDispatch()
    const { getMatkaProfitLossList, loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('user_id'));
        let childDetails = userData.data;
        featchUserList(childDetails);
    }, []);

    const parsedDate = moment(date, "DD-MM-YYYY");

    const featchUserList = async (data) => {
        const downlineUserType = getUPDownlineUserType(data?.userPriority);
        let reqData = {
            "toDate": date,
            "fromDate": date,
            "userId": data.parentId ? data.parentId : data.userId,
            "userType": downlineUserType ? downlineUserType : data.userType,
            "eventId": eventId


        };
        dispatch(getMatkaProfitLossPos(reqData));
        return setUserLists([]);
    };

    const redirectUserList = (data) => {
        const { id, userType } = data;
        const userId = id;
        const reqData = { userId, userType };
        featchUserList(reqData);

    }

    useEffect(() => {
        if (getMatkaProfitLossList && getMatkaProfitLossList.length > 0) {
            const filteredData = getMatkaProfitLossList?.map((item) => {


                let clientMatchSessionAmt = item.userData.userType != 'client' ? (-1 * item.clientOddsAmount) - (item.userOddsComm) : Number(item.clientOddsAmount) + Number(item.userOddsComm);
                let userMatchSessionComm = item.userOddsComm + item.userSessionComm
                let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm;
                let userMyComm = item.userData.userType !== 'client' ? clientMatchSessionAmt - (item.userLedgerAmt) : userTotalAmountAndComm - Number(item.userLedgerAmt);



                return {
                    key: item._id,
                    username: item.userData.username,
                    name: item.userData.name,
                    userData: item.userData,
                    userType: item.userData.userType,
                    userNetProfitLoss: item.userNetProfitLoss,
                    downlineUserType: item.downlineUserType,
                    clientNetAmount: item.clientNetAmount,
                    clientOddsAmount: item.userData.userType !== 'client' ? -1 * item.clientOddsAmount : item.clientOddsAmount,
                    clientSessionAmount: item.userData.userType !== 'client' ? -1 * item.userOddsComm : item.userOddsComm,
                    userOddsComm: item.userOddsComm,
                    userSessionComm: item.userSessionComm,
                    userLedgerAmt: item.userData.userType !== 'client' ? item.userLedgerAmt : item.clientNetAmount,
                    userTotalAmountAndComm: userTotalAmountAndComm,
                    userMatchSessionComm: userMatchSessionComm,
                    clientMatchSessionAmt: clientMatchSessionAmt,
                    userMyComm: userMyComm
                };
            });
            setUserLists(filteredData);
        }
    }, [getMatkaProfitLossList]);
    // const uniqueUserTypes = Array.from(new Set(userLists?.map((row) => row?.userData?.userType)));

    const shareTitle = userLists?.map((row) => row?.userData?.userType);



    const renderContent = (value, row, index) => {
        if (value === 'client') {
            return null; // Render null if downlineUserType is 'client'
        } else {
            return {
                children: value,
                props: {},
            };
        }
    };


    const columns = [
        {
            title: 'Code',
            dataIndex: 'username',
            render: (value, row) => {
                // Check if row.downlineUserType exists and render accordingly
                if (row.downlineUserType) {
                    return (
                        <span className="gx-pointer gx-font-weight-bold"
                            onClick={() => redirectUserList(row?.userData)}

                        >
                            {`${row.username}`}
                        </span>
                    );
                } else {
                    return <span className="gx-pointer gx-font-weight-bold">{row?.username}</span>;
                }
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: renderContent,
        },
        {
            title: 'Casino Amt',
            dataIndex: 'clientOddsAmount',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Casino Comm',
            dataIndex: 'clientSessionAmount',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Total',
            dataIndex: 'clientMatchSessionAmt',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            // title: `${shareTitle[0]} Share`,
            title: `My Share`,
            dataIndex: 'userMyComm', //userNetProfitLoss
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },


        // {
        //     title: 'Casino Comm+',
        //     dataIndex: 'userOddsComm',
        //     render: (value) => (
        //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
        //             {Number(value).toFixed(2)}
        //         </span>
        //     ),

        // },
        // {
        //     title: 'Session Comm+',
        //     dataIndex: 'userSessionComm',
        //     render: (value) => (
        //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
        //             {Number(value).toFixed(2)}
        //         </span>
        //     ),

        // },
        // {
        //     title: 'Total Comm',
        //     dataIndex: 'userMatchSessionComm',
        //     render: (value) => (
        //         <span className={` gx-font-weight-bold ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
        //             {Number(value).toFixed(2)}
        //         </span>
        //     ),

        // },
        // {
        //     title: 'Total Amount',
        //     dataIndex: 'userTotalAmountAndComm',
        //     render: (value) => (
        //         <span className={`gx-font-weight-bold  ${value > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
        //             {Number(value).toFixed(2)}
        //         </span>
        //     ),

        // },

        {
            title: 'M.App',
            dataIndex: 'n',
            render: (value, row) => `0.00`,
        },
        {
            title: 'Net Amount',
            dataIndex: 'userLedgerAmt',
            render: (value) => (
                <span className={`gx-font-weight-bold ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),
        },
    ];

    return (
        <>
            {/* {loading ? <Loader props={loading} /> : */}
            <Card className="gx-card ">
                <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex gx-align-items-center gx-align-items-center">
                    <span className="gx-fs-lg gx-font-weight-normal gx-text-white  gx-text-uppercase">{`Company Matka Report`}</span>
                    <BackButton />
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={userLists}
                        scroll={{ x: true }}
                        pagination={false}
                        size="small"
                        bordered
                        summary={(userLists) => {
                            let totalMatchAmt = 0;
                            let totalSesionAmt = 0;
                            let totalMatchSessionAmt = 0;
                            let totalMatchComm = 0;
                            let totalSessionComm = 0;
                            let totalMatchSessionComm = 0;
                            let totalShareAmt = 0;
                            let totalLedgerAmt = 0;
                            let totaluserMyComm = 0;
                            let totalAmount = 0;

                            userLists?.forEach((data, key) => {


                                let clientMatchSessionAmt = data.clientOddsAmount - (-1 * data.clientSessionAmount)

                                let userMatchSessionComm = data.userOddsComm + data.userSessionComm
                                let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm
                                // let totaluserMyCommData =  clientMatchSessionAmt -  data.userLedgerAmt;

                                // clientNetAmount
                                totalMatchAmt += data.clientOddsAmount
                                totalSesionAmt += data.clientSessionAmount
                                totalMatchSessionAmt += clientMatchSessionAmt
                                totalMatchComm += data.userOddsComm
                                totalSessionComm += data.userSessionComm
                                totalMatchSessionComm += userMatchSessionComm
                                totalShareAmt += data.userNetProfitLoss
                                totalLedgerAmt += data.userLedgerAmt
                                totalAmount += userTotalAmountAndComm
                                totaluserMyComm += data.userMyComm
                            });
                            return (
                                <>
                                    <Table.Summary.Row style={{ background: "#D5DC66" }}>
                                        <Table.Summary.Cell index={0} className="gx-font-weight-bold ">Total</Table.Summary.Cell>

                                        <Table.Summary.Cell index={1}>
                                            <Text></Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}>
                                            <Text className={`gx-font-weight-bold ${totalMatchAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchAmt.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={3}>
                                            <Text className={`gx-font-weight-bold ${totalSesionAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSesionAmt.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}>
                                            <Text className={`gx-font-weight-bold ${totalMatchSessionAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionAmt.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        {/* <Table.Summary.Cell index={5}>
                                                <Text className={`gx-font-weight-bold ${totalMatchComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchComm.toFixed(2)}</Text>
                                            </Table.Summary.Cell> */}
                                        {/* <Table.Summary.Cell index={6}>
                                                <Text className={`gx-font-weight-bold ${totalSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSessionComm.toFixed(2)}</Text>
                                            </Table.Summary.Cell> */}
                                        {/* <Table.Summary.Cell index={7}>
                                                <Text className={`gx-font-weight-bold ${totalMatchSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionComm.toFixed(2)}</Text>
                                            </Table.Summary.Cell> */}
                                        {/* <Table.Summary.Cell index={8}>
                                                <Text className={`gx-font-weight-bold ${totalAmount >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalAmount.toFixed(2)}</Text>
                                            </Table.Summary.Cell> */}
                                        <Table.Summary.Cell index={9}>
                                            <Text className={`gx-font-weight-bold ${totaluserMyComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totaluserMyComm.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={10}>
                                            <Text className={`gx-font-weight-bold ${'gx-text-green-0'}`}>0.00</Text>
                                        </Table.Summary.Cell>

                                        <Table.Summary.Cell index={11}>
                                            <Text className={`gx-font-weight-bold ${totalLedgerAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalLedgerAmt.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </div>
            </Card>
            {/* // } */}
        </>
    );
};

export default MatkaDetails;
