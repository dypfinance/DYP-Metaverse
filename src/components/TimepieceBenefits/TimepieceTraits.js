import React from "react";
import "./_timepiecebenefits.scss";
import timepieceBanner2 from "../../screens/Timepiece/assets/timepieceBanner2.png";
import whitearrow from './assets/whitearrow.svg'
import raritytools from './assets/raritytools.svg'

const TimePieceTraits = () => {
  return (
    <div className="row px-3 py-3 p-lg-5 mt-5 gap-4 gap-lg-0">
      <div className="col-12 col-lg-4 d-flex justify-content-center">
        <img src={timepieceBanner2} alt="caws banner" className="caws-banner" />
      </div>
      <div className="col-12 col-lg-8">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-0 gap-lg-2">
            <h2 className="font-organetto caws-hero-title">All The</h2>
            <h2
              className="font-organetto caws-hero-title"
              style={{ color: "#8C56FF" }}
            >
              Traits
            </h2>
          </div>
          <p className="caws-hero-content">
            Discover all the little details that make each cat as smug, cute and
            adoptable as the other. You can easily discover their story and
            personality by checking out their outfit, their expression - and of
            course, what kind of watch they're into.
          </p>
          <p className="caws-hero-content">
            We love all of our cats, but some of their watches make them stand
            out a bit more than others. We'll let you be the judge of that.
          </p>
          <div className="d-flex justify-content-center justify-content-xxl-end justify-content-lg-end justify-content-md-end">
            <a
              href="https://rarity.tools"
              target="_blank"
              className="timepiece-border"
              style={{textDecoration: 'none'}}
              rel='noreferrer'
            >
              <button className="btn timepiece-btn px-5 d-flex align-items-center">
                <img src={raritytools} alt='' className="mx-2"/>
                Rarity Tools
              <img src={whitearrow} alt=''/>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePieceTraits;
