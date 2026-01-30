import React, { useEffect, useState } from "react";
import {  Modal, Table } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../../components/loader";


const Exposuremodal = ({ visible, handleClose, data }) => {

  const [userLists, setUserLists] = useState([]);
  const { sportsBetsList, loading } = useSelector(state => state.UserReducer)
  let exposerModal = sportsBetsList && sportsBetsList?.data && sportsBetsList?.data.length > 0 ? sportsBetsList?.data : null
  

  useEffect(() => {
    if (exposerModal ) {
      const filteredData = exposerModal.map((item, index) => ({
        key: `${index}`,
        market: item.market,
        amount: item.amount,
        type: item.type,
        time: item.time,
        rate: item.rate,
        mType: (item.type == 'LAGAI' || item.type == "KHAI") ? "Odds" : "Fancy"
      }));
      setUserLists(filteredData);
    }
  }, [exposerModal]);

  
  if(!sportsBetsList?.data){
    return null;
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
      title: "Match",
      dataIndex: "market",
      render: renderContent,
    },
    {
      title: "Stake",
      dataIndex: "amount",
      render: renderContent
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: renderContent,
    },

    {
      title: "Type",
      dataIndex: "type",
      render: (value, row) => <span className="gx-text-capitalize">{row.type}</span>
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (value, row) => moment(row.time).format("DD-MM-YYYY hh:mm A")
    },
    {
      title: "Market Type",
      dataIndex: "mType",
      render: (value, row) => <span className="gx-text-capitalize">{row.mType}</span>
    },
  ];

  return (
    <Modal
      title={`User Exposure`}
      onCancel={() => handleClose()}
      open={visible}
      className="gx-px-1"
      footer={null}
    >
      {/* {loading ? <Loader props={loading} /> : */}
        <>
          <Table
            className="gx-table-responsive  login-table-header"
            columns={columns}
            dataSource={userLists}
            bordered
            pagination={false}
            size="small"
          />
          <Table
            className="gx-table-responsive  login-table-header"
            columns={columns}

            bordered
            pagination={false}
            size="small"
          />
        </>
      {/* // } */}

    </Modal>

  );
};

export default Exposuremodal;