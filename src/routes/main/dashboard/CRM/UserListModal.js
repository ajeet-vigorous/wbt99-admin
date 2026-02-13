import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined, UserOutlined } from "@ant-design/icons";


const UserListModal = ({ handleClose }) => {
  let userInfo = JSON.parse(localStorage.getItem('user_id'));

  // useEffect(() => {
  //   const preventBodyScroll = () => {
  //     document.body.style.overflow = 'hidden';
  //   };

  //   const allowBodyScroll = () => {
  //     document.body.style.overflow = 'auto';
  //   };

  //   preventBodyScroll();
  //   return () => {
  //     allowBodyScroll();
  //   };
  // }, []);


  return (
    <Modal
      open={true}
      onCancel={handleClose}
      className="gx-px-3"
      title={<h3 style={{ margin: 0 }} className="gx-fs-lg gx-text-uppercase gx-font-weight-bold gx-text-white">{userInfo.data.userType} Deatils</h3>}
      footer={
        <>
          <button className="gx-border-0 gx-bg-default gx-text-black gx-rounded-xs gx-mx-2 gx-py-2 gx-px-2" onClick={() => handleClose()} > Cancel </button>
           <button className="gx-border-0  gx-bg-primary  gx-text-white gx-rounded-xs gx-px-3 gx-py-2" onClick={() => handleClose()} > OK </button>
        </>
      }
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >
      <Row>
        {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo.map((item, index) => (
          userInfo.data.userPriority > item.priority ? (
            <Col md={12} xs={12} key={index}>
              <Link to={`/components/general/button-${item.userType}/${item.priority}`}>
                <ChartCard chartProperties={{ title: `${item.userType} Master`, icon: <UserOutlined className="gx-mr-0 gx-fs-xl" />, bgColor: 'primary' }} />
              </Link>
            </Col>
          ) : null
        )) : null}
      </Row>

    </Modal>
  );
};

export default UserListModal;


