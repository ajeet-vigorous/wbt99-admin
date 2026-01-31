import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select, Table } from "antd";
import { useParams } from "react-router-dom";
import { httpPost } from "../../../../http/http";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { getClientListByMarketId, getSportsBetsList } from "../../../../appRedux/actions/User";
import TablePagination from "../../../../components/TablePagination";
import TeamDataDisplay from "./TeamDataDisplay";

const Basic = () => {
  const [userLists, setUserLists] = useState([]);
  const [userListData, setUserListData] = useState();
  const [OddsPositionData, setOddsPositionData] = useState([])
  const [teamDataList, setTeamDataList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [showClientList, setClientList] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { marketId } = useParams();
  const dispatch = useDispatch();
  const { sportsBetsList, clientListByMarketId, userSearchList } = useSelector(state => state.UserReducer);
  useEffect(() => {
    getSportsBetsListFun();
    oddsPosition();
    getClientByMarketId();
    getMatchDataByMarketIdWise();
  }, [marketId, currentPage]);
  let pageSize = 50
  useEffect(() => {
    if (sportsBetsList && sportsBetsList.data && sportsBetsList.data.oddsBetData) {
      const filteredData = sportsBetsList.data.oddsBetData.map((item, index) => {
        let profit = 0;
        let loss = 0;
        item.type = item.type == "L" ? "L" : "K"
        if (item.profit) {
          profit = Number.parseFloat(Math.abs(item.profit)).toFixed(2);
        }
        if (item.loss) {
          loss = Number.parseFloat(Math.abs(item.loss)).toFixed(2);
        }
        if (item.type === "L") {
          profit = item.positionInfo[item.selectionId];
          loss = -1 * item.amount;
        } else if (item.type === "K" || item.type === "k") {
          profit = item.amount;
          loss = -1 * (item.amount * item.odds);
        }
        return {
          key: `${index}`,
          odds: item.odds,
          amount: item.amount,
          type: item.type === "N" ? "NO" :
            item.type === "L" ? "Lagai" :
              item.type === "K" || item.type === "k" ? "Khai" :
                "",
          loss: Number.parseFloat(Math.abs(loss)).toFixed(2),
          profit: Number.parseFloat(Math.abs(profit)).toFixed(2),
          clientCode: item.userInfo.clientCode,
          teamName: item.teamName,
          clientName: item.userInfo.clientName,
          creatorName: item.userInfo.creatorName,
          createdAt: item.createdAt,
          oddsType: item.oddsType,
          wonTeamName: item.wonTeamName ? item.wonTeamName : 'N/A'
        };
      });
      setUserLists(filteredData);
    }
    if (clientListByMarketId) {
      setClientList(clientListByMarketId);
    }
  }, [sportsBetsList, clientListByMarketId]);
  const getSportsBetsListFun = async () => {
    let reqData = {
      "marketId": marketId,
      "oddsBet": true,
      "isDeleted": 0,
      "downlineUserType": "client",
      "pageNo": currentPage,
      "size": pageSize,
    }
    dispatch(getSportsBetsList(reqData))
  }

  useEffect(() => {
    if (userSearchList) {
      setFilteredOptions(userSearchList);
    }
  }, [userSearchList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const oddsPosition = async () => {
    let reqData = {
      "marketId": marketId
    }
    let response = await httpPost("sports/getOddsPosition", reqData);
    if (response) {
      const convertKeyObject = (objectData, objectKey) => {
        return objectData.reduce((acc, data) => {
          acc[data[objectKey]] = data;
          return acc;
        }, {});
      };
      const finalPos = convertKeyObject(response.data, "_id");
      setOddsPositionData(response.data);
    }
  }

  const getClientByMarketId = async () => {
    let reqData = {
      "marketId": marketId,
      'isMatchBet': true
    }
    dispatch(getClientListByMarketId(reqData))
  }

  const getMatchDataByMarketIdWise = async () => {
    let reqData = {
      "marketId": marketId
    }
    let matchDetails = await httpPost("sports/sportByMarketId", reqData);
    if (matchDetails) {

      if (matchDetails?.data?.teamData) {
        const parsedData2 = JSON.parse(matchDetails.data.teamData);
        setTeamDataList(parsedData2)
      }
    }
  }

  const getOddsPositionByUserId = async (data) => {
    let reqData = {
      "marketId": marketId,
      "userId": data,
      "userType": "client"
    }
    let response = await httpPost("sports/getOddsPosition", reqData);
    if (response) {
      const convertKeyObject = (objectData, objectKey) => {
        return objectData.reduce((acc, data) => {
          acc[data[objectKey]] = data;
          return acc;
        }, {});
      };
      const finalPos = convertKeyObject(response.data, "_id");
      setOddsPositionData(response.data);
    }
  }

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };
  const columns = [
    {
      title: "username",
      dataIndex: "clientName",
      render: (value, row) => `${row.clientName} (${row.clientCode})`,
    },
    {
      title: "Runner name",
      dataIndex: "teamName",
      render: renderContent,
    },
    {
      title: "Bet Type",
      dataIndex: "type",
      render: (value) => (
        <span className={`${value === "Lagai" ? "ant-tag gx-rounded-xs ant-tag-blue" : "ant-tag gx-rounded-xs ant-tag-red"}`}>
          {value === "Lagai" ? "Lagai" : "Khai"}
        </span>
      ),
    },

    {
      title: "Bet price",
      dataIndex: "odds",
      render: (value) => (
        Number.parseFloat(Math.abs(value) * 100).toFixed(2)
      ),
    },
    {
      title: "Bet Amount",
      dataIndex: "amount",
      render: (value) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },

    // {
    //   title: "Loss",
    //   dataIndex: "loss",
    //   render: (value) => (
    //     Number.parseFloat(Math.abs(value)).toFixed(2)
    //   ),
    // },
    // {
    //   title: "Profit",
    //   dataIndex: "profit",
    //   render: (value) => (
    //     Number.parseFloat(Math.abs(value)).toFixed(2)
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
      render: renderContent,
    },
    {
      title: "Won",
      dataIndex: "wonTeamName",
      render: renderContent,
    },


    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss "),
    },


  ];

  async function onChange(value, option) {

    getOddsPositionByUserId(option.key);

    if (value === null) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('');

    }
    const filteredData = userLists?.filter(item => item.clientCode === value);
    if (filteredData.length < 0) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('')
    }
    setUserListData(filteredData);
    // getOddsPositionByUserId(option.key);
  }
  const onSearch = (value) => {
    // console.log('search:', value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const groupByOddsType = (OddsPositionData) => {
    return OddsPositionData.reduce((acc, item) => {
      (acc[item.oddsType] = acc[item.oddsType] || []).push(item);
      return acc;
    }, {});
  };
  const groupedData = groupByOddsType(OddsPositionData || []);

  async function onChange1(value, option) {
    if (value === null) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('');
    }
    const filteredData = userLists?.filter(item => item.oddsType === value);
    if (filteredData.length < 0) {
      // getOddsPositionByUserId(option.key);
      return setUserListData('')
    }
    setUserListData(filteredData);
    // getOddsPositionByUserId(option.key);
  }


  const uniqueOddsType = userLists && userLists.length > 0
    ? [...new Map(userLists.map(user => [user.oddsType, user])).values()]
    : [];

  return (
    <>

      <Card className="gx-card">
        <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex gx-align-items-center ">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-text-uppercase">{`Match Book`}</span>
          <BackButton />
        </div>
        <Row className="">

          <TeamDataDisplay groupedData={groupedData} />
        </Row>
        <div class="gx-bg-grey gx-border-top"><div class="ant-card-head-wrapper"><div class="ant-card-head-title">Filter Bets</div></div></div>
        <Row gutter={12} className="gx-px-4">
          <Col md={6} xs={24} className="gx-py-sm-3 gx-text-uppercase">
            <div className="">Client<span className="gx-text-red">*</span></div>
            <Select className="gx-bg-flex gx-justify-content-start "
              placeholder="Select a person"
              showSearch
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
            >
              <Option>
                All User
              </Option>
              {showClientList && showClientList.length > 0 ? showClientList?.map(user => (
                <Option
                  key={user.clientId}
                  value={user.userInfo.username}
                  label={`${user?.userInfo?.name} ${user?.userInfo?.username}`}
                >
                  {user.userInfo.username} ({user.userInfo.name})
                </Option>
              )) : null}
            </Select>
          </Col>

          <Col md={6} xs={24} className="gx-py-sm-3  gx-py-1">
            <div className="">OddsType<span className="gx-text-red">*</span></div>
            <Select className="gx-bg-flex gx-justify-content-start gx-text-"
              placeholder="Select a OddsType"
              showSearch
              optionFilterProp="children"
              onChange={onChange1}
            >
              <Option> All OddsType </Option>
              {uniqueOddsType && uniqueOddsType.length > 0 ? uniqueOddsType?.map(user => (
                <Option className="gx-text-"
                  key={user.clientId}
                  value={user.oddsType}
                  label={`${user.oddsType}`}
                >
                  {user.oddsType}
                </Option>
              )) : null}
            </Select>
          </Col>
        </Row>
        <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex gx-align-items-center ">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-text-uppercase">{`Match Bets`}</span>
        </div>
        <Table
          className="gx-table-responsive gx-text-uppercase"
          columns={columns}
          dataSource={userListData ? userListData : userLists}
          bordered
          pagination={false}
          size="small"
        // rowClassName={(row, index) => row.type === 'Lagai' ? 'matchdtailsYesBackground gx-font-weight-bold gx-text-dark displayMatchLagai' : row.type === 'Khai' ? 'matchdtailsNoBackground gx-text-dark gx-font-weight-bold displayMatchKhaai' : ' gx-font-weight-bold gx-bg-dark'}
        />
        <TablePagination currentPage={currentPage} totalItems={sportsBetsList?.data?.totalOddsCount} pageSize={pageSize} onPageChange={handlePageChange} />
      </Card>
    </>
  );
};

export default Basic;