// import React, { useEffect,  useState } from "react";
// import { Card, Table, Typography } from "antd";
// import BackButton from "../../Hoc/BackButton";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {plusMinusByMarketIdByUserWiseList } from "../../../../appRedux/actions/User";
// import Loader from "../../../../components/loader";

// const Basic = () => {
//     const { Text } = Typography;
//     const { marketId, matchName } = useParams();
//     const [userLists, setUserLists] = useState([]);
//     const dispatch = useDispatch()
//     const { plusMinusByMarketIdByUserWiseListdata, loading } = useSelector((state) => state.UserReducer);

//     useEffect(() => {
//         let userData = JSON.parse(localStorage.getItem('user_id'));
//         let childDetails = userData.data;
//         featchUserList(childDetails);
//     }, []);

//     const featchUserList = async (data) => {
//         let reqData = {
//             "marketId": marketId,
//             "userId": data.userId,
//             "userType": data.userType


//         };
//         dispatch(plusMinusByMarketIdByUserWiseList(reqData));
//     };

//     const redirectUserList = (data) => {
//         const { id, userType } = data;
//         const userId = id;
//         const reqData = { userId, userType };
//         featchUserList(reqData);

//     }

//     useEffect(() => {
//         if (plusMinusByMarketIdByUserWiseListdata && plusMinusByMarketIdByUserWiseListdata.length > 0) {
//             const filteredData = plusMinusByMarketIdByUserWiseListdata?.map((item) => {

//                 let clientMatchSessionAmt = (-1 * item.clientOddsAmount) + (-1 * item.clientSessionAmount)
//                 let userMatchSessionComm = item.userOddsComm + item.userSessionComm
//                 let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm;

//                 return {
//                     key: item._id,
//                     username: item.userData.username,
//                     name: item.userData.name,
//                     userData: item.userData,
//                     userType: item.userData.userType,
//                     userNetProfitLoss: item.userNetProfitLoss,
//                     downlineUserType: item.downlineUserType,
//                     clientNetAmount: item.clientNetAmount,
//                     clientOddsAmount: -1 * item.clientOddsAmount,
//                     clientSessionAmount: -1 * item.clientSessionAmount,
//                     userOddsComm: item.userOddsComm,
//                     userSessionComm: item.userSessionComm,
//                     userLedgerAmt: item.userLedgerAmt,
//                     userTotalAmountAndComm: userTotalAmountAndComm,
//                     userMatchSessionComm: userMatchSessionComm,
//                     clientMatchSessionAmt: clientMatchSessionAmt
//                 };
//             });
//             setUserLists(filteredData);
//         }
//     }, [plusMinusByMarketIdByUserWiseListdata]);



//     const renderContent = (value, row, index) => {
//         if (value === 'client') {
//             return null; // Render null if downlineUserType is 'client'
//         } else 
//         {
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
//                     return   <span className="gx-pointer gx-font-weight-bold">{row?.username}</span>;
//                 }
//             }
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             render: renderContent,
//         },
//         {
//             title: 'Match Amt',
//             dataIndex: 'clientOddsAmount',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Session Amt',
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
//             title: 'Match Comm+',
//             dataIndex: 'userOddsComm',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Session Comm+',
//             dataIndex: 'userSessionComm',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Total Comm',
//             dataIndex: 'userMatchSessionComm',
//             render: (value) => (
//                 <span className={` gx-font-weight-bold ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'Total Amount',
//             dataIndex: 'userTotalAmountAndComm',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
//         {
//             title: 'My Share',
//             dataIndex: 'userNetProfitLoss',
//             render: (value) => (
//                 <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
//                     {Number(value).toFixed(2)}
//                 </span>
//             ),

