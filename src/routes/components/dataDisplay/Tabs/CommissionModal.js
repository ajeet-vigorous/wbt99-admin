import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { httpPost } from "../../../../http/http";
import moment from "moment";

const CommissionModal = ({ handleClose, datalist }) => {
  const [commissionListByUserIdData, setCommissionListByUserIdData] = useState(null)
  const [newUserList, setnewUserList] = useState(null)
  const [newfinalList, setfinalUserList] = useState(null)
  const [showDate, setShowDate] = useState({
    startDate: moment().subtract(7, 'days'),
    endDate: moment()
  });


  useEffect(() => {
    commissionListByUserId()
  }, [])

  const commissionListByUserId = async () => {


    try {
      const reqData = {
        "userId": datalist?._id,
        "userType": "client",
        // "fromDate": showDate.startDate.format('YYYY-MM-DD'),
        // "toDate": showDate.endDate.format('YYYY-MM-DD'),
      }
      const result = await httpPost("decision/commissionListByUserId", reqData);

      if (result) {
        if (result.error === false) {
          setCommissionListByUserIdData(result?.data)
        } else {
          // Add error handling code for when result.error is true
          console.error("Error occurred: ", result.message);
        }
      } else {
        console.error("No result returned from the server.");
      }
    } catch (error) {
      // Handle any exceptions that might occur during the HTTP request
      console.error("An exception occurred: ", error.message);
    }
  };
  // useEffect(() => {
  //   if (newUserList) {
  //     let data = newUserList || [];



  //     setfinalUserList([totalRow, ...commissionListByUserIdData]);
  //   }
  // }, [newUserList]);

  useEffect(() => {
    const data = [];

    commissionListByUserIdData?.map((element) => {
      data.push({
        userInfo: element.userInfo,
        eventName: element.eventName,
        oddsComm: element.isCasino === 0 ? element.clientOddsComm : 0,
        casinoComm: element.isCasino !== 0 ? element.clientOddsComm : 0,
        sessionComm: element.clientSessionComm,
        downlineOddsComm: element.isCasino === 0 ? element.agentOddsComm : 0,
        downlineCasinoComm: element.isCasino !== 0 ? element.agentOddsComm : 0,
        downlineSessionComm: element.agentSessionComm,
        dataTime: element?.createdAt
      });
    });
    data.sort((a, b) => moment(b.dataTime).diff(moment(a.dataTime)));

    let oddsCommArray = data.map(item => item.oddsComm);
    let totalOddsComm = oddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let sessionCommArray = data.map(item => item.sessionComm);
    let totalSessionComm = sessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let casinoCommArray = data.map(item => item.casinoComm);
    let totalCasinoComm = casinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let downlineOddsCommArray = data.map(item => item.downlineOddsComm);
    let totalDownlineOddsComm = downlineOddsCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let downlineSessionCommArray = data.map(item => item.downlineSessionComm);
    let totalDownlineSessionComm = downlineSessionCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let downlineCasinoCommArray = data.map(item => item.downlineCasinoComm);
    let totalDownlineCasinoComm = downlineCasinoCommArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);



    // Create a total row and add it to the end of the data array
    const totalRow = {

      oddsComm: totalOddsComm,
      sessionComm: totalSessionComm,
      casinoComm: totalCasinoComm,
      downlineOddsComm: totalDownlineOddsComm,
      downlineSessionComm: totalDownlineSessionComm,
      downlineCasinoComm: totalDownlineCasinoComm,
    };

    setnewUserList([totalRow, ...data]);
  }, [commissionListByUserIdData]);

  const columns = [
    {
      title: "Mila Hai",
      children: [
        {
          title: 'Name',
          dataIndex: 'username',
          render: (value, row) => (

            <span className="gx-text-black" >{row?.eventName}</span>
          ),
        },
        {
          title: 'Date',
          dataIndex: 'dataTime',
          render: (value, row) => (
            <span className="gx-text-black gx-text-nowrap" >{moment(value).format("DD-MM-YYYY hh:mm A")}</span>
          ),
        },
        {
          title: 'M.Comm.',
          dataIndex: 'oddsComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.downlineOddsComm)?.toFixed(2)}`}</span>

        },
        {
          title: 'S.Comm.',
          dataIndex: 'sessionComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.downlineSessionComm)?.toFixed(2)}`}</span>
        },
        {
          title: 'C.Comm.',
          dataIndex: 'casinoComm',
          // render: renderContent,
          render: (value, row) => <span className="gx-text-green-0">{`${(row?.downlineCasinoComm)?.toFixed(2)}`}</span>

        },
        {
          title: 'T.Comm.',
          // dataIndex: 'tComm',
          render: (value, row) => <span className="gx-text-green-0 ">{((parseInt(row?.downlineOddsComm) + parseInt(row?.downlineSessionComm) + parseInt(row?.downlineCasinoComm)))?.toFixed(2)}</span>

          // render: (value, row) => <span className="gx-text-green-0">{((parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)))?.toFixed(2)}</span>



        },


      ]
    },
    {
      title: "Dena hai",
      children: [{
        title: 'M.Comm.',
        dataIndex: 'downlineOddsComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.oddsComm)?.toFixed(2)}`}</span>
      },
      {
        title: 'S.Comm.',
        dataIndex: 'downlineSessionComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.sessionComm)?.toFixed(2)}`}</span>

      },
      {
        title: 'C.Comm.',
        dataIndex: 'downlineCasinoComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red ">{`${(row?.casinoComm)?.toFixed(2)}`}</span>

      },
      {
        title: 'T.Comm.',
        // dataIndex: 'tComm',
        // render: renderContent,
        render: (value, row) => <span className="gx-text-red">{((parseInt(row?.oddsComm) + parseInt(row?.sessionComm) + parseInt(row?.casinoComm)))?.toFixed(2)}</span>

      }]
    },

    
    {
      title: "Bacha Hai",
      children: [
        {
          title: 'Comm',
          render: (value, row) => {
            // Calculate the value
            const total = (parseInt(row?.oddsComm) || 0) + (parseInt(row?.sessionComm) || 0) + (parseInt(row?.casinoComm) || 0);
            const downlineTotal = (parseInt(row?.downlineOddsComm) || 0) + (parseInt(row?.downlineSessionComm) || 0) + (parseInt(row?.downlineCasinoComm) || 0);
            const result = downlineTotal - total;
        
            // Determine the CSS class based on the value
            const textColorClass = result >= 0 ? 'gx-text-green-0' : 'gx-text-red';
        
            // Render the result with the appropriate CSS class
            return <span className={textColorClass}>{result.toFixed(2)}</span>;
          }
        }

      ]
    },
  ];



  return (
    <Modal
      open={true}
      title={`Commission Modal`}
      onCancel={handleClose}
      width={800} // Increase modal width
      footer={
        <Button
          className="gx-bg-grey gx-text-white gx-border-redius0"
          onClick={handleClose}
        >
          Close
        </Button>
      }
      className="gx-px-3"
    >
      <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
        <Table
          className="gx-table-responsive"
          columns={columns}
          dataSource={newUserList}
          bordered
          pagination={false}
          size="small"
          rowClassName={(row, index) => index === 0 ? 'gx-bg-dark gx-font-weight-semi-bold' : 'gx-font-weight-semi-bold'}
        />
      </div>
    </Modal>
  );
};

export default CommissionModal;