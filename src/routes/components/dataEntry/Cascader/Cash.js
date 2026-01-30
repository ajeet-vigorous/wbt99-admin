import React, { useEffect, useState } from "react";

import { Form, Row, Col, Input, Button,  DatePicker, Select, Menu , Modal} from 'antd';

import { useDispatch } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getuserSearchClear, getuserSearchReport, userLedgerCreditDebit, userLedgerList } from "../../../../appRedux/actions/User";


const Cash = ({ visible, handleClose, userLedgerListData, data }) => {
    const [userLadger, setLadger] = useState([]);
    const [calAmount, setCalAmount] = useState(0);
    const [creditAmount, setCreditAmount] = useState({});
    const [debitAmount, setDebitAmount] = useState({});
    const [form] = Form.useForm();
    const [selectedUserId, setSelectedUserId] = useState({});
    const [selectedClient, setSelectedClient] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState([]);  
    const [showRow, setShowRow] = useState(false);
    const [payloadData, setPayloadData] = useState({
        client: '',
        collection: '',
        date: moment(),
        amount: '',
        paymentType: "dena",
        remark: '',
        ledgerType: ''
      });
  const { usertype } = useParams();
  const dispatch = useDispatch();



 

  const onChangeDate = (date, dateString) => {
    handleInputChange('date', dateString);
  };

  
  const handleInputChange = (key, value) => {
    setPayloadData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  const handleChange = async (value) => {
    setSelectedClient(value.username);
    setSelectedUserId({userId: value.userId, userType: value.userType})
    setPayloadData(prevState => ({
      ...prevState,
      client: value.username,
    }));
    let reqData = {
      downlineUserId: value.userId,
    };

    await dispatch(userLedgerList(reqData));
    await setShowRow(true);
    await dispatch(getuserSearchClear())
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


    //   const { userLedgerListData } = useSelector((state) => state.UserReducer);


    // if (!userLedgerListData || userLedgerListData === undefined) {
    //     return null
    // }
    useEffect(()=>{
        if (userLedgerListData) {
            // setFilteredOptions([])
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
                remark: item.remark,
                userType: item.userType,
            }));
            setLadger(filteredData);
            setCalAmount(calAmount);
            setCreditAmount(creditAmount);
            setDebitAmount(debitAmount);
    
        }
    },[userLedgerListData])
    const modalFooter = null;
    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };
        return obj;
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            render: renderContent,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY"),
        },
        {
            title: 'Collection Name',
            dataIndex: 'eventName',
            render: renderContent,
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
            render: (value, row) => <span>{row.balance > 0 ? Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - Lena" : Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - DENA"}</span>
        },

        {
            title: 'Payment Type',
            dataIndex: 'ledgerType',
            render: renderContent,
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            render: renderContent,
        },

    ];
    
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
          downlineUserId: payloadData.client,
          downlineUserType: usertype,
        };
    
        if (payloadData.ledgerType !== "all") {
          reqData.ledgerType = payloadData.ledgerType;
        }
    
    
    
        dispatch(userLedgerCreditDebit(reqData));
        handleClose()
      };
    
 
    return (
        <Modal
            title={`Cash Transaction`}
            onCancel={() => handleClose()}
            open={visible}
            footer={modalFooter}
            width={750}
            className="gx-px-3"
        >
             <div className="gx-px-2  gx-bg-flex">
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            // onFinish={onFinish}
            initialValues={{
              client: payloadData.client,
              collection: 'cash_selected',
              date: moment(payloadData.date),
              amount: payloadData.amount,
              paymentType: payloadData.paymentType,
              remark: payloadData.remark,
            }}
          >
            <Row gutter={20} className="">
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                  style={{ position: "relative" }}
                  label= 'User'
                  name="client"
                rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Select a person"
                    onChange={(e) => handleChange1(e.target.value)}
                    // value={selectedClient}
                    value={`${data?.name} (${data?.username})`}
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
                      // Add any additional styling here if needed
                      >
                        {`${item.username} (${item.name})`}  {/* Adjusted template string with index */}
                      </Menu.Item>
                    ))}
                  </Menu>
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
                <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
                  <Input
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
            {/* <Table className="gx-table-responsive" columns={columns} dataSource={userLadger} bordered pagination={false} size="small"

                rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
            /> */}

        </Modal>

    );
};

export default Cash;