//         },
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
//                 <Card className="gx-card ">
//                     <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
//                         <span className="gx-fs-xxl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">Company Report<br/> 
//                         <p className="gx-fs-lg">{matchName}</p></span>
//                         <BackButton />
//                     </div>
//                     <div>
//                         <Table
//                             columns={columns}
//                             dataSource={userLists}
//                             scroll={{ x: true }}
//                             pagination={false}
//                             size="small"
//                             bordered
//                             summary={(userLists) => {
//                                 let totalMatchAmt = 0;
//                                 let totalSesionAmt = 0;
//                                 let totalMatchSessionAmt = 0;
//                                 let totalMatchComm = 0;
//                                 let totalSessionComm = 0;
//                                 let totalMatchSessionComm = 0;
//                                 let totalShareAmt = 0;
//                                 let totalLedgerAmt = 0;
//                                 let totalAmount = 0;
//                                 userLists?.forEach((data, key) => {
//                                     let clientMatchSessionAmt = data.clientOddsAmount + data.clientSessionAmount
//                                     let userMatchSessionComm = data.userOddsComm + data.userSessionComm
//                                     let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm


//                                     totalMatchAmt += data.clientOddsAmount
//                                     totalSesionAmt += data.clientSessionAmount
//                                     totalMatchSessionAmt += clientMatchSessionAmt
//                                     totalMatchComm += data.userOddsComm
//                                     totalSessionComm += data.userSessionComm
//                                     totalMatchSessionComm += userMatchSessionComm
//                                     totalShareAmt += data.userNetProfitLoss
//                                     totalLedgerAmt += data.userLedgerAmt
//                                     totalAmount += userTotalAmountAndComm
//                                 });
//                                 return (
//                                     <>
//                                         <Table.Summary.Row  style={{background:"#D5DC66"}}>
//                                             <Table.Summary.Cell index={0} className="gx-font-weight-bold ">Total</Table.Summary.Cell>

//                                             <Table.Summary.Cell index={1}>
//                                                 <Text></Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={2}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchAmt > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchAmt.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={3}>
//                                                 <Text className={`gx-font-weight-bold ${totalSesionAmt > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSesionAmt.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={4}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchSessionAmt > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionAmt.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={5}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={6}>
//                                                 <Text className={`gx-font-weight-bold ${totalSessionComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSessionComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={7}>
//                                                 <Text className={`gx-font-weight-bold ${totalMatchSessionComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionComm.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={8}>
//                                                 <Text className={`gx-font-weight-bold ${totalAmount > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalAmount.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={9}>
//                                                 <Text className={`gx-font-weight-bold ${totalShareAmt > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalShareAmt.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                             <Table.Summary.Cell index={10}>
//                                                 <Text className={`gx-font-weight-bold ${'gx-text-green-0'}`}>0.00</Text>
//                                             </Table.Summary.Cell>

//                                             <Table.Summary.Cell index={11}>
//                                                 <Text className={`gx-font-weight-bold ${totalLedgerAmt > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalLedgerAmt.toFixed(2)}</Text>
//                                             </Table.Summary.Cell>
//                                         </Table.Summary.Row>
//                                     </>
//                                 );
//                             }}
//                         />
//                     </div>
//                 </Card>
//             {/* } */}
//         </>
//     );
// };

// export default Basic;



