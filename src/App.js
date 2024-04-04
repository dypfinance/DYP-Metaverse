import Home from "./screens/Home/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./fonts/Organetto.ttf";
import { Amplify } from "aws-amplify";
import { ApolloProvider } from "@apollo/client";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./screens/Account/src/aws-exports";
import "./screens/Account/src/App.css";

import AuthProvider, {
  useAuth,
} from "./screens/Account/src/Utils.js/Auth/AuthDetails.js";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.js";
import client from "./screens/Account/src/apolloConfig.js";
import Dashboard from "./screens/Account/src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MarketplaceFooter from "./components/Footer/MarketplaceFooter";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import CheckWhitelistModal from "./components/CheckWhitelistModal/CheckWhitelistModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Explorer from "./screens/Explorer/Explorer";
import Land from "./screens/Land/Land";
import Roadmap from "./screens/Roadmap/Roadmap";
import ScrollTop from "./components/ScrollTop";
import JoinBeta from "./screens/JoinBeta/JoinBeta";
import JoinBetaModal from "./components/JoinBetaModal/JoinBetaModal";
import PartnerForm from "./screens/PartnerForm/PartnerForm";
import WalletModal from "./components/WalletModal/WalletModal";
import TimePiece from "./screens/Timepiece/Timepiece";
import axios from "axios";
import Unsubscribe from "./screens/Unsubscribe/Unsubscribe";
import Marketplace from "./screens/Marketplace/Marketplace";
import getListedNFTS from "./actions/Marketplace";

import CawsNFT from "./screens/Marketplace/MarketNFTs/CawsNFT";
import WoDNFT from "./screens/Marketplace/MarketNFTs/WoDNFT";
import TimepieceNFT from "./screens/Marketplace/MarketNFTs/TimepieceNFT";
import MarketStake from "./screens/Marketplace/MarketStake";
import MarketEvents from "./screens/Marketplace/MarketEvents";
import SingleNft from "./screens/Marketplace/MarketNFTs/SingleNft";
import { useLocation, useNavigate } from "react-router-dom";
import MarketMint from "./screens/Marketplace/MarketMint";
import CheckAuthUserModal from "./components/CheckWhitelistModal/CheckAuthUserModal";
import Notifications from "./screens/Marketplace/Notifications/Notifications";
import BetaPassNFT from "./screens/Marketplace/MarketNFTs/BetaPassNFT";
import { useEagerlyConnect } from "web3-connector";
import SIDRegister from "@web3-name-sdk/register";
import { createWeb3Name } from "@web3-name-sdk/core";
import { providers } from "ethers";
import {
  useWeb3React,
  disconnect,
  connectWallet,
  ConnectionType,
} from "web3-connector";
import DomainModal from "./components/DomainModal/DomainModal.js";
import Web3 from "web3";
import ChestFlyout from "./components/LandFlyout/ChestFlyout";
import NFTBridge from "./screens/NFTBridge/NftBridge.js";

