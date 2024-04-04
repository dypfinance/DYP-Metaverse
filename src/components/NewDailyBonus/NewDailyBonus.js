import React, { useEffect, useRef, useState } from "react";
import "./_newdailybonus.scss";
import bnbChain from "./assets/bnbChain.png";
import skaleChain from "./assets/skaleChain.png";
import comingSoon from "./assets/comingSoon.png";
import percentageFilled from "./assets/percentageFilled.svg";
import percentageEmpty from "./assets/percentageEmpty.svg";
import dypiusIcon from "./assets/dypiusIcon.svg";
import wodIcon from "./assets/wodIcon.png";
import premiumIcon from "./assets/premiumIcon.png";
import cawsRound from "./assets/cawsRound.png";
import wodRound from "./assets/wodRound.png";
import premiumRound from "./assets/premiumRound.png";
import dypRound from "./assets/dypRound.png";

import completedBg from "./assets/completedBg.png";
import winConfetti from "./assets/winConfetti.png";
import xMark from "./assets/xMark2.svg";
import emptyXmark from "./assets/emptyXmark.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import greenCheck from "./assets/greenCheck.svg";
import infoIcon from "./assets/infoIcon.svg";
import skaleIcon from "./assets/skaleIcon.svg";
import danger from "./assets/danger.svg";
import warning from "./assets/warning.svg";
import redX from "./assets/redX.svg";
import NewChestItem from "./NewChestItem";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import Slider from "react-slick";
import successSound from "./assets/success.mp3";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";
import BuyNftPopup from "./BuyNftPopup";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "150px !important",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));
const GeneralTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "350px !important",
    minWidth: "350px !important",
    border: "1px solid #7EABE9",
    borderRadius: "20px",
    padding: "10px",
    fontSize: theme.typography.pxToRem(12),
    display: "flex",
    justifyContent: "center",
  },
}));

