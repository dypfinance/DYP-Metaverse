import React, { useState, useEffect, useRef } from "react";
import "./_walletbalance.scss";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import avaxIcon from "./assets/avaxIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import idyp from "../../Images/userProfile/idyp.svg";
import globalRank from "./assets/globalRank.svg";
import genesisImg from "./assets/genesisRank.svg";
import axios from "axios";
import viewAllArrow from "./assets/viewAllArrow.svg";
import { NavLink } from "react-router-dom";
import getListedNFTS from "../../../../../actions/Marketplace";
import { getAllNfts } from "../../../../../actions/convertUsd";
import { HashLoader } from "react-spinners";
import nextArrow from "../../../../Marketplace/assets/nextArrow1.svg";
import Slider from "react-slick";
import ItemCard from "../../../../../components/ItemCard/ItemCard";
import CawsWodItem from "../../../../../components/ItemCard/CawsWodItem";
import accountEmptyCaws from "./assets/accountEmptyCaws.svg";
import accountEmptyLand from "./assets/accountEmptyLand.svg";
import filterIcon from "./assets/filterIcon.svg";
import emptyCheck from "./assets/emptyCheck.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";
import Pagination from "@mui/material/Pagination";
import { Skeleton } from "@mui/material";
import eventPopupImage from "./assets/eventPopupImage.png";

import ActiveProfileEvent from "./ActiveProfileEvent";
import UpcomingProfileEvent from "./UpcomingProfileEvent";
import ExpiredProfileEvent from "./ExpiredProfileEvent";
import OutsideClickHandler from "react-outside-click-handler";

