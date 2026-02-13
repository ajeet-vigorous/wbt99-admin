import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";


const SettingModal = ({ handleClose }) => {
  let userInfo = JSON.parse(localStorage.getItem('user_id'));
  let userID = userInfo && userInfo.data && userInfo.data.userId ? userInfo.data.userId : {};


  return (
    <Modal
      open={true}
      onCancel={handleClose}
      className="gx-px-3"
      footer={
        <>
          <button className="gx-border-0 gx-bg-default gx-text-black gx-rounded-xs gx-mx-2 gx-py-2 gx-px-2" onClick={() => handleClose()} > Cancel </button>
           <button className="gx-border-0  gx-bg-primary  gx-text-white gx-rounded-xs gx-px-3 gx-py-2" onClick={() => handleClose()} > OK </button>
        </>
      }
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >

      <Row >
        <Col md={12} xs={24}>
          <Link to={`/components/statement/transaction/${userID}`}>
            <ChartCard chartProperties={{ icon: <SettingOutlined className="gx-mr-0 gx-fs-xl" />, title: `Statements`, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to={`/components/statement/account-operations/${userID}`}>
            <ChartCard chartProperties={{ title: 'A/c Operations', icon: <SettingOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/components/dataEntry/autoComplete">
            <ChartCard chartProperties={{ title: 'Profit and Loss', icon: <SettingOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/components/navigation/menu">
            <ChartCard chartProperties={{ title: 'Casino Profit&Loss', icon: <SettingOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
          </Link>
        </Col>
      </Row>
    </Modal>
  );
};

export default SettingModal;

