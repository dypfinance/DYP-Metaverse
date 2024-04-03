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
import readyBorder from "./newAssets/readyBorder2.svg";
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
import eventPopupImageGecko from "./assets/eventPopupImageGecko.png";
import dogePopupImage from "./assets/dogePopupImage.png";
import cmcPopupImage from "./assets/cmcPopupImage.png";

import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import base from "./assets/baseLogo.svg";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import gateUpcoming from "../../../../Marketplace/assets/gateUpcoming.webp";
import eventPopupImage from "./assets/eventPopupImage.png";
import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "../../../../Marketplace/assets/coingeckoUpcoming.png";
import baseUpcoming from "../../../../Marketplace/assets/baseUpcoming.webp";
import doge from "../../../../Marketplace/MarketNFTs/assets/dogeLogo.svg";
import cmc from "../../../../Marketplace/MarketNFTs/assets/cmc.svg";
import newCawsStake from "../../../../Marketplace/assets/newCawsStake.png";
import newCawsStakeMobile from "../../../../Marketplace/assets/newCawsStakeMobile.png";
import twitter from "./assets/greenTwitter.svg";
import telegram from "./assets/greentg.svg";
import website from "./assets/greenWebsite.svg";
import discord from "./assets/greenDiscord.svg";
import grayDollar from "./assets/grayDollar.svg";
import eventsArrow from "./assets/eventsArrow.svg";
import mageStarter from "./assets/mageStarter.png";
import mageGoing from "./assets/mageGoing.png";
import mageFinish from "./assets/mageFinish.png";
import infoIcon from "../../../../Marketplace/assets/infoIcon.svg";
import coingeckoPopupImage from "./assets/coingeckoPopupImage.png";
import eventPopupImageBase from "./assets/eventPopupImageBase.png";
import gatePopupImage from "./assets/gatePopupImage.png";
import confluxPopupImage from "./assets/eventPopupImage.png";
import Countdown from "react-countdown";
import viewAllArrow from "./assets/viewAllArrow.svg";
import BetaEventCard from "../../../../Marketplace/components/BetaEventCard";
import ReCaptchaV2 from "react-google-recaptcha";
import dypius from "./assets/dypIcon.svg";
import upcomingDyp from "./assets/upcomingDyp.webp";
import upcomingDyp2 from "./assets/dypiuspopup2.png";

