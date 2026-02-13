import React from "react";
import Widget from "components/Widget/index";

const ChartCard = (props) => {

  const { title, desc, percent, icon, prize } = props.chartProperties;
  return (
    <div styleName={`gx-card-full gx-bg-transparent `} style={{ borderRadius: '35px', padding: "10px 0px",   }}>
      <div className={`gx-fillchart gx-overlay-fillchart  gx-bg-flex gx-align-items-center gx-bg-transparent`} style={{
        borderRadius: '35px', height: "90px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "15px 2px",
      }}>
        <div className="gx-bg-flex gx-align-items-center gx-fillchart-content " style={{ borderRadius: '35px' }}>
          <div className="gx-mr-1">
            {icon}
          </div>
          <div className="gx-media-body ">
            <span className="gx-fs-md gx-text-uppercase  gx-font-weight-semi-bold  gx-text-white">{title}</span>
            {percent && <span className="gx-fs-md gx-text-uppercase gx-font-weight-semi-bold gx-text-white">{percent}</span>}
            {prize && <span className="gx-fs-md  gx-textuppercase  gx-text-white">{prize}</span>}
            {desc && <p className="gx-mb-0 colorInheret">{desc}</p>}
          </div>
        </div>
      </div>
    </div >

  );
};

export default ChartCard;
