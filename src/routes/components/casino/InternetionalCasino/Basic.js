import React, { useEffect, useState } from "react";
import { Button, Card, DatePicker, Select, Table,  Row, Col } from "antd";

import moment from "moment";
import { Link } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";
import { getcasinoReportByUser } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const NavigationTop = () => {
  const dispatch = useDispatch();
  const RangePicker = DatePicker.RangePicker;
  const [userLists, setUserLists] = useState([]);
  const params = useParams();
  let { fromDate, toDate } = params;
  const history = useHistory();
  const [totalClientProfitLoss, setTotalClientProfitLoss] = useState(0);
  const [totalSelfProfitLoss, setTotalSelfProfitLoss] = useState(0);
  const [totalExposer, setTotalExposer] = useState(0);
  const [showDate, setShowDate] = useState({
    startDate: moment(fromDate),
    // endDate: moment().subtract(7, 'days'),
    endDate: moment(toDate),
  });
  const [matchLedger , setMatchLedger] = useState(null)
  const { loading, casinoReportListbyUser } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    getDiamondCasinoReportFun();
  }, []);

  useEffect(() => {
    const response = casinoReportListbyUser;
    if (response) {
      const filteredData = response?.map((item, index) => ({
        key: `${item._id}-${index}`,
        createdAt: item.createdAt,
        clientProfitLoss: item.clientProfitLoss,
        exposure: item.exposure,
        profitLoss: item.profitLoss,
        _id: item._id,
        gameName: item.gameName,
      }));
      setUserLists(filteredData);

      if (response && response?.data?.length > 0) {
        let selfProfitLossArray =
          response && response.data
            ? response.data.filter((items) => items.profitLoss)
            : [];
        let totalSelfProfitLoss = selfProfitLossArray.reduce(
          (acc, item) => acc + item.profitLoss,
          0
        );

        let clientProfitLossArray =
          response && response.data
            ? response.data.filter((items) => items.clientProfitLoss)
            : [];
        let totalClientProfitLoss = clientProfitLossArray.reduce(
          (acc, item) => acc + item.clientProfitLoss,
          0
        );

        let exposerArray =
          response && response.data
            ? response.data.filter((items) => items.exposure)
            : [];
        let totalExposer = exposerArray.reduce(
          (acc, item) => acc + item.exposure,
          0
        );
        setTotalClientProfitLoss(totalClientProfitLoss);
        setTotalSelfProfitLoss(totalSelfProfitLoss);
        setTotalExposer(totalExposer);
      }
    }
  }, [casinoReportListbyUser]);

