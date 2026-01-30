import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined } from "@ant-design/icons";


const CashTransactionModal = ({ handleClose }) => {
  let userInfo = JSON.parse(localStorage.getItem('user_id'));


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
      closeIcon={<CloseOutlined className="gx-text-black" /> }
    >
      <Row>
        {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo.map((item, index) => (
          userInfo.data.userPriority > item.priority ? (
            <Col key={index} md={12} xs={24}>
              <Link to={`/components/dataDisplay/avatar-${item.userType}`}>
                <ChartCard chartProperties={{ title: `${item.userType}`, desc: 'Dr/Cr Entry ', icon: 'wysiwyg', bgColor: 'primary' }} />
              </Link>
            </Col>
          ) : null
        )) : null}
      </Row>

    </Modal>
  );
};

export default CashTransactionModal;


