import React, { Component } from "react";
import { Col, Row } from "antd";
import Basic from "./Basic";
import UserList from "./User";

class index extends Component {

  render() {
    return (
      <Row justify={"center"}>
        <Col xl={24}>
          {/* <UserList/> */}
          <Basic />
          
        </Col>
      </Row>
    );
  }
}

export default index;
