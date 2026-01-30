import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import { internationalCasino, matkaVisible, userTypeInfo } from '../../constants/global'

import {
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import moment from "moment";
import settings from "../../domainConfig";
import {
  BankOutlined,
  BarChartOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';




const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  let userInfo = JSON.parse(localStorage.getItem('user_id'));
  let userID = userInfo && userInfo.data && userInfo.data.userId ? userInfo.data.userId : {};
  if (!userInfo || !userInfo.data || !userInfo.data.userPriority) {
    return null;
  }

  let fromDate = moment().format("YYYY-MM-DD")
  let toDate = moment().format("YYYY-MM-DD")
  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            // defaultOpenKeys={[defaultOpenKeys]}
            // selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <MenuItemGroup key="components" className="gx-menu-group" >
              <Menu.Item key="components">
                <Link to="/main/dashboard/crm">
                  <span> <HomeOutlined className="gx-mr-0 gx-fs-lg" />
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.dashboard" /></span>
                  </span>
                </Link>
              </Menu.Item>


              <SubMenu key="general" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <UserOutlined className="gx-mr-0 gx-fs-lg" />
                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">
                    <IntlMessages id={`sidebar.${userInfo?.data?.userType}`} /> Details</span>
                </span>}>

                {userTypeInfo?.map(item => (
                  userInfo.data.userPriority > item.priority ? (
                    <Menu.Item key={`components/general/button-${item.shortname}`}>
                      <Link to={`/components/general/button-${item.userType}/${item.priority}/${item.priority}`}>
                        <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id={`sidebar.${item.userType}`} /> Master</span>
                      </Link>
                    </Menu.Item>
                  ) : null
                ))}
              </SubMenu>

              <SubMenu key="navigation" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <PlayCircleOutlined className="gx-mr-0 gx-fs-lg" />
                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id="sidebar.components.navigation" /></span>
                </span>}>
                {/* <Menu.Item key="components/navigation/affix">
                  <Link to="/components/navigation/affix">
                    <span><IntlMessages
                      id="sidebar.navigation.affix" /></span></Link>
                </Menu.Item> */}
                <Menu.Item key="components/navigation/breadcrumb">
                  <Link to="/components/navigation/breadcrumb">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.navigation.breadcrumb" /></span></Link>
                </Menu.Item>

                <Menu.Item key="components/navigation/dropdown">
                  <Link to="/components/navigation/dropdown">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.navigation.dropdown" /></span></Link>
                </Menu.Item>
                {/* <Menu.Item key="components/navigation/menu">
                  <Link to="/components/navigation/menu">
                    <span><IntlMessages
                      id="sidebar.navigation.menu" /></span></Link>
                </Menu.Item> */}

              </SubMenu>

              <SubMenu key="casino" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <PlayCircleOutlined className="gx-mr-0 gx-fs-lg" />
                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Casino</span>
                </span>}>
                <Menu.Item key="components/navigation/breadcrumb1">
                  <Link to="/components/casino/inplaycasino">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Inplay Casino</span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/dropdown1">
                  <Link to="/components/casino/completedcasino">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Completed Casino</span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/menu">
                  <Link to="/components/navigation/menu">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.navigation.menu" /></span></Link>
                </Menu.Item>
                {internationalCasino === true && (
                  <Menu.Item key="components/navigation/dropdown2">
                    <Link to={`/components/casino/internetionalcasinodeatils/${fromDate}&${toDate}`}>
                      <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">International Casino</span></Link>
                  </Menu.Item>)}

              </SubMenu>
              {matkaVisible === true && (
                <SubMenu key="matka" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                    <PlayCircleOutlined className="gx-mr-0 gx-fs-lg" />
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Matka</span>
                  </span>}>
                  <Menu.Item key="components/navigation/breadcrumb11">
                    <Link to="/components/matka/inplay-matka">
                      <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Inplay Matka</span></Link>
                  </Menu.Item>
                  {/* <Menu.Item key="components/navigation/dropdown11">
                  <Link to="/components/casino/completedcasino">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Matka bb</span></Link>
                </Menu.Item> */}
                  {/* <Menu.Item key="components/navigation/menu">
                  <Link to="/components/navigation/menu">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.navigation.menu" /></span></Link>
                </Menu.Item>
                {internationalCasino === true && (
                  <Menu.Item key="components/navigation/dropdown2">
                    <Link to={`/components/casino/internetionalcasinodeatils/${fromDate}&${toDate}`}>
                      <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">International Casino</span></Link>
                  </Menu.Item>)} */}

                </SubMenu>)}


              <SubMenu key="dataEntry" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <DollarOutlined className="gx-mr-0 gx-fs-lg" />
                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id="sidebar.components.dataEntry" /></span>
                </span>}>
                <Menu.Item key="components/dataEntry/autoComplete">
                  <Link to="/components/dataEntry/autoComplete">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.dataEntry.autoComplete" /></span></Link>
                </Menu.Item>
                <Menu.Item key="components/dataEntry/checkbox">
                  <Link to="/components/dataEntry/checkbox">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.dataEntry.checkbox" /></span></Link>
                </Menu.Item>

                {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo?.map(item => (
                  userInfo.data.userPriority > item.priority ? (
                    <Menu.Item key={`components/general/cascader-${item.shortname}`}>
                      {/* <Link to={`/components/dataEntry/cascader-${item.userType}/${item.priority}`}> */}
                      <Link to={`/components/dataEntry/cascader-${item.userType}`}>
                        <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id={`sidebar.${item.userType}`} /> Ledger</span>
                      </Link>
                    </Menu.Item>
                  ) : null
                )) : null}


                {(userInfo.data.userType === "owner" || userInfo.data.userType === "subowner" || userInfo.data.userType === "superadmin" || userInfo.data.userType === "admin" || userInfo.data.userType === "subadmin") && (<Menu.Item key="components/dataEntry1/checkbox1">
                  <Link to={`/components/partnership/partnership-list/${userInfo.data.userPriority}`}>
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">
                      {/* <IntlMessages
                      id="sidebar.dataEntry.checkbox" /> */}

                      Partnership
                    </span>

                  </Link>
                </Menu.Item>)}
              </SubMenu>

              <SubMenu key="dataDisplay" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <BankOutlined className="gx-mr-0 gx-fs-lg" />

                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id="sidebar.components.dataDisplay" /></span>

                </span>}>

                {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo?.slice().reverse()?.map(item => (
                  userInfo.data.userPriority > item.priority ? (
                    <Menu.Item key={`components/general/avatar-${item.shortname}`}>
                      <Link to={`/components/dataDisplay/avatar-${item.userType}`}>
                        <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id={`sidebar.cash.${item.userType}`} /></span>
                      </Link>
                    </Menu.Item>
                  ) : null
                )) : null}

              </SubMenu>


              <Menu.Item key="/components/dataDisplay/tabs">
                <Link to="/components/dataDisplay/tabs">
                  <span> <FileTextOutlined className="gx-mr-0 gx-fs-lg" />
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Comm. Report</span>
                  </span></Link>
              </Menu.Item>

              <SubMenu key="feedBack" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <FileTextOutlined className="gx-mr-0 gx-fs-lg" />
                  <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages id="sidebar.components.feedBack" /></span>

                </span>}>
                {/* <Menu.Item key="components/feedBack/alert">

                  <Link to={`/components/feedBack/alert/${userID}`}>
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.feedBack.alert" /></span></Link>
                </Menu.Item> */}
                <Menu.Item key="components/feedBack/modal">
                  <Link to="/components/feedBack/modal">
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold"><IntlMessages
                      id="sidebar.feedBack.modal" /></span></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="components/others/anchor">
                <Link to="/components/others/anchor">
                  <span> <SettingOutlined className="gx-mr-0 gx-fs-lg" />
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">
                      <IntlMessages id="sidebar.components.other" /></span>
                  </span></Link>
              </Menu.Item>

              {settings?.oldDataFlag === true && <Menu.Item key="components/rrr">
                <a href={settings?.oldDataLink} target="_blank">
                  <span> <BarChartOutlined className="gx-mr-0 gx-fs-lg" />
                    <span className="gx-fs-lg gx-text-uppercase gx-text-truncate colorInheret gx-font-weight-semi-bold">Old Data</span>
                  </span></a>
              </Menu.Item>}

            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

