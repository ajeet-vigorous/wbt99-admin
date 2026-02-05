import React from "react";
import { Row, Col } from "antd";
import MatkaDetails from "./MatkaDetails";



const MatkaDetailsList = () => {
  return (
    <Row justify={"center"}>
      <Col xs={24}>
        <MatkaDetails />
      </Col>
    </Row>
  );
};

export default MatkaDetailsList;