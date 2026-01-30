import React, {Component} from "react";
import {Col, Row} from "antd";
import InternetionalCasinoBet from "./InternetionalCasinoBet";



class index extends Component {

  render() {
    return (
      <Row justify={"center"}>
        <Col xl={22}>
          <InternetionalCasinoBet/>
        </Col>

      </Row>
    );
  }
}

export default index;
