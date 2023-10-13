import React from "react";
import chestOpen from "./assets/chestOpen.png";
import chestClosed from "./assets/chestClosed.png";
import closeX from "./assets/closeX.svg";
import pointsLogo from "./assets/pointslogo.png";
import rewardsLogo from "./assets/rewardslogo.png";
import { useState } from "react";

const DailyBonusPopup = ({ onclose }) => {
  const dummyChests = [
    {
      open: true,
      chestTitle: "Chest #1",
      chestId: 1,
    },
    {
      open: false,
      chestTitle: "Chest #2",
      chestId: 2,
    },
    {
      open: false,
      chestTitle: "Chest #3",
      chestId: 3,
    },
    {
      open: false,
      chestTitle: "Chest #4",
      chestId: 4,
    },
    {
      open: false,
      chestTitle: "Chest #5",
      chestId: 5,
    },
    {
      open: false,
      chestTitle: "Chest #6",
      chestId: 6,
    },
    {
      open: false,
      chestTitle: "Chest #7",
      chestId: 7,
    },
    {
      open: false,
      chestTitle: "Chest #8",
      chestId: 8,
    },
    {
      open: false,
      chestTitle: "Chest #9",
      chestId: 9,
    },
    {
      open: false,
      chestTitle: "Chest #10",
      chestId: 10,
    },
  ];

  const [rewardTypes, setRewardTypes] = useState("standard");

  return (
    <>
      <div className="package-popup2 dragon-popup p-4">
        <img
          src={closeX}
          alt=""
          className="closex position-absolute"
          onClick={onclose}
        />
        <div className="position-relative h-100 rewardinnerwrapper">
          <div className="overlay-container">
            <div className="d-flex flex-column">
              <span className="bonustitle position-relative">Daily Bonus</span>
            </div>
          </div>
          <div className="positon-relative h-100 d-flex flex-column gap-3">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
              <h6 className="chest-event-title mb-0 font-organetto">
                Bounty Rush
              </h6>
              <p className="chest-event-desc mb-0">
                Claim 10 chests daily for a chance to win Game Points, exclusive
                NFTs, and exciting rewards! Don't miss out on your daily dose of
                gaming treasures.
              </p>
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div
                  className={`reward-types ${
                    rewardTypes === "standard" ? "reward-types-active" : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => setRewardTypes("standard")}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Standard
                  </h6>
                </div>
                <div
                  className={`reward-types ${
                    rewardTypes === "premium" ? "reward-types-active" : null
                  } w-50 d-flex align-items-center justify-content-center`}
                  onClick={() => setRewardTypes("premium")}
                >
                  <h6 className="chest-event-title mb-0 font-organetto">
                    Premium
                  </h6>
                </div>
              </div>
              <div className="dailyreward-separator"></div>
            </div>
            <div className="rewardsgrid">
              {dummyChests.map((item) => (
                <div
                  className={` reward-chest ${
                    item.open ? "reward-chest-open" : "reward-chest-closed"
                  } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
                >
                  <div
                    className={`chest-number ${
                      item.open ? "number-open" : "number-closed"
                    } d-flex align-items-center justify-content-center`}
                  >
                    <span className="chest-number-text mb-0">
                      {item.chestId}
                    </span>
                  </div>
                  <img
                    src={item.open ? chestOpen : chestClosed}
                    className="chest-image"
                    alt=""
                  />
                  <h6 className="chest-title mb-0">{item.chestTitle}</h6>
                </div>
              ))}
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button className="btn claim-chest-btn d-flex align-items-center justify-content-center">
                <span className="mb-0">Claim</span>
              </button>
            </div>
            <div className="dailyreward-separator"></div>
            <div className="d-flex flex-column gap-2">
              <span className="font-organetto chestprizetitle text-white">
                CHEST PRIZES
              </span>
              <div className="d-flex align-items-center gap-2 justify-content-between">
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={pointsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">10,000 points</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={rewardsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">$2.5 Rewards</span>
                  </div>
                </div>
                <div className="prizeswrapper">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={rewardsLogo}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-white">1 Genesis land Nft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyBonusPopup;
