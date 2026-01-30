import React from "react";
import { Table} from "antd";
const Static = () => {
  const columns = [
    {
      title: "Title",
    },
    {
      title: "Sport",
    },

    {
      title: "Open Date",
    },
    {
      title: "Declared",
    },
    {
      title: "Won By",
    },
    {
      title: "Profit/Loss",
    },
  ];
  return (
    <Table
          className="gx-table-responsive gx-w-100 login-table-header"
          columns={columns}
          bordered
          pagination={false}
          size="small"
        />
       
  );
};

export default Static;
