import React, { useEffect } from "react";
import { Card, Table } from "antd";
import "./basic.less";
import { useParams } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";

import { useDispatch, useSelector } from "react-redux";
import { getUserLoginActivity } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";

import moment from "moment";
const Basic = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { userLoginActivity, loading } = useSelector(state => state.UserReducer)
  useEffect(() => {
    LoginReportFun()
  }, [dispatch, userId]);

  const LoginReportFun = async () => {
    let loginData = {
      userId: userId
    }
    dispatch(getUserLoginActivity(loginData))
  }

  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "REGION",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "ISP",
      dataIndex: "isp",
      key: "isp",
    },
    {
      title: "IP-ADDRESS",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "LOGIN DATE",
      dataIndex: "loginDate",
      key: "loginDate",
    },
  ];



  const dataSet = []
  if (userLoginActivity) {
    userLoginActivity.forEach((element, index) => {
      dataSet.push({
        key: index,
        country: element.country,
        region: element.state,
        isp: element.isp,
        ipAddress: element.ip,
        loginDate: moment(element.createdAt).format("DD-MM-YYYY hh:mm A"),
      })
    })
  }

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card gx-w-100">
          <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
            <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
              Login Report
            </span>
            <BackButton />
          </div>
          <Table
            className="gx-table-responsive gx-w-100  login-table-header"
            columns={columns}
            bordered
            pagination={false}
            dataSource={dataSet}
            size="small"
          />
        </Card>
      }
    </>
  );
};

export default Basic;
