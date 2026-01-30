import React from "react";
import { Row, Col } from "antd";
import Basic from "./Basic";



const MatkaView = () => {
  return (
    <Row justify={"center"}>
      <Col xl={22} md={24} xs={24}>
        <Basic />
      </Col>
    </Row>
  );
};

export default MatkaView;
