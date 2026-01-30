// import React from 'react';
// import { Space, Table, Tag } from 'antd';

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
 
 
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
   
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',

//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',

//   },
// ];

// const UserList = () => {
//     return(
//         <>
//         <Table columns={columns} dataSource={data} size='small'/>
//         </>
//     )
// }

// export default UserList;












import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  plusMinusByMarketIdByUserWiseList } from '../../../../appRedux/actions/User';








const getDownlineUserType = (userPriority) => {


  let userDetails = userPriority;
  let downlineUserPriority = parseInt(userDetails) ;
  // let downlineUserPriority = parseInt(userDetails);
  if (!downlineUserPriority) {
    return "";
  }
  let downlineUserType = "";

  switch (downlineUserPriority) {
    case 9:
      downlineUserType = "owner"
      downlineUserPriority = 9
      break;
    case 8:
      downlineUserType = "subowner"
      downlineUserPriority = 8
      break;
    case 7:
      downlineUserType = "superadmin"
      downlineUserPriority = 7
      break;
    case 6:
      downlineUserType = "admin"
      downlineUserPriority = 6
      break;
    case 5:
      downlineUserType = "subadmin"
      downlineUserPriority = 5
      break;
    case 4:
      downlineUserType = "master"
      downlineUserPriority = 4
      break;
    case 3:
      downlineUserType = "superagent"
      downlineUserPriority = 3
      break;
    case 2:
      downlineUserType = "agent"
      downlineUserPriority = 2
      break;
    case 1:
      downlineUserType = "client"
      downlineUserPriority = 1
      break;
    default:
      break;
  }
  return downlineUserType;

};


const UserList = ({marketId}) => {
  
  const agentUser = JSON.parse(localStorage.getItem("user_id"))?.data;

  const [SubOwner,setSubOwner] = useState(null)
  const [superadmin, setSuperadmin] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [subadmin, setSubadmin] = useState(null);
  const [master, setMaster] = useState(null);
  const [superagent, setSuperagent] = useState(null);
  const [agent, setAgent] = useState(null);
  const [client, setClient] = useState(null);


  const dispatch = useDispatch()
  const { plusMinusByMarketIdByUserWiseListdata} = useSelector((state) => state.UserReducer);
  useEffect(()=>{


    let reqData = {
      "marketId": marketId,
      "userId": agentUser?.userId,
      "userType":  getDownlineUserType(agentUser?.userPriority )
  };
  dispatch(plusMinusByMarketIdByUserWiseList(reqData));
   
},[])





useEffect(() => {
  if (plusMinusByMarketIdByUserWiseListdata) { 
    const subOwnerList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "subowner");
    const superAdminList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "superadmin");
    const adminList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "admin");
    const subadminList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "subadmin");
    const masterList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "master");
    const superAgentList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "superagent");
    const agentList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "agent");
    const clientList = plusMinusByMarketIdByUserWiseListdata?.find(el => el.userData.userType === "client");
    if (subOwnerList) {
      setSubadmin(null)
      setAdmin(null)
      setSubadmin(null)
      setMaster(null)
      setSuperagent(null)
      setAgent(null)
      setClient(null)
      setSubOwner(plusMinusByMarketIdByUserWiseListdata);
    }
    if (superAdminList) {
      setAdmin(null)
      setSubadmin(null)
      setMaster(null)
      setSuperagent(null)
      setAgent(null)
      setClient(null)
      setSuperadmin(plusMinusByMarketIdByUserWiseListdata);
    }
    if (adminList) {
      setSubadmin(null)
      setMaster(null)
      setSuperagent(null)
      setAgent(null)
      setClient(null)
      setAdmin(plusMinusByMarketIdByUserWiseListdata);
    }
    if (subadminList) {
      setMaster(null)
      setSuperagent(null)
      setAgent(null)
      setClient(null)
      setSubadmin(plusMinusByMarketIdByUserWiseListdata);
    }
    if (masterList) {
      setSuperagent(null)
      setAgent(null)
      setClient(null)
      setMaster(plusMinusByMarketIdByUserWiseListdata);
    }
    if (superAgentList) {
      setAgent(null)
      setClient(null)
      setSuperagent(plusMinusByMarketIdByUserWiseListdata);
    }
    if (agentList) {
      setClient(null)
      setAgent(plusMinusByMarketIdByUserWiseListdata);
    }
    if (clientList) {
      setClient(plusMinusByMarketIdByUserWiseListdata);
    }
  }
}, [plusMinusByMarketIdByUserWiseListdata]);



const featchUserList = async (record) => {
if(record?.userData?.userType === "client") return null
  let reqData = {
      "marketId": marketId,
      "userId": record?.userData?.id,
      "userType": record?.userData?.userType,

  };
  dispatch(plusMinusByMarketIdByUserWiseList(reqData));
};


const columns = [
  {
    title: 'A/C Name',
    dataIndex: 'name',
    key: 'name',
    render: (text,record) => <span onClick={()=>featchUserList(record)} style={{cursor:"pointer"}} className={`${record?.userData?.userType ==="client" ? "gx-text-black" : "gx-text-white gx-bg-orange gx-px-1 gx-py-1 gx-rounded-sm" }`} >{record?.userData?.username}</span>,
  },
  {
    title: 'P&L',
    dataIndex: 'userNetProfitLoss',
    key: 'pl',
    render: text => <span style={{ color: text >= 0 ? 'green' : 'red' }}>{Number(text).toFixed(2)}</span>,
  },
  {
    title: 'Comm.',
    dataIndex: 'comm',
    key: 'comm',
    render: text => <span >0.00</span>,
  },
];




const sections = [
  { title: "Subowner P&L", data: SubOwner, priority: 8 },
  { title: "Superadmin P&L", data: superadmin, priority: 7 },
  { title: "Admin P&L", data: admin, priority: 6 },
  { title: "Subadmin P&L", data: subadmin, priority: 5 },
  { title: "Master P&L", data: master, priority: 4 },
  { title: "Super Agent P&L", data: superagent, priority: 3 },
  { title: "Agent P&L", data: agent, priority: 2 },
  { title: "Client P&L", data: client, priority: 1 },
];

  return (
    <Row gutter={[16, 16]} justify="between" className='gx-px-1'>
      {sections
        .filter(section =>  agentUser?.userPriority - 1 >= section.priority)
        .map(section => (
          <Col key={section.title} xs={24} sm={12} md={8} xl={6}>
            <Card title={section.title}>
              <Table bordered scroll={{x:true}} columns={columns} dataSource={section.data} pagination={false} locale={{ emptyText: 'No Data' }} />
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default UserList;