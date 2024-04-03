import React, { useRef } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { useState } from "react";
import { useEffect } from "react";
import TimepieceChecklistModal from "../Timepiece/TimepieceChecklistModal";
import addActive from "../../assets/landAssets/addActive.svg";
import addInactive from "../../assets/landAssets/addInactive.svg";
import subtractActive from "../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../assets/landAssets/subtractInactive.svg";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import marketMintBanner from "./assets/marketMintBanner.png";
import confluxUpcoming from "./assets/confluxUpcoming.png";
import EventSliderCard from "./components/EventSliderCard";
import Slider from "react-slick";
import nextArrow from "./assets/nextArrow1.svg";
import confluxActive from "./assets/confluxActive.png";
import coin98Active from "./assets/coin98Active.png";
import coingeckoActive from "./assets/coingeckoActive.png";
import skaleActive from "./assets/upcomingSkaleMobile.webp";
import timepieceActive from "./assets/timepieceActive.png";
import gateActive from "./assets/gateActive.png";
import kucoinActive from "./assets/kucoinActive.png";
import blockChainIcon from "./assets/blockChainIcon.svg";
import confluxLogo from "./assets/confluxLogo.svg";
import baseLogo from "./assets/baseLogo.svg";
import skaleLogo from "./assets/skaleIcon.svg";

import avaxLogo from "./assets/avaxLogo.svg";
import bnbLogo from "./assets/bnbLogo.svg";
import wodLogo from "./assets/wodIcon.png";
import openSeaLogo from "./assets/openSeaLogo.png";
import BetaEventCard from "./components/BetaEventCard";
import { NavLink, useLocation, useParams } from "react-router-dom";
import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "./assets/coingeckoUpcoming.png";
import baseUpcoming from "./assets/baseUpcoming.png";
import skaleUpcoming from "./assets/upcomingSkale.webp";
import babydogeUpcoming from "./assets/upcomingBabyDoge.webp";

import Countdown from "react-countdown";
import getFormattedNumber from "../Account/src/Utils.js/hooks/get-formatted-number";

const renderer = ({ days, hours, minutes }) => {
  return (
    <h6 className="latest-mint-number mb-0 font-organetto">
      {hours} hours : {minutes} minutesmarketplace/mintnew-upcoming-tag d-flex
      align-items-center justify-content-center px-1
    </h6>
  );
};
const renderer2 = ({ days, hours, minutes }) => {
  return (
    <h6 className="latest-mint-number mb-0">
      {days}d:{hours}h:{minutes}m
    </h6>
  );
};

