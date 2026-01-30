import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Row,
  Table,
  Col
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
import DemoResult from "./DemoResult";
import { useDispatch, useSelector } from "react-redux";
import { casinoDiamondBetList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";


const Demo = () => {
  const RangePicker = DatePicker.RangePicker;
  const { _id } = useParams();

  const [userLists, setUserLists] = useState([]);
  const [ShowUserLists, setShowUserLists] = useState([]);
  const [selectUser, setSelectUser] = useState();

  const [showDate, setShowDate] = useState({

    startDate: moment(),
    // endDate: moment().subtract(7, 'days'),
    endDate: moment(),
  });
  const [infoMenu, setInfoMenu] = useState({ visible: false, data: null, });

  const dispatch = useDispatch()
  const { casinoBetList, loading } = useSelector((state) => state.UserReducer);
  const [finalUserList, setFinalUserList] = useState();

  useEffect(() => {
    casinoList();
  }, []);


  const casinoList = async () => {
    let reqData = {
      eventId: _id,
      toDate: showDate.startDate.format('YYYY-MM-DD'),
      fromDate: showDate.endDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: '20',
    };
    dispatch(casinoDiamondBetList(reqData));
  };

  useEffect(() => {
    if (casinoBetList) {
      const filteredData = casinoBetList?.casinoBetData?.map((item, index) => ({
        key: `${item._id}-${index}`,
        _id: `${item._id}`,
        createdAt: `${item.createdAt}`,
        client: `${item.userInfo.name}(${item.userInfo.username})`,
        roundId: item.roundId,
        playerName: item.playerName,
        showResult: item.showResult ? item.showResult : "Not Declear",
        isDeclare: item.isDeclare,
        amount: item.amount,
        profit: item.profit,
        loss: item.loss,
        profitLoss: item.profitLoss * -1,
        resultDetails: item.resultDetails,
      }));
      setUserLists(filteredData);
      const uniqueClientName = filteredData
        ? [...new Set(filteredData?.map((item) => item.client))]
        : null;
      setFinalUserList(uniqueClientName)
    }

  }, [casinoBetList?.casinoBetData]);

  useEffect(() => {
    const finalUserData = selectUser ? ShowUserLists : userLists;
    setShowUserLists(finalUserData);
  }, [selectUser, ShowUserLists, userLists]);

  const renderContent = (value, row) => {
    const obj = {
      children: value,
      props: {},
    };
    const profitLoss = row.profitLoss;

    if (profitLoss > 0) {
      obj.props.style = { backgroundColor: "green", color: "White" };
    } else if (profitLoss < 0) {
      obj.props.style = { backgroundColor: "red", color: "White" };
    }
    return obj;
  };

  async function getCompleteCasinoList() {
    let reqData = {
      eventId: _id,
      toDate: showDate.startDate.format('YYYY-MM-DD'),
      fromDate: showDate.endDate.format('YYYY-MM-DD'),
      pageNo: 1,
      size: 20,
    };
    dispatch(casinoDiamondBetList(reqData));
  }

  async function todayCompleteCasinoList() {
    let reqData = {
      eventId: _id,
      toDate: moment().format('YYYY-MM-DD'),
      fromDate: moment().format('YYYY-MM-DD'),
      pageNo: 1,
      size: 20,
    };
    dispatch(casinoDiamondBetList(reqData));
  }

  const renderShowResult = (value, row, index) => {
    const obj = renderContent(value, row, index);
    if (row.showResult) {
      obj.props.onClick = (e) => handleInfo(e, row.resultDetails);
      obj.props.style = { ...obj.props.style, cursor: "pointer" }; // Change cursor to pointer to indicate it's clickable
    }
    return obj;
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: renderContent,
      // render: (date) => (
      //   <span>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</span>
      // ),

    },
    {
      title: "Client",
      dataIndex: "client",
      render: renderContent,
    },

    {
      title: "RoundId",
      dataIndex: "roundId",
      render: renderContent,
    },

    {
      title: "Player",
      dataIndex: "playerName",
      render: renderContent,
    },

    {
      title: "Winner",
      dataIndex: "showResult",
      render: renderShowResult,
    },

    {
      title: "Stake",
      dataIndex: "amount",
      render: renderContent,
    },

    {
      title: "Profit",
      dataIndex: "profit",
      render: renderContent,
    },

    {
      title: "Loss",
      dataIndex: "loss",
      render: renderContent,
    },

    {
      title: "PNL",
      dataIndex: "profitLoss",
      render: renderContent,
    },
  ];

  async function onChange(dates, dateStrings) {
    setShowDate({
      startDate: dates[0],
      endDate: dates[1],
    });

  }

  const handleInputChange = async (value) => {
    setSelectUser(value);
    if (value === "All") {
      setShowUserLists(userLists); // Show all users if "All" is selected
    } else {
      const filteredData = userLists.filter((item) => item.client === value);
      setShowUserLists(filteredData);
    }
  };

  const handleInfo = (e, showResult) => {
    e.preventDefault();
    setInfoMenu({
      visible: true,
      data: showResult,
    });
  };

  const handleClose = () => {
    setInfoMenu({
      visible: false,
    });
  };
  const Option = Select.Option;

  const components = {
    body: {
      row: ({ children, ...restProps }) => (
        <tr {...restProps} className="no-hover">
          {children}
        </tr>
      ),
    },
  };
  
  

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card">
          <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex">
            <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`Diamond Casino Details`}</span>
           <BackButton/>
          </div>

          <div className="gx-mt-3">
            <Row style={{ gap: 16 }} className="gx-px-5" >
              <Col className="gx-bg-flex gx-gap-3" style={{ gap: 5 }}>
              <RangePicker
               
               className="gx-border-redius0"
               ranges={{
                 Today: [moment(), moment()],
                 Yesterday: [
                   moment().subtract(1, "days"),
                   moment().subtract(1, "days"),
                 ],
                 "This Week": [moment().startOf("week"), moment().endOf("week")],
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
               defaultValue={[showDate.startDate, showDate.endDate]}
                />

                <Select style={{ width: 300 }} defaultValue="All" onChange={value => handleInputChange(value)} 
                // getPopupContainer={trigger => trigger.parentElement}
                >
                  <Select.Option value="All"  >All</Select.Option>
                  {finalUserList && finalUserList?.map((item, index) => (
                    <Select.Option key={`${index}`} value={item}  >{item}</Select.Option>
                  ))}
                </Select>
              </Col>
              <div className="gx-px-2">
                <Button type="danger" onClick={() => getCompleteCasinoList()}>Apply</Button>
                <Button type="primary" onClick={() => todayCompleteCasinoList()} >Today P/L</Button>
              </div>
            </Row>
            </div>
         

          <div>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={ShowUserLists}
              bordered
              pagination={false}
              size="small"
              components={components}
            />
          </div>

          <DemoResult
            data={infoMenu.data}
            visible={infoMenu.visible}
            handleClose={handleClose}
          />
        </Card>}
    </>
  );
};

export default Demo;

