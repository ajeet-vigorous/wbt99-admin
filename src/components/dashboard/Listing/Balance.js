import React from 'react'
import Widget from "components/Widget/index";
const Balance = (props) => {
  

    const { title,  desc, bgColor, percent, icon ,prize } = props.chartProperties;
    return (
      <Widget styleName={`gx-card-full`}>
        <div className={`gx-fillchart gx-bg-${bgColor} gx-overlay-fillchart`}>
          <div className="gx-media gx-align-items-center gx-flex-nowrap gx-fillchart-content ">
            <div className="gx-mr-2 gx-mr-xl-3">
              <i className={`icon icon-${icon} gx-fs-icon-lg`} />
            </div>
            <div className="gx-media-body">
              <h1 className="gx-fs-lg gx-font-weight-bold  gx-text-white">{title}</h1>
              <h1 className="gx-fs-xl gx-font-weight-semi-bold gx-text-white">{percent}</h1>
              <h1 className="gx-fs-xl gx-font-weight-semi-bold gx-text-white">{prize}</h1>
              <p className="gx-mb-0">{desc}</p>
            </div>
          </div>
        </div>
      </Widget >
    );
}

export default Balance