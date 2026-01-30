import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined } from "@ant-design/icons";


const SettingModal = ({ handleClose }) => {
  let userInfo = JSON.parse(localStorage.getItem('user_id'));
    let userID = userInfo && userInfo.data && userInfo.data.userId ? userInfo.data.userId : {};


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
          <Link to={`/components/statement/transaction/${userID}`}>
          <ChartCard chartProperties={{ icon: 'avatar', title: `Statements`, bgColor: 'primary' }} />
        </Link>
      </Col>

      <Col md={12} xs={24}>
      <Link to={`/components/statement/account-operations/${userID}`}>
          <ChartCard chartProperties={{ title: 'A/c Operations', icon: 'A/c Operations', bgColor: 'primary' }} />
        </Link>
      </Col>

      <Col md={12} xs={24}>
        <Link to="/components/dataEntry/autoComplete">
          <ChartCard chartProperties={{ title: 'Profit and Loss', icon: 'A/c Operations', bgColor: 'primary' }} />
        </Link>
      </Col>

      <Col md={12} xs={24}>
        <Link to="/components/navigation/menu">
          <ChartCard chartProperties={{ title: 'Casino Profit&Loss', icon: 'A/c Operations', bgColor: 'primary' }} />
        </Link>
      </Col>
    </Row>
  </Modal>
  );
};

export default SettingModal;

