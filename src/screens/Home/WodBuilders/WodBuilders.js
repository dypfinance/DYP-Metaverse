import React from "react";
import "./_wodbuilders.scss";
import { useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
const WodBuilders = () => {
  const [slice, setSlice] = useState(2);
  const windowSize = useWindowSize();
  const builders = [
    {
      name: "Avalanche",
      icon: "avaxIcon",
      banner: "avalancheBanner",
    },
    {
      name: "Chainlink",
      icon: "chainlinkIcon",
      banner: "chainlinkBanner",
    },
    {
      name: "Conflux",
      icon: "confluxIcon",
      banner: "confluxBanner",
    },
    {
      name: "BNB Chain",
      icon: "bnbIcon",
      banner: "bnbChainBanner",
    },
    {
      name: "Coingecko",
      icon: "coingeckoIcon",
      banner: "coingeckoBanner",
    },
    {
      name: "Coin98",
      icon: "coin98Icon",
      banner: "coin98Banner",
    },
    {
      name: "Gate.io",
      icon: "gateIcon",
      banner: "gateBanner",
    },
    {
      name: "Mexc Global",
      icon: "mexcIcon",
      banner: "mexcBanner",
    },
    {
      name: "KuCoin",
      icon: "kucoinIcon",
      banner: "kucoinBanner",
    },
    {
      name: "Easy2Stake",
      icon: "easy2stakeIcon",
      banner: "easy2stakeBanner",
    },
  ];

  return (
    <>
      <div
        className="px-3 px-lg-5 d-flex flex-column justify-content-center align-items-center  "
        id="wodbuilders"
      >
        <div className="d-flex  justify-content-center align-items-center mb-4 gap-2">
          <h2 className="font-organetto builders-title explorer-grid-title px-0">
            <mark className="font-organetto explore-tag pe-2">Pioneers</mark>
            shaping the World of Dypians{" "}
          </h2>
        </div>
        <div className="wod-builders-grid">
          {builders
            .slice(0, windowSize.width > 786 ? 8 : slice)
            .map((item, index) => (
              <div
                key={index}
                className="builder-item p-3 d-flex flex-column gap-2"
              >
                <img
                  src={require(`./assets/${item.banner}.png`)}
                  className="w-100"
                  alt=""
                />
                <div className="d-flex align-items-center gap-2">
                  <img src={require(`./assets/${item.icon}.svg`)} alt="" />
                  <span className="builder-title mb-0">{item.name}</span>
                </div>
              </div>
            ))}
        </div>
        {windowSize.width < 786 && (
          <div className="d-flex justify-content-center mt-3">
            <div
              className="linear-border"
              onClick={() => (slice === 2 ? setSlice(8) : setSlice(2))}
            >
              <button className="btn filled-btn px-5">
                {slice === 2 ? "View More" : "View Less"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-100 px-3 px-lg-5 mx-0 build-business-wrapper py-4">
        <div className="d-flex flex-column gap-2">
          <h6 className="builder-title mb-0" style={{ fontWeight: "800" }}>
            Building In World of Dypians
          </h6>
          <div className="row mx-0 w-100 gap-4 gap-lg-0 d-flex flex-column flex-lg-row flex-md-column align-items-center justify-content-between">
          <div className="builder-item p-3 col-lg-7 d-flex flex-column gap-3 gap-lg-0 justify-content-between">
            <div className="builders-first-half"></div>
            <div className="builders-second-half">
              {builders.map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-2">
                  <img src={require(`./assets/${item.icon}.svg`)} alt="" />
                  <span
                    className="builder-title mb-0"
                    style={{ fontWeight: "400" }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row gap-2 col-lg-5">
            <div className="build-business-title-wrapper">
              <h6 className="mb-0 font-organetto">
                Bring your business to World of Dypians
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <a
                href="https://docs.google.com/forms/d/1s565QWMoCvkKwAWzkXzVPdixN_fLFlnEstya_k7caqs/viewform?edit_requested=true"
                target="_blank"
                className="linear-border"
              >
                <button className="btn filled-btn px-5">Apply</button>
              </a>
            </div>
          </div></div>
        </div>
      </div>
    </>
  );
};

export default WodBuilders;