
import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ChnagePassword from "../../../../components/ChangePassword";
import settings from "../../../../domainConfig";

const Basic = () => {
  let userInfo = JSON.parse(localStorage.getItem('user_id'));
  let userID = userInfo && userInfo.data && userInfo.data.userId ? userInfo.data.userId : {};
  let userType = userInfo && userInfo.data && userInfo.data.userType ? userInfo.data.userType : {};
  const [showPasswordmodal, setShowPasswordModal] = useState(false)
  const handleCloseModal = () => {
    setShowPasswordModal(false)
  }


  return (
    <>

      <Row className="gx-w-100 gx-p-4">


        <Col xs={24} sm={12} md={6} className="" >
          <Link to={`/components/statement/transaction/${userID}`} >
            <Card className="gx-card gx-py-3 gx-my-auto gx-px-2 gx-bg-grey  gx-rounded-lg" >
              <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg  gx-font-weight-semi-bold gx-text-uppercase">Statements</h3>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} md={6} className="">
          <Link to={`/components/statement/account-operations/${userID}`}>
            <Card className="gx-card gx-py-3  gx-px-2 gx-bg-grey">
              <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase">A/c Operations</h3>
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6} className="">
          <Link to={`/components/dataEntry/autoComplete`}>
            <Card className="gx-card gx-py-3  gx-px-2 gx-bg-grey">
              <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase">Profit and Loss</h3>
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6} className="">
          <Link to={`/components/navigation/menu`}>
            <Card className="gx-card gx-py-3  gx-px-2 gx-bg-grey">
              <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase"> Casino Profit&Loss</h3>
            </Card>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6} className="">
          <Card onClick={() => { setShowPasswordModal(true) }}
            className="gx-card gx-py-3  gx-px-2 gx-bg-grey">
            <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase">Change Password</h3>
          </Card>
        </Col>

        {userInfo.data.userType !== 'agent' &&
          <Col xs={24} sm={12} md={6} className="" >
            <Link to={`/components/search/searchUser`} >
              <Card className="gx-card gx-py-3  gx-px-2 gx-bg-grey  gx-rounded-lg" >
                <h3 style={{ whiteSpace: "nowrap" }} className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase">Search User</h3>
              </Card>
            </Link>
          </Col>
        }

        {/* {["RACEX9", "PLX99", "JEM29", "WBT12"].includes(settings?.domainName) && */}
        {(userType === "owner" || userType === "subowner") && (
          <Col xs={24} sm={12} md={6} className="">
            <Link to={`/components/bets/bets`}>
              <Card className="gx-card gx-py-3  gx-px-2 gx-bg-grey">
                <h3
                  style={{ whiteSpace: "nowrap" }}
                  className="gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-uppercase"
                >
                  Bets
                </h3>
              </Card>
            </Link>
          </Col>
        )}

      </Row >
      {showPasswordmodal && <ChnagePassword handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default Basic;
