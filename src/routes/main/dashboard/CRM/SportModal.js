import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined } from "@ant-design/icons";


const SportModal = ({ handleClose }) => {
    




  return (
    <Modal
      open={true}
      onCancel={handleClose}
      className="gx-px-3"
      footer={
        <Button className="gx-bg-grey gx-text-white gx-border-redius0" onClick={() => handleClose()} >
          Close
        </Button >
      }
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >
      <Row >
        <Col md={12} xs={24}>
          <Link to="/components/navigation/breadcrumb">
            <ChartCard chartProperties={{ icon: 'tag', title: `Active Games`, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/components/navigation/dropdown">
            <ChartCard chartProperties={{ title: 'Finished Games', icon: 'tag', bgColor: 'primary' }} />
          </Link>
        </Col>
       

      </Row>
    </Modal>
  );
};

export default SportModal;

