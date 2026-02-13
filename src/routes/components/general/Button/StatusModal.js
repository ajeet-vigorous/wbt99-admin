import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Typography, Button } from "antd";
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

    if (!visible || !data) {
        return null;
    }

    return (
        <Modal
            title={<span className="gx-text-uppercase">Block action for {data?.username}</span>}
            open={true}
            onCancel={() => handleClose()}
            className="gx-px-3 gx-text-uppercase"
            footer={
                <>
                    <button style={{ border: "none" }} className="gx-bg-default gx-text-black gx-rounded-xs gx-mx-2 gx-py-2 gx-px-2" onClick={handleClose}> Cancel </button>
                    <button style={{ border: "none" }} className="gx-bg-primary gx-text-white gx-rounded-xs gx-px-3 gx-py-2" onClick={handleClose}> Ok </button>
                </>
            }
        >
            <button
                type="button"
                onClick={() => handleBetBlock(data)}
                className={`gx-bg-default gx-fs-lg gx-text-black gx-rounded-xs gx-mx-1 gx-py-2 gx-px-2 gx-border-0`}
            >
                <span>{data.betStatus ? "Block Betting" : "Unblock Betting"}</span>
            </button>

            <button
                type="button"
                onClick={() => handleCasinoBlock(data)}
                className={`gx-bg-default gx-fs-lg gx-text-black gx-rounded-xs gx-mx-1 gx-py-2 gx-px-2 gx-border-0`}
            >
                <span>{data.casinoStatus ? "Block Casino" : "Unblock Casino"}</span>
            </button>


            <button
                type="button"
                onClick={() => handleINTCasinoBlock(data)}
                className={`gx-bg-default gx-fs-lg gx-text-black gx-rounded-xs gx-mx-1 gx-py-2 gx-px-2 gx-border-0`}
            >
                <span>{data.matkaStatus ? "Block Matka" : "Unblock Matka"}</span>
            </button>

            <div className="gx-mb-5"></div>
        </Modal>
    );
};

export default StatusModal;
