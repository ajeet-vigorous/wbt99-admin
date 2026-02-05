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
          <DownOutlined className="gx-mr-0 gx-fs-lg gx-font-weight-bold gx-text-center gx-border gx-rounded-xs gx-p-2" />
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

const menu = (matchList) => (
  <Menu>
    <Menu.Item key="3" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/matchbet/displaymatchbets/${matchList.marketId}`}>Match Bets</Link></Menu.Item>
    <Menu.Item key="4" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/displaysession/displaysessionbet/${matchList.marketId}`}>Session Bets</Link></Menu.Item>
    <Menu.Item key="5" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/completed/completedbets/${matchList.marketId}`}>Completed Fancies</Link></Menu.Item>
    <Menu.Item key="6" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelBets/${matchList.marketId}`}>Rejected Bets</Link></Menu.Item>
    <Menu.Item key="10" className="gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase"><Link to={`/components/rejected/cancelmatchoddsBets/${matchList.marketId}`}>Rejected Match Bets</Link></Menu.Item>
  </Menu>
);

const Simple = () => {
  const RangePicker = DatePicker.RangePicker;
  const { matchList, loadingMatch } = useSelector(state => state.UserReducer); // Replace 'yourDataKey' with the actual key in your Redux store
  const [matchData, setMatchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state to manage the search input

  useEffect(() => {
    let adminMatchList = JSON.parse(localStorage.getItem('matchList')) || matchList;
    if (adminMatchList) {
      const sortedMatchList = adminMatchList.slice().sort((a, b) =>
        moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").diff(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss"))
      );
      const data = sortedMatchList.map((item, index) => ({
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
      setMatchData(data);
    }
  }, [matchList]);

  // Filter data based on the search query
  const filteredData = matchData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.competition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
          <span className="gx-fs-xl gx-font-weight-light gx-fs-md gx-py-2 gx-text-uppercase gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`Sport Details`}</span>
          <BackButton />
        </div>
        <Row gutter={12} className="gx-px-4">
          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <RangePicker className="gx-w-100" ranges={{
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
              "This Week": [moment().startOf("week"), moment().endOf("week")],
              "Last Week": [moment().subtract(1, "week").startOf("week"), moment().subtract(1, "week").endOf("week")],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
              "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }} />
          </Col>
          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by name or competition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        <div className="gx-px-4">
          <Table
            className="gx-table-responsive gx-border-2 gx-text-uppercase gx-fs-sm gx-font-weight-bold"
            columns={columns}
            bordered
            dataSource={filteredData}
            size="small"
          />
        </div>
      </Card>
    </>
  );
};

export default Simple;