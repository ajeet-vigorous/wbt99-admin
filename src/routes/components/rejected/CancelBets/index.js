import React, {Component} from "react";
import {Col, Row} from "antd";


import Basic from "./Basic";


class index extends Component {

  render() {
    return (
      <Row justify={"center"}>
        <Col lg={24}>
          <Basic/>
        </Col>

      </Row>
    );
  }
}

export default index;
