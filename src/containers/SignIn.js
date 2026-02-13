import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { hideMessage, showAuthLoader, userLoginCheck, userSignIn, } from "../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
import { domainSettingByDomain, getMatchList } from "../appRedux/actions/User";
import settings from "../domainConfig";
import {

  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  UserOutlined
} from '@ant-design/icons';
import { apiCall } from "../appRedux/sagas/HTTP";


const SignIn = () => {
  const [fieldslogin, setFieldsLogin] = useState({ username: '', password: '', otp: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginChek, setLoginCheck] = useState(false)

  // const [showAdditionalField, setShowAdditionalField] = useState(false);
  let showAdditionalField = false
  const dispatch = useDispatch();
  const { loader, showMessage, authUser } = useSelector(({ auth }) => auth);


  const history = useHistory();
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      let domainSetting = {
        "domainUrl": window.location.origin
      };
      dispatch(domainSettingByDomain(domainSetting))
      dispatch(getMatchList());
      history.push('/');
    }
  }, [authUser, dispatch, history, showMessage]);


  const inputChange = (e) => {
    const { name, value } = e.target;
    if (!name || !value) {
      return;
    }
    setFieldsLogin(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const onFinish = async () => {

    const data = {
      username: fieldslogin.username?.toUpperCase(),
      password: fieldslogin.password,
      host: window.location.host,
    };
    if (loginChek) {
      data.otp = fieldslogin.otp;
    }
    try {
      const res = await apiCall("POST", "user/login", data);
      if (res?.data?.error === false) {
        if (res?.data?.data?.isOtp) {
          setLoginCheck(true);
          // message.success(res?.data?.message);
          console.log(res.data, "OTP Required");
        } else {
          localStorage.setItem('user_id', JSON.stringify(res.data));
          localStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.setItem('modalopen', true)
          setTimeout(() => {
            window.location.href = '/main/dashboard'
            message.success(res?.data?.message || "Login Successfull");
          }, 100)
        }

      } else {
        message.error(res?.data?.message || "Login Failed");
      }

    } catch (error) {
      message.error("Something went wrong");
      console.error(error, "eeeeeeeeee");
    }
  };


  // if (showAdditionalField ) {
  // dispatch(showAuthLoader());
  // dispatch(userSignIn(data));


  // }
  const userLoginCheckFun = async () => {
    const { username, password } = fieldslogin;
    if (!username || !password) {
      return
    }
    const loginData = {
      username: fieldslogin.username.toUpperCase(),
      password: fieldslogin.password,
      host: window.location.host,
      isClient: false
    };
    try {
      dispatch(userLoginCheck(loginData))
    } catch (error) {
      message.error("An error occurred while checking user login. Please try again.");
    }
  };


  return (
    <>

      <div className="gx-app-login-wrap  ">
        <div className="gx-app-login-container ">
          <div className="gx-app-login-main-content ">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg"></div>
              <div className="gx-app-logo-wid gx-text-uppercase">
                <h1><IntlMessages id="app.userAuth.signIn" /></h1>
                <span><IntlMessages id="app.userAuth.bySigning" /></span>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={settings?.logo} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                initialValues={{ remember: true }}
                name="basic"
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item
                  rules={[{ required: true, message: 'UserName can not be blank!' }]}
                  name="username"
                >
                  <Input
                    placeholder="username"
                    style={{ textTransform: "uppercase" }}
                    name="username"
                    value={fieldslogin.username}
                    onChange={inputChange}
                    className="gx-border-redius0 gx-w-100 gx-py-2"
                    disabled={loginChek}
                    prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} className="gx-fs-lg " />}
                  />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'User Password can not be blank!' }]}
                  name="password"
                >
                  <Input

                    // type="password"
                    placeholder="*****"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    style={{ textTransform: "uppercase", }}
                    value={fieldslogin.password}
                    visibilityToggle={{ defaultVisible: true }}
                    onChange={inputChange}
                    className="gx-border-redius0"
                    disabled={loginChek}
                    prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} className="gx-fs-lg" />}
                    suffix={passwordVisible ? <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} style={{ color: 'rgba(0, 0, 0, 0.75)' }} className="gx-fs-lg" /> : <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} style={{ color: 'rgba(0, 0, 0, 0.75)' }} className="gx-fs-lg" />}
                  />
                </Form.Item>


                {loginChek ? (
                  <>
                    {<Form.Item
                      rules={[{ required: true, message: 'Please input Otp!' }]}
                      name="otp"
                    >
                      <Input
                        placeholder="OTP"
                        name="otp"
                        value={fieldslogin.otp}
                        onChange={inputChange}
                        className="gx-border-redius0"
                        prefix={<SafetyCertificateOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />}
                      />
                    </Form.Item>}


                    <button
                      loading={loader}
                      onClick={loader ? null : () => onFinish()}
                      type="submit"
                      className={`gx-rounded-xs gx-py-2 gx-px-3 gx-bg-primary gx-text-white gx-border-0`}>
                      <IntlMessages id="app.userAuth.verifyOpt" />
                    </button>
                  </>
                ) : (

                  <button
                    loading={loader}
                    onClick={() => onFinish()}
                    type="submit"
                    className={`gx-rounded-xs gx-py-2 gx-px-3 gx-bg-primary gx-text-white gx-border-0`}>
                    <IntlMessages id="app.userAuth.signIn" />
                  </button>
                )}
              </Form>
            </div>

            {loader && loginChek ?
              <div className="gx-loader-view">
                <CircularProgress />
              </div> : null}
          </div>
        </div>
      </div>

    </>
  );
};

export default SignIn;

