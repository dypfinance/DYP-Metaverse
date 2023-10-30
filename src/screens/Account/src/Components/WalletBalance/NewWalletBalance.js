import React, { useState, useRef } from "react";
import arrowCircle from "./newAssets/arrowCircle.svg";

import premium from "./newAssets/premium.svg";
import successMark from "./newAssets/successMark.svg";
import nonPremium from "./newAssets/nonPremium.svg";
import myRewards from "./newAssets/myRewards.svg";
import "./_walletbalance.scss";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "./newAssets/xMark.svg";
import "../../../../../components/LandPopup/_landpopup.scss";
import TextField from "@mui/material/TextField";
import dailyRewards from "./newAssets/dailyRewards.png";
import dailyRewardsFinished from "./newAssets/dailyRewardsFinished.png";
import gameEvents from "./newAssets/gameEvents.png";
import readyBorder from "./newAssets/readyBorder.svg";
import styled from "styled-components";
import stakeNft from "./newAssets/stakeNft.png";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import ActiveProfileEvent from "./ActiveProfileEvent";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import UpcomingProfileEvent from "./UpcomingProfileEvent";
import NewBetaEventCard from "../../../../Marketplace/components/NewBetaEventCard";
import conflux from "./assets/conflux.svg";
import gate from "./assets/gate.svg";

import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import gateUpcoming from "../../../../Marketplace/assets/gateUpcoming.webp";

import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "../../../../Marketplace/assets/coingeckoUpcoming.png";
import baseUpcoming from "../../../../Marketplace/assets/baseUpcoming.webp";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import grayDollar from "./assets/grayDollar.svg";
import eventsArrow from "./assets/eventsArrow.svg";
import infoIcon from "../../../../Marketplace/assets/infoIcon.svg";
import coingeckoPopupImage from "./assets/coingeckoPopupImage.png";
import eventPopupImageBase from "./assets/eventPopupImageBase.png";

