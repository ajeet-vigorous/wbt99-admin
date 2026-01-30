import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inplayOddPosition } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";

const Basic = () => {

  const [showInplayOddsPosition, setInplayOddsPosition] = useState()
  const dispatch = useDispatch();
  const { oddpositionList, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    dispatch(inplayOddPosition());
  }, [dispatch])

  useEffect(() => {
    if (oddpositionList) {
      if (oddpositionList) {
        const data = oddpositionList;
        const dataArray = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const item = {
              key: key,
              data: data[key]
            };
            dataArray.push(item);
          }
        }
        setInplayOddsPosition(dataArray);
      }
    }
  }, [oddpositionList]);

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <> 
          {showInplayOddsPosition && showInplayOddsPosition?.length > 0 ? showInplayOddsPosition?.map((element, index) => (
            <Card style={{ textAlign: "center" }} className="gx-card gx-w-100 gx-flex gx-justify-content-center" title={element.key} key={index}>
              <Row className="gx-px-2" >
                {element?.data?.map((item, ind) => (
                  <Col key={ind} span={12} className="gx-bg-flex gx-py-1  gx-justify-between-center">
                    <div style={{ color: "green", fontWeight: "600" }} className="gx-justify-content-start gx-fs-lg  gx-py-1" >{item.runner_name}</div>
                    <div style={{ border: "2px solid green", textAlign: "center" }} className="gx-justify-content-end gx-py-1 gx-w-50 ">{item.position}</div>
                  </Col>
                ))}
              </Row>
            </Card>

          )) : null} 
           </>} 
    </>
  );
};

export default Basic;