const WalletBalance = ({
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
}) => {
  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  const [dailyrecords, setRecords] = useState([]);
  const [recentListingsFilter, setRecentListingsFilter] = useState("all");
  const [collectedItemsFiltered, setcollectedItemsFiltered] = useState([]);

  const [favItemsFiltered, setfavItemsFiltered] = useState([]);
  const [favoriteItems, setfavoriteItems] = useState([]);

  const [listedItemsFiltered, setlistedItemsFiltered] = useState([]);
  const [listedItems, setlistedItems] = useState([]);

  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [filterTitle, setFilterTitle] = useState("Balance");
  const [nftItems, setNftItems] = useState([]);

  const [collectedItems, setcollectedItems] = useState([]);
  const [showNfts, setShowNfts] = useState(false);
  const [activeSlide, setActiveSlide] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingRecentListings, setLoadingRecentListings] = useState(false);
  const [allListed, setAllListed] = useState([]);

  const [filter1, setFilter1] = useState("all");
  const [filter2, setFilter2] = useState("all");
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [favoritesSliceValue, setFavoritesSliceValue] = useState(9);
  const [listedPage, setListedPage] = useState(1);
  const [listedPageSlice, setListedPageSlice] = useState(9);
  const [collectedPage, setCollectedPage] = useState(1);
  const [collectedPageSlice, setCollectedPageSlice] = useState(9);
  const [stakedPage, setStakedPage] = useState(1);
  const [stakedPageSlice, setStakedPageSlice] = useState(9);
  const [offersPageSlice, setoffersPageSlice] = useState(9);
  const [offersPage, setoffersPage] = useState(1);
  const [myOffersFiltered, setmyOffersFiltered] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [eventPopup, setEventPopup] = useState(false);

  const handleFavoritesPage = (e, value) => {
    setFavoritesPage(value);
    setFavoritesSliceValue(value * 9);
  };
  const handleListedPage = (e, value) => {
    setListedPage(value);
    setListedPageSlice(value * 9);
  };
  const handleCollectedPage = (e, value) => {
    setCollectedPage(value);
    setCollectedPageSlice(value * 9);
  };

  const handleOffersPage = (value) => {
    setoffersPageSlice(value * 9);
    setoffersPage(value);
  };
  const handleStakedPage = (e, value) => {
    setStakedPage(value);
    setStakedPageSlice(value * 9);
  };

  const firstSlider = useRef();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

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

  const dummyConflux = {
    title: "Conflux Pass",
    chain: "Conflux Network",
    linkState: "conflux",
    rewards: "CFX",
    status: "Live",
  };
  const dummyCoingecko = {
    title: "Coingecko Pass",
    chain: "BNB Chain",
    linkState: "coingecko",
    rewards: "BNB",
    status: "Comming Soon",
  };
  const dummyCoin98 = {
    title: "Coin98 Pass",
    chain: "BNB Chain",
    linkState: "coin98",
    rewards: "BNB",
    status: "Expired",
  };
  const dummyBase = {
    title: "Base Pass",
    chain: "BNB Chain",
    linkState: "base",
    rewards: "CFX",
    status: "Expired",
  };

  const [dummyEvent, setDummyEvent] = useState({});

  return (
    <>
      <div className="main-wrapper py-4 w-100 d-flex flex-column gap-4 mt-5 mt-xxl-0 mt-lg-0 justify-content-center align-items-center">
        <div className="row w-100 gap-5 gap-lg-0">
          <h6 className="profile-wrapper-title mb-2">Special Events</h6>
          <div className="col-12 mb-3 rankings-outer-wrapper px-0 px-lg-3 col-lg-12">
            <div className="nft-outer-wrapper rankings-wrapper p-4  d-flex flex-column justify-content-center gap-2 position-relative custom-height-2">
              {/* <h5 className="bal-txt px-4">My Rankings</h5> */}
              {/* <div className={`d-flex gap-3 justify-content-evenly `}>
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
            </div> */}
              <div className="profile-events-wrapper">
                <ActiveProfileEvent
                  onOpenEvent={() => {
                    setDummyEvent(dummyConflux);
                    setEventPopup(true);
                  }}
                />
                <UpcomingProfileEvent
                  onOpenEvent={() => {
                    setDummyEvent(dummyCoingecko);
                    setEventPopup(true);
                  }}
                />
                <ExpiredProfileEvent
                  onOpenEvent={() => {
                    setDummyEvent(dummyCoin98);
                    setEventPopup(true);
                  }}
                />
                <ExpiredProfileEvent
                  onOpenEvent={() => {
                    setDummyEvent(dummyBase);
                    setEventPopup(true);
                  }}
                />
                {/* <div className="w-100 d-flex justify-content-center">
              <div
                      className="d-flex align-items-center justify-content-center gap-2"
                    
                      style={{ cursor: "pointer", width: "fit-content" }}
                    >
                      <span className="account-view-all">
                        View More
                      </span>
                      <img
                        src={viewAllArrow}
                        style={{rotate: "180deg"}}
                        alt=""
                      />
                    </div>
              </div> */}
              </div>
            </div>
          </div>
          {/* <h6 className="profile-wrapper-title mb-2">My Portfolio</h6>

          <div className="col-12 px-0 px-lg-3 col-lg-12">
            <div className=" nft-outer-wrapper p-4  d-flex flex-column gap-2 position-relative custom-height-2">
              <div className="account-nft-sort-wrapper d-flex align-items-center gap-3 px-3 py-2">
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Balance" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("balance");
                    setShowNfts(false);
                  }}
                >
                  Balance
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Collected" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("collected");
                    setShowNfts(false);
                  }}
                >
                  Collected
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Favorites" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("favorites");
                    setShowNfts(false);
                  }}
                >
                  Favorites
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Listed" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("listed");
                    setShowNfts(false);
                  }}
                >
                  Listed
                </h6>
                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Staked" && "nft-sort-selected"
                  } `}
                  onClick={() => {
                    sortNfts("staked");
                    setShowNfts(false);
                  }}
                >
                  Staked
                </h6>

                <h6
                  className={`account-nft-sort ${
                    filterTitle === "Offers" && "nft-sort-selected"
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
          </div> */}
        </div>
        {showNfts && (
          <div
            className="d-flex row mx-1 flex-column align-items-start nft-outer-wrapper position-relative p-3 p-lg-5 gap-2 col-lg-11"
            style={{ minHeight: "420px" }}
          >
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-end w-100 position-relative">
              {filterTitle !== "Staked" && filterTitle !== "Collected" ? (
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "caws" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("caws")}
                  >
                    CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("land")}
                  >
                    Land
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "timepiece" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("timepiece")}
                  >
                    Timepiece
                  </h6>
                </div>
              ) : filterTitle === "Staked" ? (
                <div className="d-flex align-items-center gap-4">
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "all" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("all")}
                  >
                    All
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "cawswod" && "filter-selected"
                    }`}
                    onClick={() => filterRecentListings("cawswod")}
                  >
                    Land+CAWS
                  </h6>
                  <h6
                    className={`filter-title ${
                      recentListingsFilter === "land" && "filter-selected"
                    }`}
                    onClick={() => {
                      filterRecentListings("land");
                    }}
                  >
                    Land
                  </h6>
                </div>
              ) : (
                <div className="d-flex flex-column mb-3 flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-0 justify-content-between w-100 position-relative">
                  <span className="totalcollection">
                    Total NFTs: {collectedItemsFiltered.length}
                  </span>
                  <div className="d-flex gap-3 align-items-center">
                    <div class="dropdown" style={{ width: "150px" }}>
                      <button
                        class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="filter-nav-title mb-0">
                            {filter1 === "" ? "Collections" : filter1}
                          </h6>
                        </div>
                        <img src={dropdownIcon} alt="" />
                      </button>
                      <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("all");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>All</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("land");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Land</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("caws");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>CAWS</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter1("timepiece");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Timepiece</span>
                        </li>
                      </ul>
                    </div>

                    <div class="dropdown" style={{ width: "150px" }}>
                      <button
                        class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="filter-nav-title mb-0">
                            {filter2 === "" ? "Status" : filter2}
                          </h6>
                        </div>
                        <img src={dropdownIcon} alt="" />
                      </button>
                      <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("all");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>All</span>
                        </li>
                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("has offers");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Has offers</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("to list");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>To List</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("listed");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>Listed</span>
                        </li>

                        <li
                          className="nft-dropdown-item"
                          onClick={() => {
                            setFilter2("in stake");
                            handleSortCollection();
                            setFavoritesPage(1);
                            setListedPage(1);
                            setCollectedPage(1);
                            setStakedPage(1);
                          }}
                        >
                          <span>In Stake</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {loadingRecentListings === false && filterTitle === "Collected" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {collectedItemsFiltered &&
                    collectedItemsFiltered.length > 0 &&
                    collectedItemsFiltered
                      .slice(collectedPageSlice - 9, collectedPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={
                            nft.isStaked === true
                              ? `/marketplace/stake`
                              : `/marketplace/nft/${nft.tokenId}/${nft.nftAddress}`
                          }
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft.nftAddress === window.config.nft_caws_address
                                ? "caws"
                                : nft.nftAddress ===
                                  window.config.nft_land_address
                                ? "land"
                                : "timepiece",
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                  window.config.nft_caws_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                  window.config.nft_caws_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(collectedItemsFiltered.length / 9)}
                    page={collectedPage}
                    onChange={(e, value) => {
                      handleCollectedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Offers" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {myOffersFiltered &&
                    myOffersFiltered.length > 0 &&
                    myOffersFiltered
                      .slice(offersPageSlice - 9, offersPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type: nft.type,
                            isOwner:
                              nft.offer.buyer.toLowerCase() ===
                              coinbase?.toLowerCase(),
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.type === "caws"
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.type === "land"
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.type === "caws"
                                    ? "CAWS"
                                    : nft.type === "land"
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(myOffersFiltered.length / 9)}
                    page={offersPage}
                    onChange={(e, value) => {
                      handleOffersPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false &&
              filterTitle === "Favorites" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {favItemsFiltered &&
                    favItemsFiltered.length > 0 &&
                    favItemsFiltered
                      .slice(favoritesSliceValue - 9, favoritesSliceValue)
                      .map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft.type ??
                              nft.nftAddress === window.config.nft_caws_address
                                ? "caws"
                                : nft.nftAddress ===
                                  window.config.nft_land_address
                                ? "land"
                                : "timepiece",
            
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
                    
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(favItemsFiltered.length / 9)}
                    page={favoritesPage}
                    onChange={(e, value) => {
                      handleFavoritesPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Listed" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {listedItemsFiltered &&
                    listedItemsFiltered.length > 0 &&
                    listedItemsFiltered
                      .slice(listedPageSlice - 9, listedPageSlice)
                      .map((nft, index) => (
                        <NavLink
                          to={`/marketplace/nft/${nft.tokenId}/${nft.nftAddress}`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          state={{
                            nft: nft,
                            type:
                              nft.type ??
                              nft.nftAddress === window.config.nft_caws_address
                                ? "caws"
                                : nft.nftAddress ===
                                  window.config.nft_land_address
                                ? "land"
                                : "timepiece",
                  
                            isOwner:
                              (nft.buyer &&
                                nft.buyer.toLowerCase() ===
                                  coinbase?.toLowerCase()) ||
                              (nft.seller &&
                                nft.seller.toLowerCase() ===
                                  coinbase?.toLowerCase()),
                            chain: nft.chain,
                            chain: 1,
                          }}
                          onClick={() => {
                            updateViewCount(nft.tokenId, nft.nftAddress);
                          }}
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <img
                                src={
                                  nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? `https://mint.dyp.finance/thumbs50/${nft.tokenId}.png`
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? `https://mint.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                    : `https://timepiece.worldofdypians.com/thumbs50/${nft.tokenId}.png`
                                }
                                alt=""
                                className="account-card-img"
                              />
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  {nft.nftAddress ===
                                    window.config.nft_cawsold_address ||
                                  nft.nftAddress ===
                                    window.config.nft_caws_address
                                    ? "CAWS"
                                    : nft.nftAddress ===
                                      window.config.nft_land_address
                                    ? "Genesis Land"
                                    : "CAWS Timepiece"}{" "}
                                  #{nft.tokenId}
                                </h6>
             
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(listedItemsFiltered.length / 9)}
                    page={listedPage}
                    onChange={(e, value) => {
                      handleListedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : loadingRecentListings === false && filterTitle === "Staked" ? (
              <div
                className="container d-flex flex-column justify-content-between"
                style={{ minHeight: "280px", maxHeight: "fit-content" }}
              >
                <div className="row px-3">
                  {recentListingsFilter === "cawswod"
                    ? myCawsWodStakes &&
                      myCawsWodStakes.length > 0 &&
                      myCawsWodStakes
                        .slice(stakedPageSlice - 9, stakedPageSlice)
                        .map((nft, index) => (
                          <NavLink
                            to={`/marketplace/stake`}
                            style={{ textDecoration: "none" }}
                            key={index}
                            className="col-12 col-lg-6 col-xxl-4 mb-3"
                          >
                            <div className="">
                              <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                                <div className="d-flex">
                                  <img
                                    src={nft.image}
                                    alt=""
                                    className="account-card-img"
                                  />
                                  <img
                                    src={myWodWodStakes[index].image}
                                    alt=""
                                    className="account-card-img"
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <h6 className="account-nft-title">
                                    Land {myWodWodStakes[index].name}
                                  </h6>
                                  <h6 className="account-nft-title">
                                    {nft.name}
                                  </h6>
                                </div>
                              </div>
                            </div>
            
                          </NavLink>
                        ))
                    : recentListingsFilter === "land"
                    ? landStaked &&
                      landStaked.length > 0 &&
                      landStaked.map((nft, index) => (
                        <NavLink
                          to={`/marketplace/stake`}
                          style={{ textDecoration: "none" }}
                          key={index}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                        >
                          <div className="">
                            <div className="account-nft-card w-100 d-flex align-items-center gap-3">
                              <div className="d-flex">
                                <img
                                  src={nft.image}
                                  alt=""
                                  className="account-card-img"
                                />
                              </div>
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <h6 className="account-nft-title">
                                  Land {nft.name}
                                </h6>
                   
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      ))
                    : nftItems &&
                      nftItems.length > 0 &&
                      nftItems.map((nft, index) => (
                        <NavLink
                          to={`/marketplace/stake`}
                          style={{ textDecoration: "none" }}
                          className="col-12 col-lg-6 col-xxl-4 mb-3"
                          key={index}
                        >
                          <CawsWodItem
                            cawsImg={nft?.name.includes("CAWS") && nft?.image}
                            wodImg={myWodWodStakes[index]?.image ?? nft?.image}
                            cawsName={nft?.name.includes("CAWS") && nft?.name}
                            wodName={myWodWodStakes[index]?.name ?? nft?.name}
                          />
                        </NavLink>
                      ))}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    color="primary"
                    count={Math.ceil(myCawsWodStakes.length / 9)}
                    page={stakedPage}
                    onChange={(e, value) => {
                      handleStakedPage(e, value);
                    }}
                  />
                </div>
              </div>
            ) : (
      
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
        )}
      </div>
      {eventPopup && (
        <OutsideClickHandler onOutsideClick={() => setEventPopup(false)}>
          <div className="profile-event-popup p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <h6 className="event-popup-title mb-0">{dummyEvent?.title}</h6>
                <div className="event-popup-status d-flex align-items-center justify-content-center p-1">
                  <span className="mb-0">{dummyEvent?.status}</span>
                </div>
              </div>
              <img
                src={require("./assets/closeMark.svg").default}
                alt=""
                onClick={() => setEventPopup(false)}
              />
            </div>
            <div className="profile-event-popup-wrapper p-3 d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <img src={eventPopupImage} alt="" />
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column">
                    <h6 className="popup-second-title">{dummyEvent?.title}</h6>
                    <span className="popup-rewards">
                      $5,000 in {dummyEvent?.rewards} rewards
                    </span>
                  </div>
                  <span className="event-popup-chain mb-0">
                    Chain: {dummyEvent?.chain}
                  </span>
                </div>
              </div>
              {dummyEvent?.status === "Live" && (
                <div className="d-flex align-items-start gap-1">
                  <div className="d-flex flex-column align-items-center gap-3">
                    <h6
                      className="profile-time-number mb-0"
                      style={{ fontSize: "24px" }}
                    >
                      14
                    </h6>
                    <span
                      className="profile-time-desc mb-0"
                      style={{ fontSize: "18px" }}
                    >
                      Days
                    </span>
                  </div>
                  <h6
                    className="profile-time-number mb-0"
                    style={{ fontSize: "24px" }}
                  >
                    :
                  </h6>
                  <div className="d-flex flex-column align-items-center gap-3">
                    <h6
                      className="profile-time-number mb-0"
                      style={{ fontSize: "24px" }}
                    >
                      23
                    </h6>
                    <span
                      className="profile-time-desc mb-0"
                      style={{ fontSize: "18px" }}
                    >
                      Hours
                    </span>
                  </div>
                  <h6
                    className="profile-time-number mb-0"
                    style={{ fontSize: "24px" }}
                  >
                    :
                  </h6>
                  <div className="d-flex flex-column align-items-center gap-3">
                    <h6
                      className="profile-time-number mb-0"
                      style={{ fontSize: "24px" }}
                    >
                      46
                    </h6>
                    <span
                      className="profile-time-desc mb-0"
                      style={{ fontSize: "18px" }}
                    >
                      Minutes
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="profile-event-popup-wrapper p-3 w-100">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="popup-event-info">Total reward pool</span>
                <span className="popup-event-info">
                  5,000 {dummyEvent?.rewards}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="popup-event-info">
                  Remaining in the reward pool
                </span>
                <span className="popup-event-info">
                  500 {dummyEvent?.rewards}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span className="popup-event-info">Total points earned</span>
                <span className="popup-event-info">1,500,250 points</span>
              </div>
            </div>
            <div className="popup-red-wrapper mt-3 p-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={require("./assets/grayDollar.svg").default}
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="event-my-earnings mb-0">My earnings</span>
              </div>
              <div className="d-flex flex-column gap-2">
                <h6 className="mb-0 event-earnings-coin">
                  600 {dummyEvent?.rewards}
                </h6>
                <span className="mb-0 event-earnings-usd">$1,200</span>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end mt-3">
              <NavLink to={"/marketplace/mint"} state={{event: dummyEvent?.linkState}}>
                {" "}
                <button className="btn get-beta-btn">Get Beta Pass</button>
              </NavLink>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </>
  );
};

export default WalletBalance;
