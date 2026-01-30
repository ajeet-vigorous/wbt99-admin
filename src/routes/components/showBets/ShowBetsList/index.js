import React from "react";
import { Col, Row } from "antd";
import ShowBetsList from "./ShowBetsList";



const PlusMinus = () => {
    return (
        <Row >
            <Col xs={24}>
              <ShowBetsList />
            </Col>

        </Row>
    );
};

export default PlusMinus;
