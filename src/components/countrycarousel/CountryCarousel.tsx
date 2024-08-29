import "./CountryCarousel.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ICountry } from "../../interfaces/interfaces";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { CountryContext } from "../../contexts/country/CountryContext";

import noFlag from "/images/noFlag.png";

export default function CountryCarousel() {
  const { t } = useTranslation();

  const { countries, persistBrowsedCountry } = useContext(CountryContext);
  const { theme } = useContext(ThemeContext);
  
  const displayCarousel = (direction: string, countries: ICountry[]) => {
    return (
      <div className="carousel overflow-hidden whitespace-nowrap relative">
        {duplicateCarouselLine(direction, countries)}
      </div>
    );
  };

  const duplicateCarouselLine = (direction: string, countries: ICountry[]) => {
    const region = countries[0].continentAndRegion?.regions?.region;
    return (
      <div id={`scroll-${direction}-${region}`} className={`slider flex my-10`}>
        <style>
          {`
              .carousel:hover #scroll-${direction}-${region}{
                animation-play-state: paused;
              }
              #scroll-${direction}-${region} {
                width: ${288 * 2 * countries.length}px;
                animation: scroll-${direction}-${region} ${countries.length}s infinite linear;
              }
              @keyframes scroll-${direction}-${region}{
                0% { transform: translateX(${direction === "left" ? -1 * 288 * countries.length : 0}px); }
                100% { transform: translateX(${direction === "left" ? 0 : -1 * 288 * countries.length}px);}
              }
              }
            `}
        </style>
        {countries.map((country, index) => (
          <div key={index}>{displayCountryInCarousel(country)}</div>
        ))}
        {countries.map((country, index) => (
          <div key={index}>{displayCountryInCarousel(country)}</div>
        ))}
      </div>
    );
  };

  const displayCountryInCarousel = (country: ICountry) => {
    return (
      <Link to={`/countries/${country.names?.common}`}>
        <div
          className="h-44 w-64 m-10 flex flex-col justify-between items-center"
          onClick={() => {
            persistBrowsedCountry(country);
          }}
        >
          <span className={"" + theme.colors.text}> {country.names?.common} </span>
          <img
            className="h-40 w-60 m-2 border border-slate-800"
            src={country.flagsInfo?.png || noFlag}
            alt={country.flagsInfo?.alt || t('countryInfo.notAvailable')}
          />
        </div>
      </Link>
    );
  };

  const renderCarousels = () => {
    if (!countries || countries.length === 0) {
      return (
        <div className="flex justify-center items-center h-52">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        {displayCarousel("left", countries.filter((country) => country.continentAndRegion?.regions?.region === "Africa"))}
        {displayCarousel("right", countries.filter((country) => country.continentAndRegion?.regions?.region === "Europe"))}
        {displayCarousel("left", countries.filter((country) => country.continentAndRegion?.regions?.region === "Americas"))}
        {displayCarousel("right", countries.filter((country) => country.continentAndRegion?.regions?.region === "Asia"))}
        {displayCarousel("left", countries.filter((country) => country.continentAndRegion?.regions?.region === "Antarctic"))}
        {displayCarousel("right", countries.filter((country) => country.continentAndRegion?.regions?.region === "Oceania"))}
      </div>
    );
  };
  

  return (
    <div className="mx-auto my-8 carousel-container">
      {renderCarousels()}
    </div>
  );
}
