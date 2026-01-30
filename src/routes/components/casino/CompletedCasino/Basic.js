import React, { useEffect, useState } from "react";
import { Card, DatePicker, Table, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getCasinoDayWise } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";
import { Link } from "react-router-dom";

const Basic = () => {
  const [matchLedger, setMatchLedger] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [dates, setDates] = useState([
    moment().subtract(1, "month").startOf("day"),
    moment().endOf("day"),
  ]);
  const dispatch = useDispatch();
  const { casinoDayWise, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (Array.isArray(dates) && dates.length > 0) {
      casinoRoundWiseList();
    } 
  }, [dates]);

  const casinoRoundWiseList = () => {
    const fromDate = dates[0].format("YYYY-MM-DD");
    const toDate = dates[1].format("YYYY-MM-DD");
    const reqData = {
      fromDate: fromDate,
      toDate: toDate,
      isCasino: 1,
    };
    dispatch(getCasinoDayWise(reqData));
  };

  useEffect(() => {
    if (casinoDayWise) {
   
      console.log(casinoDayWise, "casinoDayWise casinoDayWise casinoDayWise");
      
      const groupedData = {};
      casinoDayWise.forEach((item) => {

        const dateKey = moment((item._id.date)).local().format("YYYY-MM-DD");

        
        // if (!groupedData[dateKey]) {
        //     groupedData[dateKey] = [];
        //     console.log(groupedData[dateKey], "3222222222kkkkkkkkkkkkkkkk2222");
        //     console.log(item.createdAt, "3222222222kkkkkkkkkkkkkkkk222222221");
        //   }
          // if (item.eventId >= 3030 && item.eventId <= 404040) {
          if (item.eventId) {
            if (!groupedData[dateKey]) {
              groupedData[dateKey] = [];
            }
       
        groupedData[dateKey].push({
          key: item.eventId,
          eventName: item.eventName,
          dateTime: moment(item.createdAt).format("DD-MM-YYYY"),
          profitLoss: Number(item.userNetProfitLoss.toFixed(2)),
          takeComm: -1 * Number(item.userOddsComm.toFixed(2)),
          giveComm: -1 *  Number(item.clientOddsAmount.toFixed(2)),
          final:  -1 * Number(item.clientNetAmount.toFixed(2)),
          dataKeyPalyload: dateKey
        });
      } // Filter data Code
      });
      let totalProfitLoss = 0;
      let totalTakeComm = 0;
      let totalGiveComm = 0;
      let totalFinal = 0;



      Object.keys(groupedData).forEach((dateKey) => {
        groupedData[dateKey].forEach((entry) => {
          totalProfitLoss += entry.profitLoss;
          totalTakeComm += entry.takeComm;
          totalGiveComm += entry.giveComm;
          totalFinal += entry.final;
        });
      });

      const finalTotal = {
        eventName: "Total",
        date: "",
        profitLoss: <span className={`${totalProfitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totalProfitLoss).toFixed(2)}</span>,
        takeComm: <span className={`${totalTakeComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totalTakeComm).toFixed(2)}</span>,
        giveComm: <span className={`${totalGiveComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totalGiveComm).toFixed(2)}</span>,
        final: <span className={`${totalFinal > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totalFinal).toFixed(2)}</span>,
        type: "another",
      };

      const transformData = (data) => {

        
        const result = [finalTotal];
        for (const date in data) {
         
          
          const entries = data[date];
        
          const totals = entries.reduce(
            (acc, entry) => {
              acc.profitLoss += entry.profitLoss;
              acc.takeComm += entry.takeComm;
              acc.giveComm += entry.giveComm;
              acc.final += entry.final;
              return acc;
            },
            { profitLoss: 0, takeComm: 0, giveComm: 0, final: 0 }
          );
         
          result.push({
            eventName: <span className="gx-text-blue gx-pointer">{date}</span>,
            date: date,
            profitLoss: <span className={`${totals.profitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totals.profitLoss).toFixed(2)}</span>,
            takeComm: <span className={`${totals.takeComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totals.takeComm).toFixed(2)}</span>,
            giveComm: <span className={`${totals.giveComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totals.giveComm).toFixed(2)}</span>,
            final: <span className={`${totals.final > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(totals.final).toFixed(2)}</span>,
            type: "dateTotal",
          });
                 console.log(entries, "entry.dataKeyPalyloadentry.dataKeyPalyload");
          entries.forEach((entry, index) => {
      

       
            result.push({
              index: index + 1, // Adding index (1-based)
              eventName: <span className="gx-text-blue gx-text-nowrap gx-pointer">{entry.eventName}</span>,
              date: <span className="gx-text-nowrap">{moment(entry.dataKeyPalyload).format("DD MMM hh:mm A")}</span>, // Updated date format
              profitLoss: <span className={`${entry.profitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(entry.profitLoss).toFixed(2)}</span>,
              takeComm: <span className={`${entry.takeComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(entry.takeComm).toFixed(2)}</span>,
              giveComm: <span className={`${entry.giveComm > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(entry.giveComm).toFixed(2)}</span>,
              final: <span className={`${entry.final > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number(entry.final).toFixed(2)}</span>,
              type: "dayWise",
              payloadDate: entry?.dateTime,
              key: Number(entry.key),
              eventNames: entry.eventName,
              dataKeyPalyloadData: entry?.dataKeyPalyload
            });
          });


          // entries.forEach((entry) => {
          //   result.push({
          //     eventName: <Link to={''}>{entry.eventName}</Link>,
          //     date: moment(entry.dataTime).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A"),
          //     profitLoss: Number(entry.profitLoss).toFixed(2),
          //     takeComm: Number(entry.takeComm).toFixed(2),
          //     giveComm: Number(entry.giveComm).toFixed(2),
          //     final: Number(entry.final).toFixed(2),
          //     type: "dayWise",
          //   });
          // });
        }

        return result;
      };


      
      const transformedData = transformData(groupedData);
      setMatchLedger(transformedData);
    }
  }, [casinoDayWise]);

  const columns = [
    {
      key: "eventName",
      title: "Event Name",
      dataIndex: "eventName",
    },
    {
      key: "dateTime",
      title: "Date & Time",
      dataIndex: "date",
    },
    {
      title: "P/L",
      dataIndex: "profitLoss",
      key: "profitLoss",
    },
    // {
    //   title: "Take comm",
    //   dataIndex: "takeComm",
    //   key: "takeComm",
    // },
    // {
    //   title: "Give comm",
    //   dataIndex: "giveComm",
    //   key: "giveComm",
    // },
    // {
    //   title: "Final",
    //   dataIndex: "final",
    //   key: "final",
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        if (record.type === "dayWise") {

          return (
            <div className="gx-bg-flex gx-justify-content-end">
       
              <Button type="primary" className="gx-border-redius0">
     
                <Link to={`/components/casino/casinoviewdetails/${record?.key}/${record?.dataKeyPalyloadData}`}>
                  plusminus
                </Link>
              </Button>
              <Button className="gx-border-redius0">
                <Link
                  to={`/components/casino/inplaycasinodetails/${record.eventNames}/${record.key}/${record?.dataKeyPalyloadData}`}
                >
                  Display Games
                </Link>
              </Button>
            </div>
          );
        } else if (record.type === "dateTotal") {
          return (
            <div className="gx-bg-flex gx-justify-content-end">
              <Button type="primary" className="gx-border-redius0">
              

                {/* <Link to={`/components/casino/plusminuscasinodeatils-data/${record.eventName.props.children}`}> */}
                <Link to={`/components/casino/plusminuscasinodeatils-data/${record?.date}`}>
                  plusminus2
                </Link>
              </Button>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ];
  if (!matchLedger) {
    return null

  }

  const RangePicker = DatePicker.RangePicker;

  const onChange = (dates) => {
    
    try {
      setDates(dates);
    } catch (error) {
      console.error('Error in onChange:', error);
    }
  };

  const handleSubmit = () => {
    casinoRoundWiseList();
  };

  return (
    <>
      {loading ? (
        <Loader props={loading} />
      ) : (
        <Card className="">
          <div className="gx-bg-grey gx-px-3 gx-py-2 gx-bg-flex gx-align-items-center">
            <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-text-uppercase">
              Completed Casino
            </span>
            <BackButton />
          </div>
          <div
            className="gx-bg-flex gx-px-5 gx-pt-2 gx-justify-content-start gx-gap-3"
            style={{ gap: "30px" }}
          >
            <RangePicker
              className="gx-mb-2 gx-border-redius0"

              onChange={onChange}
              value={dates}
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
            />
            <div className="">
              <Button
                type="primary"
                className="gx-border-redius0"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
          <div>
            <Table
            className="gx-table-responsive gx-text-uppercase"
              columns={columns}
              dataSource={matchLedger}
              pagination={false}
              size="small"
              bordered
              scroll={{ x: true }}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "gx-bg-light-grey" : ""
              }
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default Basic;