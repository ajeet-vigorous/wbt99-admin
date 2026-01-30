
import React, { useEffect, useState } from "react";
import { Card, Col, DatePicker, Row, Select, Table } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { userProfitLoss } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";

const Basic = () => {
  // const { userType , userId } = useParams();
  const [matchLedger, setMatchLedger] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [dates, setDates] = useState("");
  const dispatch = useDispatch();

  const { userProfitLossList, loading } = useSelector(
    (state) => state.UserReducer
  );

  // useEffect(() => {
  //   getUserList();
  // }, [dates]);

  useEffect(() => {
    const defaultStartDate = moment().subtract(1, "month").startOf("day");
    const defaultEndDate = moment().endOf("day");
    setDates([defaultStartDate, defaultEndDate]);
  }, []);


  useEffect(() => {

    if (Array.isArray(dates) && dates.length === 2) {
      getUserList();
    }
  }, [dates]);


  const getUserList = async () => {
    if (!dates) {
      return;
    }
    let reqData = {
      // fromDate: dates[0],
      // toDate: dates[1],
      fromDate: moment(dates[0]).format('YYYY-MM-DD'),
      toDate: moment(dates[1]).format('YYYY-MM-DD'),
      profitLossType: "all",
      status: 1
      // "downlineUserId": this.props.match.params.userId,
    };
    dispatch(userProfitLoss(reqData));
  };

  useEffect(() => {
    if (userProfitLossList) {
      const filteredData = userProfitLossList?.map((item, index) => ({
        key: `${index}`,
        createdAt: item.createdAt,
        eventName: item.eventName ? item.eventName : item._id,
        balance: item.userNetProfitLoss,
      }));
      let total = 0;
      userProfitLossList?.forEach((item) => {
        total += item.userNetProfitLoss;
      });
      setTotalProfitLoss(total);
      setMatchLedger(filteredData);
    }
  }, [userProfitLossList]);

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };

    return obj;
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) =>
        <span className="gx-text-nowrap">{moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      render: (value, row) => <span className="gx-text-nowrap">{row?.eventName}</span>,
    },

    {
      title: "Debit",
      dataIndex: "balance",
      render: (value) => (
        <span className={`${value < 0 ? "gx-text-red" : ""}`}>
          {value <= 0
            ? Number.parseFloat(value ? Math.abs(value) : 0).toFixed(2)
            : 0}
        </span>
      ),
    },

    {
      title: "Credit",
      dataIndex: "balance",
      render: (value) => (
        <span className={`${value > 0 ? "gx-text-green-0" : ""}`}>
          {value >= 0
            ? Number.parseFloat(value ? Math.abs(value) : 0).toFixed(2)
            : 0}
        </span>
      ),
    },
  ];

  const RangePicker = DatePicker.RangePicker;
  const onChange = (dateStrings) => {
    try {
      setDates(dateStrings);
    } catch (error) {
      console.error('Error in onChange:', error);
    }
  };

  function handleChange(value) { }
  const { Option } = Select;

  return (
    <>
      {loading ? (
        <Loader props={loading} />
      ) : (
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex gx-align-items-center">
            <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-text-uppercase">
              Match Profit Loss
            </span>
            <BackButton />
          </div>
          <Row
            className=" gx-px-1 gx-py-1 gx-gap-3"
          >
            {/* <Col>
              <RangePicker
                className="gx-mb-2 gx-border-redius0  "
                style={{
                  width: 300
                }}
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
                value={dates}

              />
            </Col>
            <Col>
              <Select
                className="gx-mb-2 "
                defaultValue="All"
                // getPopupContainer={trigger => trigger.parentElement}
                onChange={handleChange}
                style={{
                  width: 300
                }}
              >
                <Option value="all">All</Option>
                <Option value="all">Sport</Option>
                <Option value="all">Int Casino</Option>
                <Option value="all">Diamond Casino</Option>
              </Select>
            </Col>{" "} */}
            <Col xs={24}>
              <div className=" gx-bg-flex gx-fs-xl gx-px-5 gx-align-items-center gx-justify-content-end gx-py-4">
                Total:
                <span
                  className={`gx-mx-2 gx-fs-sm ${totalProfitLoss >= 0 ? "gx-text-green-0" : "gx-text-red"
                    }`}
                >
                  {" "}
                  {Number.parseFloat(
                    totalProfitLoss ? Math.abs(totalProfitLoss) : 0
                  ).toFixed(2)}
                </span>
              </div>
            </Col>
          </Row>
          <div>
            <Table
              className="gx-table-responsive gx-text-uppercase"
              columns={columns}
              dataSource={matchLedger}
              bordered
              pagination={false}
              size="small"
              rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default Basic;