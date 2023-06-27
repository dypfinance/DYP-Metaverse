import React, { useState, useEffect } from "react";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import marketStakeBanner from "./assets/marketStakeBanner2.webp";
import StakeModal from "../../components/StakeModal/StakeModal";
import RewardsModal from "../../components/StakeModal/RewardsModal";
import StakeLandModal from "../../components/StakeModal/StakeLandModal";
import axios from "axios";
import { abbreviateNumber } from "js-abbreviation-number";

const MarketStake = ({ coinbase, chainId, handleConnect, isConnected }) => {
  const windowSize = useWindowSize();
  const [mystakes, setMystakes] = useState([]);
  const [mystakesLandPool, setMystakesLandPool] = useState([]);
  const [myLandstakes, setMyLandstakes] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);
  const [nftModal, setNftModal] = useState(false);
  const [rewardModal, setRewardModal] = useState(false);
  const [landStakeModal, setlandStakeModal] = useState(false);
  const [landunStakeModal, setlandunStakeModal] = useState(false);

  const [newStakes, setnewStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [approvedLandPoolNfts, setApprovedLandPoolNfts] = useState([]);

  const [approvedWodNfts, setApprovedWodNfts] = useState([]);
  const [approvedLandNfts, setApprovedLandNfts] = useState([]);
  const [EthRewards, setEthRewards] = useState(0);
  const [EthRewardsLandPool, setEthRewardsLandPool] = useState(0);

  const [ethToUSD, setethToUSD] = useState(0);
  const [ethToUSDLandPool, setethToUSDLandPool] = useState(0);

  const [landtvl, setlandTvl] = useState(0);
  const [cawslandTvl, setCawsLandtvl] = useState(0);
  const [activeTab, setActiveTab] = useState("live")
  const [totalRewards, setTotalRewards] = useState(0)
  const [totalLocked, setTotalLocked] = useState(0)

  const html = document.querySelector("html");

  const fetchTvl = async () => {
    const result = await axios.get(
      `https://api.dyp.finance/api/get_staking_info_eth`
    );
    if (result) {
      const resultLand = result.data.stakingInfoLAND[0].tvl_usd;
      const resultcawsWod = result.data.stakinginfoCAWSLAND[0].tvl_usd;
      setlandTvl(resultLand);
      setCawsLandtvl(resultcawsWod);
    }
  };
  const fetchTotalLocked = async () => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/lockedNFTs`
    );
    if (result) {
    setTotalLocked(result.data)
    }
  };
  const fetchTotalRewars = async () => {
    const result = await axios.get(
      `https://api.worldofdypians.com/api/stakeRewards`
    );
    if (result) {
    setTotalRewards(result.data)
    }
  };



  const myNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTs(nfts);
    } else setMyNFTs([]);
  };

  const getStakesIds = async () => {
    let stakenft = [];

    if (coinbase && isConnected && chainId === 1) {
      const allCawsStakes = await window.wod_caws
        .depositsOf(coinbase)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    }
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    } else setMystakes([]);
  };

  const getLandStakesIds = async () => {
    let stakenft = [];
    if (coinbase && isConnected && chainId === 1) {
      const allLandStakes = await window.wod_caws
        .depositsOfWod(coinbase)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allLandStakes;
    }
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyLandstakes(stakes);
    } else setMyLandstakes([]);
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

  const getStakesIdsLandPool = async () => {
    if (coinbase && isConnected && chainId === 1) {
      let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(coinbase)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const myStakesLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let stakes = myStakes.map((stake) => window.getLandNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakesLandPool(stakes);
  };

  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const handleUnstakeAll = async () => {
    await window.wod_caws
      .withdrawWodCaws()
      .then(() => {
        refreshStakes();
      })
      .catch((err) => {
        window.alertify.error(err?.message);
      });
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
    setethToUSDLandPool(Number(ethprice) * Number(EthRewardsLandPool))
  };

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;

    if (coinbase !== null) {
      if (myStakes.length > 0) {
        let rewards = await window.wod_caws
          .calculateRewardsWodCaws(coinbase, myStakes)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        let finalReward = 0;
        for (let i = 0; i < rewards.length; i++) {
          finalReward = rewards[i] / 1e18;
          result = result + Number(finalReward);
        }
      }
    }
    setEthRewards(result);
  };

  const calculateAllRewardsLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let result = 0;
    let calculateRewards = [];
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    if (coinbase !== null) {
      if (myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(coinbase, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
      let a = 0;

      for (let i = 0; i < calculateRewards.length; i++) {
        a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");
        result = result + Number(a);
      }
    }
    setEthRewardsLandPool(result);
  };

  const claimRewards = async () => {
    let myStakes = await getStakesIds();
    // setclaimAllStatus("Claiming all rewards, please wait...");
    await window.wod_caws
      .claimRewardsWodCaws(myStakes)
      .then(() => {
        setEthRewards(0);
      })
      .catch((err) => { });
  };

  const claimRewardsLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");

    await staking_contract.methods
      .claimRewards(myStakes)
      .send()
      .then(() => {
        setEthRewards(0);
      })
      .catch((err) => { console.log(err) });
  };

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  const getApprovedLandPoolsNfts = (data) => {
    setApprovedLandPoolNfts(data);
    return data;
  };

  const getApprovedLandNfts = (data) => {
    setApprovedLandNfts(data);
    return data;
  };

  const onModalClose = () => {
    setNftModal(false);
  };

  const onRewardModalClose = () => {
    setRewardModal(false);
  };

  const onLandStakeModalClose = () => {
    setlandStakeModal(false);
  };

  const onLandunStakeModalClose = () => {
    setlandunStakeModal(false);
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice();
    }
  }, [isConnected, EthRewards]);

  useEffect(() => {
    calculateAllRewards();
    calculateAllRewardsLandPool()
    myNft();
    myStakes();
    myLandNft();
    myLandStakes();
    myStakesLandPool();
    fetchTotalLocked();
    fetchTotalRewars();
  }, [isConnected, coinbase, newStakes]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Stake";
    fetchTvl();
  }, []);

  useEffect(() => {
    if (nftModal || rewardModal || landStakeModal || landunStakeModal) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [nftModal, rewardModal, landStakeModal, landunStakeModal]);

  return (
    <div
      className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
      style={{ minHeight: "72vh", maxWidth: '2400px' }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div
        className="container-nft d-flex align-items-start flex-column gap-2 px-3 px-lg-5 my-4 position-relative"
        style={{ minHeight: "72vh", backgroundSize: "cover" }}
      >
        <div className="container-lg mx-0">
          {nftModal && (
            <StakeModal
              onModalClose={onModalClose}
              getApprovedNfts={getApprovedNfts}
              getApprovedLandNfts={getApprovedLandNfts}
              landItems={myLandNFTs}
              cawsItems={myNFTs}
              nftItem={myNFTs}
              isConnected={isConnected}
              coinbase={coinbase}
              onDepositComplete={() => refreshStakes()}
            />
          )}
          {rewardModal && (
            <RewardsModal
              onModalClose={onRewardModalClose}
              getApprovedNfts={getApprovedNfts}
              getApprovedLandNfts={getApprovedLandNfts}
              landStakes={myLandstakes}
              cawsStakes={mystakes}
              nftItem={mystakes}
              isConnected={isConnected}
              coinbase={coinbase}
              onDepositComplete={() => refreshStakes()}
              ETHrewards={EthRewards}
              finalUsd={ethToUSD}
              onClaimAll={() => {
                claimRewards();
              }}
            />
          )}
          {landStakeModal && (
            <StakeLandModal
              onModalClose={onLandStakeModalClose}
              getApprovedLandPoolsNfts={getApprovedLandPoolsNfts}
              nftItem={myLandNFTs}
              isConnected={isConnected}
              coinbase={coinbase}
              onDepositComplete={() => refreshStakes()}
              onClaimAll={() => {
                claimRewards();
              }}
              isStake={false}
            />
          )}

          {landunStakeModal && (
            <StakeLandModal
              onModalClose={onLandunStakeModalClose}
              getApprovedLandPoolsNfts={getApprovedLandPoolsNfts}
              nftItem={mystakesLandPool}
              isConnected={isConnected}
              coinbase={coinbase}
              onDepositComplete={() => refreshStakes()}
              ETHrewards={EthRewardsLandPool}
              finalUsd={ethToUSDLandPool}
              onClaimAll={() => {
                claimRewardsLandPool();
              }}
              isStake={true}
            />
          )}
          <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
            NFT{" "}
            <span style={{ color: "#8c56ff" }}> Staking</span>
          </h6>
          <div className="d-flex w-100 align-items-center justify-content-center gap-4">
            <h6 className={`new-stake-tab ${activeTab === "live" && "stake-tab-active"} px-3 py-2`} onClick={() => setActiveTab("live")}>Live</h6>
            <h6 className={`new-stake-tab ${activeTab === "upcoming" && "stake-tab-active"} px-3 py-2`} onClick={() => setActiveTab("upcoming")}>Upcoming</h6>
            <h6 className={`new-stake-tab ${activeTab === "past" && "stake-tab-active"} px-3 py-2`} onClick={() => setActiveTab("past")}>Past</h6>
          </div>
          <span className="w-100 new-stake-divider mt-3 mb-5">
          </span>
        {activeTab === "live" &&
        <>
          <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-4 d-flex align-items-center justify-content-around">
            <div className="d-flex flex-column align-items-center gap-2">
              <h6 className="new-stake-info">${abbreviateNumber(landtvl + cawslandTvl)}+</h6>
              <span className="new-stake-desc">
                Total Value Locked (TVL)
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              <h6 className="new-stake-info">{abbreviateNumber(totalLocked)}+</h6>
              <span className="new-stake-desc">
                Total Staked NFTs
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              <h6 className="new-stake-info">${abbreviateNumber(totalRewards)}+</h6>
              <span className="new-stake-desc">
                Paid Rewards
              </span>
            </div>
          </div>
          <div className="row w-100  m-0 mt-5">
            <div className="col-12 px-0">
              <div className="caws-wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-2">
                      <h6 className="market-stake-title">
                        World of Dypians Land & CAWS
                      </h6>
                      <span className="market-stake-desc">
                        Combine your Land and CAWS NFTs to earn daily ETH
                        rewards.
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn pill-btn px-4 py-2"
                        onClick={() => setNftModal(true)}
                      >
                        Deposit
                      </button>
                      <button
                        className="btn rewards-btn px-4 py-2"
                        onClick={() => {
                          setRewardModal(true);
                        }}
                      >
                        Rewards
                      </button>
                    </div>
                  </div>
                  <div className="tvl-wrapper">
                    <h6 className="market-stake-tvl">
                      ${abbreviateNumber(cawslandTvl)}+
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 mt-5">
            <div className="col-12 px-0">
              <div className="wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-2">
                      <h6 className="market-stake-title">
                        World of Dypians Land
                      </h6>
                      <span className="market-stake-desc">
                        Stake your Genesis Land NFTs to earn daily ETH rewards.
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn pill-btn px-4 py-2"
                        onClick={() => {
                          setlandStakeModal(true);
                        }}
                      >
                        Deposit
                      </button>
                      <button
                        className="btn rewards-btn px-4 py-2"
                        onClick={() => {
                          setlandunStakeModal(true);
                        }}
                      >
                        Rewards
                      </button>
                    </div>
                    <div className="tvl-wrapper">
                      <h6 className="market-stake-tvl">
                        ${abbreviateNumber(landtvl)}+
                      </h6>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        }
        {activeTab === "upcoming" &&
         <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
         <div className="d-flex flex-column align-items-center gap-2">
           <h6 className="upcoming-stake">Staking pools are coming...</h6>
           <span className="upcoming-stake-desc">
           Check back soon!
           </span>
         </div>
       
       </div>
        }
        {activeTab === "past" &&
        <div className="row w-100 m-0 mt-5">
        <div className="col-12 px-0">
          <div className="caws-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5 position-relative">
            <div className="expired-caws-tag px-3 py-1">
              <span className="expired-caws-span">Expired</span>
            </div>
            <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column gap-2">
                  <h6 className="market-stake-title">
                    Cats and Watches Society
                  </h6>
                  <span className="market-stake-desc">
                    Stake your CAWS NFTs to earn daily ETH rewards.
                  </span>
                  {/* <div className="d-flex align-items-center justify-content-between">
                    <div className="past-caws-info-wrapper d-flex flex-column align-items-center px-3 py-2" style={{width: '30%'}}>
                      <h6 className="past-caws-info-value">50%</h6>
                      <span className="past-caws-info">APR</span>
                    </div>
                    <div className="past-caws-info-wrapper d-flex flex-column align-items-center px-3 py-2" style={{width: '30%'}}>
                      <h6 className="past-caws-info-value">ETH</h6>
                      <span className="past-caws-info">Rewards</span>
                    </div>
                    <div className="past-caws-info-wrapper d-flex flex-column align-items-center px-3 py-2" style={{width: '30%'}}>
                      <h6 className="past-caws-info-value">No Lock</h6>
                      <span className="past-caws-info">Lock Time</span>
                    </div>
                  </div> */}
                </div>
                {/* <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn pill-btn px-4 py-2"
                    onClick={() => {
                      setlandStakeModal(true);
                    }}
                  >
                    Deposit
                  </button>
                  <button
                    className="btn rewards-btn px-4 py-2"
                    onClick={() => {
                      setlandunStakeModal(true);
                    }}
                  >
                    Rewards
                  </button>
                </div> */}
               
              </div>
            </div>
          </div>
        </div>
      </div>
        }
        </div>
      </div>
    </div>
  );
};

export default MarketStake;