const MarketMint = ({
  showWalletConnect,
  handleMint,
  checkTotalcaws,
  coinbase,
  isConnected,
  totalCreated,
  mintStatus,
  mintloading,
  chainId,
  nftName,
  textColor,
  cawsArray,
  calculateCaws,
  timepieceMetadata,
  handleBaseNftMint,
  mybaseNFTsCreated,
  baseMintAllowed,
  myskaleNFTsCreated,
  skaleMintAllowed,
}) => {
  // const avaxData = {
  //   id: "avax",
  //   cardTitle: "Avalanche Beta Pass",
  //   title: "Avalanche Beta Pass",
  //   background: "avax-mint-bg",
  //   mobileBg: "avaxMobileBg.png",
  // };
  // const gateData = {
  //   id: "gate",
  //   cardTitle: "Gate.Io Beta Pass",
  //   title: "Gate.Io Beta Pass",
  //   background: "gate-mint-bg2",
  //   mobileBg: "gateMobileBg.png",
  // };
  // const kucoinData = {
  //   id: "kucoin",
  //   cardTitle: "KuCoin Beta Pass",
  //   title: "KuCoin Beta Pass",
  //   background: "kucoin-mint-bg",
  //   mobileBg: "kucoinMobileBg.png",
  // };
  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: "conflux-mint-bg",
    mobileBg: "confluxMobileBg.png",
  };

  const timepieceData = {
    id: "timepiece",
    cardTitle: "Caws Timepiece",
    title: "Timepiece",
    background: "market-mint-bg",
    mobileBg: "timepieceMobileBg.png",
  };
  // const coin98Data = {
  //   id: "coin98",
  //   cardTitle: "Coin98 Beta Pass",
  //   title: "Coin98 Beta Pass",
  //   background: "coin98-mint-bg",
  //   mobileBg: "coin98MobileBg.png",
  // };
  // const coingeckoData = {
  //   id: "coingecko",
  //   cardTitle: "Coingecko Beta Pass",
  //   title: "Coingecko Beta Pass",
  //   background: "coingecko-mint-bg",
  //   mobileBg: "coingeckoMobileBg.png",
  // };

  const baseData = {
    id: "skale",
    cardTitle: "SKALE Beta Pass",
    title: "SKALE Beta Pass",
    background: "skale-mint-bg",
    mobileBg: "skaleMobileBg.webp",
  };

  const windowSize = useWindowSize();
  const params = useParams();
  const [viewCollection, setViewCollection] = useState(false);
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [status, setStatus] = useState("Connect your wallet.");
  const [showBadge, setshowBadge] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [activeButton, setactiveButton] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [grandPrice, setGrandPrice] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(true);
  const [latestMintId, setlatestMintId] = useState(0);
  const [latestConfluxMintId, setlatestConfluxMintId] = useState(0);

  const [activeTab, setActiveTab] = useState("live");
  const [confluxSold, setconfluxSold] = useState(0);
  const [baseSold, setcBaseSold] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [showFirstNext, setShowFirstNext] = useState(false);
  const [selectedMint, setSelectedMint] = useState(timepieceData);
  const [mintTitle, setMintTitle] = useState("timepiece");
  const [sliderCut, setSliderCut] = useState();
  const [confluxLive, setConfluxLive] = useState(false);
  const slider = useRef(null);
  const html = document.querySelector("html");

  const getTotalSupply = async () => {
    const confluxContract = new window.confluxWeb3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_base_address
    );

    const baseContract = new window.baseWeb3.eth.Contract(
      window.BASE_NFT_ABI,
      window.config.nft_base_address
    );

    const confluxresult = await confluxContract.methods.totalSupply().call();
    setconfluxSold(confluxresult);

    const baseresult = await baseContract.methods.totalSupply().call();
    setcBaseSold(baseresult);
  };

  useEffect(() => {
    if (params.id === "skale") {
      setSelectedMint(baseData);
      setMintTitle("skale");
    } else if (params.id === "timepiece") {
      setSelectedMint(timepieceData);
      setMintTitle("timepiece");
    }
    getTotalSupply();
  }, []);

  useEffect(() => {
    html.classList.remove("hidescroll");
  }, []);

  let countToLiveConflux = new Date("2023-10-10T11:00:00.000+02:00");
  let countToExpireConflux = new Date("2023-11-17T11:00:00.000+02:00");

  const dummyCards = [
    // {
    //   title: "Avalanche Pass",
    //   eventId: "avax",
    //   desc: "Gain entry to metaverse, and join exclusive Avalanche event with special ticket.",
    //   img: skaleActive,
    //   data: avaxData,
    //   class: "mint-1",
    // },
    // {
    //   title: "KuCoin Pass",
    //   eventId: "kucoin",
    //   desc: "Gain entry to metaverse, and join exclusive KuCoin event with special ticket.",
    //   img: kucoinActive,
    //   data: kucoinData,
    //   class: "mint-2",
    // },
    // {
    //   title: "Gate.Io Pass",
    //   eventId: "gate",
    //   desc: "Gain entry to metaverse, and join exclusive Gate.Io event with special ticket.",
    //   img: gateActive,
    //   data: gateData,
    //   class: "mint-3",
    // },

    // {
    //   title: "Conflux Pass",
    //   eventId: "conflux",
    //   desc: "Gain entry to metaverse, and join exclusive Conflux event with special ticket.",
    //   img: confluxActive,
    //   data: confluxData,
    //   class: "mint-4",
    //   id: "conflux",
    // },
    // {
    //   title: "Coin98 Pass",
    //   eventId: "coin98",
    //   desc: "Gain entry to metaverse, and join exclusive Coin98 event with special ticket.",
    //   img: coin98Active,
    //   data: coin98Data,
    //   class: "mint-5",
    // },
    // {
    //   title: "Coingecko Pass",
    //   eventId: "coingecko",
    //   desc: "Gain entry to metaverse, and join exclusive Coingecko event with special ticket.",
    //   img: coingeckoActive,
    //   data: coingeckoData,
    //   class: "mint-6",
    // },
    {
      title: "SKALE Pass",
      eventId: "skale",
      desc: "Gain entry to metaverse, and join exclusive SKALE event with special ticket.",
      img: skaleActive,
      data: baseData,
      class: "mint-skale",
    },
    {
      title: "Caws Timepiece",
      eventId: "timepiece",
      desc: "Access the metaverse, experience enhanced interactions, and enjoy diverse benefits.",
      img: timepieceActive,
      data: timepieceData,
      class: "mint-8",
      id: "timepiece",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    dotsClass: "button__bar",
    infinite: false,
    speed: 300,
    slidesToShow: 5,
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

  const firstNext = () => {
    slider.current.slickNext();
  };
  const firstPrev = () => {
    slider.current.slickPrev();
  };

  const handleViewCollection = () => {
    setViewCollection(true);
  };

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
  };

  const addNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount < cawsArray.length) {
      setNftCount(nftCount + 1);
    }
  };

  // console.log(totalCaws)
  const subtractNft = () => {
    if (nftCount === null) {
      setNftCount(1);
    } else if (nftCount > 1) {
      setNftCount(nftCount - 1);
    }
  };

  const getTimepieceLatestMint = async () => {
    const result = await window.caws_timepiece.getTimepieceLatestMint();
    setlatestMintId(result - 1);
  };

  const getConfluxLatestMint = async () => {
    const result = await window.conflux_nft.getConfluxLatestMint();
    setlatestConfluxMintId(result - 1);
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

  const benefits = [
    {
      title: "Exclusive Access",
      icon: "draft",
    },
    {
      title: "Enhanced Interactions",
      icon: "user",
    },
    {
      title: "Special Rewards",
      icon: "star",
    },
    {
      title: "Expanded Functionality",
      icon: "expand",
    },
  ];

  useEffect(() => {
    if (coinbase && chainId === 1) {
      if (cawsArray.length === 0) {
        setNftStatus("*You are not holding any CAWS NFT.");
      } else if (cawsArray.length > 0) {
        if (cawsArray.length < nftCount && cawsArray.length > 0) {
          setNftStatus("*You don't have enough CAWS NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        } else if (nftCount > 50 && cawsArray.length === 50) {
          setNftStatus("*Exceeded mint limit of 10 NFTs.");
          setTimeout(() => {
            setNftCount(cawsArray.length);
            setNftStatus("*50 NFT limit.");
          }, 3000);
        } else if (cawsArray.length > 0 && cawsArray.length >= nftCount) {
          setNftStatus("*50 NFT limit.");
        }
      }
    }
  }, [nftCount, coinbase, cawsArray.length]);

  useEffect(() => {
    if (isConnected) {
      if (chainId !== undefined) {
        if (selectedMint.id === "timepiece") {
          if (chainId !== 1) {
            setactiveButton(false);
            setStatus("Switch to Ethereum Chain to continue minting.");
          } else if (chainId === 1) {
            setactiveButton(true);
            setStatus("");
          }
        } else if (selectedMint.id === "skale") {
          if (chainId !== 1482601649) {
            setactiveButton(false);
            setStatus("Switch to SKALE to continue minting.");
          } else if (chainId === 1482601649) {
            setactiveButton(true);
            setStatus("");
          }
        }
      }
    }
  }, [isConnected, chainId, coinbase, selectedMint]);

  useEffect(() => {
    getTimepieceLatestMint();
    getConfluxLatestMint();
  }, [mybaseNFTsCreated, totalCreated]);

  useEffect(() => {
    if (isConnected) {
      calculateCaws({
        numberOfTokens: parseInt(nftCount),
      });
    }
  }, [nftCount, isConnected, coinbase, chainId, cawsArray.length]);

  useEffect(() => {
    if (coinbase && isConnected && chainId === 1) {
      if (totalCreated > 0) {
        setshowBadge(true);
      }
    } else if (coinbase && isConnected && selectedMint.id === "skale") {
      if (myskaleNFTsCreated > 0) {
        setshowBadge(true);
      }
    }
  }, [coinbase, chainId, isConnected, totalCreated, selectedMint]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Mint";
  }, []);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
        <div
          className="container-nft d-flex align-items-start flex-column gap-2 px-3 px-lg-5 my-4 position-relative"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0 px-0">
            <div className="row justify-content-center align-items-center w-100 mx-0 px-3 py-3 p-lg-0 gap-5 gap-lg-0">
              {/* <div className="row align-items-center mb-5">
        <div className="col-12 col-lg-7">
          <div className="d-flex flex-column gap-2">
          <h6 className="market-mint-title d-flex
           gap-2 flex-lg-row align-items-center">
          NFT{" "}
          <span
            className="market-mint-title"
            style={{ color: "#8c56ff" }}
          >
            Minting
          </span>
        </h6>
          <p className="market-mint-desc">
          Mint your CAWS Timepiece NFT for free using your original CAWS NFT and unlock exclusive metaverse benefits.
          </p>
        </div>          
        </div>
        <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
          <img src={marketMintBanner} alt="" className="w-75" />
        </div>
        </div> */}

              <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
                NFT <span style={{ color: "#8c56ff" }}> Minting</span>
              </h6>
              <div className="d-flex flex-column">
                <div className="d-flex w-100 align-items-center justify-content-center gap-4">
                  <h6
                    className={`new-stake-tab position-relative ${
                      activeTab === "live" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("live")}
                  >
                    Live
                  </h6>
                  <h6
                    className={`new-stake-tab position-relative ${
                      activeTab === "upcoming" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    <div className="new-upcoming-tag d-flex align-items-center justify-content-center px-1">
                      <span className="mb-0">New</span>
                    </div>
                    Upcoming
                  </h6>
                  <h6
                    className={`new-stake-tab ${
                      activeTab === "past" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("past")}
                  >
                    Past
                  </h6>
                </div>
                <span className="w-100 new-stake-divider mt-3 mb-5"></span>
              </div>

              {activeTab === "live" && (
                <>
                  {/* <div className="pb-5 px-0 position-relative">
                    {activeSlide > 0 && (
                      <div className="prev-arrow-nft" onClick={firstPrev}>
                        <img src={nextArrow} alt="" />
                      </div>
                    )}
                    {showFirstNext === activeSlide
                      ? null
                      : dummyCards.length > sliderCut && (
                          <div className="next-arrow-nft" onClick={firstNext}>
                            <img src={nextArrow} alt="1" />
                          </div>
                        )}
                    {windowSize.width < 480 && (
                      <>
                        <div className="prev-arrow-nft" onClick={firstPrev}>
                          <img src={nextArrow} alt="" />
                        </div>
                        <div className="next-arrow-nft" onClick={firstNext}>
                          <img src={nextArrow} alt="1" />
                        </div>
                      </>
                    )}
                    <Slider ref={(c) => (slider.current = c)} {...settings}>
                      {dummyCards.map((item, index) => (
                        <EventSliderCard
                          key={index}
                          data={item}
                          onSelectCard={() => {
                            setSelectedMint(item.data);
                            setMintTitle(item.eventId);
                          }}
                          mintTitle={mintTitle}
                        />
                      ))}
                    </Slider>
                  </div> */}
                  {selectedMint && (
                    <>
                      <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 staking-height-2">
                        <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
                          <div className="d-flex flex-column position-relative">
                            {showBadge &&
                              totalCreated > 0 &&
                              selectedMint.id === "timepiece" && (
                                <div className="totalcreated">
                                  <span>{totalCreated}</span>
                                </div>
                              )}
                            {showBadge &&
                              myskaleNFTsCreated.length > 0 &&
                              selectedMint.id === "skale" && (
                                <div className="totalcreated">
                                  <span>{myskaleNFTsCreated.length}</span>
                                </div>
                              )}
                            <div
                              className={`genesis-wrapper ${
                                selectedMint.id === "timepiece" &&
                                totalCreated > 0
                                  ? "genesis-land"
                                  : selectedMint.id === "timepiece" &&
                                    totalCreated === 0
                                  ? "genesis-land-empty"
                                  : selectedMint.id === "skale" &&
                                    myskaleNFTsCreated.length === 0
                                  ? "conflux-empty"
                                  : "skale-active"
                              } d-flex justify-content-center align-items-center p-3 position-relative`}
                              style={{ height: 312 }}
                            >
                              <img
                                src={dummyBadge}
                                className="genesis-badge"
                                style={{ visibility: "hidden" }}
                                alt="badge"
                              />
                            </div>
                            <div
                              className="genesis-desc position-relative"
                              style={{ bottom: "5px" }}
                            >
                              <h6 className="font-organetto land-desc w-75">
                                {selectedMint?.cardTitle}
                              </h6>
                            </div>
                          </div>

                          {selectedMint.id === "timepiece" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                totalCreated === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <button
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalCreated === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  totalCreated === 0
                                }
                                onClick={handleViewCollection}
                              >
                                View collection
                              </button>
                            </div>
                          )}
                          {selectedMint.id === "skale" && (
                            <div
                              className={
                                isConnected === false ||
                                activeButton === false ||
                                myskaleNFTsCreated.length === 0
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <NavLink
                                className={`btn ${
                                  isConnected === false ||
                                  activeButton === false ||
                                  myskaleNFTsCreated.length === 0
                                    ? "outline-btn-disabled"
                                    : "outline-btn"
                                } px-5 w-100`}
                                disabled={
                                  isConnected === false ||
                                  activeButton === false ||
                                  myskaleNFTsCreated.length === 0
                                }
                                to={`/marketplace/nft/${myskaleNFTsCreated[0]}/${window.config.nft_skale_address}`}
                                onClick={() => {
                                  updateViewCount(
                                    myskaleNFTsCreated[0],
                                    window.config.nft_skale_address
                                  );
                                }}
                              >
                                View NFT
                              </NavLink>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-12 col-xxl-5 mt-0 px-0"
                        style={{ overflowX: "hidden" }}
                      >
                        <div
                          className={`p-4 mint-wrappernew ${selectedMint?.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                          style={{ minHeight: "463px" }}
                        >
                          <h6 className="marketmintnewtitle position-relative">
                            Mint your {selectedMint?.title} <br />
                            NFT
                            <span className="marketmintnewtitle-marked mx-2">
                              now!
                            </span>
                          </h6>
                          <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
                            <div className="mint-benefits-grid">
                              {benefits.map((item) => (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={require(`../../components/TimepieceMint/assets/${item.icon}.png`)}
                                    alt=""
                                    style={{
                                      scale:
                                        item.icon === "expand" ? "0.8" : "1",
                                    }}
                                  />
                                  <span className="mint-benefits-title">
                                    {item.title}
                                  </span>
                                </div>
                              ))}
                              {mintTitle === "skale" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on SKALE
                                  </span>
                                </div>
                              ) : mintTitle === "coingecko" ||
                                mintTitle === "coin98" ? (
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={blockChainIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                  />
                                  <span className="mint-benefits-title">
                                    Minting is available on BNB Chain
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <img
                            src={require(`../../components/TimepieceMint/assets/${selectedMint?.mobileBg}`)}
                            className="smaillmintbg d-block d-xl-none d-xxl-none d-lg-none"
                            alt=""
                          />
                        </div>
                      </div>
                      {mintTitle === "timepiece" ? (
                        <div className="col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2">
                          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                              <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                                <span className="land-name">
                                  Available NFTs to mint:{" "}
                                  <span
                                    className="addr-text"
                                    style={{ color: "rgb(123, 216, 176)" }}
                                  >
                                    {cawsArray.length}
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="d-flex mt-0 flex-column flex-lg-row align-items-start gap-2 justify-content-center justify-content-xxl-between justify-content-lg-between justify-content-md-between">
                              <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                                <span className="land-name">Name</span>
                                <div
                                  className="borderText borderText2"
                                  style={{ width: "100%" }}
                                >
                                  <h6
                                    className="land-placeholder mb-0"
                                    style={{ marginLeft: 11 }}
                                  >
                                    {nftName === "" ? "" : selectedMint?.title}
                                  </h6>
                                </div>
                              </div>
                              <div className="d-flex flex-column gap-2 col-12 col-lg-6">
                                <span className="land-name">Latest Mint</span>
                                <h6
                                  className="land-placeholder borderText"
                                  style={{
                                    fontSize: "12px",
                                    paddingLeft: 14,
                                    lineHeight: "40px",
                                  }}
                                >
                                  # {latestMintId}
                                </h6>
                              </div>
                            </div>
                            <hr className="mint-divider m-0" />
                            <div className="d-flex align-items-center justify-content-between position-relative gap-3">
                              <div className="input-container position-relative col-8 col-lg-6">
                                <input
                                  type="number"
                                  placeholder="Nr. of CAWS Timepiece NFT to create"
                                  max={cawsArray.length}
                                  min={1}
                                  className="land-input w-100"
                                  value={parseInt(nftCount)}
                                  onChange={(e) =>
                                    setNftCount(parseInt(e.target.value))
                                  }
                                />
                              </div>

                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={
                                    nftCount > 1 &&
                                    isConnected === true &&
                                    activeButton === true &&
                                    status === ""
                                      ? subtractActive
                                      : subtractInactive
                                  }
                                  alt="subtract"
                                  onClick={subtractNft}
                                  style={{
                                    cursor:
                                      isConnected === true &&
                                      activeButton === true
                                        ? "pointer"
                                        : "default",
                                    pointerEvents:
                                      isConnected === true &&
                                      activeButton === true &&
                                      status === ""
                                        ? "auto"
                                        : "none",
                                  }}
                                />
                                <img
                                  src={
                                    nftCount < cawsArray.length &&
                                    nftCount >= 1 &&
                                    isConnected === true &&
                                    activeButton === true &&
                                    status === ""
                                      ? addActive
                                      : addInactive
                                  }
                                  alt="add"
                                  onClick={addNft}
                                  style={{
                                    cursor:
                                      isConnected === true &&
                                      activeButton === true
                                        ? "pointer"
                                        : "default",
                                    pointerEvents:
                                      isConnected === true &&
                                      activeButton === true &&
                                      status === ""
                                        ? "auto"
                                        : "none",
                                  }}
                                />
                              </div>
                            </div>
                            {mintTitle === "timepiece" ? (
                              <span
                                className="limit-span position-relative"
                                style={{
                                  color: nftStatus.includes("Exceeded")
                                    ? "#D87B7B"
                                    : "#FFFFFF",
                                  bottom: "auto",
                                }}
                              >
                                {nftStatus}
                              </span>
                            ) : mintTitle === "conflux" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Conflux Network
                                <img src={confluxLogo} alt="" />
                              </span>
                            ) : mintTitle === "avax" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on Avalanche Network
                                <img
                                  src={avaxLogo}
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </span>
                            ) : mintTitle === "skale" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on SKALE
                                <img src={skaleLogo} alt="" />
                              </span>
                            ) : mintTitle === "coin98" ||
                              mintTitle === "coingecko" ||
                              mintTitle === "kucoin" ||
                              mintTitle === "gate" ? (
                              <span
                                className="limit-span position-relative d-flex align-items-center gap-2"
                                style={{ bottom: "0px" }}
                              >
                                Available only on BNB Chain
                                <img src={bnbLogo} alt="" />
                              </span>
                            ) : null}
                            <hr className="mint-divider m-0" />
                            {/* {cawsArray.length > 0 && nftCount > 0 && (
         <span className="land-name">
           Number of CAWS NFTs left after minting:{" "}
           <span
             className="addr-text"
             style={{ color: "rgb(123, 216, 176)" }}
           >
             {cawsArray.length - nftCount}
           </span>
         </span>
       )}  */}
                            {mintStatus.length > 0 && (
                              <span
                                style={{ color: textColor }}
                                className={
                                  mintStatus.includes("Success")
                                    ? "mint-span-success"
                                    : "mint-span"
                                }
                              >
                                {mintStatus}
                              </span>
                            )}
                            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between">
                              <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center justify-content-xxl-end justify-content-lg-end justify-content-center w-100">
                                <div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-center">
                                  <div
                                    className={
                                      (isConnected === true &&
                                        chainId !== 1 &&
                                        cawsArray.length === 0) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      mintloading === "error" ||
                                      (isConnected === true &&
                                        chainId === 1 &&
                                        cawsArray.length === 0)
                                        ? "linear-border-disabled"
                                        : "linear-border"
                                    }
                                  >
                                    <button
                                      className={`btn ${
                                        mintloading === "error"
                                          ? "filled-error-btn"
                                          : (isConnected === true &&
                                              chainId !== 1 &&
                                              cawsArray.length === 0) ||
                                            (status !==
                                              "Connect your wallet." &&
                                              status !== "") ||
                                            (isConnected === true &&
                                              chainId === 1 &&
                                              cawsArray.length === 0)
                                          ? "outline-btn-disabled"
                                          : "filled-btn"
                                      }  px-4 w-100`}
                                      onClick={() => {
                                        isConnected === true && chainId === 1
                                          ? handleCreate()
                                          : showWalletConnect();
                                      }}
                                      disabled={
                                        mintloading === "error" ||
                                        mintloading === "success" ||
                                        (isConnected === true &&
                                          chainId !== 1) ||
                                        (status !== "Connect your wallet." &&
                                          status !== "") ||
                                        (isConnected === true &&
                                          chainId === 1 &&
                                          cawsArray.length === 0)
                                          ? true
                                          : false
                                      }
                                      onMouseEnter={() => {
                                        setMouseOver(true);
                                      }}
                                      onMouseLeave={() => {
                                        setMouseOver(false);
                                      }}
                                    >
                                      {(isConnected === false ||
                                        chainId !== 1) && (
                                        <img
                                          src={
                                            mouseOver === false
                                              ? blackWallet
                                              : whitewallet
                                          }
                                          alt=""
                                          style={{
                                            width: "23px",
                                            height: "23px",
                                          }}
                                        />
                                      )}{" "}
                                      {mintloading === "initial" &&
                                      isConnected === true &&
                                      chainId === 1 ? (
                                        "Mint"
                                      ) : mintloading === "mint" &&
                                        isConnected === true &&
                                        chainId === 1 ? (
                                        <>
                                          <div
                                            className="spinner-border "
                                            role="status"
                                          ></div>
                                        </>
                                      ) : mintloading === "error" &&
                                        isConnected === true &&
                                        chainId === 1 ? (
                                        "Failed"
                                      ) : mintloading === "success" &&
                                        isConnected === true &&
                                        activeButton ===
                                          (isConnected === true &&
                                            chainId === 1) ? (
                                        "Success"
                                      ) : isConnected === true &&
                                        chainId !== 1 ? (
                                        " Switch Chain"
                                      ) : (
                                        "Connect wallet"
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2">
                          <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                            <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                              <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                                <span className="land-name">
                                  Mint your NFT{" "}
                                </span>
                              </div>
                            </div>
                            {confluxLive === false ? (
                              <>
                                <div
                                  className="dark-wrapper d-flex flex-column gap-2 py-5 align-items-center justify-content-center p-2"
                                  style={{ position: "relative", top: "20px" }}
                                >
                                  <span className="mb-0 latest-mint">
                                    Minting opens in
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <Countdown
                                      date={countToLiveConflux}
                                      onComplete={() => setConfluxLive(true)}
                                      renderer={renderer}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="dark-wrapper d-flex align-items-center justify-content-between p-4"
                                  style={{ visibility: "hidden" }}
                                ></div>
                              </>
                            ) : (
                              <>
                                <div className="dark-wrapper d-flex align-items-center justify-content-between p-2">
                                  <span className="mb-0 latest-mint">
                                    Available to Mint
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <h6 className="latest-mint-number mb-0">
                                      {skaleMintAllowed} NFT
                                    </h6>
                                  </div>
                                </div>
                                <div className="dark-wrapper d-flex align-items-center justify-content-between p-2">
                                  <span className="mb-0 latest-mint">
                                    Minting ends in
                                  </span>
                                  <div className="d-flex align-items-center gap-2">
                                    <Countdown
                                      date={countToExpireConflux}
                                      renderer={renderer2}
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <span className="latest-mint-currency mb-0">
                              *Important: You can only mint one SKALE Beta Pass
                              NFT per wallet.
                            </span>
                            <hr className="gray-divider" />
                            <span
                              className="limit-span position-relative d-flex align-items-center gap-2"
                              style={{ bottom: "0px" }}
                            >
                              Available only on SKALE
                              <img src={skaleLogo} alt="" />
                            </span>
                            {mintStatus.length > 0 && (
                              <span
                                style={{ color: textColor }}
                                className={
                                  mintStatus.includes("Success")
                                    ? "mint-span-success"
                                    : "mint-span"
                                }
                              >
                                {mintStatus}
                              </span>
                            )}
                            <hr className="gray-divider" />
                            <div className="d-flex w-100 justify-content-center">
                              {confluxLive && (
                                <div
                                  className={
                                    (isConnected === true &&
                                      chainId !== 1482601649) ||
                                    (status !== "Connect your wallet." &&
                                      status !== "") ||
                                    mintloading === "error" ||
                                    skaleMintAllowed === 0
                                      ? "linear-border-disabled"
                                      : "linear-border"
                                  }
                                >
                                  <button
                                    className={`btn ${
                                      mintloading === "error"
                                        ? "filled-error-btn"
                                        : (isConnected === true &&
                                            chainId !== 1482601649) ||
                                          (status !== "Connect your wallet." &&
                                            status !== "") ||
                                          skaleMintAllowed === 0
                                        ? "outline-btn-disabled"
                                        : "filled-btn"
                                    }  px-4 w-100`}
                                    onClick={() => {
                                      isConnected === true &&
                                      chainId === 1482601649
                                        ? handleBaseNftMint()
                                        : showWalletConnect();
                                    }}
                                    disabled={
                                      mintloading === "error" ||
                                      mintloading === "success" ||
                                      (isConnected === true &&
                                        chainId !== 1482601649) ||
                                      (status !== "Connect your wallet." &&
                                        status !== "") ||
                                      skaleMintAllowed === 0
                                        ? true
                                        : false
                                    }
                                    onMouseEnter={() => {
                                      setMouseOver(true);
                                    }}
                                    onMouseLeave={() => {
                                      setMouseOver(false);
                                    }}
                                  >
                                    {(isConnected === false ||
                                      chainId !== 1482601649) && (
                                      <img
                                        src={
                                          mouseOver === false
                                            ? blackWallet
                                            : whitewallet
                                        }
                                        alt=""
                                        style={{
                                          width: "23px",
                                          height: "23px",
                                        }}
                                      />
                                    )}{" "}
                                    {mintloading === "initial" &&
                                    isConnected === true &&
                                    chainId === 1482601649 ? (
                                      "Mint"
                                    ) : mintloading === "mint" &&
                                      isConnected === true &&
                                      chainId === 1482601649 ? (
                                      <>
                                        <div
                                          className="spinner-border "
                                          role="status"
                                        ></div>
                                      </>
                                    ) : mintloading === "error" &&
                                      isConnected === true &&
                                      chainId === 1482601649 ? (
                                      "Failed"
                                    ) : mintloading === "success" &&
                                      isConnected === true &&
                                      activeButton ===
                                        (isConnected === true &&
                                          chainId === 1482601649) ? (
                                      "Success"
                                    ) : isConnected === true &&
                                      chainId !== 1482601649 ? (
                                      " Switch Chain"
                                    ) : (
                                      "Connect wallet"
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {activeTab === "upcoming" && (
                // <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                //   <div className="d-flex flex-column align-items-center gap-2">
                //     <h6 className="upcoming-stake">Mints are coming...</h6>
                //     <span className="upcoming-stake-desc">
                //       Check back soon!
                //     </span>
                //   </div>
                // </div>
<div className="d-flex flex-column gap-4">
                <div className="upcoming-mint-wrapper skale-upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                  <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                    <h6 className="upcoming-mint-title">SKALE Beta Pass</h6>
                    <p className="upcoming-mint-desc">
                    Gain entry to metaverse, and join exclusive SKALE event with special ticket.
                    </p>
                  </div>
                  <img
                    src={skaleUpcoming}
                    alt=""
                    className="upcoming-mint-img"
                  />
                </div>

                <div className="upcoming-mint-wrapper babydoge-upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                  <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                    <h6 className="upcoming-mint-title">BabyDoge Beta Pass</h6>
                    <p className="upcoming-mint-desc">
                    Gain entry to metaverse, and join exclusive BabyDoge event with special ticket.
                    </p>
                  </div>
                  <img
                    src={babydogeUpcoming}
                    alt=""
                    className="upcoming-mint-img"
                  />
                </div>
                
                </div>

                // <div className="d-flex flex-column gap-4">
                //   {/* <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Conflux Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Conflux
                //       </p>
                //     </div>
                //     <img
                //       src={confluxUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Coin98 Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Coin98
                //       </p>
                //     </div>
                //     <img
                //       src={coin98Upcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         CoinGecko Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by
                //         CoinGecko
                //       </p>
                //     </div>
                //     <img
                //       src={coingeckoUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div> */}

                // </div>
                // <div className="d-flex flex-column gap-4">
                //   <div className="upcoming-mint-wrapper-conflux upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Conflux Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Conflux
                //       </p>
                //     </div>
                //     <img
                //       src={confluxUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   {/* <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Coin98 Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by Coin98
                //       </p>
                //     </div>
                //     <img
                //       src={coin98Upcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">
                //         CoinGecko Beta Pass
                //       </h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted by
                //         CoinGecko
                //       </p>
                //     </div>
                //     <img
                //       src={coingeckoUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div>
                //   <div className="upcoming-mint-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-between px-0">
                //     <div className="d-flex flex-column gap-2 ps-3 pe-3 pe-lg-0 pt-3 pt-lg-0 pb-3 pb-lg-0">
                //       <h6 className="upcoming-mint-title">Base Beta Pass</h6>
                //       <p className="upcoming-mint-desc">
                //         Get access to a special ticket to enter the metaverse
                //         and participate in an exclusive event hosted on Base
                //         Network
                //       </p>
                //     </div>
                //     <img
                //       src={baseUpcoming}
                //       alt=""
                //       className="upcoming-mint-img"
                //     />
                //   </div> */}
                // </div>
              )}
              {activeTab === "past" && (
                <div className="row w-100 align-items-center gap-4 gap-lg-0 px-0">
                  <div className="col-12 col-lg-6">
                    <div className="past-land-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper">
                        <h6 className="past-mint-title">Genesis Land</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-land-mint-amount">1,000</h6>
                          <span className="past-land-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="past-caws-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">
                          Cats and Watches Society
                        </h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-caws-mint-amount">10,000</h6>
                          <span className="past-caws-mint-desc">SOLD OUT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-conflux-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Conflux Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-conflux-mint-amount">
                            {getFormattedNumber(confluxSold, 0)}
                          </h6>
                          <span className="past-conflux-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-5">
                    <div className="past-base-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Base Beta Pass</h6>
                        <div className="d-flex flex-column align-items-center rotatewrapper">
                          <h6 className="past-base-mint-amount">
                            {getFormattedNumber(baseSold, 0)}
                          </h6>
                          <span className="past-conflux-mint-desc">
                            SOLD OUT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {viewCollection === true && (
        <TimepieceChecklistModal
          coinbase={coinbase}
          isConnected={isConnected}
          onClose={() => {
            setViewCollection(false);
          }}
          nftItem={
            selectedMint.id === "timepiece"
              ? timepieceMetadata
              : mybaseNFTsCreated
          }
          open={viewCollection}
          type={selectedMint.id}
        />
      )}
    </>
  );
};

export default MarketMint;
