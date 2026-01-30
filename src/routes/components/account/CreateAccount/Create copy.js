// import React, { useEffect, useState } from "react";
// import { Form, Input, Select, Row, Col, Button, Card } from "antd";
// import BackButton from "../../Hoc/BackButton";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserDetails, getUserList, userCreate, userDetailsClear } from "../../../../appRedux/actions/User";
// import Loader from "../../../../components/loader";

// const getDownlineUserType = (param) => {


//   const { userPriority } = param
//   let parentDetailss = userPriority;
//   let downlineUserPriority = (Number(parentDetailss) + 1)

//   if (!downlineUserPriority) {
//     return "";
//   }
//   let downlineUserType = "";
//   switch (downlineUserPriority) {
//     case 9:
//       downlineUserType = "owner"
//       downlineUserPriority = 9
//       break;
//     case 8:
//       downlineUserType = "subowner"
//       downlineUserPriority = 8
//       break;
//     case 7:
//       downlineUserType = "superadmin"
//       downlineUserPriority = 7
//       break;
//     case 6:
//       downlineUserType = "admin"
//       downlineUserPriority = 6
//       break;
//     case 5:
//       downlineUserType = "subadmin"
//       downlineUserPriority = 5
//       break;
//     case 4:
//       downlineUserType = "master"
//       downlineUserPriority = 4
//       break;
//     case 3:
//       downlineUserType = "superagent"
//       downlineUserPriority = 3
//       break;
//     case 2:
//       downlineUserType = "agent"
//       downlineUserPriority = 2
//       break;
//     case 1:
//       downlineUserType = "client"
//       downlineUserPriority = 1
//       break;
//     default:
//       break;
//   }
//   return downlineUserType;
// };

// const { Option } = Select;
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

// const Create = () => {
//   const [form] = Form.useForm();
//   const { userType, userId, userPriority } = useParams();
//   const userData = JSON.parse(localStorage.getItem('user_id'));
//   const [showForm, setShowForm] = useState(false);
//   const [showSelectUser, setSelectUser] = useState(true);

//   const [userLists, setUserLists] = useState([]);
//   const [parentDetails, setParentDetails] = useState({});
//   const [fieldsUser, setFieldsUser] = useState({
//     password: '',
//     mobile: '',
//     name: '',
//     userMatchShare: '',
//     userCasinoShare: '',
//     matkaShare: '',
//     matchCommission: '',
//     sessionCommission: '',
//     intCasinoExpoLimit: '',
//     intCasinoShare: '',
//     intCasinoMultiply: '',
//     intCasinoStatus: false,
//     commissionType: '',
//     commissionChangeType: '',

//     casinoCommission: '',
//     matkaCommission: '',
//     coins: '',
//     mycoins: '',
//     reference: '',
//     commChangeType: '',
//     maxCommValue: '',
//     casinoStatus: false,
//     selectDomain: [],
//     userPriority: userId,
//     myShowMatchShare: '',
//   });

//   const dispatch = useDispatch()
//   const { loading, userListItems, userDetails } = useSelector(state => state.UserReducer);

//   useEffect(() => {
//     dispatch(userDetailsClear())
//     setShowForm(false)
//     const userValue = userData?.data?.userPriority - 1;
//     if (userValue === userId) {
//      // if === equal not working then use ==
//       // setShowForm(true);
//       setSelectUser(false);
//       onChange(userData?.data?.userId)
//     }
//     const uplineUser = getDownlineUserType({ userType, userId, userPriority });


//     const getUserListFun = async () => {
//       let reqData = {
//         "sortData": {
//           "createdAt": 1
//         },
//         "specific": {
//           "username": 1,
//           "name": 1,
//           "userId": 1
//         },
//         "status": 1,
//         "downlineUserType": uplineUser
//       };

//       dispatch(getUserList(reqData))
//     };
//     getUserListFun();
//   }, [userData?.data.userType, userType, dispatch]);


//   async function onChange(userId) {

//     form.resetFields();
//     let parentreqBody = {
//       "userId": userId
//     }
//     setShowForm(false)
//     setParentDetails({})

//     dispatch(getUserDetails(parentreqBody))
//   }

//   useEffect(() => {
//     setParentDetails({})
//     if (userListItems) {
//       const filteredData = userListItems?.map(item => ({
//         key: item.userId,
//         username: item.username,
//         name: item.name,
//         userType: item.userType,
//         userPriority: item.userPriority,
//       }));
//       setUserLists(filteredData);
//       setShowForm(false)
//       form.resetFields();
//     }
//     if (userDetails) {
//       setParentDetails(userDetails)
//       setShowForm(true)
//     }
//   }, [userListItems, userDetails])





