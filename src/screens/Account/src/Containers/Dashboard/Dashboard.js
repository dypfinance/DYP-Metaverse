/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { dashboardBackground } from "../../Themes/Images";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { getWalletTokens } from "../../web3/tmp";
import { Grid } from "@mui/material";
import { HashLoader } from "react-spinners";
import { Cart, LoginWrapper, ErrorAlert, Button } from "../../Components";
import LandCart from "../../Components/Cart/LandCart";
import EmptyCard from "../../Components/Cart/EmptyCard";
import classes from "./Dashboard.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";
import WalletBalance from "../../Components/WalletBalance/WalletBalance";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import ChecklistModal from "../../Components/ChecklistModal/ChecklistModal";
import ChecklistLandNftModal from "../../Components/ChecklistModal/ChecklistLandNftModal";
import EmptyGenesisCard from "../../Components/EmptyGenesisCard/EmptyGenesisCard";
import Web3 from "web3";
import { ERC20_ABI } from "../../web3/abis";
import _, { chain } from "lodash";
import WalletModal from "../../../../../components/WalletModal/WalletModal";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import getListedNFTS from "../../../../../actions/Marketplace";
import axios from "axios";
import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import NewWalletBalance from "../../Components/WalletBalance/NewWalletBalance";
import DailyBonusPopup from "../../Components/WalletBalance/DailyBonusPopup";
import rewardPopup from "../../Components/WalletBalance/assets/rewardspopup3.webp";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "../../Components/WalletBalance/newAssets/xMark.svg";
import MyRewardsPopup from "../../Components/WalletBalance/MyRewardsPopup";
import coinStackIcon from "../../Images/premium/coinStackIcon.svg";
import launchpadIndicator from "../../Images/premium/launchpadIndicator.svg";
import dappsIcon from "../../Images/premium/dappsIcon.svg";
import metaverseIcon from "../../Images/premium/metaverseIcon.svg";
import greenCheck from "../../Images/premium/greenCheck.svg";
import premiumIcon from "../../Images/premium/premiumIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import MyBalance from "../../Components/WalletBalance/MyBalance";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import conflux from "../../Components/WalletBalance/assets/conflux.svg";
import baseLogo from "../../Components/WalletBalance/assets/baseLogo.svg";
import DailyBonusModal from "../../../../Marketplace/DailyBonusModal";
import NewLeaderBoard from "../../Components/LeaderBoard/NewLeaderBoard";
import NewDailyBonus from "../../../../../components/NewDailyBonus/NewDailyBonus";
import skaleIcon from "../../../../../components/NewDailyBonus/assets/skaleIcon.svg";
import MyRewardsPopupNew from "../../Components/WalletBalance/MyRewardsPopup2";

