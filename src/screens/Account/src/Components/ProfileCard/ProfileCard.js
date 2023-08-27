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
import viewAllArrow from "../WalletBalance/assets/viewAllArrow.svg";
import ethIcon from "../WalletBalance/assets/ethIcon.svg";
import bnbIcon from "../WalletBalance/assets/bnbIcon.svg";
import avaxIcon from "../WalletBalance/assets/avaxIcon.svg";
import dypIcon from "../WalletBalance/assets/dypIcon.svg";
import { Skeleton } from "@mui/material";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import idyp from "../../Images/userProfile/idyp.svg";
import { NavLink } from "react-router-dom";
import getListedNFTS from "../../../../../actions/Marketplace";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";



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
  dypBalance,
  dypBalancebnb,
  dypBalanceavax,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
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
  ethTokenData,
  dypTokenData,
  favoritesArray,
  latestBoughtNFTS,
  myOffers,
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
  const [filterTitle, setFilterTitle] = useState("Balance");
  const [loading, setLoading] = useState(false);
  const [showNfts, setShowNfts] = useState(false);
  const [favItemsFiltered, setfavItemsFiltered] = useState([]);
  const [collectedItems, setcollectedItems] = useState([]);
  const [favoriteItems, setfavoriteItems] = useState([]);
  const [listedItemsFiltered, setlistedItemsFiltered] = useState([]);
  const [listedItems, setlistedItems] = useState([]);
  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [allListed, setAllListed] = useState([]);
  const [myOffersFiltered, setmyOffersFiltered] = useState([]);
  const [filter1, setFilter1] = useState("all");
  const [filter2, setFilter2] = useState("all");
  const [collectedItemsFiltered, setcollectedItemsFiltered] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [nftItems, setNftItems] = useState([]);
  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);
  const [dailyrecords, setRecords] = useState([]);
  const [portfolio, setPortfolio] = useState(false)







  const getAllnftsListed = async () => {
    const listedNFTS = await getListedNFTS(0, "", "seller", coinbase, "");

    setAllListed(listedNFTS);
  };

  const sortNfts = (sortValue) => {
    if (sortValue === "balance") {
      setFilterTitle("Balance");
    } else if (sortValue === "collected") {
      setFilterTitle("Collected");
    } else if (sortValue === "favorites") {
      setFilterTitle("Favorites");
      getAllFavs();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "listed") {
      setFilterTitle("Listed");
      setLoading(true);
      getListed();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "staked") {
      setFilterTitle("Staked");
      setLoading(true);
      // getStakes();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (sortValue === "eth") {
      setFilterTitle("");
    } else if (sortValue === "offers") {
      setLoading(true);
      setFilterTitle("Offers");
      setmyOffersFiltered(myOffers);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const filterRecentListings = (filter) => {
    setLoadingRecentListings(true);

    if (filterTitle === "Favorites") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_caws_address
        );
        setfavItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setfavItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = favoriteItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setfavItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setfavItemsFiltered(favoriteItems);
      }
    }
    if (filterTitle === "Listed") {
      if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = listedItems.filter(
          (item) =>
            item.nftAddress === window.config.nft_caws_address ||
            item.nftAddress === window.config.nft_cawsold_address
        );
        setlistedItemsFiltered(cawsFilter);
      } else if (filter === "land") {
        setRecentListingsFilter("land");
        let wodFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setlistedItemsFiltered(wodFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = listedItems.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setlistedItemsFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setcollectedItemsFiltered(listedItems);
      }
    }
    if (filterTitle === "Staked") {
      if (filter === "land") {
        setRecentListingsFilter("land");
      } else if (filter === "cawswod") {
        setRecentListingsFilter("cawswod");
      } else if (filter === "all") {
        setRecentListingsFilter("all");
      }
    }
    if (filterTitle === "Offers") {
      if (filter === "land") {
        setRecentListingsFilter("land");
        setRecentListingsFilter("land");
        let timepieceFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_land_address
        );
        setmyOffersFiltered(timepieceFilter);
      } else if (filter === "caws") {
        setRecentListingsFilter("caws");
        let cawsFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_caws_address
        );
        setmyOffersFiltered(cawsFilter);
      } else if (filter === "timepiece") {
        setRecentListingsFilter("timepiece");
        let timepieceFilter = myOffers.filter(
          (item) => item.nftAddress === window.config.nft_timepiece_address
        );
        setmyOffersFiltered(timepieceFilter);
      } else if (filter === "all") {
        setRecentListingsFilter("all");
        setmyOffersFiltered(myOffers);
      }
    }
    setTimeout(() => {
      setLoadingRecentListings(false);
    }, 1000);
  };

  const getListed = async () => {
    let finalItems = [];

    allListed &&
      allListed.length > 0 &&
      allListed.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          nft.isListed = true;
          nft.isStaked = false;
          finalItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          nft.isListed = true;
          finalItems.push(nft);
          nft.isStaked = false;
        }
      });
    setlistedItems(finalItems);
    setlistedItemsFiltered(finalItems);
  };

  const getCollected = async () => {
    var finalTimepieceArray = [];
    let finalLandArray = [];
    let finalCawsArray = [];
    let finalCollection = [];
    let stakeArray = [];
    let recievedOffers = [];

    // console.log(allListed, "allListed");

    //bought [latestBoughtNFTS]
    //listed [listedItems]
    //staked [myWodWodStakes,myCawsWodStakes,landStaked]
    //final [listed, to list, staked]
    if (coinbase) {
      if (myTimepieceCollected && myTimepieceCollected.length > 0) {
        await Promise.all(
          myTimepieceCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_timepiece_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_timepiece_address,
                  tokenId: i,
                  type: "timepiece",
                });
              });
            }

            finalTimepieceArray.push({
              nftAddress: window.config.nft_timepiece_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "timepiece",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_timepiece_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (myLandCollected && myLandCollected.length > 0) {
        await Promise.all(
          myLandCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_land_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_land_address,
                  tokenId: i,
                  type: "land",
                });
              });
            }

            finalLandArray.push({
              nftAddress: window.config.nft_land_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "land",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_land_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (myCawsCollected && myCawsCollected.length > 0) {
        await Promise.all(
          myCawsCollected.map(async (i) => {
            const result = await window
              .getAllOffers(window.config.nft_caws_address, i)
              .catch((e) => {
                console.error(e);
              });

            if (result && result.length > 0) {
              result.map((item) => {
                return recievedOffers.push({
                  offer: item.offer,
                  index: item.index,
                  nftAddress: window.config.nft_caws_address,
                  tokenId: i,
                  type: "caws",
                });
              });
            }

            finalCawsArray.push({
              nftAddress: window.config.nft_caws_address,
              buyer:
                isVerified &&
                email &&
                coinbase &&
                address?.toLowerCase() === coinbase.toLowerCase()
                  ? address
                  : coinbase,
              tokenId: i,
              type: "caws",
              chain: 1,
              isStaked: false,
              isListed: allListed.find(
                (obj) =>
                  obj.tokenId == i &&
                  obj.nftAddress === window.config.nft_caws_address
              )
                ? true
                : false,
            });
          })
        );
      }

      if (myWodWodStakes && myWodWodStakes.length > 0) {
        myWodWodStakes.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_land_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(1, i.name.length),
            type: "land",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }

      if (myCawsWodStakes && myCawsWodStakes.length > 0) {
        myCawsWodStakes.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_caws_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(6, i.name.length),
            type: "caws",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }

      if (landStaked && landStaked.length > 0) {
        landStaked.map((i) => {
          stakeArray.push({
            nftAddress: window.config.nft_land_address,
            buyer:
              isVerified &&
              email &&
              coinbase &&
              address?.toLowerCase() === coinbase.toLowerCase()
                ? address
                : coinbase,
            tokenId: i.name.slice(1, i.name.length),
            type: "land",
            chain: 1,
            isStaked: true,
            isListed: false,
          });
        });
      }
      setmyNftsOffer(recievedOffers);

      finalCollection = [
        ...finalTimepieceArray,
        ...finalLandArray,
        ...finalCawsArray,
        ...stakeArray,
      ];

      setcollectedItems(finalCollection);
      setcollectedItemsFiltered(finalCollection);
    } else {
      setcollectedItems([]);
      setcollectedItemsFiltered([]);
    }
  };

  async function updateViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch("https://api.worldofdypians.com/nft-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId, nftAddress }),
      });
      const data = await response.json();
      console.log(
        `Updated view count for NFT ${tokenId} at address ${nftAddress}: ${data.count}`
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  const getAllFavs = async () => {
    if (favoritesArray && favoritesArray.length > 0) {
      const unique = [...new Set(favoritesArray.map((item) => {}))];
      setfavoriteItems(favoritesArray);
      setfavItemsFiltered(favoritesArray);
    } else {
      setfavoriteItems([]);
      setfavItemsFiltered([]);
    }
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

  const getTwonfts = () => {
    const allnft = [...myCawsWodStakes, ...landStaked];
    setNftItems(allnft);
  };

  const handleSortCollection = (value1, value2) => {
    if (filter1 === "all" && filter2 === "all") {
      setcollectedItemsFiltered(collectedItems);
    } else if (filter1 === "land" && filter2 === "all") {
      let wodFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setcollectedItemsFiltered(wodFilter);
    } else if (filter1 === "timepiece" && filter2 === "all") {
      let timepieceFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setcollectedItemsFiltered(timepieceFilter);
    } else if (filter1 === "caws" && filter2 === "all") {
      let cawsFilter = collectedItems.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      setcollectedItemsFiltered(cawsFilter);
    } else if (filter1 === "all" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === false && item.isStaked === false
      );

      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "all" && filter2 === "has offers") {
      setcollectedItemsFiltered(myNftsOffer);
    } else if (filter1 === "all" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) => item.isListed === true && item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "all" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter((item) => item.isStaked === true);
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "land" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_land_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "caws" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_caws_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "to list") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "has offers") {
      let nftFilter = myNftsOffer.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "listed") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === true &&
          item.isStaked === false
      );
      setcollectedItemsFiltered(nftFilter);
    } else if (filter1 === "timepiece" && filter2 === "in stake") {
      let nftFilter = collectedItems.filter(
        (item) =>
          item.nftAddress === window.config.nft_timepiece_address &&
          item.isListed === false &&
          item.isStaked === true
      );
      setcollectedItemsFiltered(nftFilter);
    }
  };

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
    getTokenData();
    getTokenDataavax();
    getTokenDatabnb();
    getListed();
  }, []);

  useEffect(() => {
    getCollected();
  }, [allListed, coinbase]);

  useEffect(() => {
    handleSortCollection();
  }, [filter1, filter2]);

  useEffect(() => {
    getAllFavs();
  }, [favoritesArray, latestBoughtNFTS]);

  // useEffect(() => {
  //   if (myTimepieceCollected || myCawsCollected || myLandCollected) {
  //     getCollected();
  //   }
  // }, [myTimepieceCollected, myCawsCollected, myLandCollected, coinbase]);

  useEffect(() => {
    getAllnftsListed();
  }, [listedNFTS]);

  useEffect(() => {
    getTwonfts();
  }, [landStaked, myCawsWodStakes]);





  return (
    <>
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
                      className={`tooltip-wrapper p-2 ${tooltip && "tooltip-active"
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
                {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? userRank + 1
                    : "N/A"}
              </span>
              <span className="globaltext">Global</span>
            </div>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
              <img src={genesisImg} alt="" className="genesisimg" />
              <span className="genesistext" style={{ fontSize: 12 }}>
                #
                  {isVerified &&
                  email &&
                  address &&
                  coinbase &&
                  address.toLowerCase() === coinbase.toLowerCase()
                    ? genesisRank + 1
                    : "N/A"}
              </span>
              <span className="genesistext">Genesis</span>
            </div>
            <div className="my-portfolio-btn d-flex flex-column align-items-center gap-2 p-3" onClick={() => setPortfolio(!portfolio)}>
              <img src={multiCaws} className="portfolio-image" alt="" />
              <button className="btn portfolio-btn">My Portfolio</button>
            </div>
          </div>
        </div>
      </div>
      {portfolio &&
      <OutsideClickHandler onOutsideClick={() => setPortfolio(false)}>
           <div className="p-4 portfolio-popup d-flex flex-column gap-2">
       <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <h6 className="event-popup-title mb-0">My Portfolio</h6>
                
              </div>
              <img
                src={require("../WalletBalance/assets/closeMark.svg").default}
                alt=""
                onClick={() => setPortfolio(false)}
                style={{cursor: "pointer"}}
              />
            </div>
      <div className="account-nft-sort-wrapper d-flex align-items-center gap-3 px-3 py-2">
        <h6
          className={`account-nft-sort ${filterTitle === "Balance" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("balance");
            setShowNfts(false);
          }}
        >
          Balance
        </h6>
        <h6
          className={`account-nft-sort ${filterTitle === "Collected" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("collected");
            setShowNfts(false);
          }}
        >
          Collected
        </h6>
        <h6
          className={`account-nft-sort ${filterTitle === "Favorites" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("favorites");
            setShowNfts(false);
          }}
        >
          Favorites
        </h6>
        <h6
          className={`account-nft-sort ${filterTitle === "Listed" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("listed");
            setShowNfts(false);
          }}
        >
          Listed
        </h6>
        <h6
          className={`account-nft-sort ${filterTitle === "Staked" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("staked");
            setShowNfts(false);
          }}
        >
          Staked
        </h6>

        <h6
          className={`account-nft-sort ${filterTitle === "Offers" && "nft-sort-selected"
            } `}
          onClick={() => {
            sortNfts("offers");
            setShowNfts(false);
          }}
        >
          Offers made
        </h6>
      </div>

      {filterTitle === "Favorites" && loading === false && (
        <div
          className="row px-3"
          style={{ margin: favoriteItems.length === 0 ? "auto" : 0 }}
        >
          {favoriteItems.length > 0 &&
            favoriteItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type:
                    item.nftAddress === window.config.nft_caws_address
                      ? "caws"
                      : item.nftAddress ===
                        window.config.nft_land_address
                        ? "land"
                        : "timepiece",
                  isOwner:
                    isVerified && email
                      ? item.buyer
                        ? item.buyer?.toLowerCase() ===
                          address?.toLowerCase()
                          ? item.buyer?.toLowerCase() ===
                          coinbase?.toLowerCase()
                          : item.seller?.toLowerCase() ===
                          address?.toLowerCase()
                        : item.seller?.toLowerCase() ===
                        coinbase?.toLowerCase()
                      : false,
                  chain: 1,
                }}
                onClick={() => {
                  updateViewCount(item.tokenId, item.nftAddress);
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <img
                      src={
                        item.nftAddress ===
                          window.config.nft_cawsold_address ||
                          item.nftAddress ===
                          window.config.nft_caws_address
                          ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                          : item.nftAddress ===
                            window.config.nft_land_address
                            ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.nftAddress ===
                          window.config.nft_cawsold_address ||
                          item.nftAddress ===
                          window.config.nft_caws_address
                          ? "CAWS"
                          : item.nftAddress ===
                            window.config.nft_land_address
                            ? "Genesis Land"
                            : "CAWS Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                      {/* <span className="account-nft-type">
                    {item.nftAddress ===
                      window.config.nft_cawsold_address ||
                    item.nftAddress === window.config.nft_caws_address
                      ? "CAWS"
                      : item.nftAddress ===
                        window.config.nft_land_address
                      ? "Genesis Land"
                      : "Timepiece"}
                  </span> */}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {favoriteItems.length === 0 && coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              You do not have any favorite NFTs
            </span>
          )}
          {favoriteItems.length === 0 && !coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              Connect your wallet to view your favorite NFTs.
            </span>
          )}

          {/* {favoriteItems.length < 6 &&
        emptyArray
          .slice(0, 6 - favoriteItems.length)
          .map((item, index) => (
            <NavLink
              key={index}
              to={`/marketplace`}
              style={{ textDecoration: "none" }}
              className="col-12 col-lg-6 col-xxl-4 mb-3"
            >
              <div className="">
                <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                  <img
                    src={
                      index % 2 !== 0
                        ? accountEmptyCaws
                        : accountEmptyLand
                    }
                    alt=""
                    className="account-card-img"
                  />
                  <div className="d-flex flex-column align-items-start justify-content-center">
                    <span
                      className="account-nft-type"
                      style={{ width: "80%" }}
                    >
                      {index % 2 !== 0
                        ? "Get your CAWS NFT from the WoD Game Shop"
                        : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))} */}
        </div>
      )}

      {filterTitle === "Offers" && loading === false && (
        <div
          className="row px-3"
          style={{ margin: myOffers.length === 0 ? "auto" : 0 }}
        >
          {myOffers.length > 0 &&
            myOffers.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type: item.type,
                  isOwner:
                    item.offer.buyer?.toLowerCase() ===
                    coinbase?.toLowerCase(),
                  chain: 1,
                }}
                onClick={() => {
                  updateViewCount(item.tokenId, item.nftAddress);
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <img
                      src={
                        item.type === "caws"
                          ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                          : item.type === "land"
                            ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.type === "caws"
                          ? "CAWS"
                          : item.type === "land"
                            ? "Genesis Land"
                            : "CAWS Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {myOffers.length === 0 && coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              You have not made any offers
            </span>
          )}
          {myOffers.length === 0 && !coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              Connect your wallet to view the offers you have made.
            </span>
          )}
        </div>
      )}

      {filterTitle === "Collected" && loading === false && (
        <div
          className="row px-3"
          style={{ margin: collectedItems.length === 0 ? "auto" : 0 }}
        >
          {collectedItems.length > 0 &&
            collectedItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={
                  item.isStaked === true
                    ? `/marketplace/stake`
                    : `/marketplace/nft/${item.tokenId}/${item.nftAddress}`
                }
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type:
                    item.nftAddress === window.config.nft_caws_address
                      ? "caws"
                      : item.nftAddress ===
                        window.config.nft_land_address
                        ? "land"
                        : "timepiece",
                  isOwner:
                    (item.buyer &&
                      item.buyer.toLowerCase() ===
                      coinbase?.toLowerCase()) ||
                    (item.seller &&
                      item.seller.toLowerCase() ===
                      coinbase?.toLowerCase()),
                  chain: item.chain,
                }}
                onClick={() => {
                  updateViewCount(item.tokenId, item.nftAddress);
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <img
                      src={
                        item.type === "caws"
                          ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                          : item.type === "land"
                            ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.type === "caws"
                          ? "CAWS"
                          : item.type === "land"
                            ? "Genesis"
                            : "Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                      {/* <span className="account-nft-type">
                    {item.type === "caws"
                      ? "CAWS"
                      : item.type === "land"
                      ? "Land"
                      : "CAWS Timepiece"}
                  </span> */}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {collectedItems.length === 0 && coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              You do not have any NFTs in your wallet
            </span>
          )}

          {collectedItems.length === 0 && !coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              Connect your wallet to view your NFTs.
            </span>
          )}

          {/* {collectedItems.length < 6 &&
        emptyArray
          .slice(0, 6 - collectedItems.length)
          .map((item, index) => (
            <NavLink
              key={index}
              to={`/marketplace`}
              style={{ textDecoration: "none" }}
              className="col-12 col-lg-6 col-xxl-4 mb-3"
            >
              <div className="">
                <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                  <img
                    src={
                      index % 2 !== 0
                        ? accountEmptyCaws
                        : accountEmptyLand
                    }
                    alt=""
                    className="account-card-img"
                  />
                  <div className="d-flex flex-column align-items-start justify-content-center">
                    <span
                      className="account-nft-type"
                      style={{ width: "80%" }}
                    >
                      {index % 2 !== 0
                        ? "Get your CAWS NFT from the WoD Game Shop"
                        : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))} */}
        </div>
      )}

      {filterTitle === "Staked" && loading === false && (
        <div
          className="row px-3"
          style={{
            margin:
              myCawsWodStakes.length === 0 && landStaked.length === 0
                ? "auto"
                : 0,
          }}
        >
          {landStaked &&
            landStaked.length > 0 &&
            landStaked.slice(0, 4).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/stake`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-6 mb-3"
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <img
                      src={`https://mint.worldofdypians.com/thumbs50/${item.name?.slice(
                        1,
                        landStaked[index].name?.length
                      )}.png`}
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {"Genesis"} {item.name}
                      </h6>
                      {/* <span className="account-nft-type">{"Land"}</span> */}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {myCawsWodStakes &&
            myCawsWodStakes.length > 0 &&
            myCawsWodStakes.slice(0, 4).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/stake`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-6 mb-3"
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <div className="d-flex">
                      <img
                        src={`https://mint.worldofdypians.com/thumbs50/${myWodWodStakes[
                          index
                        ].name?.slice(
                          1,
                          myWodWodStakes[index].name?.length
                        )}.png`}
                        alt=""
                        className="account-card-img"
                      />
                      <img
                        src={`https://mint.dyp.finance/thumbs50/${item.name?.slice(
                          6,
                          item.name?.length
                        )}.png`}
                        alt=""
                        className="account-card-img"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start justify-content-center">
                      <h6 className="account-nft-title">
                        Genesis Land {myWodWodStakes[index].name}
                      </h6>
                      <h6 className="account-nft-title">{item.name}</h6>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {myCawsWodStakes.length === 0 &&
            coinbase &&
            landStaked.length === 0 && (
              <span
                className="seller-addr"
                style={{ textAlign: "center" }}
              >
                You do not have any NFTs in stake
              </span>
            )}
          {myCawsWodStakes.length === 0 && !coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              Connect your wallet to view your staked NFTs.
            </span>
          )}

          {/* {myCawsWodStakes.length + landStaked.length < 6 &&
        emptyArray
          .slice(0, 4 - myCawsWodStakes.length + landStaked.length)
          .map((item, index) => (
            <NavLink
              key={index}
              to={`/marketplace`}
              style={{ textDecoration: "none" }}
              className="col-12 col-lg-6 col-xxl-6 mb-3"
            >
              <div className="">
                <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={accountEmptyLand}
                      alt=""
                      className="account-card-img"
                    />
                    <img
                      src={accountEmptyCaws}
                      alt=""
                      className="account-card-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-center">
                    <span
                      className="account-nft-type"
                      style={{ width: "80%" }}
                    >
                      Get your CAWS NFT & Land NFT from the WoD Game
                      Shop
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))} */}
        </div>
      )}

      {filterTitle === "Listed" && loading === false && (
        <div
          className="row px-3"
          style={{ margin: listedItems.length === 0 ? "auto" : 0 }}
        >
          {listedItems.length > 0 &&
            listedItems.slice(0, 6).map((item, index) => (
              <NavLink
                key={index}
                to={`/marketplace/nft/${item.tokenId}/${item.nftAddress}`}
                style={{ textDecoration: "none" }}
                className="col-12 col-lg-6 col-xxl-4 mb-3"
                state={{
                  nft: item,
                  type: item.type,
                  isOwner:
                    item.seller &&
                    item.seller.toLowerCase() ===
                    coinbase?.toLowerCase(),
                  chain: item.chain,
                }}
                onClick={() => {
                  updateViewCount(item.tokenId, item.nftAddress);
                }}
              >
                <div className="">
                  <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                    <img
                      src={
                        item.type === "caws"
                          ? `https://mint.dyp.finance/thumbs50/${item.tokenId}.png`
                          : item.type === "land"
                            ? `https://mint.worldofdypians.com/thumbs50/${item.tokenId}.png`
                            : `https://timepiece.worldofdypians.com/thumbs50/${item.tokenId}.png`
                      }
                      alt=""
                      className="account-card-img"
                    />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <h6 className="account-nft-title">
                        {item.type === "caws"
                          ? "CAWS"
                          : item.type === "land"
                            ? "Genesis Land"
                            : "CAWS Timepiece"}{" "}
                        #{item.tokenId}
                      </h6>
                      {/* <span className="account-nft-type">
                    {item.type === "caws"
                      ? "CAWS"
                      : item.type === "land"
                      ? "Genesis Land"
                      : "Timepiece"}
                  </span> */}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          {listedItems.length === 0 && coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              You do not have any listed NFTs
            </span>
          )}
          {listedItems.length === 0 && !coinbase && (
            <span
              className="seller-addr"
              style={{ textAlign: "center" }}
            >
              Connect your wallet to view your listed NFTs.
            </span>
          )}
          {/* {listedItems.length < 6 &&
        emptyArray
          .slice(0, 6 - listedItems.length)
          .map((item, index) => (
            <NavLink
              key={index}
              to={`/marketplace`}
              style={{ textDecoration: "none" }}
              className="col-12 col-lg-6 col-xxl-4 mb-3"
            >
              <div className="">
                <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                  <img
                    src={
                      index % 2 !== 0
                        ? accountEmptyCaws
                        : accountEmptyLand
                    }
                    alt=""
                    className="account-card-img"
                  />
                  <div className="d-flex flex-column align-items-start justify-content-center">
                    <span
                      className="account-nft-type"
                      style={{ width: "80%" }}
                    >
                      {index % 2 !== 0
                        ? "Get your CAWS NFT from the WoD Game Shop"
                        : "Get your World of Dypians Land NFT from the WoD Game Shop"}
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))} */}
        </div>
      )}

      {filterTitle === "Balance" && loading === false && (
        <div className="d-flex flex-column align-items-center balancewrapper3">
          <div className="d-flex flex-column flex-lg-row w-100 gap-1  justify-content-between">
            <div className="d-flex py-2 align-items-center gap-2 position-relative  col-12 col-lg-2">
              <img src={ethIcon} alt="" className="" />
              <span className="eth-chain-text">Ethereum</span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img src={dypIcon} alt="dyp" className="dyp-icon" />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(dypBalance, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                ${getFormattedNumber(dypBalance * dyptokenData, 2)}
              </span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={idyp}
                  alt="dyp"
                  className="dyp-icon"
                  style={{ height: 16, width: 16 }}
                />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(idypBalance, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                ${getFormattedNumber(idypBalance * idyptokenData, 2)}
              </span>
            </div>
          </div>
          <div className="balanceseparator"></div>
          <div className="d-flex flex-column flex-lg-row w-100 gap-1 col-lg-12 justify-content-between">
            <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-2">
              <img src={bnbIcon} alt="" className="" />
              <span className="bnb-chain-text">BNB Chain</span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img src={dypIcon} alt="dyp" className="dyp-icon" />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(dypBalancebnb, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                $
                {getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
              </span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={idyp}
                  alt="dyp"
                  className="dyp-icon"
                  style={{ height: 16, width: 16 }}
                />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(idypBalancebnb, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                $
                {getFormattedNumber(
                  idypBalancebnb * idyptokenDatabnb,
                  2
                )}
              </span>
            </div>
          </div>
          <div className="balanceseparator"></div>
          <div className="d-flex flex-column flex-lg-row w-100 gap-1 col-lg-12 justify-content-between">
            <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-2">
              <img src={avaxIcon} alt="" className="" />
              <span className="avax-chain-text">Avalanche</span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img src={dypIcon} alt="dyp" className="dyp-icon" />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(dypBalanceavax, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                $
                {getFormattedNumber(
                  dypBalanceavax * dyptokenDataAvax,
                  2
                )}
              </span>
            </div>
            <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={idyp}
                  alt="dyp"
                  className="dyp-icon"
                  style={{ height: 16, width: 16 }}
                />
                <h6 className="wallet-amount mb-0">
                  {getFormattedNumber(idypBalanceavax, 2)}
                </h6>
              </div>
              <span
                className="nft-price-usd"
                style={{ color: "#7DD9AF" }}
              >
                $
                {getFormattedNumber(
                  idypBalanceavax * idyptokenDataAvax,
                  2
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {filterTitle !== "Balance" &&
        loading === false &&
        ((filterTitle === "Collected" && collectedItems.length > 0) ||
          (filterTitle === "Listed" && listedItems.length > 0) ||
          (filterTitle === "Offers" && myOffers.length > 6) ||
          (filterTitle === "Staked" &&
            myCawsWodStakes.length + landStaked.length > 4) ||
          (filterTitle === "Favorites" &&
            favoriteItems.length > 0)) && (
          <div
            className="row w-100 justify-content-center position-relative"
            style={{ top: "-12px" }}
          >
            {filterTitle === "Collected" &&
              collectedItems.length >= 3 ? (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowNfts(!showNfts);
                }}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <span className="account-view-all">
                  {showNfts ? "View Less" : "View All"}
                </span>
                <img
                  src={viewAllArrow}
                  style={{ rotate: showNfts ? "0deg" : "180deg" }}
                  alt=""
                />
              </div>
            ) : filterTitle === "Favorites" &&
              favItemsFiltered.length > 6 ? (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowNfts(!showNfts);
                }}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <span className="account-view-all">
                  {showNfts ? "View Less" : "View All"}
                </span>
                <img
                  src={viewAllArrow}
                  style={{ rotate: showNfts ? "0deg" : "180deg" }}
                  alt=""
                />
              </div>
            ) : filterTitle === "Offers" &&
              favItemsFiltered.length > 6 ? (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowNfts(!showNfts);
                }}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <span className="account-view-all">
                  {showNfts ? "View Less" : "View All"}
                </span>
                <img
                  src={viewAllArrow}
                  style={{ rotate: showNfts ? "0deg" : "180deg" }}
                  alt=""
                />
              </div>
            ) : filterTitle === "Listed" &&
              listedItemsFiltered.length > 6 ? (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowNfts(!showNfts);
                }}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <span className="account-view-all">
                  {showNfts ? "View Less" : "View All"}
                </span>
                <img
                  src={viewAllArrow}
                  style={{ rotate: showNfts ? "0deg" : "180deg" }}
                  alt=""
                />
              </div>
            ) : filterTitle === "Staked" &&
              myCawsWodStakes.length > 6 ? (
              <div
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowNfts(!showNfts);
                }}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <span className="account-view-all">
                  {showNfts ? "View Less" : "View All"}
                </span>
                <img
                  src={viewAllArrow}
                  style={{ rotate: showNfts ? "0deg" : "180deg" }}
                  alt=""
                />
              </div>
            ) : null}
          </div>
        )}

      {loading === true && (
        // <div className="loader-wrapper">
        //   <HashLoader
        //     color={"#554fd8"}
        //     loading={loading}
        //     cssOverride={override}
        //     aria-label="Loading Spinner"
        //     data-testid="loader"
        //   />
        // </div>
        <div className="row justify-content-center px-3">
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-4 mb-3">
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </div>
        </div>
      )}
    </div>
      </OutsideClickHandler>
      }
    </>
  );
};

export default ProfileCard;
