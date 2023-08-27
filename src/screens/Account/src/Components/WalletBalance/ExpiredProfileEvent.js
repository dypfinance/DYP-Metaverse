import React from 'react'
import grayDate from "./assets/grayDate.svg";
import grayDollar from "./assets/grayDollar.svg";
import grayExplore from "./assets/grayExplore.svg";
import grayFind from "./assets/grayFind.svg";
import conflux from "./assets/conflux.svg";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import grayArrow from "./assets/grayArrow.svg";
import confluxProfileBanner from "./assets/confluxProfileBanner.png";



const ExpiredProfileEvent = ({onOpenEvent}) => {
  return (
    <div className="profile-event-item d-flex flex-column position-relative" style={{background: "rgba(184, 184, 224, 0.10)", borderBottom: "1px solid #B8B8E0"}} onClick={onOpenEvent}>
    <div className="profile-event-tag d-flex align-items-center justify-content-center px-1" style={{background: "#B8B8E0"}}> 
    <span className="profile-event-tag-text mb-0" style={{color: "#404040"}}>Expired</span>
    </div>
    <div className="profile-event-top d-flex align-items-center justify-content-between ">
      <div className="d-flex align-items-center p-2 gap-2">
        <img src={coingecko} height={16} width={16} alt="" />
        <div className="d-flex flex-column">
          <h6 className="profile-event-title mb-0">Coingecko Pass</h6>
          <span className="profile-event-rewards mb-0">
            $5,000 in BNB rewards
          </span>
        </div> 
      </div>
      <img src={confluxProfileBanner} alt=""  />

    </div>
    <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-1">
        <img src={grayFind} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text" style={{color: "#B8B8E0"}}>
          Explore & Find
        </span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <img src={grayDollar} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text" style={{color: "#B8B8E0"}}>
          $253.07
        </span>
      </div>
      
      <img src={grayArrow} height={15} width={15} alt="" />
    </div>
  </div>
  )
}

export default ExpiredProfileEvent