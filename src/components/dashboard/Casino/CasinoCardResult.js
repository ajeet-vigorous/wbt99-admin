import React from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";

const columns = [
  {
    title: 'Player Name',
    dataIndex: 'currency',
  },

  {
    title: 'Rate',
    dataIndex: 'fee',
    render: (text) => {
      return <span className="gx-text-red">{text}</span>
    },
  }
];

const data = [
  {
    key: '1',
    currency: '0.24 BTC',

    fee: '-$2.33'
  },
  {
    key: '2',
    currency: '0.34 RPL',
    fee: '-$1.23'
  },
];

// let Dragon = data && data.t2 && data.t2[0] ? data.t2[0] : {};
//     let Tiger = data && data.t2 && data.t2[1] ? data.t2[1] : {};
//     let Tie = data && data.t2 && data.t2[2] ? data.t2[2] : {};
const CasinoCardResult = ({ eventId }) => {

  return (
    <Widget  >
      <div className="gx-table-responsive">
        <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={true}
          size="small" />
      </div>
    </Widget>
  );
};

export default CasinoCardResult;
