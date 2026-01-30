import React from 'react';
import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined } from "@ant-design/icons";


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
      footer={
        <Button className="gx-bg-grey gx-text-white gx-border-redius0" onClick={() => handleClose()} > Close </Button >
      }
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >
      <Row>
        {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo.map((item, index) => (
          userInfo.data.userPriority > item.priority ? (
            <Col md={12} xs={24} key={index}>
              <Link to={`/components/general/button-${item.userType}/${item.priority}`}>
                <ChartCard chartProperties={{ title: `${item.userType}`, desc: 'Master', icon: 'family', bgColor: 'primary' }} />
              </Link>
            </Col>
          ) : null
        )) : null}
      </Row>

    </Modal>
  );
};

export default UserListModal;


