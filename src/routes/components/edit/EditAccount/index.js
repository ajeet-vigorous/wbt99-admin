import React from "react";
import { Col, Row } from "antd";

import Basic from "./Basic";
import settings from "../../../../domainConfig";
import Plx99Basic from "./domainWiseEdit/plx99Edit";



const Input = () => {

  return (
    <>
      {(settings?.domainName === 'DRX100' || settings?.domainName === 'PLX99' || settings?.domainName === 'JEM29' || settings?.domainName === 'PINK99') ? <Plx99Basic /> : <Basic />}
    </>

  );
};

export default (Input);
