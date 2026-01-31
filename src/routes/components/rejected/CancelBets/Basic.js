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
    if (sportsBetsList && sportsBetsList.data && sportsBetsList?.data?.fancyBetData) {
      const filteredData = sportsBetsList?.data?.fancyBetData?.map((item, index) => ({
        key: `${index}`,
        odds: item.odds,
        amount: item.amount,
        type: item.type === "Y" ? "Yes" : item.type === 'N' ? "NO" : "",
        run: item.run,
        clientCode: item.userInfo.clientCode,
        sessionName: item.sessionName,
        clientName: item.userInfo.clientName,
        creatorName: item.userInfo.creatorName,
        createdAt: moment(item?.createdAt).format("YYYY-MM-DD HH:mm:ss A"),
        decisionRun: item.decisionRun ? item.decisionRun : 'Decision Pending',
        deletedRemark: item.deletedRemark,
      }));
      setUserLists(filteredData);
    };

  }, [sportsBetsList]);


  const getSportsBetsListFun = async () => {
    let reqData = {
      "marketId": marketId,
      "fancyBet": true,
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
      title: "Run",
      dataIndex: "run",
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
          <div className="gx-bg-grey gx-px-3 gx-bg-flex gx-align-items-center">
            <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-py-3   gx-pt-1 gx-text-uppercase">
              Rejected Bets
            </span>
            <BackButton />
          </div>
          <Row gutter={12} className="gx-px-1 gx-text-uppercase gx-fs-md gx-font-weight-bold">


            <Col md={8} xs={24} className="gx-mb-1 gx-text-uppercase">
              <div className="gx-mb-2">Client<span className="gx-text-red">*</span></div>

              <Select
                className="gx-mb-2 gx-bg-flex"
                placeholder="All"
                onChange={handleChange}
              // getPopupContainer={trigger => trigger.parentElement}
              >
                <Option value="jack">All</Option>
                {/* <Option value="lucy">Lucy</Option>
                  <Option value="lucy1">Lucy</Option>
                  <Option value="lucy2">Lucy</Option> */}


              </Select>
            </Col>

          </Row>

          <Table
            className="gx-table-responsive gx-border-2 gx-text-uppercase gx-fs-sm gx-font-weight-bold"
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
