import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Table,
} from "antd";
import { useParams } from "react-router-dom";
import { httpGet, httpPost } from "../../../../http/http";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { getClientListByMarketId, getSportsBetsList, getuserSearchReport } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "../../../../components/TablePagination";

const Basic = () => {
  const [selectedFancy, setSelectedFancy] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [userLists, setUserLists] = useState([]);
  const [filteredUserLists, setFilteredUserLists] = useState([]);
  const dispatch = useDispatch();
  const [sessionList, setSessionList] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const { marketId } = useParams();
  const { sportsBetsList, clientListByMarketId, userSearchList } = useSelector(state => state.UserReducer);

  const pageSize = 50;
  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const getSessionList = async () => {
    // let response = await httpGet(`sports/getSessionList?marketId=${marketId}`);

    let data = { marketId: marketId }
    let response = await httpPost(`sports/getSessionList`, data);

    if (response) {
      // setSessionList(response?.data?.data);

      const sortedSessions = response?.data?.sort((a, b) => {
        // Helper functions
        const getInitialChar = (str) => str.trim().charAt(0);
        const startsWithDigit = (str) => /^\d/.test(str);
        const includesOver = (str) => /OVER/.test(str);
        const getNumericPart = (str) =>
          parseInt(str.match(/^\d+/)?.[0] || "0", 10);
        const containsFirst = (str) =>
          /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

        // Extract session names
        // const nameA = a.sessionNames;
        // const nameB = b.sessionNames;
        const nameA = a.sessionNames[0] ? a.sessionNames[0] : a.sessionNames;
        const nameB = b.sessionNames[0] ? b.sessionNames[0] : b.sessionNames;

        // Check properties of the session names
        const isDigitA = startsWithDigit(nameA);
        const isDigitB = startsWithDigit(nameB);
        const includesOverA = includesOver(nameA);
        const includesOverB = includesOver(nameB);
        const containsFirstA = containsFirst(nameA);
        const containsFirstB = containsFirst(nameB);

        // Handle cases where either session contains "1ST" or "FIRST"
        if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
        if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

        // First priority: Digits with "OVER" come before digits without "OVER"
        if (isDigitA && isDigitB) {
          if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
          if (!includesOverA && includesOverB) return 1; // "OVER" comes after non-"OVER"

          // If both have or don't have "OVER", sort numerically
          const numA = getNumericPart(nameA);
          const numB = getNumericPart(nameB);
          return numA - numB;
        }

        // Second priority: Digits come before letters
        if (isDigitA && !isDigitB) return -1; // Digits come before letters
        if (!isDigitA && isDigitB) return 1; // Letters come after digits

        // Third priority: Sort alphabetically for letters
        return nameA.localeCompare(nameB);
      });
      setSessionList(sortedSessions);
    }
  };

  const clientListByMarketIdFun = async () => {
    let reqData = {
      marketId: marketId,
      'isSessionBet': true
    };
    dispatch(getClientListByMarketId(reqData))
  };
  useEffect(() => {
    getSportsBetsListFun();
    getSessionList();
    clientListByMarketIdFun();
  }, [marketId, currentPage]);


  useEffect(() => {
    if (sportsBetsList && sportsBetsList.data && sportsBetsList.data.fancyBetData) {
      const filteredData = sportsBetsList.data.fancyBetData.map((item, index) => ({
        key: `${index}`,
        odds: item.odds,
        amount: item.amount,
        type: item.type === "Y" ? "Yes" : item.type === "N" ? "No" : "",
        run: item.run,
        clientCode: item.userInfo.clientCode,
        sessionName: item.sessionName,
        clientName: item.userInfo.clientName,
        creatorName: item.userInfo.creatorName,
        // createdAt: item.createdAt,
        createdAt: moment(item?.createdAt).format('DD-MM-YYYY hh:mm:ss'),
        decisionRun: item?.isDeclare === 0 ? "Pending" : item?.decisionRun,
        deletedRemark: item.deletedRemark,
        profit: item.profit,
        loss: item.loss,
        clientId: item.clientId
      }));
      setUserLists(filteredData);
    }
  }, [sportsBetsList]);

  // useEffect(() => {
  //   // Apply filtering based on selected values
  //   let filteredData = userLists;
  //   if (selectedFancy) {
  //     filteredData = filteredData.filter(item => item.sessionName === selectedFancy);
  //   }
  //   setFilteredUserLists(filteredData);
  // }, [selectedFancy, selectedUser, userLists]);

  const getSportsBetsListFun = async () => {
    const reqData = {
      marketId: marketId,
      fancyBet: true,
      isDeleted: false,
      downlineUserType: "client",
      "pageNo": currentPage,
      "size": pageSize,
    };
    dispatch(getSportsBetsList(reqData));
  };

  const handleFancyChange = (value) => {
    setSelectedFancy(value);
    const reqData = {
      marketId: marketId,
      fancyBet: true,
      isDeleted: false,
      "downlineUserId": selectedUser,
      selectionId: value,
      downlineUserType: "client",
    }
    dispatch(getSportsBetsList(reqData));
  };

  const handleUserChange = (value) => {
    setSelectedFancy('');
    const reqData = {
      marketId: marketId,
      fancyBet: true,
      isDeleted: false,
      "downlineUserId": value,
      downlineUserType: "client",
    };
    setSelectedUser(value)
    setSelectedFancy('');
    dispatch(getSportsBetsList(reqData));
  };



  const columns = [
    {
      title: 'username',
      dataIndex: 'clientName',
      key: 'client',
      render: (text, record) => (
        <div className="gx-text-nowrap">
          {text} ({record.clientCode})
        </div>
      ),
    },
    {
      title: 'Runner name',
      dataIndex: 'sessionName',
      key: 'team',
      render: (text) => <div >{text}</div>,
    },
    {
      title: "Bet Type",
      dataIndex: "type",
      render: (value) => (
        <span className={`${value === "Yes" ? "ant-tag gx-rounded-xs ant-tag-blue" : "ant-tag gx-rounded-xs ant-tag-red"}`}>
          {value === "Yes" ? "Yes" : "Not"}
        </span>
      ),
    },
    {
      title: 'Bet price',
      dataIndex: 'run',
      key: 'run',

      render: (text) => <div className="gx-text-nowrap">{Number.parseFloat(text)}</div>,
    },

    {
      title: 'Bet Amount',
      dataIndex: 'amount',
      key: 'amount',
    },


    // {
    //   title: 'Loss',
    //   dataIndex: 'profit',
    //   key: 'profit',
    //   render: (text) => <div className="gx-text-nowrap">{Math.abs(text)}</div>,
    // },
    // {
    //   title: 'Profit',
    //   dataIndex: 'loss',
    //   key: 'loss',
    //   render: (text) => <div className="gx-text-nowrap">{Math.abs(text)}</div>,
    // },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      // render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Winner',
      dataIndex: 'decisionRun',
      key: 'decisionRun',
      // render: (text) => new Date(text).toLocaleDateString(),
    },

    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      // render: (text) => new Date(text).toLocaleDateString(),
    },
  ];


  useEffect(() => {
    if (userSearchList) {
      setFilteredOptions(userSearchList);
    }
  }, [userSearchList]);

  const onSearch = (value) => {

    // setSelectedClient(value);
    const redData = {
      // userType: usertype,
      searchValue: value,
      cashTransaction: true
    };
    if (value.length > 2) {
      dispatch(getuserSearchReport(redData));

    }

    // console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



  const { Option } = Select;

  return (
    <Card className="gx-card gx-w-100">
      <div className="gx-bg-grey gx-px-5 gx-bg-flex gx-align-items-center">
        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-py-3   gx-pt-1 gx-text-uppercase">
          Filter Bets
        </span>
        <BackButton />
      </div>
      <Row gutter={12} className="gx-px-4 gx-text-uppercase gx-fs-md gx-font-weight-bold">
        <Col xs={24} className="">
          <div className="gx-mb-1">Sessions<span className="gx-text-red">*</span></div>
          <Select
            className="gx-bg-flex gx-justify-content-start "
            placeholder="All Fancies"
            value={selectedFancy}
            onChange={handleFancyChange}
          // getPopupContainer={trigger => trigger.parentElement}
          >
            <Option value="">All Fancies</Option>
            {sessionList?.map((item, index) =>
              item.sessionNames?.map((session, sessionIndex) => (
                <Option key={`${index}-${sessionIndex}`} value={item.selectionId}>
                  {session}
                </Option>
              ))
            )}
          </Select>
        </Col>
        <Col md={8} xs={24} className="gx-py-sm-3 gx-text-uppercase">
          <div className="gx-mb-2">Client<span className="gx-text-red">*</span></div>
          <div className="gx-d-flex gx-align-items-center">
            <Select
              className="gx-flex-1"
              showSearch
              placeholder="Select User"
              optionFilterProp="children"
              onChange={handleUserChange}
              onSearch={onSearch}
              filterOption={filterOption}
              value={selectedUser}
            >
              {filteredOptions?.map(user => (
                <Option
                  key={user.userId}
                  value={user.userId}
                  label={`${user?.username} ${user?.name}`}
                >
                  {user?.username} ({user?.name})
                </Option>
              ))}
            </Select>

            <Button
              className="gx-ml-3"
              type="primary"
              onClick={() => {
                setSelectedUser('');
                setSelectedFancy('');
                getSportsBetsListFun();
              }}
            >
              Reset
            </Button>
          </div>
        </Col>



      </Row>







      <Row gutter={12} className="gx-px-2">
        <Col xs={24}>      <Table
          className="gx-table-responsive gx-text-uppercase"
          columns={columns}
          dataSource={userLists}
          bordered
          pagination={false}
          size="small"
        // rowClassName={(row) =>
        //   row.type === "Yes" ? "matchdtailsYesBackground gx-text-black completedBetsYes" : "matchdtailsNoBackground gx-text-black completedBetsNo"
        // }
        />

          <TablePagination currentPage={currentPage} totalItems={sportsBetsList?.data?.totalFancyCount} pageSize={pageSize} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </Card>
  );
};

export default Basic;
