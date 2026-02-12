import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import Simple from "../../../components/table/Basic/Simple";
import ChartCard from "components/dashboard/Listing/ChartCard";
import { userSignOut } from "../../../../appRedux/actions/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Loader from "../../../../components/loader";
import { useBalance } from "../../../../ContextApi";
import Info from "./Info";
import UserListModal from "./UserListModal";
import LedgerModal from "./LedgerModal";
import CashTransactionModal from "./CashTransactionModal";
import SettingModal from "./Settings";
import SportModal from "./SportModal";
import { getMatchList } from "../../../../appRedux/actions/User";
import Rules from "./rules";
import { BarChartOutlined, InfoCircleOutlined, LogoutOutlined, SettingOutlined, TeamOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";


const userMemberInfo = [
  { "priority": 9, "userType": "owner", "shortname": "OW" },
  { "priority": 8, "userType": "sunOwnerCount", "shortname": "SOW" },
  { "priority": 7, "userType": "superadminCount", "shortname": "SU" },
  { "priority": 6, "userType": "admin", "shortname": "AD" },
  { "priority": 5, "userType": "subadminCount", "shortname": "SUA" },
  { "priority": 4, "userType": "master", "shortname": "MA" },
  { "priority": 3, "userType": "superagent", "shortname": "SA" },
  { "priority": 2, "userType": "agent", "shortname": "A" },
  { "priority": 1, "userType": "client", "shortname": "C" },]


const getNextLowerPriorityData = (userMemberInfo, loginData) => {
  if (!loginData || !loginData.data) {
    return null;
  }

  const currentPriority = loginData.data.userPriority;

  const userCount = loginData.data.userCount?.[0];


  if (!currentPriority || !userCount) {
    return null;
  }

  const nextLowerPriorityInfo = userMemberInfo.find(user => user.priority === currentPriority - 1);


  if (!nextLowerPriorityInfo) {
    return null;
  }

  const nextLowerPriorityCount = userCount[nextLowerPriorityInfo.userType];

  if (nextLowerPriorityCount === undefined) {
    return null;
  }

  return {
    nextLowerPriorityType: nextLowerPriorityInfo.userType,
    nextLowerPriorityCount: nextLowerPriorityCount,
  };
};

const CRM = () => {




  const { balance } = useBalance();
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem('user_id'));
  const nextLowerPriorityData = getNextLowerPriorityData(userMemberInfo, users);


  const { loading, loadingMatch } = useSelector((state) => state.UserReducer);
  const modalOpen = localStorage.getItem("modalopen")
  const [usermodal, setUserModal] = useState(false);
  const [ledgermodal, setLedgerModal] = useState(false);
  const [cashTransactionModal, setCashTransactionModal] = useState(false);
  const [settingmodal, setSettingModal] = useState(false);
  const [sportModal, setSportModal] = useState(false);

  const [userBalance, setUserBalance] = useState(null)


  const storedBalance = JSON.parse(localStorage.getItem('client-wallet-balance'));

  useEffect(() => {
    if (storedBalance) {
      setUserBalance(storedBalance);
    }
  }, [userBalance]);

  useEffect(() => {
    const preventBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const allowBodyScroll = () => {
      document.body.style.overflow = 'auto';
    };

    if (usermodal || ledgermodal || cashTransactionModal) {
      preventBodyScroll();
    } else {
      allowBodyScroll();
    }

    return () => {
      allowBodyScroll();
    };
  }, [usermodal, ledgermodal, cashTransactionModal]);



  useEffect(() => {
    const initData = localStorage.getItem("matchList");
    dispatch(getMatchList());
    const intervalId = setInterval(() => {
      localStorage.removeItem("matchList");
    }, 1000 * 60 * 3);
    if (!initData) {
      dispatch(getMatchList());
    }
    return () => clearInterval(intervalId);
  }, [dispatch]);


  const handleClose = () => {
    setUserModal(false)
    setLedgerModal(false)
    setCashTransactionModal(false)
    setSettingModal(false)
    setSportModal(false)
  }
  return (
    <>
      {/* {loadingMatch ? <Loader props={loadingMatch} /> : */}
        <>
          {modalOpen && <Rules />}
          {usermodal && <UserListModal handleClose={handleClose} />}
          {ledgermodal && <LedgerModal handleClose={handleClose} />}
          {cashTransactionModal && <CashTransactionModal handleClose={handleClose} />}
          {settingmodal && <SettingModal handleClose={handleClose} />}
          {sportModal && <SportModal handleClose={handleClose} />}
          <Auxiliary>
            <Row className="">
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                {/* <Link to="/components/details/client-details"> */}
                <div onClick={() => setUserModal(true)} >

                  <ChartCard chartProperties={{ icon: <UserOutlined className="gx-mr-0 gx-fs-xl" />, title: `${users?.data?.userType === 'subadmin' ? 'mini admin' : users?.data?.userType}`, bgColor: 'primary' }} />
                </div>
                {/* </Link> */}
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                {/* <Link to="/components/navigation/breadcrumb"> */}
                <div onClick={() => setSportModal(true)} >
                  <ChartCard chartProperties={{ title: "Sport's Details", icon: <BarChartOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
                </div>
                {/* </Link> */}
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                {/* <Link to="/components/event/lader-details"> */}
                <div onClick={() => setLedgerModal(true)} >
                  <ChartCard chartProperties={{ title: 'Ledger', icon: <UserOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }}
                  />
                </div>
                {/* </Link> */}
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                {/* <Link to="/components/case/case-transection-details"> */}
                <div onClick={() => setCashTransactionModal(true)} >

                  <ChartCard chartProperties={{ title: 'Reports', icon: <UserOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
                </div>
                {/* </Link> */}
              </Col>

            </Row>
            <Row >
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                {/* <Link to="/components/others/anchor"> */}
                <div onClick={() => setSettingModal(true)} >
                  <ChartCard chartProperties={{ title: 'Settings', icon: <SettingOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
                </div>

                {/* </Link> */}
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12} onClick={() => dispatch(userSignOut())}>
                <ChartCard chartProperties={{ title: 'Logout', icon: <LogoutOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
              </Col>
            </Row>

            <Row >
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ title: `${users?.data?.username}`, icon: <UserOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary', desc: `You are ${users?.data?.userType === 'subadmin' ? "mini admin" : users?.data?.userType}`, }} />
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ prize: `${storedBalance ? storedBalance : users.data.balance.toFixed(2)}`, icon: <TrophyOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary', desc: 'Coins', }} />
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ title: `${nextLowerPriorityData?.nextLowerPriorityCount ? nextLowerPriorityData?.nextLowerPriorityCount : 0}`, icon: <TeamOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary', desc: 'Members', }} />
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ title: `${users?.data?.matchShare}`, icon: <BarChartOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary', desc: 'My Share' }} />
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ title: `${100 - users.data.matchShare}%`, icon: <BarChartOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary', desc: 'Company Share' }} />
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ bgColor: 'primary', desc: 'Match Comminssion', percent: `${users?.data?.matchCommission}%` }} />
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <ChartCard chartProperties={{ bgColor: 'primary', desc: 'Session Comminssion', percent: `${users?.data?.sessionCommission}%`, }} />
              </Col>

              <Col xl={6} lg={11} md={12} sm={12} xs={12}>
                <Link to="/components/rules/rules-regulation">
                  <ChartCard chartProperties={{ title: 'Rules', icon: <InfoCircleOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
                </Link>
              </Col>
            </Row>
            <Simple />
          </Auxiliary>

        </>
      {/* } */}
    </>
  );
};

export default CRM;
