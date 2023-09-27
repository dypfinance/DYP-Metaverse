import React, { useEffect, useState } from "react";
import "./_mobilenavbar.scss";
import metaverse from "../../assets/navbarAssets/metaverse.svg";
import mobileArrow from "../../assets/navbarAssets/mobileArrow.svg";
import xMark from "../../assets/navbarAssets/xMark.svg";
import { NavLink } from "react-router-dom";
import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import person from "../Header/assets/person.svg";
import check from "../Header/assets/check.svg";
import copy from "../Header/assets/copy.svg";
import bellIcon from "./assets/bellIcon.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Clipboard from "react-clipboard.js";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import avax from "../Header/assets/avax.svg";
import bnb from "../Header/assets/bnb.svg";
import eth from "../Header/assets/eth.svg";
import base from "../Header/assets/base.svg";
import conflux from "../Header/assets/conflux.svg";
import error from "../Header/assets/error.svg";
import dropdown from "../Header/assets/dropdown.svg";

const MobileNavbar = ({
  handleSignUp,
  handleRedirect,
  coinbase,
  avatar,
  handleDisconnect,
  myOffers,
  handleRefreshList,
  nftCount,
  chainId,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const [ethState, setEthState] = useState(true);
  const [bnbState, setBnbState] = useState(false);
  const [avaxState, setAvaxState] = useState(false);
  const [baseState, setBaseState] = useState(false);
  const [confluxState, setConfluxState] = useState(false);

  const bgmenu = document.querySelector("#bgmenu");
  const hamburger = document.querySelector("#mobileNavbar");
  const html = document.querySelector("html");
  let id = Math.random().toString(36);

  const checkRead = () => {
    if (myOffers.length > 0) {
      let count = myOffers.filter(({ read }) => read === false).length;
      setunreadNotifications(count);
    }
  };

  const setActiveChain = () => {
    if (chainId) {
      if (chainId === 1) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(true);
        setBaseState(false);
      } else if (chainId === 43114) {
        setAvaxState(true);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
      } else if (chainId === 8453) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(true);
      } else if (chainId === 56) {
        setAvaxState(false);
        setBnbState(true);
        setEthState(false);
        setBaseState(false);
      } else if (chainId === 1030) {
        setAvaxState(false);
        setBnbState(false);
        setEthState(false);
        setBaseState(false);
        setConfluxState(true);
      } else {
        setAvaxState(false);
        setBnbState(false);
        setBaseState(false);
        setEthState(false);
      }
    }
  };

  const handleEthPool = async () => {
    if (window.ethereum) {
      await handleSwitchNetworkhook("0x1")
        .then(() => {
          handleSwitchNetwork(1);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBnbPool = async () => {
    if (window.ethereum) {
      await handleSwitchNetworkhook("0x38")
        .then(() => {
          handleSwitchNetwork(56);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        handleSwitchChainGateWallet();
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  useEffect(() => {
    if (chainId === 1) {
      handleSwitchNetwork(1);
    }

    if (chainId === 56) {
      handleSwitchNetwork(56);
    }

    // if (chainId === 43114) {
    //   handleSwitchNetwork(43114);
    // }
  }, [chainId, coinbase]);

  useEffect(() => {
    setActiveChain();
  }, [chainId, ethState]);

  useEffect(() => {
    checkRead();
  }, [myOffers, coinbase, nftCount]);

  useEffect(() => {
    if (openNavbar === true) {
      html.classList.add("hidescroll");
      bgmenu.style.pointerEvents = "auto";
      hamburger.style.pointerEvents = "auto";
    } else {
      // Enable scroll
      html.classList.remove("hidescroll");
    }
  }, [openNavbar]);

  return (
    <>
      <div
        className="mobile-navbar d-flex d-lg-none p-3 align-items-center justify-content-between"
        id="mobileNavbar"
      >
        <NavLink to="/">
          <img src={metaverse} alt="metaverse" width={126} />
        </NavLink>
        <div className="d-flex align-items-center gap-3 justify-content-between">
          <NavLink to="/notifications">
            <div className="position-relative">
              <img
                src={bellIcon}
                width={30}
                style={{ cursor: "pointer" }}
                height={30}
                alt=""
              />

              {unreadNotifications > 0 && (
                <div className="bell-amount">
                  <span className="mb-0">
                    {unreadNotifications > 99 ? "99+" : unreadNotifications}
                  </span>
                </div>
              )}
            </div>
          </NavLink>
          <DropdownButton
            id="dropdown-basic-button"
            className="d-flex align-items-center justify-content-center"
            title={
              <span className="dropdown-title">
                <img
                  src={
                    ethState === true
                      ? eth
                      : bnbState === true
                      ? bnb
                      : // : avaxState === true
                      // ? avax
                      // : baseState === true
                      // ? base
                      confluxState === true
                      ? conflux
                      : error
                  }
                  height={16}
                  width={16}
                  alt=""
                />
                <span className="change-chain-text d-none d-lg-flex">
                  {ethState === true
                    ? "Ethereum"
                    : bnbState === true
                    ? "BNB Chain"
                    : // : avaxState === true
                    // ? "Avalanche"
                    // : baseState === true
                    // ? "Base"
                    confluxState === true
                    ? "Conflux"
                    : "Unsupported Chain"}
                </span>

                <img src={dropdown} alt="" />
              </span>
            }
          >
            <Dropdown.Item onClick={() => handleEthPool()}>
              <img src={eth} alt="" />
              Ethereum
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleBnbPool()}>
              <img src={bnb} alt="" />
              BNB Chain
            </Dropdown.Item>
            {/* <Dropdown.Item onClick={() => handleAvaxPool()}>
                  <img src={avax} alt="" />
                  Avalanche
                </Dropdown.Item> */}
            <Dropdown.Item onClick={() => handleConfluxPool()}>
              <img src={conflux} alt="" />
              Conflux
            </Dropdown.Item>
            {/*   <Dropdown.Item onClick={() => handleBasePool()}>
                  <img src={base} alt="" />
                  Base
                </Dropdown.Item> */}
          </DropdownButton>
          {openNavbar === false ? (
            <div className="linear-border" onClick={() => setOpenNavbar(true)}>
              <button
                className="px-4 bg-transparent"
                style={{ clipPath: "none", border: "none" }}
                id="hamburgermenu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          ) : (
            <img
              src={xMark}
              alt="x mark"
              style={{ position: "relative", right: "18px", marginLeft: 10 }}
              onClick={() => setOpenNavbar(false)}
            />
          )}
        </div>
      </div>
      <div
        className={`mobile-menu ${
          openNavbar && "mobile-menu-open"
        } d-flex d-lg-none p-3 flex-column gap-3`}
        id="bgmenu"
      >
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/explorer"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Explore</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>

        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/land"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Land</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>

        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/marketplace"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Marketplace</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>

        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/roadmap"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">Roadmap</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>
        <div className="mobile-nav-item d-flex align-items-center justify-content-between p-3">
          <NavLink
            to="/news"
            className="nav-anchor font-poppins d-flex align-items-center justify-content-between w-100"
            style={{ textDecoration: "none" }}
            onClick={() => setOpenNavbar(false)}
          >
            <h6 className="mobile-nav-link font-poppins mb-0">News</h6>
            <img src={mobileArrow} alt="arrow" />{" "}
          </NavLink>
        </div>

        <div className="w-100 d-flex align-items-center justify-content-center gap-3">
          {!coinbase ? (
            <div className="linearborder2">
              <button
                className="btn connectwallet px-3"
                onClick={() => {
                  handleSignUp();
                  setOpenNavbar(false);
                }}
              >
                Connect Wallet
              </button>{" "}
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <Clipboard
                component="div"
                data-event="click"
                data-for={id}
                data-tip="Copied To Clipboard!"
                data-clipboard-text={coinbase}
                className="wallet-wrapper d-flex align-items-center gap-2 position-relative"
              >
                <div
                  className="btn connected px-3"
                  style={{ color: tooltip ? "#82DAAB" : "#FFFFFF" }}
                  onClick={() => {
                    setTooltip(true);
                    setTimeout(() => setTooltip(false), 2000);
                  }}
                >
                  {shortAddress(coinbase)}{" "}
                  <img src={tooltip ? check : copy} alt="" />
                </div>
              </Clipboard>
            </div>
          )}

          {!coinbase ? (
            <NavLink
              to={"/account"}
              onClick={() => {
                setOpenNavbar(false);
              }}
            >
              <img src={person} className="account-icon" alt="" />
            </NavLink>
          ) : (
            <img
              src={avatar === null ? person : avatar}
              className="account-icon"
              alt=""
              // onClick={handleRedirect}
              onClick={() => {
                setOpenNavbar(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
