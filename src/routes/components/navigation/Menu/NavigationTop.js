import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Select,
  Table,
  Tag,
  Row,
  Col,
  Typography
} from "antd";

import moment from "moment";
import { Link } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";
import { getDiamondCasinoReport } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";

const NavigationTop = () => {
  const dispatch = useDispatch();
  const RangePicker = DatePicker.RangePicker;
  const [userLists, setUserLists] = useState([]);
  const [totalClientProfitLoss, setTotalClientProfitLoss] = useState(0);
  const [totalSelfProfitLoss, setTotalSelfProfitLoss] = useState(0);
  const [totalExposer, setTotalExposer] = useState(0);
  const [showDate, setShowDate] = useState({
    startDate: moment(),
    endDate: moment().subtract(7, 'days'),
  });
  const { loading, diamondCasinoReport } = useSelector((state) => state.UserReducer);
  const { Text } = Typography;

  useEffect(() => {
    getDiamondCasinoReportFun();
  }, []);

  useEffect(() => {
    const response = diamondCasinoReport;
    if (response) {
      const filteredData = response?.data?.map((item, index) => ({
        key: `${item._id}-${index}`,
        createdAt: item.createdAt,
        clientProfitLoss: item.clientProfitLoss,
        exposure: item.exposure,
        profitLoss: item.profitLoss,
        _id: item._id,
        gameName: item.gameName,
      }));
      setUserLists(filteredData);

      if (response && response?.data?.length > 0) {
        let selfProfitLossArray =
          response && response.data
            ? response.data.filter((items) => items.profitLoss)
            : [];
        let totalSelfProfitLoss = selfProfitLossArray.reduce(
          (acc, item) => acc + item.profitLoss,
          0
        );

        let clientProfitLossArray =
          response && response.data
            ? response.data.filter((items) => items.clientProfitLoss)
            : [];
        let totalClientProfitLoss = clientProfitLossArray.reduce(
          (acc, item) => acc + item.clientProfitLoss,
          0
        );

        let exposerArray =
          response && response.data
            ? response.data.filter((items) => items.exposure)
            : [];
        let totalExposer = exposerArray.reduce(
          (acc, item) => acc + item.exposure,
          0
        );
        setTotalClientProfitLoss(totalClientProfitLoss);
        setTotalSelfProfitLoss(totalSelfProfitLoss);
        setTotalExposer(totalExposer);
      }
    }
  }, [diamondCasinoReport]);

  const getDiamondCasinoReportFun = async () => {
    let reqData = {
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: 20,
    };
    dispatch(getDiamondCasinoReport(reqData));
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
      title: "Game Id",
      dataIndex: "_id",
      render: renderContent,
    },
    {
      title: "Type",
      dataIndex: "gameName",
      render: renderContent,
    },
    {
      title: "Exposer",
      dataIndex: "exposure",
      render: (exposure) => (
        <span>
          {Number.parseFloat(Math.abs(exposure)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "P/L",
      dataIndex: "profitLoss",
      render: (profitLoss) => (
        <span>
          {Number.parseFloat(Math.abs(profitLoss)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Client P/L",
      dataIndex: "clientProfitLoss",
      render: (value) => (
        <span className={`${value > 0 ? "gx-text-green-0" : "gx-text-red"}`}>
          {Number.parseFloat(Math.abs(value)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => (
        <Link
          to={`/components/navigation/demo/${_id}?`}
          className="link-button"
        >
          <Tag bordered={false} style={{ borderRadius: '0' }} color="#108ee9">Show Bets</Tag>
        </Link>
      ),
    },
  ];



  function onChange(dates, dateStrings) {
    setShowDate({
      startDate: dates[0],
      endDate: dates[1],
    });
  }

  async function getCompleteCasinoList() {
    let reqData = {
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: 20,
    };
    dispatch(getDiamondCasinoReport(reqData));
  }

  async function todayCompleteCasinoList() {
    let reqData = {
      toDate: moment().format('YYYY-MM-DD'),
      fromDate: moment().format('YYYY-MM-DD'),
      pageNo: 1,
      size: 20,
    };
    dispatch(getDiamondCasinoReport(reqData));
  }

  const { Option } = Select;

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card gx-w-100">
          <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex">
            <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-pt-2 gx-text-uppercase">{`Casino Profit Loss`}</span>
            <BackButton />
          </div>
          <Row className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-px-4 gx-py-3">
            {/* <RangePicker

              className=" gx-border-redius0"
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
              defaultValue={[showDate.startDate, showDate.endDate]}
            /> */}
            <Col className="gx-px-2 gx-bg-flex gx-pt-3">
              {/* <Button type="danger" className="gx-border-redius0" onClick={getCompleteCasinoList}>Apply</Button> */}
              <Button type="primary" className="gx-border-redius0" onClick={todayCompleteCasinoList}>Today P/L</Button>
            </Col>
          </Row>

          <div>
            <Table
              className="gx-table-responsive gx-text-uppercase"
              columns={columns}
              dataSource={userLists}
              // dataSource={[{}, ...userLists]}
              bordered
              pagination={false}
              size="small"

            />
          </div>
        </Card>
      }
    </>
  );
};

export default NavigationTop;
