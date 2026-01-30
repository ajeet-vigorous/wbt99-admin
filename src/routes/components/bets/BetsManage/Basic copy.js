// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { 
//   message, 
//   Select, 
//   Table, 
//   Card, 
//   Input, 
//   Button, 
//   Checkbox, 
//   Form, 
//   Row, 
//   Col,
//   DatePicker,
//   Space
// } from 'antd';
// import moment from 'moment';
// import { httpGet, httpPost } from '../../../../http/http';

// const { Option } = Select;
// const { RangePicker } = DatePicker;

// class Basic extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       offset: 0,
//       fieldsUser: {
//         marketId: "",
//         selectionId: "",
//         fancyType: "nonDeletedFancy",
//         clientId: "",
//         minAmt: "",
//         maxAmt: "",
//         username: "",
//         password: "",
//         size: 50
//       },
//       errorsUser: {},
//       clientList: [],
//       isFetch: false,
//       keyWord: "",
//       pageNo: 1,
//       fancyBetList: [],
//       sessionList: [],
//       filteredData: [],
//       selectedIds: [],
//       updateModal: false,
//       rollBackModal: false,
//       total: 0,
//       dateRange: []
//     };
//   }

//   inputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState(prevState => ({
//       fieldsUser: {
//         ...prevState.fieldsUser,
//         [name]: value
//       },
//       errorsUser: {
//         ...prevState.errorsUser,
//         [name]: ""
//       }
//     }));
//   };

//   handleSelectChange = (name, value) => {
//     this.setState(prevState => ({
//       fieldsUser: {
//         ...prevState.fieldsUser,
//         [name]: value
//       },
//       errorsUser: {
//         ...prevState.errorsUser,
//         [name]: ""
//       }
//     }), () => {
//       if (name === 'fancyType' || name === 'selectionId' || name === 'clientId') {
//         this.getBetList();
//       }
//     });
//   };

//   handleDateChange = (dates) => {
//     this.setState({
//       dateRange: dates
//     });
//   };

//   handleMarketIdSubmit = () => {
//     const { marketId } = this.state.fieldsUser;
//     if (!marketId) {
//       message.error("Please enter Market ID");
//       return;
//     }
//     this.getClientByMarketId();
//     this.getSessionList();
//     this.getBetList();
//   };

//   getClientByMarketId = async () => {
//     const { marketId } = this.state.fieldsUser;
//     let reqData = { marketId };
//     let clientList = await httpPost("sports/clientListByMarketId", reqData);
//     if (clientList) {
//       this.setState({ clientList: clientList.data });
//     }
//   };

//   getSessionList = async () => {
//     const { marketId } = this.state.fieldsUser;
//     this.setState({ isFetch: true });
    
//     let sessionList = await httpGet(`sports/getSessionList?marketId=${marketId}`);
//     if (sessionList) {
//       const sortedSessions = sessionList?.data?.data?.sort((a, b) => {
//         const startsWithDigit = (str) => /^\d/.test(str);
//         const includesOver = (str) => /OVER/.test(str);
//         const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
//         const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str?.toUpperCase());

//         const nameA = a.sessionNames[0];
//         const nameB = b.sessionNames[0];

//         const isDigitA = startsWithDigit(nameA);
//         const isDigitB = startsWithDigit(nameB);
//         const includesOverA = includesOver(nameA);
//         const includesOverB = includesOver(nameB);
//         const containsFirstA = containsFirst(nameA);
//         const containsFirstB = containsFirst(nameB);

//         if (containsFirstA && !containsFirstB) return 1;
//         if (!containsFirstA && containsFirstB) return -1;

//         if (isDigitA && isDigitB) {
//           if (includesOverA && !includesOverB) return -1;
//           if (!includesOverA && includesOverB) return 1;
//           const numA = getNumericPart(nameA);
//           const numB = getNumericPart(nameB);
//           return numA - numB;
//         }

//         if (isDigitA && !isDigitB) return -1;
//         if (!isDigitA && isDigitB) return 1;

//         return nameA?.localeCompare(nameB);
//       });

//       this.setState({ sessionList: sortedSessions });
//     }
//     this.setState({ isFetch: false });
//   };

