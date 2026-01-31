import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, message } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined
} from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../../../appRedux/actions/User';
import { generateRandomPassword } from '../../../../components/RandomPassword';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

const ResetPassword = ({ visible, handleClose, data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userType } = useParams();

  const [buttonText, setButtonText] = useState('Submit & Copy');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 🔹 Generate once
  const [generatedPassword] = useState(() =>
    generateRandomPassword(5)
  );

  // 🔹 Actual password used everywhere
  const [currentPassword, setCurrentPassword] = useState(
    generatedPassword
  );

  const domain = window.location.origin
    .replace(/^https?:\/\//, '')
    .replace(/^[^.]+\./, '');

  const userTypeMap = {
    subowner: 'sowner.',
    superadmin: 'sadmin.',
    admin: 'admin.',
    subadmin: 'madmin.',
    master: 'master.',
    superagent: 'super.',
    agent: 'agent.',
    client: ''
  };

  const link = `${userTypeMap[userType] || ''}${domain}`;

  const onSubmit = () => {
    dispatch(
      userUpdate({
        password: currentPassword,
        isTransaction: true,
        userId: data?.userId?.key
      })
    );

    setButtonText('Copied');
    message.success('Password reset & copied!');
    handleClose();
  };

  const copyText = `
NEW PASSWORD
LINK : ${link}
USERNAME : ${data?.username}
PASSWORD : ${currentPassword}
`;

  return (
    <Modal
      open={visible}
      title={`RESET PASSWORD FOR ${data?.username}`}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          password: generatedPassword,
          confirmPassword: generatedPassword
        }}
      >
        {/* PASSWORD */}
        <Form.Item
          label="PASSWORD"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            prefix={
              <LockOutlined
                style={{ color: 'rgba(0,0,0,0.25)' }}
                className="gx-fs-lg"
              />
            }
            suffix={
              passwordVisible ? (
                <EyeOutlined
                  onClick={() => setPasswordVisible(false)}
                  style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.25)' }}
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(true)}
                  style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.25)' }}
                />
              )
            }
          />
        </Form.Item>

        {/* CONFIRM PASSWORD */}
        <Form.Item
          label="CONFIRM PASSWORD"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match');
              }
            })
          ]}
        >
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Confirm password"
            prefix={
              <LockOutlined
                style={{ color: 'rgba(0,0,0,0.25)' }}
              />
            }
            suffix={
              passwordVisible ? (
                <EyeOutlined
                  onClick={() => setPasswordVisible(false)}
                  style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.25)' }}
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(true)}
                  style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.25)' }}
                />
              )
            }
          />
        </Form.Item>

        {/* INFO SECTION */}
        <div style={{ marginTop: 12 }}>
          <div className="">NEW PASSWORD</div>
          <br />
          <div className="">LINK : {link}</div>
          <br />
          <div className="">USERNAME : {data?.username}</div>
          <br />
          <div className="">PASSWORD : {currentPassword}</div>
        </div>
        <div className="gx-mb-5"></div>
        <div className='gx-bg-flex gx-justify-content-end'
        >
          <Button onClick={handleClose} className=''>
            Cancel
          </Button>

          <CopyToClipboard text={copyText} onCopy={onSubmit}>
            <Button type="primary">{buttonText}</Button>
          </CopyToClipboard>
        </div>
      </Form>
    </Modal>
  );
};

export default ResetPassword;
