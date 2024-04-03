import React, { useEffect, useState } from "react";
import axios from "axios";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";

import allImg from "./myrewardsAssets/newAssets/allImg.svg";
import allActive from "./myrewardsAssets/newAssets/allActive.svg";
import nftStaking from "./myrewardsAssets/newAssets/nftStaking.svg";
import nftStakingActive from "./myrewardsAssets/newAssets/nftStakingActive.svg";

import leaderboard from "./myrewardsAssets/newAssets/leaderboard.svg";
import leaderboardActive from "./myrewardsAssets/newAssets/leaderboardActive.svg";

import specialRewards from "./myrewardsAssets/newAssets/specialRewards.svg";
import specialRewardsActive from "./myrewardsAssets/newAssets/specialRewardsActive.svg";

import dailyBonus from "./myrewardsAssets/newAssets/dailyBonus.png";
import dailyBonusActive from "./myrewardsAssets/newAssets/dailyBonusActive.png";

import treasureHunt from "./myrewardsAssets/newAssets/treasureHunt.png";
import treasureHuntActive from "./myrewardsAssets/newAssets/treasureHuntActive.png";

import base from "./myrewardsAssets/newAssets/treasureHunt/base.svg";
import cmc from "./myrewardsAssets/newAssets/treasureHunt/cmc.svg";
import coingecko from "./myrewardsAssets/newAssets/treasureHunt/coingecko.svg";
import skale from "./myrewardsAssets/newAssets/treasureHunt/skale.svg";
import dypius from "./myrewardsAssets/newAssets/treasureHunt/dypius.svg";
import gate from "./myrewardsAssets/newAssets/treasureHunt/gate.svg";
import conflux from "./myrewardsAssets/newAssets/treasureHunt/conflux.svg";
import dypiusPremium from "./myrewardsAssets/newAssets/treasureHunt/dypiusPremium.svg";
import dogeCoin from "./myrewardsAssets/newAssets/treasureHunt/dogeCoin.svg";

