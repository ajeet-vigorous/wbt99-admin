import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Row } from 'antd';

function LoginDtails({ handleClose, visible, data }) {
  const [buttonText, setButtonText] = useState('Copy');

  const handleCopy = () => {
    setButtonText('Copied');
    // setTimeout(() => {
    //   setButtonText('Copy');
    // }, 2000); 
  };
  
  if (!visible || !data) {
    return null;
  }
  const combinedText = `Username: ${data.username}, Password: ${data.password}`;

  return (
    <SweetAlert show={true} success title="User Login details" confirmBtnText={"Close"} onConfirm={handleClose} confirmBtnBsStyle="danger"
    cancelBtnBsStyle="default">
      <Row className='gx-bg-flex gx-px-3 gx-justify-content-around '  >
        <h2 className='gx-w-60 gx-py-1 '>
          User Name: <br/>
          <p className='gx-text-primary'>{data.username}</p>
          </h2>
        <h2 className='gx-w-60 gx-py-1 '>
          Password: <br/>
         <p className='gx-text-primary'>{data.password}</p> 
          </h2>
        <CopyToClipboard text={combinedText} onCopy={handleCopy}>
          <Button type='primary' >
            {buttonText}
          </Button>
        </CopyToClipboard>
      </Row>
    </SweetAlert>
  );
}

export default LoginDtails;


// import React from 'react';
// import { SweetAlert } from 'react-bootstrap-sweetalert'; // Adjust import based on your SweetAlert library
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Row, Button } from 'antd'; // Assuming you use Ant Design components

// const LoginDtails = ({ handleClose, visible, data}) => {
//     if (!visible || !data) {
//         return null;
//     }

//     const combinedText = `Username: ${data.username}, Password: ${data.password}`;

//     const handleCopy = (copiedText) => {
//         alert(`Username and Password copied to clipboard: ${copiedText}`);
//     };

//     const buttonText = 'Copy';

//     return (
//         <SweetAlert
//             show={true}
//             success
//             title="User Login details"
//             confirmBtnText="Close"
//             onConfirm={handleClose}
//         >
//             <Row className='gx-bg-flex gx-px-3 gx-justify-content-around'>
//                 <div className='gx-w-60 gx-py-1 gx-text-primary'>{data.username}</div>
//                 <br />
//                 <div className='gx-w-60 gx-py-1 gx-text-primary'>{data.password}</div>
//                 <CopyToClipboard text={combinedText} onCopy={() => handleCopy(combinedText)}>
//                     <Button type='primary' className="gx-mb-1">
//                         {buttonText} Username & Password
//                     </Button>
//                 </CopyToClipboard>
//             </Row>
//         </SweetAlert>
//     );
// };

// export default LoginDtails;