//   const onFinish = async (values) => {
//     const updatedFieldsUser = {
//       ...fieldsUser,
//       password: values.password,
//       mobile: values.mobile,
//       name: values.name,
//       userMatchShare: values.userMatchShare,
//       userCasinoShare: values.userCasinoShare,
//       matkaShare: values.matkaShare,
//       matchCommission: values.matchCommission,
//       sessionCommission: values.sessionCommission,
//       intCasinoExpoLimit: values.intCasinoExpoLimit,
//       intCasinoShare: values.intCasinoShare,
//       intCasinoMultiply: values.intCasinoMultiply,
//       intCasinoStatus: values.intCasinoStatus,
//       commissionType: values.commissionType,
//       commissionChangeType: values.commissionChangeType,
//       casinoCommission: values.casinoCommission,
//       matkaCommission: values.matkaCommission,
//       coins: values.coins,
//       reference: values.reference,
//       commChangeType: values.commChangeType,
//       maxCommValue: values.maxCommValue,
//       casinoStatus: values.casinoStatus,
//       selectDomain: values.selectDomain,
//     };

//     setFieldsUser(updatedFieldsUser);

//     // Make sure userCreateData has all required fields populated
//     const userCreateData = {
//       parentId: parentDetails?.userId || null,
//       password: updatedFieldsUser.password,
//       mobile: updatedFieldsUser.mobile,
//       name: updatedFieldsUser.name,
//       userType: userType,
//       status: 1,
//       matchShare: userType === "client" ? parentDetails?.userMatchShare : updatedFieldsUser.userMatchShare,
//       casinoShare: userType === "client" ? parentDetails?.userCasinoShare : updatedFieldsUser.userCasinoShare,
//       casinoStatus: userType === "client" ? updatedFieldsUser.casinoStatus : true,
//       matkaShare: userType === "client" ? parentDetails?.userMatkaShare : 0,

//       matchCommission: updatedFieldsUser.commissionType === "NoCommission" ? 0 : updatedFieldsUser.matchCommission,
//       sessionCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : updatedFieldsUser.sessionCommission,
//       matkaCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : 0,

//       intCasinoExpoLimit: updatedFieldsUser.intCasinoStatus ? updatedFieldsUser.intCasinoExpoLimit : 0,
//       intCasinoShare: updatedFieldsUser.intCasinoStatus ? updatedFieldsUser.intCasinoShare : 0,
//       intCasinoMultiply: updatedFieldsUser.intCasinoStatus && parentDetails?.userPriority > 7 ? updatedFieldsUser.intCasinoMultiply : parentDetails?.intCasinoMultiply,
//       intCasinoStatus: updatedFieldsUser.intCasinoStatus ? updatedFieldsUser.intCasinoStatus : false,
//       commissionType: updatedFieldsUser.commissionType,
//       casinoCommission: updatedFieldsUser.casinoCommission,
//       coins: updatedFieldsUser.coins,
//       reference: updatedFieldsUser.reference,
//       creditReference: 0,
//       commChangeType: updatedFieldsUser.commissionChangeType,
//       maxCommValue: updatedFieldsUser.commissionChangeType === "change" ? updatedFieldsUser.maxCommValue : 0,
//       betStatus: true,
//       matchStatus: true,
//       matkaStatus: true,
//       transactionPassword: "1122",
//       allowedDomains: userType === "subowner" ? updatedFieldsUser.selectDomain : null,
//     };

//     dispatch(userCreate(userCreateData));
//     form.resetFields();

//   };

//   function handleInputChange(key, value) {
//     setFieldsUser(prevState => ({ ...prevState, [key]: value }));
//   }


//   const validateCoins = (parentCoins, name) => async (_, value) => {
//     // if (value !== undefined && parentCoins !== undefined) {
//     if (value > parentCoins) {
//       throw new Error(`${name} must be less than ${parentCoins}`);
//     }
//     // }
//   };

//   return (
//     <>
//       {showSelectUser && (
//         <Card className="gx-card">
//           <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
//             <div className="gx-fs-xxl gx-text-white gx-bg-flex gx-justify-center gx-items-center">Select Upline</div>
//           </div>
//           <div className="gx-px-5 gx-py-2 gx-bg-flex gx-justify-content-center">
//             <Select
//               showSearch
//               placeholder="Select a person"
//               optionFilterProp="children"
//               onChange={value => onChange(value)}
//               className="gx-border-redius0"
//               style={{ width: 300 }}
//               getPopupContainer={trigger => trigger.parentElement}

//             >
//               {userLists && userLists?.length > 0 ? userLists?.map(user => (
//                 <Option key={user.key} value={user.key} label={`${user.name} ${user.username}`} >
//                   {user.username}-{user.name}
//                 </Option>
//               )) : null}

//             </Select>
//           </div>
//         </Card>

//       )}
//       <>

//         {loading ? <Loader props={loading} /> :
//           <>
//             {loading === false && showForm && (
//               <Card className="gx-card">
//                 <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
//                   <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">Create {userType}</span>
//                   <BackButton />
//                 </div>
//                 <Form
//                   className="gx-py-4 gx-px-2"
//                   {...formItemLayout}
//                   form={form}
//                   name="register"
//                   onFinish={onFinish}
//                   scrollToFirstError
//                 >
//                   <Row className="gx-bg-flex">
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="name"
//                         label="Name"
//                         labelAlign="left"
//                         rules={[{ required: true, message: "Please input your name!", }]}

