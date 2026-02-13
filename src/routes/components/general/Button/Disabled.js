import React, { useEffect, useState } from "react";
import { Button, Card, Spin } from "antd";
import { useParams } from "react-router-dom";

import ButtonGroups from "./ButtonGroups";
import BackButton from "../../Hoc/BackButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, getuserSearchReport } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { Skeleton } from 'antd';
import { PlusOutlined } from "@ant-design/icons";



const getDownlineUserType = (param) => {

  const { userId, userPriority } = param
  let userDetails = userPriority;
  let downlineUserPriority = parseInt(userDetails) + 1;
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

const Disabled = () => {
  const dispatch = useDispatch();
  const { userType, userId, userPriority } = useParams();

  const [perentType, setPerentType] = useState('')
  const [userLists, setUserLists] = useState([]);
  const [infoMenu, setInfoMenu] = useState({ visible: false, data: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [searchText, setSearchText] = useState('');
  const [active, setActive] = useState("list")
  const pageSize = 25;
  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const userData = JSON.parse(localStorage.getItem('user_id'));
  const { userListItems, userListTotal, loader, userSearchList, loading, checkRedirect, userCoinsData } = useSelector((state) => state.UserReducer);

  const downlineUserType = getDownlineUserType({ userType, userId, userPriority });
  // console.log(downlineUserType, '6');
  useEffect(() => {
    setPerentType('');
    // setSearchText('')
    const downlineUserType = getDownlineUserType({ userType, userId, userPriority });
    // console.log(downlineUserType, '8');
    getUserListFun(downlineUserType)
    // alert('1')
  }, [currentPage, userType, userId, dispatch, pageSize, checkRedirect, userCoinsData]);

  const getUserListFun = async () => {
    const downlineUserType = getDownlineUserType({ userType, userId, userPriority });
    // console.log(downlineUserType, '7');


    try {
      const reqData = {
        sortData: { createdAt: 1 },
        keyWord: '',
        pageNo: currentPage,
        size: pageSize,
        status: 'both',
        parentUserType: downlineUserType,
        parentId: '',
        downlineUserType: userType
      };
      if (userId >= 1 && userId <= 9) {
        reqData.parentId = ''
      } else {
        reqData.parentId = userId;
      }
      // console.log(reqData, "ffffffffff");
      dispatch(getUserList(reqData));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    if (active === 'search' && userSearchList && userSearchList.length > 0) {
      const filteredData = userSearchList?.map(item => ({
        key: item.userId,
        username: item.username,
        name: item.name,
        creatorName: item.creatorName,
        mobile: item.mobile,
        createdAt: item.createdAt,
        userMatchShare: item.userMatchShare,
        passwordShow: item.passwordShow,
        coins: item.coins,
        status: item.status,
        userShowMatchShare: item.userShowMatchShare,
        userShowCasinoShare: item.userShowCasinoShare,
        userCommissionType: item.userCommissionType,
        userMatchCommission: item.userMatchCommission,
        userSessionCommission: item.userSessionCommission,
        userType: item.userType,
        userPriority: item.userPriority,
        betStatus: item.betStatus,
        casinoStatus: item.casinoStatus,
        exposure: item.exposure,
        otp: item?.otp,
        intCasinoStatus: item.intCasinoStatus,
        matkaStatus: item?.matkaStatus,
        isOtpRequired: item?.isOtpRequired

      }));
      setUserLists(filteredData);
      setTotalItems(userSearchList.length);
    } else if (active === 'list' && userListItems && userListItems.length >= 0) {
      const filteredData = userListItems?.map(item => ({
        key: item.userId,
        username: item.username,
        name: item.name,
        // name: <span className="gx-text-blue" onClick={() => alert('1')}><i className="icon icon-view-o" /> {item.name}</span>,
        creatorName: item.creatorName,
        mobile: item.mobile,
        createdAt: item.createdAt,
        userMatchShare: item.userMatchShare,
        passwordShow: item.passwordShow,
        coins: item.coins,
        status: item.status,
        userShowMatchShare: item.userShowMatchShare,
        userShowCasinoShare: item.userShowCasinoShare,
        userCommissionType: item.userCommissionType,
        userMatchCommission: item.userMatchCommission,
        userSessionCommission: item.userSessionCommission,
        userType: item.userType,
        userPriority: item.userPriority,
        betStatus: item.betStatus,
        casinoStatus: item.casinoStatus,
        exposure: item.exposure,
        otp: item?.otp,
        intCasinoStatus: item?.intCasinoStatus,
        matkaStatus: item?.matkaStatus,
        isOtpRequired: item?.isOtpRequired

      }));
      setUserLists(filteredData);
      setTotalItems(userListTotal);
    }
  }, [active, userListItems, userListTotal, userSearchList]);

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };



  const handleSearch = (confirm) => {

    let reqData = {
      searchValue: searchText,
      userType: userType
    };
    if (searchText) {
      setActive("search");
      dispatch(getuserSearchReport(reqData))
      confirm()

    } else {
      setActive("list");
      setPerentType('');
      const downlineUserType = getDownlineUserType({ userType, userId, userPriority });
      // console.log(downlineUserType, "llllllll");
      getUserListFun(downlineUserType)
      confirm()
    }
  };

  // if (!userListItems || !userLists) {
  //   return

  // }

  const renderContent = (value, row, index) => {

    const obj = {
      children: value,
      props: {},
    };
    if (index === 12) {
      obj.props.colSpan = 0;
    }
    return obj;
  };


  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  };
  
  return (
    <>
      {loading
        && <div style={{
          backgroundColor: 'rgba(255,255,255, 0.5)',
          zIndex: 10
        }} className="gx-position-absolute gx-top-5 gx-left-0 gx-w-100 gx-h-100 gx-bg-flex gx-align-items-center gx-justify-content-center ">
          <Spin size="mideum" style={styles} />

          <span className="gx-text-primary" ></span>
        </div>}

      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex  gx-align-items-center">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white  gx-text-uppercase">{`${userType === "subadmin" ? "Mini Admin" : userType} Details`}</span>
          <BackButton />
        </div>
        <div className="gx-px-3 gx-py-3 gx-bg-flex gx-justify-content-around ">
          <button type="button" className="gx-rounded-xs gx-py-2 gx-px-3 gx-bg-primary gx-border-0">
            <Link to={`/components/account/create-account/${userType}/${userId}/${userPriority}`} className="gx-text-white gx-py-2"><PlusOutlined /> Create </Link>
          </button>
          <button type="button" className="gx-rounded-xs gx-py-2 gx-px-3 gx-bg-primary gx-border-0">
            <Link to={`/components/plusminus/limitplusminus/${userType}/${userId}/${userPriority}`} className="gx-text-white gx-py-3"><PlusOutlined /> Update </Link>
          </button>

        </div>
        <div className="gx-position-relative">
          <ButtonGroups loader={loading} getUserListFun={getUserListFun} searchText={searchText} setSearchText={setSearchText} handleReset={handleReset} handleSearch={handleSearch} infoMenu={infoMenu} userType={userType} setInfoMenu={setInfoMenu} renderContent={renderContent} userLists={userLists} currentPage={currentPage} totalItems={totalItems} handlePageChange={handlePageChange} pageSize={pageSize} />
        </div>
      </Card>
    </>
  );
};

export default Disabled;