import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../../../appRedux/actions/User';
import { generateRandomPassword } from '../../../../components/RandomPassword';
import { useParams } from 'react-router-dom';
const { TextArea } = Input;

function ResetPassword({ handleClose, visible, data }) {
  const [buttonText, setButtonText] = useState('Save & Copy');
  const dispatch = useDispatch();
  const { userType } = useParams()

  const randomPassword = generateRandomPassword(6);
  const handleCopy = () => {
    let reqData = {
      password: randomPassword,
      isTransaction: true,
      userId: data.userId,
    };
    dispatch(userUpdate(reqData));
    setButtonText('Copied');
    handleClose();
  };
  const domain = window.location.origin.replace(/^https?:\/\//, '').replace(/^[^.]+\./, '');

  function getUserTypeShortForm(userType, domain) {
    const userTypeMapping = {
      subowner: 'sowner.',
      superadmin: 'sadmin.',
      admin: 'admin.',
      subadmin: 'madmin.',
      master: 'master.',
      superagent: 'super.',
      agent: 'agent.',
      client: 'client.'
    };
  
    return userTypeMapping[userType];
  }
  const shortForm = getUserTypeShortForm(userType)

  const defaultHtmlContent = `
  New Password
  LINK : ${shortForm !== 'client.' ? shortForm : ""}${domain}
  ID : ${data?.username || 'N/A'}
  PW : ${randomPassword || 'N/A'}
  ${userType !== "client" ? `OTP: ${data?.otp}` : ''}
  `;

  if (!visible) {
    return null;
  }

  return (
    <Modal
      title={`Reset Password`}
      onCancel={handleClose}
      open={true}
      className="gx-px-3"
      footer={[

        <CopyToClipboard key="copy" text={defaultHtmlContent} onCopy={handleCopy}>
          <Button type="primary" className='gx-pointer'>
            {buttonText}
          </Button>
        </CopyToClipboard>,
        <Button key="cancel" onClick={handleClose} className="gx-bg-grey gx-text-light-grey gx-pointer">
          Cancel
        </Button>,
      ]}

    >
      <TextArea rows={7} value={defaultHtmlContent} readOnly />
    </Modal>
  );
}

export default ResetPassword;






