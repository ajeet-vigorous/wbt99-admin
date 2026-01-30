// import React from "react";
import { Col, Row } from "antd";
import MatchDetails from "./MatchDetails";
import settings from "../../../../domainConfig";
import BTX99MatchDetails from "./domainMatch/Btx99MatchDeatails";


const PlusMinus = () => {
    return (
        <Row justify={"center"}>
            <Col xs={24}>
              {settings.domainName === "SKY99" ? <BTX99MatchDetails />  : <MatchDetails />}
            </Col>

        </Row>
    );
};

export default PlusMinus;
