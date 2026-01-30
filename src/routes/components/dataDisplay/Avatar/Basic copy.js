


import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Button, Card, DatePicker, Select, Table, Menu, Spin, Dropdown, Popconfirm } from 'antd';
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getUserList, getuserSearchClear, getuserSearchReport, userLedgerClear, userLedgerCreditDebit, userLedgerList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";
import { Link } from "react-router-dom";
import { httpPost } from "../../../../http/http";
import { values } from "lodash";
import { NotificationManager } from "react-notifications";

const { Option } = Select;
const Basic = () => {
  const dispatch = useDispatch();

  const { usertype, userName, userIds, name } = useParams();

  const [form] = Form.useForm();
  const [userLists, setUserLists] = useState([]);
  const [userLadger, setLadger] = useState([]);
  const [calAmount, setCalAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState({});
  const [debitAmount, setDebitAmount] = useState({});
  const [selectedUserId, setSelectedUserId] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showRow, setShowRow] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [payloadData, setPayloadData] = useState({
    client: '',
    collection: '',
    date: moment(),
    amount: '',
    paymentType: "dena",
    remark: '',
    ledgerType: ''
  });
  const userData = JSON.parse(localStorage.getItem('user_id'));
  const { userListItems, userLedgerListData, userSearchList, loading, succesApi } = useSelector((state) => state.UserReducer);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);


  // useEffect(() => {
  //   dispatch(userLedgerClear());

  //   setPayloadData({
  //     client: '',
  //     collection: '',
  //     date: moment(),
  //     amount: '',
  //     paymentType: "dena",
  //     remark: '',
  //   });
  //   setShowRow(false);
  //   setUserLists([]);
  //   setLadger([])
  //   setCalAmount(0);
  //   setCreditAmount({});
  //   setDebitAmount({});
  //   // getUserListFun();
  //   if (userName) {
  //     handleChange2(userName);
  //   }
  // }, [userData?.data?.userType, usertype]);

  useEffect(() => {
    dispatch(userLedgerClear());

    setPayloadData({
      client: '',
      collection: '',
      date: moment(),
      amount: '',
      paymentType: "dena",
      remark: '',
    });
    setShowRow(false);
    setUserLists([]);
    setLadger([])
    setCalAmount(0);
    setCreditAmount({});
    setDebitAmount({});
    // getUserListFun();
    if (userIds) {
      handleChange(userIds);
    }
  }, [usertype, userIds]);

  useEffect(() => {
    if (userSearchList) {
      setFilteredOptions(userSearchList);
    }
  }, [userSearchList]);


  useEffect(() => {
    if (succesApi) {
      let reqDataUserledger = {
        downlineUserId: selectedUserId.userId,
      };

      dispatch(userLedgerList(reqDataUserledger));
    }

  }, [succesApi])

  useEffect(() => {

    if (userLedgerListData) {
      setFilteredOptions([])
      const { calAmount, creditAmount, debitAmount, ledgerData } = userLedgerListData;
      const filteredData = ledgerData.map((item, index) => ({
        key: `${item.userId}-${index}`,
        userID: `${item.userId}`,
        createdAt: item.createdAt,
        eventName: item.eventName,
        balance: item.balance,
        debit: item.amount > 0 ? item.amount : 0,
        credit: item.amount < 0 ? item.amount : 0,
        ledgerType: item.ledgerType,
        ledgerId: item.ledgerId,
        remark: item.remark,
        userType: item.userType,
      }));
      setLadger(filteredData);
      setCalAmount(calAmount);
      setCreditAmount(creditAmount);
      setDebitAmount(debitAmount);

    }
  }, [userLedgerListData]);

  const getUserListFun = async () => {
    let reqData = {
      sortData: { createdAt: 1 },
      keyWord: '',
      pageNo: 1,
      size: 20,
      status: 'both',
      parentUserType: userData?.data.userType,
      parentId: '',
      downlineUserType: usertype,
    };
    // await dispatch(getUserList(reqData));
    setLadger([]);
    setCalAmount(0);
    setCreditAmount({});
    setDebitAmount({});
    setShowRow(false);
  };

  const handleInputChange = (key, value) => {
    setPayloadData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };



  const onFinish = (values) => {
    let amount = null;
    if (usertype === "client") {
      amount = payloadData.paymentType === "dena" ? payloadData.amount * -1 : payloadData.amount;
    } else {
      amount = payloadData.paymentType === "dena" ? payloadData.amount : payloadData.amount * -1;
    }

    let reqData = {
      date: payloadData.date,
      remark: payloadData.remark,
      amount: amount,
      paymentType: payloadData.paymentType,
      downlineUserId: selectedUserId.userId,
      downlineUserType: usertype,
    };


    // if (payloadData.ledgerType !== "all") {
    //   reqData.ledgerType = payloadData.ledgerType;
    // }

    dispatch(userLedgerCreditDebit(reqData))
    form.resetFields(['amount','remark','ledgerType','date','paymentType','collection']);
  };


  const onChangeDate = (date, dateString) => {
    handleInputChange('date', dateString);
  };

  const handleChange = async (value) => {

    setSelectedClient(value);
    setSelectedUserId({ userId: value, userType: value.userType })
    setPayloadData(prevState => ({
      ...prevState,
      client: value.username,
    }));
    let reqData = {
      downlineUserId: value ? value : userIds,
    };

    await dispatch(userLedgerList(reqData));
    await setShowRow(true);
    await dispatch(getuserSearchClear())
  };





  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };

  const handleChange2 = async (value) => {
    setSelectedClient(value);
    const redData = {
      userType: usertype,
      searchValue: value,
      cashTransaction: true
    };
    // if (value.length > 3) {
    // dispatch(getuserSearchReport(redData));
    const resData = await httpPost("user/userSearch", redData);
    // console.log("resData",resData.data[0]);
    handleChange(resData?.data[0])
    // }
    // handleChange()
  };







  const deleteLedger = async () => {

    let reqData = {
      "downlineUserId": currentRecord?.userID,
      "ledgerId": currentRecord?.ledgerId
    }
    let userLedger = await httpPost('user/deleteUserLedger', reqData);
    if (userLedger) {
      NotificationManager.success(userLedger?.data?.message, "Success", 1000, () => {
        alert('callback');
      });
      let reqData = {
        downlineUserId: currentRecord?.userID,
      };

      await dispatch(userLedgerList(reqData));
    }
  }


  const showPopconfirm = (record) => {
    setCurrentRecord(record);
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      // console.log('Deleted:');
      deleteLedger()
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };


  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="1">


        <Popconfirm
          title="Are you sure to delete?"
          open={open}
          onConfirm={handleOk}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
          style={{ width: "100px" }}
        >
          <span onClick={() => showPopconfirm(record)}>Delete</span>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [

    {
      title: '#',
      dataIndex: 'id',
      render: (value, row) => (
        row?.ledgerType === "settle" ? (

          <Dropdown overlay={menu(row)} trigger={["click"]}>
            <span
              className="gx-bg-primary"
              onClick={(e) => e.preventDefault()}
              style={{ height: "8px", width: "10px", padding: "5px", borderRadius: '2px' }}
            >
              <i className="icon icon-menu-down gx-text-white" />
            </span>
          </Dropdown>
        ) : null
      ),
    },

    // {
    //   title: '#',
    //   dataIndex: 'id',
    //   render: (value, row) => (
    //     {row?.ledgerType === "settle" ?
    //     <Dropdown overlay={menu(row)} trigger={["click"]}>
    //       <span
    //         className="gx-bg-primary"
    //         onClick={(e) => e.preventDefault()}
    //         style={{ height: "8px", width: "10px", padding: "5px", borderRadius: '2px' }}
    //       >
    //         <i className="icon icon-menu-down gx-text-white" />
    //       </span>
    //     </Dropdown>: null}
    //   ),
    //   // render: (value, row) => (
    //   //   <div onClick={() => alert('1')}>
    //   //     {/* <span onClick={() => this.handleConfirmationModalOpen(element.ledgerId)} className='cursor-pointer '> */}
    //   //                                   {row && row.ledgerType === "settle" ? < FaTrashCan className="text-red-600" /> : null}
    //   //                                 {/* </span> */}
    //   //   </div>
    //   // ),
    // },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (createdAt) => <span className="gx-text-nowrap">{moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Collection Name',
      dataIndex: 'eventName',
      render: (value, row) => <span className="gx-text-nowrap">{row.eventName}</span>,
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      render: (value, row) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      render: (value) => (
        Number.parseFloat(Math.abs(value)).toFixed(2)
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: (value, row) => <span className='gx-text-nowrap'>{row.balance > 0 ? Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - Lena" : Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - DENA"}</span>
    },

    {
      title: 'Payment Type',
      dataIndex: 'ledgerType',
      render: renderContent,
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      render: (value, row) => <span className="gx-text-nowrap">{row?.remark}</span>,
    },
    {
      title: 'Done By',
      dataIndex: ``,
      render: () => <span>{usertype}</span>
    },
  ];

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  };



  const handleChange1 = (value) => {
    setSelectedClient(value);
    const redData = {
      userType: usertype,
      searchValue: value,
      cashTransaction: true
    };
    if (value.length > 3) {
      dispatch(getuserSearchReport(redData));
    }

  };
  const onSearch = (value) => {

    setSelectedClient(value);
    const redData = {
      userType: usertype,
      searchValue: value,
      cashTransaction: true
    };
    if (value.length > 3) {
      dispatch(getuserSearchReport(redData));
    }

    // console.log('search:', value);
  };

  // const filterOption = (input, option) => {
  //   if (typeof option?.children == 'string') {
  //     return option.children.toLowerCase().includes(input.toLowerCase());
  //   }
  //   return false; // Default to false if children is not a string
  // };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {loading
        && <div style={{
          backgroundColor: 'rgba(255,255,255, 0.5)',
          zIndex: 10
        }} className="gx-position-absolute gx-top-0 gx-left-0 gx-w-100 gx-h-100 gx-bg-flex gx-align-items-center gx-justify-content-center ">
          <Spin size="mideum" style={styles} />
          <span className="gx-text-primary" ></span>
        </div>}
      <Card className="gx-card">
        <div className="gx-bg-grey gx-px-3 gx-pt-3 gx-bg-flex">
          <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize gx-text-nowrap">
            {usertype} Transactions
          </span>
          <BackButton />
        </div>
        <div className="gx-px-2 gx-pt-3 gx-bg-flex">
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            // onFinish={onFinish}

            defaultValue={{
              client: payloadData.client,
              collection: 'cash_selected',
              date: moment(payloadData.date),
              amount: payloadData.amount,
              paymentType: payloadData.paymentType,
              remark: payloadData.remark,
            }}


          >
            {/* <Row gutter={20} className="">
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                  label={usertype}
                  name="client"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Select a person"
                    onChange={(e) => handleChange1(e.target.value)}
                    value={selectedClient}
                  />
                  {filteredOptions.map(item => (
                    <li className="gx-py-1" key={item.key} value={item.key} onClick={() => handleChange(item)}>
                      {`${item.username} (${item.username})`}
                    </li>
                  ))}
                </Form.Item>
              </Col>
            </Row> */}


            <Row gutter={20} className="">
              {/* <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label={usertype} name="client" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={value => { handleInputChange('client', value); handleChange(value); }}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {userLists.map(item => (
                      <Select.Option key={item.key} value={item.key}>{item.username} ({item.username})</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                  style={{ position: "relative" }}
                  label={usertype}
                  name="client"
                  rules={[{ required: true }]}
                >
                  {/* <Input
                    placeholder="Select a person"
                    onChange={(e) => handleChange1(e.target.value)}
                    value={selectedClient ? selectedClient : userName}
                    className="gx-border-redius0"
                  />

                  <Menu
                    className="gx-bg-white gx-px-1"
                    style={{ position: "absolute", top: '37px', left: 0, zIndex: 2 }}
                    mode="vertical"
                  >
                    {filteredOptions.map((item, index) => (
                      <Menu.Item
                        key={index}
                        onClick={() => handleChange(item)}
                      >
                        {`${item.username} (${item.name})`}  
                      </Menu.Item>
                    ))}

                  </Menu> */}

                  <Select
                    showSearch
                    placeholder={`${userName ? `${userName} (${name})` : 'Select User'}`}
                    optionFilterProp="children"
                    onChange={handleChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    className='w-full'
                  >

                    {filteredOptions && filteredOptions.length > 0 ? filteredOptions.map(user => (
                      <Option key={user.userId} value={user.userId} label={`${user.username} ${user.name} `}>
                        {user.username} ({user.name})
                      </Option>
                    )) : null}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Collection" name="collection" rules={[{ required: true }]}>
                  <Select 
                  // getPopupContainer={trigger => trigger.parentElement}
                  >
                    <Select.Option value="cash_selected">CASH A/C</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                  <DatePicker className="gx-mb-3 gx-w-100 gx-border-redius0" onChange={onChangeDate} />
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Amount"  name="amount" rules={[{type:"number", required: true }]}>
                  <Input
                    // type="number"
                    type="number"
                    placeholder="Amount"
                    className="gx-border-redius0"
                    onChange={e => handleInputChange('amount', e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Payment Type" name="paymentType" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="Select PaymentType"
                    optionFilterProp="children"
                    onChange={value => handleInputChange('paymentType', value)}
                    // getPopupContainer={trigger => trigger.parentElement}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="dena">PAYMENT-DIYA</Select.Option>
                    <Select.Option value="lena">PAYMENT-LIYA</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Remark" name="remark" rules={[{ required: true }]}>
                  <Input
                    placeholder="Remark"
                    className="gx-border-redius0"
                    onChange={e => handleInputChange('remark', e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label="Ledger Type" name="ledgerType" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="All"
                    optionFilterProp="children"
                    onChange={value => handleInputChange('ledgerType', value)}
                    // getPopupContainer={trigger => trigger.parentElement}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="daimondCasino">Daimond Casino</Select.Option>
                    <Select.Option value="internationalCasino">International Casino</Select.Option>
                    <Select.Option value="settle">Settle</Select.Option>
                    <Select.Option value="cricket">Cricket</Select.Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Button type="primary" onClick={() => onFinish()} className="gx-border-redius0">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>

      {showRow && <>
        {/* {loading ? <Loader props={loading} /> : */}
        <Card className="gx-w-100">
          <Row>
            <Col xl={6} lg={6} md={22} sm={22} xs={22} className="gx-pt-5  " >
              <div className="gx-fs-xl  gx-px-3 gx-text-red">
                Dena: {usertype === "client" ? Number.parseFloat(Math.abs(creditAmount ? creditAmount : 0)).toFixed(2) : Number.parseFloat(Math.abs(debitAmount ? debitAmount : 0)).toFixed(2)}
              </div>
            </Col>
            <Col xl={6} lg={6} md={22} sm={22} xs={22} className="gx-pt-5 gx-px-3  ">
              <div className="gx-fs-xl  gx-px-3 gx-text-green-0">
                Lena: {usertype === "client" ? Number.parseFloat(Math.abs(debitAmount ? debitAmount : 0)).toFixed(2) : Number.parseFloat(Math.abs(creditAmount ? creditAmount : 0)).toFixed(2)}
              </div>
            </Col>

            {usertype === 'client' ?
              <Col xl={6} lg={6} md={22} sm={22} xs={22} className="gx-pt-5 gx-px-3 gx-bg-flex gx-justify-content-center">
                <span className={`gx-fs-xl  gx-px-3 ${calAmount < 0 ? "gx-text-green-0" : "gx-text-red"} `}>
                  Balance: {Number.parseFloat(Math.abs(calAmount ? calAmount : 0)).toFixed(2)} ({calAmount < 0 ? "Lena" : "Dena"})
                </span>
              </Col> :
              <Col xl={6} lg={6} md={22} sm={22} xs={22} className="gx-pt-5 gx-px-3 gx-bg-flex gx-justify-content-center">
                <span className={`gx-fs-xl  gx-px-3 ${calAmount > 0 ? "gx-text-green-0" : "gx-text-red"} `}>
                  Balance: {Number.parseFloat(Math.abs(calAmount ? calAmount : 0)).toFixed(2)} ({calAmount > 0 ? "Lena" : "Dena"})
                </span>
              </Col>


            }














            <Col xl={6} lg={6} md={22} sm={22} xs={22} className="gx-pt-5 gx-px-3  ">
              <Link to={`/components/lenedena/deleted-lenedena/${selectedUserId.userId}/${selectedUserId.userType}`} className='gx-px-3'>
                <Button className="gx-fs-xl  gx-text-white gx-bg-primary">Deleted</Button></Link>
            </Col>
          </Row>

          <Table rowKey={record => record?.key} className="gx-table-responsive" columns={columns} dataSource={userLadger} bordered pagination={false} size="small"

            rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
          />
        </Card>
        {/* } */}
      </>



      }
    </>
  );
};

export default Basic;


