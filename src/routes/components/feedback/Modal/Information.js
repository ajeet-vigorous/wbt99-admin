import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, Table } from 'antd';
import moment from 'moment';
import BackButton from "../../Hoc/BackButton";
import { RedoOutlined } from "@ant-design/icons";


import { secureCode } from "../../../../appRedux/actions/User";

const Information = () => {

  const [password, setPassword] = useState('');
  const [secureCodeDataprint, setSecureCodeDataprint] = useState([]);
  const dispatch = useDispatch();
  const { secureCodeData } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (secureCodeData) {
      const formattedData = secureCodeData ? [{
        key: "1",
        username: secureCodeData.username,
        otp: secureCodeData.otp,
        createdAt: secureCodeData.createdAt
      }] : [];
      setSecureCodeDataprint(formattedData);
    }
  }, [secureCodeData]);

  useEffect(() => {
    setSecureCodeDataprint([]);
  }, [])


  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const reqData = {
      username: password,
    };
    dispatch(secureCode(reqData));
    // setPassword('')
  };





  const renderContent = (value) => {
    return {
      children: value,
    };
  };

  const handleResetOtp = () => {
    alert('Reset OTP functionality is not implemented yet.');
  }

  const columns = [
    {
      title: "username",
      dataIndex: "username",
      render: (text) => renderContent(text),
    },
    {
      title: "OTP",
      dataIndex: "otp",
      render: (text) => renderContent(text),
    },
    {
      title: "Action",
      dataIndex: "createdAt",
      render: (_, record) => (
        <Button
          className='gx-text-uppercase gx-bg-flex gx-align-items-center'
          type="primary"
          danger
          onClick={() => handleResetOtp(record)}
        >
          <RedoOutlined className="gx-mr-0 gx-fs-sm" /> Reset otp
        </Button>
      ),
    },
  ];




  return (
    <Card className="gx-card gx-w-100 gx-mb-0">
      <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex">
        <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
          Secure Code
        </span>
        <BackButton />
      </div>
      <div className='gx-p-5'>
        <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-8">
          <Input
            className="gx-border-redius"
            type="text"
            placeholder="Enter"
            value={password}
            onChange={handleInputChange}
          />
          <div className='gx-py-2'>
            <Button
              className="gx-border-redius"
              type="primary"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </div>
        </div>
        <Table
          className="gx-table-responsive gx-text-uppercase gx-font-weight-bold gx-w-100 login-table-header"
          columns={columns}
          dataSource={secureCodeDataprint}
          bordered
          pagination={false}
          size="small"
        />
      </div>
    </Card>
  );
};

export default Information;