const NewDailyBonus = ({
  onclose,
  isPremium,
  chainId,
  handleSwitchNetwork,
  standardChests,
  standardSkaleChests,
  claimedPremiumChests,
  claimedSkaleChests,
  claimedSkalePremiumChests,
  premiumChests,
  premiumSkaleChests,
  claimedChests,
  email,
  openedChests,
  canBuy,
  address,
  allChests,
  allSkaleChests,
  onChestClaimed,
  onSkaleChestClaimed,
  listedNFTS,
  dypTokenData,
  dyptokenData_old,
  ethTokenData,
  handleSwitchChain,
  openedSkaleChests,
  coinbase,
  dummypremiumChests,
  onPremiumClick,
  onPremiumClickOther,
  premiumTxHash,
  selectedChainforPremium,
}) => {
  const numberArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    opened: false,
    premium: index + 1 > 10 && !isPremium ? true : false,
  }));
  const cawsArray = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
  }));

  const rewardsRef = useRef();

  const html = document.querySelector("html");

  const bnbClaimed = claimedChests + claimedPremiumChests;
  const bnbPercentage = (bnbClaimed / 20) * 100;

  const skaleClaimed = claimedSkaleChests + claimedSkalePremiumChests;
  const skalePercentage = (skaleClaimed / 20) * 100;

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
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
          slidesToShow: 1.3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  var settings2 = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    swipe: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // beforeChange: (current, next) => {
    //   setActiveSlide(next);
    //   setShowFirstNext(current);
    // },
    // afterChange: (current) => setActiveSlide(current),
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

  const windowSize = useWindowSize();

  const winDangerItems = [
    {
      image: wodRound,
      holder: false,
      message: "Hold >1 CAWS NFT",
      required: true,
    },
    {
      image: wodRound,
      holder: true,
      message: "Hold Genesis NFT",
      required: true,
    },
    {
      image: premiumRound,
      holder: false,
      message: "Premium Subscriber",
      required: true,
    },
    {
      image: dypiusIcon,
      holder: true,
      message: "Hold >$1,000 in DYP v2",
      required: false,
    },
  ];

  const messages = [
    "caws",
    "premium",
    "wod",
    "switch",
    "login",
    "won",
    "winDanger",
    "complete",
    "needPremium",
    "error",
  ];

  const dummyRewards = [
    {
      title: "Points",
      amount: "Points",
      img: "points",
      error: true,
      threshold: [1, 200000],
    },
    {
      title: "Money",
      amount: "$0.5 - $5",
      img: 2,
      error: false,
      threshold: [],
      min: 0.5,
      max: 5,
    },
    {
      title: "Money",
      amount: "$15-$20",
      img: 5,
      error: true,
      threshold: [],
      min: 15,
      max: 20,
    },
    {
      title: "Money",
      amount: "$20-$30",
      img: 30,
      error: false,
      threshold: [],
      min: 20,
      max: 30,
    },
    {
      title: "Money",
      title2: "needPremium",
      amount: "$20-$30",
      img: 50,
      error: true,
      threshold: [],
      min: 20,
      max: 30,
    },
    {
      title: "Money",
      amount: "$30-$300",
      img: 300,
      error: false,
      threshold: [],
      min: 50,
      max: 300,
    },
    {
      title: "Money",
      amount: "$350-$700",
      img: 700,
      error: true,
      threshold: [],
      min: 350,
      max: 700,
    },
    {
      title: "Money",
      amount: "$1,000-$1,500",
      img: 1500,
      error: false,
      threshold: [],
      min: 1000,
      max: 1500,
    },
    {
      title: "Money",
      amount: "$2,000-$3,000",
      img: 3000,
      error: true,
      threshold: [],
      min: 2000,
      max: 3000,
    },
    {
      title: "Money",
      amount: "$4,000-$5,000",
      img: 5000,
      error: false,
      threshold: [],
      min: 4000,
      max: 5000,
    },
  ];

  const [chain, setChain] = useState("bnb");
  const [message, setMessage] = useState("");
  const [selectedChest, setSelectedChest] = useState(null);
  const [disable, setDisable] = useState(false);
  const [buyNftPopup, setBuyNftPopup] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [liverewardData, setLiveRewardData] = useState([]);
  const [cawsNfts, setCawsNfts] = useState([]);
  const [landNfts, setLandNfts] = useState([]);
  const [isActive, setIsActive] = useState();
  const [isActiveIndex, setIsActiveIndex] = useState();
  const [totalPoints, settotalPoints] = useState(0);
  const [totalUsd, settotalUsd] = useState(0);
  const [nft, setNft] = useState({});
  const [totalSkalePoints, settotalSkalePoints] = useState(0);
  const [totalSkaleUsd, settotalSkaleUsd] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  const countEarnedRewards = () => {
    if (allChests && allChests.length > 0) {
      let resultPoints = 0;
      let resultUsd = 0;

      allChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultPoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultPoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalPoints(resultPoints);
      settotalUsd(resultUsd);
    }

    if (allSkaleChests && allSkaleChests.length > 0) {
      let resultSkalePoints = 0;
      let resultSkaleUsd = 0;

      allSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSkalePoints += Number(innerChest.reward);
              }
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                resultSkaleUsd += Number(innerChest.reward);
              }
            });
          } else if (chest.rewards.length === 1) {
            chest.rewards.forEach((innerChest) => {
              if (innerChest.rewardType === "Points") {
                resultSkalePoints += Number(innerChest.reward);
              }
            });
          }
        }
      });

      settotalSkalePoints(resultSkalePoints);
      settotalSkaleUsd(resultSkaleUsd);
    }
  };

  const handleOpBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xcc")
          .then(() => {
            handleSwitchNetwork(204);
            // setMessage("");
            setRewardData([]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleClaimUsdPremium = async () => {
    const data = {
      transactionHash: premiumTxHash,
      emailAddress: email,
      chestIndex: isActiveIndex - 1,
      chainId: chain,
      chain: selectedChainforPremium,
    };

    const result = await axios
      .post(
        `https://dyp-chest-test.azurewebsites.net/api/ClaimPremiumReward?code=WKXKNHNplrNAzvfYrr-iAduP2Wl3eGpqwER2XqHWaqU5AzFupAtXPw%3D%3D%27`,
        data
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      onChestClaimed();
      onSkaleChestClaimed();
      if (chain === "bnb") {
        showSingleRewardData(rewardData.chestId, isActiveIndex - 1);
      } else if (chain === "skale") {
        showSingleRewardDataSkale(rewardData.chestId, isActiveIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (premiumTxHash !== "" && selectedChainforPremium !== "") {
      handleClaimUsdPremium();
    }
  }, [premiumTxHash, selectedChainforPremium]);

  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
            setRewardData([]);
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
            setRewardData([]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const filterCawsNfts = () => {
    const filteredCaws = listedNFTS.filter((item) => {
      return (
        item.type === "caws" &&
        item.seller.toLowerCase() ===
          window.config.nftSeller_address.toLowerCase()
      );
    });
    setCawsNfts(filteredCaws);
  };

  const filterLandNfts = () => {
    const filteredLands = listedNFTS.filter((item) => {
      return (
        item.type === "land" &&
        item.seller.toLowerCase() ===
          window.config.nftSeller_address.toLowerCase()
      );
    });
    setLandNfts(filteredLands);
  };

  const boughtCaws = (chestId, chestIndex, val1, val2) => {
    const filteredResult = openedChests.find(
      (el) => el.chestId === chestId && allChests.indexOf(el) === chestIndex
    );
    setIsActive(chestId);
    setIsActiveIndex(chestIndex);

    const finalResult = {
      ...filteredResult,
      rewards: [
        { rewardType: "Money", reward: val1 },
        { rewardType: "Points", reward: val2 },
      ],
    };

    setLiveRewardData(finalResult);
    setRewardData(finalResult);
    setMessage("won");
  };

  const showSingleRewardData = (chestID, chestIndex) => {
    const filteredResult = openedChests.find(
      (el) => el.chestId === chestID && allChests.indexOf(el) === chestIndex
    );

    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFT."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      const resultPoints = filteredResult.rewards.length === 1;

      console.log(result);
      console.log(filteredResult);
      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }
      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showLiveRewardData = (value) => {
    const filteredResult = value;

    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });
      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });
      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFT."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      console.log(result);
      console.log(filteredResult);
      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
    new Audio(successSound).play();
  };

  const showSingleRewardDataSkale = (chestID, chestIndex) => {
    const filteredResult = openedSkaleChests.find(
      (el) =>
        el.chestId === chestID && allSkaleChests.indexOf(el) === chestIndex
    );
    setIsActive(chestID);
    setIsActiveIndex(chestIndex + 1);
    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });

      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFT."
        );
      });

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
  };

  const showLiveRewardDataSkale = (value) => {
    const filteredResult = value;

    if (filteredResult) {
      const result = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "CAWS"
        );
      });

      const resultLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "LAND"
        );
      });

      const resultPremium = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimed" &&
          obj.claimType === "PREMIUM"
        );
      });

      const resultWon = filteredResult.rewards.find((obj) => {
        return obj.rewardType === "Money" && obj.status === "Claimed";
      });
      const resultPoints = filteredResult.rewards.length === 1;

      const resultWonMoneyNoCaws = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any CAWS NFTs."
        );
      });

      const resultWonMoneyNotEnoughLands = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward since you do not hold two Genesis Lands."
          );
        }
      );

      const resultWonMoneyNoLand = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward since you do not hold any Genesis Land NFT."
        );
      });

      const resultWonMoneyhasNftsNoPremium = filteredResult.rewards.find(
        (obj) => {
          return (
            obj.rewardType === "Money" &&
            obj.status === "Unclaimable" &&
            obj.details ===
              "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs and have a Premium Subscription."
          );
        }
      );

      const resultWonMoneyhasNftsNoDyp = filteredResult.rewards.find((obj) => {
        return (
          obj.rewardType === "Money" &&
          obj.status === "Unclaimable" &&
          obj.details ===
            "Unfortunately, you are unable to claim this reward as you need to own Genesis and CAWS NFTs, have a Premium Subscription, and hold at least $1,000 worth of DYP tokens."
        );
      });

      if (result) {
        setMessage("caws");
      } else if (!result && resultLand) {
        setMessage("wod");
      } else if (!result && !resultLand && resultPremium) {
        setMessage("needPremium");
      } else if (resultWon) {
        setMessage("won");
      } else if (resultPoints) {
        setMessage("wonPoints");
      } else if (resultWonMoneyNoCaws) {
        setMessage("winDangerCaws");
      } else if (resultWonMoneyNoLand) {
        setMessage("winDangerLand");
      } else if (resultWonMoneyNotEnoughLands) {
        setMessage("winDangerNotEnoughLand");
      } else if (resultWonMoneyhasNftsNoPremium) {
        setMessage("winDangerHasNftsNoPremium");
      } else if (resultWonMoneyhasNftsNoDyp) {
        setMessage("winDangerHasNftsPremiumNoDyp");
      }

      setLiveRewardData(filteredResult);
      setRewardData(filteredResult);
    } else {
      setLiveRewardData([]);
    }
    new Audio(successSound).play();
  };

  useEffect(() => {
    countEarnedRewards();
  }, [allChests, allSkaleChests]);

  // useEffect(() => {
  //   setChain("bnb");
  // }, []);

  useEffect(() => {
    filterCawsNfts();
    filterLandNfts();
  }, [listedNFTS]);

  useEffect(() => {
    if (chain === "bnb") {
      if (email && coinbase && address) {
        if (coinbase.toLowerCase() === address.toLowerCase()) {
          if (isPremium) {
            if (
              claimedChests + claimedPremiumChests === 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase()
            ) {
              setMessage("complete");
            } else if (
              claimedChests + claimedPremiumChests < 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedChests + claimedPremiumChests < 20 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 56 &&
              chainId !== 204
            ) {
              setMessage("switch");
              setDisable(true);
            }
          } else if (!isPremium) {
            if (
              claimedChests === 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("premium");
            } else if (
              claimedChests < 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              (chainId === 56 || chainId === 204)
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedChests < 10 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 56 &&
              chainId !== 204
            ) {
              setMessage("switch");
              setDisable(true);
            }
          }
        } else {
          setMessage("switchAccount");
          setDisable(true);
        }
      } else {
        setMessage("login");
        setDisable(true);
      }
    } else if (chain === "skale") {
      if (email && coinbase && address) {
        if (coinbase.toLowerCase() === address.toLowerCase()) {
          if (isPremium) {
            if (
              claimedSkaleChests + claimedSkalePremiumChests === 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase()
            ) {
              setMessage("complete");
            } else if (
              claimedSkaleChests + claimedSkalePremiumChests < 20 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 1482601649
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedSkaleChests + claimedSkalePremiumChests < 20 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 1482601649
            ) {
              setMessage("switch");
              setDisable(true);
            }
          } else if (!isPremium) {
            if (
              claimedSkaleChests === 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 1482601649
            ) {
              setMessage("premium");
              setDisable(true);
            } else if (
              claimedSkaleChests < 10 &&
              rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId === 1482601649
            ) {
              setMessage("");
              setDisable(false);
            } else if (
              claimedSkaleChests < 10 &&
              // rewardData.length === 0 &&
              address.toLowerCase() === coinbase.toLowerCase() &&
              chainId !== 1482601649
            ) {
              setMessage("switch");
              setDisable(true);
            }
          }
        } else {
          setMessage("switchAccount");
          setDisable(true);
        }
      } else {
        setMessage("login");
        setDisable(true);
      }
    }
  }, [
    email,
    chain,
    chainId,
    coinbase,
    address,
    isPremium,
    claimedChests,
    claimedPremiumChests,
    claimedSkaleChests,
    claimedSkalePremiumChests,
    rewardData,
  ]);

  return (
    <>
      <div className={`package-popup-wrapper2 `}>
        <div
          className={`new-daily-bonus-popup  ${
            buyNftPopup ? "block-pointers" : ""
          } d-flex flex-column gap-2 custom-container-width`}
        >
          <div className="daily-bonus-outer-wrapper custom-container-width position-relative p-0 p-lg-5">
            {/* <img
            src={xMark}
            className="close-new-bonus"
            width={40}
            height={40}
            alt=""
            onClick={onclose}
            style={{ cursor: "pointer" }}
          /> */}
            <div className={"chest-test-wrapper"}>
              <div
                className="close-daily-btn d-flex align-items-center justify-content-center"
                onClick={onclose}
              >
                <img src={emptyXmark} width={20} height={20} alt="" />
              </div>
              <h6 className="rewards-upper-title mb-9 font-organetto">
                Rewards
              </h6>
              <div className="general-info-tooltip">
                <OutsideClickHandler onOutsideClick={() => setTooltip(false)}>
                  <GeneralTooltip
                    open={tooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement={"top"}
                    title={
                      <span className="db-tooltip-desc">
                        The Daily Bonus offers various benefits, ranging from
                        leaderboard points to great rewards.{" "}
                        <b>
                          There are a total of 20 chests to unlock, with 10
                          chests available to all players for free, and the
                          remaining 10 exclusive to premium subscribers.
                        </b>
                        <br />
                        <br />
                        Each reward comes with its own set of probabilities.
                        Typically, smaller rewards have a higher chance of being
                        acquired, while the more valuable rewards are less
                        likely to be obtained. This tiered system ensures that
                        players have a diverse range of potential prizes to aim
                        for.
                        <b>
                          The system is random and takes into consideration
                          player activity and other factors. The more you play
                          daily, the higher your chances of claiming more
                          valuable rewards.
                        </b>
                        <br />
                        <br />
                        <div className="d-flex align-items-center gap-2">
                          <img src={warning} alt="" width={20} height={20} />
                          <span
                            className="db-tooltip-desc"
                            style={{ color: "#F08526" }}
                          >
                            <b>Action Required Sign</b> - Action Needed
                          </span>
                        </div>
                        Some of the rewards opened in the chests might require
                        an action, such as buying a CAWS or Genesis Land NFT, or
                        purchasing a Premium Subscription, in order to claim the
                        reward. The deadline for taking the action is 00:00 UTC
                        each day.
                        <br />
                        <br />
                        <div className="d-flex align-items-center gap-2">
                          <img src={danger} alt="" width={20} height={20} />
                          <span
                            className="db-tooltip-desc"
                            style={{ color: "#C92422" }}
                          >
                            <b>No Action Sign</b> - No Action Possible
                          </span>
                        </div>
                        Some of the biggest rewards might not be allocated
                        because you do not fulfill certain requirements, which
                        will be shown when the chest opens. These chests do not
                        require any action, as the reward will not be allocated.
                        <br />
                        <br />
                        All rewards earned will be distributed at the beginning
                        of each month.
                        <br />
                        <br />
                        Keep playing daily to increase your chances of claiming
                        valuable rewards!
                      </span>
                    }
                  >
                    <img
                      onClick={() => setTooltip(true)}
                      src={infoIcon}
                      width={35}
                      height={35}
                      style={{ cursor: "pointer" }}
                      alt=""
                    />
                  </GeneralTooltip>
                </OutsideClickHandler>
              </div>
              <div className="new-total-points-wrapper d-flex align-items-center gap-2">
                <h6 className="new-total-points  mb-0">
                  {getFormattedNumber(
                    chain === "bnb" ? totalPoints : totalSkalePoints,
                    0
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex mb-0">
                  Leaderboard Points
                </span>
              </div>
              <div className="new-total-rewards-wrapper d-flex align-items-center gap-2">
                <h6 className="new-total-points  mb-0">
                  $
                  {getFormattedNumber(
                    chain === "bnb" ? totalUsd : totalSkaleUsd,
                    2
                  )}{" "}
                </h6>
                <span className="new-total-points-type d-none d-lg-flex  mb-0">
                  Rewards
                </span>
              </div>
              <div className="daily-bonus-inner-wrapper container p-4 p-lg-5 mt-3 mt-lg-0">
                <div
                  className="row daily-bonus-row 
               gap-lg-0 mx-4 mx-lg-2 mt-5 mt-lg-3"
                  style={{ height: "100%", marginTop: "64px" }}
                >
                  <div className="col-12 col-lg-5 chains-wrapper mt-3 mt-lg-0">
                    {windowSize.width > 992 ? (
                      <div
                        className="d-flex flex-row flex-lg-column justify-content-between h-100 chains-container"
                        style={{ gap: "8px" }}
                      >
                        <div
                          className={`position-relative chain-item ${
                            chain === "bnb" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={bnbChain}
                            className={`chain-img ${
                              chain === "bnb" && "chain-img-active"
                            }`}
                            onClick={() => {
                              setChain("bnb");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "bnb" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">
                              BNB Chain
                            </h6>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    bnbPercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(bnbPercentage)}%
                              </span>
                            </div>
                          </div>
                          <div
                            className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                            style={{ width: "fit-content" }}
                          >
                            <button
                              className={` ${
                                chainId === 56
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center`}
                              onClick={handleBnbPool}
                            >
                              {" "}
                              <img src={bnbIcon} alt="" /> BNB
                            </button>

                            <button
                              className={` ${
                                chainId === 204
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center`}
                              onClick={handleOpBnbPool}
                            >
                              <img src={bnbIcon} alt="" /> opBNB
                            </button>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "skale" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={skaleChain}
                            className={`chain-img ${
                              chain === "skale" && "chain-img-active"
                            }`}
                            onClick={() => {
                              setChain("skale");
                              setIsActive();
                              setIsActiveIndex();
                              setRewardData([]);
                            }}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "skale" &&
                              "chain-title-wrapper-active-skale"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">SKALE</h6>
                            <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 20
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 40
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 60
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage >= 80
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                                <img
                                  className="percent-img"
                                  src={
                                    skalePercentage === 100
                                      ? percentageFilled
                                      : percentageEmpty
                                  }
                                  height={8}
                                  alt=""
                                />
                              </div>
                              <span className="percentage-span">
                                {parseInt(skalePercentage)}%
                              </span>
                            </div>
                          </div>
                          <div
                            className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                            style={{ width: "fit-content" }}
                          >
                            <button
                              className={`${
                                chainId === 1482601649
                                  ? "new-chain-active-btn"
                                  : "new-chain-inactive-btn"
                              } d-flex gap-1 align-items-center`}
                              onClick={handleSkalePool}
                            >
                              {" "}
                              <img src={skaleIcon} alt="" /> SKALE
                            </button>
                            {/* <a href="https://www.sfuelstation.com/" target="_blank">
                         <button
                            className={`${
                              chainId === 2046399126
                                ? "new-chain-active-btn"
                                : "new-chain-inactive-btn"
                            } d-flex gap-2 align-items-center`}
                          >
                            {" "}
                            Get SFuel
                            <img src={gasRightArrow} alt="" /> 
                          </button>
                         </a> */}
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item  w-100`}
                          style={{ pointerEvents: "none" }}
                        >
                          <img
                            src={comingSoon}
                            className={`chain-img`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "comingSoon" &&
                              "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">
                              Coming Soon
                            </h6>
                            {/* <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center">
                            <img src={percentageFilled} height={8} alt="" />
                            <img src={percentageFilled} height={8} alt="" />
                            <img src={percentageFilled} height={8} alt="" />
                            <img src={percentageEmpty} height={8} alt="" />
                            <img src={percentageEmpty} height={8} alt="" />
                          </div>
                          <span className="percentage-span">62%</span>
                        </div> */}
                          </div>
                          {/* <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column">
                        <h6 className="desc-title mb-0">Magic Battle</h6>
                        <span className="chain-desc mb-0">
                          A world full of possibilities
                        </span>
                      </div> */}
                        </div>
                      </div>
                    ) : (
                      <Slider {...settings}>
                        <div
                          className={`position-relative chain-item ${
                            chain === "bnb" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={bnbChain}
                            className={`chain-img ${
                              chain === "bnb" && "chain-img-active"
                            }`}
                            onClick={() => {
                              setChain("bnb");
                              setIsActive();
                              setIsActiveIndex();
                            }}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "bnb" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">
                              BNB Chain
                            </h6>
                          </div>
                          <div
                            className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                            style={{ width: "fit-content" }}
                          >
                            <button
                              className={`chain-active-btn d-flex gap-1 align-items-center`}
                              onClick={handleBnbPool}
                            >
                              {" "}
                              <img src={bnbIcon} alt="" /> BNB
                            </button>

                            <button
                              className={`chain-inactive-btn d-flex gap-1 align-items-center`}
                              onClick={handleOpBnbPool}
                            >
                              <img src={bnbIcon} alt="" /> opBNB
                            </button>
                          </div>
                        </div>
                        <div
                          className={`position-relative chain-item ${
                            chain === "skale" && "chain-item-active"
                          } w-100`}
                        >
                          <img
                            src={skaleChain}
                            className={`chain-img ${
                              chain === "skale" && "chain-img-active"
                            }`}
                            onClick={() => {
                              setChain("skale");
                              setIsActive();
                              setIsActiveIndex();
                            }}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "skale" && "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">SKALE</h6>
                          </div>
                          <div
                            className="chain-button-wrapper d-flex align-items-center gap-2 mt-2"
                            style={{ width: "fit-content" }}
                          >
                            <button
                              className={`chain-inactive-btn d-flex gap-1 align-items-center`}
                              onClick={handleSkalePool}
                            >
                              {" "}
                              <img src={skaleIcon} alt="" /> SKALE
                            </button>
                          </div>
                        </div>
                        <div className={`position-relative chain-item  w-100`}>
                          <img
                            src={comingSoon}
                            className={`chain-img`}
                            alt=""
                          />
                          <div
                            className={`chain-title-wrapper ${
                              chain === "comingSoon" &&
                              "chain-title-wrapper-active"
                            } p-2 d-flex align-items-center justify-content-between`}
                          >
                            <h6 className="chain-title-position mb-0">
                              Coming Soon
                            </h6>
                            {/* <div className="d-flex align-items-center gap-2">
                              <div className="d-flex align-items-center">
                                <img src={percentageFilled} height={8} alt="" />
                                <img src={percentageFilled} height={8} alt="" />
                                <img src={percentageFilled} height={8} alt="" />
                                <img src={percentageEmpty} height={8} alt="" />
                                <img src={percentageEmpty} height={8} alt="" />
                              </div>
                              <span className="percentage-span">62%</span>
                            </div> */}
                          </div>
                          <div className="chain-desc-wrapper d-none d-lg-flex p-2 d-flex flex-column">
                            <h6 className="desc-title mb-0">Magic Battle</h6>
                            <span className="chain-desc mb-0">
                              A world full of possibilities
                            </span>
                          </div>
                        </div>
                      </Slider>
                    )}
                  </div>
                  <div className="col-12 col-lg-7 px-0 grid-overall-wrapper">
                    <div className="grid-scroll">
                      <div className="new-chests-grid">
                        {chain === "bnb"
                          ? allChests && allChests.length > 0
                            ? allChests.map((item, index) => (
                                <NewChestItem
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardData(value, value2);
                                    setIsActive(value);
                                    setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={item.chestType?.toLowerCase()}
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.isOpened}
                                  disableBtn={disable}
                                  isActive={isActive}
                                  isActiveIndex={isActiveIndex}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                            : window.range(0, 19).map((item, index) => (
                                <NewChestItem
                                  buyNftPopup={buyNftPopup}
                                  chainId={chainId}
                                  chain={chain}
                                  key={index}
                                  item={item}
                                  // openChest={openChest}
                                  selectedChest={selectedChest}
                                  isPremium={isPremium}
                                  onClaimRewards={(value) => {
                                    // setRewardData(value);
                                    setLiveRewardData(value);
                                    onSkaleChestClaimed();
                                    showLiveRewardData(value);
                                    setIsActive(item.chestId);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  handleShowRewards={(value, value2) => {
                                    showSingleRewardData(value, value2);
                                    setIsActive(value);
                                    // setIsActiveIndex(index + 1);
                                  }}
                                  onLoadingChest={(value) => {
                                    // setDisable(value);
                                  }}
                                  onChestStatus={(val) => {
                                    setMessage(val);
                                  }}
                                  address={address}
                                  email={email}
                                  rewardTypes={
                                    index + 1 <= 10 ? "standard" : "premium"
                                  }
                                  chestId={item.chestId}
                                  chestIndex={index + 1}
                                  open={item.opened}
                                  disableBtn={true}
                                  isActive={isActive}
                                  openChest={() => {
                                    console.log("test");
                                  }}
                                  dummypremiumChests={
                                    dummypremiumChests[index - 10]?.closedImg
                                  }
                                />
                              ))
                          : chain === "skale" &&
                            allSkaleChests &&
                            allSkaleChests.length > 0
                          ? allSkaleChests.map((item, index) => (
                              <NewChestItem
                                buyNftPopup={buyNftPopup}
                                chainId={chainId}
                                chain={chain}
                                key={index}
                                item={item}
                                // openChest={openChest}
                                selectedChest={selectedChest}
                                isPremium={isPremium}
                                onClaimRewards={(value) => {
                                  setLiveRewardData(value);
                                  onChestClaimed();
                                  showLiveRewardDataSkale(value);
                                  setIsActive(item.chestId);
                                  setIsActiveIndex(index + 1);
                                }}
                                handleShowRewards={(value, value2) => {
                                  showSingleRewardDataSkale(value, value2);
                                  setIsActive(value);
                                  setIsActiveIndex(index + 1);
                                }}
                                onLoadingChest={(value) => {
                                  // setDisable(value);
                                }}
                                onChestStatus={(val) => {
                                  setMessage(val);
                                }}
                                address={address}
                                email={email}
                                rewardTypes={item.chestType?.toLowerCase()}
                                chestId={item.chestId}
                                chestIndex={index + 1}
                                open={item.isOpened}
                                disableBtn={disable}
                                isActive={isActive}
                                isActiveIndex={isActiveIndex}
                                dummypremiumChests={
                                  dummypremiumChests[index - 10]?.closedImg
                                }
                              />
                            ))
                          : window.range(0, 19).map((item, index) => (
                              <NewChestItem
                                buyNftPopup={buyNftPopup}
                                chainId={chainId}
                                chain={chain}
                                key={index}
                                item={item}
                                // openChest={openChest}
                                selectedChest={selectedChest}
                                isPremium={isPremium}
                                onClaimRewards={(value) => {
                                  // setRewardData(value);
                                  setLiveRewardData(value);
                                  onSkaleChestClaimed();
                                  showLiveRewardData(value);
                                  setIsActive(item.chestId);
                                  // setIsActiveIndex(index + 1);
                                }}
                                handleShowRewards={(value, value2) => {
                                  showSingleRewardData(value, value2);
                                  setIsActive(value);
                                  // setIsActiveIndex(index + 1);
                                }}
                                onLoadingChest={(value) => {
                                  // setDisable(value);
                                }}
                                onChestStatus={(val) => {
                                  setMessage(val);
                                }}
                                address={address}
                                email={email}
                                rewardTypes={
                                  index + 1 <= 10 ? "standard" : "premium"
                                }
                                chestId={item.chestId}
                                chestIndex={index + 1}
                                open={item.opened}
                                disableBtn={true}
                                isActive={isActive}
                                openChest={() => {
                                  console.log("test");
                                }}
                                dummypremiumChests={
                                  dummypremiumChests[index - 10]?.closedImg
                                }
                              />
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0 mt-0 mt-lg-3 message-height-wrapper">
                    {message === "" ||
                    message === "initial" ||
                    message === "waiting" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #10C5C5",
                        }}
                      >
                        <div
                          className={`loader ${
                            message === "waiting" && "loader-waiting"
                          }`}
                        >
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6 className="loader-text mb-0">
                          {message === "waiting"
                            ? "Processing"
                            : "Ready to claim"}
                        </h6>
                        <div
                          className={`loader ${
                            message === "waiting" && "loader-waiting-2"
                          }`}
                        >
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "switch" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #ce5d1b",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>

                        {chain === "bnb" ? (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleBnbPool}
                            >
                              BNB Chain
                            </span>{" "}
                            or{" "}
                            <span
                              span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleOpBnbPool}
                            >
                              opBNB Chain
                            </span>
                          </h6>
                        ) : (
                          <h6
                            className="loader-text mb-0"
                            style={{ color: "#ce5d1b" }}
                          >
                            Switch to{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={handleSkalePool}
                            >
                              SKALE Network
                            </span>
                          </h6>
                        )}
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "switchAccount" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #ce5d1b",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                          <div className="dot" style={{ "--i": 10 }}></div>
                        </div>

                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#ce5d1b" }}
                        >
                          Use the wallet associated to your game account.
                        </h6>

                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                          <div className="dot" style={{ "--i": 10 }}></div>
                        </div>
                      </div>
                    ) : message === "error" ? (
                      <div
                        className="d-flex align-items-center flex-column justify-content-center p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          background: "#1A1C39",
                          border: "1px solid #D75853",
                        }}
                      >
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                        <h6
                          className="loader-text mb-0"
                          style={{ color: "#D75853" }}
                        >
                          Something went wrong. Try again.
                        </h6>
                        <div className="loader red-loader">
                          <div className="dot" style={{ "--i": 0 }}></div>
                          <div className="dot" style={{ "--i": 1 }}></div>
                          <div className="dot" style={{ "--i": 2 }}></div>
                          <div className="dot" style={{ "--i": 3 }}></div>
                          <div className="dot" style={{ "--i": 4 }}></div>
                          <div className="dot" style={{ "--i": 5 }}></div>
                          <div className="dot" style={{ "--i": 6 }}></div>
                          <div className="dot" style={{ "--i": 7 }}></div>
                          <div className="dot" style={{ "--i": 8 }}></div>
                          <div className="dot" style={{ "--i": 9 }}></div>
                        </div>
                      </div>
                    ) : message === "complete" ? (
                      <div className="d-flex align-items-center justify-content-center complete-bg p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <h6 className="completed-text mb-0">Completed</h6>
                      </div>
                    ) : message === "needPremium" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you become a
                              Premium Subscriber.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              {" "}
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-5 me-0 me-lg-3 px-3 px-lg-0">
                          <img
                            className="d-none d-lg-flex"
                            src={premiumIcon}
                            style={{ width: 70, height: 70 }}
                            alt=""
                          />
                          <button
                            className="get-premium-btn px-2 py-1 mb-2 mb-lg-0"
                            onClick={onPremiumClick}
                          >
                            Get Premium
                          </button>
                        </div>
                      </div>
                    ) : message === "caws" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span
                              className="win-desc mb-0"
                              style={{ fontSize: 10 }}
                            >
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you get one of
                              the suggested CAWS NFTs.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {cawsNfts.slice(0, 4).map((item, index) => (
                            <div
                              className="nft-reward-container"
                              onClick={() => {
                                setNft(item);
                                setBuyNftPopup(true);
                                // boughtCaws(
                                //   isActive,
                                //   isActiveIndex,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Money";
                                //   }).reward ?? 0,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Points";
                                //   }).reward ?? 0
                                // );
                              }}
                            >
                              <img
                                key={index}
                                className="nft-reward-img"
                                src={`https://mint.dyp.finance/thumbs150/${item.tokenId}.png`}
                                alt=""
                              />
                              <div className="buy-nft-reward-btn">Buy</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : message === "won" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You Won</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>

                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>

                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <img
                          src={winConfetti}
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "wonPoints" ? (
                      <div className="d-flex align-items-center position-relative flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You Won</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                        </div>

                        <img
                          src={winConfetti}
                          alt=""
                          className="win-confetti"
                        />
                      </div>
                    ) : message === "premium" ? (
                      <div
                        className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          border: "1px solid #8262D0",
                          background:
                            "linear-gradient(180deg, #8262D0 0%, #482293 100%)",
                        }}
                      >
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6
                            className="desc-title mb-0"
                            style={{ color: "#fff" }}
                          >
                            Become Premium Subscriber
                          </h6>
                          <span className="chain-desc mb-0">
                            Enjoy extra benefits and unlock more chests for
                            extra rewards by upgrading to premium.
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between get-premium-wrapper p-3 p-lg-0">
                          <img
                            src={premiumIcon}
                            style={{ width: 60, height: 60 }}
                            alt=""
                          />
                          <button
                            className="get-premium-btn px-2 py-1"
                            onClick={onPremiumClickOther}
                          >
                            Get Premium
                          </button>
                        </div>
                      </div>
                    ) : message === "login" ? (
                      <div
                        className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper"
                        style={{
                          border: "1px solid #8262D0",
                          background:
                            "linear-gradient(180deg, #8262D0 0%, #482293 100%)",
                        }}
                      >
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6
                            className="desc-title mb-0"
                            style={{ color: "#fff" }}
                          >
                            Sign in with Your Game Account
                          </h6>
                          <span className="chain-desc mb-0">
                            Sign in to access Daily Bonus and earn tailored
                            rewards!
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-end get-premium-wrapper p-3 p-lg-0">
                          <NavLink
                            className="sign-in-btn px-4 py-1"
                            to="/auth"
                            onClick={() => {
                              html.classList.remove("hidescroll");
                            }}
                          >
                            Sign In
                          </NavLink>
                        </div>
                      </div>
                    ) : message === "winDanger" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {winDangerItems
                            .sort(
                              (a, b) => Number(b.required) - Number(a.required)
                            )
                            .map((item, index) =>
                              item.required ? (
                                <HtmlTooltip
                                  placement="top"
                                  title={
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ width: "fit-content" }}
                                    >
                                      <span
                                        className="win-desc"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {item.message}
                                      </span>
                                    </div>
                                  }
                                >
                                  <div className="nft-reward-container">
                                    <img
                                      key={index}
                                      className="nft-reward-img"
                                      src={item.image}
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                        filter: "opacity(0.5)",
                                      }}
                                    />
                                    <img
                                      src={item.holder ? greenCheck : redX}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                </HtmlTooltip>
                              ) : (
                                <div className="required-item-placeholder"></div>
                              )
                            )}
                        </div>
                      </div>
                    ) : message === "winDangerCaws" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerLand" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerNotEnoughLand" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerHasNftsNoPremium" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "winDangerHasNftsPremiumNoDyp" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={danger} alt="" width={20} height={20} />
                            <span className="win-desc mb-0">
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward has not been assigned due to incomplete
                              fulfillment of all the requirements.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center danger-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === false ? (
                                  <></>
                                ) : (
                                  <div
                                    className="nft-reward-container"
                                    key={index}
                                  >
                                    <img
                                      className="nft-reward-img"
                                      src={
                                        item.type === "PREMIUM"
                                          ? premiumRound
                                          : item.type === "CAWS"
                                          ? cawsRound
                                          : item.type === "LAND"
                                          ? wodRound
                                          : dypRound
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                      style={{
                                        borderRadius: "50%",
                                      }}
                                    />
                                    <img
                                      src={greenCheck}
                                      alt=""
                                      className="holder-check"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <></>
                          )}

                          {rewardData.rewards ? (
                            rewardData.rewards
                              .find((obj) => {
                                return obj.rewardType === "Money";
                              })
                              .requirements.map((item, index) => {
                                return item.owned === true ? (
                                  <></>
                                ) : (
                                  <HtmlTooltip
                                    placement="top"
                                    key={index}
                                    title={
                                      <div
                                        className="d-flex align-items-center gap-2"
                                        style={{ width: "fit-content" }}
                                      >
                                        <span
                                          className="win-desc"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {rewardData.rewards
                                            ? rewardData.rewards.find((obj) => {
                                                return (
                                                  obj.rewardType === "Money"
                                                );
                                              }).details
                                            : ""}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div
                                      className="nft-reward-container"
                                      key={index}
                                    >
                                      <img
                                        className="nft-reward-img"
                                        src={
                                          item.type === "PREMIUM"
                                            ? premiumRound
                                            : item.type === "CAWS"
                                            ? cawsRound
                                            : item.type === "LAND"
                                            ? wodRound
                                            : dypRound
                                        }
                                        alt=""
                                        width={70}
                                        height={70}
                                        style={{
                                          borderRadius: "50%",
                                          filter: "opacity(0.5)",
                                        }}
                                      />
                                      <img
                                        src={redX}
                                        alt=""
                                        className="holder-check"
                                      />
                                    </div>
                                  </HtmlTooltip>
                                );
                              })
                          ) : (
                            <></>
                          )}
                          {window
                            .range(
                              0,
                              rewardData.rewards
                                ? 3 -
                                    rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).requirements.length
                                : 0
                            )
                            .map((item, index) => {
                              return (
                                <div
                                  className="required-item-placeholder"
                                  key={index}
                                ></div>
                              );
                            })}
                        </div>
                      </div>
                    ) : message === "wod" ? (
                      <div className="d-flex align-items-center flex-column flex-lg-row justify-content-between p-0 p-lg-2 w-100 chest-progress-wrapper">
                        <div
                          className="chain-desc-wrapper p-2 d-flex flex-column"
                          style={{
                            filter: "brightness(1)",
                            position: "relative",
                          }}
                        >
                          <h6 className="win-text mb-0">You won</h6>
                          <div className="d-flex align-items-center gap-2">
                            <img src={warning} alt="" width={20} height={20} />
                            <span
                              className="win-desc mb-0"
                              style={{ fontSize: 10 }}
                            >
                              The{" "}
                              <span style={{ color: "#F2C624" }}>
                                $
                                {getFormattedNumber(
                                  rewardData.rewards
                                    ? rewardData.rewards.find((obj) => {
                                        return obj.rewardType === "Money";
                                      }).reward
                                    : 0,
                                  2
                                )}
                              </span>{" "}
                              reward will be allocated to you if you get one of
                              the suggested Genesis NFTs.
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 win-rewards-container">
                          <div className="d-flex flex-column align-items-center neutral-border p-1">
                            <h6 className="win-amount mb-0">
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Points";
                                    }).reward
                                  : 0,
                                0
                              )}
                            </h6>
                            <span className="win-amount-desc">
                              Leaderboard Points
                            </span>
                          </div>
                          <h6 className="win-amount mb-0">+</h6>
                          <div className="d-flex flex-column align-items-center warning-border p-1">
                            <h6 className="win-amount mb-0">
                              $
                              {getFormattedNumber(
                                rewardData.rewards
                                  ? rewardData.rewards.find((obj) => {
                                      return obj.rewardType === "Money";
                                    }).reward
                                  : 0,
                                2
                              )}
                            </h6>
                            <span className="win-amount-desc">Rewards</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {landNfts.slice(0, 4).map((item, index) => (
                            <div
                              className="nft-reward-container"
                              onClick={() => {
                                setNft(item);
                                setBuyNftPopup(true);
                                // boughtCaws(
                                //   isActive,
                                //   isActiveIndex,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Money";
                                //   }).reward ?? 0,
                                //   rewardData.rewards.find((obj) => {
                                //     return obj.rewardType === "Points";
                                //   }).reward ?? 0
                                // );
                              }}
                            >
                              <img
                                key={index}
                                className="nft-reward-img"
                                src={`https://mint.worldofdypians.com/thumbs150/${item.tokenId}.png`}
                                alt=""
                                width={70}
                                height={70}
                              />
                              <div className="buy-nft-reward-btn">Buy</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rewards-container-outer custom-container-width d-flex align-items-center justify-content-center p-4">
            {windowSize.width > 992 ? (
              <div className="new-rewards-grid">
                {dummyRewards.map((item, index) => (
                  <div
                    key={index}
                    className="new-rewards-item p-2 d-flex align-items-center gap-2"
                    style={{
                      filter:
                        item.title2 !== "needPremium"
                          ? (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType === "Points" &&
                                  Number(obj.reward) <= item.threshold[1]
                                );
                              })) ||
                            (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType !== "Points" &&
                                  Number(obj.reward) > item.min &&
                                  Number(obj.reward) <= item.max
                                );
                              }) &&
                              message != "needPremium")
                            ? "brightness(1)"
                            : "brightness(0.5)"
                          : (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType === "Points" &&
                                  Number(obj.reward) <= item.threshold[1]
                                );
                              })) ||
                            (rewardData &&
                              rewardData.rewards?.find((obj) => {
                                return (
                                  obj.rewardType !== "Points" &&
                                  Number(obj.reward) > item.min &&
                                  Number(obj.reward) <= item.max &&
                                  message === "needPremium"
                                );
                              }))
                          ? "brightness(1)"
                          : "brightness(0.5)",
                    }}
                  >
                    <div className="position-relative">
                      <img
                        src={require(`./assets/${item.img}${
                          item.title2 !== "needPremium"
                            ? (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Points" &&
                                    Number(obj.reward) <= item.threshold[1]
                                  );
                                })) ||
                              (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType !== "Points" &&
                                    Number(obj.reward) > item.min &&
                                    Number(obj.reward) <= item.max
                                  );
                                }) &&
                                message != "needPremium")
                              ? "Active"
                              : ""
                            : (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === "Points" &&
                                    Number(obj.reward) <= item.threshold[1]
                                  );
                                })) ||
                              (rewardData &&
                                rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType !== "Points" &&
                                    Number(obj.reward) > item.min &&
                                    Number(obj.reward) <= item.max
                                  );
                                }) &&
                                message === "needPremium")
                            ? "Active"
                            : ""
                        }Icon.png`)}
                        width={60}
                        height={60}
                        alt=""
                      />
                      {item.title2 !== "needPremium" ? (
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimed" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message !== "needPremium" ? (
                          <img
                            src={warning}
                            width={20}
                            height={20}
                            className="reward-warning"
                            alt=""
                          />
                        ) : rewardData &&
                          rewardData.rewards?.find((obj) => {
                            return obj.rewardType === item.title;
                          }) &&
                          rewardData &&
                          rewardData.rewards?.find((obj) => {
                            return (
                              obj.rewardType === item.title &&
                              obj.status === "Unclaimable" &&
                              obj.reward > item.min &&
                              obj.reward <= item.max
                            );
                          }) &&
                          message !== "needPremium" ? (
                          <img
                            src={danger}
                            width={20}
                            height={20}
                            className="reward-warning"
                            alt=""
                          />
                        ) : (
                          <></>
                        )
                      ) : rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimed" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message === "needPremium" ? (
                        <img
                          src={warning}
                          width={20}
                          height={20}
                          className="reward-warning"
                          alt=""
                        />
                      ) : rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return obj.rewardType === item.title;
                        }) &&
                        rewardData &&
                        rewardData.rewards?.find((obj) => {
                          return (
                            obj.rewardType === item.title &&
                            obj.status === "Unclaimable" &&
                            obj.reward > item.min &&
                            obj.reward <= item.max
                          );
                        }) &&
                        message === "needPremium" ? (
                        <img
                          src={danger}
                          width={20}
                          height={20}
                          className="reward-warning"
                          alt=""
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="d-flex align-items-bottom gap-1">
                      <h6
                        className="mb-0  new-reward-amount"
                        style={{
                          color:
                            rewardData &&
                            rewardData.rewards?.find((obj) => {
                              return (
                                obj.rewardType === "Points" &&
                                Number(obj.reward) <= item.threshold[1]
                              );
                            })
                              ? "#F2C624"
                              : item.title2 !== "needPremium"
                              ? rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === item.title &&
                                    (obj.status !== "Unclaimed" ||
                                      obj.status !== "Unclaimable") &&
                                    obj.reward > item.min &&
                                    obj.reward <= item.max
                                  );
                                }) && message !== "needPremium"
                                ? "#F2C624"
                                : "#fff"
                              : rewardData.rewards?.find((obj) => {
                                  return (
                                    obj.rewardType === item.title &&
                                    (obj.status !== "Unclaimed" ||
                                      obj.status !== "Unclaimable") &&
                                    obj.reward > item.min &&
                                    obj.reward <= item.max
                                  );
                                }) && message === "needPremium"
                              ? "#F2C624"
                              : "#fff",
                        }}
                      >
                        {item.amount}
                      </h6>
                      {/* <span className="mb-0  new-reward-type">{item.title}</span> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
              // <Slider {...settings2} ref={rewardsRef} style={{ width: "100%" }}>
              //   {dummyRewards.map((item, index) => (
              //     <div
              //       key={index}
              //       className="new-rewards-item p-2 d-flex align-items-center justify-content-center gap-2"
              //       style={{
              //         filter:
              //         item.title2 !== "needPremium"
              //           ? (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })) ||
              //             (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType !== "Points" &&
              //                   Number(obj.reward) > item.min &&
              //                   Number(obj.reward) <= item.max
              //                 );
              //               }) &&
              //               message != "needPremium")
              //             ? "brightness(1)"
              //             : "brightness(0.5)"
              //           : (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })) ||
              //             (rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType !== "Points" &&
              //                   Number(obj.reward) > item.min &&
              //                   Number(obj.reward) <= item.max &&
              //                   message === "needPremium"
              //                 );
              //               }))
              //           ? "brightness(1)"
              //           : "brightness(0.5)",
              //       }}
              //     >
              //       <div className="position-relative">
              //         <img
              //            src={require(`./assets/${item.img}${
              //             item.title2 !== "needPremium"
              //               ? (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === "Points" &&
              //                       Number(obj.reward) <= item.threshold[1]
              //                     );
              //                   })) ||
              //                 (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType !== "Points" &&
              //                       Number(obj.reward) > item.min &&
              //                       Number(obj.reward) <= item.max
              //                     );
              //                   }) &&
              //                   message != "needPremium")
              //                 ? "Active"
              //                 : ""
              //               : (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === "Points" &&
              //                       Number(obj.reward) <= item.threshold[1]
              //                     );
              //                   })) ||
              //                 (rewardData &&
              //                   rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType !== "Points" &&
              //                       Number(obj.reward) > item.min &&
              //                       Number(obj.reward) <= item.max
              //                     );
              //                   }) &&
              //                   message === "needPremium")
              //               ? "Active"
              //               : ""
              //           }Icon.png`)}
              //           width={60}
              //           height={60}
              //           alt=""
              //         />
              //         {item.title2 !== "needPremium" ? (
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimed" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message !== "needPremium" ? (
              //             <img
              //               src={warning}
              //               width={20}
              //               height={20}
              //               className="reward-warning"
              //               alt=""
              //             />
              //           ) : rewardData &&
              //             rewardData.rewards?.find((obj) => {
              //               return obj.rewardType === item.title;
              //             }) &&
              //             rewardData &&
              //             rewardData.rewards?.find((obj) => {
              //               return (
              //                 obj.rewardType === item.title &&
              //                 obj.status === "Unclaimable" &&
              //                 obj.reward > item.min &&
              //                 obj.reward <= item.max
              //               );
              //             }) &&
              //             message !== "needPremium" ? (
              //             <img
              //               src={danger}
              //               width={20}
              //               height={20}
              //               className="reward-warning"
              //               alt=""
              //             />
              //           ) : (
              //             <></>
              //           )
              //         ) : rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimed" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message === "needPremium" ? (
              //           <img
              //             src={warning}
              //             width={20}
              //             height={20}
              //             className="reward-warning"
              //             alt=""
              //           />
              //         ) : rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return obj.rewardType === item.title;
              //           }) &&
              //           rewardData &&
              //           rewardData.rewards?.find((obj) => {
              //             return (
              //               obj.rewardType === item.title &&
              //               obj.status === "Unclaimable" &&
              //               obj.reward > item.min &&
              //               obj.reward <= item.max
              //             );
              //           }) &&
              //           message === "needPremium" ? (
              //           <img
              //             src={danger}
              //             width={20}
              //             height={20}
              //             className="reward-warning"
              //             alt=""
              //           />
              //         ) : (
              //           <></>
              //         )}
              //       </div>
              //       <div className="d-flex align-items-bottom gap-1">
              //       <h6
              //           className="mb-0  new-reward-amount"
              //           style={{
              //             color:
              //               rewardData &&
              //               rewardData.rewards?.find((obj) => {
              //                 return (
              //                   obj.rewardType === "Points" &&
              //                   Number(obj.reward) <= item.threshold[1]
              //                 );
              //               })
              //                 ? "#F2C624"
              //                 : item.title2 !== "needPremium"
              //                 ? rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === item.title &&
              //                       (obj.status !== "Unclaimed" ||
              //                         obj.status !== "Unclaimable") &&
              //                       obj.reward > item.min &&
              //                       obj.reward <= item.max
              //                     );
              //                   }) && message !== "needPremium"
              //                   ? "#F2C624"
              //                   : "#fff"
              //                 : rewardData.rewards?.find((obj) => {
              //                     return (
              //                       obj.rewardType === item.title &&
              //                       (obj.status !== "Unclaimed" ||
              //                         obj.status !== "Unclaimable") &&
              //                       obj.reward > item.min &&
              //                       obj.reward <= item.max
              //                     );
              //                   }) && message === "needPremium"
              //                 ? "#F2C624"
              //                 : "#fff",
              //           }}
              //         >
              //           {item.amount}
              //         </h6>
              //         {/* <span className="mb-0  new-reward-type">{item.title}</span> */}
              //       </div>
              //     </div>
              //   ))}
              // </Slider>
            )}
          </div>
        </div>
      </div>
      {buyNftPopup && (
        <BuyNftPopup
          nft={nft}
          onClose={() => setBuyNftPopup(false)}
          dypTokenData={dypTokenData}
          dyptokenData_old={dyptokenData_old}
          ethTokenData={ethTokenData}
          handleSwitchChain={handleSwitchChain}
          chestIndex={isActiveIndex}
          chain={chain}
          chainId={chainId}
          email={email}
          onSuccessPurchase={() => {
            onSkaleChestClaimed();
            onChestClaimed();
            // setBuyNftPopup(false);
            setTimeout(() => {
              chain === "bnb"
                ? showSingleRewardData(rewardData.chestId, isActiveIndex - 1)
                : showSingleRewardDataSkale(
                    rewardData.chestId,
                    isActiveIndex - 1
                  );
            }, 2000);
          }}
        />
      )}
    </>
  );
};

export default NewDailyBonus;
