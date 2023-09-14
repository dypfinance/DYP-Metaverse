import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import arrowRight from "./assets/arrowRight.svg";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import coin98 from "./assets/coin98.svg";
import coingecko from "./assets/coingecko.svg";
import conflux from "./assets/conflux.svg";
import gateWhite from "./assets/gateWhite.svg";

import coinbaseimg from "./assets/base.svg";
import { useLocation } from "react-router-dom";
import blockChainIcon from "../assets/blockChainIcon.svg";
import confluxLogo from "../assets/confluxLogo.svg";
import baseLogo from "../assets/baseLogo.svg";
import bnbLogo from "../assets/bnbLogo.svg";
import wodLogo from "../assets/wodIcon.png";
import blackWallet from "../../../assets/wallet-black.svg";
import whitewallet from "../../../assets/wallet-white.svg";
import addActive from "../../../assets/landAssets/addActive.svg";
import addInactive from "../../../assets/landAssets/addInactive.svg";
import subtractActive from "../../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../../assets/landAssets/subtractInactive.svg";
import dummyBadge from "../../../assets/landAssets/dummyBadge.png";
import avaxLogo from "./assets/avaxLogo.svg";
import betapassBanner from "./assets/betaPassBanner.png";
import betapassBannerConflux from "./assets/betaPassBannerConflux.webp";
import betapassBannerGate from "./assets/betaPassBannerGate.webp";

import avaxbetapassBanner from "./assets/betapassAvax.png";
import geckobetapassBanner from "./assets/betaPassBannerGecko.png";
import SignUpGecko from "../../Account/src/Containers/SingUp/SignUpGecko";
import PlayerCreationGecko from "../../Account/src/Containers/PlayerCreation/PlayerCreationGecko";
import pinkArea from "./assets/pinkArea.svg";
import pinkAreaConflux from "./assets/pinkAreaConflux.svg";
import pinkAreaGate from "./assets/pinkAreaGate.svg";
import avaxBetaBanner from "./assets/avaxBetaBanner.png";
import coingeckoBetaBanner from "./assets/coingeckoBetaBanner.png";
import confluxBetaBanner from "./assets/confluxBetaBanner.png";
import gateBetaBanner from "./assets/gateBetaBanner.png";
import coin98BetaBanner from "./assets/coin98BetaBanner.png";

import walletImg from "./assets/wallet.svg";
import circleArrow from "./assets/arrow-circle.svg";
import termsArrow from "./assets/termsArrow.svg";
import popupXmark from "../assets/popupXmark.svg";
import user from "./assets/user.svg";
import downloadArrow from "./assets/downloadArrow.svg";

import {
  GENERATE_NONCE,
  GET_PLAYER,
  VERIFY_WALLET,
} from "../../Account/src/Containers/Dashboard/Dashboard.schema";
import OutsideClickHandler from "react-outside-click-handler";
import switchIcon from "./assets/switchIcon.svg";
import metamaskIcon from "./assets/metamaskIcon.svg";
import coin98Wallet from "./wallets/coin98.png";
import trustWallet from "./wallets/trustwallet.png";
import coinbaseWallet from "./wallets/coinbase.png";
import safepalWallet from "./wallets/safepal.png";
import gateWallet from "./wallets/gateWallet.png";

import { shortAddress } from "../../Caws/functions/shortAddress";
import { handleSwitchNetworkhook } from "../../../hooks/hooks";
import avaxMobileBg from "../../../components/TimepieceMint/assets/avaxMobileBg.png";
import coin98MobileBg from "../../../components/TimepieceMint/assets/coin98MobileBg.png";
import baseMobileBg from "../../../components/TimepieceMint/assets/baseMobileBg.png";
import confluxMobileBg from "../../../components/TimepieceMint/assets/confluxMobileBg.png";
import { useParams } from "react-router-dom";

