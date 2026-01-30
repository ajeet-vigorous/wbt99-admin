import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Input, Menu, Skeleton, Space, Spin, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import Info from "./Info";
import Status from "./Status";
import Deposit from "./Deposit";
import Withdrawal from "./Withdrawal";
import { NotificationContainer } from "react-notifications";
import ResetPassword from "./ResetPassword";
import moment from "moment";
import { DownOutlined, SearchOutlined, ShareAltOutlined } from '@ant-design/icons';
import TablePagination from "../../../../components/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getShareDetails, getSportsBetsList, getuserSearchReport, userDominList, userUpdate } from "../../../../appRedux/actions/User";
import LoginDtails from "./LoginDetails";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Exposuremodal from "./Exposuremodal";
import { UserTypeData, internationalCasino } from "../../../../constants/global";
import settings from "../../../../domainConfig";


const ButtonGroups = ({ userLists, currentPage, totalItems, pageSize, handlePageChange, getUserListFun, loader, searchText, setSearchText, handleReset, handleSearch }) => {

  const { userListCall, loading, checkRedirect, userListChnage } = useSelector((state) => state.UserReducer);
  const { userType } = useParams();


  useEffect(() => {
    if (userListCall) {
      getUserListFun()

    }
  }, [userListCall])


  useEffect(() => {
    if (userListChnage === true) {
      let reqData = {
        searchValue: searchText,
      };
      if (searchText) {
        dispatch(getuserSearchReport(reqData))
      }
    }
  }, [userListChnage])



  useEffect(() => {
    getUplineUserDetails(userType)
  }, [userType])


  const [infoMenu, setInfoMenu] = useState({
    visible: false, data: null,
  });
  const [name, setName] = useState()


  const [statusMenu, setStatusMenu] = useState({
    show: false,
    data: null,
  });
  const [depositMenu, setDepositMenu] = useState({
    show: false,
    data: null,
  });
  const [withdrawalMenu, setWithdrawalMenu] = useState({
    show: false,
    data: null,
  });
  const [resetPasswordMenu, setResetPasswordMenu] = useState({
    show: false,
    data: null,
  });

  const [sendLoginDetails, setSendLoginDetails] = useState({
    show: false,
    data: null,
  })
  const [partnerInfoModal, setpartnerInfoModal] = useState();


  const [exposureModal, setExposureModal] = useState(
    {
      show: false,
      data: null
    }
  );


  const searchInput = useRef(null);
  const dispatch = useDispatch()
  const history = useHistory();


  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);

  // };


  const handleInfo = (e, record) => {
    e.preventDefault();
    handlePartnerInfoModal(record);
    setInfoMenu({
      visible: true,
    });
  };






  // const renderContent = (value, row, index) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };
  // };

  // const handleStatus = (record) => {
  //   const newRecord = {
  //     key: record.key,
  //     status: record.status,
  //     username: record.username
  //   };
  //   setStatusMenu({
  //     show: true,
  //     data: newRecord,
  //   });
  // };
  // const { userUpdateData } = useSelector((state) => state.UserReducer);




  const handleStatus = async (data) => {
    let reqData = {
      "userId": data.key,
      "status": data.status === 1 ? 0 : data.status === 0 ? 1 : null,
    };
    await dispatch(userUpdate(reqData));

  };



  const handleDeposit = (record) => {
    const newRecord = {
      userId: record.key,
      coins: record.coins,
    };
    setDepositMenu({
      show: true,
      data: newRecord,
    });
  };
  const handleWithdrawal = (record) => {
    const newRecord = {
      userId: record.key,
      coins: record.coins,
    };
    setWithdrawalMenu({
      show: true,
      data: newRecord,
    });
  };
  const handleResetPassword = (record) => {
    const newRecord = {
      userId: record.key,
      password: record.passwordShow,
      username: record.username,
      otp: record?.otp
    };
    setResetPasswordMenu({
      show: true,
      data: newRecord,
    });
  };

  // const handleSendLoginDetails = () => {
  //   NotificationManager.success("Succes", "Login Details Sent Succesfull", 1000, () => {
  //     alert('callback');
  //   });
  // };

  const handlePartnerInfoModal = async (data) => {
    let parentreqBody = {
      userId: data.key,
    };
    dispatch(getShareDetails(parentreqBody));
  };



  const handleBetBlock = async (data) => {
    let reqData = {
      "userId": data.key,
      "betStatus": !data.betStatus
    };
    await dispatch(userUpdate(reqData));
  };

  const handleCasinoBlock = async (data) => {
    let reqData = {
      "userId": data.key,
      "casinoStatus": !data.casinoStatus
    };
    await dispatch(userUpdate(reqData));

  };

  const handleINTCasinoBlock = async (data) => {
    let reqData = {
      "userId": data.key,
      "intCasinoStatus": !data.intCasinoStatus
    };
    await dispatch(userUpdate(reqData));

  };

  if (!userLists) {
    return null;
  }

  const handleClose = () => {

    setInfoMenu({
      show: false,
      // data: null,
    });
    setStatusMenu({
      show: false,
      // data: null,
    });
    setDepositMenu({
      show: false,
      data: null
    });
    setWithdrawalMenu({
      show: false,
      data: null,
    });
    setResetPasswordMenu({
      show: false,
      // data: null,
    });
    setSendLoginDetails({
      show: false,
      // data: null,
    });
    setExposureModal({
      show: false,

    })
  };
  const getDownlineUserType = (record) => {
    let userDetails = record;
    let downlineUserPriority = userDetails.userPriority - 1;
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

  const getUplineUserDetails = (usertypes) => {


    let userDetails = UserTypeData[usertypes];
    let downlineUserPriority = userDetails ? (userDetails.priority + 1) : null;


    let getDownlineUserType = () => {
      let downlineUserType;
      switch (downlineUserPriority) {
        case 9:
          downlineUserType = "owner";
          break;
        case 8:
          downlineUserType = "subowner";
          break;
        case 7:
          downlineUserType = "superadmin";
          break;
        case 6:
          downlineUserType = "admin";
          break;
        case 5:
          downlineUserType = "subadmin";
          break;
        case 4:
          downlineUserType = "master";
          break;
        case 3:
          downlineUserType = "superagent";
          break;
        case 2:
          downlineUserType = "agent";
          break;
        case 1:
          downlineUserType = "client";
          break;
        default:
          downlineUserType = "unknown";
          break;
      }

      return downlineUserType;
    };

    let downlineUserType = getDownlineUserType();
    setName(downlineUserType)
    return { downlineUserType };
  }


  const downlineWithUserName = async (item) => {

    if (item.userType === 'client') {
      return null;
    }
    const downlineUserType = getDownlineUserType(item);
    history.push(`/components/general/button-${downlineUserType}/${item.key}/${Number(item.userPriority) - 1}`)
  }



  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      clearFilters,
      confirm,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="gx-bg-primary gx-text-white btn"
            onClick={() => handleSearch(confirm)}
            // icon={<SearchOutlined className="gx-text-white"/>}
            size="small"
            style={{ width: 60 }}
          >
            Search
          </Button>
          <Button
            className="gx-bg-grey gx-text-white btn"
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 60 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined

        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text
  });


  // const navigateDownLine = async (record) => {
  //   const downlineUserType = getDownlineUserType(record);
  //   history.push(`/components/general/button-${downlineUserType}/${record.key}/${record.userPriority}`);

  // }


  const handleExposure = (id) => {

    setExposureModal({
      show: true,
      data: id
    })

    handleUserExposerModal(id)

  }

  const handleUserExposerModal = async (openExposureId) => {

    let reqData = {
      "diamondBet": true,
      "downlineUserId": openExposureId,
      "downlineUserType": "client",
      "isClientExposure": true
    }

    dispatch(getSportsBetsList(reqData));
  }

  const menu = (record) => {
    const downlineUserType = getDownlineUserType(record);

    return (
      <Menu >
        {/* <Menu.Item key="0" onClick={() => alert('1')}> INT Casino </Menu.Item> */}
        <Menu.Item key="1" className="gx-fs-md gx-font-weight-bold gx-py-2 gx-text-light-black" onClick={() => handleDeposit(record)}> Deposit </Menu.Item>
        <Menu.Item key="2" className="gx-fs-md gx-font-weight-bold gx-py-2 gx-text-light-black" onClick={() => handleWithdrawal(record)}> Withdrawn</Menu.Item>
        <Menu.Item key="3" onClick={() => handleStatus(record)}> {record.status === 0 ? "Active" : "Inactive"}</Menu.Item>
        {/* {record?.userType === "client" && (<> */}
        <Menu.Item key="4" onClick={() => handleBetBlock(record)}>{record.betStatus ? "Block Betting" : "UnBlock Betting"}</Menu.Item>
        <Menu.Item key="5" onClick={() => handleCasinoBlock(record)}>{record.casinoStatus ? "Block Casino" : "UnBlock Casino"}</Menu.Item>
        {internationalCasino === true && (
          <Menu.Item key="12" onClick={() => handleINTCasinoBlock(record)}>{record.intCasinoStatus ? "Block IntCasino" : "UnBlock IntCasino"}</Menu.Item>)}
        {/* </>)} */}

        <Menu.Item key="6" > <Link to={`/components/edit/edit-account/${record.key}`}>Edit</Link></Menu.Item>
        <Menu.Item key="7" ><Link to={`/components/statement/transaction/${record.key}`}> Statement </Link></Menu.Item>
        <Menu.Item key="8" ><Link to={`/components/statement/account-operations/${record.key}`}>Account Operations</Link></Menu.Item>
        <Menu.Item key="9"  ><Link to={`/components/feedBack/alert/${record.key}`}> Login Report </Link></Menu.Item>
        {record?.userType !== "client" && (<>
          <Menu.Item key="10" ><Link to={`/components/general/button-${downlineUserType}/${record.key}/${Number(record.userPriority) - 1}`}>Downline</Link></Menu.Item>
          {/* // <Link to={`/components/general/button-${downlineUserType}/${record.key}/${record.userPriority}`}></Link> */}
        </>)}
        {/* <Menu.Item key="11" onClick={() => handleSendLoginDetails(record)}>Send Login Details</Menu.Item> */}
        <Menu.Item onClick={() => handleResetPassword(record)} key="11"> Reset Password</Menu.Item>
      </Menu>
    );
  };


  const columns = [
    {
      title: "#",
      key: "info",
      render: (record) => (
        <span className="gx-text-primary">
          <ShareAltOutlined
            className="gx-mr-0 gx-fs-lg"
            onClick={(e) => handleInfo(e, record)}
          />
        </span>
      ),
    },

    {
      title: "",
      key: "action",
      render: (record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <span
            className="gx-bg-primary gx-px-2 gx-py-1"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined className="gx-fs-lg gx-font-weight-bold gx-text-white" />
          </span>
        </Dropdown>
      ),
    },

    {
      title: "CODE",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },

    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (value, row) => (
        <span
          className="gx-text-blue gx-pointer gx-fs-lg gx-font-weight-bold gx-text-nowrap"
          onClick={() => downlineWithUserName(row)}
        >
          {value}
        </span>
      ),
    },

    {
      title: (
        <span className="gx-text-uppercase">
          {name !== "subadmin" ? name : "Mini Admin"}
        </span>
      ),
      dataIndex: "creatorName",
      key: "creatorName",
      ...getColumnSearchProps("creatorName"),
      render: (value) => (
        <span className="gx-text-nowrap">{value}</span>
      ),
    },

    ...(settings?.domainName === "PINK99"
      ? [
        {
          title: "CONTACT",
          dataIndex: "mobile",
          key: "mobile",
          ...getColumnSearchProps("mobile"),
        },
      ]
      : []),

    {
      title: "D.O.J",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        moment(createdAt)
          .utcOffset("+05:30")
          .format("DD-MM-YY"),
    },

    ...(userType !== "client"
      ? [
        {
          title: "SHARE %",
          dataIndex: "userMatchShare",
          key: "userMatchShare",
        },
      ]
      : []),

    {
      title: "PASSWORD",
      dataIndex: "passwordShow",
      key: "passwordShow",
      render: (value) =>
        settings?.domainName === "SKY99" ? "*****" : "*******",
    },

    /* ================= COMM % GROUP ================= */
    {
      title: "COMM %",
      children: [
        {
          title: "TYPE",
          dataIndex: "userCommissionType",
          key: "userCommissionType",
          render: (value) =>
            value === "BetByBet" ? "BBB" : "NOC",
        },
        {
          title: "MATCH",
          dataIndex: "userMatchCommission",
          key: "userMatchCommission",
        },
        {
          title: "SESSION",
          dataIndex: "userSessionCommission",
          key: "userSessionCommission",
        },
      ],
    },
    ...(userType === "client"
      ? [
        {
          title: "Expo",
          dataIndex: "exposure",
          render: (value, record) => {
            return Number(value) !== 0 ? (
              <span onClick={() => handleExposure(record.key)} style={{ color: '#038FDE', fontWeight: 'bold' }} className="gx-font-bold">{Math.abs(value).toFixed(2)}</span>
            ) : (
              <span>{value}</span>
            );
          },
        },
      ]
      : []),

    {
      title: "CHIPS",
      dataIndex: "coins",
      key: "coins",
      render: (coins) =>
        Number(
          coins
            ? (Math.floor(Number(coins) * 100) / 100).toFixed(2)
            : 0
        ).toFixed(2),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <span className={`${value === 1 ? "ant-tag gx-rounded-xs ant-tag-green" : "ant-tag gx-rounded-xs ant-tag-red"}`}>
          {value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];


  // // show the data conditinll near table colume
  // if (userType === "client") {
  //   const pwdColumnIndex = columns.findIndex(col => col.title === "PASSWORD");
  //   if (pwdColumnIndex !== -1) {
  //     columns.splice(pwdColumnIndex + 1, 0, {
  //       title: "Exposure",
  //       dataIndex: "exposure",
  //       render: (value, record) => {
  //         return Number(value) !== 0 ? (
  //           <span onClick={() => handleExposure(record.key)} style={{ color: '#038FDE', fontWeight: 'bold' }} className="gx-font-bold">{Math.abs(value).toFixed(2)}</span>
  //         ) : (
  //           <span>{value}</span>
  //         );
  //       },
  //     });
  //   }
  // }

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  };


  const getSkeletonColumns = (columns, loading) => {
    return columns.map((col) => {
      const originalRender = col.render;

      return {
        ...col,
        render: (value, record, index) => {
          if (loading) {
            return <Skeleton.Input active size="small" style={{ width: 50 }} />;
          }

          if (originalRender) {
            return originalRender(value, record, index);
          }

          return value;
        },
      };
    });
  };

  return (
    <>
      {loading || loader
        && <div style={{
          backgroundColor: 'rgba(255,255,255, 0.5)',
          zIndex: 10
        }} className="gx-position-absolute gx-top-0 gx-left-0 gx-w-100 gx-h-100 gx-bg-flex gx-align-items-center gx-justify-content-center ">
          <Spin size="mideum" style={styles} />
          <span className="gx-text-primary" ></span>
        </div>}
      {/* columns={getSkeletonColumns(columns, loading)} */}
      <Table className="gx-table-responsive gx-font-weight-bold gx-fs-sm gx-text-uppercase" columns={columns} dataSource={userLists} bordered pagination={false} size="small" rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''} />
      <TablePagination currentPage={currentPage} totalItems={totalItems} pageSize={pageSize} onPageChange={handlePageChange} />
      <Info data={infoMenu.data} visible={infoMenu.visible} handleClose={() => handleClose()} partnerInfoModal={partnerInfoModal?.data} />
      <Status getUserListFun={getUserListFun} data={statusMenu.data} setStatusMenu={setStatusMenu} visible={statusMenu.show} handleClose={() => handleClose()} />
      <ResetPassword data={resetPasswordMenu.data} visible={resetPasswordMenu.show} handleClose={() => handleClose()} />
      <LoginDtails data={sendLoginDetails.data} visible={sendLoginDetails.show} handleClose={() => handleClose()} />
      <Deposit searchText={searchText} loader={loader} data={depositMenu.data} visible={depositMenu.show} handleClose={() => handleClose()} getUserListFun={getUserListFun} />
      <Withdrawal searchText={searchText} data={withdrawalMenu.data} visible={withdrawalMenu.show} handleClose={() => handleClose()} getUserListFun={getUserListFun} />
      <NotificationContainer style={{ marginRight: 400 }} />
      <Exposuremodal data={exposureModal.data} visible={exposureModal.show} handleClose={() => handleClose()} />

    </>
  );
};

export default ButtonGroups;