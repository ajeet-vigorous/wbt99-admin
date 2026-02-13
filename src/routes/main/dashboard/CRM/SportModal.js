import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { BarChartOutlined, CloseOutlined } from "@ant-design/icons";


const SportModal = ({ handleClose }) => {





  return (
    <Modal
      open={true}
      onCancel={handleClose}
      className="gx-px-3"
      title={<h3 style={{ margin: 0 }} className="gx-fs-lg gx-text-uppercase gx-font-weight-bold gx-text-white">Sport Deatils</h3>}
      footer={
        <>
          <button className="gx-border-0 gx-bg-default gx-text-black gx-rounded-xs gx-mx-2 gx-py-2 gx-px-2" onClick={() => handleClose()} > Cancel </button>
          <button className="gx-border-0  gx-bg-primary  gx-text-white gx-rounded-xs gx-px-3 gx-py-2" onClick={() => handleClose()} > OK </button>
        </>
      }
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >
      <Row >
        <Col md={12} xs={12}>
          <Link to="/components/navigation/breadcrumb">
            <ChartCard chartProperties={{ icon: <BarChartOutlined className="gx-mr-0 gx-fs-xl" />, title: `Active Games`, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={12}>
          <Link to="/components/navigation/dropdown">
            <ChartCard chartProperties={{ title: 'Finished Games', icon: <BarChartOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
          </Link>
        </Col>


      </Row>
    </Modal>
  );
};

export default SportModal;

