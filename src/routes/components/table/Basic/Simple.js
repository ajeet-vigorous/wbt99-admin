

import React, { useEffect, useState } from "react";
import { Card, Spin, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { render } from "nprogress";
import { values } from "lodash";
import { getMatchList } from "../../../../appRedux/actions/User";
import moment from "moment";
import settings from "../../../../domainConfig";

let columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

if (settings?.domainName === 'RACEX9') {
  columns.push({
    title: 'Market ID',
    dataIndex: 'marketId',
    key: 'marketId',
  });
}

columns = [
  ...columns,
  {
    title: 'Open Date',
    dataIndex: 'opendate',
    key: 'opendate',
    render: (value, row) => <span className="">{row.opendate}</span>
  },
  {
    title: 'Competition',
    dataIndex: 'competition',
    key: 'competition',
  },
  {
    title: 'Inplay',
    dataIndex: 'inplay',
    key: 'inplay',
    render: (text, record) => {
      const inputMoment = moment(record?.matchDate, "DD-MM-YYYY HH:mm:ss A");
      const currentMoment = moment().add(30, "minutes");

      return (
        <>
          {currentMoment.isSameOrAfter(inputMoment) ? (
            <button type="button" size="small" class="btn  btn-variant-solid btn-sm">
              <span className="gx-text-uppercase gx-fs-md gx-bg-flex gx-align-items-center gx-font-weight-bold"><div className="green-dot"></div>&nbsp; Inplay</span>
            </button>
          ) : <button type="button" size="small" class="btn  btn-variant-solid btn-sm">
            <span className="gx-text-uppercase gx-fs-md gx-font-weight-bold">Inplay</span>
          </button>}
        </>
      );
    }
  },
  {
    title: 'Details',
    dataIndex: '',
    key: 'x',
    render: (text, record) => (
      <>
        {record?.status === 'INPLAY' ?
          <a
            href={`/components/matchviewdetail/match-view-details/${record.marketId}/${record.eventId}`}
            className="link-button gx-font-weight-semi-bold"
          >
            <button type="button" size="small" class="btn btn-primary btn-color-primary btn-variant-solid btn-sm">
              <span class="ant-btn-icon">
                <span role="img" aria-label="eye" class="anticon anticon-eye">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z">
                  </path>
                  </svg>
                </span>
              </span>
              <span className="gx-px-1">View</span>
            </button>

          </a>
          :
          <span
            className="link-button gx-font-weight-semi-bold gx-text-blue"
            onClick={() => alert('MATCH WILL BE STARTED SOON')}
          >
            Details
          </span>
        }
      </>
    ),
  }
];



const Simple = () => {
  const { matchList, loadingMatch } = useSelector(state => state.UserReducer);
  const [matchData, setMatchData] = useState([])
  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));
  const dispatch = useDispatch();

  const parseMatchDate = (dateString) => {
    if (!dateString) return null; // Handle empty case
    const [datePart, timePart] = dateString.split(' ');

    if (!timePart) return null; // Handle cases with only date

    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const isPM = timePart.includes('PM');

    let hour = parseInt(hours, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minutes);
  };

  const sortMatchData = (data) => {
    return data?.sort((a, b) => {
      const dateA = parseMatchDate(a.matchDate);
      const dateB = parseMatchDate(b.matchDate);
      const isAM_A = a.matchDate.includes('AM');
      const isAM_B = b.matchDate.includes('AM');
      const hasTimeA = a.matchDate.includes(':');
      const hasTimeB = b.matchDate.includes(':');

      const isValidA = !!dateA && (isAM_A || a.matchDate.includes('PM'));
      const isValidB = !!dateB && (isAM_B || b.matchDate.includes('PM'));


      if (isValidA && isValidB) {
        if (isAM_A && !isAM_B) return -1; // A is AM, B is PM
        if (!isAM_A && isAM_B) return 1;  // A is PM, B is AM
        return dateA - dateB; // Both valid, sort by date
      } else if (isValidA) {
        return -1; // A is valid, B is invalid
      } else if (isValidB) {
        return 1; // B is valid, A is invalid
      } else {
        // Both invalid or without AM/PM
        if (!isAM_A && !isAM_B) {
          // Both are invalid, but A has time and B does not
          if (hasTimeA && !hasTimeB) return 1; // A goes last
          if (!hasTimeA && hasTimeB) return -1; // B goes last
          return 0; // Both go last
        }
        return 0; // Both invalid or both with no time
      }
    });
  };

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;

    if (matchListData) {
      let sortedMatchList;

      if (settings.domainName === "PLR11") {
        sortedMatchList = matchListData.filter(item => item?.sportId === 4).slice().sort((a, b) => moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")) ? -1 : 1);
      } else {
        sortedMatchList = matchListData.slice().sort((a, b) => moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")) ? -1 : 1);
      }

      const dateSortedList = sortMatchData(sortedMatchList);
      const data = dateSortedList.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        opendate: item.matchDate,
        competition: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        cacheUrl: item.cacheUrl,
        status: item?.status,
        matchDate: item?.matchDate
      }));

      setMatchData(data);
    }
  }, [matchList]);
  // useEffect(() => {
  //   if (matchList) {
  //     const data = matchList?.map((item, index) => ({
  //       key: item._id,
  //       sn: index + 1,
  //       name: item.matchName,
  //       opendate: item.matchDate,
  //       competition: item.seriesName,
  //       inplay: item.status,
  //       matchName: item.matchName,
  //       marketId: item.marketId,
  //       eventId: item.eventId
  //     }));
  //     setMatchData(data)
  //   }
  // }, [matchList])

  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;
  return (
    <>
      <Card title="Active Matches">
        <Table className="gx-table-responsive gx-text-uppercase gx-text-nowrap"
          columns={columns}
          dataSource={matchData}
          bordered
          pagination={false}
          size="small"
        />
      </Card>
    </>
  );
};

export default Simple;
