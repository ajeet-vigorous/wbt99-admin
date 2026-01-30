import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const parseMatchDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  const isPM = timePart.includes("PM");

  let hour = parseInt(hours, 10);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minutes);
};
const MatchModal = ({ handleClose, datalist, marketId }) => {
  const history = useHistory();
  const [matchData, setMatchData] = useState([]);
  let adminMatchList = JSON.parse(localStorage.getItem("matchList"));

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : datalist;

    const filteredAndSortedData = matchListData
      ?.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        matchDate: item.matchDate,
        seriesName: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        cacheUrl: item.cacheUrl,
      }))
      .sort(
        (a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate)
      );

    setMatchData(filteredAndSortedData);
  }, [datalist]);

  return (
    <Modal
      open={true}
      title={`All matches`}
      onCancel={handleClose}
      footer={
        <Button
          className="gx-bg-grey gx-text-white gx-border-redius0"
          onClick={() => handleClose()}
        >
          Close
        </Button>
      }
      className="gx-px-3 "
    >
      <div className="bg-gx-flex  gx-flex-column">
        {matchData &&
          matchData.length > 0 &&
          matchData
            .filter((ele) => {
              return ele.marketId !== marketId;
            })
            ?.map((ele, index) => {
              return (
                <a
                key={index}

                className=" gx-px-2 gx-py-2 gx-my-2 gx-w-100 gx-bg-grey gx-flex-column  gx-rounded-xxl gx-font-weight-semi-bold gx-text-white bg-gx-flex gx-justify-content-center gx-align-items-center"
                href={`/components/matchviewdetail/match-view-details/${ele.marketId}/${ele.eventId}`} // Optional: for accessibility
              >
              
                  <span className="gx-py-1">{ele.matchName}</span>
                  <span className="gx-py-1"> 
                  {/* &#128337; */}
                     {ele.matchDate}</span>
                </a>
              );
            })}
      </div>
    </Modal>
  );
};

export default MatchModal;