function Dashboard({
  account,
  isConnected,
  chainId,
  coinbase,
  handleConnect,
  myCawsWodStakes,
  landStaked,
  ethTokenData,
  dypTokenData,
  onSigninClick,
  onLogoutClick,
  availableTime,
  success,
  handleSwitchNetwork,
  domainName,
  handleOpenDomains,
  dogePrice,
  dyptokenData_old,
  handleSwitchChain,
}) {
  const { email, logout } = useAuth();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const chainDropdowns = [
    {
      name: "Ethereum",
      symbol: "eth",
    },
    {
      name: "BNB Chain",
      symbol: "wbnb",
    },
    {
      name: "Avalanche",
      symbol: "wavax",
    },
    {
      name: "Conflux",
      symbol: "conflux",
    },
    {
      name: "Base",
      symbol: "base",
    },
    {
      name: "SKALE",
      symbol: "skale",
    },
  ];

  const [tokensState, setTokensState] = useState({});
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [showChecklistLandNftModal, setshowChecklistLandNftModal] =
    useState(false);
  const firstSlider = useRef();
  const [loading, setLoading] = useState(true);
  const [userRankRewards, setUserRankRewards] = useState(0);
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();
  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [showNfts, setShowNfts] = useState(false);
  const [showWalletModal, setshowWalletModal] = useState(false);
  const [goldenPassRemainingTime, setGoldenPassRemainingTime] = useState();
  const [stakes, setStakes] = useState([]);
  const [landstakes, setLandStakes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);

  const [MyNFTSLandBNB, setMyNFTSLandBNB] = useState([]);
  const [MyNFTSCawsBNB, setMyNFTSCawsBNB] = useState([]);

  const [MyNFTSLandAvax, setMyNFTSLandAvax] = useState([]);
  const [MyNFTSCawsAvax, setMyNFTSCawsAvax] = useState([]);

  const [MyNFTSLandBase, setMyNFTSLandBase] = useState([]);
  const [MyNFTSCawsBase, setMyNFTSCawsBase] = useState([]);

  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setmyGateNfts] = useState([]);
  const [myConfluxNfts, setmyConfluxNfts] = useState([]);
  const [myBaseNfts, setmyBaseNfts] = useState([]);
  const [myDogeNfts, setmyDogeNfts] = useState([]);
  const [myCmcNfts, setmyCmcNfts] = useState([]);
  const [mySkaleNfts, setmySkaleNfts] = useState([]);
  const [latestVersion, setLatestVersion] = useState(0);

  const [userPoints, setuserPoints] = useState(0);
  const [userEarnUsd, setuserEarnUsd] = useState(0);
  const [userEarnETH, setuserEarnETH] = useState(0);

  const [cmcuserPoints, setcmcuserPoints] = useState(0);
  const [cmcuserEarnUsd, setcmcuserEarnUsd] = useState(0);
  const [cmcuserEarnETH, setcmcuserEarnETH] = useState(0);

  const [confluxUserPoints, setConfluxUserPoints] = useState(0);
  const [confluxEarnUSD, setConfluxEarnUSD] = useState(0);
  const [confluxEarnCFX, setConfluxEarnCFX] = useState(0);

  const [gateEarnUSD, setGateEarnUSD] = useState(0);
  const [gateUserPoints, setGateUserPoints] = useState(0);
  const [gateEarnBnb, setGateEarnBNB] = useState(0);

  const [dogeUserPoints, setDogeUserPoints] = useState(0);
  const [dogeEarnUSD, setDogeEarnUSD] = useState(0);
  const [dogeEarnBNB, setDogeEarnBNB] = useState(0);

  const [baseUserPoints, setBaseUserPoints] = useState(0);
  const [baseEarnUSD, setBaseEarnUSD] = useState(0);
  const [baseEarnETH, setBaseEarnETH] = useState(0);
  const [dypiusEarnTokens, setDypiusEarnTokens] = useState(0);
  const [dypiusEarnUsd, setDypiusEarnUsd] = useState(0);

  const [dypiusPremiumEarnTokens, setdypiusPremiumEarnTokens] = useState(0);
  const [dypiusPremiumEarnUsd, setdypiusPremiumEarnUsd] = useState(0);
  const [dypiusPremiumPoints, setdypiusPremiumPoints] = useState(0);

  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);

  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [MyNFTSCawsOld, setMyNFTSCawsOld] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [listedNFTS, setListedNFTS] = useState([]);
  const [myBoughtNfts, setmyBoughtNfts] = useState([]);
  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [standardChests, setStandardChests] = useState([]);
  const [premiumChests, setPremiumChests] = useState([]);
  const [openedChests, setOpenedChests] = useState([]);

  const [standardSkaleChests, setStandardSkaleChests] = useState([]);
  const [premiumSkaleChests, setPremiumSkaleChests] = useState([]);
  const [openedSkaleChests, setOpenedSkaleChests] = useState([]);
  const [kittyDashRecords, setkittyDashRecords] = useState([]);

  const [leaderboard, setLeaderboard] = useState(false);
  const [syncStatus, setsyncStatus] = useState("initial");
  const [myOffers, setmyOffers] = useState([]);
  const [allActiveOffers, setallOffers] = useState([]);
  const [showSyncModal, setshowSyncModal] = useState(false);
  const [isonlink, setIsOnLink] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [myRewardsPopup, setmyRewardsPopup] = useState(false);
  const [getPremiumPopup, setgetPremiumPopup] = useState(false);
  const [balancePopup, setBalancePopup] = useState(false);
  const [dailyBonusInfo, setdailyBonusInfo] = useState(false);

  const [dropdownIcon, setdropdownIcon] = useState("");
  const [dropdownTitle, setdropdownTitle] = useState("");
  const [status, setstatus] = useState("");
  const [approveStatus, setapproveStatus] = useState("initial");
  const [isApproved, setisApproved] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [price, setprice] = useState(0);
  const [formattedPrice, setformattedPrice] = useState("0");
  const [loadspinner, setloadspinner] = useState(false);
  const [loadspinnerSub, setloadspinnerSub] = useState(false);
  const [chainDropdown, setChainDropdown] = useState(chainDropdowns[0]);
  const [selectedSubscriptionToken, setselectedSubscriptionToken] = useState(
    Object.keys(window.config.subscription_tokens)[0]
  );
  const [tokenDecimals, settokenDecimals] = useState(1);
  const [userWallet, setuserWallet] = useState("");
  const [dummypremiumChests, setDummyPremiumChests] = useState([]);

  const [claimedChests, setclaimedChests] = useState(0);
  const [claimedPremiumChests, setclaimedPremiumChests] = useState(0);

  const [claimedSkaleChests, setclaimedSkaleChests] = useState(0);
  const [claimedSkalePremiumChests, setclaimedSkalePremiumChests] = useState(0);

  const [dailyplayerData, setdailyplayerData] = useState(0);
  const [weeklyplayerData, setweeklyplayerData] = useState(0);
  const [userSocialRewards, setuserSocialRewards] = useState(0);

  const [canBuy, setCanBuy] = useState(false);

  const [allChests, setallChests] = useState([]);
  const [allSkaleChests, setallSkaleChests] = useState([]);

  const [count, setCount] = useState(0);
  const [skalecount, setskalecount] = useState(0);

  const [userRank, setUserRank] = useState("");
  const [userRankSkale, setUserRankSkale] = useState("")
  const [userRank2, setUserRank2] = useState("");
  const [userRank2Skale, setUserRank2Skale] = useState("");
  const [userBnbScore, setUserBnbScore] = useState(0)
  const [userSkaleScore, setUserSkaleScore] = useState(0)
  const [genesisRank, setGenesisRank] = useState("");
  const [genesisRank2, setGenesisRank2] = useState("");
  const [premiumTxHash, setPremiumTxHash] = useState("");
  const [selectedChainforPremium, setselectedChainforPremium] = useState("");
  
  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");
  const leaderboardId = document.querySelector("#leaderboard");
  const { BigNumber } = window;

  const dailyBonusData = {
    eventType: "6 Available Rewards",
    title: "Daily Bonus",
    chain: "BNB Chain, opBNB Chain",
    linkState: "conflux",
    status: "Live",
    id: "event10",
    totalRewards: "$2,000 in CFX Rewards",
    eventDate: "Dec 1, 2023",
  };

  let wethAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  let wcfx = "0xfe97E85d13ABD9c1c33384E796F10B73905637cE";
  let wbase = "0x4200000000000000000000000000000000000006";
  let wbnbAddress = "0x55d398326f99059fF775485246999027B3197955";
  let wavaxAddress = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";
  let wskaleAddress = "0xCC205196288B7A26f6D43bBD68AaA98dde97276d";

  const dailyPrizes = [10, 8, 5, 5, 0, 0, 0, 0, 0, 0];

  const dailyPrizesGolden = [10, 8, 5, 5, 5, 5, 5, 5, 5, 5];

  const weeklyPrizes = [25, 15, 10, 8, 0, 0, 0, 0, 0, 0];

  const weeklyPrizesGolden = [25, 15, 10, 8, 5, 5, 5, 5, 5, 5, 5];

  const monthlyPrizes = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const monthlyPrizesGolden = [250, 150, 100, 50, 50, 20, 20, 10, 10, 10];

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const dummyPremiums = [
    {
      chestTitle: "Jewel Coffer",
      closedImg: "greenCrystal",
      chestId: 1,
    },
    {
      chestTitle: "Gold Hoard",
      closedImg: "blueCrystal",
      chestId: 2,
    },
    {
      chestTitle: "Pirate's Bounty",
      closedImg: "yellowCrystal",
      chestId: 3,
    },
    {
      chestTitle: "Gem Trove",
      closedImg: "purpleCrystal",
      chestId: 4,
    },
    {
      chestTitle: "Coin Chest",
      closedImg: "cyanCrystal",
      chestId: 5,
    },
    {
      chestTitle: "Silver Cache",
      closedImg: "greenCrystal",
      chestId: 6,
    },
    {
      chestTitle: "Ruby Stash",
      closedImg: "blueCrystal",
      chestId: 7,
    },
    {
      chestTitle: "Mystic Reliquary",
      closedImg: "yellowCrystal",
      chestId: 8,
    },
    {
      chestTitle: "Ancient Relics",
      closedImg: "purpleCrystal",
      chestId: 9,
    },
    {
      chestTitle: "Emerald Trove",
      closedImg: "cyanCrystal",
      chestId: 10,
    },
  ];

  const metaverseBenefits = [
    "Exclusive access to World of Dypians",
    "Access to Daily Bonus Event",
    "Access every Treasure Hunt Event without the need to hold a Beta Pass NFT",
    "Early access to upcoming features and updates",
  ];

  const dappsBenefits = [
    "DYP Tools administrative dashboard",
    "Voting capabilities in the News section",
    "Priority allocation to presales of new projects through Dypius Launchpad",
    "Early access to upcoming features and updates",
  ];

  const override2 = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
    top: "30%",
    left: "40%",
    position: "absolute",
  };

  const onOpenNfts = () => {
    setShowNfts(!showNfts);
  };

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const fetchReleases = async () => {
    const newReleases = await axios
      .get("https://api3.dyp.finance/api/wod_releases")
      .then((res) => {
        return res.data;
      });

    const datedReleasedNews = newReleases.map((item) => {
      return { ...item, date: new Date(item.date) };
    });

    setLatestVersion(datedReleasedNews[0]?.version);
  };

  //land only stakes
  const getStakesIdsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getmyWodStakes = async () => {
    let myStakes = await getStakesIdsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);

      stakes.reverse();
      setLandStakes(stakes);
    } else setLandStakes([]);
  };

  const getCawsStakesIdsCawsWod = async () => {
    const address = coinbase;

    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getWodStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );

    let myStakes = await staking_contract.methods
      .depositsOfWoD(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myCawsStakes = await getCawsStakesIdsCawsWod();

    let myWodStakes = await getWodStakesIdsCawsWod();

    if (myCawsStakes && myCawsStakes.length > 0) {
      let stakes = myCawsStakes.map((stake) => window.getNft(stake));
      let landstakes = myWodStakes.map((stake) => window.getLandNft(stake));

      stakes = await Promise.all(stakes);
      landstakes = await Promise.all(landstakes);

      stakes.reverse();
      landstakes.reverse();

      setMyCawsWodStakes(stakes);
      setmyWodWodStakesAll(landstakes);
    } else {
      setMyCawsWodStakes([]);
      setmyWodWodStakesAll([]);
    }
  };

  async function connectWallet() {
    setIsOnLink(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum?.enable();
        console.log("Connected!");
        if (window.ethereum.isCoin98) {
          window.WALLET_TYPE = "coin98";
        }
        if (window.ethereum.isMetaMask) {
          window.WALLET_TYPE = "metamask";
        }
        let coinbase_address;
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((data) => {
            coinbase_address = data[0];
          });
        // window.coinbase_address = coinbase_address.pop();
        await generateNonce({
          variables: {
            publicAddress: coinbase_address,
          },
        }).then(() => {
          setshowWalletModal(false);
        });
        return true;
      } catch (e) {
        console.error(e);
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", e);
        throw new Error("User denied wallet connection!");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("connected to old web3");
      // onConnect();
      return true;
    } else {
      throw new Error("No web3 detected!");
    }
  }

  const signWalletPublicAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: account,
          signature: signature,
        },
      }).then(() => {
        setsyncStatus("success");
        setTimeout(() => {
          setshowSyncModal(false);
          setsyncStatus("initial");
        }, 1000);

        setTimeout(() => {
          if (isonlink) {
            window.location.reload();
          }
        }, 2000);
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
      }, 3000);

      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const fetchMonthlyRecordsAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );
    const userPosition = testArray[0].position;
    // console.log(userPosition)

    if (goldenPassRemainingTime) {
      setUserRank2(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9] + monthlyPrizesGolden[9]
            : monthlyPrizes[userPosition] + monthlyPrizesGolden[userPosition]
          : 0
      );
    } else if (!goldenPassRemainingTime) {
      setUserRank2(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9]
            : monthlyPrizes[userPosition]
          : 0
      );
    }

    setUserRank(testArray[0].position);
    setUserBnbScore(testArray[0].statValue)

  };
  const fetchSkaleRecordsAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "LeaderboardSkaleMonthly",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );
    const userPosition = testArray[0].position;
    // console.log(userPosition)

    if (goldenPassRemainingTime) {
      setUserRank2Skale(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9] + monthlyPrizesGolden[9]
            : monthlyPrizes[userPosition] + monthlyPrizesGolden[userPosition]
          : 0
      );
    } else if (!goldenPassRemainingTime) {
      setUserRank2Skale(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? monthlyPrizes[9]
            : monthlyPrizes[userPosition]
          : 0
      );
    }

    setUserRankSkale(testArray[0].position);
    setUserSkaleScore(testArray[0].statValue)
  };

  const fetchGenesisAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );

    setGenesisRank(testArray[0].position);
    setGenesisRank2(testArray[0].statValue);
  };

  const fetchKittyDashAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "MobileGameDailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );
    setkittyDashRecords(testArray);
    // setGenesisRank(testArray[0].position);
    // setGenesisRank2(testArray[0].statValue);
  };

  const fetchDailyRecordsAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "DailyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );

      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === userName
      );

      const userPosition = testArray[0].position;

      if (goldenPassRemainingTime) {
        setdailyplayerData(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? dailyPrizes[9] + dailyPrizesGolden[9]
              : dailyPrizes[userPosition] + dailyPrizesGolden[userPosition]
            : 0
        );
      } else if (!goldenPassRemainingTime) {
        setdailyplayerData(
          testArray[0].statValue !== 0
            ? userPosition > 10
              ? 0
              : userPosition === 10
              ? dailyPrizes[9]
              : dailyPrizes[userPosition]
            : 0
        );
      }
    }
  };

  const fetchWeeklyRecordsAroundPlayer = async (userId, userName) => {
    const data = {
      StatisticName: "WeeklyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };

    const result = await axios.post(
      `${backendApi}/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === userName
    );

    const userPosition = testArray[0].position;
    if (goldenPassRemainingTime) {
      setweeklyplayerData(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? weeklyPrizes[9] + weeklyPrizesGolden[9]
            : weeklyPrizes[userPosition] + weeklyPrizesGolden[userPosition]
          : 0
      );
    } else if (!goldenPassRemainingTime) {
      setweeklyplayerData(
        testArray[0].statValue !== 0
          ? userPosition > 10
            ? 0
            : userPosition === 10
            ? weeklyPrizes[9]
            : weeklyPrizes[userPosition]
          : 0
      );
    }
  };

  const fetchTreasureHuntData = async (email, userAddress) => {
    try {
      // console.log(email, window.infuraWeb3.utils.toChecksumAddress(userAddress))
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

          const baseEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "base";
          });
          const dypEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "all";
          });

          const dogeEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "dogecoin";
          });

          const cmcEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "coinmarketcap";
          });

          const dypPremiumEvent = responseData.events.filter((obj) => {
            return obj.betapassId === "subscriber";
          });

          if (dypPremiumEvent && dypPremiumEvent[0]) {
            const userEarnedusd =
              dypPremiumEvent[0].reward.earn.total /
              dypPremiumEvent[0].reward.earn.multiplier;
            const pointsdypius = dypPremiumEvent[0].reward.earn.totalPoints;

            setdypiusPremiumPoints(pointsdypius);
            setdypiusPremiumEarnUsd(userEarnedusd);
            setdypiusPremiumEarnTokens(userEarnedusd / bnbPrice);
          }

          if (dypEvent && dypEvent[0]) {
            const userEarnedDyp =
              dypEvent[0].reward.earn.total /
              dypEvent[0].reward.earn.multiplier;
            setDypiusEarnUsd(dypTokenData * userEarnedDyp);
            setDypiusEarnTokens(userEarnedDyp);
          }
          if (coingeckoEvent && coingeckoEvent[0]) {
            const points = coingeckoEvent[0].reward.earn.totalPoints;
            setuserPoints(points);
            const usdValue =
              coingeckoEvent[0].reward.earn.total /
              coingeckoEvent[0].reward.earn.multiplier;
            setuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setuserEarnETH(usdValue / bnbPrice);
            }
          }

          if (cmcEvent && cmcEvent[0]) {
            const points = cmcEvent[0].reward.earn.totalPoints;
            setcmcuserPoints(points);
            const usdValue =
              cmcEvent[0].reward.earn.total /
              cmcEvent[0].reward.earn.multiplier;
            setcmcuserEarnUsd(usdValue);
            if (bnbPrice !== 0) {
              setcmcuserEarnETH(usdValue / bnbPrice);
            }
          }

          if (dogeEvent && dogeEvent[0]) {
            const points = dogeEvent[0].reward.earn.totalPoints;
            setDogeUserPoints(points);
            const usdValue =
              dogeEvent[0].reward.earn.total /
              dogeEvent[0].reward.earn.multiplier;
            setDogeEarnUSD(usdValue);
            if (dogePrice !== 0) {
              setDogeEarnBNB(usdValue / dogePrice);
            }
          }

          if (confluxEvent && confluxEvent[0]) {
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
          }

          if (gateEvent && gateEvent[0]) {
            const gatePoints = gateEvent[0].reward.earn.totalPoints;
            setGateUserPoints(gatePoints);
            if (gateEvent[0].reward.earn.multiplier !== 0) {
              const gateUsdValue =
                gateEvent[0].reward.earn.total /
                gateEvent[0].reward.earn.multiplier;
              setGateEarnUSD(gateUsdValue);
              if (bnbPrice !== 0) {
                setGateEarnBNB(gateUsdValue / bnbPrice);
              }
            }
          }

          if (baseEvent && baseEvent[0]) {
            const basePoints = baseEvent[0].reward.earn.totalPoints;
            setBaseUserPoints(basePoints);
            if (baseEvent[0].reward.earn.multiplier !== 0) {
              const baseUsdValue =
                baseEvent[0].reward.earn.total /
                baseEvent[0].reward.earn.multiplier;
              setBaseEarnUSD(baseUsdValue);
              if (ethTokenData !== 0) {
                setBaseEarnETH(baseUsdValue / ethTokenData);
              }
            }
          }
        }
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshSubscription = async (addr) => {
    const result = window.checkPremium(addr);

    let subscribedPlatformTokenAmountETH;
    let subscribedPlatformTokenAmountCfx;
    let subscribedPlatformTokenAmountBNB;
    let subscribedPlatformTokenAmountAvax;
    let subscribedPlatformTokenAmountBase;
    let subscribedPlatformTokenAmountSkale;

    const web3eth = window.infuraWeb3;
    const web3cfx = window.confluxWeb3;
    const web3base = window.baseWeb3;
    const web3bnb = window.bscWeb3;
    const web3avax = window.avaxWeb3;
    const web3skale = window.skaleWeb3;

    const CfxABI = window.SUBSCRIPTION_CFX_ABI;
    const BaseABI = window.SUBSCRIPTION_BASE_ABI;
    const EthABI = window.SUBSCRIPTION_NEWETH_ABI;
    const AvaxABI = window.SUBSCRIPTION_NEWAVAX_ABI;
    const BnbABI = window.SUBSCRIPTION_NEWBNB_ABI;
    const SkaleABI = window.SUBSCRIPTION_SKALE_ABI;

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;

    const ethcontract = new web3eth.eth.Contract(EthABI, ethsubscribeAddress);
    const cfxcontract = new web3cfx.eth.Contract(CfxABI, cfxsubscribeAddress);
    const skalecontract = new web3skale.eth.Contract(
      SkaleABI,
      skalesubscribeAddress
    );

    const basecontract = new web3base.eth.Contract(
      BaseABI,
      basesubscribeAddress
    );

    const bnbcontract = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress);
    const avaxcontract = new web3avax.eth.Contract(
      AvaxABI,
      avaxsubscribeAddress
    );

    if (addr) {
      subscribedPlatformTokenAmountETH = await ethcontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      subscribedPlatformTokenAmountCfx = await cfxcontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      subscribedPlatformTokenAmountBase = await basecontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      subscribedPlatformTokenAmountBNB = await bnbcontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      subscribedPlatformTokenAmountAvax = await avaxcontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      subscribedPlatformTokenAmountSkale = await skalecontract.methods
        .subscriptionPlatformTokenAmount(addr)
        .call()
        .catch((e) => {
          console.log(e);
          return 0;
        });

      if (
        subscribedPlatformTokenAmountCfx == "0" &&
        subscribedPlatformTokenAmountETH == "0" &&
        subscribedPlatformTokenAmountBase == "0" &&
        subscribedPlatformTokenAmountBNB == "0" &&
        subscribedPlatformTokenAmountAvax == "0" &&
        subscribedPlatformTokenAmountSkale == "0" &&
        result === false
      ) {
        setIsPremium(false);
      }
      if (
        subscribedPlatformTokenAmountCfx != "0" ||
        subscribedPlatformTokenAmountETH != "0" ||
        subscribedPlatformTokenAmountBase != "0" ||
        subscribedPlatformTokenAmountBNB != "0" ||
        subscribedPlatformTokenAmountAvax != "0" ||
        subscribedPlatformTokenAmountSkale != "0" ||
        result === true
      ) {
        setIsPremium(true);
      }
    }
  };

  const getOpenedChestPerWallet = async () => {
    if (email) {
      if (isPremium) {
        if (
          claimedChests + claimedPremiumChests < 20 ||
          claimedSkaleChests + claimedSkalePremiumChests < 20
        ) {
          setCanBuy(true);
        } else if (
          claimedChests + claimedPremiumChests === 20 &&
          claimedSkaleChests + claimedSkalePremiumChests === 20
        ) {
          setCanBuy(false);
        }
      } else if (!isPremium) {
        if (claimedChests < 10 || claimedSkaleChests < 10) {
          setCanBuy(true);
        } else if (claimedChests === 10 && claimedSkaleChests === 10) {
          setCanBuy(true);
          //change later
        }
      }
    } else {
      setCanBuy(false);
    }
  };

  const getAllChests = async (userEmail) => {
    const emailData = { emailAddress: userEmail, chainId: "bnb" };

    const result = await axios.post(
      "https://dyp-chest-test.azurewebsites.net/api/GetRewards?=null",
      emailData
    );
    if (result.status === 200 && result.data) {
      const chestOrder = result.data.chestOrder;

      let standardChestsArray = [];
      let premiumChestsArray = [];
      let openedChests = [];
      let openedStandardChests = [];
      let openedPremiumChests = [];

      if (chestOrder.length > 0) {
        for (let item = 0; item < chestOrder.length; item++) {
          if (chestOrder[item].chestType === "Standard") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
              }
            }
            premiumChestsArray.push(chestOrder[item]);
          }
        }
        setOpenedChests(openedChests);
        setStandardChests(standardChestsArray);
        setPremiumChests(premiumChestsArray);
        setclaimedChests(openedStandardChests.length);
        setclaimedPremiumChests(openedPremiumChests.length);
        setallChests(chestOrder);
      }
    }
  };

  const getAllSkaleChests = async (userEmail) => {
    const emailData = { emailAddress: userEmail, chainId: "skale" };

    const result = await axios.post(
      "https://dyp-chest-test.azurewebsites.net/api/GetRewards?=null",
      emailData
    );
    if (result.status === 200 && result.data) {
      const chestOrder = result.data.chestOrder;

      let standardChestsArray = [];
      let premiumChestsArray = [];
      let openedChests = [];
      let openedStandardChests = [];
      let openedPremiumChests = [];

      if (chestOrder.length > 0) {
        for (let item = 0; item < chestOrder.length; item++) {
          if (chestOrder[item].chestType === "Standard") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedStandardChests.push(chestOrder[item]);
              }
            }
            standardChestsArray.push(chestOrder[item]);
          } else if (chestOrder[item].chestType === "Premium") {
            if (chestOrder[item].isOpened === true) {
              {
                openedChests.push(chestOrder[item]);
                openedPremiumChests.push(chestOrder[item]);
              }
            }
            premiumChestsArray.push(chestOrder[item]);
          }
        }
        setOpenedSkaleChests(openedChests);
        setStandardSkaleChests(standardChestsArray);
        setPremiumSkaleChests(premiumChestsArray);

        setclaimedSkaleChests(openedStandardChests.length);
        setclaimedSkalePremiumChests(openedPremiumChests.length);
        setallSkaleChests(chestOrder);
      }
    }
  };

  const handleShowSyncModal = () => {
    setshowSyncModal(true);
  };

  const handleSync = async () => {
    setsyncStatus("loading");

    try {
      await generateNonce({
        variables: {
          publicAddress: account,
        },
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSyncModal(false);
      }, 3000);
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  //todo
  const fetchAllMyNfts = async () => {
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "caws").then((NFTS) =>
      setMyNFTSCaws(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsbnb").then(
      (NFTS) => setMyNFTSCawsBNB(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsbase").then(
      (NFTS) => setMyNFTSCawsBase(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cawsavax").then(
      (NFTS) => setMyNFTSCawsAvax(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "timepiece").then(
      (NFTS) => setMyNFTSTimepiece(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "land").then((NFTS) =>
      setMyNFTSLand(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landbnb").then(
      (NFTS) => setMyNFTSLandBNB(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landbase").then(
      (NFTS) => setMyNFTSLandBase(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "landavax").then(
      (NFTS) => setMyNFTSLandAvax(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "coingecko").then(
      (NFTS) => setMyNFTSCoingecko(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "gate").then((NFTS) =>
      setmyGateNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "conflux").then(
      (NFTS) => setmyConfluxNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "base").then((NFTS) =>
      setmyBaseNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "doge").then((NFTS) =>
      setmyDogeNfts(NFTS)
    );
    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "cmc").then((NFTS) =>
      setmyCmcNfts(NFTS)
    );

    getMyNFTS(userWallet !== "" ? userWallet : coinbase, "skale").then((NFTS) =>
      setmySkaleNfts(NFTS)
    );
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];

    const listedNFTS = await getListedNFTS(0, "", "buyer", coinbase, "");
    listedNFTS &&
      listedNFTS.length > 0 &&
      listedNFTS.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        }
      });
    setmyBoughtNfts(finalboughtItems1);
    setListedNFTS(finalboughtItems1);
  };

  const windowSize = useWindowSize();

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3";
      const token_address_bsc = "0x1a3264f2e7b1cfc6220ec9348d33ccf02af7aaa4";

      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address_bsc);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address_bsc);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const bal1 = await contract1.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    } else {
      setDypBalance(0);
      setDypBalanceBnb(0);
      setDypBalanceAvax(0);
      setiDypBalance(0);
      setiDypBalanceBnb(0);
      setiDypBalanceAvax(0);
    }
  };

  async function fetchUserFavorites(userId) {
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching user favorites");
        }
        const data = await response.json();
        // console.log(data.favorites);

        setFavorites(data.favorites);
        return data.favorites;
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
      }
    } else {
      setFavorites([]);
    }
  }

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("boughtItems", boughtItems);

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });
    return finalboughtItems;
  };

  const getUserRewardData = async (addr) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/api/specialreward/${addr}`)
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      if (result.data && result.data.rewards && result.data.rewards === 0) {
        setuserSocialRewards(0);
        localStorage.setItem("cacheduserSocialRewards", 0);
      } else if (result.data && !result.data.rewards) {
        let amount = 0;
        for (let i = 0; i < result.data.length; i++) {
          amount += result.data[i].amount;
        }
        localStorage.setItem("cacheduserSocialRewards", amount);
        setuserSocialRewards(amount);
      }
    }
  };

  const getMyOffers = async () => {
    //setmyOffers

    let allOffers = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const offersQuery = `
    {
      offerMades(first: 100) {
        id
        buyer
        nftAddress
        tokenId
      }
    }
    `;

    await axios
      .post(URL, { query: offersQuery })
      .then(async (result) => {
        allOffers = await result.data.data.offerMades;
        setallOffers(result.data.data.offerMades);
      })
      .catch((error) => {
        console.log(error);
      });

    if (allOffers.length > 0) {
      let finalArray = [];
      await Promise.all(
        allOffers.map(async (nft) => {
          const result = await window
            .getAllOffers(nft.nftAddress, nft.tokenId)
            .catch((e) => {
              console.error(e);
            });

          if (result && result.length > 0) {
            if (coinbase) {
              result.map((item) => {
                if (
                  item.offer.buyer?.toLowerCase() === coinbase.toLowerCase()
                ) {
                  return finalArray.push({
                    offer: item.offer,
                    index: item.index,
                    nftAddress: nft.nftAddress,
                    tokenId: nft.tokenId,
                    type:
                      nft.nftAddress === window.config.nft_caws_address
                        ? "caws"
                        : nft.nftAddress === window.config.nft_timepiece_address
                        ? "timepiece"
                        : "land",
                  });
                }
              });
            }
          }
        })
      );
      let uniqueOffers = finalArray.filter(
        (v, i, a) =>
          a.findIndex(
            (v2) => v2.tokenId === v.tokenId && v2.nftAddress === v.nftAddress
          ) === i
      );

      setmyOffers(uniqueOffers);
    }
  };

  const handleSubscriptionTokenChange = async (tokenAddress) => {
    const token = tokenAddress;
    let tokenDecimals =
      chainId === 1
        ? window.config.subscriptioneth_tokens[token]?.decimals
        : chainId === 56
        ? window.config.subscriptionbnb_tokens[token]?.decimals
        : chainId === 1030
        ? window.config.subscriptioncfx_tokens[token]?.decimals
        : chainId === 8453
        ? window.config.subscriptionbase_tokens[token]?.decimals
        : chainId === 43114
        ? window.config.subscription_tokens[token]?.decimals
        : chainId === 1482601649
        ? window.config.subscriptionskale_tokens[token]?.decimals
        : window.config.subscriptioncfx_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );
    let tokenBalance2 = await window.getTokenHolderBalance(token, coinbase);
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
    setTokenBalance(tokenBalance2);
  };

  const handleApprove = async (e) => {
    // e.preventDefault();
    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;

    const web3 = new Web3(window.ethereum);

    let tokenContract = new web3.eth.Contract(
      window.ERC20_ABI,
      selectedSubscriptionToken
    );
    setloadspinner(true);

    await tokenContract.methods
      .approve(
        chainId === 1
          ? ethsubscribeAddress
          : chainId === 56
          ? bnbsubscribeAddress
          : chainId === 1030
          ? cfxsubscribeAddress
          : chainId === 8453
          ? basesubscribeAddress
          : chainId === 43114
          ? avaxsubscribeAddress
          : chainId === 1482601649
          ? skalesubscribeAddress
          : cfxsubscribeAddress,
        price
      )
      .send({ from: coinbase })
      .then(() => {
        setloadspinner(false);
        setisApproved(true);
        setapproveStatus("deposit");
      })
      .catch((e) => {
        setstatus(e?.message);
        setloadspinner(false);
        setapproveStatus("fail");
        window.alertify.error(e?.message);
        setTimeout(() => {
          setstatus("");
          setloadspinner(false);
          setapproveStatus("initial");
        }, 5000);
      });
  };

  const handleUpdatePremiumUser = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/sub/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const web3eth = new Web3(window.config.infura_endpoint);
    const bscWeb3 = new Web3(window.config.bsc_endpoint);
    const avaxWeb3 = new Web3(window.config.avax_endpoint);

    const cfxWeb3 = new Web3(window.config.conflux_endpoint);
    const baseWeb3 = new Web3(window.config.base_endpoint);
    const skaleWeb3 = new Web3(window.config.skale_endpoint);

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;

    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;

    const subscribeToken = token;
    const subscribeTokencontract = new web3eth.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbnb = new bscWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractavax = new avaxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractcfx = new cfxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbase = new baseWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractskale = new skaleWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    if (coinbase) {
      if (chainId === 1) {
        const result = await subscribeTokencontract.methods
          .allowance(coinbase, ethsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      }
      if (chainId === 56) {
        const result = await subscribeTokencontractbnb.methods
          .allowance(coinbase, bnbsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 43114) {
        const result = await subscribeTokencontractavax.methods
          .allowance(coinbase, avaxsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1482601649) {
        const result = await subscribeTokencontractskale.methods
          .allowance(coinbase, skalesubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1030) {
        const result = await subscribeTokencontractcfx.methods
          .allowance(coinbase, confluxsubscribeAddress)
          .call()
          .then();

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 8453) {
        const result = await subscribeTokencontractbase.methods
          .allowance(coinbase, basesubscribeAddress)
          .call()
          .then();

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      }
    }
  };

  const handleSubscribe = async (e) => {
    // e.preventDefault();
    let subscriptionContract = await window.getContract({
      key:
        chainId === 1
          ? "SUBSCRIPTION_NEWETH"
          : chainId === 56
          ? "SUBSCRIPTION_NEWBNB"
          : chainId === 43114
          ? "SUBSCRIPTION_NEWAVAX"
          : chainId === 1030
          ? "SUBSCRIPTION_CFX"
          : chainId === 8453
          ? "SUBSCRIPTION_BASE"
          : chainId === 1482601649
          ? "SUBSCRIPTION_SKALE"
          : "",
    });

    setloadspinnerSub(true);

    await subscriptionContract.methods
      .subscribe(selectedSubscriptionToken, price)
      .send({ from: await window.getCoinbase() })
      .then((data) => {
        if (dailyBonusPopup === true) {
          setPremiumTxHash(data.transactionHash);
          const selectedchain =
            chainId === 1
              ? "eth"
              : chainId === 56
              ? "bnb"
              : chainId === 43114
              ? "avax"
              : chainId === 1030
              ? "cfx"
              : chainId === 8453
              ? "base"
              : chainId === 1482601649
              ? "skale"
              : "";
          setselectedChainforPremium(selectedchain);

          setTimeout(() => {
            setgetPremiumPopup(false);
          }, 2000);
        }
        setloadspinnerSub(false);
        setIsPremium(true);
        handleUpdatePremiumUser(coinbase);
        setapproveStatus("successsubscribe");
        setTimeout(() => {
          setloadspinnerSub(false);
          setloadspinner(false);
          setapproveStatus("initial");
          setstatus("");
        }, 5000);
        // this.props.onSubscribe();
        // window.location.href = "https://app.dypius.com/account";
      })
      .catch((e) => {
        setloadspinnerSub(false);
        setapproveStatus("failsubscribe");
        setstatus(e?.message);
        window.alertify.error(e?.message);
        setTimeout(() => {
          setloadspinnerSub(false);
          setloadspinner(false);
          setapproveStatus("initial");
          setstatus("");
        }, 5000);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
      });
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

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
            setChainDropdown(chainDropdowns[0]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  // console.log(avatar);
  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
            setChainDropdown(chainDropdowns[1]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleAvaxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xa86a")
          .then(() => {
            handleSwitchNetwork(43114);
            setChainDropdown(chainDropdowns[2]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBasePool = async () => {
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0x2105")
        .then(() => {
          handleSwitchNetwork(8453);
          setChainDropdown(chainDropdowns[4]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
            setChainDropdown(chainDropdowns[3]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleSkalePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x585eb4b1")
          .then(() => {
            handleSwitchNetwork(1482601649);
            setChainDropdown(chainDropdowns[5]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };


  const handleRankRewards = () => {
    let totalScore = userBnbScore + userSkaleScore
    if(totalScore > 6000000){
      setUserRankRewards(5);
    }else if(totalScore > 12000000){
      setUserRankRewards(10)
    }else if(totalScore > 24000000){
      setUserRankRewards(25)
    }else if(totalScore > 40000000){
      setUserRankRewards(100)
    }
  }

  useEffect(() => {
 handleRankRewards()
  }, [userBnbScore, userSkaleScore])
  

  useEffect(() => {
    setDummyPremiumChests(shuffle(dummyPremiums));
    fetchReleases();
  }, []);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setDummyPremiumChests(shuffle(dummyPremiums));
        clearInterval(interval);
      }
    };
    const interval = setInterval(checkMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chainId === 1) {
      setChainDropdown(chainDropdowns[0]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    } else if (chainId === 56) {
      setChainDropdown(chainDropdowns[1]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wbnbAddress);
      handleCheckIfAlreadyApproved(wbnbAddress);
    } else if (chainId === 1030) {
      setChainDropdown(chainDropdowns[3]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncfx_tokens)[0]
      );
      handleSubscriptionTokenChange(wcfx);
      handleCheckIfAlreadyApproved(wcfx);
    } else if (chainId === 8453) {
      setChainDropdown(chainDropdowns[4]);
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbase_tokens)[0]
      );
      handleSubscriptionTokenChange(wbase);
      handleCheckIfAlreadyApproved(wbase);
    } else if (chainId === 43114) {
      setChainDropdown(chainDropdowns[2]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscription_tokens)[0]
      );
      handleSubscriptionTokenChange(wavaxAddress);
    } else if (chainId === 1482601649) {
      setChainDropdown(chainDropdowns[5]);
      setdropdownIcon("usdc");
      setdropdownTitle("USDC");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionskale_tokens)[0]
      );
      handleSubscriptionTokenChange(wskaleAddress);
    } else {
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    }
  }, [chainId, getPremiumPopup]);

  useEffect(() => {
    if (chainId === 1 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioneth_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 56 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbnb_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 43114 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscription_tokens[selectedSubscriptionToken]?.decimals
      );
    } else if (chainId === 1030 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncfx_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 8453 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbase_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1482601649 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionskale_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    }
  }, [chainId, selectedSubscriptionToken]);

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
    }
  }, [dataVerify]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      fetchTreasureHuntData(email, data.getPlayer.wallet.publicAddress);
      refreshSubscription(data.getPlayer.wallet.publicAddress);
      setuserWallet(data.getPlayer.wallet.publicAddress);
    }
  }, [data, email]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      fetchMonthlyRecordsAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchSkaleRecordsAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchGenesisAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchWeeklyRecordsAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchDailyRecordsAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
      fetchKittyDashAroundPlayer(
        data.getPlayer.playerId,
        data.getPlayer.displayName
      );
    }
  }, [data, email, count, goldenPassRemainingTime]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      getOpenedChestPerWallet();
    }
  }, [
    data,
    email,
    count,
    isPremium,
    claimedChests,
    claimedPremiumChests,
    claimedSkaleChests,
    claimedSkalePremiumChests,
  ]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      getUserRewardData(data.getPlayer.wallet.publicAddress);
    }
  }, [data, email]);

  useEffect(() => {
    if (coinbase) {
      setsyncStatus("initial");
      fetchAllMyNfts();
      getmyCawsWodStakes();
      getmyWodStakes();
    }
  }, [
    email,
    userWallet,
    data?.getPlayer?.wallet?.publicAddress,
    coinbase,
    chainId,
  ]);

  useEffect(() => {
    getOtherNfts();
    getDypBalance();
    fetchUserFavorites(coinbase);
  }, [account, email, data?.getPlayer?.wallet]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenDatabnb();
    fetchCFXPrice();
  }, []);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true
    ) {
      html.classList.add("hidescroll");
      // dailyrewardpopup.style.pointerEvents = "auto";
      // leaderboardId.style.pointerEvents = "auto";
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup, dailyrewardpopup, leaderboard]);

  useEffect(() => {
    // if (coinbase) {
    getLatest20BoughtNFTS().then((NFTS) => setLatest20BoughtNFTS(NFTS));
    getMyOffers();
    // }
  }, [coinbase, isConnected]);

  const logoutItem = localStorage.getItem("logout");

  useEffect(() => {
    if (email) {
      getAllChests(email);
    }
  }, [email, count]);

  useEffect(() => {
    if (email) {
      getAllSkaleChests(email);
    }
  }, [email, count]);

  // useEffect(() => {
  //   if (window.ethereum && !window.coin98) {
  //     if (window.ethereum.isConnected() === true) {
  //       localStorage.setItem("logout", "false");
  //     } else {
  //       localStorage.setItem("logout", "true");
  //     }
  //   }
  // }, [coinbase, chainId]);

  const onOpenLeaderboard = () => {
    setLeaderboard(true);
    console.log("true");
  };

  useEffect(() => {
    if (success === true) {
      setshowWalletModal(false);
    }
  }, [success]);

  useEffect(() => {
    if (dailyBonusPopup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px", overflow: "hidden" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative">
        <div className="container-lg mx-0">
          <LoginWrapper
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              justifyContent: "normal",
              alignItems: "normal",
              flexDirection: "column",
              gap: "30px",
              height: "auto",
              minHeight: "100%",
            }}
            img={dashboardBackground}
          >
            {loadingPlayer ? (
              <>
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override2}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <div className="container-fluid px-0 px-lg-3">
                <div className={""}>
                  <div
                    className={
                      "d-flex flex-column gap-4 justify-content-center align-items-center"
                    }
                    style={{
                      marginTop: 80,
                    }}
                  >
                    <div
                      className={`col-12 d-flex flex-column gap-3  mt-5 mt-lg-0 ${classes.containerPlayer}`}
                    >
                      <ProfileCard
                        userRank={userRank}
                        userRankSkale={userRankSkale}
                        userBnbScore={userBnbScore}
                        userSkaleScore={userSkaleScore}
                        genesisRank={genesisRank}
                        email={email}
                        username={data?.getPlayer?.displayName}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        userId={data?.getPlayer?.playerId}
                        balance={dypBalancebnb}
                        availableTime={availableTime}
                        isVerified={data?.getPlayer?.wallet}
                        coinbase={account}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        onLinkWallet={connectWallet}
                        onSigninClick={onSigninClick}
                        onLogoutClick={() => {
                          logout();
                          setIsPremium(false);
                          setclaimedChests(0);
                          setclaimedPremiumChests(0);
                          setallChests([]);
                          setallSkaleChests([]);
                          setOpenedChests([]);
                          setOpenedSkaleChests([]);
                          setclaimedSkaleChests(0);
                          setclaimedSkalePremiumChests(0);
                        }}
                        onSyncClick={handleShowSyncModal}
                        syncStatus={syncStatus}
                        isPremium={isPremium}
                        isConnected={isConnected}
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                        handleSetAvailableTime={(value) => {
                          setGoldenPassRemainingTime(value);
                        }}
                        handleOpenDomains={handleOpenDomains}
                        domainName={domainName}
                      />

                      <NewWalletBalance
                        onDailyRewardsPopupOpen={() => {
                          setdailyBonusPopup(true);
                        }}
                        dogePrice={dogePrice}
                        weeklyplayerData={weeklyplayerData}
                        dailyplayerData={dailyplayerData}
                        userRank2={userRank2}
                        genesisRank2={genesisRank2}
                        dailyPopup={dailyBonusPopup}
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        coinbase={account}
                        isVerified={data?.getPlayer?.wallet}
                        favoritesArray={favorites}
                        dypBalance={dypBalance}
                        dypBalancebnb={dypBalancebnb}
                        dypBalanceavax={dypBalanceavax}
                        idypBalance={idypBalance}
                        idypBalancebnb={idypBalancebnb}
                        idypBalanceavax={idypBalanceavax}
                        showNfts={showNfts}
                        claimedChests={claimedChests}
                        claimedPremiumChests={claimedPremiumChests}
                        claimedSkaleChests={claimedSkaleChests}
                        claimedSkalePremiumChests={claimedSkalePremiumChests}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        email={email}
                        userId={data?.getPlayer?.playerId}
                        username={data?.getPlayer?.displayName}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        latestBoughtNFTS={latest20BoughtNFTS}
                        myOffers={myOffers}
                        allActiveOffers={allActiveOffers}
                        isPremium={isPremium}
                        onRewardsClick={() => {
                          setmyRewardsPopup(true);
                        }}
                        rewardsPopup={myRewardsPopup}
                        onBalanceClick={() => {
                          setBalancePopup(true);
                        }}
                        availableTime={goldenPassRemainingTime}
                        canBuy={canBuy}
                        openedChests={openedChests}
                        openedSkaleChests={openedSkaleChests}
                        onDailyBonusInfoClick={() => {
                          setdailyBonusInfo(true);
                        }}
                        userSocialRewards={userSocialRewards}
                        userEarnUsd={userEarnUsd}
                        userEarnETH={userEarnETH}
                        userPoints={userPoints}
                        cmcuserPoints={cmcuserPoints}
                        cmcuserEarnETH={cmcuserEarnETH}
                        cmcuserEarnUsd={cmcuserEarnUsd}
                        confluxUserPoints={confluxUserPoints}
                        confluxEarnUSD={confluxEarnUSD}
                        confluxEarnCFX={confluxEarnCFX}
                        gateEarnUSD={gateEarnUSD}
                        gateUserPoints={gateUserPoints}
                        gateEarnBnb={gateEarnBnb}
                        dogeEarnUSD={dogeEarnUSD}
                        dogeEarnBNB={dogeEarnBNB}
                        dogeUserPoints={dogeUserPoints}
                        baseEarnUSD={baseEarnUSD}
                        baseUserPoints={baseUserPoints}
                        baseEarnETH={baseEarnETH}
                        dypiusEarnUsd={dypiusEarnUsd}
                        dypiusEarnTokens={dypiusEarnTokens}
                        dypiusPremiumEarnUsd={dypiusPremiumEarnUsd}
                        dypiusPremiumEarnTokens={dypiusPremiumEarnTokens}
                        dypiusPremiumPoints={dypiusPremiumPoints}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                      />
                    </div>
                    <WalletBalance
                      ethTokenData={ethTokenData}
                      dypTokenData={dypTokenData}
                      onOpenNfts={onOpenNfts}
                      listedNFTS={listedNFTS}
                      myBoughtNfts={myBoughtNfts}
                      address={data?.getPlayer?.wallet?.publicAddress}
                      coinbase={account}
                      isVerified={data?.getPlayer?.wallet}
                      favoritesArray={favorites}
                      dypBalance={dypBalance}
                      dypBalancebnb={dypBalancebnb}
                      dypBalanceavax={dypBalanceavax}
                      idypBalance={idypBalance}
                      idypBalancebnb={idypBalancebnb}
                      idypBalanceavax={idypBalanceavax}
                      showNfts={showNfts}
                      handleShowWalletPopup={() => {
                        setshowWalletModal(true);
                      }}
                      email={email}
                      userId={data?.getPlayer?.playerId}
                      username={data?.getPlayer?.displayName}
                      myCawsCollected={MyNFTSCaws}
                      myCawsOldCollected={MyNFTSCawsOld}
                      myLandCollected={MyNFTSLand}
                      myTimepieceCollected={MyNFTSTimepiece}
                      landStaked={landstakes}
                      myCawsWodStakes={myCawsWodStakesAll}
                      myWodWodStakes={myWodWodStakesAll}
                      myNFTSCoingecko={MyNFTSCoingecko}
                      myGateNfts={myGateNfts}
                      myConfluxNfts={myConfluxNfts}
                      myBaseNfts={myBaseNfts}
                      myDogeNfts={myDogeNfts}
                      myCmcNfts={myCmcNfts}
                      mySkaleNfts={mySkaleNfts}
                      latestBoughtNFTS={latest20BoughtNFTS}
                      myOffers={myOffers}
                      allActiveOffers={allActiveOffers}
                      latestVersion={latestVersion}
                      MyNFTSLandBNB={MyNFTSLandBNB}
                      MyNFTSCawsBNB={MyNFTSCawsBNB}
                      MyNFTSLandAvax={MyNFTSLandAvax}
                      MyNFTSCawsAvax={MyNFTSCawsAvax}
                      MyNFTSLandBase={MyNFTSLandBase}
                      MyNFTSCawsBase={MyNFTSCawsBase}
                    />
                    {/* <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex flex-column gap-2 w-100 mb-4">
                  <h2
                    className={`font-organetto d-flex flex-column flex-xl-row gap-1 align-items-center m-0 bundleTitle`}
                  >
                    Premium
                    <mark className={`font-organetto bundletag`}>events</mark>
                  </h2>
              
                </div>
                <div className="d-flex align-items-start align-items-lg-center gap-2 gap-lg-2 w-100 justify-content-start">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dyp-package ${
                        selectedPackage === "dyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dyp")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Golden Pass
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package ${classes.idypicon} ${
                        selectedPackage === "idyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("idyp")}
                    ></div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Puzzle Madness
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dragon-package ${
                        selectedPackage === "dragon" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dragon")}
                    >
                      <img
                        src={dragonIcon}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Dragon Ruins
                    </h6>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package criticalhit-package ${
                        selectedPackage === "criticalHit" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("criticalHit")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Critical Hit
                    </h6>
                  </div>
                </div>
                <BundleCard
                  coinbase={account}
                  wallet={data?.getPlayer?.wallet?.publicAddress}
                  chainId={chainId}
                  username={data?.getPlayer?.displayName}
                  email={email}
                  getDypBalance={getDypBalance}
                  getiDypBalance={getDypBalance}
                  packageData={
                    selectedPackage === "dragon"
                      ? dragonData
                      : selectedPackage === "dyp"
                      ? dypPackageData
                      : selectedPackage === "criticalHit"
                      ? criticalHitPackageData
                      : iDypPackageData
                  }
                  handleSetAvailableTime={(value) => {
                    setAvailableTime(value);
                  }}
                  availableTime={availableTime}
                />
              </div> */}

                    {leaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper leaderboard-popup popup-active p-3"
                          id="leaderboard"
                          style={{ width: "70%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                WOD
                              </mark>{" "}
                              Leaderboard
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <NewLeaderBoard
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            availableTime={goldenPassRemainingTime}
                            email={email}
                            isPremium={isPremium}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {myRewardsPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => setmyRewardsPopup(false)}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="leaderboard"
                          style={{
                            width: "fit-content",
                            pointerEvents: "auto",
                            overflowX: "auto",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Rewards
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setmyRewardsPopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyRewardsPopupNew
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            weeklyplayerData={weeklyplayerData}
                            dailyplayerData={dailyplayerData}
                            userRank2={userRank2}
                            email={email}
                            bnbPrice={bnbPrice}
                            cfxPrice={cfxPrice}
                            ethTokenData={ethTokenData}
                            openedChests={openedChests}
                            openedSkaleChests={openedSkaleChests}
                            allChests={allChests}
                            allSkaleChests={allSkaleChests}
                            availableTime={goldenPassRemainingTime}
                            userSocialRewards={userSocialRewards}
                            dogePrice={dogePrice}
                            userEarnUsd={userEarnUsd}
                            userEarnETH={userEarnETH}
                            cmcuserEarnETH={cmcuserEarnETH}
                            cmcuserEarnUsd={cmcuserEarnUsd}
                            dogeEarnUSD={dogeEarnUSD}
                            dogeEarnBNB={dogeEarnBNB}
                            baseEarnUSD={baseEarnUSD}
                            baseEarnETH={baseEarnETH}
                            dypiusEarnUsd={dypiusEarnUsd}
                            dypiusPremiumEarnUsd={dypiusPremiumEarnUsd}
                            dypiusPremiumEarnTokens={dypiusPremiumEarnTokens}
                            kittyDashRecords={kittyDashRecords}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {dailyBonusInfo && (
                      <OutsideClickHandler
                        onOutsideClick={() => setdailyBonusInfo(false)}
                      >
                        <DailyBonusModal
                          data={dailyBonusData}
                          onClose={() => setdailyBonusInfo(false)}
                        />
                      </OutsideClickHandler>
                    )}

                    {getPremiumPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setgetPremiumPopup(false);
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="subscribe-container p-2 position-relative">
                            <div
                              className=""
                              style={{ background: "#8E97CD" }}
                            ></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="free-plan-title">
                                Premium Subscription
                              </h6>
                              <img
                                src={xMark}
                                onClick={() => setgetPremiumPopup(false)}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            <div className="premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                              <div className="d-flex flex-column gap-2">
                                <span className="lifetime-plan mb-0">
                                  Lifetime plan
                                </span>
                                <h6 className="plan-cost mb-0">$100</h6>
                              </div>
                              <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
                                <div className="premium-chains-wrapper">
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={
                                        require(`../../Images/premium/tokens/ethIcon.svg`)
                                          .default
                                      }
                                      alt=""
                                    />
                                    <span className="subscription-chain mb-0">
                                      Ethereum
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={
                                        require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                          .default
                                      }
                                      alt=""
                                    />
                                    <span className="subscription-chain mb-0">
                                      BNB Chain
                                    </span>
                                  </div>

                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={
                                        require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                          .default
                                      }
                                      alt=""
                                    />
                                    <span className="subscription-chain mb-0">
                                      Avalanche
                                    </span>
                                  </div>

                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={baseLogo}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      Base
                                    </span>
                                  </div>

                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={conflux}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      Conflux
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={skaleIcon}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      SKALE
                                    </span>
                                  </div>
                                </div>
                                <img src={premiumIcon} alt="" />
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="popup-subtitle mb-0">Benefits</h6>
                            </div>
                            <div className="premium-benefits-wrapper d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={metaverseIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Metaverse
                                  </h6>
                                </div>
                                {metaverseBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={dappsIcon} alt="" />
                                  <h6 className="premium-benefits-title mb-0">
                                    Dapps
                                  </h6>
                                </div>
                                {dappsBenefits.map((item, index) => (
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={greenCheck} alt="" />
                                    <span className="premium-benefits-item mb-0">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>{" "}
                            <hr className="form-divider my-4" />
                            <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                              <div className="d-flex flex-column gap-3 subscribe-input-container">
                                <span className="token-amount-placeholder">
                                  Select chain
                                </span>
                                <div class="dropdown position relative">
                                  <button
                                    class={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle`}
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ color: "#fff" }}
                                    >
                                      <img
                                        src={require(`../../Images/premium/tokens/${chainDropdown.symbol}Icon.svg`)}
                                        alt=""
                                      />
                                      {chainDropdown.name}
                                    </div>
                                    <img src={launchpadIndicator} alt="" />
                                  </button>
                                  <ul class="dropdown-menu w-100">
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleEthPool}
                                    >
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/ethIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      Ethereum
                                    </li>
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleBnbPool}
                                    >
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wbnbIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      BNB Chain
                                    </li>
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleAvaxPool}
                                    >
                                      <img
                                        src={
                                          require(`../../Images/premium/tokens/wavaxIcon.svg`)
                                            .default
                                        }
                                        alt=""
                                      />
                                      Avalanche
                                    </li>
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleBasePool}
                                    >
                                      <img
                                        src={baseLogo}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      Base Network
                                    </li>
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleConfluxPool}
                                    >
                                      <img
                                        src={conflux}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      Conflux Network
                                    </li>
                                    <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleSkalePool}
                                    >
                                      <img
                                        src={skaleIcon}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      SKALE
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex flex-column gap-3 subscribe-input-container"></div>
                              <div className="d-flex flex-column align-items-end gap-3">
                                <span className="my-premium-balance-text mb-0">
                                  My balance:{" "}
                                  {getFormattedNumber(
                                    tokenBalance / 10 ** tokenDecimals,
                                    3
                                  )}{" "}
                                  {dropdownIcon.toUpperCase()}
                                </span>
                                <div
                                  className="premium-benefits-wrapper p-2 d-flex align-items-center gap-4"
                                  style={{ height: "34px" }}
                                >
                                  <span className="subscription-price-text mb-0">
                                    Subscription Price:
                                  </span>

                                  <div className="d-flex align-items-center gap-2">
                                    <div class="dropdown position relative">
                                      <button
                                        class={`btn launchpad-dropdown d-flex gap-1 justify-content-between align-items-center dropdown-toggle2 w-100`}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <div
                                          className="d-flex align-items-center gap-2"
                                          style={{ color: "#fff" }}
                                        >
                                          <img
                                            src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                            alt=""
                                            style={{ width: 20, height: 20 }}
                                          />
                                          {/* {dropdownTitle} */}
                                        </div>
                                        <img src={launchpadIndicator} alt="" />
                                      </button>
                                      <ul class="dropdown-menu w-100">
                                        {Object.keys(
                                          chainId === 1
                                            ? window.config
                                                .subscriptioneth_tokens
                                            : chainId === 56
                                            ? window.config
                                                .subscriptionbnb_tokens
                                            : chainId === 1030
                                            ? window.config
                                                .subscriptioncfx_tokens
                                            : chainId === 43114
                                            ? window.config.subscription_tokens
                                            : chainId === 8453
                                            ? window.config
                                                .subscriptionbase_tokens
                                            : chainId === 1482601649
                                            ? window.config
                                                .subscriptionskale_tokens
                                            : window.config.subscription_tokens
                                        ).map((t, i) => (
                                          <li
                                            key={i}
                                            className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                            onClick={() => {
                                              window.cached_contracts =
                                                Object.create(null);
                                              setTimeout(() => {
                                                setdropdownIcon(
                                                  chainId === 1
                                                    ? window.config
                                                        .subscriptioneth_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 56
                                                    ? window.config
                                                        .subscriptionbnb_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 43114
                                                    ? window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol
                                                    : chainId === 8453
                                                    ? window.config
                                                        .subscriptionbase_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1030
                                                    ? window.config
                                                        .subscriptioncfx_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1482601649
                                                    ? window.config
                                                        .subscriptionskale_tokens[
                                                        t
                                                      ]?.symbol
                                                    : window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol
                                                );
                                                setdropdownTitle(
                                                  chainId === 1
                                                    ? window.config
                                                        .subscriptioneth_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 56
                                                    ? window.config
                                                        .subscriptionbnb_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 43114
                                                    ? window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol
                                                    : chainId === 8453
                                                    ? window.config
                                                        .subscriptionbase_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1030
                                                    ? window.config
                                                        .subscriptioncfx_tokens[
                                                        t
                                                      ]?.symbol
                                                    : chainId === 1482601649
                                                    ? window.config
                                                        .subscriptionskale_tokens[
                                                        t
                                                      ]?.symbol
                                                    : window.config
                                                        .subscription_tokens[t]
                                                        ?.symbol
                                                );

                                                // console.log(t);
                                                handleSubscriptionTokenChange(
                                                  t
                                                );
                                                handleCheckIfAlreadyApproved(t);
                                              }, 200);
                                            }}
                                          >
                                            <img
                                              src={
                                                chainId === 1
                                                  ? require(`../../Images/premium/tokens/${window.config.subscriptioneth_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : chainId === 56
                                                  ? require(`../../Images/premium/tokens/${window.config.subscriptionbnb_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : chainId === 43114
                                                  ? require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : chainId === 1030
                                                  ? require(`../../Images/premium/tokens/${window.config.subscriptioncfx_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : chainId === 8453
                                                  ? require(`../../Images/premium/tokens/${window.config.subscriptionbase_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : chainId === 1482601649
                                                  ? require(`../../Images/premium/tokens/${window.config.subscriptionskale_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                                  : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                      t
                                                    ]?.symbol.toLowerCase()}Icon.svg`)
                                              }
                                              alt=""
                                              style={{ width: 20, height: 20 }}
                                            />
                                            {chainId === 1
                                              ? window.config
                                                  .subscriptioneth_tokens[t]
                                                  ?.symbol
                                              : chainId === 56
                                              ? window.config
                                                  .subscriptionbnb_tokens[t]
                                                  ?.symbol
                                              : chainId === 43114
                                              ? window.config
                                                  .subscription_tokens[t]
                                                  ?.symbol
                                              : chainId === 1030
                                              ? window.config
                                                  .subscriptioncfx_tokens[t]
                                                  ?.symbol
                                              : chainId === 8453
                                              ? window.config
                                                  .subscriptionbase_tokens[t]
                                                  ?.symbol
                                              : chainId === 1482601649
                                              ? window.config
                                                  .subscriptionskale_tokens[t]
                                                  ?.symbol
                                              : window.config
                                                  .subscription_tokens[t]
                                                  ?.symbol}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    {/* <img
                                      src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                      height={16}
                                      width={16}
                                      alt="usdt"
                                    /> */}
                                    <span className="subscription-price-token mb-0">
                                      {formattedPrice.slice(0, 5)}
                                    </span>
                                  </div>
                                  <span className="subscription-price-usd mb-0">
                                    $100
                                  </span>
                                </div>
                              </div>

                              {/* <div className="d-flex flex-column align-items-end justify-content-lg-end">
                                <span className="token-balance-placeholder">
                                  Token Balance
                                </span>
                                <h6 className="account-token-amount">
                                  {" "}
                                  {getFormattedNumber(
                                    tokenBalance / 10 ** tokenDecimals,
                                    6
                                  )}
                                </h6>
                              </div> */}
                            </div>
                            {/* <div
                              className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between  mt-3"
                              style={{ width: "100%" }}
                            >
                              <span className="token-amount-placeholder">
                                Subscription price:
                              </span>
                              <div className="d-flex align-items-center gap-2">
                                <span className="usdt-text">
                                  {formattedPrice.slice(0, 9)}
                                </span>

                                <img
                                  src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                  height={24}
                                  width={24}
                                  alt="usdt"
                                />
                              </div>
                            </div> */}
                            {chainId === 1482601649 && (
                              <div className="gotoNebula-wrapper p-3 mb-3">
                                <div className="d-flex w-100 justify-content-between gap-2">
                                  <span className="nebula-wrapper-text">
                                    Bridge your USDC to Nebula now!
                                  </span>
                                  <a
                                    className="nebula-bridgebtn"
                                    href="https://portal.skale.space/bridge?from=mainnet&to=green-giddy-denebola&token=usdc&type=erc20"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Nebula Bridge
                                  </a>
                                </div>
                              </div>
                            )}
                            <div className="d-flex align-items-center gap-3 justify-content-center">
                              <div
                                className={` ${
                                  approveStatus === "fail" ||
                                  !coinbase ||
                                  isApproved
                                    ? "linear-border-disabled"
                                    : "linear-border"
                                }`}
                              >
                                <button
                                  className={`btn ${
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? "outline-btn-disabled"
                                      : "filled-btn"
                                  } px-4`}
                                  disabled={
                                    approveStatus === "fail" ||
                                    !coinbase ||
                                    isApproved
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => handleApprove(e)}
                                >
                                  {loadspinner === false &&
                                  (approveStatus === "initial" ||
                                    approveStatus === "deposit" ||
                                    approveStatus === "failsubscribe" ||
                                    approveStatus === "successsubscribe") ? (
                                    "Approve"
                                  ) : loadspinner === false &&
                                    approveStatus === "fail" ? (
                                    "Failed"
                                  ) : (
                                    <div
                                      className="spinner-border "
                                      role="status"
                                      style={{
                                        height: "1rem",
                                        width: "1rem",
                                      }}
                                    ></div>
                                  )}
                                </button>
                              </div>
                              <div
                                className={` ${
                                  isApproved === false
                                    ? "linear-border-disabled"
                                    : "linear-border"
                                }`}
                              >
                                <button
                                  className={`btn ${
                                    isApproved === false
                                      ? "outline-btn-disabled"
                                      : "filled-btn"
                                  } px-4`}
                                  onClick={() => handleSubscribe()}
                                >
                                  {loadspinnerSub === false &&
                                  (approveStatus === "initial" ||
                                    approveStatus === "fail" ||
                                    approveStatus === "deposit") ? (
                                    "Buy"
                                  ) : loadspinnerSub === false &&
                                    approveStatus === "successsubscribe" ? (
                                    "Success"
                                  ) : loadspinnerSub === false &&
                                    approveStatus === "failsubscribe" ? (
                                    "Failed"
                                  ) : (
                                    <div
                                      className="spinner-border "
                                      role="status"
                                      style={{
                                        height: "1rem",
                                        width: "1rem",
                                      }}
                                    ></div>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div
                              className={`d-flex align-items-center ${
                                !coinbase
                                  ? "justify-content-between"
                                  : "justify-content-end"
                              }`}
                            >
                              {!coinbase && (
                                <span style={{ color: "rgb(227, 6 ,19)" }}>
                                  Please connect your wallet first
                                </span>
                              )}
                              {/* <div className="d-flex flex-column gap-2 justify-content-end align-items-center">
                                <button
                                  className={
                                    "btn success-btn px-4 align-self-end"
                                  }
                                  disabled={
                                    approveStatus === "fail" || !coinbase
                                      ? true
                                      : false
                                  }
                                  style={{
                                    background:
                                      approveStatus === "fail"
                                        ? "linear-gradient(90.74deg, #f8845b 0%, #f0603a 100%)"
                                        : "linear-gradient(90.74deg, #75CAC2 0%, #57B6AB 100%)",
                                  }}
                                  onClick={(e) =>
                                    isApproved === false
                                      ? handleApprove(e)
                                      : handleSubscribe()
                                  }
                                >
                                  {isApproved === true &&
                                  loadspinner === false &&
                                  loadspinnerSub === false &&
                                  (approveStatus === "deposit" ||
                                    approveStatus === "initial") ? (
                                    "Subscribe"
                                  ) : isApproved === false &&
                                    loadspinner === false &&
                                    approveStatus === "initial" &&
                                    loadspinnerSub === false ? (
                                    "Approve"
                                  ) : loadspinner === false &&
                                    approveStatus === "fail" &&
                                    loadspinnerSub === false ? (
                                    "Failed"
                                  ) : (
                                    <div
                                      className="spinner-border "
                                      role="status"
                                      style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                      }}
                                    ></div>
                                  )}
                                </button>
                                <span style={{ color: "#E30613" }}>
                                  {status}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </OutsideClickHandler>
                    )}

                    {balancePopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setBalancePopup(false);
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Balance
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setBalancePopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyBalance
                            dypBalance={dypBalance}
                            dypBalancebnb={dypBalancebnb}
                            dypBalanceavax={dypBalanceavax}
                            idypBalance={idypBalance}
                            idypBalancebnb={idypBalancebnb}
                            idypBalanceavax={idypBalanceavax}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* {dailyBonusPopup && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setdailyBonusPopup(false);
                }}
              >
                <div
                  className="package-popup-wrapper2"
                  id="dailyrewardpopup"
                  style={{ pointerEvents: "auto" }}
                >
                  <img
                    src={rewardPopup}
                    alt=""
                    className="popup-linear2"
                    loading="eager"
                  />

                  <DailyBonusPopup
                    onclose={() => {
                      setdailyBonusPopup(false);
                    }}
                    isPremium={isPremium}
                    address={data?.getPlayer?.wallet?.publicAddress}
                    claimedChests={claimedChests}
                    claimedPremiumChests={claimedPremiumChests}
                    onChestClaimed={() => {
                      setCount(count + 1);
                    }}
                    standardChests={standardChests}
                    premiumChests={premiumChests}
                    email={email}
                    openedChests={openedChests}
                    chainId={chainId}
                    coinbase={coinbase}
                    handleSwitchNetwork={handleSwitchNetwork}
                    myNFTSCaws={MyNFTSCaws.length}
                    myNFTSLand={MyNFTSLand.length}
                    myNFTSTimepiece={MyNFTSTimepiece.length}
                    allChests={allChests}
                    canBuy={canBuy}
                    dummypremiumChests={dummypremiumChests}
                  />
                </div>
              </OutsideClickHandler>
            )} */}
            {dailyBonusPopup && (
              // <OutsideClickHandler
              //   onOutsideClick={() => {
              //     setdailyBonusPopup(false);
              //   }}
              // >
              <NewDailyBonus
                isPremium={isPremium}
                chainId={chainId}
                dypTokenData={dypTokenData}
                ethTokenData={ethTokenData}
                dyptokenData_old={dyptokenData_old}
                handleSwitchChain={handleSwitchChain}
                handleSwitchNetwork={handleSwitchNetwork}
                listedNFTS={listedNFTS}
                onclose={() => {
                  setdailyBonusPopup(false);
                }}
                coinbase={coinbase}
                standardChests={standardChests}
                premiumChests={premiumChests}
                standardSkaleChests={standardSkaleChests}
                premiumSkaleChests={premiumSkaleChests}
                claimedChests={claimedChests}
                claimedPremiumChests={claimedPremiumChests}
                claimedSkaleChests={claimedSkaleChests}
                claimedSkalePremiumChests={claimedSkalePremiumChests}
                email={email}
                openedChests={openedChests}
                openedSkaleChests={openedSkaleChests}
                canBuy={canBuy}
                address={data?.getPlayer?.wallet?.publicAddress}
                allChests={allChests}
                allSkaleChests={allSkaleChests}
                onChestClaimed={() => {
                  setCount(count + 1);
                }}
                onSkaleChestClaimed={() => {
                  setskalecount(skalecount + 1);
                }}
                dummypremiumChests={dummypremiumChests}
                onPremiumClick={() => {
                  setgetPremiumPopup(true);
                }}
                premiumTxHash={premiumTxHash}
                selectedChainforPremium={selectedChainforPremium}
                onPremiumClickOther={() => {
                  setdailyBonusPopup(false);
                  setgetPremiumPopup(true);
                }}
              />
              // </OutsideClickHandler>
            )}
            {showChecklistModal === true && (
              <ChecklistModal
                show={showChecklistModal}
                handleClose={() => {
                  setshowChecklistModal(false);
                }}
                cawsitem={tokensState?.items?.length > 0 && tokensState.items}
                stakes={stakes}
              />
            )}

            {showWalletModal === true && success === false && (
              <WalletModal
                show={showWalletModal}
                handleClose={() => {
                  setshowWalletModal(false);
                }}
                handleConnection={handleConnect}
              />
            )}

            {showSyncModal === true && (
              <SyncModal
                onCancel={() => {
                  setshowSyncModal(false);
                }}
                onclose={() => {
                  setshowSyncModal(false);
                }}
                open={showSyncModal}
                onConfirm={handleSync}
                syncStatus={syncStatus}
              />
            )}

            {showChecklistLandNftModal === true && (
              <ChecklistLandNftModal
                show={showChecklistLandNftModal}
                handleClose={() => {
                  setshowChecklistLandNftModal(false);
                }}
                cawsitem={
                  tokensState?.landItems?.length > 0 && tokensState.landItems
                }
                stakes={landstakes}
              />
            )}
            {/* <ErrorAlert error={connectedState?.error} /> */}
          </LoginWrapper>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
