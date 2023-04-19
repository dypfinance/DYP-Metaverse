import React from "react";
import timepieceBanner from "./assets/timePieceBanner.webp";

const TimepieceHero = () => {
  return (
    <div className="full-screen-main-hero2 d-flex align-items-center">
        <div className="container-fluid px-3 px-lg-5 position-relative">
          <div className="row justify-content-center pb-5">
            <div className="col-12 col-lg-8  d-flex flex-column align-items-center">
              <h6 className="timepiece-title font-organetto d-flex flex-column flex-lg-row gap-2">
                Caws Timepiece
                <span
                  className="timepiece-title"
                  style={{ color: "rgb(140, 86, 255)" }}
                >
                  Collection
                </span>
              </h6>
             
            </div>
          </div>
        </div>
    </div>
  );
};

export default TimepieceHero;
