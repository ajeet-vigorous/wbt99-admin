import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "antd";
import { userSignOut } from "../../appRedux/actions/Auth";
import ChnagePassword from "../ChangePassword";
import { DownOutlined } from "@ant-design/icons";

const UserInfo = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false)
  }


  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => setShowModal(true)}>Change Password</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => dispatch(userSignOut())}>Logout</div>
      ),
    }
  ];
  let userInfo = JSON.parse(localStorage.getItem('user_id'));
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
         className="gx-border-redius0 "
      >
        <div className="gx-fs-md gx-font-weight-bold gx-bg-flex  gx-justify-item-end  gx-text-white gx-pointer">
          <span>{userInfo?.data?.name} ({userInfo?.data?.username})</span>
          <span className="gx-px-2"><DownOutlined /></span>
        </div>
      </Dropdown>
      {showModal && <ChnagePassword handleCloseModal={handleCloseModal} />}
    </>
  );
};
export default UserInfo;