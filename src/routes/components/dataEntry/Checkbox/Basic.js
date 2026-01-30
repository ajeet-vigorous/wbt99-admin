import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
// import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userLedgerList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";


const Basic = () => {

  // const { userType , userId } = useParams();
  const [userLists, setUserLists] = useState([]);
  const [calAmount, setCalAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState({});
  const [debitAmount, setDebitAmount] = useState({});



  const dispatch = useDispatch()
  const { userLedgerListData, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = async () => {
    let reqData = {
      // "downlineUserId": 'userId',
    }
    dispatch(userLedgerList(reqData));
  }

  useEffect(() => {
    if (userLedgerListData) {
      const { calAmount, creditAmount, debitAmount, ledgerData } = userLedgerListData;
      const filteredData = ledgerData?.map((item, index) => ({
        key: `${item.userId}-${index}`,
        createdAt: item.createdAt,
        eventName: item.eventName,
        balance: item.balance,
        debit: item.amount,
        credit: item.amount,
        ledgerType: item.ledgerType,
        remark: item.remark,
      }));
      setUserLists(filteredData);
      setCalAmount(calAmount);
      setCreditAmount(creditAmount);
      setDebitAmount(debitAmount);

    }

  }, [userLedgerListData?.ledgerData]);


  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };

    return obj;
  };

  const columns = [


    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (createdAt) => <span className="gx-text-nowrap">{moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss")}</span>,
    },
    {
      title: 'DR',
      dataIndex: 'debit',
      render: (value) => (
        <span className={`gx-text-danger ${value < 0 ? '' : ''}`}>
          {value < 0 ? Number.parseFloat(Math.abs(value)).toFixed(2) : '0.00'}
        </span>
      ),
    },

    {
      title: 'CR',
      dataIndex: 'credit',
      render: (value) => (
        <span className={`gx-text-green-0 ${value > 0 ? '' : ''}`}>
          {value >= 0 ? Number.parseFloat(Math.abs(value)).toFixed(2) : '0.00'}
        </span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      // {Number.parseFloat(element && element.balance ? element.balance : 0).toFixed(2)}
      render: (value) => (
        <span className={`gx-text-nowrap ${value > 0 ? '' : ''}`}>
          {Number.parseFloat(value).toFixed(2)}
        </span>
      ),
    },

    {
      title: 'Payment Type',
      dataIndex: 'eventName',
      // render: renderContent,
      render: (value, row) => <span className="gx-text-nowrap">{row.eventName}</span>,
    },


    {
      title: 'Type',
      dataIndex: 'ledgerType',
      render: renderContent,
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      render: (value, row) => <span className="gx-text-nowrap">{row?.remark}</span>,
    },
  ];

  return (
    <>
      {/* {loading ? <Loader props={loading} /> : */}
      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-3 gx-py-3 gx-bg-flex">
          <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-text-uppercase">{`My Ledger`}</span>
          <BackButton />

        </div>
        <Row justify={"center"}>

          <Col xl={8} sm={8} md={8} xs={22} className="gx-pt-2">
            <div>Lena </div>
            <div className="gx-py-2 gx-text-green-0 gx-fs-xxxl"><ArrowUpOutlined className="gx-mr-0 gx-fs-xxxl" />{Number.parseFloat(debitAmount ? Math.abs(debitAmount) : "0").toFixed(2)}</div>
          </Col>
          <Col xl={8} sm={8} md={8} xs={22} className="gx-pt-2">
            <div>Dena </div>
            <div className="gx-py-2 gx-text-red gx-fs-xxxl "> <ArrowDownOutlined className="gx-mr-0 gx-fs-xxxl" />{Number.parseFloat(creditAmount ? Math.abs(creditAmount) : "0").toFixed(2)}</div>
          </Col>
          <Col xl={8} sm={8} md={8} xs={22} className="gx-pt-2">
            <div>Balance</div>
            <div className={`gx-py-2  ${calAmount > 0 ? "gx-text-red" : "gx-text-green-0"} gx-fs-xxxl`}>{calAmount > 0 ? ` ${Number.parseFloat(Math.abs(calAmount).toFixed(2))} Dena` : ` ${Number.parseFloat(Math.abs(calAmount)).toFixed(2)} Lena`}</div>
          </Col>

        </Row>
        <div>
          <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={userLists} bordered pagination={false} size="small" rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''} />

        </div>
      </Card>
      {/* // } */}
    </>
  );
};

export default Basic;

