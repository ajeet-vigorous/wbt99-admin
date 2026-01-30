import React from "react";
import {  Row } from "antd";
import Disabled from "./Disabled";


const Button = () => {

  return (
    <Row justify={"center"} className="gx-px-2">
        <Disabled />
    </Row>
  );
};
export default Button;
