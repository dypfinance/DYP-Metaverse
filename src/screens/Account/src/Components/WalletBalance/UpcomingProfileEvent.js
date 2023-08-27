import React from 'react'
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import purpleArrow from "./assets/purpleArrow.svg";
import purpleDate from "./assets/purpleDate.svg";
import purpleDollar from "./assets/purpleDollar.svg";
import purpleExplore from "./assets/purpleExplore.svg";
import purpleFind from "./assets/purpleFind.svg";
import confluxProfileBanner from "./assets/confluxProfileBanner.png";

const UpcomingProfileEvent = ({onOpenEvent}) => {
  return (
    <div className="profile-event-item d-flex flex-column position-relative" onClick={onOpenEvent} style={{background: "rgba(140, 86, 255, 0.10)", backdropFilter: "blur(10px)", borderBottom: "1px solid #8C56FF"}}>
    <div className="profile-event-tag d-flex align-items-center justify-content-center px-1" style={{background: "#8C56FF"}}> 
    <span className="profile-event-tag-text mb-0" style={{color: "#FFFFFF"}}>Comming Soon</span>
    </div>
    <div className="profile-event-top d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center p-2 gap-2">
        <img src={conflux} height={16} width={16} alt="" />
        <div className="d-flex flex-column ">
          <h6 className="profile-event-title mb-0">Conflux Pass</h6>
          <span className="profile-event-rewards mb-0">
            $5,000 in CFX rewards
          </span>
        </div>
      </div>
      <img src={confluxProfileBanner} alt=""  />
    </div>
    <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between" >
      <div className="d-flex align-items-center gap-1">
        <img src={purpleExplore} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text" style={{color: "#8C56FF"}}>
          Explore & Mine
        </span>
      </div>
     
      <div className="d-flex align-items-center gap-1">
        <img src={purpleDate} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text" style={{color: "#8C56FF"}}>
          Aug 1, 2023
        </span>
      </div>
      <img src={purpleArrow} height={15} width={15} alt="" />
    </div>
  </div>
  )
}

export default UpcomingProfileEvent