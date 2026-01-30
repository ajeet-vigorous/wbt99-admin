import React, { useEffect } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { toggleCollapsedSideNav } from "../../appRedux/actions"; //switchLanguage, 
import UserInfo from "../../components/UserInfo";
import Auxiliary from "util/Auxiliary";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import { domainSettingByDomain, getMatchList, userBalance } from "../../appRedux/actions/User";
import { TfiReload } from "react-icons/tfi";
import settings from "../../domainConfig";
import { RiRefreshFill } from "react-icons/ri";
// import { useBalance } from '../../ContextApi'


const { Header } = Layout;

const Topbar = () => {

  // const [balance, setBalance] = useState({
  //   coins: "",
  //   exposure: "",
  // });

  const { navStyle } = useSelector(({ settings }) => settings); //locale paste this if you use multi launguage
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  const width = useSelector(({ common }) => common.width);
  // const { balance, setBalance } = useBalance();
  const dispatch = useDispatch();
  // const domain = window.location.origin.replace(/^https?:\/\//, '').replace(/^[^.]+\./, '');
  // 
  useEffect(() => {
    let domainSetting = {
      "domainUrl": window.location.origin
    };

    dispatch(userBalance());


    // dispatch(getMatchList());
    const interval = setInterval(() => {
      dispatch(getMatchList());
      dispatch(domainSettingByDomain(domainSetting))
    }, 60 * 1000 * 2);
    return () => clearInterval(interval);
  }, [dispatch]);


  const handleUserBalance = () => {
    window.location.reload()
  };

  const Notification = localStorage.getItem("notification");


  return (
    <>
      <Header>
        {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR)) ?
          <div className="gx-linebar ">
            <i className="gx-icon-btn icon icon-menu-unfold gx-text-white"
              onClick={() => {
                dispatch(toggleCollapsedSideNav(!navCollapsed));
              }}
            />
          </div> : null}
        <Link to="/main/dashboard/crm" className="gx-d-block gx-d-lg-none gx-pointer">
          <img alt="" width={90} src={settings?.logo} /></Link>

        <ul className="gx-header-notifications gx-ml-auto">
          <Auxiliary>
            <li className="gx-user-nav">
              <UserInfo />
            </li>
            {/* <li className="gx-pointer"><RiRefreshFill onClick={() => handleUserBalance()} size={30} color={settings.domainName === "PINK99" ? '#003365' : 'white'}/></li> */}
          </Auxiliary>
        </ul>
      </Header>

      {/* {Notification && Notification !== undefined && Notification !== 'undefined' && Notification !== null && ( */}
      <marquee style={{ minHeight: "20px"}} className="gx-fx-xl gx-bg-white gx-text-red gx-text-uppercase gx-font-weight-semi-bold gx-border gx-bg-flex gx-align-items-center">
        {Notification ? Notification : "."}
      </marquee>
      {/* )} */}



    </>
  );
};

export default Topbar;
