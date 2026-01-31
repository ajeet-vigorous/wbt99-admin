import React, { useEffect, useState } from "react";
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
      userId: data.userId?.key,
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
      title={<span className="gx-text-uppercase">Withdrawal To {data?.userId?.username}</span>}
      open={true}
      onCancel={() => handleClose()}
      className="gx-px-3 gx-text-uppercase"
      footer={[
        <div className="gx-p-2">
          <Button key="back" type="default" className=" gx-text-black gx-border-redius btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button key="submit" className="btn gx-text-white" type="primary" onClick={handlePartnerInfoModal}>
            Withdrawal
          </Button>
        </div>
      ]}
    >
      <div className="gx-fs-md gx-font-weight-bold gx-text-dark-grey gx-py-1 ">{`Current Coins: ${data && data.coins ? (Math.floor(Number(data.coins) * 100) / 100).toFixed(2) : '0.00'}`}</div>

      <InputNumber
        className=" gx-py-1 gx-w-100 gx-border-redius"
        size="small"
        type="number"
        value={inputValue}
        defaultValue="0"
        onChange={onChange}
        style={{ borderColor: validationError ? 'red' : undefined }}
      />
      {validationError && (
        <Typography.Text type="danger">{validationError}</Typography.Text>
      )}

      <div className="gx-mb-5"></div>
    </Modal>

  );
};

export default Withdrawal;