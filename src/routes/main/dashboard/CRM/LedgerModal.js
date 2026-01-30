import { Button, Col, Modal, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userTypeInfo } from "../../../../constants/global";
import ChartCard from "../../../../components/dashboard/Listing/ChartCard"
import { CloseOutlined } from "@ant-design/icons";


const LedgerModal = ({ handleClose }) => {
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
      closeIcon={<CloseOutlined className="gx-text-black" />}
    >
      <Row >
        <Col md={12} xs={24}>
          <Link to="/components/dataEntry/autoComplete">
            <ChartCard chartProperties={{ icon: 'files', title: `Profit/Loss`, bgColor: 'primary' }} />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/components/dataEntry/checkbox">
            <ChartCard chartProperties={{ title: 'My Ledger', icon: 'files', bgColor: 'primary' }} />
          </Link>
        </Col>
        {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo.map((item, index) => (
          userInfo.data.userPriority > item.priority ? (
            <Col key={index} md={12} xs={24}>
              <Link to={`/components/dataEntry/cascader-${item.userType}`}>
                <ChartCard chartProperties={{ title: `${item.userType}`, icon: 'files', desc: ' Ledger', bgColor: 'primary' }} />
              </Link>
            </Col>
          ) : null
        )) : null}

      </Row>
    </Modal>
  );
};

export default LedgerModal;