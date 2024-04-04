import React, { useEffect, useRef, useState } from "react";

import "react-tooltip/dist/react-tooltip.css";
import "./_profilecard.scss";
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
import defaultAvatarAlert from "../../Images/userProfile/default-avatar-alert.png";
import defaultAvatarPremium from "../../Images/userProfile/defaultAvatarPremium.png";
import defaultAvatarPremiumAlert from "../../Images/userProfile/defaultAvatarPremiumAlert.png";

import genesisRankImg from "../WalletBalance/newAssets/genesisRank.svg";
import globalRank from "../WalletBalance/newAssets/globalRank.svg";
// import Countdown from "react-countdown";
import dypMedal from "../../Images/userProfile/dyp-medal.svg";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import Clipboard from "react-clipboard.js";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import copyIcon from "../WalletBalance/assets/copyIcon.svg";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import xMark from "../WalletBalance/newAssets/xMark.svg";
import greenarrow from "./assets/greenarrow.svg";
import logouticon from "./assets/logout.svg";
import leaderboardIcon from "./assets/leaderboardIcon.svg";
import pointerArrow from "./assets/pointerArrow.svg";
import tooltipIcon from "./assets/tooltipIcon.svg";
import player from "./assets/explorePlayer.png";
import triangle from "./assets/triangle.svg";
import rankGreenArrow from "./assets/rankGreenArrow.svg";
import sync from "./assets/sync.svg";
import walletImg from "../../Images/userProfile/wallet.svg";
import circleArrow from "../../Images/userProfile/arrow-circle.svg";
import blackWallet from "../../Images/userProfile/wallet-black.svg";
import starActive from "./assets/star-active.svg";
import starDefault from "./assets/star-default.svg";
import arrowCircle from "./assets/arrowCircle.svg";
import bustDummy from "./assets/bustDummy.png";
import starterBust from "./assets/starterBust.png";
import rookieBust from "./assets/rookieBust.png";
import underdogBust from "./assets/underdogBust.png";
import championBust from "./assets/championBust.png";
import unstoppableBust from "./assets/unstoppableBust.png";
import skaleActive from "../../Components/LeaderBoard/assets/skaleActive.svg";
import bnbActive from "../../Components/LeaderBoard/assets/bnbActive.svg";
import starAlert from "./assets/star-alert.svg";
import axios from "axios";
import Countdown from "react-countdown";
import { dyp700Address, dyp700v1Address } from "../../web3";
import { DYP_700_ABI, DYP_700V1_ABI } from "../../web3/abis";
import becomePremium from "./assets/becomePremium.svg";
import OutsideClickHandler from "react-outside-click-handler";
import Slider from "react-slick";
import { Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

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
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1b1c3a",
    color: "#fff",
    maxWidth: 220,
    fontFamily: "Poppins",
  },
}));

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
  onLinkWallet,
  isPremium,
  isConnected,
  onOpenLeaderboard,
  onPremiumClick,
  handleSetAvailableTime,
  userRank,
  userRankSkale,
  userBnbScore,
  userSkaleScore,
  genesisRank,
  handleOpenDomains,
  domainName,
}) => {
  let id = Math.random().toString(36);

  const windowSize = useWindowSize();
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);
  const [userRankName, setUserRankName] = useState("starter");
  const [countdown700, setcountdown700] = useState();
  const [bundlesBought, setbundlesBought] = useState(0);
  const [dateofBundle, setdateofBundle] = useState(0);
  const [datewhenBundleBought, setdatewhenBundleBought] = useState(0);
  const [bundleExpireDay, setbundleExpireDay] = useState(0);
  const [bundleExpireMiliseconds, setbundleExpireMiliseconds] = useState(0);
  const [lastDayofBundleHours, setlastDayofBundleHours] = useState(0);
  const [lastDayofBundleMinutes, setlastDayofBundleMinutes] = useState(0);
  const [lastDayofBundleMilliseconds, setlastDayofBundleMilliseconds] =
    useState(0);
  const [lastDayofBundle, setlastDayofBundle] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [dateofBundlev1, setdateofBundlev1] = useState(0);
  const [datewhenBundleBoughtv1, setdatewhenBundleBoughtv1] = useState(0);
  const [rankDropdown, setRankDropdown] = useState(false);
  const [rankPopup, setRankPopup] = useState(false);
  const sliderRef = useRef(null);
  const [rankTooltip, setRankTooltip] = useState(false)

  const userTotalScore = userBnbScore + userSkaleScore;

  const handleUserRank = () => {
    if (userTotalScore > 39999999) {
      setUserRankName("unstoppable");
      sliderRef?.current?.innerSlider?.slickGoTo(4);
      setUserProgress(100);
    } else if (userTotalScore > 23999999) {
      setUserRankName("champion");
      sliderRef?.current?.innerSlider?.slickGoTo(3);
      setUserProgress((userTotalScore / 40000000) * 100);
    } else if (userTotalScore > 11999999) {
      setUserRankName("underdog");
      sliderRef?.current?.innerSlider?.slickGoTo(2);
      setUserProgress((userTotalScore / 24000000) * 100);
    } else if (userTotalScore > 5999999) {
      setUserRankName("rookie");
      sliderRef?.current?.innerSlider?.slickGoTo(1);
      setUserProgress((userTotalScore / 12000000) * 100);
    } else {
      sliderRef?.current?.innerSlider?.slickGoTo(0);
      setUserProgress((userTotalScore / 6000000) * 100);
    }
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  let oneMarch = new Date("2024-03-01 11:11:00 GMT+02:00");
  let oneApril = new Date("2024-04-01 11:11:00 GMT+02:00");
  let oneMay = new Date("2024-05-01 11:11:00 GMT+02:00");

  const countBundle = async () => {
    const result = await axios.get(
      `https://api3.dyp.finance/api/bundles/count/${address}`
    );

    const result_formatted = result.data.count;
    setbundlesBought(result_formatted);
  };

  const handleRefreshCountdown700 = async () => {
    if (bundlesBought === 0) {
      setcountdown700();
      handleSetAvailableTime();
    } else if (bundlesBought > 0) {
      const dypv1 = new window.infuraWeb3.eth.Contract(
        DYP_700V1_ABI,
        dyp700v1Address
      );

      const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

      const remainingTimev1 = await dypv1.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      const remainingTimev2 = await dypv2.methods
        .getTimeOfExpireBuff(coinbase)
        .call();

      var remainingTime_milisecondsv2 = remainingTimev2 * 1000;

      var remainingTime_milisecondsv1 = remainingTimev1 * 1000;
      const timeofDepositv1 = await dypv1.methods
        .getTimeOfDeposit(coinbase)
        .call();

      const timeofDepositv2 = await dypv2.methods
        .getTimeOfDeposit(coinbase)
        .call();

      if (timeofDepositv1 !== 0 || timeofDepositv2 !== 0) {
        remainingTime_milisecondsv1 = timeofDepositv1 * 1000;
        remainingTime_milisecondsv2 = timeofDepositv2 * 1000;

        const timeofDeposit_Datev1 = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(remainingTime_milisecondsv1);

        const timeofDeposit_Date_formattedv1 = new Date(timeofDeposit_Datev1);

        const timeofDeposit_Hoursv1 = timeofDeposit_Date_formattedv1.getHours();
        const timeofDeposit_Minutesv1 =
          timeofDeposit_Date_formattedv1.getMinutes();
        const finalHoursv1 = timeofDeposit_Hoursv1 - 11;

        const finalMinutesv1 = timeofDeposit_Minutesv1 - 11;

        const resultv1 =
          remainingTimev1 - finalHoursv1 * 60 * 60 - finalMinutesv1 * 60;

        const timeofDeposit_Datev2 = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(remainingTime_milisecondsv2);

        const timeofDeposit_Date_formattedv2 = new Date(timeofDeposit_Datev2);
        const timeofDeposit_day = timeofDeposit_Date_formattedv2.getDate();
        const timeofDeposit_Hoursv2 = timeofDeposit_Date_formattedv2.getHours();
        const timeofDeposit_Minutesv2 =
          timeofDeposit_Date_formattedv2.getMinutes();
        const finalHoursv2 = timeofDeposit_Hoursv2 - 11;

        const finalMinutesv2 = timeofDeposit_Minutesv2 - 11;

        const resultv2 =
          remainingTimev2 - finalHoursv2 * 60 * 60 - finalMinutesv2 * 60;
        setcountdown700((resultv2 + resultv1) * 1000);
        handleSetAvailableTime((resultv2 + resultv1) * 1000);
        // setcountdown700(result * 1000);
        //}
      } else {
        setcountdown700();
        handleSetAvailableTime();
      }
    }
  };

  const setlastDay = async (addr) => {
    const dypv1 = new window.infuraWeb3.eth.Contract(
      DYP_700V1_ABI,
      dyp700v1Address
    );

    const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);
    const timeofDeposit = await dypv2.methods.getTimeOfDeposit(addr).call();

    const timeofDepositv1 = await dypv1.methods.getTimeOfDeposit(addr).call();

    if (timeofDeposit !== 0 || timeofDepositv1 !== 0) {
      const timeofDeposit_miliseconds = timeofDeposit * 1000;
      const timeofDeposit_milisecondsv1 = timeofDepositv1 * 1000;

      const timeofbundleBought_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_miliseconds);

      const timeofbundleBought_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timeofDeposit_milisecondsv1);

      const timeofbundleBought_Date_formatted = new Date(
        timeofbundleBought_Date
      );

      const timeofbundleBought_Date_formattedv1 = new Date(
        timeofbundleBought_Datev1
      );

      const timeofbundleBought_day =
        timeofbundleBought_Date_formatted.getDate();

      const timeofbundleBought_dayv1 =
        timeofbundleBought_Date_formattedv1.getDate();

      setdatewhenBundleBought(timeofbundleBought_day);
      setdatewhenBundleBoughtv1(timeofbundleBought_dayv1);

      const expiringTime = await dypv2.methods.getTimeOfExpireBuff(addr).call();

      const expiringTimev1 = await dypv1.methods
        .getTimeOfExpireBuff(addr)
        .call();

      const expiringTime_miliseconds = expiringTime * 1000;
      const expiringTime_milisecondsv1 = expiringTimev1 * 1000;

      const expiringTime_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_miliseconds);

      const expiringTime_Datev1 = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_milisecondsv1);

      const expiringTime_Date_formatted = new Date(expiringTime_Date);
      const expiringTime_Date_formattedv1 = new Date(expiringTime_Datev1);

      setdateofBundle(expiringTime_Date_formatted);
      setdateofBundlev1(expiringTime_Date_formattedv1);

      const expiringTime_day = expiringTime_Date_formatted.getDate();
      setbundleExpireDay(expiringTime_day);
      setbundleExpireMiliseconds(expiringTime_miliseconds);

      const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(expiringTime_miliseconds);

      const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
      const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
      const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
      const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
      const final = timeofDeposit_Hours - 11;
      setlastDayofBundleHours(final);

      const finalMinutes = timeofDeposit_Minutes - 11;

      setlastDayofBundleMinutes(finalMinutes);
      setlastDayofBundle(timeofDeposit_day);
      setlastDayofBundleMilliseconds(expiringTime_miliseconds);
    }
  };

  const checkBundleDates = async () => {
    //you can check how many bundles the user has bought
    //he can buy until the 22 regular bundles (7days)
    //on the 23rd the bundle will be 7+4
    //last week rule: 32 - date => buy on 24rth=>7+1, 25=> 7+0, 26=> 7-1
    // const dypv1 = new window.infuraWeb3.eth.Contract(
    //   DYP_700V1_ABI,
    //   dyp700v1Address
    // );

    // const dypv2 = new window.bscWeb3.eth.Contract(DYP_700_ABI, dyp700Address);

    const week1 = ["1", "2", "3", "4", "5", "6", "7"];
    const week2 = ["8", "9", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25"];

    // const timeofDepositv1 = await dypv2.methods
    //   .getTimeOfDeposit(coinbase)
    //   .call();
    // const timeofDeposit_milisecondsv1 = timeofDepositv1 * 1000;

    // const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // }).format(timeofDeposit_milisecondsv1);

    const today = new Date();
    const today_date = today.getDate();

    // const timeofDeposit_Date_formattedv1 = new Date(timeofDeposit_Date);
    // const timeofDeposit_date = timeofDeposit_Date_formattedv1
    //   .getDate()
    //   .toString();

    if (today_date <= 25) {
      if (week1.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
      } else if (week1.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime_day = bundleExpireDay;
        // const remainingTime_miliseconds = bundleExpireMiliseconds;

        // if (parseInt(remainingTime_day) >= 25) {
        //   const additional_remainingTime_time = 31 - remainingTime_day;
        //   const additional_remaining_time_timestamp =
        //     additional_remainingTime_time * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds) +
        //     Number(additional_remaining_time_timestamp * 1000);

        setcountdown700(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );
        handleSetAvailableTime(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );

        // }
      } else if (
        week2.includes(today_date.toString()) &&
        bundlesBought <= 3 &&
        bundlesBought !== 0
      ) {
        handleRefreshCountdown700();
      } else if (week2.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime2 = lastDayofBundle;
        // if (parseInt(remainingTime2) >= 25) {
        //   const additional_remainingTime_time2 = 31 - remainingTime2;
        //   const additional_remaining_time_timestamp2 =
        //     additional_remainingTime_time2 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;
        //   const remainingTime_miliseconds2 = bundleExpireMiliseconds;

        //   const final =
        //     Number(remainingTime_miliseconds2) +
        //     Number(additional_remaining_time_timestamp2 * 1000);

        setcountdown700(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );
        handleSetAvailableTime(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );

        // }
      } else if (
        week3.includes(today_date.toString()) &&
        bundlesBought <= 3 &&
        bundlesBought !== 0
      ) {
        handleRefreshCountdown700();
      } else if (week3.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime3 = lastDayofBundle;
        // const remainingTime_miliseconds3 = bundleExpireMiliseconds;

        // if (parseInt(remainingTime3) >= 25) {
        //   const additional_remainingTime_time3 = 31 - remainingTime3;
        //   const additional_remaining_time_timestamp3 =
        //     additional_remainingTime_time3 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds3) +
        //     Number(additional_remaining_time_timestamp3 * 1000);

        //   setcountdown700(final);
        //   handleSetAvailableTime(final);
        // setcountdown700(
        //   today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        // );
        // handleSetAvailableTime(
        //   today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        // );
        // setisAtlimit(true);
        // setStatus700(
        //   "The Golden Pass bundle is currently not available for purchase. Please check back next month."
        // );
        // setStatusColor700("#FE7A00");

        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;
        const finalDateofBundleFormatted = new Date(finalDateofBundle);

        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (
          today < finalDateofBundle &&
          today.getFullYear() === finalDateofBundleFormatted.getFullYear()
        ) {
          setcountdown700(
            today < oneApril ? oneApril.getTime() : oneMay.getTime()
          );
          handleSetAvailableTime(
            today < oneApril ? oneApril.getTime() : oneMay.getTime()
          );

          // if (
          //   bundlesBought <= 3 &&
          //   finalDateofBundleBought < today_date &&
          //   finalDateofBundleBought < 16 &&
          //   finalDateofBundleBought !== 0
          // ) {
          //   setcountdown700(finalDateofBundle);
          //   setisAtlimit(false);
          //   handleSetAvailableTime(finalDateofBundle);
          // } else {
          //   setcountdown700(
          //     today < oneNovember
          //       ? oneNovember.getTime()
          //       : oneDecember.getTime()
          //   );
          //   handleSetAvailableTime(
          //     today < oneNovember
          //       ? oneNovember.getTime()
          //       : oneDecember.getTime()
          //   );
          //   setisAtlimit(true);
          //   setStatusColor700("#FE7A00");
          //   setStatus700(
          //     "The Golden Pass bundle is currently not available for purchase. Please check back next month."
          //   );
          // }
        } else if (
          today > finalDateofBundle &&
          bundlesBought > 0 &&
          today.getFullYear() !== finalDateofBundleFormatted.getFullYear()
        ) {
          setcountdown700();
          handleSetAvailableTime();
        }

        // }
      } else if (week4.includes(today_date.toString()) && today_date <= 22) {
        // handleRefreshCountdown700();
        // setisAtlimit(false);
        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

        const finalDateofBundleFormatted = new Date(finalDateofBundle);
        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (today < finalDateofBundle && bundlesBought !== 0) {
          setcountdown700(
            today < oneApril ? oneApril.getTime() : oneMay.getTime()
          );
          handleSetAvailableTime(
            today < oneApril ? oneApril.getTime() : oneMay.getTime()
          );
        } else if (today > finalDateofBundle && bundlesBought > 0) {
          setcountdown700();
          handleSetAvailableTime();
        }
      } else if (week4.includes(today_date.toString()) && today_date > 22) {
        const finalDateofBundle =
          dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

        const finalDateofBundleFormatted = new Date(finalDateofBundle);

        const finalDateofBundleBought =
          datewhenBundleBought >= datewhenBundleBoughtv1
            ? datewhenBundleBought
            : datewhenBundleBoughtv1;

        if (today < finalDateofBundle && bundlesBought !== 0) {
          if (bundlesBought <= 3 && finalDateofBundleBought < today_date) {
            setcountdown700(finalDateofBundle);

            handleSetAvailableTime(finalDateofBundle);
          } else {
            setcountdown700(
              today < oneApril ? oneApril.getTime() : oneMay.getTime()
            );
            handleSetAvailableTime(
              today < oneApril ? oneApril.getTime() : oneMay.getTime()
            );
          }
        } else if (today > finalDateofBundle && bundlesBought > 0) {
          setcountdown700();
          handleSetAvailableTime();
        }
      }
    } else if (today_date > 25) {
      const finalDateofBundle =
        dateofBundle >= dateofBundlev1 ? dateofBundle : dateofBundlev1;

      if (today < finalDateofBundle) {
        setcountdown700(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );
        handleSetAvailableTime(
          today < oneApril ? oneApril.getTime() : oneMay.getTime()
        );
      } else {
        setcountdown700();
        handleSetAvailableTime();
      }
    }
  };

  useEffect(() => {
    countBundle();
    setlastDay(address);
  }, [address]);

  useEffect(() => {
    checkBundleDates();
  }, [bundlesBought, address]);

  useEffect(() => {
    handleUserRank();
  }, [userRank, userRankSkale, userBnbScore, userSkaleScore]);

  return (
    <>
      <div className="main-wrapper py-4 w-100">
        {/* {countdown700 !== 0 && countdown700 && ( */}
        <Countdown
          date={Number(countdown700)}
          onComplete={() => {
            setcountdown700();
            handleSetAvailableTime();
          }}
        />
        {/* )} */}
        <div className="row justify-content-center gap-3 gap-lg-0">
          <div className="position-relative px-lg-3 col-12">
            <div
              className={` ${
                isVerified && email && !isPremium && "user-cardImg-active"
              } ${
                isVerified &&
                email &&
                syncStatus !== "" &&
                isPremium &&
                "user-cardImg-active-premium"
              }  user-cardImg`}
            >
              <div
                className={`bordereddiv ${
                  email && coinbase && username ? "" : "border-bottom-0"
                }`}
              >
                <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row flex-sm-row  justify-content-between gap-2 align-items-start align-items-lg-center align-items-md-center">
                  <div className="d-flex gap-2 justify-content-between align-items-center  w-75">
                    <div className="d-flex align-items-center gap-2 w-100">
                      {(coinbase && !email) ||
                      (!coinbase && !email) ||
                      (coinbase && email && !address && !username) ||
                      (!coinbase &&
                        email &&
                        address &&
                        username &&
                        !isPremium) ||
                      !address ? (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      ) : null}
                      {address && email && coinbase && !isPremium && (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      )}
                      {address && email && isPremium && !coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}
                      {address && email && isPremium && coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}

                      {isVerified && email ? (
                        <div className="d-flex flex-column gap-1 w-100">
                          <span className="usernametext font-organetto d-flex flex-column flex-lg-row flex-md-row align-items-start align-items-lg-center align-items-md-center gap-2">
                            {username}
                            {!domainName && isConnected && (
                              <span
                                className={`${
                                  isPremium
                                    ? "premiumtext-active"
                                    : "premiumtext"
                                }
                              d-flex align-items-center gap-1`}
                                style={{ cursor: "pointer" }}
                                onClick={handleOpenDomains}
                              >
                                {address && email && (
                                  <img
                                    src={isPremium ? starActive : starDefault}
                                  />
                                )}
                                Get domain name
                              </span>
                            )}
                            {/* {!isPremium && email && (
                            <span
                              className="profile-div-title mb-0 text-decoration-underline"
                              style={{
                                color:
                                  coinbase &&
                                  syncStatus !== "" &&
                                  address?.toLowerCase() !==
                                    coinbase?.toLowerCase()
                                    ? "#ED8225"
                                    : "#1BF5FF",
                                cursor: "pointer",
                              }}
                              onClick={onPremiumClick}
                            >
                              Upgrade to Premium
                            </span>
                          )} */}
                          </span>

                          <div className="wallet-balance d-flex flex-column flex-xxl-row flex-lg-row gap-3 position-relative">
                            <>
                              <Clipboard
                                component="div"
                                data-event="click"
                                style={{ border: "none" }}
                                data-for={id}
                                data-tip="Copied To Clipboard!"
                                data-clipboard-text={address}
                                className={`${
                                  isVerified &&
                                  email &&
                                  address?.toLowerCase() ===
                                    coinbase?.toLowerCase() &&
                                  !isPremium &&
                                  "wallet-wrapper-active d-flex bg-transparent p-0"
                                } ${
                                  isVerified &&
                                  email &&
                                  syncStatus === "initial" &&
                                  isPremium &&
                                  "wallet-wrapper-active-premium d-flex bg-transparent p-0"
                                } ${
                                  address &&
                                  email &&
                                  coinbase &&
                                  syncStatus !== "" &&
                                  address.toLowerCase() !==
                                    coinbase.toLowerCase() &&
                                  "wallet-wrapper-alert d-flex bg-transparent p-0"
                                } ${
                                  (coinbase &&
                                    email &&
                                    !address &&
                                    !username) ||
                                  (coinbase && email && !address && username) ||
                                  (!email && !coinbase && "d-none")
                                }  d-flex wallet-wrapper align-items-center gap-2 position-relative`}
                              >
                                {/* {(coinbase || address) && (
                        <img src={walletIcon} alt="" className="wallet-icon" />
                      )} */}
                                <div className="d-flex flex-column">
                                  {/* <span className="wallet-span d-flex align-items-center gap-2">
                          {coinbase && address && email
                            ? "Game Wallet address"
                            : coinbase && !email
                            ? "Wallet address"
                            : !coinbase && address && email
                            ? "Game Wallet address"
                            : ""}
                          {coinbase && (
                            <img
                              src={copyIcon}
                              alt="copy"
                              className="copy-icon"
                            />
                          )}
                        </span> */}

                                  <div
                                    className="d-flex flex-column"
                                    onClick={() => {
                                      setTooltip(true);
                                      setTimeout(() => setTooltip(false), 1000);
                                    }}
                                  >
                                    <span className="emailtext">{email}</span>
                                    {!domainName ? (
                                      <span className="wallet-address">
                                        {windowSize.width > 991
                                          ? isVerified && email
                                            ? address
                                            : coinbase
                                          : isVerified && email
                                          ? shortAddress(address)
                                          : shortAddress(coinbase)}
                                      </span>
                                    ) : (
                                      <span className="wallet-address">
                                        {domainName}
                                      </span>
                                    )}
                                  </div>
                                </div>
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
                          {!coinbase && email && (
                            <button
                              className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                              onClick={() => {
                                handleShowWalletPopup();
                              }}
                              style={{
                                width: "fit-content",
                                whiteSpace: "nowrap",
                                fontSize: 14,
                              }}
                            >
                              <img
                                src={blackWallet}
                                alt=""
                                style={{ width: 18 }}
                              />
                              Connect wallet
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-1 col-lg-7">
                          <span className="usernametext font-organetto">
                            Start your journey now!
                          </span>
                        </div>
                      )}
                    </div>{" "}
                  </div>
                  {!coinbase && !email && (
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                      onClick={() => {
                        handleShowWalletPopup();
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      <img src={blackWallet} alt="" style={{ width: 18 }} />
                      Connect wallet
                    </button>
                  )}
                  {coinbase && address && !email && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && !email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center signinbtn"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{
                        width: "fit-content",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Create player
                      <img src={greenarrow} alt="" />
                    </button>
                  )}
                  {coinbase && email && username && !address && (
                    <div
                      className="walletconnectBtn col-lg-3 col-12"
                      onClick={onLinkWallet}
                    >
                      <div className="d-flex gap-2 justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <img src={walletImg} alt="" />
                          <div className="d-flex flex-column">
                            <span className="secondTitle">Connect wallet</span>

                            <span className="firsttitle">Link your wallet</span>
                          </div>
                        </div>
                        <img src={circleArrow} alt="" />
                      </div>
                    </div>
                  )}

                  {email && address && coinbase && !isPremium && (
                    <div
                      className={` wallet-wrapper-active2 hoveractive position-relative justify-content-between
                    d-flex align-items-center position-relative mt-3 mt-lg-0`}
                      onClick={onPremiumClick}
                    >
                      {/* <div className="table-separator position-absolute"></div> */}
                      <h6 className="become-premium-title mb-0">
                        Become a Premium Member
                      </h6>

                      <img
                        src={becomePremium}
                        alt=""
                        className="become-premium-img"
                      />
                    </div>
                  )}
                  {email && address && (
                    <>
                      <div
                        style={{ height: "79px" }}
                        className={`${
                          isPremium
                            ? "wallet-wrapper-active-premium hoverpremium"
                            : "wallet-wrapper-active hoveractive"
                        }
                    position-relative
                    d-flex  align-items-center justify-content-between gap-3 position-relative mt-3 mt-lg-0`}
                        onClick={onOpenLeaderboard}
                      >
                        {/* {countdown700 && (
                          <div className="golden-pass-wrapper"></div>
                        )}
                        {countdown700 && (
                          <img
                            src={require("./assets/goldenPassTag.png")}
                            alt=""
                            className="golden-pass-tag d-flex d-lg-none"
                          />
                        )} */}
                        <div className="d-flex flex-column">
                          <span className="leaderboard-title-span">Game</span>
                          <span
                            className="leaderboard-title-span"
                            style={{ color: isPremium ? "#FFBF00" : "#1BF5FF" }}
                          >
                            Leaderboard
                          </span>
                        </div>
                        <img
                          src={leaderboardIcon}
                          alt=""
                          style={{ height: "54px", width: "50px" }}
                        />
                      </div>
                      <div className="position-relative rank-outer-wrapper">
                        <div
                          className={`${
                            isPremium
                              ? "wallet-wrapper-active-premium hoverpremium"
                              : "wallet-wrapper-active hoveractive"
                          }
                    position-relative player-rank-wrapper
                    d-flex flex-column align-items-start justify-content-center position-relative mt-3 mt-lg-0`}
                          onClick={() => setRankDropdown(!rankDropdown)}
                        >
                          <img
                            src={
                              userRankName === "starter"
                                ? starterBust
                                : userRankName === "rookie"
                                ? rookieBust
                                : userRankName === "underdog"
                                ? underdogBust
                                : userRankName === "champion"
                                ? championBust
                                : userRankName === "unstoppable"
                                ? unstoppableBust
                                : starterBust
                            }
                            alt=""
                            className="player-bust"
                          />
                          <div className="d-flex flex-column">
                            <span className="my-rank-text">My Rank</span>
                            <h6
                              className="player-rank-text mb-0"
                              style={{
                                color: isPremium ? "#FFBF00" : "#1BF5FF",
                              }}
                            >
                              {userRankName}
                            </h6>
                          </div>
                        </div>
                        {rankDropdown && (
                          <OutsideClickHandler
                            onOutsideClick={() => setRankDropdown(false)}
                          >
                            <div className="player-rank-dropdown p-3 d-flex flex-column gap-2">
                              <div className="bnb-rank-wrapper d-flex align-items-center justify-content-between p-2 position-relative">
                                <img
                                  src={bnbActive}
                                  className="rank-logo-position"
                                  alt=""
                                />
                                <div className="d-flex flex-column">
                                  <span className="new-rank-span">
                                    BNB SCORE
                                  </span>
                                  <h6 className="bnb-rank-score mb-0">
                                    {getFormattedNumber(userBnbScore, 0)}
                                  </h6>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <span className="new-rank-span">RANK</span>
                                  <h6 className="bnb-rank-score mb-0">
                                    #{userRank + 1}
                                  </h6>
                                </div>
                              </div>
                              <div className="skale-rank-wrapper d-flex align-items-center justify-content-between mt-2 p-2 position-relative">
                                <img
                                  src={skaleActive}
                                  className="rank-logo-position"
                                  alt=""
                                />
                                <div className="d-flex flex-column">
                                  <span className="new-rank-span">
                                    SKALE SCORE
                                  </span>
                                  <h6 className="skale-rank-score mb-0">
                                    {getFormattedNumber(userSkaleScore, 0)}
                                  </h6>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                  <span className="new-rank-span">RANK</span>
                                  <h6 className="skale-rank-score mb-0">
                                    #{userRankSkale + 1}
                                  </h6>
                                </div>
                              </div>
                              <hr className="new-rank-divider my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <span
                                  className="current-rank"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  {userRankName}
                                </span>
                                <span
                                  className="current-rank"
                                  style={{ textTransform: "uppercase" }}
                                >
                                  {userRankName === "rookie"
                                    ? "underdog"
                                    : userRankName === "underdog"
                                    ? "champion"
                                    : userRankName === "champion"
                                    ? "unstoppable"
                                    : userRankName === "unstoppable"
                                    ? ""
                                    : "rookie"}
                                </span>
                              </div>
                              <div className="rank-progress-bar d-flex align-items-center px-2 justify-content-between position-relative">
                                <div className="rank-current-progress" style={{width: `${userProgress}%`}}></div>
                                <span className="rank-current-score">
                                  {getFormattedNumber(userTotalScore, 0)}
                                </span>
                                <span className="rank-current-score">
                                  {userRankName === "rookie"
                                    ? "12M"
                                    : userRankName === "underdog"
                                    ? "24M"
                                    : userRankName === "champion"
                                    ? "40M"
                                    : userRankName === "unstoppable"
                                    ? ""
                                    : "6M"}
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <span className="rank-current-reward">
                                  {userRankName === "rookie"
                                    ? "$5"
                                    : userRankName === "underdog"
                                    ? "$10"
                                    : userRankName === "champion"
                                    ? "$25"
                                    : userRankName === "unstoppable"
                                    ? "$100"
                                    : "$0"}
                                </span>
                                <span className="rank-current-reward">
                                  {" "}
                                  {userRankName === "rookie"
                                    ? "$10"
                                    : userRankName === "underdog"
                                    ? "$25"
                                    : userRankName === "champion"
                                    ? "$100"
                                    : userRankName === "unstoppable"
                                    ? ""
                                    : "$5"}
                                </span>
                              </div>
                              <hr className="new-rank-divider my-2" />
                              <div
                                className="rank-popup-btn p-2 d-flex align-items-center justify-content-between"
                                onClick={() => {
                                  setRankPopup(true);
                                  setRankDropdown(false);
                                }}
                              >
                                <span className="open-ranks-text">
                                  Rankings and Rewards
                                </span>
                                <img
                                  src={rankGreenArrow}
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </div>
                              {/* <div
                                className="d-flex align-items-center justify-content-center gap-2 mt-2"
                                onClick={() => {
                                  setRankPopup(true);
                                  setRankDropdown(false);
                                }}
                              >
                                <span className="open-ranks-text mb-0">
                                  Rankings and Rewards
                                </span>
                                <img src={arrowCircle} alt="" />
                              </div> */}
                            </div>
                          </OutsideClickHandler>
                        )}
                      </div>
                    </>
                  )}
                  {/* {availableTime !== "0" && availableTime && availableTime!==undefined &&  (
            <div className="d-flex flex-column">
            <span className="emailtext" style={{color: '#ffbf00'}}>*Golden Pass</span>
            <span className="emailtext" style={{color: '#00FECF'}}>{remainingTime} (GMT + 2)</span>

            </div>
          )} */}
                </div>
              </div>
              <div
                className={`bordereddiv border-0 ${
                  email && coinbase && username ? "py-2" : "p-0"
                }`}
              >
                <div
                  className={`d-flex flex-column flex-xxl-row flex-lg-row  align-items-center gap-2 ${
                    coinbase
                      ? "justify-content-between"
                      : "justify-content-end p-2"
                  } `}
                >
                  {address &&
                    email &&
                    coinbase &&
                    syncStatus !== "" &&
                    address.toLowerCase() !== coinbase.toLowerCase() && (
                      <div className="sync-wrapper">
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={triangle}
                            alt=""
                            style={{ width: "21px", height: "20px" }}
                          />
                          <span className="premiumtext-alert">
                            Your gaming account is not linked to the wallet you
                            connected. To update the game wallet address, press
                            the synchronize button.
                          </span>
                        </div>
                      </div>
                    )}
                  {address &&
                    coinbase &&
                    email &&
                    address?.toLowerCase() === coinbase?.toLowerCase() && (
                      <p className="walletassoc-txt m-0">
                        *This wallet is associated to your game account.
                      </p>
                    )}

                  {!address && coinbase && email && username && (
                    <p className="walletassoc-txt m-0">
                      *There is no wallet address associated with your game
                      account.
                      <br /> Link your wallet to finish setup.
                    </p>
                  )}

                  <div
                    className="d-flex align-items-center gap-2"
                    style={{
                      width: "fit-content",
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
                    {address && email && (
                      <button
                        className="logoutbtn px-3 py-1"
                        onClick={onLogoutClick}
                      >
                        <img src={logouticon} alt="" /> Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="explorebanner col-12 col-lg-7 col-xxl-7 position-relative">
          <div className="d-flex flex-column gap-2 justify-content-center h-100">
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
          />
        </div> */}
        </div>
      </div>
      {rankPopup && (
        <OutsideClickHandler onOutsideClick={() => setRankPopup(false)}>
          <div
            className="popup-wrapper leaderboard-popup popup-active p-3"
            id="leaderboard"
            style={{ width: "70%", pointerEvents: "auto" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <h2
                  className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle rankingsPopupTitle gap-2`}
                >
                  Rankings and Rewards
                </h2>
                <OutsideClickHandler onOutsideClick={() => setRankTooltip(false)}>
                <HtmlTooltip
                   open={rankTooltip}
                   disableFocusListener
                   disableHoverListener
                   disableTouchListener
                  title={
                    <React.Fragment>
                      Rankings and Rewards offer players a way to track their
                      game progress and see the rewards they've earned for each
                      rank. These ranks are determined by the accumulation of
                      in-game points from both the BNB Chain and SKALE Network.
                      <br />
                      <br />
                      Each month, the ranks and points reset, giving everyone a
                      chance for a fresh start. As you climb the ranks, you'll
                      unlock rewards based on your final rank at the end of the
                      cycle.
                      <br />
                      <br />
                      <b>
                        The reward is not accumulative, meaning you only get the
                        reward for the rank you have
                      </b>
                    </React.Fragment>
                  }
                >
                  {" "}
                  <img style={{cursor: "pointer"}} src={tooltipIcon} width={25} height={25} onClick={() => setRankTooltip(true)} alt="" />
                </HtmlTooltip>
                </OutsideClickHandler>
              </div>
              <img
                src={xMark}
                onClick={() => setRankPopup(false)}
                alt=""
                style={{ cursor: "pointer" }}
              />
            </div>
            {windowSize.width > 991 ? (
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={starterBust}
                      className={`${
                        userRankName === "starter"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "starter"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      STARTER
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "starter"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$0</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">0</span>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={rookieBust}
                      className={`${
                        userRankName === "rookie"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "rookie"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      ROOKIE
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "rookie"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$5</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">6,000,000</span>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={underdogBust}
                      className={`${
                        userRankName === "underdog"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "underdog"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNDERDOG
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "underdog"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$10</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">12,000,000</span>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={championBust}
                      className={`${
                        userRankName === "champion"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "champion"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      CHAMPION
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "champion"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$25</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">24,000,000</span>
                  </div>
                </div>
                <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={unstoppableBust}
                      className={`${
                        userRankName === "unstoppable"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "unstoppable"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNSTOPPABLE
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "unstoppable"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$100</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">40,000,000</span>
                  </div>
                </div>
              </div>
            ) : (
              <Slider {...settings} ref={(c) => (sliderRef.current = c)}>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={starterBust}
                      className={`${
                        userRankName === "starter"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "starter"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      STARTER
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "starter"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$0</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">0</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={rookieBust}
                      className={`${
                        userRankName === "rookie"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "rookie"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      ROOKIE
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "rookie"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$5</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">6,000,000</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={underdogBust}
                      className={`${
                        userRankName === "underdog"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "underdog"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNDERDOG
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "underdog"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$10</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">12,000,000</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={championBust}
                      className={`${
                        userRankName === "champion"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "champion"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      CHAMPION
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "champion"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$25</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">24,000,000</span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
                  <div className="d-flex flex-column align-items-center gap-0">
                    <img
                      src={unstoppableBust}
                      className={`${
                        userRankName === "unstoppable"
                          ? "rank-img-active"
                          : "rank-img-inactive"
                      }`}
                      alt=""
                    />
                    <h6
                      className={`rank-title ${
                        userRankName === "unstoppable"
                          ? "rank-title-active"
                          : "rank-title-inactive"
                      } font-oxanium text-white mb-0`}
                    >
                      UNSTOPPABLE
                    </h6>
                  </div>
                  <div
                    className={` ${
                      userRankName === "unstoppable"
                        ? "rank-active-div"
                        : "rank-inactive-div"
                    }  d-flex align-items-center justify-content-center`}
                  >
                    <h6>$100</h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <span className="needed-points-span mb-0">
                      Points Required
                    </span>
                    <span className="needed-points mb-0">40,000,000</span>
                  </div>
                </div>
              </Slider>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default ProfileCard;
