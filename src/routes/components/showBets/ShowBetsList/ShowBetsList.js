import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpPost } from "../../../../http/http";
import { Table, Card } from "antd"; // Import Ant Design components
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import Loader from "../../../../components/loader";
import TablePagination from "../../../../components/TablePagination";

const ShowBetsList = () => {
  const { marketId, userId } = useParams();
  const [fancyBetList, setFancyBetList] = useState([]);
  const [fancyTotal, setFancyTotal] = useState([])
  const [isFetch, setIsFetch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
let pageSize = 50
  // Function to fetch fancy bet list data
  const getFancyBetList = async () => {
    try {
      const reqData = {
        marketId: marketId,
        fancyBet: true,
        selectionId: userId,
        pageNo: currentPage,
        size: pageSize,
      };

      setIsFetch(true);

      const betList = await httpPost("sports/betsList", reqData);
      if (betList && betList.data && betList.data) {
        setFancyTotal(betList.data?.totalFancyCount)
        const finalBetList = betList.data.fancyBetData?.map(data => {
          let profitLoss = 0;
          if ((data.type === "N" && data.decisionRun > data.run) || (data.type === "Y" && data.decisionRun < data.run)) {
            profitLoss = data.loss;
          } else if ((data.type === "N" && data.decisionRun < data.run) || (data.type === "Y" && data.decisionRun >= data.run)) {
            profitLoss = data.profit;
          }
          return {
            ...data,
            profitLoss
          };
        });

        setFancyBetList(finalBetList);
      }

      setIsFetch(false);
    } catch (error) {
      console.error("Error fetching fancy bet list:", error);
      setIsFetch(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getFancyBetList();
  }, [marketId, userId, currentPage]);


  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Selection',
      dataIndex: 'selection',
      key: 'selection',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Back/Lay',
      dataIndex: 'backLay',
      key: 'backLay',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Stake',
      dataIndex: 'stake',
      key: 'stake',
    },
    {
      title: 'pnl',
      dataIndex: 'pnl',
      key: 'pnl',
    },
  ];


  const generateBetData = () => {
    const data = [];


    fancyBetList.forEach((element, index) => {
      data.push({
        key: index,
        username: `${element.userInfo && element.userInfo.clientName ? element.userInfo.clientName : ""} (${element && element.userInfo && element.userInfo.clientCode ? element.userInfo.clientCode : ""})`,
        date: element && element.createdAt ? moment(element.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A") : "",
        selection: element.sessionName,
        result: element.decisionRun ? element.decisionRun : 0,
        backLay: element.type === "N" ? "No" : "Yes",
        value: Number.parseFloat(element && element.run ? element.run : 0).toFixed(2),
        volume: Number.parseFloat(element && element.odds ? 100 * (element.odds) : 0).toFixed(2),
        stake: element.amount ? Number.parseFloat(element.amount).toFixed(2) : 0,
        pnl: element.profitLoss ? Number.parseFloat(element.profitLoss).toFixed(2) : 0
      });
    });
    return data;
  };
  const completedData = generateBetData();
  const getRowClassName = (record) => {
    return record.pnl < 0 ? 'gx-bg-green-0 gx-text-white' : 'gx-bg-red gx-text-white';
  };

  return (
    <>{isFetch ? <Loader props={isFetch} /> :
      <Card className="gx-card gx-w-100">
        <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
          <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`Event Profit And Loss`}</span>
          <BackButton />
        </div>

        <Table
          size="small"
          dataSource={completedData}
          columns={columns}
          scroll={{ x: true }}
          rowKey="betId"
          bordered
          pagination={false}
          rowClassName={getRowClassName}
        />

        <TablePagination
                    currentPage={currentPage}
                    totalItems={fancyTotal}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                  />

      </Card >}
    </>
  );
};

export default ShowBetsList;
