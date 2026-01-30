import React, { useEffect } from "react";
import { Button, Card, Modal, Table } from "antd";
import { useParams } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";


import moment from "moment";
import { decisionresetCommList } from "../../../../appRedux/actions/User";
const BasicComm = ({resetModalClose, datalist}) => {
  const dispatch = useDispatch();
  // const { userId } = useParams();

  const { decisionCommDataList, loading } = useSelector(state => state.UserReducer)
  // useEffect(() => {
  //   LoginReportFun()
  // }, [dispatch, datalist]);


  

  // const LoginReportFun = async () => {
  //   let loginData = {
  //     userId: datalist
  //   }
  //   dispatch(decisionresetCommList(loginData))
  // }

  const columns = [
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "M Comm",
      dataIndex: "mcomm",
      key: "mcomm",
    },
    {
      title: "S Comm",
      dataIndex: "scomm",
      key: "scomm",
    },
    {
      title: "C Comm",
      dataIndex: "ccomm",
      key: "ccomm",
    },
    {
      title: "Done By",
      dataIndex: "remark",
      key: "remark",
    },
    
  ];


  const dataSet = []
  if (decisionCommDataList) {
    decisionCommDataList.forEach((element, index) => {
      dataSet.push({
        key: index,
        createdAt: moment(element.createdAt).format("DD-MM-YYYY hh:mm A"),
        scomm: element.sessionComm,
        mcomm: element.oddsComm,
        ccomm: element.casinoComm,
        remark: element.remark,
      })
    })
  }

  return (
    <>
      {/* {loading ? <Loader props={loading} /> : */}
       <Modal
       open={true}
       title={`Commission Modal`}
       onCancel={resetModalClose}
       width={800} // Increase modal width
       footer={
         <Button
           className="gx-bg-grey gx-text-white gx-border-redius0"
           onClick={resetModalClose}
         >
           Close
         </Button>
       }
       className="gx-px-3"
     >
        <Card className="gx-card gx-w-100">
          <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
            <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">
              Comm Lena Dena History
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
        </Modal>
      {/* // } */}
    </>
  );
};

export default BasicComm;
