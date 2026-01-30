import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Select,
  Table,
  Card,
  Input,
  Button,
  Checkbox,
  Form,
  Row,
  Col,
  DatePicker,
  Space
} from 'antd';
import moment from 'moment';
import { httpGet, httpPost } from '../../../../http/http';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Basic = ({ users }) => {
  const [state, setState] = useState({
    offset: 0,
    fieldsUser: {
      marketId: "",
      selectionId: "",
      fancyType: "nonDeletedFancy",
      clientId: "",
      minAmt: "",
      maxAmt: "",
      username: "",
      password: "",
      size: 50
    },
    errorsUser: {},
    clientList: [],
    isFetch: false,
    keyWord: "",
    pageNo: 1,
    fancyBetList: [],
    sessionList: [],
    filteredData: [],
    selectedIds: [],
    updateModal: false,
    rollBackModal: false,
    total: 0,
    dateRange: []
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      fieldsUser: {
        ...prevState.fieldsUser,
        [name]: value
      },
      errorsUser: {
        ...prevState.errorsUser,
        [name]: ""
      }
    }));
  };

  const handleSelectChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      fieldsUser: {
        ...prevState.fieldsUser,
        [name]: value
      },
      errorsUser: {
        ...prevState.errorsUser,
        [name]: ""
      }
    }));
    // if (name === 'fancyType' || name === 'selectionId' || name === 'clientId') {
    //   getBetList();
    // }
    if (['fancyType', 'selectionId', 'clientId', 'size'].includes(name)) {
      getBetList(value); // Pass the new size value directly if name is 'size'
    }
  };

  const handleDateChange = (dates) => {
    setState(prevState => ({
      ...prevState,
      dateRange: dates
    }));
  };

  const handleMarketIdSubmit = () => {
    const { marketId } = state.fieldsUser;
    if (!marketId) {
      message.error("Please enter Market ID");
      return;
    }
    setIsDataLoaded(true);
    getClientByMarketId();
    getSessionList();
    getBetList();
  };

  const getClientByMarketId = async () => {
    const { marketId } = state.fieldsUser;
    let reqData = { marketId };
    let clientList = await httpPost("sports/clientListByMarketId", reqData);
    if (clientList) {
      setState(prevState => ({ ...prevState, clientList: clientList.data }));
    }
  };

  const getSessionList = async () => {
    const { marketId } = state.fieldsUser;
    setState(prevState => ({ ...prevState, isFetch: true }));

    let sessionList = await httpGet(`sports/getSessionList?marketId=${marketId}`);
    if (sessionList) {
      const sortedSessions = sessionList?.data?.data?.sort((a, b) => {
        const startsWithDigit = (str) => /^\d/.test(str);
        const includesOver = (str) => /OVER/.test(str);
        const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
        const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str?.toUpperCase());

        const nameA = a.sessionNames[0];
        const nameB = b.sessionNames[0];

        const isDigitA = startsWithDigit(nameA);
        const isDigitB = startsWithDigit(nameB);
        const includesOverA = includesOver(nameA);
        const includesOverB = includesOver(nameB);
        const containsFirstA = containsFirst(nameA);
        const containsFirstB = containsFirst(nameB);

        if (containsFirstA && !containsFirstB) return 1;
        if (!containsFirstA && containsFirstB) return -1;

        if (isDigitA && isDigitB) {
          if (includesOverA && !includesOverB) return -1;
          if (!includesOverA && includesOverB) return 1;
          const numA = getNumericPart(nameA);
          const numB = getNumericPart(nameB);
          return numA - numB;
        }

        if (isDigitA && !isDigitB) return -1;
        if (!isDigitA && isDigitB) return 1;

        return nameA?.localeCompare(nameB);
      });

      setState(prevState => ({ ...prevState, sessionList: sortedSessions }));
    }
    setState(prevState => ({ ...prevState, isFetch: false }));
  };

  const getBetList = async (size) => {
    const {
      marketId,
      fancyType,
      clientId,
      selectionId,
      minAmt,
      maxAmt,
      username,
      size: stateSize
    } = state.fieldsUser;

    let reqData = {
      marketId,
      fancyBet: true,
      isDeleted: fancyType === "deletedFancy" ? 1 : "0",
      downlineUserId: clientId,
      downlineUserType: "client",
      keyWord: state.keyWord,
      pageNo: state.pageNo,
      size: size || stateSize,
      minAmt: minAmt ? parseInt(minAmt) - 1 : undefined,
      maxAmt: maxAmt ? parseInt(maxAmt) + 1 : undefined,
      username,
      selectionId,
    };

    let betList = await httpPost("sports/betsList", reqData);
    if (betList) {
      setState(prevState => ({
        ...prevState,
        fancyBetList: betList.data.fancyBetData,
        filteredData: betList.data.fancyBetData,
        total: betList.data.totalFancyCount,
      }));
    }
  };

  const getRangeBetList = async () => {
    await getBetList();
  };

  const handlePageClick = async (page) => {
    setState(prevState => ({ ...prevState, pageNo: page, isFetch: true }));
    await getBetList();
    setState(prevState => ({ ...prevState, isFetch: false }));
  };

  const selectFancy = (_id) => {
    const newSelectedIds = state.selectedIds.includes(_id)
      ? state.selectedIds.filter(id => id !== _id)
      : [...state.selectedIds, _id];
    setState(prevState => ({ ...prevState, selectedIds: newSelectedIds }));
  };

  const handleSelectAllChange = (e) => {
    const allIds = state.filteredData.map(item => item._id);
    setState(prevState => ({
      ...prevState,
      selectedIds: e.target.checked ? allIds : []
    }));
  };

  const deleteRequest = async () => {
    const { selectedIds, fieldsUser } = state;
    const { marketId, password } = fieldsUser;

    if (!password) {
      message.error("Please enter password");
      return;
    }

    let reqData = {
      marketId,
      _id: selectedIds,
      password,
      isDeleted: true,
      betsType: "fancy",
      deletedRemark: "byCompany"
    };

    setState(prevState => ({ ...prevState, isFetch: true }));
    let updateFancyRes = await httpPost('decision/betsDelete', reqData);
    if (updateFancyRes) {
      message.success(updateFancyRes.message);
      getBetList();
      setState(prevState => ({
        ...prevState,
        updateModal: false,
        fieldsUser: {
          ...prevState.fieldsUser,
          password: ""
        },
        selectedIds: []
      }));
    }
    setState(prevState => ({ ...prevState, isFetch: false }));
  };

  const rollBackRequest = async () => {
    const { selectedIds, fieldsUser } = state;
    const { marketId, password } = fieldsUser;

    if (!password) {
      message.error("Please enter password");
      return;
    }

    let reqData = {
      marketId,
      _id: selectedIds,
      password,
      isDeleted: false,
      betsType: "fancy",
      deletedRemark: "byCompany"
    };

    setState(prevState => ({ ...prevState, isFetch: true }));
    let updateFancyRes = await httpPost('decision/betsDelete', reqData);
    if (updateFancyRes) {
      message.success(updateFancyRes.message);
      getBetList();
      setState(prevState => ({
        ...prevState,
        rollBackModal: false,
        fieldsUser: {
          ...prevState.fieldsUser,
          password: ""
        },
        selectedIds: []
      }));
    }
    setState(prevState => ({ ...prevState, isFetch: false }));
  };

  const handleUpdateModalOpen = () => {
    setState(prevState => ({ ...prevState, updateModal: true }));
  };

  const handleUpdateModalClose = () => {
    setState(prevState => ({
      ...prevState,
      updateModal: false,
      fieldsUser: {
        ...prevState.fieldsUser,
        password: ""
      }
    }));
  };

  const handleRollBackModalOpen = () => {
    setState(prevState => ({ ...prevState, rollBackModal: true }));
  };

  const handleRollBackModalClose = () => {
    setState(prevState => ({
      ...prevState,
      rollBackModal: false,
      fieldsUser: {
        ...prevState.fieldsUser,
        password: ""
      }
    }));
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={handleSelectAllChange}
          checked={
            state.selectedIds.length > 0 &&
            state.selectedIds.length === state.filteredData.length
          }
        />
      ),
      dataIndex: '_id',
      key: 'checkbox',
      render: (id) => (
        <Checkbox
          onChange={() => selectFancy(id)}
          checked={state.selectedIds.includes(id)}
        />
      ),
      width: 50,
    },
    {
      title: 'Sr no.',
      key: 'index',
      render: (text, record, index) => state.offset + index + 1,
      width: 80,
    },
    {
      title: 'Rate',
      dataIndex: 'odds',
      key: 'odds',
      width: 100,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => type === "N" ? "No" : "Yes",
      width: 80,
    },
    {
      title: 'Run',
      dataIndex: 'run',
      key: 'run',
      width: 100,
    },
    {
      title: 'Team',
      dataIndex: 'sessionName',
      key: 'sessionName',
      width: 150,
    },
    {
      title: 'Client',
      key: 'client',
      render: (record) => (
        <span>
          {record.userInfo?.clientCode || 'N/A'}
          {record.userInfo?.clientName && ` (${record.userInfo.clientName})`}
        </span>
      ),
      width: 150,
    },
    {
      title: 'Agent',
      key: 'agent',
      render: (record) => record.userInfo?.creatorName || 'N/A',
      width: 150,
    },
    {
      title: 'Date',
      key: 'date',
      render: (record) => record.createdAt
        ? moment(record.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A")
        : "N/A",
      width: 150,
    },
    {
      title: 'Decision Run',
      dataIndex: 'decisionRun',
      key: 'decisionRun',
      width: 120,
    },
    {
      title: 'Loss',
      key: 'loss',
      render: (record) => Number.parseFloat(Math.abs(record.loss)).toFixed(2),
      width: 100,
    },
    {
      title: 'Profit',
      key: 'profit',
      render: (record) => Number.parseFloat(record.profit).toFixed(2),
      width: 100,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
  ];

  return (
    <Card
      title="Fancy Bets Management"
      loading={state.isFetch}
      extra={
        <Space>
          <span className='gx-text-white gx-px-2'>Total FancyBets: {state.total}</span>
        </Space>
      }
      className="gx-card"
    >
      <div className="gx-px-2 gx-py-2 ">
        <Row className="gx-w-100">
          <Col md={6} xs={24} className='gx-px-1'>
            <Form.Item layout="vertical" wrapperCol={{ span: 24 }} >
              <Input
                name="marketId"
                value={state.fieldsUser.marketId}
                onChange={inputChange}
                placeholder="Enter Market ID"
                allowClear
                className='gx-py-2'

              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className='gx-px-2'>
            <Button
              type="primary"
              size='large'
              onClick={handleMarketIdSubmit}
              loading={state.isFetch}
            >
              Load Data
            </Button>
          </Col>
        </Row>

        {isDataLoaded && (
          <>
            {/* Filter Controls - Grouped 3 per row */}
            <Row >
              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Type
                </div>} layout="vertical" wrapperCol={{ span: 24 }} >
                  <Select
                    value={state.fieldsUser.fancyType}
                    onChange={(value) => handleSelectChange('fancyType', value)}
                    style={{ maxWidth: 300 }}
                  >
                    <Option value="nonDeletedFancy">Non-Deleted Fancy</Option>
                    <Option value="deletedFancy">Deleted Fancy</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Client
                </div>} layout="vertical" wrapperCol={{ span: 24 }}>
                  <Select
                    showSearch
                    placeholder="Select client"
                    optionFilterProp="children"
                    value={state.fieldsUser.clientId}
                    onChange={(value) => handleSelectChange('clientId', value)}
                    // filterOption={(input, option) =>
                    //   (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    // }
                    style={{ maxWidth: 300 }}
                  >
                    <Option value="">All Users</Option>
                    {state.clientList.map(user => (
                      <Option key={user.clientId} value={user.clientId}>
                        {user.userInfo.name} ({user.userInfo.username})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Fancy
                </div>} layout="vertical" wrapperCol={{ span: 24 }}>
                  <Select
                    value={state.fieldsUser.selectionId}
                    onChange={(value) => handleSelectChange('selectionId', value)}
                    style={{ maxWidth: 300 }}
                  >
                    <Option value="">All Fancies</Option>
                    {state.sessionList.map((element, index) => (
                      <Option key={index} value={element.selectionId || "NA"}>
                        {element?.sessionNames[0] || "NA"}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>


              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item layout="vertical" wrapperCol={{ span: 24 }} label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Username
                </div>} >
                  <Input
                    name="username"
                    value={state.fieldsUser.username}
                    onChange={inputChange}
                    placeholder="Enter username"
                    style={{ maxWidth: 300 }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item layout="vertical" wrapperCol={{ span: 24 }} label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Amount Range
                </div>} >
                  <Space>
                    <Input
                      name="minAmt"
                      value={state.fieldsUser.minAmt}
                      onChange={inputChange}
                      placeholder="Min amount"
                      style={{ maxWidth: 145 }}
                    />
                    <span>-</span>
                    <Input
                      name="maxAmt"
                      value={state.fieldsUser.maxAmt}
                      onChange={inputChange}
                      placeholder="Max amount"
                      style={{ maxWidth: 145 }}

                    />
                  </Space>
                </Form.Item>
              </Col>

              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item layout="vertical" wrapperCol={{ span: 24 }} label={<div className="gx-px-2 gx-font-weight-bold gx-fs-md">
                  Page Size
                </div>} >
                  <Select
                    value={state.fieldsUser.size}
                    onChange={(value) => handleSelectChange('size', value)}
                    style={{ maxWidth: 300 }}
                  >
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={30}>30</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                  </Select>
                </Form.Item>

              </Col>

              <Col lg={8} sm={12} xs={24} className="gx-px-5">
                <Button
                  type="primary"
                  onClick={getRangeBetList}
                >
                  Filters
                </Button>
              </Col>

            </Row>




            {/* <Row>
            <Col lg={8} md={8} sm={12} xs={24} className="gx-px-5">
              <Form.Item label="Page Size">
                <Select
                  value={state.fieldsUser.size}
                  onChange={(value) => handleSelectChange('size', value)}
                  style={{ width: '100%' }}
                >
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={30}>30</Option>
                  <Option value={50}>50</Option>
                  <Option value={100}>100</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button 
                type="primary" 
                onClick={getRangeBetList}
              >
                Apply Filters
              </Button>
            </Col>
            
          </Row> */}
            {state.selectedIds.length > 0 && (
              <div style={{ marginTop: 10 }}>
                {state.fieldsUser.fancyType === "deletedFancy" ? (
                  <Button
                    type="primary"
                    onClick={handleRollBackModalOpen}
                  >
                    RollBack Selected ({state.selectedIds.length})
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    danger
                    onClick={handleUpdateModalOpen}
                  >
                    Delete Selected ({state.selectedIds.length})
                  </Button>
                )}
              </div>
            )}
            {/* Table and Modals - Unchanged */}
            <Table className="gx-table-responsive gx-text-uppercase gx-text-nowrap "
              columns={columns}
              dataSource={state.filteredData}
              rowKey="_id"
              rowClassName={(record) =>
                record && record.type === "Y" ? "matchdtailsYesBackground" : "matchdtailsNoBackground"
              }
              pagination={{
                pageSize: state.fieldsUser.size,
                total: state.total,
                current: state.pageNo,
                onChange: handlePageClick,
                showSizeChanger: false
              }}
              scroll={{ x: 1500 }}
              bordered
              size='small'
            />

            {state.updateModal && (
              <Card
                title="Confirm Delete"
                style={{ marginTop: 16 }}
                extra={
                  <Button onClick={handleUpdateModalClose}>Close</Button>
                }
              >
                <Form.Item label="Password" required>
                  <Input.Password
                    name="password"
                    value={state.fieldsUser.password}
                    onChange={inputChange}
                    placeholder="Enter password"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  danger
                  onClick={deleteRequest}
                  loading={state.isFetch}
                >
                  Confirm Delete
                </Button>
              </Card>
            )}

            {state.rollBackModal && (
              <Card
                title="Confirm Rollback"
                style={{ marginTop: 16 }}
                extra={
                  <Button onClick={handleRollBackModalClose}>Close</Button>
                }
              >
                <Form.Item label="Password" required>
                  <Input.Password
                    name="password"
                    value={state.fieldsUser.password}
                    onChange={inputChange}
                    placeholder="Enter password"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={rollBackRequest}
                  loading={state.isFetch}
                >
                  Confirm Rollback
                </Button>
              </Card>
            )}


          </>
        )}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Basic);