import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Form } from "antd";
// import { changePassword } from "../../appRedux/actions/Auth";
import { NotificationManager } from "react-notifications";
import IntlMessages from "util/IntlMessages";
import { changePassword } from "../../appRedux/actions";

const ChnagePassword = ({handleCloseModal}) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handlePasswordChange = async () => {

    if (newPassword !== confirmPassword) {
      return NotificationManager.error(<IntlMessages id="notification.errorMessage" />,
        <IntlMessages id="notification.clickMe" />,
        5000, () => { alert('callback')}
      );
    }
    setConfirmLoading(true);
    try {
      const data = {
        oldPassword: oldPassword,
        password: newPassword,
        isTransaction: false
      }
      await dispatch(changePassword(data));
    handleCloseModal()
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("")
    } catch (error) {
    
    } finally {
      setConfirmLoading(false);
    }
  };


  return (
      <Modal
        title="Change Password"
        open={true}
        onOk={oldPassword && newPassword && confirmPassword ? handlePasswordChange : ''}
        confirmLoading={confirmLoading}
        onCancel={()=>handleCloseModal()}
        okText="Submit"
        cancelText="Return"
        cancelButtonProps={{ className: 'gx-bg-grey gx-text-white gx-border-redius0' }}
        okButtonProps={{ className: 'gx-border-redius0' }}
        className="gx-px-3"
        // headerClassName="gx-bg-grey gx-text-white"
      >
          <Form  layout="vertical" className="gx-border-redius0">
            <Form.Item required>
              <Input.Password
              className="gx-border-redius0"
                value={oldPassword}
                placeholder="Enter Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                visibilityToggle={false}
              />
            </Form.Item>
            <Form.Item required>
              <Input.Password
                value={newPassword}
                 className="gx-border-redius0"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                visibilityToggle={false}
              />
            </Form.Item>
            <Form.Item required>
              <Input.Password
                value={confirmPassword}
                  className="gx-border-redius0"
                placeholder="Enter Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                visibilityToggle={false}
              />
            </Form.Item>
          </Form>
      </Modal>
  );
};

export default ChnagePassword;
