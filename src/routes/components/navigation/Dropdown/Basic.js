import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, Table, DatePicker, Select, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BackButton from "../../Hoc/BackButton";
import moment from "moment";
import { completeSportList } from "../../../../appRedux/actions/User";
import { useDispatch } from "react-redux";
import Loader from "../../../../components/loader";
import TablePagination from "../../../../components/TablePagination";
import { values } from "lodash";
import settings from "../../../../domainConfig";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const Basic = () => {
  const { Option } = Select;
  const RangePicker = DatePicker.RangePicker;
  const [userLists, setUserLists] = useState([])
  const [showDate, setShowDate] = useState({ startDate: null, endDate: null });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const dispatch = useDispatch();
  const { sportList, loading } = useSelector((state) => state.UserReducer);


  const parseMatchDate = (dateString) => {
    if (!dateString) return null; // Handle empty case
    const [datePart, timePart] = dateString.split(' ');

    if (!timePart) return null; // Handle cases with only date

    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const isPM = timePart.includes('PM');

    let hour = parseInt(hours, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minutes);
  };

  const sortMatchData = (data) => {
    return data?.sort((a, b) => {
      const dateA = parseMatchDate(a.matchDate);
      const dateB = parseMatchDate(b.matchDate);
      const isAM_A = a.matchDate.includes('AM');
      const isAM_B = b.matchDate.includes('AM');
      const hasTimeA = a.matchDate.includes(':');
      const hasTimeB = b.matchDate.includes(':');

      // Check for valid AM/PM and time
      const isValidA = !!dateA && (isAM_A || a.matchDate.includes('PM'));
      const isValidB = !!dateB && (isAM_B || b.matchDate.includes('PM'));

      // Sort based on AM/PM status and valid dates
      if (isValidA && isValidB) {
        if (isAM_A && !isAM_B) return -1; // A is AM, B is PM
        if (!isAM_A && isAM_B) return 1;  // A is PM, B is AM
        return dateA - dateB; // Both valid, sort by date
      } else if (isValidA) {
        return -1; // A is valid, B is invalid
      } else if (isValidB) {
        return 1; // B is valid, A is invalid
      } else {
        // Both invalid or without AM/PM
        if (!isAM_A && !isAM_B) {
          // Both are invalid, but A has time and B does not
          if (hasTimeA && !hasTimeB) return 1; // A goes last
          if (!hasTimeA && hasTimeB) return -1; // B goes last
          return 0; // Both go last
        }
        return 0; // Both invalid or both with no time
      }
    });
  };


  useEffect(() => {
    completeSportData()
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (sportList) {
      let sortedMatchList;

      sortedMatchList = Object.values(sportList?.matchData).sort((a, b) =>
        moment(a.matchDate, "DD-MM-YYYY HH:mm:ss")
          .diff(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss"))
      );
      const dateSortedList = sortMatchData(sortedMatchList);

      const filteredData = Object.values(dateSortedList)?.map((item, index) => ({
        key: index,
        eventId: item.eventId,
        matchName: item.matchName,
        marketId: item.marketId,
        matchDate: item.matchDate,
        matchType: item.matchType,
        isDeclared: item.isDeclare ? "Yes" : "No",
        gameName: item.gameName,
        wonTeamName: item.wonTeamName,
        totalProfit: item.totalProfit ? item.totalProfit : "0.00",
        declaredDate: item?.updatedAt
      }))
      setUserLists(filteredData);
      console.log(filteredData, "filteredData");

    }

  }, [sportList]);

  const completeSportData = async () => {
    try {
      let reqData = {
        // "sportId": "4",
        "sportId": [4, 3, 2, 1],
        "isAccountDetails": true,
        "pageNo": currentPage,
        "size": pageSize,

      }
      dispatch(completeSportList(reqData));
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  async function onChangeMatch(userId) {

    let reqData = {
      "sportId": userId,
      "isAccountDetails": true,
      "pageNo": currentPage,
      "size": pageSize,
    };

    if (userId === 'all') {
      reqData.sportId = [4, 3, 2, 1];
    }

    dispatch(completeSportList(reqData));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };

    return obj;
  };

  const menu = (filteredData) => (
    <Menu>
      <Menu.Item key="1" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/plusminusreport/plus-minus-report/${filteredData.marketId}/${filteredData.matchName}`}>Match and Session Plus Minus</Link></Menu.Item>
      <Menu.Item key="2" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchplusminus/plus-minus-report/${filteredData.marketId}/${filteredData.matchName}`}>Match and Session Plus Minus 2</Link></Menu.Item>
      <Menu.Item key="3" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchbet/displaymatchbets/${filteredData.marketId}`}>Display Match Bets</Link></Menu.Item>
      <Menu.Item key="4" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/displaysession/displaysessionbet/${filteredData.marketId}`}>Display Session Bets</Link></Menu.Item>
      <Menu.Item key="4" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchsessionbet/match-sessionbet/${filteredData.marketId}`}>Match And Session Bet</Link></Menu.Item>

      {/* <Menu.Item key="4">Display Session Bets</Menu.Item> */}


      <Menu.Item key="5" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/completed/completedbets/${filteredData.marketId}`}>Completed Fancies</Link></Menu.Item>
      <Menu.Item key="6" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/agent/agent-list/${filteredData.marketId}/${filteredData.matchName}`}>Agent Plus Minus</Link></Menu.Item>
      {settings?.domainName !== "RACEX9" && (<>
        <Menu.Item key="7" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelBets/${filteredData.marketId}`}> Rejected Bets</Link></Menu.Item>
        <Menu.Item key="10" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelmatchoddsBets/${filteredData.marketId}`}> Rejected Match Bets</Link></Menu.Item></>)}
    </Menu>
  );
  const columns = [
    {
      title: "",
      dataIndex: "kk",
      key: "kk",
      render: (text, filteredData) => (
        <Dropdown overlay={menu(filteredData)} trigger={["click"]}>
          <span onClick={(e) => e.preventDefault()} className="gx-bg-flex gx-justify-content-center gx-align-items-center">
            <DownOutlined className="gx-mr-0 gx-fs-lg gx-font-weight-bold gx-text-center gx-border gx-rounded-xs  gx-p-2" />
          </span>
        </Dropdown>
      ),
    },

    // {
    //   title: "Code",
    //   dataIndex: "eventId",
    //   key: "eventId",
    //   render: renderContent,
    // },
    {
      title: "Name",
      dataIndex: "matchName",
      key: "matchName",
      render: renderContent,
    },

    {
      title: "Time",
      dataIndex: "matchDate",
      key: "matchDate",
      render: renderContent,
    },
    {
      title: "Declared Date",
      dataIndex: "declaredDate",
      key: "declaredDate",
      render: (text, record) => (
        <span>{moment(text).format("DD-MM-YYYY hh:mm A")}</span>
      ),
    },
    {
      title: "Competition",
      dataIndex: "matchType",
      key: "matchType",
      render: renderContent,
    },

    // {
    //   title: "Declared",
    //   dataIndex: "isDeclared",
    //   key: "isDeclare",
    //   render: renderContent,
    // },
    {
      title: "Won By",
      dataIndex: "wonTeamName",
      key: "wonTeamName",
      render: renderContent,
    },

    {
      title: "P/L",
      dataIndex: "totalProfit",
      key: "x",
      // render: (value) => Number.parseFloat(Math.abs(value)).toFixed(2),
      render: (value) => (
        <span className={`${-1 * value >= 0 ? "gx-text-green-0" : "gx-text-red"}`}>
          {Number.parseFloat(value ? Math.abs(value) : 0).toFixed(2)}
        </span>
      ),
    },
  ];


  function onChange(dates, dateStrings) {
    setShowDate({
      startDate: dates[0],
      endDate: dates[1],
    });
  }


  return (
    <>
      {/* {loading ? <Loader props={loading} /> : */}
      <Card className="gx-card gx-w-100 ">
        <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
          <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`Completed Games Detail`}</span>
          <BackButton />
        </div>
        <Row gutter={12} className="gx-px-4">
          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <RangePicker className="gx-w-100" ranges={{
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
            }} onChange={onChange} />
          </Col>

          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by name or competition"
            />
          </Col>
        </Row>


        <div className="gx-px-4">
          <div className="gx-mb-3 gx-p-4 gx-bg-light-grey gx-rounded-sm">
            <div className="gx-bg-flex gx-flex-md-row gx-flex-column">
              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    Commission+
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-green-0 gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>

              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    Commission-
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-red gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>
              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    P/L
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-green-0 gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Table
            className="gx-table-responsive gx-text-uppercase gx-font-weight-bold"
            columns={columns}
            dataSource={userLists}
            bordered
            pagination={false}
            size="small"
            rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
          />
        </div>
        <div className="gx-px-4">
          <TablePagination currentPage={currentPage} totalItems={sportList?.totalCount} pageSize={pageSize} onPageChange={handlePageChange} />
        </div></Card>
      {/* } */}
    </>
  );
};

export default Basic;