//   getBetList = async (size) => {
//     const { 
//       marketId,
//       fancyType,
//       clientId,
//       selectionId,
//       minAmt,
//       maxAmt,
//       username,
//       size: stateSize
//     } = this.state.fieldsUser;

//     let reqData = {
//       marketId,
//       fancyBet: true,
//       isDeleted: fancyType === "deletedFancy" ? 1 : "0",
//       downlineUserId: clientId,
//       downlineUserType: "client",
//       keyWord: this.state.keyWord,
//       pageNo: this.state.pageNo,
//       size: size || stateSize,
//       minAmt: minAmt ? parseInt(minAmt) - 1 : undefined,
//       maxAmt: maxAmt ? parseInt(maxAmt) + 1 : undefined,
//       username,
//       selectionId,
//     };

//     let betList = await httpPost("sports/betsList", reqData);
//     if (betList) {
//       this.setState({
//         fancyBetList: betList.data.fancyBetData,
//         filteredData: betList.data.fancyBetData,
//         total: betList.data.totalFancyCount,
//       });
//     }
//   };

//   getRangeBetList = async () => {
//     await this.getBetList();
//   };

//   handlePageClick = async (page) => {
//     this.setState({ pageNo: page, isFetch: true });
//     await this.getBetList();
//     this.setState({ isFetch: false });
//   };

//   selectFancy = (_id) => {
//     const { selectedIds } = this.state;
//     const newSelectedIds = selectedIds.includes(_id)
//       ? selectedIds.filter(id => id !== _id)
//       : [...selectedIds, _id];
//     this.setState({ selectedIds: newSelectedIds });
//   };

//   handleSelectAllChange = (e) => {
//     const { filteredData } = this.state;
//     const allIds = filteredData.map(item => item._id);
//     this.setState({ 
//       selectedIds: e.target.checked ? allIds : [] 
//     });
//   };

//   deleteRequest = async () => {
//     const { selectedIds, fieldsUser } = this.state;
//     const { marketId, password } = fieldsUser;

//     if (!password) {
//       message.error("Please enter password");
//       return;
//     }

//     let reqData = {
//       marketId,
//       _id: selectedIds,
//       password,
//       isDeleted: true,
//       betsType: "fancy",
//       deletedRemark: "byCompany"
//     };

//     this.setState({ isFetch: true });
//     let updateFancyRes = await httpPost('decision/betsDelete', reqData);
//     if (updateFancyRes) {
//       message.success(updateFancyRes.message);
//       this.getBetList();
//       this.setState({ 
//         updateModal: false,
//         fieldsUser: {
//           ...this.state.fieldsUser,
//           password: ""
//         },
//         selectedIds: []
//       });
//     }
//     this.setState({ isFetch: false });
//   };

//   rollBackRequest = async () => {
//     const { selectedIds, fieldsUser } = this.state;
//     const { marketId, password } = fieldsUser;

//     if (!password) {
//       message.error("Please enter password");
//       return;
//     }

//     let reqData = {
//       marketId,
//       _id: selectedIds,
//       password,
//       isDeleted: false,
//       betsType: "fancy",
//       deletedRemark: "byCompany"
//     };

//     this.setState({ isFetch: true });
//     let updateFancyRes = await httpPost('decision/betsDelete', reqData);
//     if (updateFancyRes) {
//       message.success(updateFancyRes.message);
//       this.getBetList();
//       this.setState({ 
//         rollBackModal: false,
//         fieldsUser: {
//           ...this.state.fieldsUser,
//           password: ""
//         },
//         selectedIds: []
//       });
//     }
//     this.setState({ isFetch: false });
//   };

//   handleUpdateModalOpen = () => {
//     this.setState({ updateModal: true });
//   };

//   handleUpdateModalClose = () => {
//     this.setState({ 
//       updateModal: false,
//       fieldsUser: {
//         ...this.state.fieldsUser,
//         password: ""
//       }
//     });
//   };

//   handleRollBackModalOpen = () => {
//     this.setState({ rollBackModal: true });
//   };

//   handleRollBackModalClose = () => {
//     this.setState({ 
//       rollBackModal: false,
//       fieldsUser: {
//         ...this.state.fieldsUser,
//         password: ""
//       }
//     });
//   };

