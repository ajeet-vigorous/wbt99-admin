import React from "react";
import {Col, Row} from "antd";

import Basic from "./Basic";
import settings from "../../../../domainConfig";
import Plx99Basic from "./domainWiseEdit/plx99Edit";



const Input = () => {

  return (
    <Row>
      <Col lg={22} md={22} sm={24} xs={24}>
       {(settings?.domainName === 'DRX100' || settings?.domainName === 'PLX99' || settings?.domainName === 'JEM29' || settings?.domainName === 'PINK99') ? <Plx99Basic /> :  <Basic/>}
      </Col>

    </Row>
  );
};

export default (Input);
