import React, { useEffect, useState } from "react";

import "react-tooltip/dist/react-tooltip.css";
import "./_profilecard.scss";
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
// import Countdown from "react-countdown";
import dypMedal from "../../Images/userProfile/dyp-medal.svg";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import Clipboard from "react-clipboard.js";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import copyIcon from "../WalletBalance/assets/copyIcon.svg";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import greenarrow from "./assets/greenarrow.svg";
import logouticon from "./assets/logout.svg";
import player from "./assets/explorePlayer.png";
import triangle from "./assets/triangle.svg";
import sync from "./assets/sync.svg";
import globalRank from "../WalletBalance/assets/globalRank.svg";
import genesisImg from "../WalletBalance/assets/genesisRank.svg";
import multiCaws from "../../../../Caws/assets/images/multi-caws.png";

// const renderer = ({ hours, minutes, seconds }) => {
//   return (
//     <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
//         <span className="days">Hours</span>
//       </div>
//       <h6 className="mint-time">:</h6>
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
//         <span className="days">minutes</span>
//       </div>
//       <h6 className="mint-time">:</h6>
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
//         <span className="days">seconds</span>
//       </div>
//     </div>
//   );
// };

const ProfileCard = ({
  email,
  username,
  balance,
  address,
  handleConnect,
  userId,
  availableTime,
  isVerified,
  handleShowWalletPopup,
  coinbase,
  onSigninClick,
  onLogoutClick,
  onSyncClick,
  syncStatus,
}) => {
  // const [dailyrecords, setRecords] = useState([]);

  // const [userRank, setUserRank] = useState("");
  // const [genesisRank, setGenesisRank] = useState("");
  // const [countdown, setcountdown] = useState();
  // const [isactive, setisActive] = useState(false);
  // const [remainingTime, setRemainingTime] = useState("");

  // const fetchMonthlyRecordsAroundPlayer = async () => {
  //   const data = {
  //     StatisticName: "MonthlyLeaderboard",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );
  //   setRecords(result.data.data.leaderboard);
  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );

  //   setUserRank(testArray[0].position);
  // };

  // const fetchGenesisAroundPlayer = async () => {
  //   const data = {
  //     StatisticName: "GenesisLandRewards",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );

  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );

  //   setGenesisRank(testArray[0].position);
  // };

  // const setlastDay = async () => {
  //   const timeofDeposit_Date = new Intl.DateTimeFormat("en-UK", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   }).format(availableTime);

  //   setRemainingTime(timeofDeposit_Date);
  // };

  // useEffect(() => {
  // fetchMonthlyRecordsAroundPlayer();
  // fetchGenesisAroundPlayer();
  // }, []);

  // useEffect(() => {
  //   if (
  //     !availableTime ||
  //     availableTime === undefined ||
  //     availableTime === "0"
  //   ) {
  //     setisActive(false);
  //   } else {
  //     setisActive(true);
  //     setlastDay();
  //   }
  // }, [availableTime]);

  let id = Math.random().toString(36);

  const windowSize = useWindowSize();
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);

  return (
    <div className="main-wrapper py-4 w-100">
      <div className="row justify-content-center gap-5 gap-lg-0">
        <div className="position-relative px-0 px-lg-3 col-12 col-lg-5 col-xxl-5">
          <div className={"user-cardImg"}>
            <div className="d-flex flex-column justify-content-between gap-2">
              <div className="d-flex gap-2 justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <img src={defaultAvatar} alt="" className="userAvatar" />
                  {isVerified && email ? (
                    <div className="d-flex flex-column gap-1">
                      <span className="usernametext font-organetto">
                        {username}
                      </span>
                      <span className="emailtext">{email}</span>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-1">
                      <span className="usernametext font-organetto">
                        Start your journey now!
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="wallet-balance d-flex flex-column gap-2 position-relative">
                <>
                  <Clipboard
                    component="div"
                    data-event="click"
                    data-for={id}
                    data-tip="Copied To Clipboard!"
                    data-clipboard-text={address}
                    className="wallet-wrapper d-flex align-items-center gap-2 position-relative"
                  >
                    <img src={walletIcon} alt="" className="wallet-icon" />
                    <div className="d-flex flex-column">
                      <span className="wallet-span d-flex align-items-center gap-2">
                        Game Wallet address
                      </span>

                      <div
                        className="d-flex align-items-center gap-2"
                        onClick={() => {
                          setTooltip(true);
                          setTimeout(() => setTooltip(false), 1000);
                        }}
                      >
                        <span className="wallet-address">
                          {shortAddress(
                            isVerified && email ? address : coinbase
                          )}
                        </span>
                        <img src={copyIcon} alt="copy" className="copy-icon" />
                      </div>
                    </div>
                  </Clipboard>
                  {address &&
                    coinbase &&
                    address.toLowerCase() === coinbase.toLowerCase() && (
                      <p className="walletassoc-txt m-0">
                        *This wallet is associated to your game account.
                      </p>
                    )}
                  {address &&
                    email &&
                    coinbase &&
                    syncStatus !== "" &&
                    address.toLowerCase() !== coinbase.toLowerCase() && (
                      <div className="sync-wrapper p-3">
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={triangle}
                            alt=""
                            style={{ width: "21px", height: "20px" }}
                          />
                          <span className="sync-txt">
                            Your gaming account is not linked to the wallet you
                            connected. To update the game wallet address, press
                            the synchronize button.
                          </span>
                        </div>
                      </div>
                    )}
                  <div
                    className={`tooltip-wrapper p-2 ${
                      tooltip && "tooltip-active"
                    }`}
                    style={{ top: "auto", right: 0 }}
                  >
                    <p className="tooltip-content m-0">Copied!</p>
                  </div>
                </>
                {!isVerified || !address || !email ? (
                  // <div
                  //   className="walletconnectBtn w-100"
                  //   onClick={handleShowWalletPopup}
                  // >
                  //   <div className="d-flex gap-2 justify-content-between align-items-center">
                  //     <div className="d-flex gap-2 align-items-center">
                  //       <img src={walletImg} alt="" />
                  //       <div className="d-flex flex-column">
                  //         <span className="firsttitle">Connect wallet</span>
                  //         <span className="secondTitle">Link your wallet</span>
                  //       </div>
                  //     </div>
                  //     <img src={circleArrow} alt="" />
                  //   </div>
                  // </div>
                  <button
                    className="d-flex align-self-end px-3 py-1 align-items-center pill-btn"
                    onClick={() => {
                      !coinbase ? handleShowWalletPopup() : onSigninClick();
                    }}
                    role="button"
                    style={{ width: "fit-content", fontSize: 14 }}
                  >
                    {!coinbase ? "Connect wallet" : "Sign in "}{" "}
                    <img src={greenarrow} alt="" />
                  </button>
                ) : (
                  <div
                    className="d-flex align-self-end align-items-center"
                    style={{
                      width:
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "100%"
                          : "fit-content",
                      justifyContent:
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase()
                          ? "space-between"
                          : "",
                    }}
                  >
                    {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() !== coinbase.toLowerCase() && (
                        <button
                          className="d-flex align-items-center gap-1 syncbtn"
                          onClick={onSyncClick}
                        >
                          <img
                            src={sync}
                            alt=""
                            className={syncStatus === "loading" && "syncicon"}
                          />{" "}
                          {syncStatus === "initial"
                            ? "Synchronize"
                            : syncStatus === "loading"
                            ? "Synchronising..."
                            : syncStatus === "success"
                            ? "Success"
                            : "Error"}
                        </button>
                      )}
                    <button
                      className="failbtn px-3 py-1"
                      onClick={onLogoutClick}
                      role="button"
                    >
                      <img src={logouticon} alt="" /> Log Out
                    </button>
                  </div>
                )}

                {/* : 
                 (
                  <>
                     <Clipboard
                  //     component="div"
                  //     data-event="click"
                  //     data-for={id}
                  //     data-tip="Copied To Clipboard!"
                  //     data-clipboard-text={address}
                  //     className="wallet-wrapper d-flex align-items-center gap-2"
                  //     onClick={() => {
                  //       setTooltip(true);
                  //       setTimeout(() => setTooltip(false), 1000);
                  //     }}
                  //   >
                  //     <img src={walletIcon} alt="" className="wallet-icon" />
                  //     <div className="d-flex flex-column">
                  //       <span className="wallet-span">Wallet address</span>
                  //       <div className="d-flex align-items-center gap-2">
                  //         <span className="wallet-address">
                  //           {shortAddress(address)}
                  //         </span>
                  //         <img
                  //           src={copyIcon}
                  //           alt="copy"
                  //           className="copy-icon"
                  //         />
                  //       </div>
                  //     </div>
                    </Clipboard>
                    <div
                      className={`tooltip-wrapper p-2 ${
                        tooltip && "tooltip-active"
                      }`}
                      style={{ top: "auto", right: 0 }}
                    >
                      <p className="tooltip-content m-0">Copied!</p>
                    </div>
                  </>
                ) */}

                {/* {!address ? (
                  <span className="walletinfo">
                    *Note that once you link a wallet to your profile, it cannot
                    be changed.
                  </span>
                ) : (
                  <span className="walletinfo">
                    *This wallet is associated to your profile and cannot be
                    changed.
                  </span>
                )} */}
              </div>
              {/* {availableTime !== "0" && availableTime && availableTime!==undefined &&  (
            <div className="d-flex flex-column">
            <span className="emailtext" style={{color: '#ffbf00'}}>*Golden Pass</span>
            <span className="emailtext" style={{color: '#00FECF'}}>{remainingTime} (GMT + 2)</span>

            </div>
          )} */}
            </div>
          </div>
          <img src={dypMedal} alt="" className="position-absolute dypMedal" />
        </div>
        <div className="explorebanner col-12 col-lg-7 col-xxl-7 d-flex align-items-center justify-content-around position-relative">
          {/* <div className="d-flex flex-column gap-2 justify-content-center h-100">
            <div className="orangesection">
              <span>World of Dypians</span>
            </div>
            <div className="col-lg-7 col-xxl-7">
              <h5 className="explore-title">
                Explore an exciting digital world
              </h5>
            </div>
          </div>
          <img
            src={player}
            alt=""
            className="position-absolute playerimg"
            style={{
              height:
                address &&
                email &&
                coinbase &&
                syncStatus !== "" &&
                address.toLowerCase() !== coinbase.toLowerCase()
                  ? "450px"
                  : "",
            }}
          /> */}
          {/* <h5 className="bal-txt px-4">My Rankings</h5> */}
          <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
            <img src={globalRank} alt="" />
            <span className="globaltext" style={{ fontSize: 12 }}>
              #
              {/* {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? userRank + 1
                    : "N/A"} */}
              1
            </span>
            <span className="globaltext">Global</span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
            <img src={genesisImg} alt="" className="genesisimg" />
            <span className="genesistext" style={{ fontSize: 12 }}>
              {/* #
                  {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? genesisRank + 1
                    : "N/A"} */}
              1
            </span>
            <span className="genesistext">Genesis</span>
          </div>
          <div className="my-portfolio-btn d-flex flex-column align-items-center gap-2 p-3">
            <img src={multiCaws} className="portfolio-image" alt="" />
            <button className="btn portfolio-btn">My Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