useEffect(() => {
  if (casinoReportListbyUser ) {
    const casinoReportListbyUserSorted = casinoReportListbyUser ? casinoReportListbyUser.sort((a, b) => {
      return new Date(a._id.date) - new Date(b._id.date) ;
    }) : null ;
    
    const groupedData = {};
    
    casinoReportListbyUserSorted.forEach((item, index) => {
      const dateKey = moment(parseInt(item._id.date)).format("YYYY-MM-DD");

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }

      groupedData[dateKey].push({
        key: `${item._id.date}-${index}`,
        marketId: item._id.marketId,
        gameName: item.gameName,
        createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
        clientProfitLoss: -1 * Number(item.clientProfitLoss.toFixed(2)),
        exposure: -1 * Number(item.exposure.toFixed(2)),
        profitLoss: -1 * Number(item.profitLoss.toFixed(2)),
        dataKeyPayloadData: dateKey,
      });
    });


    let totalClientProfitLoss = 0;
    let totalExposure = 0;
    let totalProfitLoss = 0;

    Object.keys(groupedData).forEach((dateKey) => {
      groupedData[dateKey].forEach((entry) => {
        totalClientProfitLoss += entry.clientProfitLoss;
        totalExposure += entry.exposure;
        totalProfitLoss += entry.profitLoss;
      });
    });

    const finalTotal = {
      gameName: "Total",
      date: "",
      clientProfitLoss: totalClientProfitLoss,
      exposure:totalExposure ,
      profitLoss: totalProfitLoss,
      type: "another",
    };


    const transformData = (data) => {
      const result = [finalTotal];
 
      for (const date in data) {
        const entries = data[date];
        const totals = entries.reduce(
          (acc, entry) => {
            acc.clientProfitLoss += entry.clientProfitLoss;
            acc.exposure += entry.exposure;
            acc.profitLoss += entry.profitLoss;
            return acc;
          },
          { clientProfitLoss: 0, exposure: 0, profitLoss: 0 }
          
        );
       

        result.push({
          gameName: moment(date).format("DD-MM-YYYY"),
          date: date,
          clientProfitLoss: 
            Number(totals.clientProfitLoss).toFixed(2)
          ,
          exposure: 
            Number(totals.exposure).toFixed(2)
          ,
          profitLoss: Number(totals.profitLoss).toFixed(2),
          type: "dateTotal",
        });
      

        entries.forEach((entry, index) => {
          result.push({
            index: index + 1, 
            gameName: entry.gameName,
            date: moment(entry.dataKeyPayloadData),
            clientProfitLoss: Number(entry.clientProfitLoss).toFixed(2),
            exposure: Number(entry.exposure).toFixed(2),
            profitLoss: Number(entry.profitLoss).toFixed(2),
            type: "dayWise",
            marketId:entry.marketId,
            key: entry.key,
            datacheck: entry.dataKeyPayloadData
          });
        });
      }

      return result;
      
    };
    const transformedData = transformData(groupedData);

    setMatchLedger(transformedData);
  }
}, [casinoReportListbyUser]);



  const getDiamondCasinoReportFun = async () => {
    let reqData = {
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),
    
      "gameType": "internationalCasino"
    };
    dispatch(getcasinoReportByUser(reqData));
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
      key: "eventName",
      title: "Event Name",
      // dataIndex: "gameName",
      render: (record) => (
        <span className="gx-text-primary">
{record.gameName} {(record.date && record.type === "dayWise") ? `(${moment(record.date).format("DD-MM-YYYY")})` : ""}
        </span>
      ),
    },
    {
      title: "Date & Time",
      // dataIndex: "gameName",
      render: (record) => (
        <span className="">
 {(record.date && record.type === "dateTotal") ? `${moment(record.date).format("DD-MM-YYYY")}` : ""}
 {(record.date && record.type === "dayWise") ? `${moment(record.date).utcOffset("+05:30").format("DD MMM hh:mm A")}` : ""}
        </span>
      ),
    },
    {
      title: "Exposer",
      dataIndex: "exposure",
      render: (exposure) => (
        <span>
          {Number.parseFloat(Math.abs(exposure)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "P/L",
      dataIndex: "profitLoss",
      render: (profitLoss) => (
        <span className={`${profitLoss > 0 ? "gx-text-green-0" : "gx-text-red"}`}>
          {Number.parseFloat(Math.abs(profitLoss)).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      // dataIndex: "_id",
      render: (record) => (
        // <Link
        //   // to={`/components/navigation/internetionalcasino-bet/${_id}?`}
        //   to={`/components/navigation/internetionalcasino-bet/${_id}/${fromDate}&${toDate}`}

        //   className="link-button"
        // >          <Tag bordered={false} style={{ borderRadius: '0' }} color="#108ee9">Show Bets</Tag>
        // </Link>
       record?.type === "dayWise" &&  <Button className="gx-border-redius0 gx-bg-primary gx-text-white">
        <Link
          to={`/components/navigation/internetionalcasino-bet/${record?.marketId}/${record?.datacheck}&${record?.datacheck}`}
        >
          
         Show Bets
        </Link>
        </ Button >
      ),
    },
  ];
  function onChange(dates, dateStrings) {

    // Update the URL parameters with the new date range
    history.push(`/components/casino/internetionalcasinodeatils/${dates[0].format('YYYY-MM-DD')}&${dates[1].format('YYYY-MM-DD')}`);
    setShowDate({
      startDate: dates[1],
      endDate: dates[0],
    });
  }

  async function getCompleteCasinoList() {
    let reqData = {
      toDate: showDate.endDate.format('YYYY-MM-DD'),
      fromDate: showDate.startDate.format('YYYY-MM-DD'),

      "gameType": "internationalCasino"
    };
    dispatch(getcasinoReportByUser(reqData));
  }

  // async function todayCompleteCasinoList() {
  //   let reqData = {
  //     toDate: moment().format('YYYY-MM-DD'),
  //     fromDate: moment().format('YYYY-MM-DD'),
  //     "gameType": "internationalCasino"
  //     // pageNo: 1,
  //     // size: 20,
  //   };
  //   dispatch(getcasinoReportByUser(reqData));
  // }
  async function todayCompleteCasinoList() {
    let fromDate = moment().format('YYYY-MM-DD');
    let toDate = moment().format('YYYY-MM-DD');

    let reqData = {
      fromDate,
      toDate,
      gameType: "internationalCasino"
      // pageNo: 1,
      // size: 20,
    };
    dispatch(getcasinoReportByUser(reqData));
    history.push(`/components/casino/internetionalcasinodeatils/${fromDate}&${toDate}`);
    setShowDate({
      startDate: moment(fromDate),
      endDate: moment(toDate),
    });
  }


  const { Option } = Select;
  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Card className="gx-card gx-w-100">
          <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex" >
            <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">{`International Casino Details`}</span>
            <BackButton />
          </div>
       
          <Row gutter={20} className="gx-bg-flex gx-justify-content-start gx-align-items-center gx-px-4 gx-pt-1">
            <RangePicker

              className=" gx-border-redius0"
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
            <Col className="gx-px-2 gx-bg-flex gx-pt-3">
              {/* <Button type="danger" className="gx-border-redius0" onClick={getCompleteCasinoList}>Apply</Button> */}
              <Button type="primary" className="gx-border-redius0" onClick={todayCompleteCasinoList}>Today P/L</Button>
            </Col>
          </Row>
          <div>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={matchLedger}
              // dataSource={[{}, ...userLists]}
              bordered
              pagination={false}
              size="large"
              // rowClassName={(record, index) => {console.log(record, "recordddddddddd");
              //  }}

            />
          </div>
        </Card>
      }
    </>
  );
};

export default NavigationTop;