//                       >
//                         <Input placeholder='Enter full name' className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>

//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="reference"
//                         label="Reference"
//                         labelAlign="left"
//                         rules={[{ required: true, message: "Please input your reference!" },
//                         ]}
//                       >
//                         <Input placeholder='Enter reference' className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row className="gx-bg-flex">
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="mycoins"
//                         label="My Coins"
//                         labelAlign="left"
//                         initialValue={parentDetails?.coins?.toFixed(2)}

//                         rules={[{ required: true }]}
//                       >
//                         <Input disabled className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>

//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="coins"
//                         label="Coins"
//                         labelAlign="left"
//                         rules={[
//                           // {
//                           //   validator: async (_, value) => {
//                           //     if (value && parentDetails?.coins) {
//                           //       if (value > parentDetails.coins) {
//                           //         throw new Error(`Coins must be less than ${parentDetails.coins}`);
//                           //       }
//                           //     }
//                           //   },
//                           // },
//                           { validator: validateCoins(parentDetails?.coins, "Coins") },
//                           { required: true, message: "Please input your coins!" },
//                         ]}
//                       >
//                         <Input placeholder={`${userType} coins`} className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row className="gx-bg-flex">
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="mobile"
//                         label="Contact No"
//                         labelAlign="left"
//                         rules={[{ required: true, message: "Please input your Contact Number", }]}
//                       >
//                         <Input placeholder="Enter mobile number" className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="password"
//                         label="Password"
//                         labelAlign="left"
//                         rules={[{ required: true, message: "Please input your Password", }]}
//                       >
//                         <Input placeholder='Password' className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>
//                   </Row>

//                   {userType === "client" ? null
//                     :
//                     <>
//                       <Row className="gx-bg-flex">
//                         {/* <Col md={12} xs={24}>
//                           <Form.Item
//                             name="selectDomain"
//                             label="Select Domain"
//                             labelAlign="left"
//                             rules={[{ required: true, message: "Please select your share type!" }]}
//                           >
//                             <Select
//                               mode="multiple"
//                               placeholder="Select"
//                               className="gx-border-redius0"
//                               getPopupContainer={trigger => trigger.parentElement}
//                             >
//                               {parentDetails?.allowedDomains?.map((item, index) => (
//                                 <Option key={index} value={item} className="gx-border-redius0">
//                                   {item}
//                                 </Option>
//                               ))}
//                             </Select>
//                           </Form.Item>
//                         </Col> */}


//                         <Col md={12} xs={24}>
//                           <Form.Item
//                             name="commissionChangeType"
//                             label="Share Type"
//                             labelAlign="left"
//                             rules={[{ required: true, message: "Please select your share type!", }]}
//                           >
//                             <Select placeholder="Select share type"
//                               getPopupContainer={trigger => trigger.parentElement}
//                               onChange={(value) => handleInputChange('commissionChangeType', value)} className="gx-border-redius0">
//                               <Option value="fixed">Fixed</Option>
//                               <Option value="changed">Changed</Option>
//                             </Select>
//                           </Form.Item>
//                         </Col>
//                       </Row>

//                       {fieldsUser?.commissionChangeType === "" || fieldsUser?.commissionChangeType === "fixed" ? null :
//                         <Row className="gx-bg-flex">
//                           <Col md={12} xs={24}>
//                             <Form.Item
//                               name="maxCommValue"
//                               label="Maximum Commission value: "
//                               labelAlign="left"
//                               rules={[{ required: true, message: "Please input your Maximum Commission value!" }]}
//                             >
//                               <Input placeholder={`${userType} maxCommValue`} className="gx-border-redius0" />
//                             </Form.Item>
//                           </Col>
//                         </Row>
//                       }
//                     </>
//                   }

//                   <h1><span style={{ textTransform: "capitalize" }}> {userType}</span> Match Share And Commission</h1>

//                   {userType === "client" ? null
//                     :
//                     <Row className="gx-bg-flex">
//                       <Col md={12} xs={24}>
//                         <Form.Item
//                           name="myShowMatchShare"
//                           label="My Match Share"
//                           labelAlign="left"
//                           initialValue={parentDetails?.userMatchShare}

//                         >
//                           <Input disabled className="gx-border-redius0" />
//                         </Form.Item>
//                       </Col>


//                       <Col md={12} xs={24}>
//                         <Form.Item
//                           name="userMatchShare"
//                           label="Match Share (%)"
//                           labelAlign="left"
//                           rules={[
//                             { validator: validateCoins(parentDetails?.userMatchShare, "Match Share ") },
//                             { required: true, message: "Please input your match share!" }]}
//                         >
//                           <Input placeholder={`${userType} Match Share`} className="gx-border-redius0" />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                   }
//                   <Row className="gx-bg-flex">
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="mycommissionType"
//                         label="My Comm Type"
//                         labelAlign="left"
//                         initialValue={parentDetails?.userCommissionType}

