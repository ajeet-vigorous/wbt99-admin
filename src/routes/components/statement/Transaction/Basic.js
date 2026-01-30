import React, { useEffect, useState } from "react";
import { Card, DatePicker, Table, Radio, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatement } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import TablePagination from "../../../../components/TablePagination";

const Basic = () => {
  const [dateRange, setDateRange] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);

  const [userLists, setUserLists] = useState([]);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState(1);
  const [totalSize, setTotalSize] = useState('')
  const [paginationicon, setPaginationIcon] = useState(true)
  const [displayedData, setDisplayedData] = useState([]);
  const [dates, setDates] = useState("");
  const pageSize = 50
  const dispatch = useDispatch();
  const { userStatement, loading, balanceAmount, message } = useSelector(state => state.UserReducer)
  const { userStatementMessage } = useSelector(state => state.UserReducer);

  useEffect(() => {
    getUserStatementFun()
  }, [dispatch, currentPage, userId]);

  useEffect(() => {
    setDisplayedData([]);
    filterData();
  }, [userLists, activeTab]);


  useEffect(() => {
    if (userStatement?.statementData) {
      let balance = Number(userStatement.balanceAmount);
      const reversedData = [...userStatement.statementData].reverse();
      const filteredData = reversedData.map((item, index) => {
        balance += Number(item.amount);
        return {
          key: `${index}`,
          createdAt: item.createdAt,
          remark: item.remark,
          amount: item.amount,
          newAmount: balance,
          statementFor: item.statementFor,
          updatedAt: item.updatedAt,
        };
      });
      const finalData = filteredData.reverse();
      setUserLists(finalData);
      setTotalSize(userStatement?.totalCount);
      setPaginationIcon(true);
    } else if (userStatementMessage) {
      let balance = Number(userStatementMessage.message);
      let balanceReset = false;
      const reversedData = [...userStatementMessage?.data].reverse();
      const filteredData = reversedData.map((item, index) => {
        if (item.statementFor === "ACCOUNT_STATEMENT" && !balanceReset) {
          balance = 0;
          balanceReset = true; // Set the flag to true after first reset
        }
        balance += Number(item.amount);
        return {
          key: `${index}`,
          createdAt: item.createdAt,
          remark: item.remark,
          amount: item.amount,
          newAmount: balance,
          statementFor: item.statementFor,
          updatedAt: item.updatedAt,
        };
      });
      const finalData = filteredData.reverse();
      setUserLists(finalData);
      setPaginationIcon(false);
    }
  }, [userStatement, userStatementMessage]); // Ensure dependencies are correct

  const getUserStatementFun = async () => {
    let reqData = {
      userId: userId,
      // toDate: moment().format("YYYY-MM-DD"),
      // fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
      pageNo: currentPage,
      size: pageSize
    };
    if (activeTab == 3) {
      reqData.statementFor = 'ACCOUNT_STATEMENT';
    }
    if (activeTab == 2) {
      reqData.statementFor = 'profitLoss';
    }
    dispatch(getUserStatement(reqData))
  }

  const filterData = () => {
    const data = userLists?.filter((item) => {
      if (activeTab === 1) return item.statementFor !== "All";
      if (activeTab === 2) return item.statementFor !== "ACCOUNT_STATEMENT";
      if (activeTab === 3) return item.statementFor === "ACCOUNT_STATEMENT";
      return true;
    });
    return setDisplayedData(data)
  };


  const handleTabClick = (tabIndex) => {

    setActiveTab(tabIndex);
    setCurrentPage(1);

    if (tabIndex === 1) {
      let reqData = {
        userId: userId,
        // toDate: moment().format("YYYY-MM-DD"),
        // fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
        pageNo: currentPage,
        size: pageSize,
        // statementFor: 'ACCOUNT_STATEMENT'
      };
      dispatch(getUserStatement(reqData))
    }
    if (tabIndex === 3) {
      let reqData = {
        userId: userId,
        // toDate: moment().format("YYYY-MM-DD"),
        // fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
        // pageNo: currentPage,
        // size: pageSize,
        statementFor: 'ACCOUNT_STATEMENT'
      };
      dispatch(getUserStatement(reqData))
    }
    if (tabIndex === 2) {
      let reqData = {
        userId: userId,
        // toDate: moment().format("YYYY-MM-DD"),
        // fromDate: moment().subtract(60, "days").format("YYYY-MM-DD"),
        pageNo: currentPage,
        size: pageSize,
        statementFor: 'profitLoss'
      };
      dispatch(getUserStatement(reqData))
    }
    return setDisplayedData([]);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => <span className="gx-text-nowrap gx-px-2"> {moment(createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A")}</span>,
    },
    {
      title: "Description",
      dataIndex: "remark",
      render: (value, row) => {
        // Compare the created and updated time
        const createdAtFormatted = moment(row.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A");
        const updatedAtFormatted = moment(row.updatedAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A");

        return createdAtFormatted !== updatedAtFormatted ? (
          <span className="gx-px-2">{` ${row.remark}`} - ({`Updated Time: ${updatedAtFormatted}`})</span>
        ) : (
          <span className="gx-px-2">{` ${row.remark}`}</span>
        );
      },
    },
    {
      title: "CR",
      dataIndex: "amount",
      render: (value) => (
        <span className={` ${value >= 0 ? 'gx-text-green-0 ' : ''}`}>
          {value >= 0
            ? Number.parseFloat(value ? Math.abs(value.toFixed(2)) : 0.00)
            : 0.00}
        </span>
      ),
    },
    {
      title: "DR",
      dataIndex: "amount",
      render: (value) => (
        <span className={`  ${value <= 0 ? 'gx-text-red ' : ''}`}>
          {value <= 0
            ? Number.parseFloat(value ? Math.abs(value.toFixed(2)) : 0.00)
            : 0.00}
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "newAmount",
      render: (value) => (
        <span className={` ${value > 0 ? 'gx-text-black' : ''}`}>
          {value > 0
            ? Number.parseFloat(value ? value.toFixed(2) : 0)
            : value.toFixed(2)}
        </span>
      ),
    },
  ];

  const RangePicker = DatePicker.RangePicker;

  function onChange(dates, dateStrings) {


    setDates(dates);

    let reqData = {
      userId: userId,
      toDate: dates[1].format("YYYY-MM-DD"),
      fromDate: dates[0].format("YYYY-MM-DD"),
    };
    if (activeTab == 3) {
      reqData.statementFor = 'ACCOUNT_STATEMENT';
    }
    if (activeTab == 2) {
      reqData.statementFor = 'profitLoss';
    }
    dispatch(getUserStatement(reqData))
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-3 gx-py-3 gx-bg-flex">
            <span className="gx-fs-lf gx-text-nowrap gx-font-weight-bold gx-text-white gx-align-items-center  gx-text-uppercase ">

              Statement
            </span>
            <BackButton />
          </div>

          {/* <RangePicker
            className="gx-border-redius0 gx-pb-2"
            ranges={{
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
            }}
            onChange={onChange}
            value={dates}
          /> */}
          <Row className=" gx-bg-flex  gx-align-items-center gx-w-100 gx-py-3 "
          >
            {/* <Col className="gx-mt-3 gx-py-md-0 gx-py-2 gx-px-4" sm={8} xs={24}>
              <RangePicker
                className="gx-border-redius0 gx-ml-2 gx-w-100"
                ranges={{
                  Today: [moment(), moment()],
                  Yesterday: [
                    moment().subtract(1, "days"),
                    moment().subtract(1, "days"),
                  ],
                  "This Week": [
                    moment().startOf("week"),
                    moment().endOf("week"),
                  ],
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
                }}
                onChange={onChange}
                style={{ width: 300 }}
                value={dates}
              />
            </Col> */}
            <Col
              className=" gx-mb-2 gx-text-white gx-fs-md  gx-py-md-0 gx-py-2 gx-bg-flex gx-align-items-center gx-justify-content-end "
              xs={24}
            >
              <div className="gx-bg-flex gx-justify-content-center gx-flex-nowrap gx-px-1 " style={{ gap: "6px" }}>
                <div onClick={() => handleTabClick(1)} className={` gx-px-2 gx-border gx-rounded-xs gx-py-2 ${activeTab === 1 ? "gx-bg-primary" : " gx-text-black"
                  }`}>
                  All
                </div>
                <div onClick={() => handleTabClick(2)} className={` gx-px-2 gx-border gx-rounded-xs gx-py-2 ${activeTab === 2 ? "gx-bg-primary" : " gx-text-black"
                  }`}>
                  P&L
                </div>
                <div onClick={() => handleTabClick(3)} className={` gx-px-2 gx-border gx-rounded-xs gx-py-2 ${activeTab === 3 ? "gx-bg-primary" : " gx-text-black"
                  }`}>
                  Limit
                </div>
              </div>
            </Col>
          </Row>

          <Table
            className="gx-table-responsive gx-text-uppercase"
            columns={columns}
            dataSource={displayedData}
            bordered
            pagination={false}
            size="small"
            rowClassName={(row, index) => {
              const createdAtFormatted = moment(row?.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A");
              const updatedAtFormatted = moment(row.updatedAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A");
              if (createdAtFormatted != updatedAtFormatted) {
                return 'gx-bg-yellow';
              } else {
                return 'gx-bg-light-grey';
              }
            }}
          />
          {paginationicon && <TablePagination currentPage={currentPage} totalItems={totalSize} pageSize={pageSize} onPageChange={handlePageChange} />}
        </Card>
      }
    </>
  );
};

export default Basic;