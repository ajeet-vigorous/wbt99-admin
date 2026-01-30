import React, {  useEffect, useState } from "react";
import { Modal, InputNumber, Typography, Button } from "antd";
import { coinUpdate, getuserSearchReport } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";

const Withdrawal = ({ visible, handleClose, data, searchText }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch()


//   const { userListChnage } = useSelector((state) => state.UserReducer);
//   useEffect(()=>{
// if(userListChnage === true){
//   let reqData = {
//     searchValue: searchText,
//   };
//   if (searchText) {
//     dispatch(getuserSearchReport(reqData))
//   }
// }
//   },[userListChnage])



  const [validationError, setValidationError] = useState('');
  const validateInput = () => {
    if (!inputValue) {
      setValidationError('Coins value cannot be blank');
      return false;
    }
    return true;
  };


  const handlePartnerInfoModal = async () => {

    if (!validateInput()) {
      return;
    }
    let dataDeposit = {
      userId: data.userId,
      coins: -inputValue,
    };
  

    await dispatch(coinUpdate(dataDeposit))
    handleClose()
    setInputValue('')
  };


  const onChange = (value) => {
    setInputValue(value);
  };

  if (!visible || !data) {
    return null;
  }
  return (
    <Modal
      title={`Withdrawal`}
      onCancel={() => handleClose()}
      open={true}
      className="gx-px-3"
      footer={[
        <Button key="back" className="gx-bg-grey gx-text-white gx-border-redius0" onClick={handleClose}>
          Return
        </Button>,
        <Button key="submit" className="gx-border-redius0" type="primary" onClick={handlePartnerInfoModal}>
          Submit
        </Button>,
      ]}
    >
      <div className="gx-fs-2xl gx-text-dark-grey gx-py-3">{`Curr Coins : ${data && data.coins ? (Math.floor(Number(data.coins) * 100) / 100).toFixed(2) : '0.00'}`}</div>
      <InputNumber
        className="gx-mb-1 gx-w-100 gx-border-redius0"
        size="smaill"
        type="number"
        value={inputValue}
        onChange={onChange}
        style={{ borderColor: validationError ? 'red' : undefined }}
      />
      {validationError && (
        <Typography.Text type="danger">{validationError}</Typography.Text>
      )}
    </Modal>

  );
};

export default Withdrawal;