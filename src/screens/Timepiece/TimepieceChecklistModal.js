import Modal from "@mui/material/Modal";
import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import "../Caws/NftMinting/NftStakeChecklistModal/_nftStakeChecklistModal.scss";
import useWindowSize from '../../hooks/useWindowSize'
import TimepiecePlaceHolder from "./TimepiecePlaceHolder";
import TimepieceItem from "./TimepieceItem";

const TimepieceChecklistModal = ({
  nftItem,
  open,
  onClose,
  coinbase,
  isConnected,
}) => {


  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowSize.width < 500 ? "80%" : "55%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "80%",
    borderRadius: "8px",
    overflowX: "hidden",
    padding: windowSize.width  < 500 ? '18px' : '32px'
  };


  const devicewidth = window.innerWidth;
  
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="left-col">
          <div className="d-flex align-items-center justify-content-between width-100 position-relative">
            <div
              className="rarity-rank mt-6"
              style={{
                position: "relative",
                top: "1rem",
              }}
            >
              <h6 className="landchecklist-subtitle">
                A list of your NFT collection.
              </h6>
            </div>
            <img
              src={X}
              alt=""
              className="position-absolute"
              onClick={() => {
                onClose();
              }}
              style={{
                right: "-12px",
                top: "-10px",
                width: 50,
                height: 50,
                cursor: "pointer",
              }}
            />
          </div>
         
          <div className="caw-card2">
            <div className="caw-card2 align-items-center">
              {nftItem.length == 0 ? (
                [...Array(devicewidth < 500 ? 1 : 8)].map((item, id) => {
                  return (
                    <TimepiecePlaceHolder
                      key={id}
                      onMintClick={() => {
                        onClose();
                      }}
                    />
                  );
                })
              ) : nftItem.length <= 4 ? (
                <>
                  {nftItem.map((item, id) => {
                    let nftId = parseInt(item.name?.slice(1, nftItem.name?.length));

                   
                    return (
                      <>
                       <TimepieceItem
                        coinbase={coinbase}
                        key={id}
                        nft={item}
                        modalId="#NftUnstake2"
                        checklistItemID={nftId}
                        isConnected={isConnected}
                      />
                      </>
                    );
                  })}
                  {[
                    ...Array(
                      devicewidth < 500
                        ? 1
                        : Math.abs(8 - parseInt(nftItem.length))
                    ),
                  ].map((item, id) => {
                    return (
                      <TimepiecePlaceHolder
                        key={id}
                        onMintClick={() => {
                          onClose();
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                nftItem.map((item, id) => {
                  let nftId = parseInt(item.name?.slice(1, nftItem.name?.length));
                  
                  return (
                    <>
                      <TimepieceItem
                        coinbase={coinbase}
                        key={id}
                        nft={item}
                        modalId="#NftUnstake2"
                        checklistItemID={nftId}
                        isConnected={isConnected}
                      />
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
TimepieceChecklistModal.propTypes = {
  nftItem: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onshowToStake: PropTypes.func,
  onshowStaked: PropTypes.func,
  onClaimAll: PropTypes.func,
  onUnstake: PropTypes.func,
  ETHrewards: PropTypes.number,
};

export default TimepieceChecklistModal;
