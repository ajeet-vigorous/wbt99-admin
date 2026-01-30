import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Button, Card, Switch } from "antd";
import BackButton from "../../../Hoc/BackButton";
import { useParams } from "react-router-dom";
import { httpPost } from "../../../../../http/http";
import { useDispatch, useSelector } from "react-redux";
import { userDominList, userUpdate } from "../../../../../appRedux/actions/User";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../../../../components/loader";
import { internationalCasino, matkaVisible } from "../../../../../constants/global";

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

const Plx99Basic = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({});
  const [parentDetails, setParentDetails] = useState({});
  const [flatShareDetails, setFlatShareDetails] = useState({})
  const [flatId, setFlatId] = useState("")
  const [toggleStatus, setToggleStatus] = useState(false);
  const [flatToggleStatus, setFlatToggleStatus] = useState(false);
  const [flatshareKey, setFlatshareKey] = useState(false)

  const [toggleStatusIntCasino, setToggleStatusIntCasino] = useState(false);
  const [toggleStatusMatka, setToggleStatusMatka] = useState(false);
  const { userId, usertype } = useParams();
  const [fieldsUser, setFieldsUser] = useState({
    commissionChangeType: '',
    selectDomain: [],
    userCommissionType: 'BetByBet'
  });

  const { userListCall, loader, loading, domainListData } = useSelector((state) => state.UserReducer);
  const history = useHistory()

  // useEffect(() => {
  //   if (userListCall) {
  //     // history.goBack();
  //   }
  // }, [userListCall])

  function handleInputChange(key, value,) {
    // e.preventDefault();
    setFieldsUser(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  useEffect(() => {
    if (fieldsUser?.selectDomain.length > 0) {
      form.setFieldsValue({
        selectDomain: fieldsUser.selectDomain,
      });
    }
  }, [fieldsUser, form]);




  useEffect(() => {
    setParentDetails({})

    
   getclientFlatShare(userId)
    const getUserDetails = async () => {
      let reqData = { userId };
      try {
        let response = await httpPost("user/userDetails", reqData);
        if (response) {
          setUserDetails(response.data);
          setToggleStatus(response.data.casinoStatus);
          setToggleStatusIntCasino(response.data.intCasinoStatus);
          setToggleStatusMatka(response.data.matkaStatus);
          getParentData(response?.data?.creatorId);
          setFlatId(response?.data?.creatorId)

          setFieldsUser(prevFields => ({
            ...prevFields,
            selectDomain: response?.data?.allowedDomains
          }));

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getUserDetails();
    dispatch(userDominList())

  }, [userId, flatshareKey]);



  const getParentData = async (creatorId) => {
    try {
      let parentReqBody = {
        userId: creatorId,

      };
      let response = await httpPost("user/userDetails", parentReqBody);
      if (response) {

        setParentDetails(response.data);
        // setFieldsUser(prevFields => ({
        //   ...prevFields,
        //   selectDomain: response?.data?.allowedDomains
        // }));
      }
    } catch (error) {
      console.error("Error fetching parent details:", error);
    }
  };

  const getclientFlatShare = async (creatorId) => {
    try {
      let parentReqBody = {
        userId: creatorId,
        userType: "client"
      };
      let response = await httpPost("user/getUserShareData", parentReqBody);
      if (response) {
        setFlatShareDetails(response.data);

      }
    } catch (error) {
      console.error("Error fetching parent details:", error);
    }
  }


  if (Object.keys(userDetails).length === 0 || Object.keys(parentDetails).length === 0) {
    return null;
  }

  const onFinish = async (values) => {
    let userUpdateData = {
      userId: userDetails?.userId,
      parentId: parentDetails?.userId,
      mobile: values.mobile,
      name: values.name,
      userType: userDetails.userType,
      status: values.status === "active" ? 1 : 0,
      // matchFlatShare: values.masterMobileShare,
      casinoShare: Number(values.masterCasinoShare),
      matkaShare: values.matkaShare,
      intCasinoStatus: toggleStatusIntCasino,
      intCasinoShare: values.intCasinoShare ? Number(values.intCasinoShare) : Number(userDetails.intCasinoShare),
      intCasinoExpoLimit: values.intCasinoExpoLimit ? values.intCasinoExpoLimit : userDetails.intCasinoExpoLimit,
      intCasinoMultiply: values.intCasinoMultiply ? values.intCasinoMultiply : userDetails.intCasinoMultiply,
      matchCommission: values.masterMatchComm,
      sessionCommission: values.masterSessComm,
      commChangeType: values.commissionChangeType,
      commissionType: values.userCommissionType,
      casinoCommission: values.masterCasinoComm,
      matkaCommission: values.matkaCommission,
      coins: userDetails.coins,
      reference: userDetails.reference,
      creditReference: 0,
      password: values.passwordShow,
      betStatus: userDetails.betStatus,
      matchStatus: userDetails.matchStatus,
      casinoStatus: toggleStatus,
      maxCommValue: values.commissionChangeType === "changed" ? values.maxCommValue : 0,
      matkaStatus: toggleStatusMatka,
      selfCuttingPermission: false,
      selfCuttingCoins: 0,
      transactionPassword: "1122",
      allowedDomains: values.selectDomain,
      // shareType: values?.shareType
      userFlatSharePermission: values?.shareType === "fixed" ? true : false
    };

    
    if (userDetails.userType === 'client') {
      userUpdateData.matchFlatShare = values.masterMobileShare
    }
    if (userDetails.userType !== 'client') {
      userUpdateData.matchShare = values.masterMobileShare
    }

    await dispatch(userUpdate(userUpdateData));
    setTimeout(() => {
      getclientFlatShare(userId)
      setFlatshareKey(true)
    }, 2000)

    // dispatch(userUpdate(finalPayload)).then((output) => {
    //   if (!output.error) {
    //     console.log(output);
    //     navigate(
    //       `/admin/onBoarding/edit/${encrypt(
    //         output?.payload?.companyinfo?.data?._id
    //       )}`
    //     );
    //   }
    // });
    // if(!loader){
    //   history.goBack();
    // }
  };

  const handleToggle = (checked) => {
    setToggleStatus(checked);
  };

  const handleFlatToggle = (checked) => {
    setFlatToggleStatus(checked);
  };

  const handleToggleIntCasino = (checked) => {
    setToggleStatusIntCasino(checked);
  };
  const handleToggleMatka = (checked) => {
    setToggleStatusMatka(checked);
  };

  const validateCoins = (parentCoins, name) => async (_, value) => {
    // if (value !== undefined && parentCoins !== undefined) {
    if (value > parentCoins) {
      throw new Error(`${name} must be less than ${parentCoins}`);
    }
    // }
  };

  return (
    <>
      {loader ? <Loader props={loader} /> :
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
            <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">Update {userDetails?.userType ? "mini admin" : userDetails?.userType}</span>
            <BackButton />
          </div>
          <Form
            className="gx-py-4 gx-px-2 gx-text-capitalize"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="username"
                  label="User Name"
                  labelAlign="left"
                  initialValue={userDetails.username}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input disabled={true} className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  labelAlign="left"
                  initialValue={userDetails.name}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input disabled={true} className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="reference"
                  label="Reference"
                  labelAlign="left"
                  initialValue={userDetails.reference}
                  rules={[
                    {
                      required: true,
                      message: "Please input your reference!",
                    },
                  ]}
                >
                  <Input className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="mobile"
                  label="Contact No."
                  labelAlign="left"
                  initialValue={userDetails.mobile}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact Number",
                    },
                  ]}
                >
                  <Input className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row> */}
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="passwordShow"
                  label="Password"
                  labelAlign="left"
                  initialValue={userDetails.passwordShow}
                  // initialValue={'******'}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input disabled className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="status"
                  label="Status"
                  labelAlign="left"
                  initialValue={userDetails.status === 1 ? 'active' : 'inactive'}
                  rules={[
                    {
                      required: true,
                      message: "Please select your status!",
                    },
                  ]}
                >
                  <Select placeholder="Select status" className="gx-border-redius0"
                  // getPopupContainer={trigger => trigger.parentElement}
                  >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* {userDetails.userType !== "subowner" ? null : <>
              <Row className="gx-bg-flex">
                <Col md={12} xs={24}>
                  <Form.Item
                    name="commissionChangeType"
                    label="Share Change Type"
                    labelAlign="left"
                    initialValue={userDetails.shareType === "fixed" ? 'fixed' : 'changed'}
                    rules={[
                      {
                        required: true,
                        message: "Please select your share type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select share type" className="gx-border-redius0"
                      onChange={(value) => handleInputChange('commissionChangeType', value)}
                    // getPopupContainer={trigger => trigger.parentElement} 
                    >
                      <Option value="fixed">Fixed</Option>
                      <Option value="changed">Changed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {fieldsUser?.commissionChangeType === "" || fieldsUser?.commissionChangeType === "fixed" ? null :
                <Row className="gx-bg-flex">
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="maxCommValue"
                      label="Maximum Commission value: "
                      labelAlign="left"
                      rules={[{ required: true, message: "Please input your Maximum Commission value!" }]}
                    >
                      <Input className="gx-border-redius0" />
                    </Form.Item>
                  </Col>
                </Row>
              }
            </>} */}

            {/* //domain setting  */}

            {userDetails.userType === "client" ? null
              :
              <>
                <Row className="gx-bg-flex">

                  {userDetails.userType !== "subowner" ? null :
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="selectDomain"
                        label="Select Domain"
                        labelAlign="left"
                        rules={[{ required: true, message: "Please select Domains!" }]}
                      >

                        <Select
                          // mode="multiple"
                          // placeholder="Select"
                          mode="tags" // Allows both selection and text entry
                          placeholder="Select or Enter"
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


                </Row>


              </>
            }


             {userDetails?.userType === "client" ? null :
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="shareType"
                  label="Share Change Type"
                  labelAlign="left"
                  initialValue={userDetails.userFlatSharePermission === true ? 'fixed' : 'changed'}
                  rules={[
                    {
                      required: true,
                      message: "Please select your share type!",
                    },
                  ]}
                >
                  <Select placeholder="Select share type" className="gx-border-redius0"
                    onChange={(value) => handleInputChange('shareType', value)}
                  // getPopupContainer={trigger => trigger.parentElement} 
                  // disabled={parentDetails.shareType == 'fixed'}
                  >
                    <Option value="fixed">Fixed</Option>
                    <Option value="changed">Change</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
}



            <h1>Match Share and Comm</h1>

            {parentDetails.userFlatSharePermission == true ? null :
            <Row className="gx-bg-flex">
            {userDetails.userType === "client" ? null :  <Col md={12} xs={24}>
                <Form.Item
                  name="parentMobileShare"
                  label={`${parentDetails.userType} Match Share(%)`}
                  labelAlign="left"
                  initialValue={parentDetails.userMatchShare}
                  rules={[
                    {
                      required: true,
                      message: "Please input parent mobile share!",
                    },
                  ]}
                >
                  <Input disabled={true} className="gx-border-redius0" />
                </Form.Item>
                </Col>}

              <Col md={12} xs={24}>
                <Form.Item
                  name="masterMobileShare"
                  label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType === "client" ? 'agent' : userDetails.userType} Match Share(%)`}
                  labelAlign="left"
                  initialValue={userDetails?.userType === "client" ? flatShareDetails.agentMatchShare : userDetails.userMatchShare}
                  rules={[
                    {
                      required: true,
                      message: "Please input master Match share!",
                    },
                    { validator: validateCoins(parentDetails.userMatchShare, " Match Share(%)") },
                  ]}
                >
                  <Input className="gx-border-redius0" disabled={parentDetails.userFlatSharePermission == true} />
                  {/* disabled={parentDetails.shareType == 'fixed'} */}
                </Form.Item>
              </Col>
            </Row>
            }




            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="parentCommType"
                  label={`${parentDetails.userType} Comm Type`}
                  labelAlign="left"
                  initialValue={parentDetails.userCommissionType}
                  rules={[
                    {
                      required: true,
                      message: "Please input parent commission type!",
                    },
                  ]}
                >
                  <Input disabled={true} className="gx-border-redius0" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="userCommissionType"
                  label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Comm Type`}
                  labelAlign="left"
                  initialValue={userDetails.userCommissionType}
                  rules={[
                    {
                      required: true,
                      message: "Please select master commission type!",
                    },
                  ]}
                >
                  <Select placeholder="Commission Type" className="gx-border-redius0"
                    onChange={(value) => handleInputChange('userCommissionType', value)}
                  // getPopupContainer={trigger => trigger.parentElement}
                  >
                    <Option value="NoCommission">No Comm</Option>
                    <Option value="BetByBet">Bet by Bet</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {fieldsUser?.userCommissionType !== "BetByBet" ? null :
              <>
                <Row className="gx-bg-flex">
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="parentMatchComm"
                      label={`${parentDetails.userType} Match Comm(%)`}
                      labelAlign="left"
                      initialValue={parentDetails.userMatchCommission}
                      rules={[
                        {
                          required: true,
                          message: "Please input parent match commission!",
                        },
                      ]}
                    >
                      <Input disabled={true} className="gx-border-redius0" />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="masterMatchComm"
                      label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Match Comm(%)`}
                      labelAlign="left"
                      initialValue={userDetails.userMatchCommission}
                      rules={[
                        {
                          required: true,
                          message: "Please input master match commission!",
                        },
                        { validator: validateCoins(parentDetails.userMatchCommission, "Match Comm(%)") },
                      ]}
                    >
                      <Input className="gx-border-redius0" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="gx-bg-flex">
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="parentSessComm"
                      label={`${parentDetails.userType} Sess Comm(%)`}
                      labelAlign="left"
                      initialValue={parentDetails.userSessionCommission}
                      rules={[
                        {
                          required: true,
                          message: "Please input parent session commission!",
                        },
                      ]}
                    >
                      <Input disabled={true} className="gx-border-redius0" />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="masterSessComm"
                      label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Sess Comm(%)`}
                      labelAlign="left"
                      initialValue={userDetails.userSessionCommission}
                      rules={[
                        {
                          required: true,
                          message: "Please input master session commission!",

                        },
                        { validator: validateCoins(parentDetails.userSessionCommission, "Sess Comm(%)") },
                      ]}
                    >
                      <Input className="gx-border-redius0" />
                    </Form.Item>
                  </Col>
                </Row>
              </>

            }
            <h1>Casino Share and Commission</h1>
            <Form.Item
              name="toggle"
              initialValue={toggleStatus}
              valuePropName="checked"
            >
              <Switch
                onChange={handleToggle}
                checkedChildren="ON"
                unCheckedChildren="OFF"
                className="gx-mx-3 gx-my-1 gx-px-1"
                style={{ backgroundColor: toggleStatus ? "green" : "red", transform: "scale(1.3)" }}
              />
            </Form.Item>

            {userDetails.userType === "client" ? null :
              <Row className="gx-bg-flex">
                <Col md={12} xs={24}>
                  <Form.Item
                    name="parentCasinoShare"
                    label={`${parentDetails.userType} Casino Share(%)`}
                    labelAlign="left"
                    initialValue={parentDetails.userCasinoShare}
                    rules={[
                      {
                        required: true,
                        message: "Please input parent casino share!",
                      },
                    ]}
                  >
                    <Input disabled={true} className="gx-border-redius0" />
                  </Form.Item>
                </Col>

                <Col md={12} xs={24}>
                  <Form.Item
                    name="masterCasinoShare"
                    label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Casino Share(%)`}
                    labelAlign="left"
                    initialValue={userDetails.userCasinoShare}
                    rules={[
                      {
                        required: true,
                        message: "Please input master casino share!",
                      },
                      { validator: validateCoins(parentDetails.userCasinoShare, "Casino Share(%)") },
                    ]}
                  >
                    <Input className="gx-border-redius0" disabled={parentDetails.userFlatSharePermission == true} />
                  </Form.Item>
                </Col>
              </Row>}
            <Row className="gx-bg-flex">
              <Col md={12} xs={24}>
                <Form.Item
                  name="parentCasinoComm"
                  label={`${parentDetails.userType} Casino Comm(%)`}
                  labelAlign="left"
                  initialValue={parentDetails.userCasinoCommission}
                  rules={[
                    {
                      required: true,
                      message: "Please input parent casino commission!",
                    },
                  ]}
                >
                  <Input disabled={true} className="gx-border-redius0" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="masterCasinoComm"
                  label={`${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Casino Comm(%)`}
                  labelAlign="left"
                  initialValue={userDetails.userCasinoCommission}
                  rules={[
                    {
                      required: true,
                      message: "Please input master casino commission!",
                    },
                    { validator: validateCoins(parentDetails.userCasinoCommission, "Casino Commission ") },
                  ]}
                >
                  <Input className="gx-border-redius0" />
                </Form.Item>
              </Col>
            </Row>


            {/* interNetinaol casino  */}

            {userDetails.userType === 'client' ? null : <>
              {internationalCasino === true && (
                <>
                  <h1><span style={{ textTransform: "capitalize" }}>  </span>International Casino Share</h1>
                  <Form.Item
                    name="intCasinoStatus"
                    initialValue={toggleStatusIntCasino}
                    valuePropName="checked"
                  >
                    <Switch
                      onChange={handleToggleIntCasino}
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      className="gx-mx-3 gx-my-1 gx-px-1"
                      style={{ backgroundColor: toggleStatusIntCasino ? "green" : "red", transform: "scale(1.3)" }}
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
                        initialValue={userDetails.intCasinoShare}
                        rules={[
                          { validator: validateCoins(parentDetails?.intCasinoShare, "Casino Commission ") },
                          { required: true, message: "Please input your casino commission!" },]}
                      >
                        <Input placeholder={`internetional casino Commission`} className="gx-border-redius0" disabled={parentDetails.userFlatSharePermission == true} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}</>
            }
            {userDetails.userType === 'client' ? null : <>
              {matkaVisible === true && (
                <>
                  <h1><span style={{ textTransform: "capitalize" }}>  </span>Matka Share And Comm</h1>
                  <Form.Item
                    name="matkaStatus"
                    initialValue={toggleStatusMatka}
                    valuePropName="checked"
                  >
                    <Switch
                      onChange={handleToggleMatka}
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      className="gx-mx-3 gx-my-1 gx-px-1"
                      style={{ backgroundColor: toggleStatusMatka ? "green" : "red", transform: "scale(1.3)" }}
                    />
                  </Form.Item>

                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mymatkashare"
                        label={`${parentDetails.userType} Matka Share`}
                        labelAlign="left"
                        initialValue={parentDetails?.userMatkaShare}
                      // rules={[{ required: true, message: "Please input your matka share!", }]}
                      >
                        <Input disabled className="gx-border-redius0" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={24}>
                      <Form.Item
                        name="matkaShare"
                        label={` ${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Matka share %`}
                        labelAlign="left"
                        initialValue={userDetails?.userMatkaShare}
                        rules={[
                          { validator: validateCoins(parentDetails?.userMatkaShare, "Matka Share ") },
                          { required: true, message: "Please input your casino Share!" },]}
                      >
                        <Input placeholder={`Matka Share`} className="gx-border-redius0" disabled={parentDetails.userFlatSharePermission == true} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="gx-bg-flex">
                    <Col md={12} xs={24}>
                      <Form.Item
                        name="mymatkaCommission"
                        label={`${parentDetails.userType} Matka Commission`}


                        labelAlign="left"
                        initialValue={parentDetails?.userMatkaCommission}
                      // rules={[{ required: true, message: "Please input your matka Commission!", }]}
                      >
                        <Input disabled className="gx-border-redius0" />
                      </Form.Item>
                    </Col>


                    <Col md={12} xs={24}>
                      <Form.Item
                        name="matkaCommission"

                        label={` ${userDetails.userType === 'subadmin' ? 'mini admin' : userDetails.userType} Matka Commission %`}
                        labelAlign="left"
                        initialValue={userDetails?.userMatkaCommission}
                        rules={[
                          { validator: validateCoins(parentDetails?.userMatkaCommission, "Matka Commission ") },
                          { required: true, message: "Please input your casino commission!" },]}
                      >
                        <Input placeholder={`Matka Commission`} className="gx-border-redius0" />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}</>}


            <Row className="gx-bg-flex gx-px-3 gx-justify-content-end">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="gx-border-redius0">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Card >
      }
    </>
  );
};

export default Plx99Basic;