import dypeventPopupImage from "./assets/dypEventImage.png";
import nextArrow from "../../../../Marketplace/assets/nextArrow1.svg";
import { abbreviateNumber } from "js-abbreviation-number";
import eventSkeleton from "./assets/eventSkeleton.png";
import sliderEventSkeleton from "./assets/sliderEventSkeleton.svg";
import ExpiredProfileEvent from "./ExpiredProfileEvent";

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
  "& .MuiOutlinedInput-root, & .MuiOutlinedInput-root:hover": {
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
  weeklyplayerData,
  dailyplayerData,
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
  onBalanceClick,
  claimedChests,
  claimedPremiumChests,
  claimedSkaleChests,
  claimedSkalePremiumChests,
  availableTime,
  canBuy,
  rewardsPopup,
  dailyPopup,
  openedChests,
  userRank2,
  genesisRank2,
  onDailyBonusInfoClick,
  userSocialRewards,
  dogePrice,
  cfxPrice,
  userEarnUsd,
  userEarnETH,
  userPoints,
  confluxUserPoints,
  confluxEarnUSD,
  confluxEarnCFX,
  gateEarnUSD,
  gateUserPoints,
  gateEarnBnb,
  dogeEarnUSD,
  dogeEarnBNB,
  dogeUserPoints,
  baseEarnUSD,
  baseUserPoints,
  baseEarnETH,
  dypiusEarnUsd,
  dypiusPremiumEarnUsd,
  dypiusPremiumEarnTokens,
  dypiusPremiumPoints,
  dypiusEarnTokens,
  cmcuserEarnUsd,
  cmcuserEarnETH,
  cmcuserPoints,
  onPremiumClick,
  openedSkaleChests,
  // hasNft,
}) => {
  let coingeckoLastDay = new Date("2023-12-24T16:00:00.000+02:00");
  let confluxLastDay = new Date("2023-11-06T16:00:00.000+02:00");
  let gateLastDay = new Date("2023-11-20T16:00:00.000+02:00");
  let baseLastDay = new Date("2024-02-01T16:00:00.000+02:00");
  let dypiusLastDay = new Date("2023-12-20T13:00:00.000+02:00");
  let dogeLastDay = new Date("2024-03-21T13:00:00.000+02:00");
  let cmcLastDay = new Date("2024-04-11T13:00:00.000+02:00");
  let dypius2LastDay = new Date("2024-05-27T16:00:00.000+02:00");

  let now = new Date().getTime();
  const midnight = new Date(now).setUTCHours(24, 0, 0, 0);

  const dummyDoge = {
    title: "Dogecoin",
    chain: "BNB Chain",
    linkState: "doge",
    rewards: "DOGE",
    status: "Expired",
    id: "event7",
    eventType: "Explore & Mine",
    eventDate: "Dec 22, 2023",
    date: "Dec 22, 2023",
    logo: doge,
    totalRewards: "$10,000 in DOGE Rewards",
    eventDuration: dogeLastDay,
    minRewards: "1",
    maxRewards: "100",
    minPoints: "5,000",
    maxPoints: "50,000",
    learnMore: "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
  };

  const dypv2 = {
    title: "Dypius Premium",
    logo: dypius,
    eventStatus: "Live",
    totalRewards: "$50,000 in BNB Rewards",
    myEarnings: 0.0,
    eventDate: "Feb 26, 2024",
    date: "Feb 26, 2024",
    backgroundImage: upcomingDyp2,
    activeTab: "dypiusv2",
    chain: "BNB Chain",
    linkState: "dypius2",
    rewards: "BNB",
    status: "Live",
    id: "event9",
    eventType: "Explore & Find",
    eventDuration: dypius2LastDay,
    minRewards: "1",
    maxRewards: "100",
    minPoints: "5,000",
    maxPoints: "50,000",
    learnMore:
      "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
  };

  const dummyCmc = {
    title: "CoinMarketCap",
    chain: "BNB Chain",
    linkState: "coinmarketcap",
    rewards: "BNB",
    status: "Live",
    id: "event8",
    eventType: "Explore & Mine",
    eventDate: "Dec 26, 2023",
    date: "Dec 26, 2023",
    logo: cmc,
    totalRewards: "$20,000 in BNB Rewards",
    eventDuration: cmcLastDay,
    minRewards: "1",
    maxRewards: "100",
    minPoints: "5,000",
    maxPoints: "50,000",
    learnMore:
      "/news/658ae3cc148c5ffee9c4ffa7/CoinMarketCap-Treasure-Hunt-Event",
  };

  const dummyBetaPassData2 = [
    {
      title: "Dypius Premium",
      logo: dypius,
      eventStatus: "Live",
      totalRewards: "$50,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Feb 26, 2024",
      backgroundImage: upcomingDyp2,
      activeTab: "dypiusv2",
      popupInfo: {
        title: "Dypius Premium",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "BNB",
        status: "Live",
        id: "event9",
        eventType: "Explore & Find",
        totalRewards: "$50,000 in BNB Rewards",
        eventDuration: dypius2LastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65dc8229039c5118d5c8782b/Dypius-Treasure-Hunt:-Magic-Egg-is-Live",
        eventDate: "Feb 26, 2024",
        activeTab: "dypiusv2",
      },
    },
    
    {
      title: "CMC",
      logo: cmc,
      eventStatus: "Live",
      totalRewards: "$20,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Dec 26, 2023",
      // backgroundImage: upcomingCmc,
      popupInfo: {
        title: "CoinMarketCap",
        chain: "BNB Chain",
        linkState: "coinmarketcap",
        rewards: "BNB",
        status: "Live",
        id: "event8",
        eventType: "Explore & Mine",
        totalRewards: "$20,000 in BNB Rewards",
        eventDuration: cmcLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        eventDate: "Dec 26, 2023",
        learnMore:
          "/news/658ae3cc148c5ffee9c4ffa7/CoinMarketCap-Treasure-Hunt-Event",
      },
    },
   
    {
      title: "Dogecoin",
      chain: "BNB Chain",
      linkState: "doge",
      rewards: "DOGE",
      status: "Expired",
      eventStatus: "Expired",
      id: "event7",
      eventType: "Explore & Mine",
      date: "Dec 22, 2023",
      eventDate: "Dec 22, 2023",
      logo: doge,
      totalRewards: "$10,000 in DOGE Rewards",
      eventDuration: dogeLastDay,
      minRewards: "1",
      maxRewards: "100",
      minPoints: "5,000",
      maxPoints: "50,000",
      learnMore: "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
      popupInfo: {
        title: "Dogecoin",
        chain: "BNB Chain",
        linkState: "doge",
        rewards: "DOGE",
        status: "Expired",
        id: "event7",
        eventStatus: "Expired",
        eventType: "Explore & Mine",
        totalRewards: "$10,000 in DOGE Rewards",
        eventDuration: dogeLastDay,
        minRewards: "1",
        maxRewards: "100",
        minPoints: "5,000",
        maxPoints: "50,000",
        learnMore:
          "/news/65857c6b148c5ffee9c203ec/Dogecoin-Treasure-Hunt-Event",
        eventDate: "Dec 22, 2023",
      },
    },
    {
      title: "Base",
      logo: base,
      eventStatus: "Expired",
      totalRewards: "$10,000 in ETH Rewards",
      myEarnings: 126.45,
      eventType: "Explore & Mine",
      eventDate: "Nov 01, 2023",
      backgroundImage: baseUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Base",
        chain: "Base Chain",
        linkState: "base",
        rewards: "ETH",
        status: "Expired",
        id: "event4",
        date: "Nov 01, 2023",
        totalRewards: "$10,000 in ETH Rewards",
        eventDuration: baseLastDay,
        eventDate: "Nov 01, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "30,000",
        learnMore: "/news/65422043b3f3545e95018290/Base-Treasure-Hunt-Event",
      },
    },
    {
      title: "CoinGecko",
      logo: coingecko,
      eventStatus: "Expired",
      totalRewards: "$10,000 in BNB Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: coingeckoUpcoming,
      popupInfo: {
        title: "CoinGecko",
        chain: "BNB Chain",
        linkState: "coingecko",
        rewards: "BNB",
        status: "Expired",
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
      title: "Dypius",
      logo: dypius,
      eventStatus: "Expired",
      totalRewards: "300,000 in DYPv2 Rewards",
      myEarnings: 0.0,
      eventType: "Explore & Find",
      eventDate: "Ended",
      backgroundImage: upcomingDyp,
      popupInfo: {
        title: "Dypius",
        chain: "BNB Chain",
        linkState: "dypius",
        rewards: "DYP",
        status: "Expired",
        id: "event5",
        eventType: "Explore & Find",
        totalRewards: "300,000 in DYPv2 Rewards",
        eventDuration: dypiusLastDay,
        minRewards: "25",
        maxRewards: "50",
        learnMore: "/news/655b40db87aee535424a5915/Dypius-Treasure-Hunt-Event",
        eventDate: "Ended",
      },
    },
    {
      title: "Gate.io",
      logo: gate,
      eventStatus: "Expired",
      totalRewards: "$2,000 in BNB Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: gateUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Gate.io",
        chain: "BNB Chain",
        linkState: "gate",
        rewards: "GT",
        status: "Expired",
        id: "event6",
        totalRewards: "$2,000 in BNB Rewards",
        eventDuration: gateLastDay,
        eventDate: "Ended",
        date: "Oct 20, 2023",
        minRewards: "0.5",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/653290f5b3f3545e9500f557/Gate-Treasure-Hunt-Event",
      },
    },
    {
      title: "Conflux",
      logo: conflux,
      eventStatus: "Expired",
      totalRewards: "$2,000 in CFX Rewards",
      myEarnings: 0,
      eventType: "Explore & Mine",
      eventDate: "Ended",
      backgroundImage: confluxUpcoming,
      popupInfo: {
        eventType: "Explore & Mine",
        title: "Conflux",
        chain: "Conflux Network",
        linkState: "conflux",
        rewards: "CFX",
        status: "Expired",
        id: "event1",
        totalRewards: "$2,000 in CFX Rewards",
        eventDuration: confluxLastDay,
        eventDate: "Ended",
        minRewards: "1",
        maxRewards: "20",
        minPoints: "5,000",
        maxPoints: "20,000",
        learnMore: "/news/65200e247531f3d1a8fce737/Conflux-Treasure-Hunt-Event",
      },
    },
  ];

  const [dummyEvent, setDummyEvent] = useState({});
  const [userSocialRewardsCached, setuserSocialRewardsCached] = useState(0);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [eventPopup, setEventPopup] = useState(false);
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

  const [EthRewards, setEthRewards] = useState(0);
  const [EthRewardsLandPool, setEthRewardsLandPool] = useState(0);
  const [EthRewardsCawsPool, setEthRewardsCawsPool] = useState(0);
  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);

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

  const [landtvl, setlandTvl] = useState(0);
  const [cawslandTvl, setCawsLandtvl] = useState(0);

  const fetchUsersocialRewards = () => {
    const cachedUserSocialRewards = localStorage.getItem(
      "cacheduserSocialRewards"
    );

    if (cachedUserSocialRewards) {
      setuserSocialRewardsCached(cachedUserSocialRewards);
    }
  };

  // const bnbClaimed = claimedChests + claimedPremiumChests;
  // const bnbPercentage = (bnbClaimed / 20) * 100;

  // const skaleClaimed = claimedSkaleChests + claimedSkalePremiumChests;
  // const skalePercentage = (skaleClaimed / 20) * 100;

  const totalClaimedChests =
    claimedChests + claimedPremiumChests + openedSkaleChests.length;

  const chestPercentage = (totalClaimedChests / 40) * 100;

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
  const firstNext = () => {
    betaSlider.current.slickNext();
  };
  const firstPrev = () => {
    betaSlider.current.slickPrev();
  };

  const fetchTvl = async () => {
    const result = await axios.get(
      `https://api.dyp.finance/api/get_staking_info_eth`
    );
    if (result) {
      const resultLand = result.data.stakingInfoLAND[0].tvl_usd;
      const resultcawsWod = result.data.stakinginfoCAWSLAND[0].tvl_usd;
      setlandTvl(resultLand);
      setCawsLandtvl(resultcawsWod);
    }
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

  const getTreasureChestsInfo = async () => {
    var moneyResult = 0;

    if (openedChests && openedChests.length > 0) {
      openedChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedSkaleChests && openedSkaleChests.length > 0) {
      openedSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    setTreasureRewardMoney(moneyResult);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setErrors(validateUrl(mediaUrl));
    const captchaToken = await recaptchaRef.current.executeAsync();
    if (Object.keys(validateUrl(mediaUrl)).length === 0) {
      const data = {
        email: email,
        url: mediaUrl,
        walletAddress: address,
        username: username,
        recaptcha: captchaToken,
      };

      if (email !== "" && mediaUrl !== "" && address !== "") {
        const send = await axios
          .post("https://api.worldofdypians.com/api/submissions", data)
          .then(function (result) {
            console.log(result.data);
            setSuccess("Email sent successfully");
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (
      specialRewardsPopup ||
      eventsPopup ||
      stakePopup ||
      rewardsPopup ||
      dailyPopup
    ) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [specialRewardsPopup, eventsPopup, stakePopup, rewardsPopup, dailyPopup]);

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

  const getStakesIds = async () => {
    let stakenft = [];

    if (address) {
      const contract = new window.infuraWeb3.eth.Contract(
        window.WOD_CAWS_ABI,
        window.config.wod_caws_address
      );
      const allCawsStakes = await contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    }
  };

  const getStakesIdsLandPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const getStakesIdsCawsPool = async () => {
    if (address) {
      let staking_contract = new window.infuraWeb3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;
    const contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );
    if (address) {
      if (myStakes && myStakes.length > 0) {
        let rewards = await contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        let finalReward = 0;
        for (let i = 0; i < rewards.length; i++) {
          finalReward = rewards[i] / 1e18;
          result = result + Number(finalReward);
        }
      }
    }
    setEthRewards(result);
  };

  const calculateAllRewardsLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );
    if (address) {
      if (myStakes && myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsLandPool(result);
  };

  const calculateAllRewardsCawsPool = async () => {
    let myStakes = await getStakesIdsCawsPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = new window.infuraWeb3.eth.Contract(
      window.NFTSTAKING_ABI,
      window.config.nftstaking_address
    );
    if (address) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsCawsPool(result);
  };

  useEffect(() => {
    getTokenData();
    getTokenDatabnb();
    getTokenDataavax();
    fetchTvl();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (canBuy && email) {
      setFinished(false);
    } else if (!canBuy && email) {
      setFinished(true);
    } else if (!email) {
      setFinished(false);
    }
  }, [claimedChests, claimedPremiumChests, isPremium, canBuy, email]);

  useEffect(() => {
    if (address) {
      calculateAllRewards();
      calculateAllRewardsCawsPool();
      calculateAllRewardsLandPool();
    }
  }, [address]);

  useEffect(() => {
    getTreasureChestsInfo();
  }, [openedChests, address]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  const recaptchaRef = useRef(null);

  return (
    <>
      <div className="container px-0">
        <div className="row gap-3 gap-lg-0 mx-0">
          <div className="col-12 rankings-outer-wrapper px-0 pe-lg-3 col-lg-4 position-relative">
            <div className="purple-container rankings-wrapper px-3 px-lg-4 py-3  d-flex flex-column gap-2 position-relative custom-height-2 ">
              <div className="green-div"></div>
              <h6
                className="profile-div-title mb-0"
                // style={{ fontSize: '14px'}}
              >
                Treasure Hunt
              </h6>{" "}
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dypv2);
                  setEventPopup(true);
                }}
                data={dypv2}
                event={dypv2}
                userEarnedUsd={dypiusPremiumEarnUsd}
              />

              
              <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyCmc);
                  setEventPopup(true);
                }}
                data={dummyCmc}
                event={dummyCmc}
                userEarnedUsd={cmcuserEarnUsd}
              />
              <ExpiredProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyDoge);
                  setEventPopup(true);
                }}
                data={dummyDoge}
                event={dummyDoge}
                userEarnedUsd={dogeEarnUSD}
              />
             
              {/* <ExpiredProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyBase);
                  setEventPopup(true);
                }}
                data={dummyBase}
                event={dummyBase}
                userEarnedUsd={baseEarnUSD}
              /> */}
              {/* <ActiveProfileEvent
                onOpenEvent={() => {
                  setDummyEvent(dummyBase);
                  setEventPopup(true);
                }}
                data={dummyBase}
                event={dummyBase}
                userEarnedUsd={baseEarnUSD}
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
                    position: windowSize.width > 650 ? "absolute" : "relative",
                    bottom: windowSize.width > 992 ? "15px" : "-5px",
                    left: windowSize.width > 650 ? "43%" : "43%",
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
                      activeTab={item.activeTab}
                      userEarnUsd={
                        item.title === "Conflux"
                          ? confluxEarnUSD
                          : item.title === "Base"
                          ? baseEarnUSD
                          : item.title === "Dypius"
                          ? dypiusEarnTokens
                          : item.title === "Gate.io"
                          ? gateEarnUSD
                          : item.title === "CoinGecko"
                          ? userEarnUsd
                          : item.title === "Dogecoin"
                          ? dogeEarnUSD
                          : item.title === "CMC" ||
                            item.title === "CoinMarketCap"
                          ? cmcuserEarnUsd
                          : 0
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
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-between gap-3 px-0 gap-lg-0 mt-lg-0 mt-5">
            <div className="row gap-3 gap-lg-0">
              <div className="col-12 col-lg-4"  onClick={onDailyRewardsPopupOpen}>
                <div className="daily-bonus-wrapper">
                  <div className="red-div"></div>
                  <img
                  
                    // src={finished ? mageFinish : mageGoing}
                    src={
                      chestPercentage >= 50 && chestPercentage < 100
                        ? mageGoing
                        : chestPercentage === 100
                        ? mageFinish
                        : mageStarter
                    }
                    className={`${"daily-rewards-img"}`}
                    alt=""
                  />
                  <div
                    className="progress-bar-group d-flex flex-column align-items-start"
                    
                  >
                    {!finished && (
                      <span className="progress-bar-title">Progress</span>
                    )}

                    <div className="yellow-progress-outer">
                      <span className="mb-0 chest-progress">
                        {/* {claimedPremiumChests}/10 */}
                        {parseInt(chestPercentage)}%
                      </span>
                      <div
                        className="yellow-progress-inner"
                        style={{ width: `${chestPercentage}%` }}
                        // style={{ width: `35%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between h-100 p-3">
                    <div
                      className="d-flex align-items-center justify-content-between position-relative gap-1"
                      style={{ width: "fit-content" }}
                    >
                      <h6 className="profile-div-title mb-0">Daily Bonus</h6>
                    </div>

                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ width: "fit-content" }}
                      // onClick={onDailyRewardsPopupOpen}
                    >
                      <div
                        className="position-relative"
                        style={{
                          width: "96px",
                          height: "40px",
                          right: "0px",
                          bottom: "15px",
                        }}
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
                      Earn ETH daily rewards by staking your NFTs
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
                      $
                      {getFormattedNumber(
                        Number(userSocialRewardsCached) +
                          Number(weeklyplayerData) +
                          Number(dailyplayerData) +
                          Number(userRank2) +
                          Number(genesisRank2) +
                          Number(dypiusPremiumEarnUsd) +
                          Number(cmcuserEarnUsd) +
                          Number(baseEarnUSD) +
                          Number(confluxEarnUSD) +
                          Number(gateEarnUSD) +
                          Number(dogeEarnUSD) +
                          Number(userEarnUsd) +
                          Number(treasureRewardMoney) +
                          Number(EthRewardsLandPool) * Number(ethTokenData) +
                          Number(EthRewardsCawsPool) * Number(ethTokenData) +
                          Number(EthRewards) * Number(ethTokenData),
                        2
                      )}
                    </h6>
                    <span className="my-total-earned mb-0 font-iceland">
                      Total Available
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
                        $
                        {getFormattedNumber(Number(userSocialRewardsCached), 2)}
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
                  Monday and will be distributed monthly.
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
                    <ReCaptchaV2
                      sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
                      style={{ display: "inline-block" }}
                      theme="dark"
                      size="invisible"
                      ref={recaptchaRef}
                    />
                  </div>
                </div>
                <hr className="linear-divider" />
                <div className="d-flex align-items-center justify-content-between">
                  <span className="my-special-rewards mb-0">My Rewards</span>
                  <h6 className="my-special-rewards-value mb-0">
                    ${getFormattedNumber(Number(userSocialRewardsCached), 2)}
                  </h6>
                </div>
              </>
            )}
          </div>
        </OutsideClickHandler>
      )}
      {showAllEvents && (
        <div className="col-12 py-lg-3">
          <div
            className="purple-container position-relative p-3 p-lg-3 gap-2 "
            style={{
              maxWidth: "100vw",
              width: "100%",
              display: windowSize.width > 786 ? "block" : "none",
              border: "2px solid #080b2a",
            }}
            ref={releaseContent}
          >
            <div className="prev-arrow-nft" onClick={firstPrev}>
              <img src={nextArrow} alt="" />
            </div>
            <div className="next-arrow-nft" onClick={firstNext}>
              <img src={nextArrow} alt="1" />
            </div>
            <Slider {...settings} ref={betaSlider}>
              {dummyBetaPassData2.map((item, index) => (
                <NewBetaEventCard
                  data={item}
                  key={index}
                  onOpenPopup={() => {
                    setEventPopup(true);
                    setDummyEvent(item.popupInfo);
                  }}
                  activeTab={item.activeTab}
                  userEarnUsd={
                    item.title === "Conflux"
                      ? confluxEarnUSD
                      : item.title === "Base"
                      ? baseEarnUSD
                      : item.title === "Dypius"
                      ? dypiusEarnTokens
                      : item.title === "Gate.io"
                      ? gateEarnUSD
                      : item.title === "CoinGecko"
                      ? userEarnUsd
                      : item.title === "Dogecoin"
                      ? dogeEarnUSD
                      : item.title === "CMC" || item.title === "CoinMarketCap"
                      ? cmcuserEarnUsd
                      : 0
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
                      dummyEvent?.id === "event5"
                        ? dypeventPopupImage
                        : dummyEvent?.id === "event9"
                        ? upcomingDyp2
                        : dummyEvent?.linkState === "coingecko"
                        ? eventPopupImageGecko
                        : dummyEvent.linkState === "gate"
                        ? gatePopupImage
                        : dummyEvent.linkState === "base"
                        ? eventPopupImageBase
                        : dummyEvent.linkState === "doge"
                        ? dogePopupImage
                        : dummyEvent.linkState === "coinmarketcap"
                        ? cmcPopupImage
                        : eventPopupImage
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
                        {dummyEvent?.totalRewards}
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
                      <h6 className="live-on-date mb-0">
                        {dummyEvent.eventDate}
                      </h6>
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
                      To participate in the event, players are required to&nbsp;
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
                      To participate in the event, players are required to&nbsp;
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
                  ) : dummyEvent.id === "event5" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to own
                      at least one of the Beta Pass NFTs (CoinGecko, Conflux,
                      Gate, or Base). By actively participating in the game on a
                      daily basis and exploring the downtown area, players have
                      the opportunity to secure daily rewards in DYP. Remember
                      to log in to the game daily and venture into the downtown
                      area to uncover hidden treasures.
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
                  ) : dummyEvent.id === "event7" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a Dogecoin Beta Pass NFT</b>. You can get the
                      Dogecoin Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the Dogecoin area, players not only stand a
                      chance to secure daily rewards in DOGE, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      Dogecoin area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event8" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
                      <b>hold a CoinMarketCap Beta Pass NFT</b>. You can get the
                      CoinMarketCap Beta Pass NFT from the World of Dypians
                      Marketplace. By engaging in the game on a daily basis and
                      exploring the CoinMarketCap area, players not only stand a
                      chance to secure daily rewards in BNB, but also earn
                      points for their placement on the global leaderboard.
                      Remember to log in to the game daily and venture into the
                      CoinMarketCap area to uncover hidden treasures.
                    </p>
                  ) : dummyEvent.id === "event9" ? (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to be{" "}
                      <b>Premium Subscribers.</b> By actively participating in
                      the game on a daily basis and exploring the downtown area,
                      players have the opportunity to secure daily rewards in
                      BNB. Remember to log in to the game daily and venture into
                      the downtown area to uncover hidden treasures.
                    </p>
                  ) : (
                    <p className="popup-event-desc">
                      To participate in the event, players are required to&nbsp;
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
                    <>
                      {dummyEvent.id !== "event5" ? (
                        <li className="popup-event-desc">
                          Daily Rewards range from ${dummyEvent.minRewards} to $
                          {dummyEvent.maxRewards}
                        </li>
                      ) : (
                        <li className="popup-event-desc">Daily Rewards</li>
                      )}
                      {dummyEvent.id !== "event5" && (
                        <li className="popup-event-desc">
                          Daily Points range from {dummyEvent.minPoints} to{" "}
                          {dummyEvent.maxPoints}
                        </li>
                      )}
                    </>
                    {dummyEvent.id !== "event5" && (
                      <li className="popup-event-desc">
                        Earn{" "}
                        {dummyEvent.id === "event1"
                          ? "CFX"
                          : dummyEvent.id === "event2"
                          ? "C98"
                          : dummyEvent.id === "event3"
                          ? "BNB"
                          : dummyEvent.id === "event5"
                          ? "DYP"
                          : dummyEvent.id === "event6" ||
                            dummyEvent.id === "event8" ||
                            dummyEvent.id === "event9"
                          ? "BNB"
                          : dummyEvent.id === "event7"
                          ? "DOGE"
                          : "ETH"}{" "}
                        rewards
                      </li>
                    )}
                    {dummyEvent.id !== "event5" && (
                      <li className="popup-event-desc">
                        Get global leaderboard points
                      </li>
                    )}
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
                : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                ? "Dypius"
                : dummyEvent.id === "event6"
                ? "Gate.io"
                : dummyEvent.id === "event7"
                ? "Dogecoin"
                : dummyEvent.id === "event8"
                ? "CoinMarketCap"
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
            ) : dummyEvent.id === "event5" || dummyEvent.id === "event9" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                Dypius is a powerful, decentralized ecosystem with a focus on
                scalability, security, and global adoption through next-gen
                infrastructure. We offer a variety of products and services that
                cater to both beginners and advanced users in the crypto space
                including Earn solutions, analytical tools, NFTs, Metaverse and
                more!
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
            ) : dummyEvent.id === "event7" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                An open-source peer-to-peer digital currency, favoured by Shiba
                Inus worldwide.At its heart, Dogecoin is the accidental crypto
                movement that makes people smile! It is also an opensource
                peer-to-peer cryptocurrency that utilises blockchain technology,
                a highly secure decentralised system of storing information as a
                public ledger that is maintained by a network of computers
                called nodes.
              </p>
            ) : dummyEvent.id === "event8" ? (
              <p
                className="popup-event-desc"
                // style={{ fontSize: "12px", fontWeight: "500" }}
              >
                CoinMarketCap provides cryptocurrency market cap rankings,
                charts, and more. We tracks capitalization of various
                cryptocurrencies by listing prices, available supply (amount of
                coins that is currently in circulation), trade volume over last
                24 hours, or market capitalizations. CoinMarketCap was founded
                in May 2013 by Brandon Chez in Long Island City, Queens, New
                York.
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
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://twitter.com/dypius"
                    : dummyEvent.id === "event3"
                    ? "https://twitter.com/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://twitter.com/gate_io"
                    : dummyEvent.id === "event7"
                    ? "https://twitter.com/dogecoin"
                    : dummyEvent.id === "event8"
                    ? "https://twitter.com/CoinMarketCap"
                    : "https://twitter.com/buildonbase"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img alt="" width={16} height={16} src={twitter} /> Twitter
              </a>

              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://t.me/Conflux_English"
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://t.me/worldofdypians"
                    : dummyEvent.id === "event3"
                    ? "https://t.me/coingecko"
                    : dummyEvent.id === "event6"
                    ? "https://t.me/gateio_en"
                    : dummyEvent.id === "event8"
                    ? "https://t.me/CoinMarketCapAnnouncements"
                    : dummyEvent.id === "event7"
                    ? "https://discord.gg/dogecoin"
                    : "https://base.org/discord"
                }
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-1 align-items-center greensocial"
              >
                <img
                  alt=""
                  src={
                    dummyEvent.id !== "event4" && dummyEvent.id !== "event7"
                      ? telegram
                      : discord
                  }
                />
                {dummyEvent.id !== "event4" && dummyEvent.id !== "event7"
                  ? "Telegram"
                  : "Discord"}
              </a>
              <a
                href={
                  dummyEvent.id === "event1"
                    ? "https://confluxnetwork.org/"
                    : dummyEvent.id === "event5" || dummyEvent.id === "event9"
                    ? "https://www.dypius.com/"
                    : dummyEvent.id === "event3"
                    ? "https://www.coingecko.com/"
                    : dummyEvent.id === "event6"
                    ? "https://www.gate.io/"
                    : dummyEvent.id === "event7"
                    ? "https://dogecoin.com/"
                    : dummyEvent.id === "event8"
                    ? "https://coinmarketcap.com/"
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
                        : dummyEvent.id === "event4"
                        ? baseUserPoints
                        : dummyEvent.id === "event5"
                        ? dypiusEarnTokens
                        : dummyEvent.id === "event7"
                        ? dogeUserPoints
                        : dummyEvent.id === "event8"
                        ? cmcuserPoints
                        : dummyEvent.id === "event9"
                        ? dypiusPremiumPoints
                        : 0,
                      0
                    )}
                    {dummyEvent.id === "event5" && " DYP"}
                  </h6>

                  <span className="mb-0 event-earnings-usd">
                    {dummyEvent.id === "event5"
                      ? "Amount"
                      : "Leaderboard Points"}
                  </span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <h6
                    className="mb-0 event-earnings-coin2 d-flex specialstyle-wrapper gap-1"
                    style={{ left: dummyEvent.id === "event5" && "0px" }}
                  >
                    $
                    {getFormattedNumber(
                      dummyEvent.id === "event1"
                        ? confluxEarnUSD
                        : dummyEvent.id === "event3"
                        ? userEarnUsd
                        : dummyEvent.id === "event6"
                        ? gateEarnUSD
                        : dummyEvent.id === "event4"
                        ? baseEarnUSD
                        : dummyEvent.id === "event5"
                        ? dypiusEarnUsd
                        : dummyEvent.id === "event7"
                        ? dogeEarnUSD
                        : dummyEvent.id === "event8"
                        ? cmcuserEarnUsd
                        : dummyEvent.id === "event9"
                        ? dypiusPremiumEarnUsd
                        : 0,
                      2
                    )}
                    <span className="ethpricerewards specialstyle-wrapper-eth">
                      {dummyEvent.id !== "event5" && (
                        <>
                          {getFormattedNumber(
                            dummyEvent.id === "event1"
                              ? confluxEarnCFX
                              : dummyEvent.id === "event3"
                              ? userEarnETH
                              : dummyEvent.id === "event6"
                              ? gateEarnBnb
                              : dummyEvent.id === "event4"
                              ? baseEarnETH
                              : dummyEvent.id === "event7"
                              ? dogeEarnBNB
                              : dummyEvent.id === "event8"
                              ? cmcuserEarnETH
                              : dummyEvent.id === "event9"
                              ? dypiusPremiumEarnTokens
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
                            ? "DYP"
                            : dummyEvent.id === "event6" ||
                              dummyEvent.id === "event8" ||
                              dummyEvent.id === "event9"
                            ? "BNB"
                            : dummyEvent.id === "event7"
                            ? "DOGE"
                            : "ETH"}
                        </>
                      )}
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
            {dummyEvent.status === "Coming Soon" &&
              dummyEvent.id !== "event7" &&
              dummyEvent.id !== "event9" && (
                <div className="w-100 d-flex justify-content-end mt-3">
                  <NavLink
                    to={`/marketplace/beta-pass/${dummyEvent.linkState}`}
                  >
                    <button className="btn get-beta-btn">Get Beta Pass</button>
                  </NavLink>
                </div>
              )}
            {dummyEvent.id === "event9" && !isPremium && (
              <div className="w-100 d-flex justify-content-end mt-3">
                <NavLink
                  to={`/account`}
                  onClick={() => {
                    setEventPopup(false);
                    onPremiumClick();
                  }}
                >
                  <button className="btn get-beta-btn">Get Premium</button>
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
            <div className="event-popup-grid">
              {dummyEvents.map((item) => (
                <div
                  className={`p-2 event-popup-item ${
                    selectedEvent.name === item.name && "selected-popup-item"
                  } d-flex flex-column gap-2`}
                  onClick={() => setSelectedEvent(item)}
                >
                  <img
                    src={require(`./eventAssets/${item.img}.png`)}
                    className="w-100 h-100"
                    alt=""
                  />
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
            <div className="new-caws-stake-wrapper d-flex align-items-center w-100 ">
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                <div className="d-flex flex-column ps-4 pt-4 pt-lg-0 gap-4">
                  <div className="d-flex flex-column gap-2">
                    <h6
                      className="market-stake-title"
                      style={{ fontSize: "20px" }}
                    >
                      Cats and Watches Society (CAWS)
                    </h6>
                    <span
                      className="market-stake-desc"
                      style={{ fontSize: "11px" }}
                    >
                      Stake your CAWS NFTs to earn daily ETH rewards.
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3"></div>
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
                    <div className="stake-stats-wrapper flex-row flex-lg-column d-flex align-items-center justify-content-center gap-4 gap-lg-2">
                      <div className="stake-stats-item d-flex flex-column align-items-center justify-content-center">
                        <h6>25%</h6>
                        <span>APR</span>
                      </div>
                      <div className="stake-stats-item d-flex flex-column align-items-center justify-content-center">
                        <h6>ETH</h6>
                        <span>Rewards</span>
                      </div>
                      <div className="stake-stats-item d-flex flex-column align-items-center justify-content-center">
                        <h6>No Lock</h6>
                        <span>Lock Time</span>
                      </div>
                    </div>
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
                          <NavLink
                            to={"/marketplace/stake"}
                            state={{ modal: "landStakeModal" }}
                            className="btn pill-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => {
                            //   setlandStakeModal(true);
                            // }}
                          >
                            Deposit
                          </NavLink>
                          <NavLink
                            to={"/marketplace/stake"}
                            state={{ modal: "landunStakeModal" }}
                            className="btn rewards-btn px-3 py-2"
                            style={{ fontSize: "12px" }}
                            // onClick={() => {
                            //   setlandunStakeModal(true);
                            // }}
                          >
                            Rewards
                          </NavLink>
                        </div>
                        <div
                          className="tvl-wrapper"
                          style={{ width: "150px", height: "134px" }}
                        >
                          <h6
                            className="market-stake-tvl"
                            style={{ fontSize: "24px" }}
                          >
                            ${abbreviateNumber(landtvl)}
                            {/* $1,500 */}
                          </h6>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="new-caws-stake-img"
                  src={
                    windowSize.width < 786 ? newCawsStakeMobile : newCawsStake
                  }
                  alt=""
                />
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
