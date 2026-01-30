import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select, Table } from "antd";
import { useParams } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";
import { getSportsBetsList } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";
import moment from "moment";

const Basic = () => {
  const [userLists, setUserLists] = useState([]);
  const [selectData, setSelectedData] = useState()
  const { marketId } = useParams();
  const dispatch = useDispatch();
  const { sportsBetsList, loading } = useSelector(state => state.UserReducer);

  useEffect(() => {
    getSportsBetsListFun();
  }, [marketId]);

  useEffect(() => {
    if (sportsBetsList && sportsBetsList.data && sportsBetsList?.data?.oddsBetData) {
      console.log(sportsBetsList?.data?.oddsBetData, "sportsBetsList?.data?.oddsBetData");
      
      const filteredData = sportsBetsList?.data?.oddsBetData?.map((item, index) => ({
        key: `${index}`,
        odds: item.odds,
        amount: item.amount,
        type: item.type === "L" ? "Lagai" : item.type === 'K' ? "Khai" : "",
        oddsType: item.oddsType,
        clientCode: item.userInfo.clientCode,
        sessionName: item.sessionName,
        clientName: item.userInfo.clientName,
        creatorName: item.userInfo.creatorName,
        createdAt: moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss A"),
        decisionRun: item.decisionRun ? item.decisionRun : 'Decision Pending',
        deletedRemark: item.deletedRemark,
      }));
      setUserLists(filteredData);
    };

  }, [sportsBetsList]);


  const getSportsBetsListFun = async () => {
    let reqData = {
      "marketId": marketId,
      "oddsBet": true,
      "isDeleted": 1
    }
    dispatch(getSportsBetsList(reqData))
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
      title: "Rate",
      dataIndex: "odds",
      render: renderContent,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: renderContent,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: renderContent,
    },
    {
      title: "Odds Type",
      dataIndex: "oddsType",
      render: renderContent,
    },
    {
      title: "Team",
      dataIndex: "sessionName",
      render: renderContent,
    },
    {
      title: "Client",
      dataIndex: "clientName",
      render: (value, row) => `${row.clientName} (${row.clientCode})`,
    },
    {
      title: "Agent",
      dataIndex: "creatorName",
      render: renderContent,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: renderContent,
    },
    {
      title: "Bet Status",
      dataIndex: "decisionRun",
      render: renderContent,
    },
    {
      title: "remark",
      dataIndex: "deletedRemark",
      render: renderContent,
    },
  ];
  const { Option } = Select;
  const handleChange = (value) => {
    setSelectedData(value);
  };

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
            <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`REJECTED And CANCELLED Bets`}</span>
            <BackButton />
          </div>
          <Row justify="start gx-px-5">
            <Col span={20} className=" gx-pt-2 gx-pb-1 ">
              <div
                className="gx-bg-flex gx-justify-content-start gx-gap-3"
                style={{ gap: "30px" }}
              >
                <Select
                  className="gx-mb-2 "
                  placeholder="All"
                  onChange={handleChange}
                  style={{width: 300}}
                  // getPopupContainer={trigger => trigger.parentElement}
                >
                  <Option value="jack">All</Option>
                  {/* <Option value="lucy">Lucy</Option>
                  <Option value="lucy1">Lucy</Option>
                  <Option value="lucy2">Lucy</Option> */}


                </Select>
              </div>
            </Col>
          </Row>
          <Table
            className="gx-table-responsive"
            columns={columns}
            dataSource={userLists}
            bordered
            pagination={false}
            size="small"
            rowClassName={(row, index) => row.type === 'Yes' ? 'matchdtailsYesBackground' : 'matchdtailsNoBackground'}
          />
        </Card>
      }
    </>


  );
};

export default Basic;
