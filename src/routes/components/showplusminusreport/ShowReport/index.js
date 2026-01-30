import React from "react";
import { Col, Row } from "antd";
import Basic from "./Basic";
import BasicCopy from "./BasicCopy";


const PlusMinus = () => {
    return (
        <Row justify={"center"}>
            <Col lg={24} xs={22}>
                <>
                    {/* <Basic /> */}
                    <BasicCopy/>
                </>
            </Col>

        </Row>
    );
};

export default PlusMinus;
