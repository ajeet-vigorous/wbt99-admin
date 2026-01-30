import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  DatePicker,
  Select,
  Table,
  Menu,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserList,
  userLedgerClear,
  userLedgerList,
} from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";

const getDownlineUserType = (param) => {
  const { priority } = param;
  let userDetails = priority;
  let downlineUserPriority = parseInt(userDetails) - 1;

  // let downlineUserPriority = parseInt(userDetails);

  if (!downlineUserPriority) {
    return "";
  }
  let downlineUserType = "";

  switch (downlineUserPriority) {
    case 9:
      downlineUserType = "owner";
      downlineUserPriority = 9;
      break;
    case 8:
      downlineUserType = "subowner";
      downlineUserPriority = 8;
      break;
    case 7:
      downlineUserType = "superadmin";
      downlineUserPriority = 7;
      break;
    case 6:
      downlineUserType = "admin";
      downlineUserPriority = 6;
      break;
    case 5:
      downlineUserType = "subadmin";
      downlineUserPriority = 5;
      break;
    case 4:
      downlineUserType = "master";
      downlineUserPriority = 4;
      break;
    case 3:
      downlineUserType = "superagent";
      downlineUserPriority = 3;
      break;
    case 2:
      downlineUserType = "agent";
      downlineUserPriority = 2;
      break;
    case 1:
      downlineUserType = "client";
      downlineUserPriority = 1;
      break;
    default:
      break;
  }
  return downlineUserType;
};

