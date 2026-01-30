import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
import { useParams } from "react-router-dom";

import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getUserLenaDena, userLedgerList } from "../../../../appRedux/actions/User";
import { GiMoneyStack } from "react-icons/gi";
import { UserTypeData } from '../../../../constants/global'

import Cash from "./Cash";
import { Link, useHistory } from "react-router-dom";
import { BarChartOutlined, EyeOutlined } from "@ant-design/icons";


const getDownlineUserType = (record) => {
  let userDetails = record;
  let downlineUserPriority = userDetails?.priority - 1;
  if (!downlineUserPriority) {
    return "";
  }
  let downlineUserType = "";

  switch (downlineUserPriority) {
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
  const dispatch = useDispatch()
  const history = useHistory()
  const { userType, priority } = useParams();
  const [lenaUser, setLenaUser] = useState({});
  const [denaUser, setDenaUser] = useState([]);
  const [lenaUserType, setLenaUserType] = useState([])
  const [clearUser, setClearUser] = useState([]);
  const [totalLenaBalance, setTotalLenaBalance] = useState([]);
  const [totalDenaBalance, setTotalDenaBalance] = useState([]);
  const [infoMenu, setInfoMenu] = useState({
    visible: false,
    data: null,
  });
  const { userLenaDenaItems, userLedgerListData } = useSelector((state) => state.UserReducer);


  // useEffect(() => {
  //   getUserLenaDenaFun()
  // }, [userType])

  useEffect(() => {
    if (priority) {
      const item = {
        "userId": priority,
        "userType": userType
      }
      return downlineUserName(item)
    }
    getUserLenaDenaFun()

  }, [userType, priority])

  useEffect(() => {
    const lenaDena = userLenaDenaItems;

    if (lenaDena?.data) {

      let lenaUser = lenaDena && lenaDena.data ? lenaDena.data.filter(items => items.userType == "client" ? items.balance < 0 : items.balance > 0) : {};


      let lenaUserBalanceArray = lenaUser?.map(item => item.balance);
      let lenaUserUserTypeArray = lenaDena.data?.map(item => item.userType);
      let totalLenaBalance = lenaUserBalanceArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let denaUser = lenaDena && lenaDena.data ? lenaDena.data.filter(items => items.userType == "client" ? items.balance > 0 : items.balance < 0) : {};
      let denaUserBalanceArray = denaUser?.map(item => item.balance);

      let totalDenaBalance = denaUserBalanceArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      let clearUser = lenaDena && lenaDena.data ? lenaDena.data.filter(items => items.balance === 0) : {};

      setLenaUser(lenaUser)
      setDenaUser(denaUser)
      setLenaUserType(lenaUserUserTypeArray)
      setClearUser(clearUser)
      setTotalLenaBalance(Math.abs(totalLenaBalance.toFixed(2)))
      setTotalDenaBalance(Math.abs(totalDenaBalance).toFixed(2))
    }

  }, [userLenaDenaItems?.data])

  const redirectUserList = (row) => {
    if (row.userType === 'client') {
      return null;
    }
    downlineWithUserName(row);
  }

  const getUserLenaDenaFun = async () => {
    let reqData = {
      "fetchUserType": userType,
    }
    dispatch(getUserLenaDena(reqData));
  }




  // const downlineWithUserName = async (item) => {

  //   const matchedUserType = UserTypeData[item.userType];
  //   let downlineUserType = getDownlineUserType(matchedUserType);

  //   let reqData = {
  //     "sortData": {
  //       "createdAt": 1
  //     },
  //     "downlineUserId": item.userId,
  //     "downlineUserType": item.userType,
  //     "fetchUserType": downlineUserType,
  //   }
  //   dispatch(getUserLenaDena(reqData));
  // }


  const downlineWithUserName = async (item) => {
    history.push(`/components/dataEntry/cascader-${item?.userType}/${item?.userId}`)
  }

  const downlineUserName = async (item) => {
    const matchedUserType = UserTypeData[item.userType];
    let downlineUserType = getDownlineUserType(matchedUserType);
    let reqData = {
      "sortData": {
        "createdAt": 1
      },
      "downlineUserId": item.userId,
      "downlineUserType": item.userType,
      "fetchUserType": downlineUserType,
    }
    dispatch(getUserLenaDena(reqData));
  }



  // const renderContent = (value, row, index) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };
  //   return obj;
  // };

  const handleInfo = (e, record) => {

    if (!record) {
      return null
    }

    e.preventDefault();
    // handlePartnerInfoModal(record);
    setInfoMenu({
      visible: true,
      data: record
    });
  };

  const handlePartnerInfoModal = async (data) => {
    let parentreqBody = {
      downlineUserId: data.userId,
    };
    await dispatch(userLedgerList(parentreqBody));

  };

  const handleClose = () => {

    setInfoMenu({
      visible: false,
      // data: null,
    });

  };

  const columns = [
    {
      title: 'User Details',
      dataIndex: 'name',
      render: (value, row) => <span className="gx-font-weight-normal gx-pointer" onClick={() => redirectUserList(row)}>
        <EyeOutlined className="gx-text-blue" /> {`${row.name} (${row.username})`}</span>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: (value) => (
        value < 0 ? Number.parseFloat(value ? Math.abs(value) : 0).toFixed(2) : value.toFixed(2)
      ),
    },
    {
      title: "",
      dataIndex: '',
      // render: (value, row) => <span className="gx-font-weight-normal gx-justify-content-center gx-pointer" onClick={(e) => handleInfo(e, row)}><GiMoneyStack size={25} /></span>,
      render: (value, row) => <a className="gx-font-weight-normal  gx-bg-flex gx-justify-content-center gx-pointer" href={`/components/dataDisplay/avatar-${row?.userType}/${row?.username}/${encodeURIComponent(row?.name)}/${row?.userId}`}>

        <BarChartOutlined className="gx-p-1 gx-rounded gx-text-grey" style={{ background: "rgb(255, 241, 0)" }} />
      </a>,

    },
  ];
  const customLocale = {
    emptyText: <div className="gx-text-left gx-text-black" >No data found</div>
  };


  return (
    <>
      {/* {loading ? <Loader props={loading} /> : */}
      <Card className="gx-card gx-w-100 gx-pb-3 ">
        <div className="gx-bg-grey gx-px-3 gx-py-3 gx-bg-flex gx-align-items-center  ">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center  gx-text-uppercase">{`${lenaUserType[0] === 'subadmin' ? 'mini admin' : lenaUserType[0]} master Ledger`}
          </span>
          <BackButton />
        </div>
        <Row >
          <Col md={8} sm={12} xs={24} className="gx-py-3">
            <div className="gx-py-1 gx-bg-green-0 gx-text-uppercase">
              <span className=' gx-bg-flex gx-mx-3 gx-py-2 gx-text-white gx-fs-lg'> <div className="gx-justify-content-start ">Lena </div> <div className="gx-justify-content-end">{Number(totalLenaBalance).toFixed(2)}</div></span>
            </div>
            {lenaUser && lenaUser.length > 0 ? (
              <Table 
                rowKey={record => record.userId}
                className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={lenaUser} bordered pagination={false} size="small" />
            ) : <Table  className="gx-table-responsive gx-text-uppercase" columns={columns} bordered pagination={false} size="small" />}
          </Col>
          <Col md={8} sm={12} xs={24} className="gx-py-3">
            <div className="gx-py-1 gx-bg-danger gx-text-uppercase">
              <span className=' gx-bg-flex gx-mx-3 gx-py-2 gx-text-white gx-fs-lg'> <div className="gx-justify-content-start ">Dena </div> <div className="gx-justify-content-end">{totalDenaBalance}</div></span>
            </div>
            {denaUser && denaUser.length > 0 ? (
              <Table 
                rowKey={record => record.userId}
                className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={denaUser} bordered pagination={false} size="small" />
            ) :
              <Table  className="gx-table-responsive gx-text-uppercase" columns={columns} bordered pagination={false} size="small" />
            }
          </Col>
          <Col md={8} sm={12} xs={24} className="gx-py-3">
            <div className=" gx-py-1 gx-text-uppercase " style={{ background: "#5DB5F5" }}>
              <span className=' gx-bg-flex gx-mx-3 gx-py-2 gx-text-white gx-fs-lg'> <div className="gx-justify-content-start ">Clear </div> <div className="gx-justify-content-end"> 0</div></span>
            </div>
            {clearUser && clearUser.length > 0 ? (
              <Table 
                className="gx-table-responsive gx-text-uppercase"
                columns={columns}
                dataSource={clearUser}
                bordered pagination={false}
                rowKey={record => record.userId}
                size="small" />
            ) : <Table  className="gx-table-responsive gx-text-uppercase" columns={columns} bordered pagination={false} size="small" />}
          </Col>
        </Row>
      </Card>
      <Cash data={infoMenu.data} visible={infoMenu.visible} handleClose={() => handleClose()} userLedgerListData={userLedgerListData} />

      {/* // } */}
    </>


  );
};

export default Basic;