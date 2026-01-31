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
import { httpPost } from "../../../../http/http";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { getClientListByMarketId, getSportsBetsList, getuserSearchReport } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./User";
import TablePagination from "../../../../components/TablePagination";

const Basic = () => {
  const dispatch = useDispatch();
  const [userLists, setUserLists] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedFancy, setSelectedfancy] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [finalUserList, setFinalUserList] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { marketId } = useParams();
  const { sportsBetsList, clientListByMarketId, userSearchList } = useSelector(state => state.UserReducer);

  // const getSessionList = async () => {
  //   let response = await httpGet(`sports/getSessionList?marketId=${marketId}`);
  //   if (response) {
  //     setSessionList(response?.data?.data);
  //   }
  // };

  useEffect(() => {
    if (userSearchList) {
      setFilteredOptions(userSearchList);
    }
  }, [userSearchList]);

  let pageSize = 50

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  const getSessionList = async () => {
    // let response = await httpGet(`sports/getSessionList?marketId=${marketId}`);

    let data = { marketId: marketId }
    let response = await httpPost(`sports/getSessionList`, data);

    if (response) {
      // setSessionList(response?.data?.data);
      const sortedSessions = response?.data.sort((a, b) => {
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
      "isSessionBet": true
    };
    dispatch(getClientListByMarketId(reqData))
  };

  useEffect(() => {
    getSportsBetsListFun();
    getSessionList();
    clientListByMarketIdFun();
  }, [marketId, currentPage]);


  useEffect(() => {
    if (sportsBetsList && sportsBetsList.data && sportsBetsList?.data?.fancyBetData) {
      const filteredData = sportsBetsList?.data?.fancyBetData?.map(
        (item, index) => ({
          key: `${index}`,
          odds: item.odds,
          amount: item.amount,
          type: item.type === "Y" ? "Yes" : item.type === "N" ? "NO" : "",
          run: item.run,
          clientCode: item.userInfo.clientCode,
          sessionName: item.sessionName,
          clientName: item.userInfo.clientName,
          creatorName: item.userInfo.creatorName,
          createdAt: item.createdAt,
          decisionRun: item?.isDeclare === 0 ? "Decision Pending" : item?.decisionRun,
          deletedRemark: item.deletedRemark,
          profitLoss: item.profitLoss
        })
      );
      setUserLists(filteredData);
      calculateTotalProfitLoss(filteredData);
    }
  }, [sportsBetsList]);

  const getSportsBetsListFun = async () => {
    let reqData = {
      marketId: marketId,
      fancyBet: true,
      isDeclare: true,
      isDeleted: 0,
      downlineUserType: "client",
      "pageNo": currentPage,
      "size": pageSize,
    };
    dispatch(getSportsBetsList(reqData))
  }

  const calculateTotalProfitLoss = (filteredData) => {
    let totalProfitLoss = 0;
    filteredData.forEach((data, key) => {
      let profitLoss = 0;

      if (data.decisionRun >= data.run && data.type === "Yes") {
        profitLoss += data.amount * data.odds;
      } else if (data.decisionRun >= data.run && data.type === "NO") {
        profitLoss += -1 * data.amount * data.odds;
      } else if (data.decisionRun < data.run && data.type === "Yes") {
        profitLoss += -1 * data.amount;
      } else if (data.decisionRun < data.run && data.type === "NO") {
        profitLoss += data.amount;
      }

      totalProfitLoss += profitLoss;
      filteredData[key].profitLoss = profitLoss;
    });
    setTotalProfitLoss(totalProfitLoss);
  };



  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };

    return obj;
  };

  const columns = [
    {
      title: "Place Time",
      dataIndex: "createdAt",
      render: (createdAt) =>
        moment(createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
    },
    {
      title: "runner Name",
      dataIndex: "sessionName",
      render: renderContent,
    },
    {
      title: "username",
      dataIndex: "clientName",
      render: (value, row) => `${row.clientName} (${row.clientCode})`,
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
      title: "Price",
      dataIndex: "run",
      render: renderContent,
    },




    {
      title: "Amount",
      dataIndex: "amount",
      render: renderContent,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: renderContent,
    },

    // {
    //   title: 'Rate',
    //   dataIndex: 'odds',
    //   key: 'rate',
    //   render: (text) => <div className="gx-text-nowrap">{Number.parseFloat(text * 100).toFixed(2)}</div>,
    // },


    // {
    //   title: "Result",
    //   dataIndex: "decisionRun",
    //   render: renderContent,
    // },


    // {
    //   title: "Creator",
    //   dataIndex: "creatorName",
    //   render: renderContent,
    // },

    // {
    //   title: "pnl",
    //   dataIndex: "profitLoss",
    //   render: (value) => <span>{Math.abs(value).toFixed(2)}</span>,
    // },
  ];
  const { Option } = Select;

  // const handleChange = (value) => {
  //   setSelectedfancy(value);
  //   setFinalUserList('');
  //   setSelectedUser('')

  // };

  const handleFancyChange = (value) => {
    setSelectedfancy(value);
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
    setSelectedfancy('');
    const reqData = {
      marketId: marketId,
      fancyBet: true,
      isDeleted: false,
      "downlineUserId": value,
      downlineUserType: "client",
    };
    setSelectedUser(value)
    setSelectedfancy('');
    dispatch(getSportsBetsList(reqData));
  };


  // const handleChange2 = (value) => {
  //   setSelectedUser(value);

  // };


  const filterDatafinal = selectedUser
    ? userLists?.filter((item) => {
      return item.sessionName === selectedFancy
    }).filter(ele => {
      return ele.clientCode === selectedUser
    })
    : userLists?.filter((item) => {
      return item.sessionName === selectedFancy;
    });



  //   useEffect(() => {

  //     const uniqueClientCodes = filterDatafinal
  //       ? [...new Set(filterDatafinal?.map((item) => item.clientCode ))]
  //       : null;
  //     setFinalUserList(uniqueClientCodes)
  //   //   const uniqueClientCodes = filterDatafinal
  //   // ? Array.from(
  //   //     new Map(
  //   //       filterDatafinal.map(item => [item.clientCode, { code: item.clientCode, clientName: item.clientName }])
  //   //     ).values()
  //   //   )
  //   // : [];

  // // setFinalUserList(uniqueClientCodes);
  //   }, [selectedFancy])

  useEffect(() => {
    const uniqueClientCodes = filterDatafinal
      ? Array.from(
        filterDatafinal.reduce((map, item) => {
          if (!map.has(item.clientCode)) {
            map.set(item.clientCode, { clientCode: item.clientCode, clientName: item.clientName });
          }
          return map;
        }, new Map()).values()
      )
      : null;

    setFinalUserList(uniqueClientCodes);
  }, [selectedFancy])

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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


  return (
    <>
      <div className="gx-bg-grey gx-px-3 gx-bg-flex gx-align-items-center">
        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-py-3   gx-pt-1 gx-text-uppercase">
          Completed Bets
        </span>
        <BackButton />
      </div>
      <Card className="gx-card gx-w-100 gx-px-2">

        <Row gutter={12} className="gx-px-4 gx-text-uppercase gx-fs-md gx-font-weight-bold">
          <Col xs={24} className="">
            <div className="gx-mb-1">Sessions<span className="gx-text-red">*</span></div>
            <Select
              className="gx-bg-flex gx-justify-content-start "
              placeholder="All Fancies"
              value={selectedFancy}
              onChange={handleFancyChange}
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
                showSearch
                placeholder={` Select User`}
                className="gx-bg-flex gx-justify-content-start "
                optionFilterProp="children"
                onChange={handleUserChange}
                onSearch={onSearch}
                filterOption={filterOption}
              >

                {filteredOptions && filteredOptions.length > 0 ? filteredOptions.map(user => (
                  <Option key={user.userId} value={user.userId} label={`${user?.username} ${user?.name} `}>
                    {user?.username} ({user?.name})
                  </Option>
                )) : null}
              </Select>

              <Button
                className="gx-ml-3"
                type="primary"
                onClick={() => {
                  setSelectedUser('');
                  getSportsBetsListFun();
                }}
              >
                Reset
              </Button>
            </div>
          </Col>


          {/* <Col>
            <div className="gx-bg-flex gx-font-weight-semi-bold gx-pt-2 gx-fs-xl gx-align-items-center gx-justify-content-center gx-pb-2">
              Total P/L:
              <span className={`gx-mx-2 ${totalProfitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                {Number.parseFloat(Math.abs(totalProfitLoss) || 0).toFixed(2)}
              </span>
            </div>
          </Col> */}

        </Row>
        <Row className="gx-px-4 gx-text-uppercase gx-fs-md gx-font-weight-bold">
          <Col xs={24} className="">
            <Table
              className="gx-table-responsive gx-text-uppercase gx-fs-md gx-font-weight-semi-bold"
              columns={columns}
              dataSource={userLists}
              bordered
              pagination={false}
              size="small"
            // rowClassName={(row, index) =>
            //   row.profitLoss > 0 ? "gx-bg-green-0 gx-text-white completedBetsYes" : "gx-bg-red gx-text-white completedBetsNo"
            // }
            />
            <TablePagination currentPage={currentPage} totalItems={sportsBetsList?.data?.totalFancyCount} pageSize={pageSize} onPageChange={handlePageChange} />
          </Col>
        </Row>

      </Card>
    </>
  );
};

export default Basic;
