import React from "react";
import "./_footer.scss";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

const Footer = () => {
  const year = new Date().getFullYear();

  const windowSize = useWindowSize();

  const socials = [
    {
      icon: "twitter",
      link: "https://twitter.com/worldofdypians",
    },
    {
      icon: "telegram",
      link: "https://t.me/worldofdypians",
    },
    {
      icon: "discord",
      link: "https://discord.gg/dypcaws",
    },
    {
      icon: "instagram",
      link: "https://www.instagram.com/worldofdypians",
    },
    {
      icon: "facebook",
      link: "https://www.facebook.com/worldofdypians",
    },
    {
      icon: "reddit",
      link: "https://www.reddit.com/r/WorldofDypians/",
    },
    {
      icon: "tiktok",
      link: "https://www.tiktok.com/@worldofdypians",
    },
    {
      icon: "youtube",
      link: "https://www.youtube.com/channel/UCnRXdsNpnb2kMiNb7Cu4bDA",
    },
  ];

  return (
    <div className="footer-container flex-column px-3 px-lg-5">
      <div className="container-fluid d-flex w-100 pb-4 flex-column flex-xxl-row flex-lg-row flex-xl-row  gap-3 justify-content-between align-items-baseline">
        <div className="d-flex pt-5  w-50 footer-wrapper flex-row align-items-start align-items-lg-center gap-4 gap-lg-0 justify-content-between">
          <a
            href="https://www.dypius.com/"
            target="_blank"
            className="footer-link font-poppins"
            rel="noreferrer"
          >
            Dypius
          </a>
          {/* <span className="footer-link font-poppins">Whitepaper</span> */}
          <NavLink to="/terms-conditions" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Terms & Conditions</span>
          </NavLink>
          <NavLink to="/privacy-policy" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Privacy Policy</span>
          </NavLink>
          <a
            href="mailto:helpcenter@dypius.com"
            className="footer-link font-poppins"
          >
            Contact Us
          </a>
          <NavLink to="/join-beta" style={{ textDecoration: "none" }}>
            <span className="footer-link font-poppins">Join Beta</span>
          </NavLink>
        </div>
        {windowSize.width > 786 ? (
          <div className="footer-socials">
            {socials.map((item, index) => (
              <a href={item.link} key={index} target="_blank" rel="noreferrer">
                <img
                  src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                  alt={item.icon}
                />
              </a>
            ))}
          </div>
        ) : (
          <>
            <div className="mobile-socials d-flex align-items-center justify-content-between w-100">
              {socials.slice(0, 4).map((item, index) => (
                <a
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                    alt={item.icon}
                  />
                </a>
              ))}
            </div>
            <div className="mobile-socials d-flex align-items-center justify-content-between w-100">
              {socials.slice(4, 8).map((item, index) => (
                <a
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={require(`../../assets/footerIcons/${item.icon}.svg`)}
                    alt={item.icon}
                  />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
      <hr className="footer-divider mt-0 mb-4" />
      <div className="d-flex w-100 align-items-center justify-content-center mb-4 flex-column">
        <span className="footer-link font-poppins">
          Copyright ?? World of Dypians {year}. All rights reserved.
        </span>
        <span className="footer-link font-poppins">Powered by Dypius.</span>
      </div>
    </div>
  );
};

export default Footer;
