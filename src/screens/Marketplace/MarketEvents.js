import React, { useState, useEffect } from "react";
import BundleCard from "../Account/src/Components/BundleCard/BundleCard";
import { ERC20_ABI } from "../Account/src/web3/abis";
import Web3 from "web3";
import classes from "../Account/src/Containers/Dashboard/Dashboard.module.css";
import dypius from "../Account/src/Images/userProfile/dypius.svg";
import dragonIcon from "../Account/src/Images/userProfile/dragonIcon.svg";
import { useQuery } from "@apollo/client";
import { GET_PLAYER } from "../Account/src/Containers/Dashboard/Dashboard.schema";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import { NavLink, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import criticalHit from "../Marketplace/MarketNFTs/assets/criticalHit2.webp";
import goldenPass from "../Marketplace/MarketNFTs/assets/goldenPass.webp";
import puzzleMadness from "../Account/src/Components/BundleCard/assets/puzzleMadness2.webp";
import dragonPackage from "../Account/src/Components/BundleCard/assets/dragonPackageIcon2.webp";
import NewBundleCard from "../Account/src/Components/BundleCard/NewBundleCard";

import DragonPopup from "../../components/PackagePopups/DragonPopup";
import GoldenPassPopup from "../../components/PackagePopups/GoldenPassPopup";
import PuzzleMadnessPopup from "../../components/PackagePopups/PuzzleMadnessPopup";
import CriticalHitPopup from "../../components/PackagePopups/CriticalHitPopup";
import OutsideClickHandler from "react-outside-click-handler";
import { useParams } from "react-router-dom";

const MarketEvents = ({
  account,
  chainId,
  dyptokenDatabnb,
  idyptokenDatabnb,
  handleAvailableTime,
  remainingTime,
}) => {
  const location = useLocation();
  const windowSize = useWindowSize();
  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();

  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [selectedPackage, setSelectedPackage] = useState(
    location.state?.package ? location.state?.package : "dragon"
  );

  const [popup, setPopup] = useState(false);
  const [packagePopup, setPackagePopup] = useState("");
  const [activeTab, setActiveTab] = useState("live");

  const { eventId } = useParams();

  const dragonData = {
    title: "Dragon Ruins",
    image: "newDragon.png",
    benefits: [
      "Ability to fight a special creature",
      "A chance to win an unique CAWS NFT",
      "Score multiplier",
    ],
    price: 50,
    link: "https://www.worldofdypians.com/news/644a3089aa4deb26fe4dac90/Dragon-Ruins-Event",
    background: "newDragonBg.webp",
    mobileBackground: "dragonBgMobile.webp",
  };

  const iDypPackageData = {
    title: "Puzzle Madness",
    image: "newPuzzleMadness.png",
    benefits: [
      "Enhance your puzzle-solving skills",
      "Ability to earn high value rewards",
      "Compete against other players on the leaderboard",
    ],
    price: 3500,
    link: "https://www.worldofdypians.com/news/644ce83e7f931ac9706b515e/Puzzle-Madness-Event",
    background: "newPuzzleBg.webp",
    mobileBackground: "puzzleBgMobile.webp",
  };
  const dypPackageData = {
    title: "Golden Pass",
    image: "newGoldenPass.png",
    benefits: [
      "Double your rewards",
      "Compete and climb higher in the rankings",
      "Unlock unique rewards during the event",
    ],
    price: 700,
    link: "https://www.worldofdypians.com/news/644e343627cca74b2d4a60b1/Golden-Pass-Event",
    background: "newGoldenBg.webp",
    mobileBackground: "goldenBgMobile.webp",
  };

  const criticalHitPackageData = {
    title: "Critical Hit",
    image: "newCriticalHit.png",
    benefits: [
      "Exclusive access for Genesis Land NFT owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: 700,
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
    background: "newCriticalBg.webp",
    mobileBackground: "criticalBgMobile.webp",
  };
  const betaPassPackageData = {
    title: "Beta Pass",
    image: "betaPassDummy.png",
    benefits: [
      "Exclusive access for Beta Pass owners",
      "Opportunity to win rewards",
      "Regular and ongoing events",
    ],
    price: 220,
    link: "https://www.worldofdypians.com/news/6426dc2bb15f9e51ad8bd4e6/Critical-Hit-Event",
    background: "newCriticalBg.webp",
    mobileBackground: "criticalBgMobile.webp",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address);

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
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(account)
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
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    }
  };

  const onOpenPopup = (item) => {
    setPopup(true);
    setPackagePopup(item);
  };
  const onClosePopup = () => {
    setPopup(false);
    setPackagePopup("");
    console.log("hello");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Events";
  }, []);

  useEffect(() => {
    if (eventId === "dragon-ruins") {
      setSelectedPackage("dragon");
    }

    else if (eventId === "golden-pass") {
      setSelectedPackage("dyp");
    }

    else if (eventId === "puzzle-maddness") {
      setSelectedPackage("idyp");
    }

    else if (eventId === "critical-hit") {
      setSelectedPackage("criticalHit");
    }
    else if (eventId === "beta-pass") {
      setSelectedPackage("betaPass");
    }
  },[]);
 
  const html = document.querySelector("html");
  const bgmenu = document.querySelector("#bgmenu");
  useEffect(() => {
    if (popup === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [popup]);


 
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
        style={{ minHeight: "72vh", maxWidth: "2400px" }}
      >
        {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

        <div
          className="container-nft align-items-start justify-content-start d-flex flex-column gap-2 px-3 px-lg-5 my-4"
          style={{ minHeight: "72vh", backgroundSize: "cover" }}
        >
          <div className="container-lg mx-0">
            <div className={`col-12 col-lg-12`}>
              <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
                Event
                <span style={{ color: "#8c56ff" }}> Center</span>
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
                  <div className="d-flex justify-content-center">
                    <div className="new-packages-grid mb-3">
                      <NavLink to="/marketplace/events/dragon-ruins">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "dragon" &&
                              eventId === "dragon-ruins" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("dragon")}
                          >
                            <img
                              src={dragonPackage}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Dragon Ruins
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/golden-pass">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "dyp" &&
                              eventId === "golden-pass" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("dyp")}
                          >
                            <img
                              src={goldenPass}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Golden Pass
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/puzzle-madness">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "idyp" &&
                              eventId === "puzzle-madness" &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("idyp")}
                          >
                            <img
                              src={puzzleMadness}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Puzzle Madness
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/critical-hit">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "criticalHit"&&
                              eventId === "critical-hit"  &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("criticalHit")}
                          >
                            <img
                              src={criticalHit}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                              Critical Hit
                            </span>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/marketplace/events/betapass">
                        <div className="">
                          <div
                            className={`nft-event-package p-2 d-flex align-items-center flex-column gap-2 ${
                              selectedPackage === "betaPass"&&
                              eventId === "betapass"  &&
                              "selected-event-package"
                            }`}
                            onClick={() => setSelectedPackage("betaPass")}
                          >
                            <img
                              src={require('./assets/betaPassDummy.png')}
                              className="w-100"
                              style={{ borderRadius: "16px" }}
                              alt=""
                            />
                            <span className="event-package-title">
                             Beta Pass
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <NewBundleCard
                    onOpenPopup={onOpenPopup}
                    coinbase={account}
                    wallet={data?.getPlayer?.wallet?.publicAddress}
                    chainId={chainId}
                    getDypBalance={getDypBalance}
                    getiDypBalance={getDypBalance}
                    dyptokenDatabnb={dyptokenDatabnb}
                    idyptokenDatabnb={idyptokenDatabnb}
                    packageData={
                      selectedPackage === "dragon"
                        ? dragonData
                        : selectedPackage === "dyp"
                        ? dypPackageData
                        : selectedPackage === "criticalHit"
                        ? criticalHitPackageData : 
                        selectedPackage === "betaPass" ?
                        betaPassPackageData
                        : iDypPackageData
                    }
                    handleSetAvailableTime={(value) => {
                      setAvailableTime(value);
                      handleAvailableTime(value);
                    }}
                    availableTime={availableTime}
                  />
                </>
              )}
              {activeTab === "upcoming" && (
                <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <h6 className="upcoming-stake">New events are coming...</h6>
                    <span className="upcoming-stake-desc">
                      Check back soon!
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "past" && (
                <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <h6 className="upcoming-stake">
                      There are no previous events!
                    </h6>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setPopup(false);
          setPackagePopup("");
        }}
      >
        {popup && packagePopup === "dragon" && (
          <DragonPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "goldenpass" && (
          <GoldenPassPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "puzzlemadness" && (
          <PuzzleMadnessPopup onClosePopup={onClosePopup} />
        )}
        {popup && packagePopup === "criticalhit" && (
          <CriticalHitPopup onClosePopup={onClosePopup} />
        )}
      </OutsideClickHandler>
    </>
  );
};

export default MarketEvents;
