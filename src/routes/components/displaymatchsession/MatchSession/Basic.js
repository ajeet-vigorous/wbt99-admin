import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select, Table } from "antd";
import { useParams } from "react-router-dom";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanSportsBetsList,
  getClientListByMarketId,
  getMatchDetail,
  getOddsPosition,
  getSportsBetsList,
} from "../../../../appRedux/actions/User";
import moment from "moment";


const Basic = () => {
  const { Option } = Select;
  const { marketId } = useParams();
  const { clientListByMarketId, sportsBetsList, matchDetailsResponse, oddsPossition } = useSelector(
    (state) => state.UserReducer
  );
  const [parsedTeamData, setparsedTeamData] = useState()
  const dispatch = useDispatch();
  const [positionDetails, setpositionsDetails] = useState('')
  useEffect(() => {
    dispatch(cleanSportsBetsList());
    let reqData = {
      marketId: marketId,
    };
    dispatch(getClientListByMarketId(reqData));
    dispatch(getMatchDetail(reqData));
  }, [marketId]);



  let totalOddsProfitLoss = 0;

  if (sportsBetsList?.data?.oddsBetData?.length > 0) {
    sportsBetsList?.data?.oddsBetData?.forEach((element, key) => {
      let profitLoss = 0;
      if (element.isDeclare === 1) {
        profitLoss = element.positionInfo[element.decisionSelectionId];
      }

      totalOddsProfitLoss += profitLoss;
      sportsBetsList.data.oddsBetData[key].profitLoss = profitLoss;
    });
  }

  // if (matchDetailsResponse) {
  //   const parsedData2 = JSON.parse(matchDetailsResponse?.teamData);
  // }


  useEffect(() => {
    if (matchDetailsResponse) {
      const parsedData = JSON.parse(matchDetailsResponse?.teamData);
    
      
      setparsedTeamData(parsedData);
    }
  }, [matchDetailsResponse]);

  const columns = [
    {
      title: "Sr",
      dataIndex: "sr",
      key: "sr",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },

    {
      title: "Odds Type",
      dataIndex: "oddsType",
      key: "oddsType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "PNL",
      dataIndex: "pnl",
      key: "pnl",
    },
    // ...(parsedTeamData?.map((team, index) => ({
    //   title: team.runner_name,
    //   dataIndex: `team${index + 1}`,
    //   key: `team${index + 1}`,
    // })) || []),
    {
      title: "Date and Time",
      dataIndex: "datentime",
      key: "datentime",
    },
  ];

  let totalProfitLoss = 0;
  if (sportsBetsList?.data?.fancyBetData?.length > 0) {
    sportsBetsList?.data?.fancyBetData?.forEach((data, key) => {
      let profitLoss = 0;
      if (data.isDeclare) {
        if (data.decisionRun >= data.run && data.type === "Y") {
          profitLoss += data.amount * data.odds;
        } else if (data.decisionRun >= data.run && data.type === "N") {
          profitLoss += -1 * data.amount * data.odds;
        } else if (data.decisionRun < data.run && data.type === "Y") {
          profitLoss += -1 * data.amount;
        } else if (data.decisionRun < data.run && data.type === "N") {
          profitLoss += data.amount;
        }
      }
      totalProfitLoss += profitLoss;
      sportsBetsList.data.fancyBetData[key].profitLoss = profitLoss;
    });
  }

  let data = [];
  let teamTotals = [];
  if (matchDetailsResponse && sportsBetsList && sportsBetsList.data && sportsBetsList.data.oddsBetData && sportsBetsList.data.oddsBetData.length > 0) {
    parsedTeamData?.forEach((team, teamIndex) => {
      teamTotals[teamIndex] = {
        team: `team${teamIndex + 1}`,
        total: 0,
      };
    });
    sportsBetsList.data.oddsBetData?.forEach((element, index) => {
      let newData = {
        key: index,
        sr: index + 1,
        rate: element.odds,
        mode: element.type || "",
        team: element.teamName,
        amount: element.amount.toFixed(2),
        pnl: element.profitLoss.toFixed(2),
        oddsType: element?.oddsType,
        datentime: element.createdAt
          ? moment(element.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A")
          : "",
      };
      
      // parsedTeamData?.forEach((team, teamIndex) => {
      //   let teamPropertyName = `team${teamIndex + 1}`;
      //   console.log(team, "team");
        
      //   let amount = Number.parseFloat(element.positionInfo[team.selection_id]);
      //   console.log(element.positionInfo,"amount");
      //   console.log(amount,"amount1");
      //   newData[teamPropertyName] = amount.toFixed(0);
      //   teamTotals[teamIndex].total += amount;
      // });
      data.push(newData);
    });
  }


  
  const columns2 = [
    {
      title: "Sr",
      dataIndex: "sr",
      key: "sr",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Run",
      dataIndex: "run",
      key: "run",
    },
    {
      title: "Decision Run",
      dataIndex: "decisionRun",
      key: "decisionRun",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "PNL",
      dataIndex: "pnl",
      key: "pnl",
      
    },
    {
      title: "Date and Time",
      dataIndex: "datentime",
      key: "datentime",
    },
  ];

  const data2 = [];
  sportsBetsList &&
    sportsBetsList?.data &&
    sportsBetsList.data?.fancyBetData &&
    sportsBetsList.data.fancyBetData.length > 0 &&
    sportsBetsList.data.fancyBetData?.map((element, index) => {
      data2.push({
        key: index,
        sr: index + 1,
        session: element.sessionName,
        rate: element && element.odds ? element.odds : "",
        run: element && element.run ? element.run : "",
        decisionRun: element && element.decisionRun ? element.decisionRun : "",
        mode: element && element.type === "N" ? "No" : "Yes",
        amount: element.amount.toFixed(2),
        totalOddsProfitLoss: totalOddsProfitLoss.toFixed(0),
        pnl: <span className={element && element?.profitLoss > 0 ? " gx-text-red" : "gx-text-green-0"}>
          {
            Number.parseFloat(Math.abs(element.profitLoss).toFixed(2))
          } </span>,

        datentime:
          element && element.createdAt
            ? moment(element.createdAt)
              .utcOffset("+05:30")
              .format("DD MMM hh:mm:ss A")
            : "",

      });
    });

  const [fieldsUser, setFieldsUser] = useState({});
  const [errorsUser, setErrorsUser] = useState({});

  const onChange = (value) => {

    setFieldsUser((prevFieldsUser) => ({
      ...prevFieldsUser,
      clientId: value,
    }));
    setErrorsUser((prevErrorsUser) => ({
      ...prevErrorsUser,
      clientId: "",
    }));
    const reqData = {
      marketId: marketId,
      fancyBet: true,
      oddsBet: true,
      isDeleted: false,
      downlineUserId: value,
      downlineUserType: "client",
    };
    dispatch(getSportsBetsList(reqData));
    getOddsPositionByUserId(value)

  };
  function convertKeyObject(objectData, objectKey) {
    let returnDataObject = {};
    objectData?.map((data, key) => {
      let hasKey = returnDataObject.hasOwnProperty(data.objectKey);
      if (!hasKey) {
        returnDataObject[data[objectKey]] = data;
      }
    });
    return returnDataObject;
  }


  const getOddsPositionByUserId = async (data) => {
    let reqData = {
      "marketId": marketId,
      "userId": data,
      "userType": "client"
    }
    dispatch(getOddsPosition(reqData))

    // let positionDetails = await httpPost("sports/getOddsPosition", reqData);
    if (oddsPossition?.data) {
      const finalPos = convertKeyObject(positionDetails?.data?.data, "_id")
      setpositionsDetails(finalPos)
    }
  }

  const summary1 = () => {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} className="gx-font-weight-bold">Total</Table.Summary.Cell>
        <Table.Summary.Cell index={1}></Table.Summary.Cell>
        <Table.Summary.Cell index={2}></Table.Summary.Cell>
        <Table.Summary.Cell index={3}></Table.Summary.Cell>
        <Table.Summary.Cell index={4}></Table.Summary.Cell>
        <Table.Summary.Cell index={5}></Table.Summary.Cell>
        <Table.Summary.Cell index={6} className={totalOddsProfitLoss > 0 ? 'gx-text-green-0 gx-font-weight-bold' : 'gx-text-red gx-font-weight-bold'}>
              {totalOddsProfitLoss}
              </Table.Summary.Cell>
       
              <Table.Summary.Cell index={7} >
             
              </Table.Summary.Cell>
            

       
            
   
        
        <Table.Summary.Cell index={8}>
         
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
  
  const summary2 = () => {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} className="gx-font-weight-bold">Total</Table.Summary.Cell>
        <Table.Summary.Cell index={1}></Table.Summary.Cell>
        <Table.Summary.Cell index={2}></Table.Summary.Cell>
        <Table.Summary.Cell index={3}></Table.Summary.Cell>
        <Table.Summary.Cell index={4}></Table.Summary.Cell>
        <Table.Summary.Cell index={5}></Table.Summary.Cell>
        <Table.Summary.Cell index={6}></Table.Summary.Cell>
        <Table.Summary.Cell index={7} className={totalProfitLoss > 0 ? 'gx-text-red gx-font-weight-bold' : 'gx-text-green-0 gx-font-weight-bold'}>{Number.parseFloat(Math.abs(totalProfitLoss)).toFixed(2)}</Table.Summary.Cell>
        <Table.Summary.Cell index={8}></Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
  

  return (
    <Card className="gx-card  gx-w-100">
      <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex">
        <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-2 gx-text-capitalize">
          {`Match & Session Bet Details MatchCode : ${marketId}`}
        </span>
        <BackButton />
      </div>

      <div className="flex p-3 space-x-2">
        <div className="gx-bg-flex gx-align-items-center gx-justify-content-start gx-pt-3 gx-px-4">
          <Select
            showSearch
            placeholder="Select a person"
            onChange={onChange}
            optionFilterProp="children"
            style={{width: 320}}
   
          >
            {clientListByMarketId && clientListByMarketId.length > 0
              ? clientListByMarketId?.map((user) => (
                <Option key={user.clientId} value={user.clientId}>
                  {user.userInfo.name} ({user.userInfo.username})
                </Option>
              ))
              : null}
          </Select>
        </div>
        <div className=" gx-pt-3 space-x-2">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <Table
                cellPaddingBlockSM
                pagination={false}
                bordered
                scroll={{ x: true }}
                size="small"
                columns={columns}
                dataSource={data}
                summary={summary1}
              />
            </Col>
            <Col xs={24} lg={12}>
              <Table
                cellPaddingBlockSM
                pagination={false}
                bordered
                scroll={{ x: true }}
                size="small"
                columns={columns2}
                dataSource={data2}
                summary={summary2}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default Basic;