//                       >
//                         <Input disabled className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>


//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="commissionType"
//                         label="Comm Type"
//                         labelAlign="left"
//                         rules={[{ required: true, message: "Please select your commission type!" }]}
//                       >
//                         <Select
//                           placeholder="Commission Type"
//                           onChange={(value) => handleInputChange('commissionType', value)}
//                           getPopupContainer={trigger => trigger.parentElement}
//                         >
//                           <Option value="NoCommission">No Comm</Option>
//                           <Option value="BetByBet">Bet by Bet</Option>
//                         </Select>
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   {fieldsUser?.commissionType === "" || fieldsUser?.commissionType === "NoCommission" ? null :
//                     <>
//                       <Row className="gx-bg-flex">
//                         <Col md={12} xs={24}>
//                           <Form.Item
//                             name="mymatchCommission"
//                             label="My Match Comm(%)"
//                             labelAlign="left"
//                             initialValue={parentDetails?.userMatchCommission}
//                           >
//                             <Input disabled className="gx-border-redius0" />
//                           </Form.Item>
//                         </Col>


//                         <Col md={12} xs={24}>
//                           <Form.Item
//                             name="matchCommission"
//                             label="Match Comm (%)"
//                             labelAlign="left"
//                             rules={[
//                               { validator: validateCoins(parentDetails?.userMatchCommission, "Match Commission ") },
//                               { required: true, message: "Please input your match Commission!" }]}
//                           >
//                             <Input placeholder={`${userType} Match Commission`} className="gx-border-redius0" />
//                           </Form.Item>
//                         </Col>
//                       </Row>
//                       <Row className="gx-bg-flex">
//                         <Col md={12} xs={24}>
//                           <Form.Item
//                             name="mySessCommission"
//                             label="My Sess Comm(%)"
//                             labelAlign="left"
//                             initialValue={parentDetails?.userSessionCommission}
//                           >
//                             <Input disabled className="gx-border-redius0" />
//                           </Form.Item>
//                         </Col>



//                         <Col md={12} xs={24}>
//                           <Form.Item
//                             name="sessionCommission"
//                             label="Sess Comm(%)"
//                             labelAlign="left"
//                             rules={[
//                               { validator: validateCoins(parentDetails?.userMatchCommission, "Session Commission ") },
//                               { required: true, message: "Please input your Sess Commission!", }]}
//                           >
//                             <Input placeholder={`${userType} Session Commission`} className="gx-border-redius0" />
//                           </Form.Item>
//                         </Col>
//                       </Row>
//                     </>}

//                   <h1><span style={{ textTransform: "capitalize" }}> {userType} </span> Casino Share And Commission</h1>

//                   {userType === "client" ? null :
//                     <Row className="gx-bg-flex">
//                       <Col md={12} xs={24}>
//                         <Form.Item
//                           name="mycasinoshare"
//                           label="My Casino Share (%)"
//                           labelAlign="left"
//                           initialValue={parentDetails?.userCasinoShare}
//                         // rules={[{ required: true, message: "Please input your casino share!", }]}
//                         >
//                           <Input disabled className="gx-border-redius0" />
//                         </Form.Item>
//                       </Col>


//                       <Col md={12} xs={24}>
//                         <Form.Item
//                           name="userCasinoShare"
//                           label="Casino Share (%) "
//                           labelAlign="left"
//                           rules={[
//                             { validator: validateCoins(parentDetails?.userCasinoShare, "Casino Share ") },
//                             { required: true, message: "Please input your casino share!" }]}
//                         >
//                           <Input placeholder={`${userType} casino share`} className="gx-border-redius0" />
//                         </Form.Item>
//                       </Col>
//                     </Row>}

//                   <Row className="gx-bg-flex">
//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="mycasinocomm"
//                         label="My Casino Comm (%) "
//                         labelAlign="left"
//                         initialValue={parentDetails?.userCasinoCommission}
//                       // rules={[{ required: true, message: "Please input your casino commission!", }]}
//                       >
//                         <Input disabled className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>


//                     <Col md={12} xs={24}>
//                       <Form.Item
//                         name="casinoCommission"
//                         label="Casino Comm (%)"
//                         labelAlign="left"
//                         rules={[
//                           { validator: validateCoins(parentDetails?.userCasinoCommission, "Casino Commission ") },
//                           { required: true, message: "Please input your casino commission!" },]}
//                       >
//                         <Input placeholder={`casino Commission`} className="gx-border-redius0" />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row className="gx-bg-flex gx-px-3 gx-justify-content-end">
//                     <Form.Item>
//                       <Button type="primary" htmlType="submit" className="gx-border-redius0" >
//                         Submit
//                       </Button>
//                     </Form.Item>
//                   </Row>
//                 </Form>
//               </Card >
//             )}
//           </>
//         }
//       </>

//     </>
//   );
// };
// export default Create;


import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Button, Card, Switch } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserList, userCreate, userDetailsClear, userDominList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { internationalCasino } from "../../../../constants/global";