//   columns = [
//     {
//       title: (
//         <Checkbox
//           onChange={this.handleSelectAllChange}
//           checked={
//             this.state.selectedIds.length > 0 && 
//             this.state.selectedIds.length === this.state.filteredData.length
//           }
//         />
//       ),
//       dataIndex: '_id',
//       key: 'checkbox',
//       render: (id) => (
//         <Checkbox 
//           onChange={() => this.selectFancy(id)} 
//           checked={this.state.selectedIds.includes(id)}
//         />
//       ),
//       width: 50,
//     },
//     {
//       title: 'Sr no.',
//       key: 'index',
//       render: (text, record, index) => this.state.offset + index + 1,
//       width: 80,
//     },
//     {
//       title: 'Rate',
//       dataIndex: 'odds',
//       key: 'odds',
//       width: 100,
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       width: 100,
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: (type) => type === "N" ? "No" : "Yes",
//       width: 80,
//     },
//     {
//       title: 'Run',
//       dataIndex: 'run',
//       key: 'run',
//       width: 100,
//     },
//     {
//       title: 'Team',
//       dataIndex: 'sessionName',
//       key: 'sessionName',
//       width: 150,
//     },
//     {
//       title: 'Client',
//       key: 'client',
//       render: (record) => (
//         <span>
//           {record.userInfo?.clientCode || 'N/A'}
//           {record.userInfo?.clientName && ` (${record.userInfo.clientName})`}
//         </span>
//       ),
//       width: 150,
//     },
//     {
//       title: 'Agent',
//       key: 'agent',
//       render: (record) => record.userInfo?.creatorName || 'N/A',
//       width: 150,
//     },
//     {
//       title: 'Date',
//       key: 'date',
//       render: (record) => record.createdAt 
//         ? moment(record.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A") 
//         : "N/A",
//       width: 150,
//     },
//     {
//       title: 'Decision Run',
//       dataIndex: 'decisionRun',
//       key: 'decisionRun',
//       width: 120,
//     },
//     {
//       title: 'Loss',
//       key: 'loss',
//       render: (record) => Number.parseFloat(Math.abs(record.loss)).toFixed(2),
//       width: 100,
//     },
//     {
//       title: 'Profit',
//       key: 'profit',
//       render: (record) => Number.parseFloat(record.profit).toFixed(2),
//       width: 100,
//     },
//     {
//       title: 'IP',
//       dataIndex: 'ip',
//       key: 'ip',
//       width: 120,
//     },
//   ];

//   render() {
//     const { 
//       fieldsUser, 
//       clientList, 
//       sessionList, 
//       filteredData, 
//       selectedIds, 
//       total,
//       isFetch,
//       updateModal,
//       rollBackModal
//     } = this.state;

//     return (
//       <Card 
//         title="Fancy Bets Management" 
//         loading={isFetch}
//         extra={
//           <Space>
//             <span>Total FancyBets: {total}</span>
//           </Space>
//         }
//       >
//         {/* Market ID Input Section */}
//         <Row gutter={16} style={{ marginBottom: 24 }}>
//           <Col span={8}>
//             <Form.Item label="Market ID" required>
//               <Input
//                 name="marketId"
//                 value={fieldsUser.marketId}
//                 onChange={this.inputChange}
//                 placeholder="Enter Market ID"
//                 allowClear
//               />
//             </Form.Item>
//           </Col>
//           <Col span={4}>
//             <Button 
//               type="primary" 
//               onClick={this.handleMarketIdSubmit}
//               style={{ marginTop: 30 }}
//               loading={isFetch}
//             >
//               Load Data
//             </Button>
//           </Col>
//         </Row>

