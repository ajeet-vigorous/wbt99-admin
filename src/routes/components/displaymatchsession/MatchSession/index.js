import React from "react";
import {Col, Row} from "antd";
import Basic from "./Basic";



const Input = () => {

  return (
    <Row justify={"center"} className="gx-px-2">
      <Col xl={24} sm={22} xs={26}>
        <Basic/>
      </Col>

    </Row>
  );
};

export default (Input);
