import React from 'react'
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import cyanArrow from "./assets/cyanArrow.svg";
import conflux from "./assets/conflux.svg";
import cyanDate from "./assets/cyanDate.svg";
import cyanDollar from "./assets/cyanDollar.svg";
import cyanExplore from "./assets/cyanExplore.svg";


const ActiveProfileEvent = ({onOpenEvent}) => {
  return (
    <div className="profile-event-item d-flex flex-column position-relative" onClick={onOpenEvent}>
    <div className="profile-event-tag d-flex align-items-center justify-content-center px-1"> 
    <span className="profile-event-tag-text mb-0">Live</span>
    </div>
    <div className="profile-event-top d-flex align-items-center justify-content-between p-2">
      <div className="d-flex align-items-center gap-2">
        <img src={coin98} height={16} width={16} alt="" />
        <div className="d-flex flex-column">
          <h6 className="profile-event-title mb-0">Coin98 Pass</h6>
          <span className="profile-event-rewards mb-0">
            $5,000 in C98 rewards
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-1">
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">14</h6>
          <span className="profile-time-desc mb-0">Days</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">23</h6>
          <span className="profile-time-desc mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number mb-0">:</h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0">46</h6>
          <span className="profile-time-desc mb-0">Minutes</span>
        </div>
      </div>
    </div>
    <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-1">
        <img src={cyanExplore} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text">
          Explore & Mine
        </span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <img src={cyanDollar} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text">
          $253.07
        </span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <img src={cyanDate} height={15} width={15} alt="" />
        <span className="mb-0 event-bottom-text">
          Aug 1, 2023
        </span>
      </div>
      <img src={cyanArrow} height={15} width={15} alt="" />
    </div>
  </div>
  )
}

export default ActiveProfileEvent