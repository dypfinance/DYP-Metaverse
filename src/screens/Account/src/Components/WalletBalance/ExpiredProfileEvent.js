import React from "react";
import grayDate from "./assets/grayDate.svg";
import grayDollar from "./assets/grayDollar.svg";
import grayExplore from "./assets/grayExplore.svg";
import grayFind from "./assets/grayFind.svg";
import conflux from "./assets/conflux.svg";
import coingecko from "./assets/coingecko.svg";
import gate from "./assets/gate.svg";
import baseLogo from "./assets/baseLogo.svg";
import dypius from "./assets/dypIcon.svg";
import grayArrow from "./assets/grayArrow.svg";
import doge from "../../../../Marketplace/MarketNFTs/assets/dogeLogo.svg";
import dypiusProfileBanner from "./assets/dypiusProfileBanner.png";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

const ExpiredProfileEvent = ({ onOpenEvent, data, event, userEarnedUsd }) => {
  return (
    <div
      className="profile-event-item d-flex flex-column position-relative"
      style={{
        background: "rgba(184, 184, 224, 0.10)",
        borderBottom: "1px solid #B8B8E0",
      }}
      onClick={onOpenEvent}
    >
      <div className="profile-event-top d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center p-2 gap-2">
          <img
            src={
              event.title === "CoinGecko"
                ? coingecko
                : event.title === "Conflux"
                ? conflux
                : event.title === "Base"
                ? baseLogo
                : event.title === "Dypius"
                ? dypius
                : event.title === "Dogecoin"
                ? doge
                : gate
            }
            height={16}
            width={16}
            alt=""
            className="profilebannerimg"

          />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-1">
              <h6 className="profile-event-title mb-0">{event.title}</h6>
              <div
                className="profile-event-tag position-relative d-flex align-items-center justify-content-center px-1"
                style={{ background: "#B8B8E0", top: 0, right: 0 }}
              >
                <span
                  className="profile-event-tag-text mb-0"
                  style={{ color: "#404040" }}
                >
                  Expired
                </span>
              </div>
            </div>
            <span className="profile-event-rewards mb-0">
              {event.totalRewards}
            </span>
          </div>
        </div>
        {/* <img src={dypiusProfileBanner} alt="" className="dypiusprofile-banner"/> */}
      </div>
      <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-1">
          <img src={grayFind} height={15} width={15} alt="" />
          <span className="mb-0 event-bottom-text" style={{ color: "#B8B8E0" }}>
            {event.title === "Dogecoin" ? "Explore & Mine" : "Explore & Find"}
          </span>
        </div>
        <div className="d-flex align-items-center gap-1">
          {event.title === "Dypius" ? (
            <img src={dypius} height={15} width={15} alt="" />
          ) : (
            <img src={grayDollar} height={15} width={15} alt="" />
          )}

          <span className="mb-0 event-bottom-text" style={{ color: "#B8B8E0" }}>
            {event.title === "Dypius" ? (
              <>{getFormattedNumber(userEarnedUsd, 0)} DYP</>
            ) : (
              <>${getFormattedNumber(userEarnedUsd, 2)}</>
            )}
          </span>
        </div>

        <img src={grayArrow} height={15} width={15} alt="" />
      </div>
    </div>
  );
};

export default ExpiredProfileEvent;
