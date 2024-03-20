import React, { useEffect, useState } from "react";
import xMark from "../../screens/Account/src/Components/WalletBalance/assets/closeMark.svg";
import ethIcon from "../../screens/Marketplace/assets/ethIcon.svg";
import bnbLogo from "../../screens/Marketplace/assets/bnbLogo.svg";
import confluxLogo from "../../screens/Marketplace/assets/confluxLogo.svg";
import baseLogo from "../../screens/Marketplace/assets/baseLogo.svg";
import avaxLogo from "../../screens/Marketplace/assets/avaxLogo.svg";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/topDyp.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import axios from "axios";

const BuyNftPopup = ({
  nft,
  onClose,
  dypTokenData,
  dyptokenData_old,
  ethTokenData,
  chainId,
  handleSwitchChain,
  chestIndex,
  chain,
  email,
}) => {
  const [type, setType] = useState("");
  const [buyloading, setbuyLoading] = useState(false); //buy
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  const isApprovedBuy = async (tokenType, amount) => {
    const result = await window.isApprovedBuy(tokenType, amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  async function handleBuy(nft) {
    const tokenType =
      nft.payment_tokenAddress === window.config.dyp_token_address
        ? "dypv1"
        : nft.payment_tokenAddress === window.config.token_dypius_new_address
        ? "dypv2"
        : "eth";

    const isApproved = await isApprovedBuy(tokenType, nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying", nft.price);
      setPurchaseColor("#00FECF");

      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying NFT in progress..");
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then(async (result) => {
          console.log("buyNFT", result);

          const body =  {
            transactionHash: result.transactionHash,
            emailAddress: email,
            chestIndex: chestIndex,
          }

          if(chain === "skale"){
            body.chain = chain
          }

          await axios.post(
            `https://dyp-chest-test.azurewebsites.net/api/ClaimNftReward?code=wcdvJ3PTF9eB0mZOu25FNxSuUZLWiubCQNG8oljEy88fAzFufLdFSw%3D%3D`,
           body
          );
          setbuyLoading(false);
          setbuyStatus("success");
          setPurchaseStatus("Successfully purchased!");
          setShowToast(true);
          setToastTitle("Successfully purchased!");
          setPurchaseColor("#00FECF");
          // setIsListed(false)

          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
            // handleRefreshList(
            //   nft.nftAddress === window.config.nft_caws_address
            //     ? "caws"
            //     : nft.nftAddress === window.config.nft_timepiece_address
            //     ? "timepiece"
            //     : "land",
            //   nft.tokenId
            // );
            // handleRefreshListing();
            // getLatestBoughtNFT();
          }, 3000);
        })
        .catch((e) => {
          setbuyStatus("failed");
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve buying");

      setbuyStatus("approve");
      setbuyLoading(true);
      setPurchaseStatus("Approving in progress...");
      setPurchaseColor("#00FECF");
      await window
        .approveBuy(tokenType, nft.price)
        .then(() => {
          setTimeout(() => {
            setbuyStatus("buy");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("success");
          setbuyLoading(false);
          setPurchaseStatus("Successfully approved");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          console.error(e);
          setbuyStatus("failed");
          setTimeout(() => {
            setbuyStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
        });
    }
  }

  useEffect(() => {
    if (nft.nftAddress === window.config.nft_caws_address) {
      setType("caws");
    } else if (nft.nftAddress === window.config.nft_caws_bnb_address) {
      setType("cawsbnb");
    } else if (nft.nftAddress === window.config.nft_caws_avax_address) {
      setType("cawsavax");
    } else if (nft.nftAddress === window.config.nft_caws_base_address) {
      setType("cawsbase");
    } else if (nft.nftAddress === window.config.nft_land_bnb_address) {
      setType("landbnb");
    } else if (nft.nftAddress === window.config.nft_land_avax_address) {
      setType("landavax");
    } else if (nft.nftAddress === window.config.nft_land_base_address) {
      setType("landbase");
    }
  }, [nft]);

  return (
    <div className="buy-nft-popup-wrapper d-flex flex-column gap-2 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="nft-title mb-0">
          {nft.type === "caws" ? "CAWS" : "Genesis Land"} #{nft.tokenId}
        </h6>
        <img
          src={xMark}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <img
        className="popup-nft-img"
        src={
          nft.nftAddress === window.config.nft_caws_address ||
          nft.nftAddress === window.config.nft_caws_bnb_address ||
          nft.nftAddress === window.config.nft_caws_avax_address ||
          nft.nftAddress === window.config.nft_caws_base_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/caws_400x400/${nft.tokenId}.png`
            : nft.nftAddress === window.config.nft_land_address ||
              nft.nftAddress === window.config.nft_land_bnb_address ||
              nft.nftAddress === window.config.nft_land_avax_address ||
              nft.nftAddress === window.config.nft_land_base_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/genesis_400x400/${nft.tokenId}.png`
            : nft.nftAddress === window.config.nft_coingecko_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/400x400_cg_pass.png`
            : nft.nftAddress === window.config.nft_gate_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate400.png`
            : nft.nftAddress === window.config.nft_conflux_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+400px.png`
            : nft.nftAddress === window.config.nft_doge_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+400x400.png`
            : nft.nftAddress === window.config.nft_cmc_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+400x400px.png`
            : nft.nftAddress === window.config.nft_base_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+400px.png`
            : `https://dypmeta.s3.us-east-2.amazonaws.com/timepiece_400x400/${nft.tokenId}.png`
        }
        alt=""
      />

      <span className="seller-addr d-flex gap-1 align-items-center">
        <img
          src={
            type === "coingecko" ||
            type === "gate" ||
            type === "doge" ||
            type === "cmc" ||
            type === "cawsbnb" ||
            type === "landbnb"
              ? bnbLogo
              : type === "conflux"
              ? confluxLogo
              : type === "base" || type === "cawsbase" || type === "landbase"
              ? baseLogo
              : type === "cawsavax" || type === "landavax"
              ? avaxLogo
              : ethIcon
          }
          alt=""
          style={{ width: 20, height: 20 }}
        />{" "}
        {type === "coingecko" ||
        type === "gate" ||
        type === "doge" ||
        type === "cawsbnb" ||
        type === "cmc" ||
        type === "landbnb"
          ? "BNB Chain"
          : type === "conflux"
          ? "Conflux"
          : type === "base" || type === "landbase" || type === "cawsbase"
          ? "BASE Network"
          : type === "cawsavax" || type === "landavax"
          ? "Avalanche"
          : "Ethereum"}
      </span>

      <div className="d-flex justify-content-between align-items-center">
        <span className="currentprice-txt">Current price</span>
        {/* <StyledTextField
                        error={nftPrice === "" ? true : false}
                        size="small"
                        id="price"
                        name="price"
                        value={nftPrice}
                        type="number"
                        required
                        onChange={(e) => {
                          setNftPrice(e.target.value);
                        }}
                        sx={{ width: "120px" }}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          max: 10,
                        }}
                      /> */}
        <div className="d-flex gap-2 align-items-center">
          <img
            src={nft?.payment_priceType === 0 ? topEth : topDyp}
            alt=""
            height={20}
            width={20}
          />
          <span
            className="nft-price-eth"
            style={{ fontSize: 15, lineHeight: "20px" }}
          >
            {getFormattedNumber(
              nft?.price / 1e18,
              nft?.payment_priceType === 0 ? 3 : 0
            )}{" "}
            {nft?.payment_priceType === 0
              ? "ETH"
              : nft?.payment_tokenAddress === window.config.dyp_token_address
              ? "DYPv1"
              : "DYPv2"}
          </span>
          <span className="nft-price-usd">
            $
            {getFormattedNumber(
              nft?.payment_priceType === 0
                ? ethTokenData * (nft?.price / 1e18)
                : nft?.payment_tokenAddress === window.config.dyp_token_address
                ? dyptokenData_old * (nft?.price / 1e18)
                : dypTokenData * (nft?.price / 1e18),
              2
            )}
          </span>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center mt-2">
        <button
          disabled={
            buyloading === true || buyStatus === "failed" ? true : false
          }
          className={`btn  buyNftbtn px-4 d-flex justify-content-center ${
            buyStatus === "success"
              ? "successbtn"
              : buyStatus === "failed" || (chainId !== 5 && chainId !== 1)
              ? "errorbtn"
              : null
          } d-flex justify-content-center align-items-center gap-2`}
          onClick={() => {
            chainId !== 1 && chainId !== 5
              ? handleSwitchChain()
              : handleBuy(nft);
          }}
        >
          {buyloading && (chainId === 1 || chainId === 5) ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : !buyloading && chainId !== 1 && chainId !== 5 ? (
            "Switch Network"
          ) : buyStatus === "buy" ? (
            "Buy"
          ) : buyStatus === "approve" || buyStatus === "" ? (
            "Approve buy"
          ) : buyStatus === "success" ? (
            "Success"
          ) : (
            "Failed"
          )}
        </button>
      </div>
    </div>
  );
};

export default BuyNftPopup;