import gatePopupImage from "./assets/gatePopupImage.png";
import confluxPopupImage from "./assets/eventPopupImage.png";
import Countdown from "react-countdown";
import viewAllArrow from "./assets/viewAllArrow.svg";
import BetaEventCard from "../../../../Marketplace/components/BetaEventCard";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#62688F",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#62688F",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#171932",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#62688F",
      fontFamily: "Poppins",
      background: "#171932",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#62688F",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#171932",
      borderRadius: "8px",
    },
  },
});

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-start popup-timer mt-4 mt-lg-0 gap-1">
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc-2 mb-0">Days</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc-2 mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc-2 mb-0">Minutes</span>
        </div>
      </div>
    </>
  );
};
const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const NewWalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  email,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  userId,
  username,
  listedNFTS,
  landStaked,
  myCawsWodStakes,
  myWodWodStakes,
  myCawsCollected,
  myCawsOldCollected,
  myLandCollected,
  myTimepieceCollected,
  myBoughtNfts,
  isConnected,
  handleConnect,
  ethTokenData,
  dypTokenData,
  favoritesArray,
  latestBoughtNFTS,
  myOffers,
  allActiveOffers,
  myNFTSCoingecko,
  myGateNfts,
  myConfluxNfts,
  onDailyRewardsPopupOpen,
  onOpenLeaderboard,
  isPremium,
  onRewardsClick,
  onPremiumClick,
  onBalanceClick,
  claimedChests,
  claimedPremiumChests,
}) => {
  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let now = new Date().getTime();
  const midnight = new Date(now).setUTCHours(24, 0, 0, 0);

  const dummyConflux = {
    title: "Conflux",
    chain: "Conflux Network",
    linkState: "conflux",
    rewards: "CFX",
    status: "Live",
    id: "event1",
    eventType: "Explore & Mine",
    date: "Oct 06, 2023",
    logo: conflux,
    totalRewards: "$2,000 in CFX Rewards",
    eventDuration: confluxLastDay,
    minRewards: "1",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "20,000",
    learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
  };

  const dummyGate = {
    title: "Gate.io",
    chain: "BNB Chain",
    linkState: "gate",
    rewards: "BNB",
    status: "Live",
    id: "event6",
    eventType: "Explore & Mine",
    date: "Oct 20, 2023",
    logo: gate,
    totalRewards: "$2,000 in BNB Rewards",
    eventDuration: gateLastDay,
    minRewards: "0.5",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "20,000",
    learnMore: "/news/653290f5b3f3545e9500f557/Gate-Treasure-Hunt-Event",
  };

  const dummyCoingecko = {
    title: "CoinGecko",
    chain: "BNB Chain",
    linkState: "coingecko",
    rewards: "BNB",
    status: "Live",
    id: "event3",
    eventType: "Explore & Mine",
    date: "Sept 25, 2023",
    logo: coingecko,
    totalRewards: "$10,000 in BNB Rewards",
    eventDuration: coingeckoLastDay,
    minRewards: "1",
    maxRewards: "100",
    minPoints: "5,000",
    maxPoints: "50,000",
    learnMore: "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
  };
  const dummyCoin98 = {
    title: "Coin98 Pass",
    chain: "BNB Chain",
    linkState: "coin98",
    rewards: "BNB",
    status: "Expired",
    id: "event2",
    eventType: "Explore & Mine",
  };
  const dummyBase = {
    eventType: "Explore & Mine",
    title: "Base",
    chain: "Base Chain",
    linkState: "base",
    rewards: "ETH",
    status: "Coming Soon",
    id: "event4",
    date: "Coming Soon",
    totalRewards: "$5,000 in ETH Rewards",
    eventDuration: gateLastDay,
    backgroundImage: baseUpcoming,
    logo: base,
    date: "Coming Soon",
    minRewards: "0.5",
    maxRewards: "20",
    minPoints: "5,000",
    maxPoints: "30,000",
  };

  const dummyBetaPassData = [
    {
      title: "Conflux (CFX)",
      logo: conflux,
      eventStatus: "Live",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 120.45,
      eventType: "Explore & Mine",
      eventDate: "Ends in 28 days",
      backgroundImage: confluxUpcoming,
      popupInfo: {
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Live",
        id: "event1",
        eventType: "Explore & Mine",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
      },
    },
    {
      title: "Coin98 (C98)",
      logo: coin98,
      eventStatus: "Coming Soon",
      totalRewards: "$3,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "April, 1, 2024",
      backgroundImage: coin98Upcoming,
      popupInfo: {
        title: "Coin98 Pass",
        chain: "BNB Chain",
        linkState: "coin98",
        rewards: "BNB",
        status: "Coming Soon",
        id: "event2",
        eventType: "Explore & Mine",
      },
    },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Upcoming",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 120.0,
      eventType: "Explore & Mine",
      eventDate: "11/09/2023",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Upcoming",
        id: "event3",
        eventType: "Explore & Mine",
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Expired",
      totalRewards: "$3,000 in BASE Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "Expired",
      backgroundImage: baseUpcoming,
      popupInfo: {
        title: "Base Pass",
        chain: "BNB Chain",
        linkState: "base",
        rewards: "BASE",
        status: "Expired",
        id: "event4",
        eventType: "Explore & Mine",
      },
    },
  ];

  const dummyBetaPassData2 = [
    // {
    //   title: "Avalanche",
    //   logo: avaxLogo,
    //   eventStatus: "Coming Soon",
    //   totalRewards: "$3,000 in AVAX Rewards",
    //   myEarnings: 0.0,
    //   eventType: "Explore & Mine",
    //   eventDate: "September xx, 2023",
    //   backgroundImage: avaxUpcoming,
    //   popupInfo: {
    //     title: "Avalanche",
    //     chain: "Avalanche",
    //     linkState: "coingecko",
    //     rewards: "AVAX",
    //     status: "Coming Soon",
    //     id: "event5",
    //   eventType: "Explore & Mine",

    //   },
    // },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Live",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "September 25, 2023",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Live",
        id: "event3",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in BNB Rewards",
        eventDuration: coingeckoLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/6511853f7531f3d1a8fbba67/CoinGecko-Treasure-Hunt-Event",
      },
    },
    {
      title: "Conflux",
      logo: conflux,
      eventStatus: "Live",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "October 06, 2023",
      backgroundImage: confluxUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Live",
        id: "event1",
        totalRewards: "$2,000 in CFX Rewards",
        eventDuration: confluxLastDay,
        eventDate: "October 06, 2023",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
    {
      title: "Gate.io",
      logo: gate,
      eventStatus: "Live",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "October 20, 2023",
      backgroundImage: gateUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "GT",
        status: "Live",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "October 20, 2023",
        date: "Oct 20, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Coming Soon",
      totalRewards: "$5,000 in ETH Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "November 01, 2023",
      backgroundImage: baseUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Chain",
        linkState: "base",
        rewards: "ETH",
        status: "Coming Soon",
        id: "event4",
        date: "November 01, 2023",
        totalRewards: "$5,000 in ETH Rewards",
        eventDuration: gateLastDay,
        eventDate: "November 01, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
      },
    },
  ];

  const [dummyEvent, setDummyEvent] = useState({});
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [eventPopup, setEventPopup] = useState(false);

  const [userRank, setUserRank] = useState("N/A");
  const [genesisRank, setGenesisRank] = useState("N/A");
  const [records, setRecords] = useState([]);
  const [activeSlide, setActiveSlide] = useState();
  const [showNext, setShowNext] = useState();
  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [specialRewardsPopup, setSpecialRewardsPopup] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [finished, setFinished] = useState(false);
  const [userPoints, setuserPoints] = useState(0);
  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnETH, setuserEarnETH] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);
  const [confluxUserPoints, setConfluxUserPoints] = useState(0);
  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnCFX, setConfluxEarnCFX] = useState(0);
  const [gateEarnUSD, setgateEarnUSD] = useState(0);
  const [gateUserPoints, setgateUserPoints] = useState(0);
  const [gateEarnBnb, setgateEarnBnb] = useState(0);
  const slider = useRef(null);
  const [showFirstNext, setShowFirstNext] = useState(false);
  const html = document.querySelector("html");
  const windowSize = useWindowSize();
  const releaseContent = useRef();
  const releaseContent2 = useRef();
  const betaSlider = useRef();
  const [selectedEvent, setSelectedEvent] = useState({});
  const [eventsPopup, setEventsPopup] = useState(false);
  const [stakePopup, setStakePopup] = useState(false);

  const dummyEvents = [
    {
      name: "Treasure Hunt",
      img: "treasureHunt",
      id: "treasure-hunt",
      desc: "The Treasure Hunt event is a series of local events organized by Partners in the World of Dypians. Players need to visit partner areas daily to complete tasks and earn rewards. There are different reward pools available for each partner.",
      button: "Get Beta Pass",
    },
    {
      name: "Dragon Ruins",
      img: "dragonRuins",
      id: "dragon-ruins",
      desc: "The Dragon Ruins event provides players with the opportunity to battle a mystical creature. Players engage in battles with a Dragon, and upon winning, they earn leaderboard points to increase their global rank.",
      button: "Buy",
    },
    {
      name: "Puzzle Madness",
      img: "puzzleMadness",
      id: "puzzle-madness",
      desc: "In the Puzzle Madness event, players must find 10 hidden pieces in the mining and city maps, earning valuable points to compete on daily, weekly, and monthly leaderboards. These pieces also include a score multiplier, ranging from x2 to x10, which activates after collecting all 10, significantly increasing earned points. ",
      button: "Buy",
    },
    {
      name: "Golden Pass",
      img: "goldenPass",
      id: "golden-pass",
      desc: "The Golden Pass bundle allows players to earn double rewards based on their leaderboard ranking. The bundle is available for 7 days and can be purchased up to 4 times. When a player acquires the fourth bundle, they will gain access to the event for the remaining duration until the end of the month.",
      button: "Buy",
    },
    {
      name: "Critical Hit",
      img: "criticalHit",
      id: "critical-hit",
      desc: "The Treasure Hunt event is a series of local events organized by Partners in the World of Dypians. Players need to visit partner areas daily to complete tasks and earn rewards. There are different reward pools available for each partner.",
      button: "Get Genesis Land",
    },
  ];

  const openEvents = () => {
    setShowAllEvents(!showAllEvents);
  };

  const validateUrl = (url) => {
    let errors = {};
    let regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let match = url.match(regex);

    if (!match) {
      errors.url = "URL is not valid";
    }

    return errors;
  };

  const fetchCFXPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=conflux-token&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["conflux-token"] && obj.data["conflux-token"] !== NaN) {
          setCfxPrice(obj.data["conflux-token"].usd);
        }
      });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setErrors(validateUrl(mediaUrl));
    if (Object.keys(validateUrl(mediaUrl)).length === 0) {
      const data = {
        email: email,
        url: mediaUrl,
        walletAddress: address,
      };

      if (email !== "" && mediaUrl !== "" && address !== "") {
        const send = await axios
          .post("https://api.worldofdypians.com/api/new-submission", data)
          .then(function (result) {
            console.log(result.data);
            setSuccess(result.data.message);
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }

    setLoading(false);
  };

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      const response = await fetch(
        "https://worldofdypiansutilities.azurewebsites.net/api/GetTreasureHuntData",
        {
          body: JSON.stringify({
            email: email,
            publicAddress: userAddress,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          redirect: "follow",
          mode: "cors",
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.events) {
          const coingeckoEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coingecko";
          });
          const confluxEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "conflux";
          });

          const gateEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "gate";
          });

          const points = coingeckoEvent[0].reward.earn.totalPoints;
          setuserPoints(points);

          const usdValue =
            coingeckoEvent[0].reward.earn.total /
            coingeckoEvent[0].reward.earn.multiplier;
          setuserEarnUsd(usdValue);
          if (bnbPrice !== 0) {
            setuserEarnETH(usdValue / bnbPrice);
          }

          const cfxPoints = confluxEvent[0].reward.earn.totalPoints;
          setConfluxUserPoints(cfxPoints);

          if (confluxEvent[0].reward.earn.multiplier !== 0) {
            const cfxUsdValue =
              confluxEvent[0].reward.earn.total /
              confluxEvent[0].reward.earn.multiplier;
            setConfluxEarnUSD(cfxUsdValue);
            if (cfxPrice !== 0) {
              setConfluxEarnCFX(cfxUsdValue / cfxPrice);
            }
          }

          const gatePoints = gateEvent[0].reward.earn.totalPoints;
          setgateUserPoints(gatePoints);

          if (gateEvent[0].reward.earn.multiplier !== 0) {
            const gateUsdValue =
              gateEvent[0].reward.earn.total /
              gateEvent[0].reward.earn.multiplier;
            setgateEarnUSD(gateUsdValue);

            setgateEarnBnb(gateUsdValue / bnbPrice);
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (email && address) {
      fetchTreasureHuntData(email, address);
    }
  }, [email, address, bnbPrice, cfxPrice]);

  useEffect(() => {
    if (specialRewardsPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [specialRewardsPopup]);

  useEffect(() => {
    if (showAllEvents && windowSize.width > 786) {
      releaseContent.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }

    if (showAllEvents && windowSize.width < 786) {
      releaseContent2.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [showAllEvents]);

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
        setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDataavax = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setDypTokenDataAvax(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  const firstNext = () => {
    slider.current.slickNext();
  };
  const firstPrev = () => {
    slider.current.slickPrev();
  };

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setShowFirstNext(current);
    },
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
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

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );
      setRecords(result.data.data.leaderboard);
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setUserRank(testArray[0].position);
    }
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };

    if (userId) {
      const result = await axios.post(
        `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      setGenesisRank(testArray[0].position);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDatabnb();
    getTokenDataavax();
    fetchCFXPrice();
  }, []);

  useEffect(() => {
    if (claimedChests === 10 && !isPremium) {
      setFinished(true);
    }

    if (claimedChests === 10 && claimedPremiumChests === 10 && isPremium) {
      setFinished(true);
    }
  }, [claimedChests, claimedPremiumChests]);

  return (
    <>
      <div className="container px-0">
        <div className="row gap-3 gap-lg-0 mx-0">
          <div className="col-12 rankings-outer-wrapper px-0 pe-lg-3 col-lg-4 position-relative">
            <div className="purple-container rankings-wrapper px-4 py-3  d-flex flex-column gap-2 position-relative custom-height-2 ">
              <div className="green-div"></div>
              <h6
                className="profile-div-title mb-0"
                // style={{ fontSize: '14px'}}
              >
                Treasure Hunt
              </h6>{" "}
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyCoingecko);
                  setEventPopup(true);
                }}
                data={dummyCoingecko}
                event={dummyCoingecko}
                userEarnedUsd={userEarnUsd}
              />
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyConflux);
                  setEventPopup(true);
                }}
                data={dummyConflux}
                event={dummyConflux}
                userEarnedUsd={confluxEarnUSD}
              />
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyGate);
                  setEventPopup(true);
                }}
                data={dummyGate}
                event={dummyGate}
                userEarnedUsd={gateEarnUSD}
              />
              {/* <img
                src={eventSkeleton}
                className="profile-event-item"
                style={{
                  background: "none",
                  borderBottom: "none",
                  transform: "translateX(0px)",
                }}
                alt=""
              /> */}
              {/* <img
                src={eventSkeleton}
                className="profile-event-item"
                style={{
                  background: "none",
                  borderBottom: "none",
                  transform: "translateX(0px)",
                }}
                alt=""
              /> */}
              {/* <div className="d-flex w-100 justify-content-center">
                <span className="seller-addr">Special events comming soon</span>
                </div> */}
              {dummyBetaPassData2.length > 3 && (
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openEvents()}
                  style={{
                    cursor: "pointer",
                    width: "fit-content",
                    position: "relative",
                    bottom: "-5px",
                    left: "43%",
                  }}
                >
                  <span className="account-view-all">
                    {showAllEvents ? "View Less" : "View All"}
                  </span>
                  <img
                    src={viewAllArrow}
                    style={{ rotate: showAllEvents ? "0deg" : "180deg" }}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          {showAllEvents && windowSize.width < 786 ? (
            <div className="col-12 p-lg-3">
              <div
                className="nft-outer-wrapper2 position-relative p-3 p-lg-5 gap-2"
                style={{
                  maxWidth: "100vw",
                  width: "100%",
                  display: windowSize.width < 786 ? "block" : "none",
                }}
                ref={releaseContent2}
              >
                <div className="d-flex flex-column gap-4">
                  {dummyBetaPassData2.map((item, index) => (
                    <BetaEventCard
                      data={item}
                      key={index}
                      onOpenPopup={() => {
                        setEventPopup(true);
                        setDummyEvent(item.popupInfo);
                      }}
                      userEarnUsd={
                        item.title === "Conflux"
                          ? confluxEarnUSD
                          : item.title === "Gate.io"
                          ? 0
                          : userEarnUsd
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {/* <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-2">
              <div
                className="purple-container position-relative p-3 d-flex align-items-center justify-content-between"
                onClick={onOpenLeaderboard}
                style={{ cursor: "pointer" }}
              >
                <div className="green-div"></div>
                <div
                  className="d-flex flex-column justify-content-between"
                  style={{ height: "90px" }}
                >
                  <h6 className="profile-div-title mb-0">
                    Leaderboard Rankings
                  </h6>
                  <div className="d-flex align-items-center gap-2 green-link">
                    <span className="profile-div-link mb-0">View</span>
                    <img src={rightIcon} alt="" />
                  </div>
                </div>
               
              </div>
              <div className="purple-container p-3 position-relative d-flex flex-column gap-3" onClick={onBalanceClick} >
                <div className="green-div"></div>

                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0 profile-div-title">My Balance</h6>
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="profile-div-chain mb-0"
                      style={{
                        color:
                          activeSlide === 0
                            ? "#5871D2"
                            : activeSlide === 1
                            ? "#D9A908"
                            : "#DF2C2D",
                      }}
                    >
                      {activeSlide === 0
                        ? "Ethereum Network"
                        : activeSlide === 1
                        ? "BNB Chain"
                        : "Avalanche Network"}
                    </span>
                    <img
                      src={
                        activeSlide === 0
                          ? ethIcon
                          : activeSlide === 1
                          ? bnbIcon
                          : avaxIcon
                      }
                      width={12}
                      height={12}
                      alt=""
                    />
                  </div>
                </div>
                <Slider {...settings}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalance, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${getFormattedNumber(dypBalance * dyptokenData, 2)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalance, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${getFormattedNumber(idypBalance * idyptokenData, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalancebnb, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalancebnb, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(
                          idypBalancebnb * idyptokenDatabnb,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={dypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(dypBalanceavax, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        ${" "}
                        {getFormattedNumber(
                          dypBalanceavax * dyptokenDataAvax,
                          2
                        )}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex align-items-center gap-2">
                        <img src={iDypIcon} alt="" />
                        <span className="profile-div-tokens mb-0">
                          {getFormattedNumber(idypBalanceavax, 2)}
                        </span>
                      </div>
                      <span className="profile-div-usd mb-0">
                        $
                        {getFormattedNumber(
                          idypBalanceavax * idyptokenDataAvax,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </Slider>
              </div>
              {!isPremium ? (
                <div
                  className="red-container position-relative p-3 d-flex align-items-center justify-content-between"
                  onClick={onPremiumClick}
                >
                  <div className="green-div"></div>
                  <div className="d-flex flex-column gap-4">
                    <h6 className="profile-div-title mb-0">
                      Upgrade to Premium
                    </h6>
                    <div className="d-flex align-items-center gap-2 green-link">
                      <span className="profile-div-link mb-0">Subscribe</span>
                      <img src={rightIcon} alt="" />
                    </div>
                  </div>
                  <img src={nonPremium} alt="" />
                </div>
              ) : (
                <div className="premium-active-container position-relative p-3 d-flex align-items-center justify-content-between">
                  <div className="green-div"></div>

                  <div className="d-flex flex-column gap-2">
                    <h6 className="profile-div-title mb-0">Premium Member</h6>
                    <div className="d-flex align-items-center gap-2 col-7 ">
                      <div
                        className={` 
                          wallet-wrapper-active-premium d-flex
                            d-flex wallet-wrapper align-items-center gap-2 position-relative`}
                      >
                        <img src={walletIcon} alt="" className="wallet-icon" />

                        <div className="d-flex flex-column">
                          <span className="wallet-span d-flex align-items-center gap-2">
                            Wallet address
                          </span>

                          <div className="d-flex align-items-center gap-2">
                            <span className="wallet-address">
                              {shortAddress(address)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={premium} alt="" className="premium-img" />
                </div>
              )}
            </div>
          </div> */}
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-between gap-3 px-0 gap-lg-0">
            <div className="row gap-3 gap-lg-0">
              <div className="col-12 col-lg-4">
                <div
                  className="daily-bonus-wrapper"
                  onClick={onDailyRewardsPopupOpen}
                >
                  <div className="green-div"></div>
                  <img
                    src={finished ? dailyRewardsFinished : dailyRewards}
                    className={`${
                      finished
                        ? "daily-rewards-img-finished"
                        : "daily-rewards-img"
                    }`}
                    alt=""
                  />
                  <div className="progress-bar-group d-flex align-items-center gap-3 me-2">
                    <div className="green-progress-outer">
                      <span className="mb-0 chest-progress">
                        {claimedChests}/10
                      </span>
                      <div
                        className="green-progress-inner"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <div className="yellow-progress-outer">
                      <span className="mb-0 chest-progress">
                        {claimedPremiumChests}/10
                      </span>
                      <div
                        className="yellow-progress-inner"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0">Daily Bonus</h6>

                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        className="position-relative"
                        style={{ width: "96px", height: "40px", right: "0px" }}
                      >
                        <span className="ready-to-claim mb-0">
                          {finished ? "Reset Time" : "Ready to Claim"}
                        </span>
                        <img
                          src={readyBorder}
                          alt=""
                          className={`${
                            finished ? "ready-border-2" : "ready-border"
                          }`}
                        />
                      </div>
                      {finished && (
                        <span className="timer-text mb-0">
                          <Countdown date={midnight} renderer={renderer2} /> 
                        </span>
                      )}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  className="game-events-wrapper d-flex"
                  onClick={() => {
                    setEventsPopup(true);
                    setSelectedEvent(dummyEvents[0]);
                  }}
                >
                  <div className="green-div"></div>
                  <img src={gameEvents} className="game-events-img" alt="" />
                  <div className="d-flex flex-column gap-3 h-100 p-3 justify-content-between">
                    <h6 className="profile-div-title mb-0">Live Events</h6>
                    <p className="profile-div-desc mb-0">
                      Experience excitement by different on-chain events
                    </p>
                    <div className="d-flex align-items-center gap-2 green-link">
                      <img src={arrowCircle} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  className="profile-staking-wrapper d-flex"
                  onClick={() => setStakePopup(true)}
                >
                  <div className="green-div"></div>
                  <img src={stakeNft} alt="" className="profile-staking-img" />
                  <div className="d-flex flex-column gap-3 h-100 p-3 justify-content-between">
                    <h6 className="profile-div-title mb-0">Stake NFT</h6>
                    <p className="profile-div-desc mb-0">
                      Earn $ETH daily rewards by staking your NFTs
                    </p>

                    <div className="d-flex align-items-center gap-2 green-link">
                      <img src={arrowCircle} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row gap-3 gap-lg-0">
              <div className="col-12 col-lg-8" onClick={onRewardsClick}>
                <div className="my-rewards-wrapper">
                  <div className="green-div"></div>

                  <div className="my-total-rewards-wrapper d-flex flex-column align-items-center gap-2">
                    <h6 className="my-total-rewards mb-0 font-iceland">
                      $435.25
                    </h6>
                    <span className="my-total-earned mb-0 font-iceland">
                      Total Earned
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0 ">My Rewards</h6>
                    <div className="view-rewards-btn">
                      <span className="instaketxt2 mb-0">View All</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  className="special-rewards-wrapper"
                  onClick={() => setSpecialRewardsPopup(true)}
                >
                  <div className="green-div"></div>

                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <h6 className="profile-div-title mb-0">
                      Special <br /> Rewards
                    </h6>
                    <div className="d-flex flex-column align-items-baseline">
                      <h6
                        className="my-total-rewards mb-0 font-iceland"
                        style={{ fontSize: "20px" }}
                      >
                        $435.25
                      </h6>
                      <span
                        className="my-total-earned mb-0 font-iceland"
                        style={{ fontSize: "16px" }}
                      >
                        Rewards
                      </span>
                    </div>
                    <div className="instakeWrapper3">
                      <span className="instaketxt2 mb-0">Submit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {specialRewardsPopup && (
        <OutsideClickHandler
          onOutsideClick={() => setSpecialRewardsPopup(false)}
        >
          <div
            className="popup-wrapper popup-active p-3"
            style={{ width: "30%", pointerEvents: "auto" }}
          >
            {success === "Email sent successfully" ? (
              <>
                <div className="d-flex align-items-center justify-content-end w-100 mb-4">
                  <img
                    src={xMark}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSpecialRewardsPopup(false)}
                    alt=""
                  />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
                  <h6 className="rewards-success-title font-organetto">
                    Successfully
                  </h6>
                  <h6
                    className="rewards-success-title font-organetto"
                    style={{ color: "#8C56FF" }}
                  >
                    Applied
                  </h6>
                </div>
                <div className="d-flex w-100 justify-content-center mb-4">
                  <img src={successMark} alt="" />
                </div>
                <div className="d-flex w-100 justify-content-center">
                  <p
                    className="popup-paragraph w-50"
                    style={{ textAlign: "center" }}
                  >
                    Congratulations, your Special Reward application request is
                    submitted. Please check back soon when our team reviews your
                    application.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between w-100 mb-4">
                  <h6 className="popup-title-2 mb-0">Special Rewards</h6>
                  <img
                    src={xMark}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSpecialRewardsPopup(false)}
                    alt=""
                  />
                </div>
                <p className="popup-paragraph">
                  The Special Rewards program is designed to recognize and
                  reward players for sharing their World of Dypians gameplay
                  content on various social media platforms, including X
                  (Twitter), Instagram, TikTok, YouTube, Facebook, Reddit, and
                  more.
                  <ul className="mt-3">
                    <li>
                      Minimum requirement of 1,000 followers on social media.
                    </li>
                  </ul>
                </p>
                <p className="popup-paragraph mb-4">
                  The WoD Team will review the quality of the content, the
                  engagement of the post, and other details. If you are
                  eligible, they will determine the reward, which is distributed
                  in BNB on a monthly basis.
                </p>
                <p className="popup-paragraph mb-4">
                  <b>*Note:</b> You can submit one post per time. The team will
                  not reply in any form, but if you are eligible, you will see
                  the reward here. The display of the rewards will occur every
                  Monday.
                </p>
                <div className="d-flex align-items-center gap-4 mb-4">
                  <StyledTextField
                    error={errors?.url ? true : false}
                    size="small"
                    label="URL"
                    id="email"
                    name="email"
                    value={mediaUrl}
                    helperText={errors?.url}
                    required
                    onChange={(e) => {
                      setMediaUrl(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <div
                    className={`${
                      !email || !address
                        ? "linear-border-disabled"
                        : "linear-border"
                    }`}
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <button
                      className={`btn ${
                        !email || !address
                          ? "outline-btn-disabled"
                          : "filled-btn"
                      } px-5`}
                      onClick={handleSubmit}
                      disabled={!email || !address ? true : false}
                    >
                      {loading ? (
                        <div
                          class="spinner-border text-light spinner-border-sm"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
                <hr className="linear-divider" />
                <div className="d-flex align-items-center justify-content-between">
                  <span className="my-special-rewards mb-0">My Rewards</span>
                  <h6 className="my-special-rewards-value mb-0">$12</h6>
                </div>
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
      {showAllEvents && (
        <div className="col-12 py-lg-3">
          <div
            className="purple-container position-relative p-3 p-lg-3 gap-2"
            style={{
              maxWidth: "100vw",
              width: "100%",
              display: windowSize.width > 786 ? "block" : "none",
            }}
            ref={releaseContent}
          >
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.map((item, index) => (
                <NewBetaEventCard
                  data={item}
                  key={index}
                  onOpenPopup={() => {
                    setEventPopup(true);
                    setDummyEvent(item.popupInfo);
                  }}
                  userEarnUsd={
                    item.title === "Conflux"
                      ? confluxEarnUSD
                      : item.title === "Gate.io"
                      ? gateEarnUSD
                      : userEarnUsd
                  }
                />
              ))}
            </Slider>
          </div>
        </div>
      )}

      {eventPopup && (
        <OutsideClickHandler onOutsideClick={() => setEventPopup(false)}>
          <div className="profile-event-popup p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <h6 className="event-popup-title mb-0">{dummyEvent?.title}</h6>
                <div
                  className={`${
                    dummyEvent?.status === "Live"
                      ? "event-popup-status-live"
                      : dummyEvent?.status === "Coming Soon"
                      ? "event-popup-status-upcoming"
                      : "event-popup-status-expired"
                  }  d-flex align-items-center justify-content-center p-1`}
                >
                  {dummyEvent.status === "Live" && (
                    <div
                      class="pulsatingDot"
                      style={{ width: 7, height: 7, marginRight: 5 }}
                    ></div>
                  )}
                  <span className="mb-0">{dummyEvent?.status}</span>
                </div>
              </div>
              <img
                src={require("./assets/closeMark.svg").default}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => setEventPopup(false)}
              />
            </div>
            <div className="profile-event-popup-wrapper mb-3 p-2 p-lg-3 h-auto">
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
                <div className="d-flex gap-2">
                  <img
                    src={
                      dummyEvent?.linkState === "conflux"
                        ? confluxPopupImage
                        : dummyEvent?.linkState === "gate"
                        ? gatePopupImage
                        : dummyEvent?.linkState === "base"
                        ? eventPopupImageBase
                        : coingeckoPopupImage
                    }
                    alt=""
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <h6 className="popup-second-title m-0">
                        {dummyEvent?.title}
                      </h6>
                      <span className="popup-rewards">
                        {dummyEvent.totalRewards}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="event-popup-chain mb-0">
                        Gameplay: {dummyEvent?.eventType}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="event-popup-chain mb-0">
                        Chain: {dummyEvent?.chain}
                      </span>
                    </div>
                  </div>
                </div>
                {dummyEvent?.status === "Live" && (
                  <Countdown
                    renderer={renderer}
                    date={dummyEvent.eventDuration}
                  />
                )}
                {dummyEvent?.status === "Coming Soon" && (
                  <div className="d-flex flex-column">
                    <span className="live-on">Live on</span>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={require("./assets/greenCalendar.svg").default}
                        className="green-calendar"
                        alt=""
                      />
                      <h6 className="live-on-date mb-0">{dummyEvent?.date}</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="how-it-works mb-0">How it works?</h6>
              {dummyEvent.status === "Live" && (
                <NavLink
                  to={dummyEvent.learnMore}
                  className="events-page-details d-flex align-items-center gap-2"
                >
                  Learn more
                  <img src={eventsArrow} alt="" />
                </NavLink>
              )}
            </div>
            <div className="row mb-3 gap-3 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="profile-event-popup-wrapper p-3">
                  <h6 className="popup-green-text">Details</h6>
                  {dummyEvent.id === "event1" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;{" "}
                      <b>hold a Conflux Beta Pass NFT</b>. You can get the
                      Conflux Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Conflux area, players not only stand a
                      chance to secure daily rewards in CFX, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Conflux area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event2" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;{" "}
                      <b>hold a Coin98 Beta Pass NFT</b>. You can get the Coin98
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Coin98 area, players not only stand a chance to secure
                      daily rewards in C98, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the Coin98 area to uncover
                      hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event3" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a CoinGecko Beta Pass NFT</b>. You can get the
                      CoinGecko Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the CoinGecko area, players not only stand a
                      chance to secure daily rewards in BNB, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      CoinGecko area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event6" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Gate Beta Pass NFT</b>. You can get the Gate
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      Gate.io area, players not only stand a chance to secure
                      daily rewards in BNB, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the Gate.io area to
                      uncover hidden treasures.
                    </p>
                  ) : (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;{" "}
                      <b>hold a Base Beta Pass NFT</b>. You can get the Base
                      Beta Pass NFT from the World of Dypians Marketplace. By
                      engaging in the game on a daily basis and exploring the
                      downtown area, players not only stand a chance to secure
                      daily rewards in ETH, but also earn points for their
                      placement on the global leaderboard. Remember to log in to
                      the game daily and venture into the downtown area to
                      uncover hidden treasures.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="profile-event-popup-wrapper p-3">
                  <h6 className="popup-green-text">Benefits</h6>
                  <ul>
                    <li className="popup-event-desc">Exclusive Event Access</li>
                    <li className="popup-event-desc">
                      Daily Rewards range from ${dummyEvent.minRewards} to $
                      {dummyEvent.maxRewards}
                    </li>
                    <li className="popup-event-desc">
                      Daily Points range from {dummyEvent.minPoints} to{" "}
                      {dummyEvent.maxPoints}
                    </li>

                    <li className="popup-event-desc">
                      Earn{" "}
                      {dummyEvent.id === "event1"
                        ? "CFX"
                        : dummyEvent.id === "event2"
                        ? "C98"
                        : dummyEvent.id === "event3"
                        ? "BNB"
                        : dummyEvent.id === "event6"
                        ? "GT"
                        : "ETH"}{" "}
                      rewards
                    </li>
                    <li className="popup-event-desc">
                      Get global leaderboard points
                    </li>
                    <li className="popup-event-desc">Community Engagement</li>
                    <li className="popup-event-desc">Exploration Adventures</li>
                  </ul>
                </div>
              </div>
            </div>
            <h6 className="how-it-works">
              Learn more about{" "}
              {dummyEvent.id === "event1"
                ? "Conflux Network"
                : dummyEvent.id === "event2"
                ? "Coin98"
                : dummyEvent.id === "event3"
                ? "CoinGecko"
                : dummyEvent.id === "event6"
                ? "Gate.io"
                : "Base Network"}
            </h6>
            {dummyEvent.id === "event1" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Conflux Network stands as a Layer 1 public blockchain solution,
                uniquely blending the advantages of both public and private
                blockchains within its hybrid architecture. It aims to establish
                a diverse multi-chain ecosystem, fostering seamless global
                connectivity for creators, communities, and markets across
                different borders and protocols.
              </p>
            ) : dummyEvent.id === "event6" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Gate.io is a full-service digital asset exchange platform
                covering millions of users around the world.The company prides
                itself on providing industry-leading security in addition to
                having been audited to show 100% proof of reserves. Gate.io
                operates in most countries across the world, and is always
                committed to complying with the applicable laws where it
                operates.
              </p>
            ) : dummyEvent.id === "event2" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Coin98 Labs is an Open Infrastructure Financial Services builder
                focusing on creating and developing an ecosystem of DeFi
                protocols, applications, NFTs on multiple blockchains. Their
                mission is to fulfill untapped demand and enhance in-demand
                utilities in the DeFi space, helping people to access DeFi
                services effortlessly.
              </p>
            ) : dummyEvent.id === "event3" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                CoinGecko is the world's largest independent cryptocurrency data
                aggregator with over 10,000+ different cryptoassets tracked
                across more than 800+ exchanges worldwide. CoinGecko provides a
                fundamental analysis of the digital currency market. In addition
                to tracking price, volume, and market capitalization, CoinGecko
                tracks community growth, open source code development, major
                events, and on-chain metrics.
              </p>
            ) : (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Base is built as an Ethereum L2, with the security, stability,
                and scalability you need to power your dapps.Base is an easy way
                for decentralized apps to leverage Coinbase's products and
                distribution. Seamless Coinbase integrations, easy fiat onramps,
                and access to the $130B assets on platform in the Coinbase
                ecosystem.
              </p>
            )}

            <div className="d-flex gap-3 align-items-center">
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://twitter.com/Conflux_Network"
                    : dummyEvent.id === "event2"
                    ? "https://twitter.com/coin98_wallet"
                    : dummyEvent.id === "event3"
                    ? "https://twitter.com/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://twitter.com/gate_io"
                    : "https://twitter.com/buildonbase"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" src={twitter} /> Twitter
              </a>

              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://t.me/Conflux_English"
                    : dummyEvent.id === "event2"
                    ? "https://t.me/coin98wallet"
                    : dummyEvent.id === "event3"
                    ? "https://t.me/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://t.me/gateio_en"
                    : "https://base.org/discord"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img
                  alt=""
                  src={dummyEvent.id !== "event4" ? telegram : discord}
                />
                {dummyEvent.id !== "event4" ? "Telegram" : "Discord"}
              </a>
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://confluxnetwork.org/"
                    : dummyEvent.id === "event2"
                    ? "https://coin98.com/"
                    : dummyEvent.id === "event3"
                    ? "https://www.coingecko.com/"
                    : dummyEvent.id === "event6"
                    ? "https://www.gate.io/"
                    : "https://base.org/"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" src={website} />
                Website
              </a>
            </div>
            <div className="summaryseparator mt-3"></div>
            <div className="popup-red-wrapper mt-3 p-3 d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row align-items-xxl-center align-items-xl-center align-items-lg-center align-items-md-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={grayDollar} width={36} height={36} alt="" />
                <span className="event-my-earnings2 mb-0">My earnings</span>
              </div>
              <div className="d-flex align-items-center gap-3 gap-lg-5 justify-content-between mt-3 mt-lg-0">
                <div className="d-flex flex-column gap-2">
                  <h6 className="mb-0 event-earnings-coin2">
                    {getFormattedNumber(
                      dummyEvent.id === "event1"
                        ? confluxUserPoints
                        : dummyEvent.id === "event3"
                        ? userPoints
                        : dummyEvent.id === "event6"
                        ? gateUserPoints
                        : 0,
                      0
                    )}
                  </h6>
                  <span className="mb-0 event-earnings-usd">
                    Leaderboard Points
                  </span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h6 className="mb-0 event-earnings-coin2 d-flex specialstyle-wrapper gap-1">
                    $
                    {getFormattedNumber(
                      dummyEvent.id === "event1"
                        ? confluxEarnUSD
                        : dummyEvent.id === "event3"
                        ? userEarnUsd
                        : dummyEvent.id === "event6"
                        ? gateEarnUSD
                        : 0,
                      2
                    )}
                    <span className="ethpricerewards specialstyle-wrapper-eth">
                      {getFormattedNumber(
                        dummyEvent.id === "event1"
                          ? confluxEarnCFX
                          : dummyEvent.id === "event3"
                          ? userEarnETH
                          : dummyEvent.id === "event6"
                          ? gateEarnBnb
                          : 0,
                        2
                      )}
                      {dummyEvent.id === "event1"
                        ? "CFX"
                        : dummyEvent.id === "event2"
                        ? "C98"
                        : dummyEvent.id === "event3"
                        ? "BNB"
                        : dummyEvent.id === "event5"
                        ? "AVAX"
                        : dummyEvent.id === "event6"
                        ? "BNB"
                        : "ETH"}
                    </span>
                  </h6>
                  <span className="mb-0 event-earnings-usd">Rewards</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <img src={infoIcon} alt="" />
              <span className="popup-event-desc">
                The rewards will be distributed 2-3 days after the event ends.
              </span>
            </div>
            {dummyEvent.status !== "Live" && (
              <div className="w-100 d-flex justify-content-end mt-3">
                <NavLink to={`/marketplace/beta-pass/${dummyEvent?.linkState}`}>
                  {" "}
                  <button className="btn get-beta-btn">Get Beta Pass</button>
                </NavLink>
              </div>
            )}
          </div>
        </OutsideClickHandler>
      )}
      {eventsPopup && (
        <OutsideClickHandler onOutsideClick={() => setEventsPopup(false)}>
          <div
          className="popup-wrapper popup-active p-3"
          style={{ width: "45%" }}
        >
          <div className="d-flex align-items-center justify-content-between w-100 mb-4">
            <h6 className="popup-title-2 mb-0">Live Events</h6>
            <img
              src={xMark}
              style={{ cursor: "pointer" }}
              onClick={() => setEventsPopup(false)}
              alt=""
            />
          </div>
          <div className="event-popup-grid" >
            {dummyEvents.map((item) => (
              <div className={`p-2 event-popup-item ${selectedEvent.name === item.name && "selected-popup-item"} d-flex flex-column gap-2`} onClick={() => setSelectedEvent(item)}>
                <img src={require(`./eventAssets/${item.img}.png`)} className="w-100 h-100" alt="" />
                  <h6 className="mb-0">{item.name}</h6>
                </div>
              ))}
            </div>
            <div className="event-popup-item-2 p-3 mb-4">
              <p className="mb-0">{selectedEvent.desc}</p>
            </div>

            <div className="d-flex justify-content-center">
              <NavLink to={`/marketplace/events/${selectedEvent.id}`}>
                <div className="linear-border">
                  <button className="btn filled-btn px-5">
                    {selectedEvent.button}
                  </button>
                </div>
              </NavLink>
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {stakePopup && (
        <OutsideClickHandler onOutsideClick={() => setStakePopup(false)}>
          <div className="popup-wrapper popup-active nft-wrapper-popup p-3">
            <div className="d-flex align-items-center justify-content-between w-100 mb-4">
              <h6 className="popup-title-2 mb-0">Stake NFT</h6>
              <img
                src={xMark}
                style={{ cursor: "pointer" }}
                onClick={() => setStakePopup(false)}
                alt=""
              />
            </div>
            <div className="d-flex flex-column gap-3 mb-4 nft-popup-container">
              <div className="row w-100  m-0  position-relative">
                {/* {myLandstakes && myLandstakes.length > 0 && (
                  <div className="instakeWrapper">
                    <span className="instaketxt">In stake</span>
                  </div>
                )} */}
                <div className="col-12 px-0">
                  <div className="caws-wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                    <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                      <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column gap-2">
                          <h6
                            className="market-stake-title"
                            style={{ fontSize: "16px" }}
                          >
                            World of Dypians Land & CAWS
                          </h6>
                          <span
                            className="market-stake-desc"
                            style={{ fontSize: "11px" }}
                          >
                            Combine your Land and CAWS NFTs to earn daily ETH
                            rewards.
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <button
                            className="btn pill-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => setNftModal(true)}
                          >
                            Deposit
                          </button>
                          <button
                            className="btn rewards-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => {
                            //   setRewardModal(true);
                            // }}
                          >
                            Rewards
                          </button>
                        </div>
                      </div>
                      <div
                        className="tvl-wrapper"
                        style={{ width: "150px", height: "134px" }}
                      >
                        <h6
                          className="market-stake-tvl"
                          style={{ fontSize: "24px" }}
                        >
                          {/* ${abbreviateNumber(cawslandTvl)} */}
                          $15,000
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100 m-0  position-relative">
                {/* {mystakesLandPool && mystakesLandPool.length > 0 && (
                  <div className="instakeWrapper">
                    <span className="instaketxt">In stake</span>
                  </div>
                )} */}
                <div className="col-12 px-0">
                  <div className="wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                    <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                      <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column gap-2">
                          <h6
                            className="market-stake-title"
                            style={{ fontSize: "16px" }}
                          >
                            World of Dypians Land
                          </h6>
                          <span
                            className="market-stake-desc"
                            style={{ fontSize: "11px" }}
                          >
                            Stake your Genesis Land NFTs to earn daily ETH
                            rewards.
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <button
                            className="btn pill-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => {
                            //   setlandStakeModal(true);
                            // }}
                          >
                            Deposit
                          </button>
                          <button
                            className="btn rewards-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => {
                            //   setlandunStakeModal(true);
                            // }}
                          >
                            Rewards
                          </button>
                        </div>
                        <div
                          className="tvl-wrapper"
                          style={{ width: "150px", height: "134px" }}
                        >
                          <h6
                            className="market-stake-tvl"
                            style={{ fontSize: "24px" }}
                          >
                            {/* ${abbreviateNumber(landtvl)} */}
                            $1,500
                          </h6>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <NavLink to={`/marketplace/stake`}>
                <div className="linear-border">
                  <button className="btn filled-btn px-5">Stake</button>
                </div>
              </NavLink>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default NewWalletBalance;

// Email sent successfully