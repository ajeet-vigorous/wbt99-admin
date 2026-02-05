import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, Table, DatePicker, Select, Input, Row, Col } from "antd";
import BackButton from "../../Hoc/BackButton";


const Basic = () => {



  const columns = [
    {
      title: "#",
      dataIndex: "kk",
      key: "kk",

    },
    {
      title: "Date",
      dataIndex: "matchDate",
      key: "matchDate",
    },


    {
      title: "Name",
      dataIndex: "matchName",
      key: "matchName",
    },


    {
      title: "Winner",
      dataIndex: "wonTeamName",
      key: "wonTeamName",
    },

    {
      title: "Comm+",
      dataIndex: "commissionPlus",
      key: "commissionPlus",
     
    },

    {
      title: "Comm-",
      dataIndex: "commissionMinus",
      key: "commissionMinus",
     
    },


    {
      title: "P/L",
      dataIndex: "totalProfit",
      key: "x",
     
    },
  ];





  return (
    <>
      {/* {loading ? <Loader props={loading} /> : */}
      <Card className="gx-card gx-w-100 ">
        <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex gx-align-items-center">
          <span className="gx-fs-lg gx-font-weight-normal gx-text-white   gx-text-uppercase">{`Completed Matka Detail`}</span>
          <BackButton />
        </div>



        <div className="gx-py-5 gx-px-2">
          <div className="gx-mb-3 gx-p-4 gx-bg-light-grey gx-rounded-sm">
            <div className="gx-bg-flex gx-flex-md-row gx-flex-column">
              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    Commission+
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-green-0 gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>

              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    Commission-
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-red gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>
              <div className="gx-px-2"
              >
                <div>
                  <div className="gx-fs-md gx-text-uppercase">
                    P/L
                  </div>
                  <div className="gx-fs-xxl gx-mt-1 gx-font-weight-bold gx-text-green-0 gx-text-uppercase">
                    0.00
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Table
            className="gx-table-responsive gx-text-uppercase gx-font-weight-bold"
            columns={columns}
            dataSource={[]}
            bordered
            pagination={false}
            size="small"
            rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
          />
        </div>
        </Card>
      {/* } */}
    </>
  );
};

export default Basic;
