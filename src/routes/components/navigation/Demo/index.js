import React, {Component} from "react";
import {Col, Row} from "antd";


import Demo from "./Demo";


class index extends Component {

  render() {
    return (
      <Row justify={"center"}>
        <Col xl={22}>
          <Demo/>
        </Col>

      </Row>
    );
  }
}

export default index;
