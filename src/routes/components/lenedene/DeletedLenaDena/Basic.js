import React, { useEffect, useState } from "react";
import {  Card, Col, Row, Table } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userLedgerList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";


const Basic = () => {

  const { userType , userId } = useParams();
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
      "downlineUserId": userId,
      "isDeleted": true,
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
        debit: item.amount > 0 ? item.amount : 0,
        credit: item.amount < 0 ? item.amount : 0,
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
      render: (createdAt) => <span className="gx-text-nowrap">{moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Collection Name',
      dataIndex: 'eventName',
      render: (value) => <span className="gx-text-nowrap">{value}</span>,
    },


    {
      title: 'Credit',
      dataIndex: 'credit',
      render: (value) => (
        <span className={`${value > 0 ? 'gx-text-green-0' : ''}`}>
          {value !== 0 ? Number.parseFloat(Math.abs(value)).toFixed(2) : '0.00'}
        </span>
      ),
    },

    {
      title: 'Debit',
      dataIndex: 'debit',
      render: (value) => (
        <span className={`${value < 0 ? 'gx-text-red' : ''}`}>
          {value !== 0 ? Number.parseFloat(Math.abs(value)).toFixed(2) : '0.00'}
        </span>
      ),
    },


    {
      title: 'Balance',
      dataIndex: 'balance',
      // {Number.parseFloat(element && element.balance ? element.balance : 0).toFixed(2)}
      render: (value) => (
        <span className={`${value > 0 ? 'gx-text-green-0' : ''}`}>
          {Number.parseFloat(Math.abs(value)).toFixed(2)}
        </span>
      ),
    },

    {
      title: 'Payment Type',
      dataIndex: 'ledgerType',
      render: renderContent,
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      render: (value) => <span className="gx-text-nowrap">{value}</span>,
    },
    {
        title: 'Done By',
        dataIndex: 'remark1',
        render: renderContent,
      },
  ];

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card gx-w-100">
          <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
            <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`Deleted Lena Dena`}</span>
            <BackButton />

          </div>

            <Table className="gx-table-responsive" columns={columns} dataSource={userLists} bordered pagination={false} size="small" />
        </Card>}
    </>
  );
};

export default Basic;