//         {fieldsUser.marketId && (
//           <>
//             {/* Filter Controls */}
//             <Row gutter={16} style={{ marginBottom: 24 }}>
//               <Col span={6}>
//                 <Form.Item label="Fancy Type">
//                   <Select
//                     value={fieldsUser.fancyType}
//                     onChange={(value) => this.handleSelectChange('fancyType', value)}
//                     style={{ width: '100%' }}
//                   >
//                     <Option value="nonDeletedFancy">Non-Deleted Fancy</Option>
//                     <Option value="deletedFancy">Deleted Fancy</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Form.Item label="Client">
//                   <Select
//                     showSearch
//                     placeholder="Select client"
//                     optionFilterProp="children"
//                     value={fieldsUser.clientId}
//                     onChange={(value) => this.handleSelectChange('clientId', value)}
//                     filterOption={(input, option) =>
//                       (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
//                     }
//                     style={{ width: '100%' }}
//                   >
//                     <Option value="">All Users</Option>
//                     {clientList.map(user => (
//                       <Option key={user.clientId} value={user.clientId}>
//                         {user.userInfo.name} ({user.userInfo.username})
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Form.Item label="Fancy">
//                   <Select
//                     value={fieldsUser.selectionId}
//                     onChange={(value) => this.handleSelectChange('selectionId', value)}
//                     style={{ width: '100%' }}
//                   >
//                     <Option value="">All Fancies</Option>
//                     {sessionList.map((element, index) => (
//                       <Option key={index} value={element.selectionId || "NA"}>
//                         {element?.sessionNames[0] || "NA"}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Form.Item label="Date Range">
//                   <RangePicker 
//                     style={{ width: '100%' }} 
//                     onChange={this.handleDateChange}
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16} style={{ marginBottom: 24 }}>
//               <Col span={6}>
//                 <Form.Item label="Username">
//                   <Input
//                     name="username"
//                     value={fieldsUser.username}
//                     onChange={this.inputChange}
//                     placeholder="Enter username"
//                   />
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Form.Item label="Amount Range">
//                   <Space>
//                     <Input
//                       name="minAmt"
//                       value={fieldsUser.minAmt}
//                       onChange={this.inputChange}
//                       placeholder="Min amount"
//                       style={{ width: 100 }}
//                     />
//                     <span>-</span>
//                     <Input
//                       name="maxAmt"
//                       value={fieldsUser.maxAmt}
//                       onChange={this.inputChange}
//                       placeholder="Max amount"
//                       style={{ width: 100 }}
//                     />
//                   </Space>
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Form.Item label="Page Size">
//                   <Select
//                     value={fieldsUser.size}
//                     onChange={(value) => this.handleSelectChange('size', value)}
//                     style={{ width: '100%' }}
//                   >
//                     <Option value={10}>10</Option>
//                     <Option value={20}>20</Option>
//                     <Option value={30}>30</Option>
//                     <Option value={50}>50</Option>
//                     <Option value={100}>100</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
              
//               <Col span={6}>
//                 <Button 
//                   type="primary" 
//                   onClick={this.getRangeBetList}
//                   style={{ marginTop: 30 }}
//                 >
//                   Apply Filters
//                 </Button>
//               </Col>
//             </Row>

//             {/* Data Table */}
//             <Table
//               columns={this.columns}
//               dataSource={filteredData}
//               rowKey="_id"
//               rowClassName={(record) => 
//                 record && record.type === "Y" ? "blue-row" : "red-row"
//               }
//               pagination={{
//                 pageSize: fieldsUser.size,
//                 total: total,
//                 current: this.state.pageNo,
//                 onChange: this.handlePageClick,
//                 showSizeChanger: false
//               }}
//               scroll={{ x: 1500 }}
//               bordered
//             />

//             {/* Update/Delete Modal */}
//             {updateModal && (
//               <Card 
//                 title="Confirm Delete" 
//                 style={{ marginTop: 16 }}
//                 extra={
//                   <Button onClick={this.handleUpdateModalClose}>Close</Button>
//                 }
//               >
//                 <Form.Item label="Password" required>
//                   <Input.Password
//                     name="password"
//                     value={fieldsUser.password}
//                     onChange={this.inputChange}
//                     placeholder="Enter password"
//                   />
//                 </Form.Item>
//                 <Button 
//                   type="primary" 
//                   danger
//                   onClick={this.deleteRequest}
//                   loading={isFetch}
//                 >
//                   Confirm Delete
//                 </Button>
//               </Card>
//             )}

