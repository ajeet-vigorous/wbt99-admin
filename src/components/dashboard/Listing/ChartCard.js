import React from "react";
import Widget from "components/Widget/index";

const ChartCard = (props) => {

  const { title, desc, percent, icon, prize } = props.chartProperties;
  return (
    <Widget styleName={`gx-card-full gx-bg-transparent`} >
      <div  className={`gx-fillchart gx-overlay-fillchart gx-bg-transparent`} style={{borderRadius: '35px'}}>
        <div className="gx-bg-flex gx-align-items-center gx-fillchart-content " style={{borderRadius: '35px'}}>
          <div className="gx-mr-1">
            {icon}
          </div>
          <div className="gx-media-body">
            <h1 className="gx-fs-md gx-text-uppercase  gx-font-weight-semi-bold  gx-text-white">{title}</h1>
            <h1 className="gx-fs-md gx-text-uppercase gx-font-weight-semi-bold gx-text-white">{percent}</h1>
            <h1 className="gx-fs-md  gx-textuppercase  gx-text-white">{prize}</h1>
            <p className="gx-mb-0 colorInheret">{desc}</p>
          </div>
        </div>
      </div>
    </Widget >
  );
};

export default ChartCard;
