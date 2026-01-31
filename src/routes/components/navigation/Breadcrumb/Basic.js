

import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, Table, Tag, DatePicker, Col, Row, Input } from "antd";
import { useSelector } from "react-redux";
import BackButton from "../../Hoc/BackButton";
import moment from 'moment'
import { Link } from "react-router-dom";
import Loader from "../../../../components/loader";
import settings from "../../../../domainConfig";
import { DownOutlined, SearchOutlined, ShareAltOutlined } from '@ant-design/icons';

const columns = [

  {
    title: '#',
    dataIndex: 'kk',
    key: 'kk',
    render: (text, matchList) => (
      <Dropdown overlay={menu(matchList)} trigger={['click']}>
        <span onClick={(e) => e.preventDefault()} className="gx-bg-flex gx-justify-content-center gx-align-items-center">
          <DownOutlined className="gx-mr-0 gx-fs-lg gx-font-weight-bold gx-text-center gx-border gx-rounded-xs  gx-p-2" />
        </span>
      </Dropdown>
    ),
  },

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Time',
    dataIndex: 'opendate',
    key: 'opendate',
  },
  {
    title: 'Competition',
    dataIndex: 'competition',
    key: 'competition',
  },
  {
    title: 'Details',
    key: 'status',
    render: (value, row) =>
      <a
        href={`/components/matchviewdetail/match-view-details/${value.marketId}/${value.eventId}`}
        className="link-button gx-font-weight-semi-bold"
      >
        <button type="button" size="small" class="btn btn-primary btn-color-primary btn-variant-solid btn-sm">
          <span className="gx-px-1">View</span>
        </button>

      </a>
  },
];
const isInplayMatch = (row) => {
  if (!row?.opendate) return false;

  // Match time
  const matchMoment = moment(row.opendate, "DD-MM-YYYY HH:mm:ss");

  // Current time + 60 minutes buffer
  const currentMoment = moment().add(60, "minutes");

  // Agar current time match time ke barabar ya aage hai → Inplay
  return currentMoment.isSameOrAfter(matchMoment);
};
const menu = (matchList) => (
  <Menu >


{/* 
    <Menu.Item key="1" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase">
      {matchList?.status === 'INPLAY' ?
        <a href={`/components/matchviewdetail/match-view-details/${matchList.marketId}/${matchList.eventId}`} // Optional: for accessibility
        
        >
          Match and Session Position
         
        </a>
        :
        <span className="link-button gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase " onClick={() => alert('MATCH WILL BE STARTED SOON')}>
          Match and Session Position
        </span>}

    </Menu.Item> */}

    {/* <Menu.Item key="2" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/plusminusreport/plus-minus-report/${matchList.marketId}/${matchList.matchName}`}>Match and Session Plus Minus</Link></Menu.Item>
    <Menu.Item key="7" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchplusminus/plus-minus-report/${matchList.marketId}/${matchList.matchName}`}>Match and Session Plus Minus 2</Link></Menu.Item> */}
    <Menu.Item key="3" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchbet/displaymatchbets/${matchList.marketId}`}>Match Bets</Link></Menu.Item>
    <Menu.Item key="4" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/displaysession/displaysessionbet/${matchList.marketId}`}>Session Bets</Link></Menu.Item>
    {/* <Menu.Item key="8" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchsessionbet/match-sessionbet/${matchList.marketId}`}>Match And Session Bet</Link></Menu.Item> */}
    <Menu.Item key="5" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/completed/completedbets/${matchList.marketId}`}>Completed Fancies</Link></Menu.Item>
      <>
        <Menu.Item key="6" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase">
          <Link to={`/components/rejected/cancelBets/${matchList.marketId}`}>Rejected Bets</Link>
        </Menu.Item>
        <Menu.Item key="10" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase">
          <Link to={`/components/rejected/cancelmatchoddsBets/${matchList.marketId}`}>Rejected Match Bets</Link>
        </Menu.Item>
      </>
    {/* <Menu.Item key="6" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelBets/${matchList.marketId}`}> Rejected Bets</Link></Menu.Item>
    <Menu.Item key="10" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelmatchoddsBets/${matchList.marketId}`}> Rejected Match Bets</Link></Menu.Item> */}
    {/* <Menu.Item key="9" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/agent/agent-list/${matchList.marketId}/${matchList.matchName}`}>Agent Plus Minus</Link></Menu.Item> */}
  </Menu>
);


const Simple = () => {
  const RangePicker = DatePicker.RangePicker;
  const { matchList, loadingMatch } = useSelector(state => state.UserReducer); // Replace 'yourDataKey' with the actual key in your Redux store


  const [matchData, setMatchData] = useState([])

  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));

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
    let matchListData = adminMatchList ? adminMatchList : matchList;

    if (matchListData) {
      let sortedMatchList;

      if (settings.domainName === "PLR11") {
        sortedMatchList = matchListData.filter(item => item?.sportId === 4).sort((a, b) =>
          moment(a.matchDate, "DD-MM-YYYY HH:mm:ss")
            .diff(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss"))
        );
      } else {
        sortedMatchList = matchListData.slice().sort((a, b) =>
          moment(a.matchDate, "DD-MM-YYYY HH:mm:ss")
            .diff(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss"))
        );
      }

      const dateSortedList = sortMatchData(sortedMatchList);
      const data = dateSortedList.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        opendate: item.matchDate,
        competition: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        matchDate: item?.matchDate,
        status: item?.status
      }));
      // const sortedData = sortMatchData(data);
      setMatchData(data);
      // setMatchData(data);
    }
  }, [matchList]);





  return (
    <>
      {/* {loadingMatch ? <Loader props={loadingMatch} /> : */}
      <Card className="gx-card gx-w-100 ">
        <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
          <span className="gx-fs-xl gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`Sport Details`}</span>
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
            }} />
          </Col>

          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by name or competition"
            />
          </Col>
        </Row>


        <div className="gx-px-4">

          <Table className="gx-table-responsive gx-border-2 gx-text-uppercase gx-fs-sm gx-font-weight-bold" columns={columns} bordered dataSource={matchData} pagination={true} size="small" />
        </div>
      </Card>
      {/* // } */}
    </>
  );
};

export default Simple;