//             {/* RollBack Modal */}
//             {rollBackModal && (
//               <Card 
//                 title="Confirm Rollback" 
//                 style={{ marginTop: 16 }}
//                 extra={
//                   <Button onClick={this.handleRollBackModalClose}>Close</Button>
//                 }
//               >
//                 <Form.Item label="Password" required>
//                   <Input.Password
//                     name="password"
//                     value={fieldsUser.password}
//                     onChange={this.inputChange}
//                     placeholder="Enter password"
//                   />
//                 </Form.Item>
//                 <Button 
//                   type="primary" 
//                   onClick={this.rollBackRequest}
//                   loading={isFetch}
//                 >
//                   Confirm Rollback
//                 </Button>
//               </Card>
//             )}

//             {/* Action Buttons */}
//             {selectedIds.length > 0 && (
//               <div style={{ marginTop: 16 }}>
//                 {fieldsUser.fancyType === "deletedFancy" ? (
//                   <Button 
//                     type="primary"
//                     onClick={this.handleRollBackModalOpen}
//                   >
//                     RollBack Selected ({selectedIds.length})
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="primary" 
//                     danger
//                     onClick={this.handleUpdateModalOpen}
//                   >
//                     Delete Selected ({selectedIds.length})
//                   </Button>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </Card>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { users } = state;
//   return { users };
// }

// export default connect(mapStateToProps)(Basic);


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
    if (name === 'fancyType' || name === 'selectionId' || name === 'clientId') {
      getBetList();
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
          <span>Total FancyBets: {state.total}</span>
        </Space>
      }
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Form.Item label="Market ID" required>
            <Input
              name="marketId"
              value={state.fieldsUser.marketId}
              onChange={inputChange}
              placeholder="Enter Market ID"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button 
            type="primary" 
            onClick={handleMarketIdSubmit}
            style={{ marginTop: 30 }}
            loading={state.isFetch}
          >
            Load Data
          </Button>
        </Col>
      </Row>

      {state.fieldsUser.marketId && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Form.Item label="Fancy Type">
                <Select
                  value={state.fieldsUser.fancyType}
                  onChange={(value) => handleSelectChange('fancyType', value)}
                  style={{ width: '100%' }}
                >
                  <Option value="nonDeletedFancy">Non-Deleted Fancy</Option>
                  <Option value="deletedFancy">Deleted Fancy</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item label="Client">
                <Select
                  showSearch
                  placeholder="Select client"
                  optionFilterProp="children"
                  value={state.fieldsUser.clientId}
                  onChange={(value) => handleSelectChange('clientId', value)}
                  filterOption={(input, option) =>
                    (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  style={{ width: '100%' }}
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
            
            <Col span={6}>
              <Form.Item label="Fancy">
                <Select
                  value={state.fieldsUser.selectionId}
                  onChange={(value) => handleSelectChange('selectionId', value)}
                  style={{ width: '100%' }}
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
            
            <Col span={6}>
              <Form.Item label="Date Range">
                <RangePicker 
                  style={{ width: '100%' }} 
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Form.Item label="Username">
                <Input
                  name="username"
                  value={state.fieldsUser.username}
                  onChange={inputChange}
                  placeholder="Enter username"
                />
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item label="Amount Range">
                <Space>
                  <Input
                    name="minAmt"
                    value={state.fieldsUser.minAmt}
                    onChange={inputChange}
                    placeholder="Min amount"
                    style={{ width: 100 }}
                  />
                  <span>-</span>
                  <Input
                    name="maxAmt"
                    value={state.fieldsUser.maxAmt}
                    onChange={inputChange}
                    placeholder="Max amount"
                    style={{ width: 100 }}
                  />
                </Space>
              </Form.Item>
            </Col>
            
            <Col span={6}>
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
            
            <Col span={6}>
              <Button 
                type="primary" 
                onClick={getRangeBetList}
                style={{ marginTop: 30 }}
              >
                Apply Filters
              </Button>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={state.filteredData}
            rowKey="_id"
            rowClassName={(record) => 
              record && record.type === "Y" ? "blue-row" : "red-row"
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

          {state.selectedIds.length > 0 && (
            <div style={{ marginTop: 16 }}>
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
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Basic);
