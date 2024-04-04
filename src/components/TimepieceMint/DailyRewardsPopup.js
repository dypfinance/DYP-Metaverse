import React from "react";
import avaxMobileBg from "./assets/avaxMobileBg.png";
import coin98MobileBg from "./assets/coin98MobileBg.png";
import baseMobileBg from "./assets/baseMobileBg.png";
import confluxMobileBg from "./assets/confluxMobileBg.png";
import closePopup from "../LandPopup/closePopup.svg";
import rewardsChest from "./assets/rewardsChest.png";
// import sword from "./assets/sword.png";
import { Link, NavLink } from "react-router-dom";
import sword from "./assets/sword1.png";
import rockInner from "./assets/rockInner.png";
import rockOuter from "./assets/rockOuter3.png";

import whiteExplore from "../../screens/Account/src/Components/WalletBalance/assets/whiteExplore.svg";

const DailyRewardsPopup = ({ active, onClose, data }) => {
  return (
    <div
      className={`mint-popup daily-rewards-popup ${
        active && "popup-active"
      } p-4 d-flex flex-column align-items-center justify-content-center`}
      style={{ width: "25%" }}
    >
      <div
        className="w-100 d-flex align-items-center justify-content-end"
        style={{ height: 1 }}
      >
        <img
          src={closePopup}
          width={20}
          height={20}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      <h6 className="mint-popup-title rewards-title">Daily Rewards</h6>

      <div className="position-relative">
        {/* <img src={sword} className="shake-img"  alt="" /> */}
        {/* <img
        src={rewardsChest}
        className={`mint-popup-img  mb-3`}
        style={{
          maxWidth: "100%",
          width: "250px",
          height: "250px",
          marginTop: "75px"
        }}
        alt=""
      /> */}
        <div
          className="position-relative rock-formation d-flex align-items-center justify-content-center"
          style={{
            maxWidth: "100%",
            width: "250px",
            height: "250px",
            marginTop: "75px",
          }}
        >
          <img src={rockInner} className="rock-inner" alt="" />
          <img src={rockOuter} className="rock-outer" alt="" />
          <img src={sword} className="new-sword-2" alt=""  />
        </div>
      </div>

      <div className="available-mint-bg d-flex align-items-center justify-content-center px-2 py-1">
        <span className="popup-available-mint">
          Claim your Daily Rewards Today!
        </span>
      </div>

      <Link
        onClick={onClose}
        to={"/account"}
        // state={{ event: data.state }}
        className="linear-border"
      >
        <button className="btn filled-btn px-4">More</button>
      </Link>
    </div>
  );
};

export default DailyRewardsPopup;
