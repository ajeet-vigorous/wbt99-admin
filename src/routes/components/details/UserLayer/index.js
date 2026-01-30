import React, { Component } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import ChartCard from "components/dashboard/Listing/ChartCard";
import { Link } from "react-router-dom";
import { userTypeInfo } from '../../../../constants/global'

class index extends Component {

  render() {
    let userInfo = JSON.parse(localStorage.getItem('user_id'));
    return (
      <Auxiliary>
        <Row >
          {userTypeInfo && userTypeInfo.length > 0 ? userTypeInfo?.map(item => (
            userInfo.data.userPriority > item.priority ? (
              <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                <Link to={`/components/general/button-${item.userType}/${item.priority}`}>
                  <ChartCard chartProperties={{ title: `${item.userType} Master`, icon: 'avatar', bgColor: 'primary' }} />
                </Link>
              </Col>
            ) : null
          )) : null}
        </Row>

      </Auxiliary>
    );
  }
}

export default index;
