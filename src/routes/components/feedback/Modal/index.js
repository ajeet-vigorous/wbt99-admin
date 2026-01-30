import React, { Component } from "react";
import { Row } from "antd";
import Information from "./Information";

class Modal extends Component {
  render() {
   
    return (
      <> 
      <Row justify={"center"}>
      <Information />
      </Row>
      </>
    );
  }
}

export default Modal;