import React, { useEffect, useState } from "react";
import { Button, Card, Table, Typography } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { plusMinusByMarketIdByUserWiseList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { httpPost } from "../../../../http/http";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const getUPDownlineUserType = (param) => {
    let userDetails = param;
    let downlineUserPriority = parseInt(userDetails) + 1;

    // let downlineUserPriority = parseInt(userDetails);
  
    if (!downlineUserPriority) {
      return "";
    }
    let downlineUserType = "";
  
    switch (downlineUserPriority) {
        case 10:
        downlineUserType = "owner";
        downlineUserPriority = 10;
        break;
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

const Basic = () => {
    const history = useHistory();
    const { Text } = Typography;
    const { marketId, matchName, userId, userType } = useParams();
    
    const [userLists, setUserLists] = useState([]);
    const [uplineid, setUplineId] = useState(null)
    const [parentId, setParentId] = useState(null)
    const dispatch = useDispatch()
    const { plusMinusByMarketIdByUserWiseListdata, loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('user_id'));
        let childDetails = userData.data;
        featchUserList(childDetails);
    }, []);


    const featchUserList = async (data) => {
        
        
        const downlineUserType = getUPDownlineUserType(data?.userPriority);
             const resolvedUserId = userId ?? data?.parentId ?? data?.userId;
        const resolvedUserType = userType ?? downlineUserType ?? data?.userType;
   
     
        let reqData = {
            "marketId": marketId,
             "userId": resolvedUserId,
            "userType": resolvedUserType,
        };
        dispatch(plusMinusByMarketIdByUserWiseList(reqData));
    };

    async function onChange(userId) {
        if (!userId) {
            return history.goBack();
        }
        const changeUserType = getUpUserType2(uplineid?.upelineUserType)
        let loginUserType = JSON.parse(localStorage.getItem('user_id'));
  
        if (changeUserType == loginUserType?.data?.userType) {
            return history.goBack();
        }
        let parentreqBody = {
            "userId": userId
        }
        const redData = await httpPost("user/userDetails", parentreqBody);
        uplineFeatchUserList(redData?.data);
        setParentId(redData?.data?.creatorId)
    }
    const uplineFeatchUserList = async (userData) => {
        let reqData = {
            "marketId": marketId,
            // "userId": userData?.creatorShareData?.creatorId,
            "userId": userData?.creatorId,
            "userType": getUpUserType(uplineid.upelineUserType)
        };
        dispatch(plusMinusByMarketIdByUserWiseList(reqData));
    };

    const redirectUserList = (data) => {
        const { id, userType } = data;
        const userId = id;
        const reqData = { userId, userType };

        window.location.href =`/components/matchplusminus/plus-minus-report/${marketId}/${matchName}/${userId}/${userType}`
        featchUserList(reqData);
        setParentId(id)
    }
    const getUpUserType = (userType) => {
        let upUserType = "";

        switch (userType) {
            case "subowner":
                upUserType = "owner";
                break;
            case "superadmin":
                upUserType = "owner";
                break;
            case "admin":
                upUserType = "subowner";
                break;
            case "subadmin":
                upUserType = "superadmin";
                break;
            case "master":
                upUserType = "admin";
                break;
            case "superagent":
                upUserType = "subadmin";
                break;
            case "agent":
                upUserType = "master";
                break;
            case "client":
                upUserType = "superagent";
                break;
            default:
                // If userType doesn't match any case, return empty string or handle accordingly
                break;
        }

        return upUserType;
    };
    const getUpUserType2 = (userType) => {
        let upUserType = "";
        switch (userType) {
            case "subowner":
                upUserType = "owner";
                break;
            case "superadmin":
                upUserType = "subowner";
                break;
            case "admin":
                upUserType = "superadmin";
                break;
            case "subadmin":
                upUserType = "admin";
                break;
            case "master":
                upUserType = "subadmin";
                break;
            case "superagent":
                upUserType = "master";
                break;
            case "agent":
                upUserType = "superagent";
                break;
            case "client":
                upUserType = "agent";
                break;
            default:
                // If userType doesn't match any case, return empty string or handle accordingly
                break;
        }
        return upUserType;
    };


    useEffect(() => {


        if (plusMinusByMarketIdByUserWiseListdata && plusMinusByMarketIdByUserWiseListdata.length > 0) {
        
            
            const createrId = plusMinusByMarketIdByUserWiseListdata?.at(0).userData.creatorId
            const upelineUserType = plusMinusByMarketIdByUserWiseListdata?.at(0).userData.userType
            setUplineId({ createrId: createrId, upelineUserType: upelineUserType })

            const filteredData = plusMinusByMarketIdByUserWiseListdata?.map((item) => {
                let clientMatchSessionAmt = item.userData.userType === 'client' ? (item.clientOddsAmount) + (item.clientSessionAmount) : (-1 * item.clientOddsAmount) + (-1 * item.clientSessionAmount)
                let userMatchSessionComm = item.userOddsComm + item.userSessionComm
                let userTotalAmountAndComm = item.userData.userType === 'client' ? clientMatchSessionAmt - (-1 * userMatchSessionComm) : clientMatchSessionAmt - userMatchSessionComm;
                return {
                    key: item._id,
                    username: item.userData.username,
                    name: item.userData.name,
                    userData: item.userData,
                    userType: item.userData.userType,
                    downlineUserType: item.downlineUserType,
                    clientNetAmount: item.clientNetAmount,
                    clientOddsAmount: item.userData.userType === 'client' ? item.clientOddsAmount : -1 * item.clientOddsAmount,
                    clientSessionAmount: item.userData.userType === 'client' ? item.clientSessionAmount : -1 * item.clientSessionAmount,
                    userOddsComm: item.userOddsComm,
                    userSessionComm: item.userSessionComm,

                    userLedgerAmt: item.userData.userType === 'client' ? item.clientNetAmount : -1 * item.userLedgerAmt,

                    userTotalAmountAndComm: userTotalAmountAndComm,

                    userMatchSessionComm: userMatchSessionComm,
                    clientMatchSessionAmt: clientMatchSessionAmt,
                    userNetProfitLoss: userTotalAmountAndComm - (item.userData.userType === 'client'
                        ? item.userLedgerAmt
                        : -1 * item.userLedgerAmt),
                    // userNetProfitLoss: item.userData.userType === 'client' ? item.userNetProfitLoss : item.userNetProfitLoss,
                };
            }).sort((a, b) => {
                return a.userData.username.localeCompare(b.userData.username);
            });
            setUserLists(filteredData);
        }
    }, [plusMinusByMarketIdByUserWiseListdata]);


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
                if (row.downlineUserType) {
                    return (
                        <span className="gx-pointer gx-font-weight-bold"
                            onClick={() => {
                                redirectUserList(row?.userData)

                            }}
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
            render: (value) => (
                <span className="gx-font-weight-semi-bold" >
                    {value}
                </span>
            ),


        },
        {
            title: 'Match Amt',
            dataIndex: 'clientOddsAmount',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Session Amt',
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
            title: 'Match Comm+',
            dataIndex: 'userOddsComm',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Session Comm+',
            dataIndex: 'userSessionComm',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Total Comm',
            dataIndex: 'userMatchSessionComm',
            render: (value) => (
                <span className={` gx-font-weight-bold ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'Total Amount',
            dataIndex: 'userTotalAmountAndComm',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
        {
            title: 'My Share',
            dataIndex: 'userNetProfitLoss',
            render: (value) => (
                <span className={`gx-font-weight-bold  ${value >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number(value).toFixed(2)}
                </span>
            ),

        },
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
                <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                    <span className="gx-fs-xxl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">Company Report<br />
                        <p className="gx-fs-lg">{matchName}</p></span>
                    <Button onClick={() => onChange(parentId)} style={{ borderRadius: '0' }} type="primary">Back</Button>
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
                            let totalAmount = 0;
                            userLists?.forEach((data, key) => {
                    
                                let clientMatchSessionAmt = data.clientOddsAmount + data.clientSessionAmount
                                let userMatchSessionComm = data.userOddsComm + data.userSessionComm
                                // let userTotalAmountAndComm = clientMatchSessionAmt - userMatchSessionComm
                                let userTotalAmountAndComm =  data.userData.userType === 'client' ? clientMatchSessionAmt - (-1 * userMatchSessionComm) : clientMatchSessionAmt - userMatchSessionComm
                                totalMatchAmt += data.clientOddsAmount
                                totalSesionAmt += data.clientSessionAmount
                                totalMatchSessionAmt += clientMatchSessionAmt
                                totalMatchComm += data.userOddsComm
                                totalSessionComm += data.userSessionComm
                                totalMatchSessionComm += userMatchSessionComm
                                totalShareAmt += data.userNetProfitLoss
                                totalLedgerAmt += data.userLedgerAmt
                                totalAmount += userTotalAmountAndComm
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
                                        <Table.Summary.Cell index={5}>
                                            <Text className={`gx-font-weight-bold ${totalMatchComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchComm.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={6}>
                                            <Text className={`gx-font-weight-bold ${totalSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalSessionComm.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={7}>
                                            <Text className={`gx-font-weight-bold ${totalMatchSessionComm >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalMatchSessionComm.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={8}>
                                            <Text className={`gx-font-weight-bold ${totalAmount >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalAmount.toFixed(2)}</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={9}>
                                            <Text className={`gx-font-weight-bold ${totalShareAmt >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{totalShareAmt.toFixed(2)}</Text>
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

export default Basic;