const getDownlineUserType = (param) => {


  const { userPriority } = param
  let parentDetailss = userPriority;
  let downlineUserPriority = (Number(parentDetailss) + 1)

  if (!downlineUserPriority) {
    return "";
  }
  let downlineUserType = "";
  switch (downlineUserPriority) {
    case 9:
      downlineUserType = "owner"
      downlineUserPriority = 9
      break;
    case 8:
      downlineUserType = "subowner"
      downlineUserPriority = 8
      break;
    case 7:
      downlineUserType = "superadmin"
      downlineUserPriority = 7
      break;
    case 6:
      downlineUserType = "admin"
      downlineUserPriority = 6
      break;
    case 5:
      downlineUserType = "subadmin"
      downlineUserPriority = 5
      break;
    case 4:
      downlineUserType = "master"
      downlineUserPriority = 4
      break;
    case 3:
      downlineUserType = "superagent"
      downlineUserPriority = 3
      break;
    case 2:
      downlineUserType = "agent"
      downlineUserPriority = 2
      break;
    case 1:
      downlineUserType = "client"
      downlineUserPriority = 1
      break;
    default:
      break;
  }
  return downlineUserType;
};

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Create = () => {
  const [form] = Form.useForm();
  const { userType, userId, userPriority } = useParams();
  const userData = JSON.parse(localStorage.getItem('user_id'));
  const [showForm, setShowForm] = useState(false);
  const [showSelectUser, setSelectUser] = useState(true);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [userLists, setUserLists] = useState([]);
  const [parentDetails, setParentDetails] = useState({});
  const [fieldsUser, setFieldsUser] = useState({
    password: '',
    mobile: '',
    name: '',
    userMatchShare: '',
    userCasinoShare: '',
    matkaShare: '',
    matchCommission: '',
    sessionCommission: '',
    intCasinoExpoLimit: '',
    intCasinoShare: '',
    intCasinoMultiply: '',
    intCasinoStatus: '',
    commissionType: '',
    commissionChangeType: '',
    casinoCommission: '',
    matkaCommission: '',
    coins: '',
    mycoins: '',
    reference: '',
    commChangeType: '',
    maxCommValue: '',
    casinoStatus: false,
    selectDomain: [],
    userPriority: userId,
    myShowMatchShare: '',
  });

  const dispatch = useDispatch()
  const { loading, userListItems, userDetails, checkRedirect, domainListData } = useSelector(state => state.UserReducer);
  const history = useHistory()


  useEffect(() => {
    if (checkRedirect) {

      history.push(`/components/general/button-${userType}/${userId}/${userPriority}`)
    }
  }, [checkRedirect])

  useEffect(() => {
    dispatch(userDetailsClear())
    setShowForm(false)
    const userValue = userData?.data?.userPriority - 1;
    if (userValue == userId) {
      // setShowForm(true);
      setSelectUser(false);
      onChange(userData?.data?.userId)
    }
    const uplineUser = getDownlineUserType({ userType, userId, userPriority });


    const getUserListFun = async () => {
      let reqData = {
        "sortData": {
          "createdAt": 1
        },
        "specific": {
          "username": 1,
          "name": 1,
          "userId": 1
        },
        "status": 1,
        "downlineUserType": uplineUser
      };

      dispatch(getUserList(reqData))
      dispatch(userDominList())
    };
    getUserListFun();
  }, [userData?.data.userType, userType]);


  async function onChange(userId) {

    form.resetFields();
    let parentreqBody = {
      "userId": userId
    }
    setShowForm(false)
    setParentDetails({})

    dispatch(getUserDetails(parentreqBody))
  }

  useEffect(() => {
    setParentDetails({})
    if (userListItems) {
      const filteredData = userListItems?.map(item => ({
        key: item.userId,
        username: item.username,
        name: item.name,
        userType: item.userType,
        userPriority: item.userPriority,
      }));
      setUserLists(filteredData);
      setShowForm(false)
      form.resetFields();
    }
    if (userDetails) {
      setParentDetails(userDetails)
      setShowForm(true)
    }
  }, [userListItems, userDetails])



  const handleToggle = (checked) => {
    setToggleStatus(checked);
    setFieldsUser(prevFields => ({
      ...prevFields,
      intCasinoStatus: checked
    }));
  };

  const onFinish = async (values) => {

    const updatedFieldsUser = {
      ...fieldsUser,
      password: values.password,
      mobile: values.mobile,
      name: values.name,
      userMatchShare: values.userMatchShare,
      userCasinoShare: values.userCasinoShare,
      matkaShare: values.matkaShare,
      matchCommission: values.matchCommission,
      sessionCommission: values.sessionCommission,
      intCasinoExpoLimit: values.intCasinoExpoLimit,
      intCasinoShare: values.intCasinoShare,
      intCasinoMultiply: values.intCasinoMultiply,
      intCasinoStatus: values.intCasinoStatus,
      commissionType: values.commissionType,
      commissionChangeType: values.commissionChangeType,
      casinoCommission: values.casinoCommission,
      matkaCommission: values.matkaCommission,
      coins: values.coins,
      reference: values.reference,
      commChangeType: values.commChangeType,
      maxCommValue: values.maxCommValue,
      casinoStatus: values.casinoStatus,
      selectDomain: values.selectDomain,
    };

    setFieldsUser(updatedFieldsUser);

    // Make sure userCreateData has all required fields populated
    const userCreateData = {
      parentId: parentDetails?.userId || null,
      password: updatedFieldsUser.password,
      mobile: updatedFieldsUser.mobile,
      name: updatedFieldsUser.name,
      userType: userType,
      status: 1,
      matchShare: userType === "client" ? parentDetails?.userMatchShare : updatedFieldsUser.userMatchShare,
      casinoShare: userType === "client" ? parentDetails?.userCasinoShare : updatedFieldsUser.userCasinoShare,
      casinoStatus: userType === "client" ? updatedFieldsUser.casinoStatus : true,
      matkaShare: userType === "client" ? parentDetails?.userMatkaShare : 0,

      matchCommission: updatedFieldsUser.commissionType === "NoCommission" ? 0 : updatedFieldsUser.matchCommission,
      sessionCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : updatedFieldsUser.sessionCommission,
      matkaCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : 0,

      intCasinoExpoLimit: updatedFieldsUser.intCasinoStatus ? updatedFieldsUser.intCasinoExpoLimit : 0,
      intCasinoShare: updatedFieldsUser.intCasinoShare ? updatedFieldsUser.intCasinoShare : 0,
      intCasinoMultiply: updatedFieldsUser.intCasinoStatus && parentDetails?.userPriority > 7 ? updatedFieldsUser.intCasinoMultiply : parentDetails?.intCasinoMultiply,
      intCasinoStatus: userType === "client" ? true : updatedFieldsUser.intCasinoStatus ? updatedFieldsUser.intCasinoStatus : false,
      commissionType: updatedFieldsUser.commissionType,
      casinoCommission: updatedFieldsUser.casinoCommission,
      coins: updatedFieldsUser.coins,
      reference: updatedFieldsUser.reference,
      creditReference: 0,
      commChangeType: updatedFieldsUser.commissionChangeType,
      maxCommValue: updatedFieldsUser.commissionChangeType === "change" ? updatedFieldsUser.maxCommValue : 0,
      betStatus: true,
      matchStatus: true,
      matkaStatus: true,
      transactionPassword: "1122",
      allowedDomains: userType === "subowner" ? updatedFieldsUser.selectDomain : null,

      // decimalvalue
    };

    dispatch(userCreate(userCreateData));
    // console.log(userCreateData, "ggggggggg111");
    form.resetFields();

  };


  function handleInputChange(key, value) {
    setFieldsUser(prevState => ({ ...prevState, [key]: value }));
  }


  // const validateCoins = (parentCoins, name) => async (_, value) => {

  //   // if (value !== undefined && parentCoins !== undefined) {
  //   if (!value || !/^\d+$/.test(value)) {
  //     throw new Error("Please enter a valid non-negative number");
  //   }
  //   if (value > parentCoins) {
  //     throw new Error(`${name} must be less than ${parentCoins}`);
  //   }
  //   // }
  // };

  const validateCoins = (parentCoins, name) => async (_, value) => {
    const decimalCheck = /^-?\d*\.?\d{0,1}$/;
    if (!decimalCheck.test(value)) {
      throw new Error(`${name} must have at most one digit after the decimal point`);
    }
    if (value > parentCoins) {
      throw new Error(`${name} must be less than ${parentCoins}`);
    }
  };

  const validateName = (_, value) => {
    // if (!value) {
    //   return Promise.reject(new Error('Please input your name!'));
    // }
    
    const nameCheck = /^[a-zA-Z0-9\s]+$/;
    if (!nameCheck.test(value)) {
      return Promise.reject(new Error('Name can only contain letters, numbers.'));
    }
    
    return Promise.resolve();
  };
  return (
    <>

      {showSelectUser && (
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
            <div className="gx-fs-xxl gx-text-white gx-bg-flex gx-justify-center gx-items-center">Select Upline</div>
          </div>
          <div className="gx-px-5 gx-py-2 gx-bg-flex gx-justify-content-center">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={value => onChange(value)}
              className="gx-border-redius0"
              style={{ width: 300 }}
              // getPopupContainer={trigger => trigger.parentElement}

            >
              {userLists && userLists?.length > 0 ? userLists?.map(user => (
                <Option key={user.key} value={user.key} label={`${user.name} ${user.username}`} >
                  {user.username}-{user.name}
                </Option>
              )) : null}

            </Select>
          </div>
        </Card>

      )}
      <>

        {loading ? <Loader props={loading} /> :
          <>
            {loading === false && showForm && (
              <Card className="gx-card">
                <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
                  <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">Create {userType}</span>
                  <BackButton />
                </div>
                <Form
                  className="gx-py-4 gx-px-2"
                  {...formItemLayout}
                  form={form}
                  onFinish={onFinish}
                  name="register"

                  scrollToFirstError
                >
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="name"
                        label="Name"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your name!", },
                        { validator: validateName},

                        ]}

                      >
                        <Input placeholder='Enter full name' className="gx-border-redius0" />
                      </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                      <Form.Item
                        name="reference"
                        label="Reference"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your reference!" },
                        ]}
                      >
                        <Input placeholder='Enter reference' className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mycoins"
                        label="My Coins"
                        labelAlign="left"
                        initialValue={parentDetails?.coins?.toFixed(2)}

                        rules={[{ required: true }]}
                      >
                        <Input disabled className="gx-border-redius0" />
                      </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                      <Form.Item
                        name="coins"
                        label="Coins"
                        labelAlign="left"
                        rules={[
                          // {
                          //   validator: async (_, value) => {
                          //     if (value && parentDetails?.coins) {
                          //       if (value > parentDetails.coins) {
                          //         throw new Error(`Coins must be less than ${parentDetails.coins}`);
                          //       }
                          //     }
                          //   },
                          // },
                          { validator: validateCoins(parentDetails?.coins, "Coins") },
                          { required: true, message: "Please input your coins!" },
                        ]}
                      >
                        <Input placeholder={`${userType} coins`} className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mobile"
                        label="Contact No"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your Contact Number", }]}
                      >
                        <Input placeholder="Enter mobile number" className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="password"
                        label="Password"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your Password", }]}
                      >
                        <Input placeholder='Password' className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {userType === "client" ? null
                    :
                    <>
                      <Row className="gx-bg-flex">

                        {userType !== "subowner" ? null :
                          <Col md={12} xs={24}>
                            <Form.Item
                              name="selectDomain"
                              label="Select Domain"
                              labelAlign="left"
                              rules={[{ required: true, message: "Please select Domains!" }]}
                            >
                              <Select
                                mode="multiple"
                                placeholder="Select"
                                className="gx-border-redius0"
                                // getPopupContainer={trigger => trigger.parentElement}
                              >
                                {domainListData?.map((item, index) => (
                                  <Option key={index} value={item?.domainUrl} className="gx-border-redius0">
                                    {item?.domainUrl}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>}


                        <Col md={12} xs={24}>
                          <Form.Item
                            name="commissionChangeType"
                            label="Share Type"
                            labelAlign="left"
                            rules={[{ required: true, message: "Please select your share type!", }]}
                          >
                            <Select placeholder="Select share type"
                              // getPopupContainer={trigger => trigger.parentElement}
                              onChange={(value) => handleInputChange('commissionChangeType', value)} className="gx-border-redius0">
                              <Option value="fixed">Fixed</Option>
                              <Option value="changed">Change</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* {fieldsUser?.commissionChangeType === "" || fieldsUser?.commissionChangeType === "fixed" ? null :
                        <Row className="gx-bg-flex">
                    
                            <Form.Item
                              name="maxCommValue"
                              label="Maximum Commission value: "
                              labelAlign="left"
                              rules={[{ required: true, message: "Please input your Maximum Commission value!" }]}
                            >
                              <Input placeholder={`${userType} maxCommValue`} className="gx-border-redius0" />
                            </Form.Item>
                        
                        </Row>
                      } */}
                    </>
                  }

                  <h1><span style={{ textTransform: "capitalize" }}> {userType}</span> Match Share And Commission</h1>

                  {userType === "client" ? null
                    :
                    <Row className="gx-bg-flex">
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="myShowMatchShare"
                          label="My Match Share"
                          labelAlign="left"
                          initialValue={parentDetails?.userMatchShare}

                        >
                          <Input disabled className="gx-border-redius0" />
                        </Form.Item>
                      </Col>


                      <Col md={12} xs={24}>
                        <Form.Item
                          name="userMatchShare"
                          label="Match Share (%)"
                          labelAlign="left"
                          rules={[
                            { validator: validateCoins(parentDetails?.userMatchShare, "Match Share ") },
                            { required: true, message: "Please input your match share!" }]}
                        >
                          <Input placeholder={`${userType} Match Share`} className="gx-border-redius0" />
                        </Form.Item>
                      </Col>
                    </Row>
                  }
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mycommissionType"
                        label="My Comm Type"
                        labelAlign="left"
                        initialValue={parentDetails?.userCommissionType}

                      >
                        <Input disabled className="gx-border-redius0" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={24}>
                      <Form.Item
                        name="commissionType"
                        label="Comm Type"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please select your commission type!" }]}
                      >
                        <Select
                          placeholder="Commission Type"
                          onChange={(value) => handleInputChange('commissionType', value)}
                          // getPopupContainer={trigger => trigger.parentElement}
                        >
                          <Option value="NoCommission">No Comm</Option>
                          <Option value="BetByBet">Bet by Bet</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {fieldsUser?.commissionType === "" || fieldsUser?.commissionType === "NoCommission" ? null :
                    <>
                      <Row className="gx-bg-flex">
                        <Col md={12} xs={24}>
                          <Form.Item
                            name="mymatchCommission"
                            label="My Match Comm(%)"
                            labelAlign="left"
                            initialValue={parentDetails?.userMatchCommission}
                          >
                            <Input disabled className="gx-border-redius0" />
                          </Form.Item>
                        </Col>


                        <Col md={12} xs={24}>
                          <Form.Item
                            name="matchCommission"
                            label="Match Comm (%)"
                            labelAlign="left"
                            rules={[
                              { validator: validateCoins(parentDetails?.userMatchCommission, "Match Commission ") },
                              { required: true, message: "Please input your match Commission!" }]}
                          >
                            <Input placeholder={`${userType} Match Commission`} className="gx-border-redius0" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row className="gx-bg-flex">
                        <Col md={12} xs={24}>
                          <Form.Item
                            name="mySessCommission"
                            label="My Sess Comm(%)"
                            labelAlign="left"
                            initialValue={parentDetails?.userSessionCommission}
                          >
                            <Input disabled className="gx-border-redius0" />
                          </Form.Item>
                        </Col>

                        <Col md={12} xs={24}>
                          <Form.Item
                            name="sessionCommission"
                            label="Sess Comm(%)"
                            labelAlign="left"
                            rules={[
                              { validator: validateCoins(parentDetails?.userSessionCommission, "Session Commission ") },
                              { required: true, message: "Please input your Sess Commission!", }]}
                          >
                            <Input placeholder={`${userType} Session Commission`} className="gx-border-redius0" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>}

                  <h1><span style={{ textTransform: "capitalize" }}> {userType} </span> Casino Share And Commission</h1>

                  {userType === "client" ? null :
                    <Row className="gx-bg-flex">
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="mycasinoshare"
                          label="My Casino Share (%)"
                          labelAlign="left"
                          initialValue={parentDetails?.userCasinoShare}
                        // rules={[{ required: true, message: "Please input your casino share!", }]}
                        >
                          <Input disabled className="gx-border-redius0" />
                        </Form.Item>
                      </Col>


                      <Col md={12} xs={24}>
                        <Form.Item
                          name="userCasinoShare"
                          label="Casino Share (%) "
                          labelAlign="left"
                          rules={[
                            { validator: validateCoins(parentDetails?.userCasinoShare, "Casino Share ") },
                            { required: true, message: "Please input your casino share!" }]}
                        >
                          <Input placeholder={`${userType} casino share`} className="gx-border-redius0" />
                        </Form.Item>
                      </Col>
                    </Row>}

                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mycasinocomm"
                        label="My Casino Comm (%) "
                        labelAlign="left"
                        initialValue={parentDetails?.userCasinoCommission}
                      // rules={[{ required: true, message: "Please input your casino commission!", }]}
                      >
                        <Input disabled className="gx-border-redius0" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={24}>
                      <Form.Item
                        name="casinoCommission"
                        label="Casino Comm (%)"
                        labelAlign="left"
                        rules={[
                          { validator: validateCoins(parentDetails?.userCasinoCommission, "Casino Commission ") },
                          { required: true, message: "Please input your casino commission!" },]}
                      >
                        <Input placeholder={`casino Commission`} className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* interNetinaol casino  */}
                  {userType === 'client' ? null : <>
                    {internationalCasino === true && (
                      <>
                        <h1><span style={{ textTransform: "capitalize" }}> {userType} </span>International Casino Share</h1>
                        <Form.Item
                          name="intCasinoStatus"
                          initialValue={parentDetails?.intCasinoStatus}
                          valuePropName="checked"
                        >
                          <Switch
                            onChange={handleToggle}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            className="gx-mx-3 gx-my-1 gx-px-1"
                            style={{ backgroundColor: parentDetails?.intCasinoStatus ? "green" : "red", transform: "scale(1.3)" }}
                          />
                        </Form.Item>

                        <Row className="gx-bg-flex">
                          <Col md={12} xs={24}>
                            <Form.Item
                              name="myintcasinoshare"
                              label="Internatinol Casino Share"
                              labelAlign="left"
                              initialValue={parentDetails?.intCasinoShare}
                              rules={[{ required: true, message: "Please input your casino commission!", }]}
                            >
                              <Input disabled className="gx-border-redius0" />
                            </Form.Item>
                          </Col>


                          <Col md={12} xs={24}>
                            <Form.Item
                              name="intCasinoShare"
                              label="Internatinol Casino %"
                              labelAlign="left"
                              rules={[
                                { validator: validateCoins(parentDetails?.intCasinoShare, "Casino Commission ") },
                                { required: true, message: "Please input your casino commission!" },]}
                            >
                              <Input placeholder={`internetional casino Commission`} className="gx-border-redius0" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}</>}

                  <Row className="gx-bg-flex gx-px-3 gx-justify-content-end">
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="gx-border-redius0"  >
                        Submit
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </Card >
            )}
          </>
        }
      </>

    </>
  );
};
export default Create;