function App() {
  const CHAINLIST = {
    1: {
      chainId: 1,
      chainName: "Ethereum",
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      nativeCurrency: {
        symbol: "eth",
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io"],
    },
    56: {
      chainId: 56,
      chainName: "BSC",
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
    1030: {
      chainId: 1030,
      chainName: "CFX",
      rpcUrls: ["https://evm.confluxrpc.com"],
      nativeCurrency: {
        symbol: "cfx",
        decimals: 18,
      },
      blockExplorerUrls: ["https://evm.confluxscan.net"],
    },
    204: {
      chainId: 204,
      chainName: "opBNB",
      rpcUrls: ["https://opbnb.publicnode.com"],
      nativeCurrency: {
        symbol: "bnb",
        decimals: 18,
      },

      blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
    },

    1482601649: {
      chainId: 1482601649,
      chainName: "SKALE Nebula Hub",
      nativeCurrency: {
        symbol: "sFUEL",
        decimals: 18,
      },

      rpcUrls: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      blockExplorerUrls: [
        "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
      ],
    },
  };

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [showWalletModalRegister2, setShowWalletModalRegister2] =
    useState(false);

  const [betaModal, setBetaModal] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [chainId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [count2, setCount2] = useState(0);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState();
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [listedNFTS2, setListedNFTS2] = useState([]);
  const [recentListedNFTS2, setrecentListedNFTS2] = useState([]);
  const [count33, setCount33] = useState(0);
  const [count44, setCount44] = useState(1);


  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [myConfluxNFTsCreated, setmyConfluxNFTsCreated] = useState([]);

  const [mybaseNFTsCreated, setmybaseNFTsCreated] = useState([]);
  const [myskaleNFTsCreated, setmyskaleNFTsCreated] = useState([]);


  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);
  const [walletModal, setwalletModal] = useState(false);
  const [mintloading, setmintloading] = useState("initial");
  const [mintStatus, setmintStatus] = useState("");
  const [textColor, settextColor] = useState("#fff");
  const [finalCaws, setFinalCaws] = useState([]);
  const [limit, setLimit] = useState(0);
  const [allCawsForTimepieceMint, setAllCawsForTimepieceMint] = useState([]);
  const [timepieceMetadata, settimepieceMetadata] = useState([]);
  const [username, setUsername] = useState("");
  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);
  const [totalCoingeckoNft, setTotalCoingeckoNft] = useState(0);
  const [totalGateNft, setTotalGateNft] = useState(0);
  const [totalBaseNft, settotalBaseNft] = useState(0);
  const [totalSkaleNft, settotalSkaleNft] = useState(0);

  const [totalDogeNft, settotalDogeNft] = useState(0);
  const [totalCmcNft, settotalCmcNft] = useState(0);

  const [totalConfluxNft, setTotalConfluxNft] = useState(0);
  const [baseMintAllowed, setbaseMintAllowed] = useState(1);
  const [skaleMintAllowed, setSkaleMintAllowed] = useState(1);

  const [confluxMintAllowed, setconfluxMintAllowed] = useState(1);

  const [fireAppcontent, setFireAppContent] = useState(false);
  const [activeUser, setactiveUser] = useState(false);
  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb_old, setDypTokenDatabnb_old] = useState([]);

  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);

  const [totalBoughtNFTSCount, setTotalBoughtNFTSCount] = useState(0);
  const [totalBoughtNFTSinETH, setTotalBoughtNFTSinETH] = useState(0);
  const [totalBoughtNFTSinDYP, setTotalBoughtNFTSinDYP] = useState(0);
  const [availTime, setavailTime] = useState();

  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);

  const [MyNFTSCaws2, setMyNFTSCaws2] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);

  const [MyNFTSCawsBnb, setMyNFTSCawsBnb] = useState([]);
  const [myLandNFTsBnb, setMyLandNFTsBnb] = useState([]);

  const [MyNFTSCawsAvax, setMyNFTSCawsAvax] = useState([]);
  const [myLandNFTsAvax, setMyLandNFTsAvax] = useState([]);

  const [MyNFTSCawsBase, setMyNFTSCawsBase] = useState([]);
  const [myLandNFTsBase, setMyLandNFTsBase] = useState([]);

  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setMyGateNfts] = useState([]);
  const [myConfluxNfts, setMyConfluxNfts] = useState([]);
  const [myBaseNFTs, setmyBaseNFTs] = useState([]);
  const [myskaleNFTs, setmySkaleNFTs] = useState([]);

  const [myDogeNFTs, setmyDogeNFTs] = useState([]);
  const [myCmcNFTs, setmyCmcNFTs] = useState([]);

  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [
    top20BoughtByPriceAndPriceTypeETHNFTS,
    settop20BoughtByPriceAndPriceTypeETHNFTS,
  ] = useState([]);

  const [
    top20BoughtByPriceAndPriceTypeDYPNFTS,
    settop20BoughtByPriceAndPriceTypeDYPNFTS,
  ] = useState([]);

  const [nftCount, setNftCount] = useState(1);
  const [count, setCount] = useState(1);

  const [dypTokenData, setDypTokenData] = useState(0);
  const [dypTokenData_old, setDypTokenData_old] = useState();
  const [ethTokenData, setEthTokenData] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [domainPopup, setDomainPopup] = useState(false);
  const [availableDomain, setAvailableDomain] = useState("initial");
  const [domainPrice, setDomainPrice] = useState(0);
  const [bnbUSDPrice, setBnbUSDPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDomain, setSuccessDomain] = useState(false);
  const [dogePrice, setDogePrice] = useState(0);

  const [domainName, setDomainName] = useState(null);
  const [loadingDomain, setLoadingDomain] = useState(false);
  const [domainMetaData, setDomainMetaData] = useState(null);
  const [totalTx, setTotalTx] = useState(0);
  const [totalvolume, setTotalVolume] = useState(0);
  const [bscAmount, setBscAmount] = useState(0);
  const [skaleAmount, setSkaleAmount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { BigNumber } = window;
  const { connector, account, accounts, isActive, isActivating, provider } =
    useWeb3React();

  useEagerlyConnect();

  const html = document.querySelector("html");

  useEffect(() => {
    if (domainPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [domainPopup]);

  const web3Name = createWeb3Name();

  const searchDomain = async (domain) => {
    if (window.ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const register = new SIDRegister({ signer, chainId: 56 });
      const available = await register.getAvailable(domain);
      const price = await register.getRentPrice(domain, 1);
      const newPrice = new BigNumber(price._hex / 1e18).toFixed();
      setDomainPrice(newPrice);
      if (domain == "") {
        setAvailableDomain("initial");
      } else {
        setAvailableDomain(available);
      }
      console.log(available, domain.length);
    }
  };

  const registerDomain = async (label, years) => {
    setLoadingDomain(true);
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const register = new SIDRegister({ signer, chainId: 56 });
    await register
      .register(label, address, years, {
        setPrimaryName: true,
        referrer: "dyp.bnb",
      })
      .then(() => {
        setSuccessMessage("You have successfully registered your .bnb domain");
        setSuccessDomain(true);
        setTimeout(() => {
          setSuccessMessage("");
          setSuccessDomain(false);
        }, 5000);
        setLoadingDomain(false);
      })
      .catch((e) => {
        setLoadingDomain(false);
        setSuccessDomain(false);
        setSuccessMessage(`Something went wrong: ${e?.data?.message}`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        console.log(e);
      });
  };

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );

        setDypTokenData_old(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
  };

  const getPriceDYP = async () => {
    const dypprice = await axios
      .get(
        "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x7c81087310a228470db28c1068f0663d6bf88679"
      )
      .then((res) => {
        return res.data.data.attributes.base_token_price_usd;
      })
      .catch((e) => {
        console.log(e);
      });

    setDypTokenData(dypprice);
    setDypTokenDatabnb(dypprice);
  };

  const fetchDogeCoinPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["dogecoin"] && obj.data["dogecoin"] !== NaN) {
          setDogePrice(obj.data["dogecoin"].usd);
        }
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );

        setDypTokenDatabnb_old(propertyDyp[0][1].token_price_usd);

        setBnbUSDPrice(data.data.the_graph_bsc_v2.usd_per_eth);
        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const handleSwitchChain = async () => {
    const { ethereum } = window;
    const ETHPARAMS = {
      chainId: "0x1", // A 0x-prefixed hexadecimal string
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
    };

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log(switchError, "switch");
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ETHPARAMS],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      // handle other "switch" errors
    }
  };

  const fetchAvatar = async (userAddr) => {
    const response = axios
      .get(`https://api-image.dyp.finance/api/v1/avatar/${userAddr}`)
      .then((data) => {
        if (data.data.avatar) {
          setAvatar(data.data.avatar);
        } else {
          setAvatar(null);
        }
      })
      .catch(console.error);

    return response;
  };

  const checkConnection = async () => {
    await window.getCoinbase().then((data) => {
      setCoinbase(data);
      axios
        .get(`https://api-image.dyp.finance/api/v1/username/${data}`)
        .then((res) => {
          if (res.data?.username) {
            setUsername(res.data?.username);
          } else {
            setUsername("");
          }
        });
    });
  };

  const checkConnection2 = async () => {
    const logout = localStorage.getItem("logout");
    if (logout !== "true") {
      if (window.gatewallet) {
        setCoinbase(account);
        setIsConnected(isActive);
        fetchAvatar(account);
      } else {
        await window.getCoinbase().then((data) => {
          if (data) {
            fetchAvatar(data);
            setCoinbase(data);
            setIsConnected(true);
          } else {
            setCoinbase();
            setIsConnected(false);
          }
        });
      }
    } else {
      setIsConnected(false);
      setCoinbase();
    }
  };

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
  };

  const handleDownload = () => {
    setdownloadSelected(true);
    setShowWalletModalDownload(true);
  };

  const handleSignUp = () => {
    if (activeUser === true) {
      setFireAppContent(true);
    } else {
      setShowWalletModalRegister(true);
    }
  };

  const handleConnection = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(true);
      });
      await window.getCoinbase().then((data) => {
        console.log(data);
        setCoinbase(data);
      });
      setShowForms(true);
      setSuccess(true);
      // connectWallet(ConnectionType.WALLET_CONNECT_NOTQR);
    } catch (e) {
      setShowWalletModal(false);
      setSuccess(true);

      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const checkNetworkId = async () => {
    if (window.ethereum && !window.gatewallet) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else if (window.ethereum && window.gatewallet) {
      await provider
        ?.detectNetwork()
        .then((data) => {
          setChainId(data.chainId);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setChainId(1);
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (!window.gatewallet) {
        localStorage.setItem("logout", "false");
        await window.connectWallet().then((data) => {
          setIsConnected(data);
        });

        await window.getCoinbase().then((data) => {
          setCoinbase(data);
        });
        setwalletModal(false);
        setShowForms2(true);
        setSuccess(true);
        checkConnection();
      } else {
        await connectWallet(ConnectionType.INJECTED);
        setCoinbase(account);
        setIsConnected(isActive);
        setwalletModal(false);
        setShowForms2(true);
        setSuccess(true);
        setChainId(parseInt(window.gatewallet.chainId));
      }

      //
      // window.gatewallet.enable()
      // setCoinbase(account);
      //
      //
      // setIsConnected(isActive);
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const myNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.LANDMINTING_ABI,
        window.config.landnft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getLandNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setMyNFTs(nfts);
    }
  };

  const myLandNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTs(nfts);
    } else setMyLandNFTs([]);
  };

  const myNft2 = async () => {
    let myNft = await window.myNftListContract(coinbase);
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCaws2(nfts);
    } else setMyNFTSCaws2([]);
  };

  const myLandNftBNB = async () => {
    let myNft = await window.myNftLandListContractCCIP(
      coinbase,
      window.config.nft_land_bnb_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBnb(nfts);
    } else setMyLandNFTsBnb([]);
  };

  const myNftBNB = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_bnb_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBnb(nfts);
    } else setMyNFTSCawsBnb([]);
  };

  const myLandNftAVAX = async () => {
    let myNft = await window.myNftLandListContractCCIP(
      coinbase,
      window.config.nft_land_avax_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsAvax(nfts);
    } else setMyLandNFTsAvax([]);
  };

  const myNft2Avax = async () => {
    let myNft = await window.myNftListContractCCIP(
      coinbase,
      window.config.nft_caws_avax_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsAvax(nfts);
    } else setMyNFTSCawsAvax([]);
  };

  const myLandNftsBase = async () => {
    let myNft = await window.myNftLandListContractCCIPBase(
      coinbase,
      window.config.nft_land_base_address
    );

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTsBase(nfts);
    } else setMyLandNFTsBase([]);
  };

  const myNftsBase = async () => {
    let myNft = await window.myNftListContractCCIPBase(
      coinbase,
      window.config.nft_caws_base_address
    );
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTSCawsBase(nfts);
    } else setMyNFTSCawsBase([]);
  };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  //todo
  const fetchAllMyNfts = async () => {
    if (coinbase) {
      getMyNFTS(coinbase, "caws").then((NFTS) => setMyNFTSCaws(NFTS));

      getMyNFTS(coinbase, "timepiece").then((NFTS) => setMyNFTSTimepiece(NFTS));

      getMyNFTS(coinbase, "land").then((NFTS) => setMyNFTSLand(NFTS));
      getMyNFTS(coinbase, "coingecko").then((NFTS) => {
        setMyNFTSCoingecko(NFTS);
        setTotalCoingeckoNft(NFTS.length);
      });
      getMyNFTS(coinbase, "gate").then((NFTS) => {
        setTotalGateNft(NFTS.length);
        setMyGateNfts(NFTS);
      });

      getMyNFTS(coinbase, "doge").then((NFTS) => {
        settotalDogeNft(NFTS.length);
        setmyDogeNFTs(NFTS);
      });

      getMyNFTS(coinbase, "cmc").then((NFTS) => {
        if (NFTS) {
          settotalCmcNft(NFTS.length);
          setmyCmcNFTs(NFTS);
        }
      });

      getMyNFTS(coinbase, "conflux").then((NFTS) => {
        setTotalConfluxNft(NFTS.length);
        setMyConfluxNfts(NFTS);
        setconfluxMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyConfluxNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "base").then((NFTS) => {
        settotalBaseNft(NFTS.length);
        setmyBaseNFTs(NFTS);
        setbaseMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmybaseNFTsCreated(NFTS);
      });

      getMyNFTS(coinbase, "skale").then((NFTS) => {
        settotalSkaleNft(NFTS.length);
        setmySkaleNFTs(NFTS);
        setSkaleMintAllowed(NFTS.length > 0 ? 0 : 1);
        setmyskaleNFTsCreated(NFTS);
      });

      //setmyBaseNFTs
    } else {
      setMyNFTSCaws([]);
      setMyNFTSTimepiece([]);
      setMyNFTSLand([]);
      setMyNFTSCoingecko([]);
      setTotalCoingeckoNft(0);
      setTotalGateNft(0);
      setMyGateNfts([]);
      setTotalConfluxNft(0);
      setMyConfluxNfts([]);
    }
  };

  const myCAWNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.NFT_ABI,
        window.config.nft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setMyCAWNFTs(nfts);
    }
  };

  const getStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const allCawsStakes = await window.wod_caws
      .depositsOf(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft_cawsWod.push(parseInt(result[i]));
          return stakenft_cawsWod;
        }
      });

    return allCawsStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myStakes = await getStakesIdsCawsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyCawsWodStakes(stakes);
    } else setMyCawsWodStakes([]);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    if (address !== null && address !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.NFTSTAKING_ABI,
        window.config.nftstaking_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    if (address !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));
      stakes = await Promise.all(stakes);
      setMyCAWSNFTsTotalStaked(stakes);
      stakes.reverse();
      setCAWMystakes(stakes);
    }
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    }
  };

  const checkCawsToUse = async () => {
    const testArray = [];
    const cawsArray = [...myCAWNFTs, ...myCAWstakes, ...myCawsWodStakesAll];
    const nft_contract = await window.getContractCawsTimepieceNFT(
      "CAWS_TIMEPIECE"
    );

    if (cawsArray.length > 0) {
      for (let i = 0; i < cawsArray.length; i++) {
        const cawsId = parseInt(
          cawsArray[i].name.slice(6, cawsArray[i].name.length)
        );

        const result = await nft_contract.methods.cawsUsed(cawsId).call();

        if (result === false) {
          testArray.push(cawsId);
        }
      }

      setcawsToUse(testArray);
      setAllCawsForTimepieceMint(testArray);
    } else if (cawsArray.length === 0) {
      setcawsToUse([]);
      setAllCawsForTimepieceMint([]);
    }
  };

  const calculateCaws = (data) => {
    if (data.numberOfTokens === cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse);
    } else if (
      data.numberOfTokens >= cawsToUse.length &&
      cawsToUse.length > 0
    ) {
      setLimit(cawsToUse.length);
      setFinalCaws(cawsToUse);
    } else if (cawsToUse.length === 0) {
      setLimit(0);
      setFinalCaws([]);
    } else if (data.numberOfTokens <= cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse.slice(0, data.numberOfTokens));
    }
  };

  const getTimepieceNftMinted = async () => {
    const result = await window.caws_timepiece.calculateTimepieceBalance(
      coinbase
    );
    setTotalTimepieceCreated(result);
    let metadataArray = [];
    if (result && result > 0) {
      for (let index = 0; index < result; index++) {
        const tokenId =
          +(await window.caws_timepiece.getCawsTimepieceTokenByIndex(
            coinbase,
            index
          ));

        const tokenMetaDataURI =
          await window.caws_timepiece.getCawsTimepieceURI(tokenId);

        const dataURI = await axios.get(tokenMetaDataURI);
        metadataArray.push(dataURI.data);
      }
      settimepieceMetadata(metadataArray);
    } else {
      settimepieceMetadata(metadataArray);
      setTotalTimepieceCreated(0);
    }
  };

  const handleTimepieceMint = async (data) => {
    if (isConnected) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.caws_timepiece
            .claimTimepiece(finalCaws)
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              checkCawsToUse();
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });

          if (tokenId) {
            let getNftData = await window.getNft(tokenId);
            setMyNFTsCreated(getNftData);
          }
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    } else {
      try {
        handleConnectWallet();
      } catch (e) {
        window.alertify.error("No web3 detected! Please Install MetaMask!");
      }
    }
  };

  const handleConfluxNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.conflux_nft
            .mintConfluxNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "conflux").then((NFTS) => {
                setmyConfluxNFTsCreated(NFTS);
                setTotalConfluxNft(NFTS.length);
                setconfluxMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const handleBaseNftMint = async () => {
    if (isConnected && coinbase) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.skale_nft
            .mintSkaleNFT()
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              getMyNFTS(coinbase, "skale").then((NFTS) => {
                setmyskaleNFTsCreated(NFTS);
                settotalSkaleNft(NFTS.length);
                setSkaleMintAllowed(0);
              });
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    }
  };

  const getBoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts {
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

    // console.log("finalboughtItems", finalboughtItems);

    return finalboughtItems;
  };

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
    setLatest20BoughtNFTS(finalboughtItems);
  };

  const handleRefreshList = () => {
    setNftCount(nftCount + 1);
  };
  const getTop20BoughtByPriceAndPriceTypeNFTS = async (type) => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const itemBoughtQuery = `
      {
          itemBoughts(first: 20, orderBy: price, orderDirection: desc, where: {payment_priceType: ${type}}) {
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
    // console.log("boughtItems2", finalboughtItems);

    return finalboughtItems;
  };

  const getListedNfts2 = async () => {
    getListedNFTS(0)
      .then((data) => {
        setListedNFTS2(data);
        setCount33(count33+1)
      })
      .catch((e) => {
        console.log(e);
      });

    getListedNFTS(0, "", "recentListedNFTS")
      .then((data) => {
        setrecentListedNFTS2(data);
        setCount33(count44+1)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];
    let finalboughtItems2 = [];

    if (listedNFTS2 && listedNFTS2.length > 0) {
      await Promise.all(
        listedNFTS2.map(async (nft) => {
          if (nft.nftAddress === window.config.nft_caws_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "caws";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_land_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "land";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          } else if (
            nft.nftAddress.toLowerCase() ===
            window.config.nft_timepiece_address.toLowerCase()
          ) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.TIMEPIECE_ABI,
              window.config.nft_timepiece_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
                return "";
              });

            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "timepiece";
              nft.chain = 1;
              finalboughtItems1.push(nft);
            }
          }
        })
      );

      setListedNFTS(finalboughtItems1);
      setListedNFTSCount(finalboughtItems1.length);
    }

    if (recentListedNFTS2 && recentListedNFTS2.length > 0) {
      await Promise.all(
        recentListedNFTS2.map(async (nft) => {
          if (nft.nftAddress === window.config.nft_caws_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.CAWS_ABI,
              window.config.nft_caws_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "caws";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_land_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.WOD_ABI,
              window.config.nft_land_address
            );

            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });
            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "land";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          } else if (nft.nftAddress === window.config.nft_timepiece_address) {
            const nft_contract = new window.infuraWeb3.eth.Contract(
              window.TIMEPIECE_ABI,
              window.config.nft_timepiece_address
            );
            const nftowner = await nft_contract.methods
              .ownerOf(nft.tokenId)
              .call()
              .catch((e) => {
                console.log(e);
              });

            if (
              nftowner &&
              nftowner.toLowerCase() === nft.seller.toLowerCase()
            ) {
              nft.type = "timepiece";
              nft.chain = 1;
              finalboughtItems2.push(nft);
            }
          }
        })
      );

      setLatest20RecentListedNFTS(finalboughtItems2);
    }
  };

  Amplify.configure(awsExports);

  function UnAuthenticatedContent() {
    setFireAppContent(false);

    return (
      <React.Fragment>
        <Navigate to="/account" />
      </React.Fragment>
    );
  }

  const AppContent = () => {
    const { isLoading, isAuthenticated, playerId } = useAuth();

    useEffect(() => {
      if (!isLoading || !isAuthenticated || !playerId) {
        setFireAppContent(false);
      }
    }, [isLoading, isAuthenticated, playerId]);

    if (isLoading) {
      return <LandingScreen />;
    }

    if (isAuthenticated) {
      if (!playerId) {
        return (
          <React.Fragment>
            <Navigate to="/player" />
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <Navigate to="/account" />
        </React.Fragment>
      );
    }

    return <UnAuthenticatedContent />;
  };

  const { ethereum } = window;

  ethereum?.on("chainChanged", handleRefreshList);
  ethereum?.on("accountsChanged", handleRefreshList);
  ethereum?.on("accountsChanged", checkConnection2);
  // ethereum?.on("accountsChanged", fetchAllMyNfts);

  useEffect(() => {
    if (ethereum && !window.gatewallet) {
      ethereum.on("chainChanged", checkNetworkId);
    }
    if (window.gatewallet) {
      window.gatewallet.on("changed", checkNetworkId);
    }
  }, [ethereum, nftCount]);

  const logout = localStorage.getItem("logout");

  useEffect(() => {
    if (
      !window.coin98 &&
      window.ethereum &&
      window.ethereum.isConnected() === true &&
      !window.gatewallet
    ) {
      if (
        logout === "false" ||
        window.coinbase_address === "0x0000000000000000000000000000000000000000"
      ) {
        checkConnection2();
      } else {
        setIsConnected(false);
        setCoinbase();
        localStorage.setItem("logout", "true");
      }
    } else if (
      logout === "false" ||
      window.coinbase_address ===
        "0x0000000000000000000000000000000000000000" ||
      window.coin98
    ) {
      checkConnection2();
    } else if (window.gatewallet && isActive) {
      setIsConnected(isActive);
      if (account) {
        fetchAvatar(account);
        setCoinbase(account);
      }
    } else {
      setIsConnected(false);
      setCoinbase();
      localStorage.setItem("logout", "true");
    }
    checkNetworkId();
  }, [coinbase, chainId, isActive, account]);

  useEffect(() => {
    checkNetworkId();
  }, [isConnected, coinbase, chainId]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myCAWStakes();
      myLandStakes();
      getmyCawsWodStakes();
      myNft2();
      myLandNft();
    }
    if (isConnected === true && coinbase) {
      myNft();
      myCAWNft();
    }
    fetchAllMyNfts();
  }, [isConnected, chainId, currencyAmount, coinbase]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myNft2();
      myLandNft();
    } else if (isConnected === true && coinbase && chainId === 56) {
      myNftBNB();
      myLandNftBNB();
    } else if (isConnected === true && coinbase && chainId === 43114) {
      myNft2Avax();
      myLandNftAVAX();
    } else if (isConnected === true && coinbase && chainId === 8453) {
      myNftsBase();
      myLandNftsBase();
    }
  }, [isConnected, chainId, coinbase, count]);

  // useEffect(() => {
  //   if (
  //     MyNFTSCaws.length > 0 ||
  //     MyNFTSTimepiece.length > 0 ||
  //     MyNFTSLand.length > 0
  //   ) {
  //     getmyCollectedNfts();
  //   }
  // }, [MyNFTSCaws?.length, MyNFTSTimepiece?.length, MyNFTSLand?.length]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      checkCawsToUse();
      getTimepieceNftMinted();
    }
  }, [
    myCAWNFTs.length,
    myCAWstakes.length,
    myCawsWodStakesAll.length,
    allCawsForTimepieceMint.length,
    isConnected,
    chainId,
    coinbase,
  ]);

  const handleShowWalletModal = () => {
    setwalletModal(true);
  };

  const getallNfts = async () => {
    getBoughtNFTS().then((NFTS) => {
      setTotalBoughtNFTSCount(NFTS.length);

      let totalBoughtNFTSinETH = 0;

      let totalBoughtNFTSinDYP = 0;

      for (let i = 0; i < NFTS.length; i++) {
        if (NFTS[i].payment_priceType === 0) {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        } else {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        }
      }

      setTotalBoughtNFTSinETH(totalBoughtNFTSinETH);

      setTotalBoughtNFTSinDYP(totalBoughtNFTSinDYP);
    });
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
    }
  }

  const getCawsSold = async () => {
    const allSold = latest20BoughtNFTS;

    if (allSold && allSold.length > 0) {
      let cawsFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_caws_address
      );
      let uniqueCaws = cawsFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let wodFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_land_address
      );
      let uniqueWod = wodFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      let timepieceFilter = allSold.filter(
        (item) => item.nftAddress === window.config.nft_timepiece_address
      );

      let uniqueTimepiece = timepieceFilter.filter(
        (v, i, a) => a.findIndex((v2) => v2.tokenId === v.tokenId) === i
      );

      setCawsBought(uniqueCaws);
      setLandBought(uniqueWod);
      setTimepieceBought(uniqueTimepiece);
    }
  };

  const refreshSubscription = async () => {
    let subscribedPlatformTokenAmountETH;
    let subscribedPlatformTokenAmountCfx;
    let subscribedPlatformTokenAmountBNB;
    let subscribedPlatformTokenAmountBase;

    const web3eth = window.infuraWeb3;
    const web3cfx = window.confluxWeb3;
    const web3base = window.baseWeb3;
    const web3bnb = window.bscWeb3;

    const CfxABI = window.SUBSCRIPTION_CFX_ABI;
    const BaseABI = window.SUBSCRIPTION_BASE_ABI;
    const EthABI = window.SUBSCRIPTIONETH_ABI;
    const BnbABI = window.SUBSCRIPTIONBNB_ABI;

    const ethsubscribeAddress = window.config.subscriptioneth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscriptionbnb_address;

    const ethcontract = new web3eth.eth.Contract(EthABI, ethsubscribeAddress);
    const cfxcontract = new web3cfx.eth.Contract(CfxABI, cfxsubscribeAddress);

    const basecontract = new web3base.eth.Contract(
      BaseABI,
      basesubscribeAddress
    );

    const bnbcontract = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress);

    if (coinbase) {
      subscribedPlatformTokenAmountETH = await ethcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      subscribedPlatformTokenAmountCfx = await cfxcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      subscribedPlatformTokenAmountBase = await basecontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      subscribedPlatformTokenAmountBNB = await bnbcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      if (
        subscribedPlatformTokenAmountCfx === "0" &&
        subscribedPlatformTokenAmountETH === "0" &&
        subscribedPlatformTokenAmountBase === "0" &&
        subscribedPlatformTokenAmountBNB === "0"
      ) {
        setIsPremium(false);
      }
      if (
        subscribedPlatformTokenAmountCfx !== "0" ||
        subscribedPlatformTokenAmountETH !== "0" ||
        subscribedPlatformTokenAmountBase !== "0" ||
        subscribedPlatformTokenAmountBNB !== "0"
      ) {
        setIsPremium(true);
      }
    }
  };

  // const getmyCollectedNfts = async () => {
  //   let recievedOffers = [];

  //   if (MyNFTSTimepiece && MyNFTSTimepiece.length > 0) {
  //     await Promise.all(
  //       MyNFTSTimepiece.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_timepiece_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_timepiece_address,
  //               tokenId: i,
  //               type: "timepiece",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }

  //   if (MyNFTSLand && MyNFTSLand.length > 0) {
  //     await Promise.all(
  //       MyNFTSLand.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_land_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_land_address,
  //               tokenId: i,
  //               type: "land",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }

  //   if (MyNFTSCaws && MyNFTSCaws.length > 0) {
  //     await Promise.all(
  //       MyNFTSCaws.map(async (i) => {
  //         const result = await window
  //           .getAllOffers(window.config.nft_caws_address, i)
  //           .catch((e) => {
  //             console.error(e);
  //           });

  //         if (result && result.length > 0) {
  //           result.map((item) => {
  //             return recievedOffers.push({
  //               offer: item.offer,
  //               index: item.index,
  //               nftAddress: window.config.nft_caws_address,
  //               tokenId: i,
  //               type: "caws",
  //             });
  //           });
  //         }
  //       })
  //     );
  //   }
  //   setmyNftsOffer(recievedOffers);
  // };

  const handleSwitchNetwork = async (chain) => {
    if (!window.gatewallet) {
      setChainId(chain);
    } else {
      // const params = CHAINLIST[Number(chain)];
      // connector?.activate(params);
      setChainId(chain);
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId:
                chain === 1
                  ? "0x1"
                  : chain === 56
                  ? "0x38"
                  : chain === 204
                  ? "0xcc"
                  : chain === 1482601649
                  ? "0x585eb4b1"
                  : "0x406",
            },
          ],
        });
        // if (window.ethereum && window.gatewallet) {
        //   window.location.reload();
        // }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(switchError, "switch");
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: CHAINLIST[Number(chain)],
            });
            // if (window.ethereum && window.gatewallet) {
            //   window.location.reload();
            // }
          } catch (addError) {
            console.log(addError);
          }
        }
        // handle other "switch" errors
      }
      // window.location.reload();
    }
  };

  const handleDisconnect = async () => {
    if (!window.gatewallet) {
      await window.disconnectWallet();
      localStorage.setItem("logout", "true");
      setSuccess(false);
      setCoinbase();
      setIsConnected(false);
    } else {
      disconnect(connector);
      localStorage.setItem("logout", "true");
    }
  };

  const API_BASE_URL = "https://api.worldofdypians.com";

  async function addNewUserIfNotExists(
    walletAddress,
    title,
    description,
    redirect_link
  ) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
          walletAddress
        )}`
      );

      if (response.data.length === 0) {
        const newUserResponse = await axios.post(
          `${API_BASE_URL}/notifications/${window.infuraWeb3.utils.toChecksumAddress(
            walletAddress
          )}`,
          {
            tokenId: "",
            nftAddress: "",
            timestamp: Date.now(),
            read: false,
            offer: "no",
            offerAccepted: "no",
            buy: "no",
            event: "no",
            news: "no",
            welcome: "yes",
            update: "no",
            title: "Welcome",
            description:
              "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!",
            redirect_link: "",
          }
        );

        console.log("New user added:", newUserResponse.data);
        let lso = newUserResponse.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      } else {
        console.log("User already exists:", response.data);

        const notifications = response.data[0]?.notifications || [];
        let lso = notifications.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setmyNftsOffer(lso);
      }
    } catch (error) {
      console.error("Error adding new user:", error.message);
    }
  }

  const getDomains = async () => {
    if (coinbase) {
      const name = await web3Name.getDomainName({
        address: coinbase,
        queryChainIdList: [56],
      });

      if (name && name !== null) {
        setDomainName(name);
        const metadata = await web3Name.getMetadata({ name: name });
        setDomainMetaData(metadata);
      } else {
        setDomainMetaData(null);
        setDomainName(null);
      }
    }

    // console.log(name, "domain")
  };
  const fetchBscBalance = async () => {
    if (coinbase && chainId === 56 && window.ethereum) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const bscWeb3 = new Web3(window.config.bsc_endpoint);
      const stringBalance = bscWeb3.utils.hexToNumberString(balance);

      const amount = bscWeb3.utils.fromWei(stringBalance, "ether");
      setBscAmount(amount.slice(0, 7));
    }
  };

  const handleSkaleRefill = async (address) => {
    const result = await axios
      .get(`https://api.worldofdypians.com/claim/${address}`)
      .catch((e) => {
        console.error(e);
      });

    console.log(result);
  };

  const fetchSkaleBalance = async () => {
    if (coinbase && window.ethereum && chainId === 1482601649) {
      const skaleWeb3 = new Web3(window.config.skale_endpoint);

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });

      const stringBalance = skaleWeb3.utils.hexToNumberString(balance);

      const amount = skaleWeb3.utils.fromWei(stringBalance, "ether");
      const formatted_amount = Number(amount);
    
      if (formatted_amount <= 0.000005) {
        handleSkaleRefill(coinbase);
      } else {
        console.log("formatted_amount", formatted_amount);
      }

      setSkaleAmount(amount.slice(0, 7));
    }
  };

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    const result2 = await axios
      .get("https://api.worldofdypians.com/api/totalVolumes")
      .catch((e) => {
        console.error(e);
      });

    if (result.data && result.data !== "NaN") {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (result2.data && result2.data !== "NaN") {
      setTotalVolume(result2.data);
      localStorage.setItem("cachedVolume", result2.data);
    }
  };

  useEffect(() => {
    getAllData();
    fetchDogeCoinPrice();
  }, [coinbase]);

  useEffect(() => {
    getDomains();
    fetchBscBalance();
  }, [coinbase, isConnected, logout, successMessage, loadingDomain]);

  useEffect(() => {
    fetchSkaleBalance();
  }, [coinbase, isConnected, chainId]);

  useEffect(() => {
    fetchUserFavorites(coinbase);
    // refreshSubscription();
  }, [coinbase, nftCount]);

  useEffect(() => {
    getTokenData();
    getTokenDatabnb();
    getPriceDYP();
    getListedNfts2();
    getLatest20BoughtNFTS();
    // getTop20BoughtByPriceAndPriceTypeNFTS(0).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeETHNFTS(NFTS)
    // );
    // getTop20BoughtByPriceAndPriceTypeNFTS(1).then((NFTS) =>
    //   settop20BoughtByPriceAndPriceTypeDYPNFTS(NFTS)
    // );
    getallNfts();
  }, [nftCount]);

  const checkData = async () => {
    if (coinbase) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (count33 !== 0 && count44 !== 0) {
      getOtherNfts();
    }
  }, [count33, count44, nftCount]);

  useEffect(() => {
    if (latest20BoughtNFTS.length > 0) {
      getCawsSold();
    }
  }, [latest20BoughtNFTS.length]);

  useEffect(() => {
    if (coinbase) {
      // getNotifications(coinbase);
      addNewUserIfNotExists(
        coinbase,
        "Welcome",
        "Welcome to the immersive World of Dypians! Take a moment to step into our NFT marketplace, where a mesmerizing collection of digital art await your exploration. Happy browsing!"
      );
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setCount2(0);
      return () => clearInterval(interval);
    }, 300000);
  }, [count2]);
 
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="container-fluid p-0 main-wrapper position-relative">
          <Header
            handleSignUp={handleShowWalletModal}
            coinbase={coinbase}
            avatar={avatar}
            handleRedirect={() => {
              setFireAppContent(true);
            }}
            handleDisconnect={handleDisconnect}
            myOffers={myNftsOffer}
            handleRefreshList={handleRefreshList}
            nftCount={nftCount}
            isConnected={isConnected}
            chainId={chainId}
            handleSwitchNetwork={handleSwitchNetwork}
            handleSwitchChainGateWallet={handleSwitchNetwork}
            handleOpenDomains={() => setDomainPopup(true)}
            domainName={domainName}
          />
          <MobileNavbar
            handleSignUp={handleShowWalletModal}
            coinbase={coinbase}
            avatar={avatar}
            handleRedirect={() => {
              setFireAppContent(true);
            }}
            handleDisconnect={handleDisconnect}
            myOffers={myNftsOffer}
            handleRefreshList={handleRefreshList}
            nftCount={nftCount}
            isConnected={isConnected}
            chainId={chainId}
            handleSwitchNetwork={handleSwitchNetwork}
            handleSwitchChainGateWallet={handleSwitchNetwork}
            handleOpenDomains={() => setDomainPopup(true)}
            domainName={domainName}
          />
          <Routes>
            <Route path="/news/:newsId?/:titleId?" element={<News />} />
            <Route
              path="marketplace/nft/:nftId/:nftAddress?"
              element={
                <SingleNft
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleSwitchChain={handleSwitchChain}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  favorites={favorites}
                  dyptokenData_old={dypTokenData_old}
                />
              }
            />

            <Route
              exact
              path="/"
              element={
                <Home
                  handleRegister={handleRegister}
                  handleDownload={handleDownload}
                  coinbase={coinbase}
                  ethTokenData={ethTokenData}
                  dyptokenDatabnb={dyptokenDatabnb}
                  dyptokenDatabnb_old={dyptokenDatabnb_old}
                  idyptokenDatabnb={idyptokenDatabnb}
                />
              }
            />
            <Route exact path="/caws" element={<Caws />} />
            <Route
              exact
              path="/notifications"
              element={
                <Notifications
                  handleRefreshList={handleRefreshList}
                  coinbase={coinbase}
                  nftCount={nftCount}
                  isConnected={isConnected}
                />
              }
            />
            <Route exact path="/roadmap" element={<Roadmap />} />
            <Route
              exact
              path="/explorer"
              element={<Explorer count={count2} setCount={setCount2} />}
            />
            <Route exact path="/stake" element={<NftMinting />} />
            <Route exact path="/contact-us" element={<PartnerForm />} />
            <Route exact path="/unsubscribe/:email" element={<Unsubscribe />} />
            <Route
              exact
              path="/caws-timepiece"
              element={
                <TimePiece
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  timepieceMetadata={timepieceMetadata}
                />
              }
            />

            <Route
              exact
              path="/marketplace/nft-bridge"
              element={
                <NFTBridge
                  coinbase={coinbase}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  chainId={chainId}
                  isConnected={isConnected}
                  myNFTSLand={
                    chainId === 1
                      ? myLandNFTs
                      : chainId === 56
                      ? myLandNFTsBnb
                      : chainId === 43114
                      ? myLandNFTsAvax
                      : chainId === 8453
                      ? myLandNFTsBase
                      : myLandNFTs
                  }
                  myNFTSCaws={
                    chainId === 1
                      ? MyNFTSCaws2
                      : chainId === 56
                      ? MyNFTSCawsBnb
                      : chainId === 43114
                      ? MyNFTSCawsAvax
                      : chainId === 8453
                      ? MyNFTSCawsBase
                      : MyNFTSCaws2
                  }
                  handleSwitchNetwork={handleSwitchNetwork}
                  onSuccessTransfer={() => {
                    setCount(count + 1);
                  }}
                />
              }
            />

            <Route
              exact
              path="/join-beta"
              element={
                <JoinBeta
                  coinbase={coinbase}
                  handleRegister={handleBetaRegister}
                />
              }
            />

            <Route
              exact
              path="/auth"
              element={<Auth isConnected={isConnected} coinbase={coinbase} />}
            />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/ResetPassword" element={<ResetPassword />} />
            <Route exact path="/player" element={<PlayerCreation />} />

            <Route
              exact
              path="/account"
              element={
                <Dashboard
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  handleSwitchChain={handleSwitchChain}
                  dypTokenData_old={dypTokenData_old}
                  coinbase={coinbase}
                  account={coinbase}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleConnect={handleConnectWallet}
                  onSigninClick={checkData}
                  success={success}
                  availableTime={availTime}
                  handleSwitchNetwork={handleSwitchNetwork}
                  handleOpenDomains={() => setDomainPopup(true)}
                  domainName={domainName}
                  dogePrice={dogePrice}
                />
              }
            />

            <Route
              exact
              path="/land"
              element={
                <Land
                  count={count2}
                  setCount={setCount2}
                  handleConnectWallet={handleConnectWallet}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  handleRegister={handleRegister}
                  chainId={chainId}
                  showForms={showForms2}
                  balance={currencyAmount}
                />
              }
            />
            <Route
              exact
              path="/terms-conditions"
              element={<TermsConditions />}
            />
            <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              exact
              path="/marketplace"
              element={
                <Marketplace
                  count={count2}
                  setCount={setCount2}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  dypTokenData_old={dypTokenData_old}
                  coinbase={coinbase}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  totalListed={listedNFTSCount}
                  totalBoughtNFTSinETH={totalBoughtNFTSinETH / 1e18}
                  totalBoughtNFTSinDYP={totalBoughtNFTSinDYP / 1e18}
                  latest20RecentListedNFTS={latest20RecentListedNFTS}
                  totalBoughtNFTSCount={totalBoughtNFTSCount}
                  recentSales={latest20BoughtNFTS}
                  topSales={[
                    ...top20BoughtByPriceAndPriceTypeETHNFTS,
                    ...top20BoughtByPriceAndPriceTypeDYPNFTS,
                  ]}
                  nftCount={nftCount}
                  totalTx={totalTx}
                  totalvolume={totalvolume}
                />
              }
            />
            <Route
              exact
              path="/marketplace/caws"
              element={
                <CawsNFT
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  dypTokenData_old={dypTokenData_old}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  cawsBought={cawsBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                />
              }
            />
            <Route
              exact
              path="/marketplace/land"
              element={
                <WoDNFT
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  dypTokenData_old={dypTokenData_old}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  wodBought={landBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                />
              }
            />
            <Route
              exact
              path="/marketplace/timepiece"
              element={
                <TimepieceNFT
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  dypTokenData_old={dypTokenData_old}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                />
              }
            />
            <Route
              exact
              path="/marketplace/beta-pass/conflux"
              element={
                <BetaPassNFT
                  type={"conflux"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                />
              }
            />

            <Route
              exact
              path="/marketplace/beta-pass/skale"
              element={
                <BetaPassNFT
                  type={"skale"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  totalCmcNft={totalCmcNft}
                  totalSkaleNft={totalSkaleNft}
                  mySkaleNfts={myskaleNFTsCreated}

                />
              }
            />

            <Route
              exact
              path="/marketplace/beta-pass/doge"
              element={
                <BetaPassNFT
                  type={"doge"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  totalDogeNft={totalDogeNft}
                  myDogeNFTs={myDogeNFTs}
                />
              }
            />

            <Route
              exact
              path="/marketplace/beta-pass/coinmarketcap"
              element={
                <BetaPassNFT
                  type={"cmc"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                  totalDogeNft={totalDogeNft}
                  myDogeNFTs={myDogeNFTs}
                  totalCmcNft={totalCmcNft}
                  myCmcNFTs={myCmcNFTs}
                />
              }
            />

            <Route
              exact
              path="/marketplace/beta-pass/gate"
              element={
                <BetaPassNFT
                  type={"gate"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                />
              }
            />

            {/* <Route
                exact
                path="/marketplace/beta-pass/avalanche"
                element={
                  <BetaPassNFT
                    type={"avalanche"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    isConnected={isConnected}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    chainId={chainId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              /> */}
            {/* <Route
                exact
                path="/marketplace/beta-pass/coin98"
                element={
                  <BetaPassNFT
                    type={"coin98"}
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    cawsArray={allCawsForTimepieceMint}
                    mintloading={mintloading}
                    isConnected={isConnected}
                    chainId={chainId}
                    handleMint={handleTimepieceMint}
                    mintStatus={mintStatus}
                    textColor={textColor}
                    calculateCaws={calculateCaws}
                    totalCreated={totalTimepieceCreated}
                    totalCoingeckoNft={totalCoingeckoNft}
                    myNFTSCoingecko={MyNFTSCoingecko}
                    myGateNfts={myGateNfts}
                    totalGateNft={totalGateNft}
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    coinbase={coinbase}
                    timepieceBought={timepieceBought}
                    handleRefreshListing={handleRefreshList}
                    nftCount={nftCount}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              /> */}
            <Route
              exact
              path="/marketplace/beta-pass/coingecko/:terms?"
              element={
                <BetaPassNFT
                  type={"coingecko"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  handleSwitchNetwork={handleSwitchNetwork}
                  success={success}
                  showWalletConnect={() => {
                    setwalletModal(true);
                  }}
                />
              }
            />
            <Route
              exact
              path="/marketplace/beta-pass/base"
              element={
                <BetaPassNFT
                  type={"base"}
                  ethTokenData={ethTokenData}
                  dypTokenData={dypTokenData}
                  cawsArray={allCawsForTimepieceMint}
                  mintloading={mintloading}
                  isConnected={isConnected}
                  chainId={chainId}
                  handleMint={handleTimepieceMint}
                  mintStatus={mintStatus}
                  textColor={textColor}
                  calculateCaws={calculateCaws}
                  totalCreated={totalTimepieceCreated}
                  totalCoingeckoNft={totalCoingeckoNft}
                  myNFTSCoingecko={MyNFTSCoingecko}
                  myGateNfts={myGateNfts}
                  totalGateNft={totalGateNft}
                  totalBaseNft={totalBaseNft}
                  myBaseNFTs={myBaseNFTs}
                  totalConfluxNft={totalConfluxNft}
                  myConfluxNfts={myConfluxNfts}
                  timepieceMetadata={timepieceMetadata}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  coinbase={coinbase}
                  timepieceBought={timepieceBought}
                  handleRefreshListing={handleRefreshList}
                  nftCount={nftCount}
                  handleSwitchNetwork={handleSwitchNetwork}
                />
              }
            />
            <Route
              exact
              path="/marketplace/events/:eventId"
              element={
                <MarketEvents
                  tabState={"live"}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  account={coinbase?.toLowerCase()}
                  chainId={chainId}
                  dyptokenDatabnb={dyptokenDatabnb}
                  dyptokenDatabnb_old={dyptokenDatabnb_old}
                  idyptokenDatabnb={idyptokenDatabnb}
                  handleAvailableTime={(value) => {
                    setavailTime(value);
                  }}
                  ethTokenData={ethTokenData}
                  dyptokenData_old={dypTokenData_old}
                  dogePrice={dogePrice}
                />
              }
            />
            <Route
              exact
              path="/marketplace/events/upcoming"
              element={
                <MarketEvents
                  tabState={"upcoming"}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  account={coinbase?.toLowerCase()}
                  chainId={chainId}
                  dyptokenDatabnb={dyptokenDatabnb}
                  idyptokenDatabnb={idyptokenDatabnb}
                  dyptokenDatabnb_old={dyptokenDatabnb_old}
                  dyptokenData_old={dypTokenData_old}
                  handleAvailableTime={(value) => {
                    setavailTime(value);
                  }}
                  ethTokenData={ethTokenData}
                  dogePrice={dogePrice}
                />
              }
            />
            <Route
              exact
              path="/marketplace/events/past"
              element={
                <MarketEvents
                  tabState={"past"}
                  isConnected={isConnected}
                  handleConnect={handleShowWalletModal}
                  listedNFTS={listedNFTS}
                  account={coinbase?.toLowerCase()}
                  chainId={chainId}
                  dyptokenDatabnb={dyptokenDatabnb}
                  dyptokenDatabnb_old={dyptokenDatabnb_old}
                  idyptokenDatabnb={idyptokenDatabnb}
                  handleAvailableTime={(value) => {
                    setavailTime(value);
                  }}
                  dyptokenData_old={dypTokenData_old}
                  ethTokenData={ethTokenData}
                  dogePrice={dogePrice}
                />
              }
            />
            <Route
              exact
              path="/marketplace/stake"
              element={
                <MarketStake
                  isConnected={isConnected}
                  handleConnect={handleConnectWallet}
                  chainId={chainId}
                  coinbase={coinbase}
                />
              }
            />
            <Route
              exact
              path="/marketplace/mint/:id"
              element={
                <MarketMint
                coinbase={coinbase}
                showWalletConnect={() => {
                  setwalletModal(true);
                }}
                cawsArray={allCawsForTimepieceMint}
                mintloading={mintloading}
                isConnected={isConnected}
                chainId={chainId}
                handleMint={handleTimepieceMint}
                mintStatus={mintStatus}
                textColor={textColor}
                calculateCaws={calculateCaws}
                totalCreated={totalTimepieceCreated}
                timepieceMetadata={timepieceMetadata}
                myConfluxNFTsCreated={myConfluxNFTsCreated}
                mybaseNFTsCreated={mybaseNFTsCreated}
                myskaleNFTsCreated={myskaleNFTsCreated}
                handleConfluxMint={handleConfluxNftMint}
                handleBaseNftMint={handleBaseNftMint}
                confluxMintAllowed={confluxMintAllowed}
                baseMintAllowed={baseMintAllowed}
                skaleMintAllowed={skaleMintAllowed}
                />
              }
            />
 

          </Routes>
          {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
          <ScrollTop />
          {location.pathname.includes("marketplace") ||
          location.pathname.includes("notifications") ||
          location.pathname.includes("account") ? (
            location.pathname.includes("caws") ||
            location.pathname.includes("land") ? null : (
              <MarketplaceFooter />
            )
          ) : (
            <Footer />
          )}
        </div>

        {!location.pathname.includes("account") &&
          !location.pathname.includes("auth") && !location.pathname.includes("explorer") && <ChestFlyout />}
        {domainPopup && (
          <DomainModal
            onClose={() => setDomainPopup(false)}
            onSearch={searchDomain}
            available={availableDomain}
            price={domainPrice}
            chainId={chainId}
            bnbUSDPrice={bnbUSDPrice}
            onRegister={registerDomain}
            loading={loadingDomain}
            successMessage={successMessage}
            successDomain={successDomain}
            metadata={domainMetaData}
            bscAmount={bscAmount}
          />
        )}

        {showWalletModal === true && (
          <RegisterModal
            open={showWalletModal}
            onClose={() => {
              setShowWalletModal(false);
            }}
            handleConnect={handleConnection}
            coinbase={coinbase}
            showForms={showForms}
            myCawsWodStakes={myCawsWodStakesAll}
          />
        )}
        {betaModal === true && (
          <JoinBetaModal
            open={betaModal}
            onClose={() => {
              setBetaModal(false);
            }}
            handleConnect={handleConnection}
            coinbase={coinbase}
            showForms={showForms}
          />
        )}

        {walletModal === true && (
          <WalletModal
            show={walletModal}
            handleClose={() => {
              setwalletModal(false);
            }}
            handleConnection={() => {
              handleConnectWallet();
            }}
          />
        )}

        {showWalletModalDownload === true && (
          <CheckWhitelistModal
            open={showWalletModalDownload}
            onClose={() => {
              setdownloadSelected(false);
              setShowWalletModalDownload(false);
            }}
            isPremium={isPremium}
            handleConnect={handleConnection}
            coinbase={coinbase}
            showForms={showForms}
            openRegister={handleRegister}
            donwloadSelected={donwloadSelected}
            cawsMinted={myCAWSNFTsCreated.length}
            cawsStaked={myCAWSNFTsTotalStaked.length}
            landMinted={myNFTs.length}
            landStaked={mystakes.length}
            handleActiveUser={(value) => {
              setactiveUser(value);
            }}
          />
        )}

        {fireAppcontent === true && <AppContent />}

        {showWalletModalRegister === true && (
          <CheckWhitelistModal
            open={showWalletModalRegister}
            onClose={() => {
              setShowWalletModalRegister(false);
            }}
            isPremium={isPremium}
            handleConnect={handleConnection}
            coinbase={coinbase}
            showForms={showForms}
            openRegister={handleRegister}
            donwloadSelected={donwloadSelected}
            cawsMinted={myCAWSNFTsCreated.length}
            cawsStaked={myCAWSNFTsTotalStaked.length}
            landMinted={myNFTs.length}
            landStaked={mystakes.length}
            handleRedirect={() => {
              setFireAppContent(true);
            }}
            handleActiveUser={(value) => {
              setactiveUser(value);
            }}
          />
        )}

        {showWalletModalRegister2 === true && (
          <CheckAuthUserModal
            open={showWalletModalRegister2}
            onClose={() => {
              setShowWalletModalRegister2(false);
            }}
            handleConnect={handleConnection}
            coinbase={coinbase}
            showForms={showForms}
            openRegister={handleRegister}
            donwloadSelected={donwloadSelected}
            cawsMinted={myCAWSNFTsCreated.length}
            cawsStaked={myCAWSNFTsTotalStaked.length}
            landMinted={myNFTs.length}
            landStaked={mystakes.length}
            handleRedirect={() => {
              setFireAppContent(true);
            }}
            handleActiveUser={(value) => {
              setactiveUser(value);
            }}
          />
        )}
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
