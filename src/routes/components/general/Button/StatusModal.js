import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Typography, Button } from "antd";
import { coinUpdate, getuserSearchReport, userUpdate } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";

const StatusModal = ({ visible, handleClose, data }) => {
    const dispatch = useDispatch();

    // Handle toggling bet block status
    const handleBetBlock = async (data) => {
        let reqData = {
            "userId": data.key,
            "betStatus": !data.betStatus
        };
        await dispatch(userUpdate(reqData));
        handleClose()
    };

    // Handle toggling casino block status
    const handleCasinoBlock = async (data) => {
        let reqData = {
            "userId": data.key,
            "casinoStatus": !data.casinoStatus
        };
        await dispatch(userUpdate(reqData));
        handleClose()
    };

    // Handle toggling Int Casino block status
    const handleINTCasinoBlock = async (data) => {
        let reqData = {
            "userId": data.key,
            "matkaStatus": !data.matkaStatus
        };
        await dispatch(userUpdate(reqData));
        handleClose()
    };

    const handleIsOtpRequiredBlock = async (data) => {
        let reqData = {
            "userId": data.key,
            "isOtpRequired": !data.isOtpRequired
        };
        await dispatch(userUpdate(reqData));
        handleClose()
    };

    if (!visible || !data) {
        return null;
    }

    return (
        <Modal
            title={<span className="gx-text-uppercase">Block action for {data?.username}</span>}
            open={true}
            onCancel={() => handleClose()}
            className="gx-text-uppercase"
            footer={
                <>
                    <button style={{ border: "none" }} className="gx-bg-default gx-text-black gx-rounded-xs gx-mx-2 gx-py-2 gx-px-2" onClick={handleClose}> Cancel </button>
                    <button style={{ border: "none" }} className="gx-bg-primary gx-text-white gx-rounded-xs gx-px-3 gx-py-2" onClick={handleClose}> OK </button>
                </>
            }
        >
            <Row  className="gx-w-100">
                <Col sm={12} xs={12}>
                    <div className=" gx-py-3 gx-pointer" onClick={() => handleBetBlock(data)}>
                        <div className={`gx-px-4 gx-py-3 ${data.betStatus ? " gx-rounded-xs ant-tag-green" : " gx-rounded-xs ant-tag-red"}`}>
                            {data.betStatus ? "Block Betting" : "Unblock Betting"}
                        </div>
                    </div>
                </Col>

                <Col sm={12} xs={12}>
                    <div className=" gx-py-3 gx-pointer" onClick={() => handleCasinoBlock(data)}>
                        <div className={`gx-px-4 gx-py-3 ${data.casinoStatus ? " gx-rounded-xs ant-tag-green" : " gx-rounded-xs ant-tag-red"}`}>
                            {data.casinoStatus ? "Block Casino" : "Unblock Casino"}
                        </div>
                    </div>
                </Col>

                <Col sm={12} xs={12}>
                    <div className=" gx-py-3 gx-pointer" onClick={() => handleINTCasinoBlock(data)}>
                        <div className={`gx-px-4 gx-py-3 ${data.matkaStatus ? " gx-rounded-xs ant-tag-green" : " gx-rounded-xs ant-tag-red"}`}>
                            {data.matkaStatus ? "Block Matka" : "Unblock Matka"}
                        </div>
                    </div>
                </Col>

                <Col sm={12} xs={12}>
                    <div className=" gx-py-3 gx-pointer" onClick={() => handleIsOtpRequiredBlock(data)}>
                        <div className={`gx-px-4 gx-py-3 ${data.isOtpRequired ? " gx-rounded-xs ant-tag-green" : " gx-rounded-xs ant-tag-red"}`}>
                            {data.isOtpRequired ? "OTP INACTIVE" : "OTP ACTIVE"}
                        </div>
                    </div>
                </Col>
            </Row>

      
        </Modal>
    );
};

export default StatusModal;
