import React from "react";
import { Col, Row } from "antd";
import Basic from "./Basic";
import BasicCopy from "./BasicCopy";


const PlusMinus = () => {
    return (
        <Row justify={"center"}>
            <Col xs={24}>
                <>
                    {/* <Basic /> */}
                    <BasicCopy/>
                </>
            </Col>

        </Row>
    );
};

export default PlusMinus;
