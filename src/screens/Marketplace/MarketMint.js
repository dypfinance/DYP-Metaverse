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
import coin98Upcoming from "./assets/coin98Upcoming.png";
import coingeckoUpcoming from "./assets/coingeckoUpcoming.png";
import baseUpcoming from "./assets/baseUpcoming.png";
import confluxActive from "./assets/confluxActive.png";
import coin98Active from "./assets/coin98Active.png";
import coingeckoActive from "./assets/coingeckoActive.png";
import baseActive from "./assets/baseActive.png";
import timepieceActive from "./assets/timepieceActive.png";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import nextArrow from "./assets/nextArrow1.svg";


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
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const locationState = location?.state?.event
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
  const [activeTab, setActiveTab] = useState("live");
  const [overflowing, setOverflowing] = useState(false);
  const [shadows, setShadows] = useState(false);
  const slider = useRef(null);

  const [sliderCut, setSliderCut] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showFirstNext, setShowFirstNext] = useState(false);



  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: 'conflux-mint-bg'
  }
  const timepieceData = {
    id: "timepiece",
    cardTitle: "Caws Timepiece",
    title: "Timepiece",
    background: 'market-mint-bg'
  }
  const coin98Data = {
    id: "coin98",
    cardTitle: "Coin98 Beta Pass",
    title: "Coin98 Beta Pass",
    background: 'coin98-mint-bg'
  }
  const coingeckoData = {
    id: "coingecko",
    cardTitle: "Coingecko Beta Pass",
    title: "Coingecko Beta Pass",
    background: 'coingecko-mint-bg'
  }
  const baseData = {
    id: "base",
    cardTitle: "Base Beta Pass",
    title: "Base Beta Pass",
    background: 'base-mint-bg'
  }

  const [selectedMint, setSelectedMint] = useState(confluxData)
  const [mintTitle, setMintTitle] = useState("conflux")

  useEffect(() => {
    setSelectedMint(confluxData)
  }, [])
  



  const cutLength = () => {
    if (windowSize.width > 1600) {
      setSliderCut(5);
    } else if (windowSize.width > 1500) {
      setSliderCut(5);
    } else if (windowSize.width > 1400) {
      setSliderCut(4);
    } else if (windowSize.width > 1050) {
      setSliderCut(3);
    } else if (windowSize.width > 480) {
      setSliderCut(2);
    } else {
      setSliderCut(1);
    }
  }

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
        if (chainId !== 1) {
          setactiveButton(false);
          setStatus("Switch to Ethereum Chain to continue minting.");
        }
        if (chainId === 1) {
          setactiveButton(true);
          setStatus("");
        }
      }
    }
    getTimepieceLatestMint();
  }, [isConnected, chainId, coinbase]);

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
    }
  }, [coinbase, chainId, isConnected, totalCreated]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Timepiece Mint";
    cutLength();
  }, []);

  useEffect(() => {
      if(locationState === "conflux"){
        setSelectedMint(confluxData); setMintTitle("conflux")
      }else if(locationState === "coingecko"){
        setSelectedMint(coingeckoData); setMintTitle("coingecko")
      
      }else if(locationState === "coin98"){
        setSelectedMint(coin98Data); setMintTitle("coin98")
      
      }else if(locationState === "base"){
        setSelectedMint(baseData); setMintTitle("base")
      }
  }, [])
  


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
                    className={`new-stake-tab ${
                      activeTab === "live" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("live")}
                  >
                    Live
                  </h6>
                  <h6
                    className={`new-stake-tab ${
                      activeTab === "upcoming" && "stake-tab-active"
                    } px-3 py-2`}
                    onClick={() => setActiveTab("upcoming")}
                  >
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
                  <div className="pb-5 px-0 position-relative">
                  {activeSlide > 0 && (
                <div className="prev-arrow-nft" onClick={firstPrev}>
                  <img src={nextArrow} alt="" />
                </div>
              )}
              {showFirstNext === activeSlide
                ? null
                : 5 > sliderCut && (
                    <div className="next-arrow-nft" onClick={firstNext}>
                      <img src={nextArrow} alt="1" />
                    </div>
                  )}
                    <Slider ref={(c) => (slider.current = c)} {...settings}>
                        <div className={` ${mintTitle === "conflux" && "active-mint-selected"}  active-mint mint-1 justify-content-between d-flex flex-column`} onClick={() => {setSelectedMint(confluxData); setMintTitle("conflux")}}>
                          <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
                            <h6 className="active-mint-title mb-0">
                              Conflux Pass
                            </h6>
                            <p className="active-mint-desc mb-0">
                              Gain entry to metaverse, and join exclusive
                              Conflux event with special ticket.
                            </p>
                          </div>
                          <div className="second-half h-50 w-100">
                            <img
                              src={confluxActive}
                              className="w-100 h-100"
                              alt=""
                              style={{borderRadius: "0 0 28px 28px"}}
                            />
                          </div>
                        </div>
                      <div className={` ${mintTitle === "coin98" && "active-mint-selected"}  active-mint mint-2 justify-content-between d-flex flex-column`} onClick={() => {setSelectedMint(coin98Data); setMintTitle("coin98")}}>
                        <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
                          <h6 className="active-mint-title mb-0">
                            Coin98 Pass
                          </h6>
                          <p className="active-mint-desc mb-0">
                            Gain entry to metaverse, and join exclusive Coin98
                            event with special ticket.
                          </p>
                        </div>
                        <div className="second-half h-50 w-100">
                          <img
                            src={coin98Active}
                            className="w-100 h-100"
                            alt=""
                            style={{borderRadius: "0 0 28px 28px"}}

                          />
                        </div>
                      </div>
                      <div className={` ${mintTitle === "coingecko" && "active-mint-selected"}  active-mint mint-3 justify-content-between d-flex flex-column`} onClick={() => {setSelectedMint(coingeckoData); setMintTitle("coingecko")}}>
                        <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
                          <h6 className="active-mint-title mb-0">
                            CoinGecko Pass
                          </h6>
                          <p className="active-mint-desc mb-0">
                            Gain entry to metaverse, and join exclusive
                            CoinGecko event with special ticket.
                          </p>
                        </div>
                        <div className="second-half h-50 w-100">
                          <img
                            src={coingeckoActive}
                            className="w-100 h-100"
                            alt=""
                            style={{borderRadius: "0 0 28px 28px"}}

                          />
                        </div>
                      </div>
                      <div className={` ${mintTitle === "base" && "active-mint-selected"}  active-mint mint-4 justify-content-between d-flex flex-column`} onClick={() => {setSelectedMint(baseData); setMintTitle("base")}}>
                        <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
                          <h6 className="active-mint-title mb-0">Base Pass</h6>
                          <p className="active-mint-desc mb-0">
                            Gain entry to metaverse, and join exclusive event
                            hosted on Base Network with special ticket.
                          </p>
                        </div>
                        <div className="second-half h-50 w-100">
                          <img
                            src={baseActive}
                            className="w-100 h-100"
                            alt=""
                            style={{borderRadius: "0 0 28px 28px"}}

                          />
                        </div>
                      </div>
                      <div className={` ${mintTitle === "timepiece" && "active-mint-selected"}  active-mint mint-5 justify-content-between d-flex flex-column`} onClick={() => {setSelectedMint(timepieceData); setMintTitle("timepiece")}}>
                        <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
                          <h6 className="active-mint-title mb-0">
                            CAWS Timepiece
                          </h6>
                          <p className="active-mint-desc mb-0">
                            Access the metaverse, experience enhanced
                            interactions, and enjoy diverse benefits.
                          </p>
                        </div>
                        <div className="second-half h-50 w-100">
                          <img
                            src={timepieceActive}
                            className="w-100 h-100"
                            alt=""
                            style={{borderRadius: "0 0 28px 28px"}}

                          />
                        </div>
                      </div>
                    </Slider>
                  </div>
                  <div className="col-12 col-md-12 col-xxl-3 ps-2 ps-lg-0 staking-height-2">
                    <div className="d-flex flex-column gap-3 justify-content-between staking-height-2">
                      <div className="d-flex flex-column position-relative">
                        {showBadge && totalCreated > 0 && (
                          <div className="totalcreated">
                            <span>{totalCreated}</span>
                          </div>
                        )}
                        <div
                          className={`genesis-wrapper ${
                            mintTitle !== "timepiece" ? 
                            "conflux-empty" :
                            totalCreated > 0
                              ? "genesis-land"
                              : "genesis-land-empty"
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
                            {selectedMint.cardTitle}
                          </h6>
                        </div>
                      </div>
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
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-12 col-xxl-5 mt-0 px-0"
                    style={{ overflowX: "hidden" }}
                  >
                    <div
                      className={`p-4 mint-wrappernew ${selectedMint.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                      style={{ minHeight: "463px" }}
                    >
         
                      <h6 className="marketmintnewtitle position-relative">
                        Mint your {selectedMint.title} <br />
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
                                  scale: item.icon === "expand" ? "0.8" : "1",
                                }}
                              />
                              <span className="mint-benefits-title">
                                {item.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                              {nftName === "" ? "" : selectedMint.title}
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
                                isConnected === true && activeButton === true
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
                                isConnected === true && activeButton === true
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
                                      (status !== "Connect your wallet." &&
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
                                  (isConnected === true && chainId !== 1) ||
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
                                {(isConnected === false || chainId !== 1) && (
                                  <img
                                    src={
                                      mouseOver === false
                                        ? blackWallet
                                        : whitewallet
                                    }
                                    alt=""
                                    style={{ width: "23px", height: "23px" }}
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
                                    (isConnected === true && chainId === 1) ? (
                                  "Success"
                                ) : isConnected === true && chainId !== 1 ? (
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
                  <div className="upcoming-mint-wrapper d-flex align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3">
                      <h6 className="upcoming-mint-title">Conflux Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by Conflux
                      </p>
                    </div>
                    <img
                      src={confluxUpcoming}
                      alt=""
                      className="upcoming-mint-img"
                    />
                  </div>
                  <div className="upcoming-mint-wrapper d-flex align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3">
                      <h6 className="upcoming-mint-title">Coin98 Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by Coin98
                      </p>
                    </div>
                    <img
                      src={coin98Upcoming}
                      alt=""
                      className="upcoming-mint-img"
                    />
                  </div>
                  <div className="upcoming-mint-wrapper d-flex align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3">
                      <h6 className="upcoming-mint-title">
                        CoinGecko Beta Pass
                      </h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted by
                        CoinGecko
                      </p>
                    </div>
                    <img
                      src={coingeckoUpcoming}
                      alt=""
                      className="upcoming-mint-img"
                    />
                  </div>
                  <div className="upcoming-mint-wrapper d-flex align-items-center justify-content-between px-0">
                    <div className="d-flex flex-column gap-2 ps-3">
                      <h6 className="upcoming-mint-title">Base Beta Pass</h6>
                      <p className="upcoming-mint-desc">
                        Get access to a special ticket to enter the metaverse
                        and participate in an exclusive event hosted on Base
                        Network
                      </p>
                    </div>
                    <img
                      src={baseUpcoming}
                      alt=""
                      className="upcoming-mint-img"
                    />
                  </div>
                </div>
              )}
              {activeTab === "past" && (
                <div className="row w-100 align-items-center gap-4 gap-lg-0 px-0">
                  <div className="col-12 col-lg-6">
                    <div className="past-land-mint p-4">
                      <div className="sold-out-tag px-3 py-1">
                        <span className="sold-out-span">Sold Out</span>
                      </div>
                      <div className="d-flex flex-column justify-content-between past-content-wrapper ">
                        <h6 className="past-mint-title">Genesis Land</h6>
                        <div className="d-flex flex-column align-items-center">
                          <h6 className="past-land-mint-amount">1,000</h6>
                          <span className="past-caws-mint-desc">
                            Minted World of Dypians Genesis Land NFTs
                          </span>
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
                        <div className="d-flex flex-column align-items-center">
                          <h6 className="past-caws-mint-amount">10,000</h6>
                          <span className="past-caws-mint-desc">
                            Minted Cats and Watches Society (CAWS) NFTs
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
          nftItem={timepieceMetadata}
          open={viewCollection}
        />
      )}
    </>
  );
};

export default MarketMint;
