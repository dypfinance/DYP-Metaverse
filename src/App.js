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
import { getConnectors, Web3ReactProvider } from "web3-connector";

function App() {
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

  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [listedNFTS2, setListedNFTS2] = useState([]);
  const [recentListedNFTS2, setrecentListedNFTS2] = useState([]);

  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
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
  const [totalConfluxNft, setTotalConfluxNft] = useState(0);

  const [fireAppcontent, setFireAppContent] = useState(false);
  const [activeUser, setactiveUser] = useState(false);
  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);

  const [totalBoughtNFTSCount, setTotalBoughtNFTSCount] = useState(0);
  const [totalBoughtNFTSinETH, setTotalBoughtNFTSinETH] = useState(0);
  const [totalBoughtNFTSinDYP, setTotalBoughtNFTSinDYP] = useState(0);
  const [availTime, setavailTime] = useState();

  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);

  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setMyGateNfts] = useState([])
  const [myConfluxNfts, setMyConfluxNfts] = useState([])


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
  const [dypTokenData, setDypTokenData] = useState();
  const [ethTokenData, setEthTokenData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [cawsBought, setCawsBought] = useState([]);
  const [timepieceBought, setTimepieceBought] = useState([]);
  const [landBought, setLandBought] = useState([]);
  const [myNftsOffer, setmyNftsOffer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEagerlyConnect();
  const connectors = getConnectors({
    1: [`${window.config.infura_endpoint}`],
  });



  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        // const propertyDyp = Object.entries(
        //   data.data.the_graph_bsc_v2.token_data
        // );
        // setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnbNew = async () => {
    await axios
      .get(
        "https://api.geckoterminal.com/api/v2/networks/bsc/pools/0x3fbca1072fb101e9440bb97be9ef763aac312516"
      )
      .then((res) => {
        setDypTokenDatabnb(res.data.data.attributes.base_token_price_usd);
        // console.log(res.data.data.attributes.base_token_price_usd, "Base token price");
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

  const fetchAvatar = async (coinbase) => {
    const response = await fetch(
      `https://api-image.dyp.finance/api/v1/avatar/${coinbase}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.avatar) {
          setAvatar(data.avatar);
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

      fetchAvatar(data);
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
      await window.getCoinbase().then((data) => {
        if (data) {
          setCoinbase(data);
          setIsConnected(true);
        } else {
          setCoinbase();
          setIsConnected(false);
        }
      });
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
    } catch (e) {
      setShowWalletModal(false);
      setSuccess(true);

      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const checkNetworkId = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else {
      setChainId(1);
    }
  };

  const handleConnectWallet = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });
      checkConnection();

      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms2(true);
      setwalletModal(false);
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

      getMyNFTS(coinbase, "conflux").then((NFTS) => {
        setTotalConfluxNft(NFTS.length);
        setMyConfluxNfts(NFTS);
      });
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
        // console.log(data);
        setListedNFTS2(data);
      })
      .catch((e) => {
        console.log(e);
      });

    getListedNFTS(0, "", "recentListedNFTS")
      .then((data) => {
        // console.log(data);
        setrecentListedNFTS2(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];
    let finalboughtItems2 = [];

    listedNFTS2 &&
      listedNFTS2.length > 0 &&
      listedNFTS2.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        }
      });

    setListedNFTS(finalboughtItems1);
    setListedNFTSCount(finalboughtItems1.length);

    recentListedNFTS2 &&
      recentListedNFTS2.length > 0 &&
      recentListedNFTS2.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems2.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems2.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems2.push(nft);
        }
      });

    setLatest20RecentListedNFTS(finalboughtItems2);
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

  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", checkNetworkId);
    }
  }, [ethereum, nftCount]);

  const logout = localStorage.getItem("logout");
  
  useEffect(() => {
    if (window.ethereum) {
      if (
        (window.ethereum.isConnected() === true && logout === "false") ||
        window.gatewallet
      ) {
        checkConnection2();
      } else {
        setIsConnected(false);
        setCoinbase();
        localStorage.setItem("logout", "true");
      }
      checkNetworkId();
    }
  }, [coinbase, chainId]);

  useEffect(() => {
    checkNetworkId();
  }, [isConnected, coinbase, chainId]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myCAWStakes();
      myLandStakes();
      getmyCawsWodStakes();
      myCAWNft();
      myNft();
      fetchAllMyNfts();
    }
  }, [isConnected, chainId, currencyAmount, coinbase]);

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
    let subscribedPlatformTokenAmountAvax;
    let subscribedPlatformTokenAmountBNB;

    const web3eth = window.infuraWeb3;
    const web3avax = window.avaxWeb3;
    const web3bnb = window.bscWeb3;

    const AvaxABI = window.SUBSCRIPTION_ABI;
    const EthABI = window.SUBSCRIPTIONETH_ABI;
    const BnbABI = window.SUBSCRIPTIONBNB_ABI;

    const ethsubscribeAddress = window.config.subscriptioneth_address;
    const avaxsubscribeAddress = window.config.subscription_address;
    const bnbsubscribeAddress = window.config.subscriptionbnb_address;

    const ethcontract = new web3eth.eth.Contract(EthABI, ethsubscribeAddress);
    const avaxcontract = new web3avax.eth.Contract(
      AvaxABI,
      avaxsubscribeAddress
    );

    const bnbcontract = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress);

    if (coinbase) {
      subscribedPlatformTokenAmountETH = await ethcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      subscribedPlatformTokenAmountAvax = await avaxcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      subscribedPlatformTokenAmountBNB = await bnbcontract.methods
        .subscriptionPlatformTokenAmount(coinbase)
        .call();

      if (
        subscribedPlatformTokenAmountAvax === "0" &&
        subscribedPlatformTokenAmountETH === "0" &&
        subscribedPlatformTokenAmountBNB === "0"
      ) {
        setIsPremium(false);
      }
      if (
        subscribedPlatformTokenAmountAvax !== "0" ||
        subscribedPlatformTokenAmountETH !== "0" ||
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

  const handleSwitchNetwork = (chain) => {
    setChainId(chain);
  };

  const handleDisconnect = async () => {
    localStorage.setItem("logout", "true");
    setSuccess(false);
    setCoinbase();
    setIsConnected(false);
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

  useEffect(() => {
    fetchUserFavorites(coinbase);
    refreshSubscription();
  }, [coinbase, nftCount]);

  useEffect(() => {
    getTokenData();
    getTokenDatabnb();
    getTokenDatabnbNew();
    getListedNfts2();

    getLatest20BoughtNFTS();

    getTop20BoughtByPriceAndPriceTypeNFTS(0).then((NFTS) =>
      settop20BoughtByPriceAndPriceTypeETHNFTS(NFTS)
    );
    getTop20BoughtByPriceAndPriceTypeNFTS(1).then((NFTS) =>
      settop20BoughtByPriceAndPriceTypeDYPNFTS(NFTS)
    );
    getallNfts();
  }, [nftCount]);

  useEffect(() => {
    if (listedNFTS2.length > 0 && recentListedNFTS2.length > 0) {
      getOtherNfts();
    }
  }, [listedNFTS2?.length, recentListedNFTS2?.length, nftCount]);

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

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Web3ReactProvider connectors={connectors}>
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
              <Route exact path="/explorer" element={<Explorer />} />
              <Route exact path="/stake" element={<NftMinting />} />
              <Route exact path="/contact-us" element={<PartnerForm />} />
              <Route
                exact
                path="/unsubscribe/:email"
                element={<Unsubscribe />}
              />
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
              <Route
                exact
                path="/forgotPassword"
                element={<ForgotPassword />}
              />
              <Route exact path="/ResetPassword" element={<ResetPassword />} />
              <Route exact path="/player" element={<PlayerCreation />} />

              <Route
                exact
                path="/account"
                element={
                  <Dashboard
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
                    coinbase={coinbase}
                    account={coinbase}
                    isConnected={isConnected}
                    chainId={chainId}
                    handleConnect={handleConnection}
                    onSigninClick={() => {
                      setShowWalletModalRegister2(true);
                    }}
                    success={success}
                    availableTime={availTime}
                  />
                }
              />

              <Route
                exact
                path="/land"
                element={
                  <Land
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
                    ethTokenData={ethTokenData}
                    dypTokenData={dypTokenData}
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
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}

                    timepieceMetadata={timepieceMetadata}
                    handleSwitchNetwork={handleSwitchNetwork}
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
                    totalConfluxNft={totalConfluxNft}
                    myConfluxNfts={myConfluxNfts}
                    timepieceMetadata={timepieceMetadata}
                    handleSwitchNetwork={handleSwitchNetwork}
                  />
                }
              />

              <Route
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
              />
              <Route
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
              />
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
                    isConnected={isConnected}
                    handleConnect={handleShowWalletModal}
                    listedNFTS={listedNFTS}
                    account={coinbase}
                    chainId={chainId}
                    dyptokenDatabnb={dyptokenDatabnb}
                    idyptokenDatabnb={idyptokenDatabnb}
                    handleAvailableTime={(value) => {
                      setavailTime(value);
                    }}
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
                path="/marketplace/mint"
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
                  />
                }
              />
            </Routes>
            {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
            <ScrollTop />
            {location.pathname.includes("marketplace") ||
            location.pathname.includes("notifications") ||
            location.pathname.includes("account") ? (
              location.pathname.includes("timepiece") ||
              location.pathname.includes("caws") ||
              location.pathname.includes("land") ? null : (
                <MarketplaceFooter />
              )
            ) : (
              <Footer />
            )}
          </div>
        </Web3ReactProvider>

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
