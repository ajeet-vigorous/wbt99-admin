

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Button, Card, Switch } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserList, userCreate, userDetailsClear, userDominList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { internationalCasino, matkaVisible } from "../../../../constants/global";


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
  const [initialLoad, setInitialLoad] = useState(true);
  const [userLists, setUserLists] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

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

    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
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
      setFieldsUser(prevFields => ({
        ...prevFields,
        intCasinoStatus: userDetails?.intCasinoStatus,
        matkaStatus: userDetails?.matkaStatus
      }));
    }
  }, [userListItems, userDetails])



  const handleToggle = (checked) => {
    setToggleStatus(checked);

    setFieldsUser(prevFields => ({
      ...prevFields,
      intCasinoStatus: checked
    }));
  };
  const handleToggle2 = (checked) => {
    setToggleStatus(checked);

    setFieldsUser(prevFields => ({
      ...prevFields,
      matkaStatus: checked
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
      matkaStatus: values.matkaStatus,

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
      matkaShare: userType === "client" ? parentDetails?.userMatkaShare : updatedFieldsUser.matkaShare,
      casinoStatus: userType === "client" ? updatedFieldsUser.casinoStatus : true,

      matchCommission: updatedFieldsUser.commissionType === "NoCommission" ? 0 : updatedFieldsUser.matchCommission,
      sessionCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : updatedFieldsUser.sessionCommission,
      matkaCommission: updatedFieldsUser.commissionChangeType === "NoCommission" ? 0 : updatedFieldsUser.matkaCommission,

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
      matkaStatus: updatedFieldsUser?.matkaStatus,
      transactionPassword: "1122",
      allowedDomains: userType === "subowner" ? updatedFieldsUser.selectDomain : null,
    };
    dispatch(userCreate(userCreateData));

  };


  function handleInputChange(key, value) {
    setFieldsUser(prevState => ({ ...prevState, [key]: value }));
  }

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
    const nameCheck = /^[a-zA-Z0-9\s]+$/;
    if (!nameCheck.test(value)) {
      return Promise.reject(new Error('Name can only contain letters, numbers.'));
    }

    return Promise.resolve();
  };
  console.log(showSelectUser, "showSelectUsershowSelectUser")
  return (
    <>
      {(initialLoad) ? (
        <Loader props={true} />
      ) : (
        <>

          {showSelectUser && (
            <Card className="gx-card gx-border-redius">
              <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex">
                <div className="gx-fs-lg gx-text-white gx-bg-flex gx-justify-center gx-items-center gx-text-uppercase">Select Upline</div>
              </div>
              <div className="gx-px-5 gx-py-2 gx-bg-flex gx-justify-content-center">
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={value => onChange(value)}
                  className="gx-border-redius gx-mt-2"
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
        </>
      )}
      <>

        {(!initialLoad && loading) ? <Loader props={loading} /> :
          <>
            {loading === false && showForm && (
              <Card className="gx-card">
                <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex gx-align-items-center">
                  <span className="gx-fs-lg gx-font-weight-bold gx-text-white  gx-text-uppercase">Create {userType === "subadmin" ? "mini admin" : userType}</span>
                  <BackButton />
                </div>
                <Form
                  className="gx-py-2 gx-px-4 gx-w-100 gx-text-uppercase"
                  {...formItemLayout}
                  form={form}
                  onFinish={onFinish}
                  name="register"
                  scrollToFirstError
                  onFieldsChange={() => {
                    const hasErrors = form
                      .getFieldsError()
                      .some(({ errors }) => errors.length > 0);

                    const allTouched = form
                      .getFieldsValue(true);

                    const hasEmptyRequired = Object.values(allTouched).some(
                      value =>
                        value === undefined ||
                        value === "" ||
                        (Array.isArray(value) && value.length === 0)
                    );

                    setIsFormValid(!hasErrors && !hasEmptyRequired);
                  }}
                >
                  <Row className="gx-bg-flex ">
                    <Col md={12} xs={12}>
                      <label className="gx-mb-1">Name <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="name"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your name!", },
                        { validator: validateName },

                        ]}
                      >

                        <Input placeholder='Enter full name' className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>

                    <Col md={12} xs={12}>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="reference"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your reference!" },
                        ]}
                      >
                        <label className="gx-mb-1">Reference <span className="gx-text-red">*</span></label>
                        <Input placeholder='Enter reference' className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={12}>
                      <label className="gx-py-2">My Coins <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="mycoins"
                        labelAlign="left"
                        initialValue={parentDetails?.coins?.toFixed(2)}

                        rules={[{ required: true }]}
                      >

                        <Input disabled className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>

                    <Col md={12} xs={12}>
                      <label className="gx-py-2">Coins <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="coins"
                        labelAlign="left"
                        rules={[

                          { validator: validateCoins(parentDetails?.coins, "Coins") },
                          { required: true, message: "Please input your coins!" },
                        ]}
                      >
                        <Input placeholder={`${userType === "subadmin" ? "mini admin" : userType} coins`} className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={12}>
                      <label className="gx-py-2">Password <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="password"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please input your Password", }]}
                      >
                        <Input placeholder='Password' className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {userType === "client" ? null
                    :
                    <>
                      <Row className="gx-bg-flex">

                        {userType !== "subowner" ? null :
                          <Col md={12} xs={12}>
                            <label className="gx-py-2">Select Domain <span className="gx-text-red">*</span></label>
                            <Form.Item
                              wrapperCol={{ span: 23 }}
                              name="selectDomain"
                              labelAlign="left"
                              rules={[{ required: true, message: "Please select Domains!" }]}
                            >
                              <Select
                                mode="multiple"
                                placeholder="Select"
                                className="gx-border-redius gx-mt-2"
                              // getPopupContainer={trigger => trigger.parentElement}
                              >
                                {domainListData?.map((item, index) => (
                                  <Option key={index} value={item?.domainUrl} className="gx-border-redius gx-mt-2">
                                    {item?.domainUrl}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>}


                        <Col md={12} xs={12}>
                          <label className="gx-py-2">Share Type <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="commissionChangeType"
                            labelAlign="left"
                            rules={[{ required: true, message: "Please select your share type!", }]}
                          >
                            <Select placeholder="Select share type"
                              // getPopupContainer={trigger => trigger.parentElement}
                              onChange={(value) => handleInputChange('commissionChangeType', value)} className="gx-border-redius gx-mt-2">
                              <Option value="fixed">Fixed</Option>
                              <Option value="changed">Change</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>


                    </>
                  }

                  <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text ant-divider-with-text-start" role="separator"><span class="ant-divider-inner-text"><h4 class="ant-typography css-1v5z42l">Match And Share Info</h4></span></div>
                  {/* <h1><span style={{ textTransform: "capitalize" }}> {userType === "subadmin" ? "mini admin" : userType}</span> Match Share And Commission</h1> */}

                  {userType === "client" ? null
                    :
                    <Row className="gx-bg-flex">
                      <Col md={12} xs={12}>
                        <label className="gx-py-2">My Match Share  <span className="gx-text-red">*</span></label>
                        <Form.Item
                          wrapperCol={{ span: 23 }}
                          name="myShowMatchShare"
                          labelAlign="left"
                          initialValue={parentDetails?.userMatchShare}

                        >
                          <Input disabled className="gx-border-redius gx-mt-2" />
                        </Form.Item>
                      </Col>


                      <Col md={12} xs={12}>
                        <label className="gx-py-2">Match Share (%) <span className="gx-text-red">*</span></label>
                        <Form.Item
                          wrapperCol={{ span: 23 }}
                          name="userMatchShare"
                          labelAlign="left"
                          rules={[
                            { validator: validateCoins(parentDetails?.userMatchShare, "Match Share ") },
                            { required: true, message: "Please input your match share!" }]}
                        >
                          <Input placeholder={`${userType === "subadmin" ? "mini admin" : userType} Match Share`} className="gx-border-redius gx-mt-2" />
                        </Form.Item>
                      </Col>
                    </Row>
                  }
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={12}>
                      <label className="gx-py-2">My Comm Type <span className="gx-text-red">*</span> </label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="mycommissionType"
                        labelAlign="left"
                        initialValue={parentDetails?.userCommissionType}

                      >
                        <Input disabled className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={12}>
                      <label className="gx-py-2">Comm Type <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="commissionType"
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
                        <Col md={12} xs={12}>
                          <label className="gx-py-2">My Match Comm(%) <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="mymatchCommission"
                            labelAlign="left"
                            initialValue={parentDetails?.userMatchCommission}
                          >
                            <Input disabled className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>


                        <Col md={12} xs={12}>
                          <label className="gx-py-2">Match Comm (%) <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="matchCommission"
                            labelAlign="left"
                            rules={[
                              { validator: validateCoins(parentDetails?.userMatchCommission, "Match Commission ") },
                              { required: true, message: "Please input your match Commission!" }]}
                          >
                            <Input placeholder={`${userType === "subadmin" ? "mini admin" : userType} Match Commission`} className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row className="gx-bg-flex">
                        <Col md={12} xs={12}>
                          <label className="gx-py-2">My Sess Comm(%) <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="mySessCommission"
                            labelAlign="left"
                            initialValue={parentDetails?.userSessionCommission}
                          >
                            <Input disabled className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>

                        <Col md={12} xs={12}>
                          <label className="gx-py-2">Sess Comm(%) <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="sessionCommission"
                            labelAlign="left"
                            rules={[
                              { validator: validateCoins(parentDetails?.userSessionCommission, "Session Commission ") },
                              { required: true, message: "Please input your Sess Commission!", }]}
                          >
                            <Input placeholder={`${userType === "subadmin" ? "mini admin" : userType} Session Commission`} className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>}

                  {/* <h1><span style={{ textTransform: "capitalize" }}> {userType === "subadmin" ? "mini admin" : userType} </span> Casino Share And Commission</h1> */}

                  {userType === "client" ? null :
                    <Row className="gx-bg-flex">
                      <Col md={12} xs={12}>
                        <label className="gx-py-2">My Casino Share (%) <span className="gx-text-red">*</span></label>
                        <Form.Item
                          wrapperCol={{ span: 23 }}
                          name="mycasinoshare"
                          labelAlign="left"
                          initialValue={parentDetails?.userCasinoShare}
                        // rules={[{ required: true, message: "Please input your casino share!", }]}
                        >
                          <Input disabled className="gx-border-redius gx-mt-2" />
                        </Form.Item>
                      </Col>


                      <Col md={12} xs={12}>
                        <label className="gx-py-2">Casino Share (%) <span className="gx-text-red">*</span></label>
                        <Form.Item
                          wrapperCol={{ span: 23 }}
                          name="userCasinoShare"
                          labelAlign="left"
                          rules={[
                            { validator: validateCoins(parentDetails?.userCasinoShare, "Casino Share ") },
                            { required: true, message: "Please input your casino share!" }]}
                        >
                          <Input placeholder={`${userType === "subadmin" ? "mini admin" : userType} casino share`} className="gx-border-redius gx-mt-2" />
                        </Form.Item>
                      </Col>
                    </Row>}

                  <Row className="gx-bg-flex">
                    <Col md={12} xs={12}>
                      <label className="gx-py-2">My Casino Comm (%) <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="mycasinocomm"
                        labelAlign="left"
                        initialValue={parentDetails?.userCasinoCommission}
                      // rules={[{ required: true, message: "Please input your casino commission!", }]}
                      >
                        <Input disabled className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={12}>
                      <label className="gx-py-2">Casino Comm (%) <span className="gx-text-red">*</span></label>
                      <Form.Item
                        wrapperCol={{ span: 23 }}
                        name="casinoCommission"
                        labelAlign="left"
                        rules={[
                          { validator: validateCoins(parentDetails?.userCasinoCommission, "Casino Commission ") },
                          { required: true, message: "Please input your casino commission!" },]}
                      >
                        <Input placeholder={`casino Commission`} className="gx-border-redius gx-mt-2" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* interNetinaol casino  */}
                  {userType === 'client' ? null : <>
                    {internationalCasino === true && (
                      <>

                        <Row className="gx-bg-flex">
                          <Col md={12} xs={12}>
                            <label className="gx-py-2">Int Casino Share <span className="gx-text-red">*</span></label>
                            <Form.Item
                              wrapperCol={{ span: 23 }}
                              name="myintcasinoshare"
                              labelAlign="left"
                              initialValue={parentDetails?.intCasinoShare}
                              rules={[{ required: true, message: "Please input your casino commission!", }]}
                            >
                              <Input disabled className="gx-border-redius gx-mt-2" />
                            </Form.Item>
                          </Col>


                          <Col md={12} xs={12}>
                            <label className="gx-py-2">Int Casino (%) <span className="gx-text-red">*</span></label>
                            <Form.Item
                              wrapperCol={{ span: 23 }}
                              name="intCasinoShare"
                              labelAlign="left"
                              rules={[
                                { validator: validateCoins(parentDetails?.intCasinoShare, "Casino Commission ") },
                                { required: true, message: "Please input your casino commission!" },]}
                            >
                              <Input placeholder={`internetional casino Commission`} className="gx-border-redius gx-mt-2" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}</>}



                  {/* matka Create  */}

                  {userType === 'client' ?
                    <>


                      <Row className="gx-bg-flex">
                        <Col md={12} xs={12}>
                          <label className="gx-py-2">My Matka Comm <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="mymatkaCommission"
                            labelAlign="left"
                            initialValue={parentDetails?.userMatkaCommission}
                          // // rules={[{ required: true, message: "Please input your matka Commission!", }]}
                          >
                            <Input disabled className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>


                        <Col md={12} xs={12}>
                          <label className="gx-py-2">Matka Commission % <span className="gx-text-red">*</span></label>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="matkaCommission"
                            labelAlign="left"
                            rules={[
                              { validator: validateCoins(parentDetails?.userMatkaCommission, "Matka Commission ") },
                              { required: true, message: "Please input your Matka commission!" },]}
                          >
                            <Input placeholder={`Matka Commission`} className="gx-border-redius gx-mt-2" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row className="gx-bg-flex">
                        <Col md={12} xs={12}>
                          <p className="gx-text-uppercase gx-fs-sm"><span> {userType === "subadmin" ? "mini admin" : userType} </span>Matka Status</p>
                          <Form.Item
                            wrapperCol={{ span: 23 }}
                            name="matkaStatus"
                            initialValue={parentDetails?.matkaStatus}
                            valuePropName="checked"
                          >
                            <Switch
                              onChange={handleToggle2}
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              className="gx-mx-3 gx-px-1"
                              style={{ backgroundColor: fieldsUser.matkaStatus ? "green" : "red", transform: "scale(1.3)" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                    : <>
                      {matkaVisible === true && (
                        <>
                          <Row className="gx-bg-flex">
                            <Col md={12} xs={12}>
                              <label className="gx-py-2">Matka Share<span className="gx-text-red">*</span></label>
                              <Form.Item
                                wrapperCol={{ span: 23 }}
                                name="mymatkashare"
                                labelAlign="left"
                                initialValue={parentDetails?.userMatkaShare}
                              // rules={[{ required: true, message: "Please input your matka share!", }]}
                              >
                                <Input disabled className="gx-border-redius gx-mt-2" />
                              </Form.Item>
                            </Col>


                            <Col md={12} xs={12}>
                              <label className="gx-py-2">Matka share %<span className="gx-text-red">*</span></label>
                              <Form.Item
                                wrapperCol={{ span: 23 }}
                                name="matkaShare"
                                labelAlign="left"
                                rules={[
                                  { validator: validateCoins(parentDetails?.userMatkaShare, "Matka Share ") },
                                  { required: true, message: "Please input your casino Share!" },]}
                              >
                                <Input placeholder={`Matka Share`} className="gx-border-redius gx-mt-2" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row className="gx-bg-flex">
                            <Col md={12} xs={12}>
                              <label className="gx-py-2">My Matka Comm<span className="gx-text-red">*</span></label>
                              <Form.Item
                                wrapperCol={{ span: 23 }}
                                name="mymatkaCommission"
                                labelAlign="left"
                                initialValue={parentDetails?.userMatkaCommission}
                              // rules={[{ required: true, message: "Please input your matka Commission!", }]}
                              >
                                <Input disabled className="gx-border-redius gx-mt-2" />
                              </Form.Item>
                            </Col>


                            <Col md={12} xs={12}>
                              <label className="gx-py-2">Matka Commission %<span className="gx-text-red">*</span></label>
                              <Form.Item
                                wrapperCol={{ span: 23 }}
                                name="matkaCommission"
                                labelAlign="left"
                                rules={[
                                  { validator: validateCoins(20, "Matka Commission ") },
                                  { required: true, message: "Please input your Matka commission!" },]}
                              >
                                <Input placeholder={`Matka Commission`} className="gx-border-redius gx-mt-2" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row className="gx-bg-flex">
                            <Col md={12} xs={12}>
                              <p className="gx-text-uppercase gx-fs-sm"><span> {userType === "subadmin" ? "mini admin" : userType} </span>Matka Status</p>
                              <Form.Item
                                wrapperCol={{ span: 23 }}
                                name="matkaStatus"
                                initialValue={parentDetails?.matkaStatus}
                                valuePropName="checked"
                              >
                                <Switch
                                  onChange={handleToggle2}
                                  checkedChildren="ON"
                                  unCheckedChildren="OFF"
                                  className="gx-mx-3 gx-px-1"
                                  style={{ backgroundColor: fieldsUser.matkaStatus ? "green" : "red", transform: "scale(1.3)" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}</>}

                  {userType === 'client' ? null : <>
                    {internationalCasino === true && (
                      <>

                        <Row className="gx-bg-flex">
                          <Col md={12} xs={12}>
                            <p className="gx-text-uppercase gx-fs-sm"><span > {userType === "subadmin" ? "mini admin" : userType} </span>Int Casino status</p>
                            <Form.Item
                              wrapperCol={{ span: 23 }}
                              name="intCasinoStatus"
                              initialValue={parentDetails?.intCasinoStatus}
                              valuePropName="checked"
                            >
                              <Switch
                                onChange={handleToggle}
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                className="gx-mx-3 gx-my-1 gx-px-1"
                                style={{ backgroundColor: fieldsUser?.intCasinoStatus ? "green" : "red", transform: "scale(1.3)" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row></>)} </>}
                  <Row className="gx-bg-flex gx-px-3 gx-justify-content-center">
                    <Form.Item
                      wrapperCol={{ span: 23 }}>
                      <Button htmlType="submit" size="small" className={`${!isFormValid ? "gx-border-redius btn" : "gx-border-redius btn gx-bg-primary"} `} disabled={!isFormValid}>
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
