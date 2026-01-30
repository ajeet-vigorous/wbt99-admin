import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, Col, Row, Spin } from 'antd';
import BackButton from "../../Hoc/BackButton";
import { getUserDetails, setuserEmpty } from "../../../../appRedux/actions/User";

export const UserTypeData = {
  ownername: { "userType": "owner", "priority": 9, "shortname": "OW" },
  subownername: { "userType": "subowner", "priority": 8, "shortname": "SOW" },
  superadminname: { "userType": "superadmin", "priority": 7, "shortname": "SU" },
  adminname: { "userType": "admin", "priority": 6, "shortname": "AD" },
  subadminname: { "userType": "subadmin", "priority": 5, "shortname": "SUA" },
  mastername: { "userType": "master", "priority": 4, "shortname": "MA" },
  superagentname: { "userType": "superagent", "priority": 3, "shortname": "SA" },
  agentname: { "userType": "agent", "priority": 2, "shortname": "A" },
  clientname: { "userType": "client", "priority": 1, "shortname": "C" },
};

const Basic = () => {
  const [password, setPassword] = useState('');
  const [localUserDetails, setLocalUserDetails] = useState(null);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.UserReducer);

  useEffect(() => {

    // Update local state whenever userDetails changes
    if (userDetails) {
      setLocalUserDetails(userDetails);

    }
    return () => {
      dispatch(setuserEmpty())
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = () => {
    if (password.trim() === '') return;
    const reqData = { username: password };
    dispatch(getUserDetails(reqData));
    // setPassword('');
  };

  const usersInfo = JSON.parse(localStorage.getItem('user_id'));
  return (
    <Card className="gx-card gx-w-100 gx-mb-0">
      <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex">
        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-pt-1 gx-text-uppercase">
          Search Client
        </span>
        <BackButton />
      </div>

      <div className='gx-p-3 gx-w-100'>
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

        <Row className='gx-bg-flex gx-justify-content-lg-start gx-justify-content-center gx-w-100 gx-mt-2'>
          {localUserDetails && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.username} {localUserDetails?.parentData?.name}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>{localUserDetails?.userType}</div>
                </div>
              </div>
            </Col>
          )}

          {localUserDetails?.parentData.agentname && usersInfo?.data?.userPriority >= 2 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.agentname} {localUserDetails?.parentData?.agentuserName}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Agent</div>
                </div>
              </div>
            </Col>
          )}


          {localUserDetails?.parentData.superagentname && usersInfo?.data?.userPriority >= 3 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.superagentname} {localUserDetails?.parentData?.superagentuserName}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Super Agent</div>
                </div>
              </div>
            </Col>
          )}


          {localUserDetails?.parentData.mastername && usersInfo?.data?.userPriority >= 4 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.mastername} {localUserDetails?.parentData?.masteruserName}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Master</div>
                </div>
              </div>
            </Col>
          )}


          {localUserDetails?.parentData.adminname && usersInfo?.data?.userPriority >= 5 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.adminname} {localUserDetails?.parentData?.adminuserName}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Admin</div>
                </div>
              </div>
            </Col>
          )}


          {localUserDetails?.parentData.superadminname && usersInfo?.data?.userPriority >= 6 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.superadminname} {localUserDetails?.parentData?.superadminuserName}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Super Admin</div>
                </div>
              </div>
            </Col>
          )}

          {localUserDetails?.parentData.subownername && usersInfo?.data?.userPriority >= 7 && (
            <Col className='gx-px-2' lg={6} md={10} xs={22}>
              <div className='ant-typography gx-px-2 gx-bg-flex gx-justify-content-start gx-rounded-sm ant-card-bordered gx-py-2'>
                <div className='gx-px-2 gx-mt-5 gx-fs-lg gx-text-uppercase gx-font-weight-semi-bold'>
                  {localUserDetails?.parentData?.subowneruserName} {localUserDetails?.parentData?.subownername}
                  <br />
                  <div className='gx-fs-md gx-mb-2 gx-font-weight-normal gx-mt-2 gx-text-grey'>Sub Owner</div>
                </div>
              </div>
            </Col>
          )}

        </Row>
      </div>

    </Card>
  );
};

export default Basic;
