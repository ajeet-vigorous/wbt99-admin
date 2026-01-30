import React from "react";

import SweetAlert from "react-bootstrap-sweetalert";
import {
  NotificationContainer,
} from "react-notifications";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../../../appRedux/actions/User";


const Status = ({ visible, handleClose, data }) => {

  const dispatch = useDispatch()
  const handlePartnerInfoModal = async () => {
    let parentreqBody = {
      userId: data.key,
      status: data.status === 1 ? 0 : data.status === 0 ? 1 : null,
    };
    await dispatch(userUpdate(parentreqBody))
    await handleClose();
    // await new Promise(resolve => setTimeout(resolve, 400));

    // await getUserListFun()

  };

  if (!visible) {
    return null;
  }
  return (
    <>
      <SweetAlert
        show={true}
        warning
        showCancel
        confirmBtnText={"Submit"}
        confirmBtnCssClass="gx-bg-primary gx-text-white"
        cancelBtnCssClass="gx-bg-danger gx-text-white"
        cancelBtnBsStyle="default"
        title={"Are you sure?"}
        onConfirm={handlePartnerInfoModal}
        onCancel={() => handleClose()}
      >
        {`To ${data.status === 1 ? 'Inactive' : 'Active'} this ${data.username}`}

      </SweetAlert>
      <NotificationContainer position="top-left" />
    </>
  );
};

export default Status;