const MyRewardsPopupNew = ({
  username,
  userId,
  address,
  email,
  bnbPrice,
  cfxPrice,
  ethTokenData,
  openedChests,
  allChests,
  weeklyplayerData,
  dailyplayerData,
  userRank2,
  userSocialRewards,
  dogePrice,
  userEarnUsd,
  userEarnETH,
  dogeEarnUSD,
  dogeEarnBNB,
  baseEarnUSD,
  baseEarnETH,
  dypiusEarnUsd,
  cmcuserEarnETH,
  cmcuserEarnUsd,
  dypiusPremiumEarnUsd,
  dypiusPremiumEarnTokens,
  openedSkaleChests,
  allSkaleChests,
  kittyDashRecords,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [previousRewards, setPreviousRewards] = useState(false);
  const [rewardCategory, setrewardCategory] = useState("all");

  const backendApi =
    "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

  const [leaderboardTotalData, setleaderboardTotalData] = useState(0);

  const [genesisData, setgenesisData] = useState(0);
  const [bundlesBought, setbundlesBought] = useState(0);

  const [cawsRewards, setCawsRewards] = useState(0);
  const [wodCawsRewards, setWodCawsRewards] = useState(0);
  const [wodRewards, setWodRewards] = useState(0);
  const [gemRewards, setGemRewards] = useState(0);

  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);
  const [treasureRewardMoneySkale, setTreasureRewardMoneySkale] = useState(0);

  const [pasttreasureRewardMoney, setpastTreasureRewardMoney] = useState(0);
  const [pasttreasureRewardNftCaws, setpastTreasureRewardNftCaws] = useState(0);
  const [pasttreasureRewardNftWod, setpastTreasureRewardNftWod] = useState(0);
  const [pasttreasureRewardNftBetaPass, setpastTreasureRewardNftBetaPass] =
    useState(0);

  const [confluxRewardsUSD, setConfluxRewardsUSD] = useState(0);
  const [dypiusRewardsUSD, setDypiusRewardsUSD] = useState(0);
  const [coingeckoRewardsUSD, setcoingeckoRewardsUSD] = useState(0);
  const [pastSpecialRewards, setpastSpecialRewards] = useState(0);

  const [gateRewardsUSD, setGateRewardsUSD] = useState(0);
  const [baseRewardsUSD, setBaseRewardsUSD] = useState(0);

  const [userSocialRewardsCached, setuserSocialRewardsCached] = useState(0);

  const getBundles = async () => {
    if (address) {
      const result = await axios.get(
        `https://api3.dyp.finance/api/bundles/count/${address}`
      );
      const result_formatted = result.data.count;
      setbundlesBought(result_formatted);
    }
  };

  const fetchUsersocialRewards = () => {
    const cachedUserSocialRewards = localStorage.getItem(
      "cacheduserSocialRewards"
    );

    if (cachedUserSocialRewards) {
      setuserSocialRewardsCached(cachedUserSocialRewards);
    }
  };

  const fetchMonthlyGenesisRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    if (userId) {
      const result = await axios.post(
        `${backendApi}/auth/GetLeaderboardAroundPlayer`,
        data
      );
      var testArray = result.data.data.leaderboard.filter(
        (item) => item.displayName === username
      );

      const userPosition = testArray[0].statValue;
      setgenesisData(userPosition);
    }
  };

  const fetchConfluxUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/conflux_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setConfluxRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedConfluxRewards", data.data.userRewards);
        } else {
          setConfluxRewardsUSD(0);
          localStorage.setItem("cachedConfluxRewards", 0);
        }
      });
  };

  const fetchDypiusUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/dyp_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setDypiusRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedDypiusRewards", data.data.userRewards);
        } else {
          setDypiusRewardsUSD(0);
          localStorage.setItem("cachedDypiusRewards", 0);
        }
      });
  };

  const fetchPastSpecialRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/special_r/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setpastSpecialRewards(data.data.userRewards);
        } else {
          setpastSpecialRewards(0);
        }
      });
  };

  const fetchCoingeckoUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/coingecko_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          setcoingeckoRewardsUSD(data.data.userRewards);
          localStorage.setItem("cachedCoingeckoRewards", data.data.userRewards);
        } else {
          setcoingeckoRewardsUSD(0);
          localStorage.setItem("cachedCoingeckoRewards", 0);
        }
      });
  };

  const fetchGateUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/gate_rewards/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          localStorage.setItem("cachedGateRewards", data.data.userRewards);
          setGateRewardsUSD(data.data.userRewards);
        } else {
          setGateRewardsUSD(0);
          localStorage.setItem("cachedGateRewards", 0);
        }
      });
  };

  const fetchBaseUSDRewards = async (addr) => {
    await axios
      .get(`https://api.worldofdypians.com/api/base_rewards_pass/${addr}`)
      .then((data) => {
        if (data.data.userRewards) {
          localStorage.setItem("cachedBaseRewards", data.data.userRewards);
          setBaseRewardsUSD(data.data.userRewards);
        } else {
          setBaseRewardsUSD(0);
          localStorage.setItem("cachedBaseRewards", 0);
        }
      });
  };

  const fetchNftRewards = async (userAddr) => {
    if (userAddr) {
      const cawsResult = await axios.get(
        `https://api.worldofdypians.com/api/caws_rewards/${userAddr}`
      );
      const wodcaws_Result = await axios.get(
        `https://api.worldofdypians.com/api/wodcaws_rewards/${userAddr}`
      );
      const wodResult = await axios.get(
        `https://api.worldofdypians.com/api/genesisimple_rewards/${userAddr}`
      );
      if (cawsResult && cawsResult.status === 200) {
        const cawsuserRewards = cawsResult.data.userRewards;
        localStorage.setItem("cachedCawsUserRewards", cawsuserRewards);
        setCawsRewards(cawsuserRewards);
      }

      if (wodcaws_Result && wodcaws_Result.status === 200) {
        const wodcaws_userRewards = wodcaws_Result.data.userRewards;
        localStorage.setItem("cachedWodCawsUserRewards", wodcaws_userRewards);
        setWodCawsRewards(wodcaws_userRewards);
      }

      if (wodResult && wodResult.status === 200) {
        const wod_userRewards = wodResult.data.userRewards;
        localStorage.setItem("cachedWodUserRewards", wod_userRewards);
        setWodRewards(wod_userRewards);
      }
    }
  };

  const fetchGenesisGem = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/genesis_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const gem_Rewards = result.data.userRewards;
      localStorage.setItem("cachedGem_Rewards", gem_Rewards);
      setGemRewards(gem_Rewards);
    }
  };

  const fetchPastDailyBonusMoney = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/daily_rewards/${userAddr}`
    );
    if (result && result.status === 200) {
      const money_Rewards = result.data.userRewards;

      setpastTreasureRewardMoney(money_Rewards);
    }
  };

  const fetchPastDailyBonusBetaPass = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/beta_passes/${userAddr}`
    );
    if (result && result.status === 200) {
      const bp_Rewards = result.data.userRewards;

      setpastTreasureRewardNftBetaPass(bp_Rewards);
    }
  };

  const fetchPastDailyBonusCaws = async (userAddr) => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/caws/${userAddr}`
    );
    if (result && result.status === 200) {
      const caws_Rewards = result.data.userRewards;

      setpastTreasureRewardNftCaws(caws_Rewards);
    }
  };

  const fetchLeaderboardData = async (userAddr) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/api/leaderboard_rewards/${userAddr}`)
      .catch((e) => {
        console.log(e);
        localStorage.setItem("cachedLeaderboardearnings", 0);
      });

    if (result && result.status === 200) {
      const leaderboard_earnings = result.data.userRewards;
      localStorage.setItem("cachedLeaderboardearnings", leaderboard_earnings);
      setleaderboardTotalData(leaderboard_earnings);
    } else {
      localStorage.setItem("cachedLeaderboardearnings", 0);
    }
  };

  const getTreasureChestsInfo = async () => {
    var moneyResult = 0;
    var moneyResultSkale = 0;
    // if (openedChests && openedChests.length > 0) {
    //   for (let i = 0; i < openedChests.length; i++) {
    //     if (
    //       openedChests[i].rewards.find((obj) => obj.rewardType === "Points")
    //     ) {
    //       pointsResult += Number(openedChests[i].reward);
    //     }
    //     if (openedChests[i].rewards.find((obj) => obj.rewardType === "Money")) {
    //       if (
    //         !openedChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //           ?.details
    //       ) {
    //         moneyResult += Number(
    //           openedChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //             .reward
    //         );
    //       }
    //     }
    //     if (openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")) {
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "WoD"
    //       ) {
    //         nftLandResult++;
    //       }
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "CAWS"
    //       ) {
    //         nftCawsResult++;
    //       }
    //       if (
    //         openedChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "BetaPass"
    //       ) {
    //         nftBPResult++;
    //       }
    //     }
    //   }
    // }

    // if (openedSkaleChests && openedSkaleChests.length > 0) {
    //   for (let i = 0; i < openedSkaleChests.length; i++) {
    //     if (
    //       openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Points")
    //     ) {
    //       pointsResult += Number(openedSkaleChests[i].reward);
    //     }
    //     if (openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")) {
    //       if (
    //         !openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //           ?.details
    //       ) {
    //         moneyResult += Number(
    //           openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "Money")
    //             .reward
    //         );
    //       }
    //     }
    //     if (openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")) {
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "WoD"
    //       ) {
    //         nftLandResult++;
    //       }
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "CAWS"
    //       ) {
    //         nftCawsResult++;
    //       }
    //       if (
    //         openedSkaleChests[i].rewards.find((obj) => obj.rewardType === "NFT")
    //           .reward === "BetaPass"
    //       ) {
    //         nftBPResult++;
    //       }
    //     }
    //   }
    // }

    if (allChests && allChests.length > 0) {
      allChests.forEach((chest) => {
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

    if (allSkaleChests && allSkaleChests.length > 0) {
      allSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResultSkale += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    setTreasureRewardMoney(moneyResult);
    setTreasureRewardMoneySkale(moneyResultSkale);
  };

  const fetchCachedData = () => {
    const cachedConfluxRewards = localStorage.getItem("cachedConfluxRewards");
    const cachedGateRewards = localStorage.getItem("cachedGateRewards");
    const cachedDypiusRewards = localStorage.getItem("cachedDypiusRewards");
    const cachedCoingeckoRewards = localStorage.getItem(
      "cachedCoingeckoRewards"
    );

    const cachedBaseRewards = localStorage.getItem("cachedBaseRewards");

    const cachedCawsUserRewards = localStorage.getItem("cachedCawsUserRewards");
    const cachedWodCawsUserRewards = localStorage.getItem(
      "cachedWodCawsUserRewards"
    );

    const cachedWodUserRewards = localStorage.getItem("cachedWodUserRewards");
    const cachedGem_Rewards = localStorage.getItem("cachedGem_Rewards");
    const cachedLeaderboardearnings = localStorage.getItem(
      "cachedLeaderboardearnings"
    );

    if (
      cachedConfluxRewards &&
      cachedGateRewards &&
      cachedCawsUserRewards &&
      cachedWodCawsUserRewards &&
      cachedWodUserRewards &&
      cachedGem_Rewards &&
      cachedLeaderboardearnings &&
      cachedDypiusRewards &&
      cachedCoingeckoRewards &&
      cachedBaseRewards
    ) {
      setConfluxRewardsUSD(Number(cachedConfluxRewards));

      setDypiusRewardsUSD(cachedDypiusRewards);

      setGateRewardsUSD(Number(cachedGateRewards));

      setCawsRewards(Number(cachedCawsUserRewards));

      setWodCawsRewards(Number(cachedWodCawsUserRewards));

      setWodRewards(Number(cachedWodUserRewards));

      setGemRewards(Number(cachedGem_Rewards));

      setleaderboardTotalData(Number(cachedLeaderboardearnings));

      setcoingeckoRewardsUSD(cachedCoingeckoRewards);

      setBaseRewardsUSD(cachedBaseRewards);
    }
  };

  useEffect(() => {
    fetchMonthlyGenesisRecordsAroundPlayer();
  }, [userId, bundlesBought]);

  useEffect(() => {
    getTreasureChestsInfo();
  }, [openedChests, openedSkaleChests]);

  useEffect(() => {
    getBundles();
    fetchNftRewards(address);
    fetchGenesisGem(address);
    fetchLeaderboardData(address);
    fetchConfluxUSDRewards(address);
    fetchGateUSDRewards(address);
    fetchBaseUSDRewards(address);
    fetchDypiusUSDRewards(address);
    fetchCoingeckoUSDRewards(address);
    fetchPastSpecialRewards(address);
    fetchPastDailyBonusMoney(address);
    fetchPastDailyBonusBetaPass(address);
    fetchPastDailyBonusCaws(address);
    fetchCachedData();
  }, [address, email]);

  useEffect(() => {
    fetchUsersocialRewards();
  }, [userSocialRewards]);

  const scrollToView = (viewId) => {
    document.getElementById(viewId).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="d-grid rewardstable-wrapper gap-2 mt-3 px-1">
      <div className="total-earnings-purple-wrapper p-2">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span className="total-rewards-amount">
            $
            {getFormattedNumber(
              Number(gemRewards) +
                Number(dailyplayerData) +
                Number(weeklyplayerData) +
                Number(userRank2) +
                Number(genesisData) +
                Number(cmcuserEarnUsd) +
                Number(dypiusPremiumEarnUsd) +
                Number(userSocialRewardsCached) +
                Number(treasureRewardMoney) +
                Number(treasureRewardMoneySkale) +
                Number(leaderboardTotalData) +
                Number(gateRewardsUSD) +
                Number(confluxRewardsUSD) +
                Number(dypiusRewardsUSD) +
                Number(pastSpecialRewards) +
                Number(coingeckoRewardsUSD) +
                Number(baseRewardsUSD) +
                Number(cawsRewards) +
                Number(wodCawsRewards) +
                Number(pasttreasureRewardMoney) +
                Number(wodRewards),
              2
            )}
          </span>
          <span className="total-rewards-desc">TOTAL EARNINGS</span>
        </div>
      </div>
      <div className="d-flex flex-column gap-1 w-100">
        <div className="d-flex flex-row justify-content-between gap-2 align-items-center">
          <span className="reward-category-text">Reward Category</span>
          <div className="d-flex align-items-center gap-2">
            <button
              className={previousRewards ? "past-reward" : "active-reward"}
              onClick={() => {
                setPreviousRewards(false);
              }}
            >
              Active
            </button>
            <button
              className={previousRewards ? "active-reward" : "past-reward"}
              onClick={() => {
                setPreviousRewards(true);
              }}
            >
              Past
            </button>
          </div>
        </div>
        <div className="small-separator"></div>
      </div>
      <div className="reward-category-items-wrapper">
        <div
          className={` ${
            rewardCategory === "all"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("all");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img src={rewardCategory === "all" ? allActive : allImg} alt="" />
            <span
              className={
                rewardCategory === "all"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              All
            </span>
            <div
              className={
                rewardCategory === "all"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "all"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(wodRewards) +
                      Number(wodCawsRewards) +
                      Number(cawsRewards) +
                      Number(pasttreasureRewardMoney) +
                      Number(gemRewards) +
                      Number(leaderboardTotalData) +
                      Number(baseRewardsUSD) +
                      Number(coingeckoRewardsUSD) +
                      Number(dypiusRewardsUSD) +
                      Number(gateRewardsUSD) +
                      Number(confluxRewardsUSD) +
                      Number(dogeEarnUSD),
                    2
                  )
                : getFormattedNumber(
                    0 +
                      Number(treasureRewardMoney) +
                      Number(treasureRewardMoneySkale) +
                      Number(dailyplayerData) +
                      Number(weeklyplayerData) +
                      Number(userRank2) +
                      Number(genesisData) +
                      Number(cmcuserEarnUsd) +
                      Number(dypiusPremiumEarnUsd),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "nftStaking"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("nftStaking");
            scrollToView(previousRewards ? "pastnftStaking" : "nftStaking");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "nftStaking" ? nftStakingActive : nftStaking
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "nftStaking"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              NFT Staking
            </span>
            <div
              className={
                rewardCategory === "nftStaking"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "nftStaking"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(wodRewards) +
                      Number(wodCawsRewards) +
                      Number(cawsRewards),
                    2
                  )
                : "0.00"}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "dailyBonus"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("dailyBonus");
            scrollToView(previousRewards ? "pastdailyBonus" : "dailyBonus");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "dailyBonus" ? dailyBonusActive : dailyBonus
              }
              style={{ width: 36, height: 36 }}
              alt=""
            />
            <span
              className={
                rewardCategory === "dailyBonus"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Daily Bonus
            </span>
            <div
              className={
                rewardCategory === "dailyBonus"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "dailyBonus"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(pasttreasureRewardMoney, 2)
                : getFormattedNumber(
                    Number(treasureRewardMoney) +
                      Number(treasureRewardMoneySkale),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "leaderboard"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("leaderboard");
            scrollToView(previousRewards ? "pastleaderboard" : "leaderboard2");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "leaderboard"
                  ? leaderboardActive
                  : leaderboard
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "leaderboard"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Leaderboard
            </span>
            <div
              className={
                rewardCategory === "leaderboard"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "leaderboard"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(gemRewards) + Number(leaderboardTotalData),
                    2
                  )
                : getFormattedNumber(
                    Number(dailyplayerData) +
                      Number(weeklyplayerData) +
                      Number(userRank2) +
                      Number(genesisData),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "treasurehunt"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("treasurehunt");
            scrollToView(previousRewards ? "pasttreasurehunt" : "treasurehunt");
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "treasurehunt"
                  ? treasureHuntActive
                  : treasureHunt
              }
              alt=""
              style={{ width: 36, height: 36 }}
            />
            <span
              className={
                rewardCategory === "treasurehunt"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Treasure Hunt
            </span>
            <div
              className={
                rewardCategory === "treasurehunt"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "treasurehunt"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(
                    Number(baseRewardsUSD) +
                      Number(coingeckoRewardsUSD) +
                      Number(dypiusRewardsUSD) +
                      Number(gateRewardsUSD) +
                      Number(confluxRewardsUSD) +
                      Number(dogeEarnUSD),
                    2
                  )
                : getFormattedNumber(
                    Number(cmcuserEarnUsd) + Number(dypiusPremiumEarnUsd),
                    2
                  )}
            </span>
          </div>
        </div>
        <div
          className={` ${
            rewardCategory === "specialRewards"
              ? "reward-category-item-active"
              : "reward-category-item"
          }  p-2`}
          onClick={() => {
            setrewardCategory("specialRewards");
            scrollToView(
              previousRewards ? "pastspecialRewards" : "specialRewards"
            );
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <img
              src={
                rewardCategory === "specialRewards"
                  ? specialRewardsActive
                  : specialRewards
              }
              alt=""
            />
            <span
              className={
                rewardCategory === "specialRewards"
                  ? "reward-item-desc-active"
                  : "reward-item-desc"
              }
            >
              Special Rewards
            </span>
            <div
              className={
                rewardCategory === "specialRewards"
                  ? "small-separator-active"
                  : "small-separator"
              }
            ></div>
            <span
              className={
                rewardCategory === "specialRewards"
                  ? "reward-category-amount-active"
                  : "reward-category-amount"
              }
            >
              $
              {previousRewards
                ? getFormattedNumber(pastSpecialRewards, 2)
                : getFormattedNumber(userSocialRewardsCached, 2)}
            </span>
          </div>
        </div>
      </div>
      {previousRewards ? (
        <div className="d-flex flex-column gap-2" id="pastnftStaking">
          <span
            className={
              rewardCategory === "nftStaking"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            NFT Staking
          </span>
          <div
            className={
              rewardCategory === "nftStaking"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="d-flex flex-column gap-2">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CAWS</span>
                <span className="item-name-right">
                  ${getFormattedNumber(cawsRewards, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">WoD Land & CAWS </span>
                <span className="item-name-right">
                  ${getFormattedNumber(wodCawsRewards, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis Land</span>
                <span className="item-name-right">
                  ${getFormattedNumber(wodRewards, 2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2" id="nftStaking">
          <span
            className={
              rewardCategory === "nftStaking"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            NFT Staking
          </span>
          <div
            className={
              rewardCategory === "nftStaking"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="d-flex flex-column gap-2">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">CAWS Premium</span>
                <span className="item-name-right">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastdailyBonus" : "dailyBonus"}
      >
        <span
          className={
            rewardCategory === "dailyBonus"
              ? "item-name-title-selected"
              : "item-name-title"
          }
        >
          Daily Bonus
        </span>
        <div
          className={
            rewardCategory === "dailyBonus"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          <div className="d-flex flex-column gap-2">
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">BNB Chain</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(pasttreasureRewardMoney, 2)
                  : getFormattedNumber(treasureRewardMoney, 2)}
              </span>
            </div>
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">SKALE</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(0, 2)
                  : getFormattedNumber(treasureRewardMoneySkale, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastleaderboard" : "leaderboard2"}
      >
        <span
          className={
            rewardCategory === "leaderboard"
              ? "item-name-title-selected"
              : "item-name-title"
          }
        >
          Leaderboard
        </span>
        <div
          className={
            rewardCategory === "leaderboard"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          <div className="d-flex justify-content-between gap-4 align-items-center">
            <div className="d-flex flex-column gap-2 w-50">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">BNB Chain</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(leaderboardTotalData, 2)
                    : getFormattedNumber(
                        dailyplayerData + weeklyplayerData + userRank2,
                        2
                      )}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">SKALE</span>
                <span className="item-name-right">$0.00</span>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 w-50">
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Genesis</span>
                <span className="item-name-right">
                  $
                  {previousRewards
                    ? getFormattedNumber(gemRewards, 2)
                    : getFormattedNumber(genesisData, 2)}
                </span>
              </div>
              <div className="d-flex w-100 justify-content-between gap-2">
                <span className="item-name-left">Kitty Dash</span>
                <span className="item-name-right">
                  $
                  {kittyDashRecords.position > 10
                    ? getFormattedNumber(0, 2)
                    : getFormattedNumber(0, 2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!previousRewards ? (
        <div className="d-flex flex-column gap-2" id="treasurehunt">
          <span
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            Treasure Hunt
          </span>
          <div
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="treasure-hunt-item-wrapper-active">
              <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center justify-content-between gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between col-lg-3">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={cmc} alt="" />
                    CMC
                  </span>
                  <span className="item-name-right">
                    {" "}
                    ${getFormattedNumber(cmcuserEarnUsd, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between col-lg-3">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={skale} alt="" />
                    SKALE
                  </span>
                  <span className="item-name-right">$0.00</span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between col-lg-3">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dypiusPremium} alt="" />
                    Premium
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(dypiusPremiumEarnUsd, 2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2" id="pasttreasurehunt">
          <span
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-title-selected"
                : "item-name-title"
            }
          >
            Treasure Hunt
          </span>
          <div
            className={
              rewardCategory === "treasurehunt"
                ? "item-name-wrapper-selected p-2"
                : "item-name-wrapper p-2"
            }
          >
            <div className="treasure-hunt-item-wrapper">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={base} alt="" />
                    Base
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(baseRewardsUSD, 2)}
                  </span>
                </div>

                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={coingecko} alt="" />
                    CoinGecko
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(coingeckoRewardsUSD, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dypius} alt="" />
                    Dypius
                  </span>
                  <span className="item-name-right">
                    {" "}
                    ${getFormattedNumber(dypiusRewardsUSD, 2)}
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={gate} alt="" />
                    Gate.io
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(gateRewardsUSD, 2)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={conflux} alt="" />
                    Conflux
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(confluxRewardsUSD, 2)}
                  </span>
                </div>

                <div className="d-flex gap-2 align-items-center justify-content-between">
                  <span className="d-flex align-items-center gap-2 item-name-left">
                    <img src={dogeCoin} alt="" />
                    Dogecoin
                  </span>
                  <span className="item-name-right">
                    ${getFormattedNumber(dogeEarnUSD, 2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column gap-2"
        id={previousRewards ? "pastspecialRewards" : "specialRewards"}
      >
        <span
          className={
            rewardCategory === "specialRewards"
              ? "item-name-title-selected"
              : "item-name-title"
          }
        >
          Special Rewards
        </span>
        <div
          className={
            rewardCategory === "specialRewards"
              ? "item-name-wrapper-selected p-2"
              : "item-name-wrapper p-2"
          }
        >
          <div className="d-flex flex-column gap-2">
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">Social Bonus</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(pastSpecialRewards, 2)
                  : getFormattedNumber(userSocialRewardsCached, 2)}
              </span>
            </div>
            <div className="d-flex w-100 justify-content-between gap-2">
              <span className="item-name-left">Rank Bonus</span>
              <span className="item-name-right">
                $
                {previousRewards
                  ? getFormattedNumber(0, 2)
                  : getFormattedNumber(0, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="d-grid rewardstable-wrapper">
        <table className="myrewards-table table">
          <thead>
            <tr>
              <th className="col-3 myrewards-th border-0">Reward Category</th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Available Rewards
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Reward Type
              </th>
              <th className="col-3 myrewards-th border-0 text-center position-relative">
                Total Earned
              </th>
            </tr>
          </thead>

          <tbody className="position-relative myrewards-tbody">
            <tr>
              <td className="myrewards-td-main border-0">
                <img src={nftStake} alt="" style={{ width: 24, height: 24 }} />{" "}
                NFT Staking
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Land
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodRewards, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                WoD Land & CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WETH`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(wodCawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CAWS{" "}
              </td>

              <td className="myrewards-td-second border-0 text-center">
                {`$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {getFormattedNumber(0, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(cawsRewards, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={treasureHunt}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Treasure Hunt
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards &&
                  `$${getFormattedNumber(
                    userEarnUsd + confluxRewardsUSD + gateRewardsUSD,
                    2
                  )}`}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CoinGecko
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(coingeckoRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Conflux Network
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(0 / cfxPrice, 4)} CFX`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(confluxRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Gate.io
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                {previousRewards ? "-" : `$${getFormattedNumber(0, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards ? "-" : `${getFormattedNumber(0, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(gateRewardsUSD, 2)}`}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Base
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(0, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(0, 4)} WETH
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(baseRewardsUSD, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dypius
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(0, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(0, 4)} DYP
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(dypiusRewardsUSD, 2)}
              </td>
            </tr>
            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dogecoin
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(dogeEarnUSD, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(dogeEarnBNB, 2)} DOGE
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                CoinMarketCap
              </td>
              <td className="myrewards-td-second border-0 specialCell text-center">
                ${getFormattedNumber(cmcuserEarnUsd, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(cmcuserEarnETH, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Dypius Premium
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                ${getFormattedNumber(dypiusPremiumEarnUsd, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(dypiusPremiumEarnTokens, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={leaderboard}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Leaderboard
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Daily/Weekly/Monthly
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(
                      dailyplayerData + weeklyplayerData + userRank2,
                      2
                    )}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(
                      (dailyplayerData + weeklyplayerData + userRank2) /
                        bnbPrice,
                      4
                    )} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(leaderboardTotalData, 2)}
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={dailyBonus}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Daily Bonus
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0  paddingLeftCell">
                BNB Chain Treasure Chests
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                {"$" + getFormattedNumber(treasureRewardMoney, 2)}
                
              </td>
              <td className="myrewards-td-second border-0 text-center">
                USD
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {"$" + getFormattedNumber(pasttreasureRewardMoney, 2)}
               
              </td>
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                SKALE Treasure Chests
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                {"$" + getFormattedNumber(treasureRewardMoneySkale, 2)}
                
              </td>
              <td className="myrewards-td-second border-0 text-center">
                USD
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {"$" + getFormattedNumber(0, 2)}
                
              </td>
            </tr>


            <tr>
              <td className="myrewards-td-main border-0">
                <img
                  src={specialRewards}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Special Rewards
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText"></td>
            </tr>
            
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Social Bonus
              </td>
              <td className="myrewards-td-second border-0 specialCell topborder text-center">
                ${getFormattedNumber(userSocialRewardsCached, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(userSocialRewardsCached / bnbPrice, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(pastSpecialRewards, 2)}
              </td>

              
            </tr>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Rank Bonus
              </td>
              <td className="myrewards-td-second border-0 specialCell bottomborder text-center">
                ${getFormattedNumber(0, 2)}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {getFormattedNumber(0, 4)} WBNB
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(0, 2)}
              </td>

              
            </tr>
            <tr>
              <td className="myrewards-td-main border-0">
                {" "}
                <img
                  src={criticalHit}
                  alt=""
                  style={{ width: 24, height: 24 }}
                />
                Critical Hit
              </td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0"></td>
              <td className="myrewards-td-second border-0 previousRewardsText">
                {previousRewards && "$500.00"}
              </td>
            </tr>
            <div className="table-separator"></div>

            <tr>
              <td className="myrewards-td-second border-0 paddingLeftCell">
                Genesis Gem
              </td>
              <td className="myrewards-td-second border-0 specialCell topbottom-border text-center">
                {previousRewards
                  ? "-"
                  : `$${getFormattedNumber(genesisData, 2)}`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                {previousRewards
                  ? "-"
                  : `${getFormattedNumber(genesisData / bnbPrice, 4)} WBNB`}
              </td>
              <td className="myrewards-td-second border-0 text-center">
                ${getFormattedNumber(gemRewards, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-separator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Available Rewards:</span>
            <span className="rightlight-text">
              The amount of rewards available to be withdrawn.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Reward Type:</span>
            <span className="rightlight-text">
              The type of reward distribution.
            </span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text ">Total Earned:</span>
            <span className="rightlight-text">
              The total rewards already distributed.
            </span>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h4
            className={
              previousRewards ? "all-past-total-earned" : "all-total-earned"
            }
          >
            $
            {getFormattedNumber(
              Number(gemRewards) +
                Number(leaderboardTotalData) +
                Number(gateRewardsUSD) +
                Number(confluxRewardsUSD) +
                Number(dypiusRewardsUSD) +
                Number(pastSpecialRewards) +
                Number(coingeckoRewardsUSD) +
                Number(baseRewardsUSD) +
                Number(cawsRewards) +
                Number(wodCawsRewards) +
                Number(pasttreasureRewardMoney) +
                Number(wodRewards),
              2
            )}
          </h4>
          <span
            className={
              previousRewards
                ? "all-past-total-earned-subtitle"
                : "all-total-earned-subtitle"
            }
          >
            Total Earned
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default MyRewardsPopupNew;