const BetaPassNFT = ({
  isConnected,
  handleConnect,
  listedNFTS,
  coinbase,
  ethTokenData,
  dypTokenData,
  cawsBought,
  handleRefreshListing,
  chainId,
  totalCreated,
  totalCoingeckoNft,
  myGateNfts,
  totalGateNft,
  mintloading,
  showWalletConnect,
  cawsArray,
  textColor,
  mintStatus,
  nftName,
  handleMint,
  totalConfluxNft,
  myConfluxNfts,
  myNFTSCoingecko,
  handleSwitchNetwork,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();

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

  const confluxData = {
    id: "conflux",
    cardTitle: "Conflux Beta Pass",
    title: "Conflux Beta Pass",
    background: "conflux-mint-bg2",
  };

  const avaxData = {
    id: "avax",
    cardTitle: "Avalanche Beta Pass",
    title: "Avalanche Beta Pass",
    background: "avalanche-mint-bg",
  };

  const timepieceData = {
    id: "timepiece",
    cardTitle: "Caws Timepiece",
    title: "Timepiece",
    background: "market-mint-bg",
  };
  const coin98Data = {
    id: "coin98",
    cardTitle: "Coin98 Beta Pass",
    title: "Coin98 Beta Pass",
    background: "coin98-mint-bg",
  };
  const coingeckoData = {
    id: "coingecko",
    cardTitle: "CoinGecko Beta Pass",
    title: "CoinGecko Beta Pass",
    background: "coingecko-mint-bg",
  };
  const baseData = {
    id: "base",
    cardTitle: "Base Beta Pass",
    title: "Base Beta Pass",
    background: "base-mint-bg",
  };

  const gateData = {
    id: "gate",
    cardTitle: "Gate Beta Pass",
    title: "Gate Beta Pass",
    background: "gate-mint-bg",
  };

  const locationState = location?.pathname;

  const [priceCount, setPriceCount] = useState(0);
  const [filterTitle, setFilterTitle] = useState("Filter");
  const [showBadge, setshowBadge] = useState(false);
  const [latestMintId, setlatestMintId] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const [status, setStatus] = useState("Connect your wallet.");
  const [activeButton, setactiveButton] = useState(false);
  const [selectedMint, setSelectedMint] = useState(coingeckoData);
  const [mintTitle, setMintTitle] = useState("coingecko");
  const [nftCount, setNftCount] = useState(1);
  const [nftStatus, setNftStatus] = useState("*50 NFT limit");
  const [viewCollection, setViewCollection] = useState(false);
  const [playerCreation, setplayerCreation] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [linkWallet, setLinkWallet] = useState(false);
  const [alreadyRegistered, setalreadyRegistered] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openConflux, setOpenConflux] = useState(false);
  const [nftSymbol, setnftSymbol] = useState("");

  const html = document.querySelector("html");
  const bgmenu = document.querySelector("#terms");
  const bgmenu2 = document.querySelector("#switch");

  useEffect(() => {
    if (mintTitle === "conflux" && coinbase && chainId && chainId !== 1030) {
      setOpenConflux(true);
    } else setOpenConflux(false);
  }, [mintTitle, coinbase, chainId]);

  const getNftSymbol = async () => {
    if (mintTitle !== "conflux") {
      const contract = new window.bscWeb3.eth.Contract(
        mintTitle === "coingecko"
          ? window.COINGECKO_NFT_ABI
          : window.GATE_NFT_ABI,
        mintTitle === "coingecko"
          ? window.config.nft_coingecko_address
          : window.config.nft_gate_address
      );
      const symbol = await contract.methods.symbol().call();
      setnftSymbol(symbol);
    } else if (mintTitle === "conflux") {
      const contract = new window.confluxWeb3.eth.Contract(
        window.CONFLUX_NFT_ABI,
        window.config.nft_conflux_address
      );
      const symbol = await contract.methods.symbol().call();
      setnftSymbol(symbol);
    }
  };

  const handleConfluxPool = async () => {
    await handleSwitchNetworkhook("0x406")
      .then(() => {
        handleSwitchNetwork(1030);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (openTerms === true || openConflux === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      bgmenu2.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openTerms, openConflux]);

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  const handleViewCollection = () => {
    setViewCollection(true);
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const handleCreate = () => {
    handleMint({
      numberOfTokens: parseInt(nftCount),
    });
  };

  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum?.enable();
        console.log("Connected!");

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
      const signer = provider.getSigner(coinbase);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: coinbase,
          signature: signature,
        },
      }).then(() => {
        setalreadyRegistered(true);
      });
    } catch (error) {
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
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

  const { terms } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllCawsCollection();
    document.title = "Beta Pass";

    if (terms) {
      setOpenTerms(true);
    }
  }, []);

  useEffect(() => {
    if (locationState.includes("/beta-pass/conflux")) {
      setSelectedMint(confluxData);
      setMintTitle("conflux");
    } else if (locationState.includes("/beta-pass/coingecko")) {
      setSelectedMint(coingeckoData);
      setMintTitle("coingecko");
    } else if (locationState.includes("/beta-pass/coin98")) {
      setSelectedMint(coin98Data);
      setMintTitle("coin98");
    } else if (locationState.includes("/beta-pass/base")) {
      setSelectedMint(baseData);
      setMintTitle("base");
    } else if (locationState.includes("/beta-pass/avalanche")) {
      setSelectedMint(avaxData);
      setMintTitle("avalanche");
    } else if (locationState.includes("/beta-pass/gate")) {
      setSelectedMint(gateData);
      setMintTitle("gate");
    }
  }, []);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      !data.getPlayer.wallet
    ) {
      setLinkWallet(true);
      setEmailVerify(true);
      setplayerCreation(true);
    } else if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet.publicAddress
    ) {
      setalreadyRegistered(true);
    }
  }, [data]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    getNftSymbol();
  }, [mintTitle]);

  return (
    <>
      <div
        id="header"
        // onScroll={onScroll}
        // ref={listInnerRef}
        // style={{ overflow: "scroll" }}
      >
        <div
          className="container-fluid d-flex justify-content-end p-0"
          style={{ minHeight: "72vh", maxWidth: "2400px" }}
        >
          {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

          <div
            className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative flex-column"
            style={{ backgroundSize: "cover" }}
          >
            <div className="container-lg mx-0 position-relative">
              <div className="row align-items-center justify-content-between mt-4 mb-5 gap-4 gap-lg-0">
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-column gap-3">
                    <h6 className="nft-page-title pt-4 pt-lg-0 mt-5 mt-lg-4">
                      {mintTitle} Beta Pass
                    </h6>
                    <p className="collection-desc">
                      The Beta Pass NFT provides you with a special ticket to
                      enter the metaverse and participate in an exclusive event
                      hosted by{" "}
                      {mintTitle === "conflux"
                        ? "Conflux"
                        : mintTitle === "gate"
                        ? "Gate.io"
                        : mintTitle === "coingecko"
                        ? "CoinGecko"
                        : "our partners"}
                      . During this event, players have the opportunity to earn
                      Points for their leaderboard rankings, and also collect
                      rewards in different tokens, which are distributed on a
                      monthly basis.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4 px-0">
                  <img
                    src={
                      mintTitle === "avalanche"
                        ? avaxBetaBanner
                        : mintTitle === "coingecko"
                        ? coingeckoBetaBanner
                        : mintTitle === "conflux"
                        ? confluxBetaBanner
                        : mintTitle === "gate"
                        ? gateBetaBanner
                        : mintTitle === "coin98"
                        ? coin98BetaBanner
                        : betapassBanner
                    }
                    className="w-100"
                    alt=""
                  />
                </div>
              </div>
              {/* <div
              className="filters-container d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-center my-4 p-3 position-relative gap-3"
              style={{ zIndex: 2 }}
            >
              <div className="d-flex align-items-center gap-4 justify-content-center flex-wrap">
               
              <NavLink
                  to={"/marketplace/beta-pass/avalanche"}
                  className={`${
                    location.pathname.includes("avalanche") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(avaxData); setMintTitle("avalanche")}}
                >
                  <img src={avaxLogo} className="beta-pass-chain-img" alt="" />
                  <span>Avalanche</span>
                </NavLink>

                <NavLink
                  to={"/marketplace/beta-pass/conflux"}
                  className={`${
                    location.pathname.includes("conflux") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(confluxData); setMintTitle("conflux")}}
                >
                  <img src={conflux} className="beta-pass-chain-img" alt="" />
                  <span>Conflux</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coin98"}
                  className={`${
                    location.pathname.includes("coin98") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(coin98Data); setMintTitle("coin98")}}
                >
                  <img src={coin98} className="beta-pass-chain-img" alt="" />
                  <span>Coin98</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/coingecko"}
                  className={`${
                    location.pathname.includes("coingecko") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(coingeckoData); setMintTitle("coingecko")}}

                >
                  <img src={coingecko} className="beta-pass-chain-img" alt="" />
                  <span>CoinGecko</span>
                </NavLink>
                <NavLink
                  to={"/marketplace/beta-pass/base"}
                  className={`${
                    location.pathname.includes("base") &&
                    "selected-beta-pass-item"
                  } beta-pass-item py-2 px-4 d-flex align-items-center gap-2`}
                  onClick={() => {setSelectedMint(baseData); setMintTitle("base")}}

                >
                  <img
                    src={coinbaseimg}
                    className="beta-pass-chain-img"
                    alt=""
                  />
                  <span>Base</span>
                </NavLink>
              </div>
            </div> */}

              <div className=" nft-page-wrapper d-flex flex-column flex-xxl-row gap-3 mb-3">
                {mintTitle !== "coingecko" &&
                  mintTitle !== "conflux" &&
                  mintTitle !== "gate" && (
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
                              mintTitle !== "timepiece"
                                ? "conflux-empty"
                                : totalCreated > 0
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
                  )}
                <div
                  className={
                    mintTitle === "coingecko" ||
                    mintTitle === "conflux" ||
                    mintTitle === "gate"
                      ? "col-12 col-md-12 col-xxl-7 mt-0 px-0"
                      : "col-12 col-md-12 col-xxl-5 mt-0 px-0"
                  }
                  style={{ overflowX: "hidden" }}
                >
                  <div
                    className={`p-4 mint-wrappernew ${selectedMint.background} w-100 m-0 d-flex flex-column gap-5 justify-content-start staking-height`}
                    style={{ minHeight: "463px" }}
                  >
                    <h6 className="marketmintnewtitle position-relative">
                      {mintTitle === "coingecko" && (
                        <>
                          Get Your CoinGecko Beta Pass
                          <br className="d-none d-lg-flex" /> via
                          <span className="marketmintnewtitle-marked mx-2">
                            Candy Rewards!
                          </span>
                        </>
                      )}
                      {mintTitle !== "coingecko" &&
                        mintTitle !== "conflux" &&
                        mintTitle !== "gate" && (
                          <>
                            Mint your {selectedMint.title}{" "}
                            <br className="d-none d-lg-flex" />
                            NFT
                            <span className="marketmintnewtitle-marked mx-2">
                              now!
                            </span>{" "}
                          </>
                        )}
                      {(mintTitle === "conflux" || mintTitle === "gate") && (
                        <>
                          Get your {selectedMint.title}{" "}
                          <br className="d-none d-lg-flex" />
                          NFT
                          <span className="marketmintnewtitle-marked mx-2">
                            now!
                          </span>{" "}
                        </>
                      )}
                    </h6>
                    <div className="d-flex flex-column gap-4 p-3 pt-xxl-0 pt-lg-0 col-12 col-md-9 col-lg-7  justify-content-between align-items-start position-relative">
                      <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row align-items-center gap-2 w-100 justify-content-center justify-content-xxl-between  justify-content-xl-between  justify-content-lg-between ">
                        <div className="mint-benefits-grid">
                          {benefits.map((item) => (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={require(`../../../components/TimepieceMint/assets/${item.icon}.png`)}
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
                          {mintTitle === "base" ? (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={blockChainIcon}
                                width={32}
                                height={32}
                                alt=""
                              />
                              <span className="mint-benefits-title">
                                Minting is available on Base Network
                              </span>
                            </div>
                          ) : mintTitle === "coin98" ? (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={blockChainIcon}
                                width={32}
                                height={32}
                                alt=""
                              />
                              <span className="mint-benefits-title">
                                Minting is available on BNB Chain
                              </span>
                            </div>
                          ) : null}
                        </div>
                        {mintTitle === "coingecko" && (
                          <div className="position-relative">
                            <img src={pinkArea} alt="" />
                          </div>
                        )}
                        {mintTitle === "gate" && (
                          <div className="position-relative">
                            <img src={pinkAreaGate} alt="" />
                          </div>
                        )}
                        {mintTitle === "conflux" && (
                          <div className="position-relative">
                            <img src={pinkAreaConflux} alt="" />
                          </div>
                        )}
                      </div>
                      <img
                        src={
                          mintTitle === "avalanche"
                            ? avaxMobileBg
                            : mintTitle === "base"
                            ? baseMobileBg
                            : mintTitle === "coin98"
                            ? coin98MobileBg
                            : null
                        }
                        className="smaillmintbg d-block d-xl-none d-xxl-none d-lg-none"
                        alt=""
                      />
                      {mintTitle === "coingecko" && (
                        <a
                          className={`btn coingecko-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                          href="https://www.coingecko.com/account/rewards/worldofdypians-nft"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={coingecko}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                          Get Beta Pass
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                        </a>
                      )}

                      {mintTitle === "gate" && (
                        <button
                          className={`btn gate-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img
                            src={gateWhite}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                          Gate.io Giveaway
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                        </button>
                      )}

                      {mintTitle === "conflux" && (
                        <button
                          className={`btn conflux-btn px-3 d-flex align-items-center justify-content-center gap-2`}
                        >
                          <img
                            src={conflux}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                          Conflux Giveaway
                          <img
                            src={arrowRight}
                            alt=""
                            style={{ width: 16, height: 16 }}
                          />{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    mintTitle === "coingecko" ||
                    mintTitle === "conflux" ||
                    mintTitle === "gate"
                      ? "col-12 col-md-12 col-xxl-5 mt-0 px-0 px-lg-2"
                      : "col-12 col-md-12 col-xxl-4 mt-0 px-0 px-lg-2"
                  }
                >
                  {mintTitle !== "coingecko" &&
                  mintTitle !== "conflux" &&
                  mintTitle !== "gate" ? (
                    <div className="p-3 mint-wrappernew d-flex flex-column justify-content-between staking-height gap-2">
                      <div className="row flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center justify-content-between">
                        <div className="d-flex justify-content-between gap-2 position-relative flex-column flex-xxl-row flex-lg-row flex-md-row">
                          <span className="land-name">
                            Mint your NFT{" "}
                            {/* <span
                          className="addr-text"
                          style={{ color: "rgb(123, 216, 176)" }}
                        >
                          {cawsArray.length}
                        </span> */}
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
                      ) : mintTitle === "base" ? (
                        <span
                          className="limit-span position-relative d-flex align-items-center gap-2"
                          style={{ bottom: "0px" }}
                        >
                          Available only on Base Network
                          <img src={baseLogo} alt="" />
                        </span>
                      ) : mintTitle === "coin98" ||
                        mintTitle === "coingecko" ? (
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
                                (isConnected === true && chainId !== 56) ||
                                (status !== "Connect your wallet." &&
                                  status !== "") ||
                                mintloading === "error"
                                  ? "linear-border-disabled"
                                  : "linear-border"
                              }
                            >
                              <button
                                className={`btn ${
                                  mintloading === "error"
                                    ? "filled-error-btn"
                                    : status !== "Connect your wallet." &&
                                      status !== ""
                                    ? "outline-btn-disabled"
                                    : "filled-btn"
                                }  px-4 w-100`}
                                onClick={() => {
                                  isConnected === true && chainId === 56
                                    ? handleCreate()
                                    : showWalletConnect();
                                }}
                                disabled={
                                  mintloading === "error" ||
                                  mintloading === "success" ||
                                  (status !== "Connect your wallet." &&
                                    status !== "")
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
                                {(isConnected === false || chainId !== 56) && (
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
                                chainId === 56 ? (
                                  "Mint"
                                ) : mintloading === "mint" &&
                                  isConnected === true &&
                                  chainId === 56 ? (
                                  <>
                                    <div
                                      className="spinner-border "
                                      role="status"
                                    ></div>
                                  </>
                                ) : mintloading === "error" &&
                                  isConnected === true &&
                                  chainId === 56 ? (
                                  "Failed"
                                ) : mintloading === "success" &&
                                  isConnected === true &&
                                  activeButton ===
                                    (isConnected === true && chainId === 56) ? (
                                  "Success"
                                ) : isConnected === true && chainId !== 56 ? (
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
                  ) : (
                    <div
                      className={` ${
                        playerCreation
                          ? "justify-content-center"
                          : "justify-content-between"
                      } p-4 mint-wrappernew d-flex flex-column staking-height gap-4 gap-lg-2`}
                    >
                      {/* <h6
                      className="land-placeholder mb-0"
                      style={{ marginLeft: 11 }}
                    >
                      The Beta Pass NFTs are available on CoinGecko Candy
                      Program.
                    </h6>
                    <div className="coingeckonft-wrapper p-3">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1 className="coingecko-nft-number m-0">5,000</h1>
                        <span className="coingecko-nft-desc">
                          Beta Pass NFTs
                        </span>
                      </div>
                    </div>
                    <hr className="mint-divider mt-2 mb-2" />
                    <div className={"linear-border mx-auto"}>
                      <button className={`btn filled-btn px-5 w-auto`}>
                        Get Beta Pass
                      </button>
                    </div> */}
                      {!alreadyRegistered && (
                        <h6 className="land-name">Create account</h6>
                      )}
                      {alreadyRegistered && (
                        <h6 className="land-name">
                          {totalCoingeckoNft > 0 ||
                          totalGateNft > 0 ||
                          totalConfluxNft > 0
                            ? "My NFT"
                            : "Registered"}{" "}
                        </h6>
                      )}
                      {!alreadyRegistered && (
                        <div>
                          <ul class="timeline m-0 p-0" id="timeline">
                            <li class="col-3 li complete">
                              <div class="status">
                                <h4 className="listtext"> Create </h4>
                              </div>
                            </li>
                            <li class={`col-3 li ${showVerify && "complete"} `}>
                              <div class="status">
                                <h4 className="listtext"> Verify </h4>
                              </div>
                            </li>
                            <li
                              class={`col-3 li ${
                                playerCreation && "complete"
                              } `}
                            >
                              <div class="status">
                                <h4 className="listtext"> Profile </h4>
                              </div>
                            </li>
                            <li
                              class={`col-2 li ${linkWallet && "complete"}`}
                              style={{ width: 0 }}
                            >
                              <div class="status">
                                <h4
                                  className="listtext"
                                  style={{ width: 0, whiteSpace: "nowrap" }}
                                >
                                  Link Wallet
                                </h4>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                      {playerCreation === false && !alreadyRegistered && (
                        <SignUpGecko
                          onSuccessVerify={(value) => {
                            setplayerCreation(value);
                          }}
                          onEmailVerify={(value) => {
                            setEmailVerify(value);
                          }}
                          onShowVerify={(value) => {
                            setShowVerify(value);
                          }}
                          onSuccessLogin={() => {
                            setalreadyRegistered(true);
                            refetchPlayer();
                          }}
                          mintTitle={selectedMint.cardTitle}
                          chainId={chainId}
                        />
                      )}
                      {playerCreation === true &&
                        linkWallet === false &&
                        !alreadyRegistered && (
                          <PlayerCreationGecko
                            onSuccessCreation={() => {
                              setLinkWallet(true);
                            }}
                            mintTitle={selectedMint.cardTitle}
                          />
                        )}

                      {linkWallet === true && !alreadyRegistered && (
                        <div className="d-flex flex-column gap-4 justify-content-between p-4">
                          <span className={"createplayertxt"}>
                            *Make sure to connect the same wallet address as the
                            one you used for{" "}
                            {mintTitle === "coingecko"
                              ? "CoinGecko Candy Rewards"
                              : "Conflux Giveaway"}
                            .
                          </span>
                          <div
                            className="walletconnectBtn w-100"
                            onClick={connectWallet}
                          >
                            <div className="d-flex gap-2 justify-content-between align-items-center">
                              <div className="d-flex gap-2 align-items-center">
                                <img src={walletImg} alt="" />
                                <div className="d-flex flex-column">
                                  <span className="secondTitle">
                                    Connect wallet
                                  </span>

                                  <span className="firsttitle">
                                    Link your wallet
                                  </span>
                                </div>
                              </div>
                              <img src={circleArrow} alt="" />
                            </div>
                          </div>
                          <span className="footertxt-coingecko mt-4">
                            Users who have claimed the {selectedMint.cardTitle}{" "}
                            NFT are required to create a WoD Account to receive
                            the NFT and participate in the exclusive event.
                          </span>
                          <div className="summaryseparator"></div>
                        </div>
                      )}
                      {alreadyRegistered && (
                        <div className="d-flex flex-column justify-content-between h-100">
                          <div className="col-12 col-lg-5 d-flex flex-column mx-auto position-relative">
                            <div
                              className={`coingeckoempty-wrapper ${
                                mintTitle !== "timepiece" &&
                                totalCoingeckoNft === 0 &&
                                mintTitle === "coingecko"
                                  ? "conflux-empty"
                                  : totalCoingeckoNft > 0 &&
                                    mintTitle === "coingecko"
                                  ? "coingecko-active"
                                  : totalGateNft > 0 && mintTitle === "gate"
                                  ? "gate-active"
                                  : totalConfluxNft > 0 &&
                                    mintTitle === "conflux"
                                  ? "conflux-active"
                                  : "conflux-empty"
                              } d-flex justify-content-center align-items-center p-3 position-relative`}
                              style={{ height: 210 }}
                            ></div>
                            <div
                              className="genesis-desc px-3 py-2 position-relative"
                              style={{
                                bottom:
                                  totalCoingeckoNft > 0 ||
                                  totalConfluxNft > 0 ||
                                  totalGateNft > 0
                                    ? "20px"
                                    : "5px",
                                minWidth: "100%",
                                maxWidth: "100%",
                              }}
                            >
                              <h6
                                className="land-desc w-75 m-auto text-center"
                                style={{ fontWeight: 500, fontSize: 16 }}
                              >
                                {mintTitle === "coingecko" ||
                                mintTitle === "gate" ||
                                mintTitle === "conflux"
                                  ? nftSymbol
                                  : selectedMint.cardTitle}{" "}
                                {mintTitle === "coingecko"
                                  ? totalCoingeckoNft > 0 &&
                                    `#${myNFTSCoingecko[0]}`
                                  : mintTitle === "gate"
                                  ? totalGateNft > 0 && `#${myGateNfts[0]}`
                                  : mintTitle === "conflux"
                                  ? totalConfluxNft > 0 &&
                                    `#${myConfluxNfts[0]}`
                                  : ""}
                              </h6>
                            </div>
                          </div>
                          <span className="footertxt-coingecko">
                            After NFT distribution, you can view{" "}
                            {selectedMint.cardTitle}.
                          </span>
                          <div className="summaryseparator mt-3 mb-3"></div>
                          <div className="d-flex align-items-center gap-2 justify-content-between">
                            <a
                              href="https://drive.google.com/drive/folders/1zURuJDGoePa9V1GMkTGTbKMcaFd4UScp"
                              target="_blank"
                              rel="noreferrer"
                              className="downloadbtn-coingecko btn d-flex align-items-center gap-1"
                            >
                              <img src={downloadArrow} alt="" /> Download
                            </a>
                            <NavLink
                              to="/account"
                              className="accountbtn-coingecko btn d-flex align-items-center gap-1"
                            >
                              <img src={user} alt="" />
                              My Account
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {mintTitle === "coingecko" && (
                <div
                  className="d-flex align-items-center gap-2 terms-wrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenTerms(true)}
                >
                  <NavLink to="/marketplace/beta-pass/coingecko/terms-conditions">
                    <span className="terms-and-conditions mb-0">
                      Terms & Conditions
                    </span>
                    <img src={termsArrow} alt="" />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenConflux(false)}>
        <div
          className={`popup-wrapper-2 ${
            openConflux && "popup-active"
          } p-4 gap-3 d-flex flex-column align-items-center`}
          id="switch"
        >
          <div className="d-flex align-items-center justify-content-end w-100">
            <img
              src={popupXmark}
              onClick={() => setOpenConflux(false)}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <img src={confluxLogo} width={40} height={40} alt="" />
          <h6 className="switch-network mb-0">Switch Network</h6>
          <span className="switch-network-desc">
            We've detected that you're connected to{" "}
            {chainId === 1
              ? "Ethereum Network"
              : chainId === 56
              ? "BNB Chain"
              : chainId === 43113
              ? "Avalanche"
              : "Base"}
            .
          </span>
          <div className="metamask-info-wrapper mt-2 w-100 d-flex p-3 align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img
                src={
                  window.ethereum?.isMetaMask && !window.gatewallet
                    ? metamaskIcon
                    : window.coin98
                    ? coin98Wallet
                    : window.ethereum?.isTrust
                    ? trustWallet
                    : window.ethereum?.isCoinbaseWallet
                    ? coinbaseWallet
                    : window.gatewallet
                    ? gateWallet
                    : safepalWallet
                }
                width={32}
                height={32}
                alt=""
              />
              <div className="d-flex flex-column">
                <h6 className="metamask-info-title">
                  {window.ethereum?.isMetaMask && !window.gatewallet
                    ? "MetaMask Wallet"
                    : window.coin98
                    ? "Coin98 Wallet"
                    : window.ethereum?.isTrust
                    ? "Trustwallet"
                    : window.ethereum?.isCoinbaseWallet
                    ? "Coinbase Wallet"
                    : window.gatewallet
                    ? "Gate Wallet"
                    : "Safepal Wallet"}
                </h6>
                <span className="metamask-short-address mb-0">
                  {shortAddress(coinbase)}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                className="green-dot"
                style={{ width: "5px", height: "5px" }}
              ></div>
              <span className="popup-chain">
                {chainId === 1
                  ? "Ethereum Network"
                  : chainId === 56
                  ? "BNB Chain"
                  : chainId === 43113
                  ? "Avalanche"
                  : "Base"}
              </span>
            </div>
          </div>
          <button
            className="btn switch-network-btn mt-3 d-flex align-items-center gap-2 px-5 py-2"
            onClick={handleConfluxPool}
          >
            <img src={switchIcon} alt="" />
            Switch to Conflux Network
          </button>
        </div>
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={() => setOpenTerms(false)}>
        <div
          className={`popup-wrapper ${
            openTerms && "popup-active"
          } p-4 d-flex flex-column`}
          style={{ borderRadius: "12px" }}
          id="terms"
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6
              className="nft-page-title mb-0"
              style={{ fontSize: "27px", fontWeight: "600" }}
            >
              Terms & Conditions
            </h6>
            <img
              src={popupXmark}
              onClick={() => setOpenTerms(false)}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <ul className="terms-list">
            <li className="collection-desc mb-2 mb-lg-3">
              Users are required to create a game account using the same email
              and BEP20 wallet address as the one used for CoinGecko Candy
              Rewards.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              Users must maintain ownership of the CoinGecko Beta Pass NFT in
              their wallet address at all times in order to access the game and
              its associated benefits.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The CoinGecko Beta Pass NFT eligibility is limited to one per
              wallet.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              All benefits associated with the Beta Pass NFT are transferable if
              the NFT is transferred to another wallet.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              A total of 5,000 CoinGecko Beta Pass NFTs are eligible to be
              redeemed by users.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The redemption period begins on September 18 and concludes once
              all the NFTs have been distributed.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              The special event will be available from September 25 to November
              26.
            </li>
            <li className="collection-desc mb-2 mb-lg-3">
              World of Dypians reserves the right to organise additional events
              in the future for all Beta Pass NFT holders.
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default BetaPassNFT;