const Basic = () => {
  const dispatch = useDispatch();
  const { priority } = useParams();
  const [form] = Form.useForm();
  const [dates, setDates] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);
  const [ladgerType, setLadgerType] = useState();
  const [tableData, setTableData] = useState();
  const [userShare, setUserShare] = useState(null);
  const [mainShare, setMainShare] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user_id"));
  const { userListItems, userLedgerListData, loading } = useSelector(
    (state) => state.UserReducer
  );
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const downlineUserType = getDownlineUserType({ priority });

    dispatch(userLedgerClear());

    getUserListFun(downlineUserType);
  }, [userData?.data.userType]);

  

  useEffect(() => {
    if (userLedgerListData) {
      const { ledgerData } = userLedgerListData;
      
      const filteredData = ledgerData
        .filter(item => !ladgerType || item.ledgerType === ladgerType)
        .map((item, index) => ({
          key: `${item.userId}-${index}`,
          createdAt: item.createdAt,
          eventName: item.eventName,
          balance: item.ledgerType === "cricket"
          ? item.balance === 0 
            ? 0 
            : (Number(item.balance) / mainShare.matchShare) * userShare.matchShare
          : item.balance === 0 
            ? 0 
            : (Number(item.balance) / mainShare.casinoShare) * userShare.casinoShare,
        
          debit: item.ledgerType === "cricket"
          ? (Number(item.amount) > 0
              ? (Number(item.amount) === 0
                ? 0
                : (Number(item.amount) / mainShare.matchShare) * userShare.matchShare)
              : 0)
          : (Number(item.amount) > 0
              ? (Number(item.amount) === 0
                ? 0
                : (Number(item.amount) / mainShare.casinoShare) * userShare.casinoShare)
              : 0),
          credit: item.ledgerType === "cricket"
          ? (Number(item.amount) < 0
              ? (Number(item.amount) === 0
                ? 0
                : (Number(item.amount) / mainShare.matchShare) * userShare.matchShare)
              : 0)
          : (Number(item.amount) < 0
              ? (Number(item.amount) === 0
                ? 0
                : (Number(item.amount) / mainShare.casinoShare) * userShare.casinoShare)
              : 0),
          ledgerType: item.ledgerType,
          remark: item.remark,
        }));
    
      setTableData(filteredData);
    }
  }, [userLedgerListData,userShare, ladgerType]);



  const getUserListFun = async (downlineUserType) => {
    let reqData = {
      sortData: { createdAt: 1 },
      keyWord: "",
      pageNo: 1,
      size: 20,
      status: "both",
      parentUserType: userData?.data.userType,
      parentId: "",
      downlineUserType: downlineUserType,
    };
    await dispatch(getUserList(reqData));
  };

  const RangePicker = DatePicker.RangePicker;
  const onChange = (dateStrings) => {
    setDates(dateStrings);
  };
  const { Option } = Select;

  const [menuVisible, setMenuVisible] = useState(false);

  const handleInputClick = () => {
    setMenuVisible(true);
  };

  const handleChange = (item) => {
    setSelectedClient(item.username);
    setMainShare({matchShare : Number(item.userMatchShare) , casinoShare : Number(item.userCasinoShare) });
    setUserShare({matchShare : Number(item.userMatchShare) , casinoShare : Number(item.userCasinoShare) })
    setMenuVisible(false);
    let reqData = {
      downlineUserId: item.userId,
      isSettled : false
    };
    dispatch(userLedgerList(reqData));
  };



  const handleChange2 = (value) => {
    setLadgerType(value);
  };
  const handleInputBlur = () => {
    // Delay hiding the menu to allow the click event to register
    setTimeout(() => setMenuVisible(false), 200);
  };
  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: renderContent,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) =>
        moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY"),
    },
    {
      title: "Post Datew",
      dataIndex: "createdAt1",
      render: (value, row) =>
        moment(row.createdAt).utcOffset("+05:30").format("DD-MM-YYYY"),
    },
    {
      title: "Collection Name",
      dataIndex: "eventName",
      render: renderContent,
    },
    {
      title: "Debit",
      dataIndex: "debit",
      render: (value) => Number.parseFloat(Math.abs(value)).toFixed(2),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      render: (value) => Number.parseFloat(Math.abs(value)).toFixed(2),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      render: (value, row) => (
        <span>
          {
  row.balance > 0 &&
  Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - Lena"
}
{
  row.balance < 0 &&
  Number.parseFloat(Math.abs(row.balance)).toFixed(2) + " - DENA"
}
{
  row.balance === 0 &&
  "0.00"
}
        </span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "ledgerType",
      render: renderContent,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      render: renderContent,
    },
    {
      title: "Done By",
      dataIndex: ``,
      render: (value, row) => <span>{row.usertype}</span>,
    },
  ];

  const handleChangeMatchShareInput = (e) => {
  
    e.preventDefault();
    setUserShare({matchShare : 100-Number(e.target.value) , casinoShare: userShare.casinoShare })

  };


  const handleChangeCasinoShareInput = (e) => {
    e.preventDefault();
    setUserShare( {casinoShare : 100-Number(e.target.value) , matchShare :Number(userShare.matchShare) });
  };

  const downlineUserTypNAme = getDownlineUserType({ priority });

  return (
    <>
      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-3 gx-pt-3 gx-bg-flex">
          <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize gx-text-nowrap">
            parnership
          </span>
          <BackButton />
        </div>
        <div className="gx-px-2 gx-pt-3 ">
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
          >
            <Row gutter={20} className=" gx-px-1 gx-py-1 gx-gap-3 gx-w-100">
              <Col xl={6} lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item name="date" rules={[{ required: true }]}>
                  <RangePicker
                    className="gx-mb-2 gx-border-redius0 gx-w-100"
                   
                    ranges={{
                      Today: [moment(), moment()],
                      Yesterday: [
                        moment().subtract(1, "days"),
                        moment().subtract(1, "days"),
                      ],
                      "This Week": [
                        moment().startOf("week"),
                        moment().endOf("week"),
                      ],
                      "Last Week": [
                        moment().subtract(1, "week").startOf("week"),
                        moment().subtract(1, "week").endOf("week"),
                      ],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                      "Last Month": [
                        moment().subtract(1, "month").startOf("month"),
                        moment().subtract(1, "month").endOf("month"),
                      ],
                    }}
                    onChange={onChange}
                    value={dates}
                    defaultValue={[
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xl={6} lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                  style={{ position: "relative" }}
                  label={downlineUserTypNAme}
                  name="client"
                  rules={[{ required: true }]}

                >
                  <Input
                    placeholder="Select a person"
                    onClick={handleInputClick}
                    onBlur={handleInputBlur}
                    value={selectedClient}
                    className="gx-border-redius0 gx-w-100"
                    
                  />

                  {menuVisible && (
                    <Menu
                      className="gx-bg-white gx-px-1"
                      style={{
                        position: "absolute",
                        top: "37px",
                        left: 0,
                        zIndex: 2,
                      }}
                      mode="vertical"
                    >
                      {userListItems?.map((item) => (
                        <Menu.Item
                          key={item.userId}
                          onMouseDown={() => handleChange(item)}
                        >
                          {`${item.username} (${item.username})`}
                        </Menu.Item>
                      ))}
                    </Menu>
                  )}
                </Form.Item>
              </Col>
              
            </Row>

            <Row gutter={20} className=" gx-px-1 gx-py-1 gx-gap-3">
            <Col xl={6} lg={8} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                  label="ledgerType"
                  name="ledgerType"
                  rules={[{ required: true }]}
                 
                >
                  <Select
                    className="gx-mb-2 gx-w-100"
                    defaultValue="All"
                    // getPopupContainer={(trigger) => trigger.parentElement}
                    onChange={(value) => { handleChange2(value); }}
                   
                  >
                    <Option value="">All</Option>
                    <Option value="cricket">Cricket</Option>
                    <Option value="diamondCasino">Casino</Option>
                  </Select>
                </Form.Item>
              </Col>{" "}
              <Col lg={6} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                label="Match Share"
       
                >
                  <Input
                    placeholder="MatchShare"
                    type="number"
                    value={100-Number(userShare?.matchShare)}
                    onChange={selectedClient ? handleChangeMatchShareInput : {}}
                    disabled={ladgerType === "diamondCasino"}
                   
                    className="gx-border-redius0 gx-w-100"
                   
                  />
                </Form.Item>
              </Col>
              <Col lg={6} md={8} sm={12} xs={24} className="gx-px-5">
                <Form.Item
                 label="Casino Share"
               
                >
                  <Input
                    placeholder="CasinoShare"
                    type="number"
                    value={100-Number(userShare?.casinoShare)}
                    onChange={selectedClient ? handleChangeCasinoShareInput : {}}
                    disabled={ladgerType === "cricket"}
                    className="gx-border-redius0 gx-w-100"
                   
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24} className="gx-px-3">
                <Button type="primary" className="gx-border-redius0 ">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      {selectedClient !== null && (
        <Card className="gx-w-100">
          {loading ? (
            <Loader props={loading} />
          ) : (
            <Table
              rowKey={(record) => record.userId}
              className="gx-table-responsive"
              dataSource={tableData}
              columns={columns}
              bordered
              pagination={false}
              size="small"
              rowClassName={(row, index) =>
                index % 2 !== 0 ? "gx-bg-light-grey" : ""
              }
            />
          )}
        </Card>
      )}
    </>
  );
};

export default Basic;


