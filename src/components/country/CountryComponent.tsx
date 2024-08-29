import { t } from "i18next";
import { Splitter, SplitterPanel } from "primereact/splitter";

import { useState } from "react";
import osmLogo from "/images/osm.png";
import googleMapLogo from "/images/google_maps.png";

import { ScreenEnum } from "../../enums/screen";
import CountryModalButton from "./CountryModalButton";
import { useScreenLayout } from "../../hooks/windowWidth";
import { ICountryCardProps } from "../../interfaces/interfaces";
import CountryImage from "../countryList/cellTemplates/CountryImage";
import CodesBodyTemplate from "../countryList/cellTemplates/CodesBodyTemplate";
import NamesBodyTemplate from "../countryList/cellTemplates/NamesBodyTemplate";
import CapitalBodyTemplate from "../countryList/cellTemplates/CapitalBodyTemplate";
import CarInfoBodyTemplate from "../countryList/cellTemplates/CarInfoBodyTemplate";
import TimeZonesBodyTemplate from "../countryList/cellTemplates/TimeZonesBodyTemplate";
import LanguagesBodyTemplate from "../countryList/cellTemplates/LanguagesBodyTemplate";
import CurrenciesBodyTemplate from "../countryList/cellTemplates/CurrenciesBodyTemplate";
import PopulationBodyTemplate from "../countryList/cellTemplates/PopulationBodyTemplate";
import StartOfWeekBodyTemplate from "../countryList/cellTemplates/StartOfWeekBodyTemplate";
import CountryUNMemberBodyTemplate from "../countryList/cellTemplates/CountryUNMemberBodyTemplate";
import ContinentRegionBodyTemplate from "../countryList/cellTemplates/ContinentRegionBodyTemplate";
import CountryIndependantBodyTemplate from "../countryList/cellTemplates/CountryIndependantBodyTemplate";

export default function CountryComponent({ country }: ICountryCardProps) {

  const isMobile = [ScreenEnum.S.layout, ScreenEnum.XS.layout].includes(useScreenLayout().layout);
  
  const [modalOpen, setModalOpen] = useState(false);
  
  const displayImgsPanel = () => {

    return (
      <div className={`text-center flex flex-col`}>
        <div className={`flex ${isMobile ? 'flex-row justify-around' : 'flex-col'}`}>
          <div className="mb-10 flex flex-col">
            <span className="mb-4">{t("countryView.ImgPanel.flag")}</span>
            <CountryImage src={country.flagsInfo?.png} alt={country.flagsInfo?.alt} shape="square"/>
          </div>

          <div className="mb-10 flex flex-col">
            <span className="mb-4">{t("countryView.ImgPanel.coat")}</span>
            <CountryImage src={country.coatOfArms?.png} alt={""} shape="square" />
          </div>
        </div>
        <div className="mb-10 flex flex-col items-center p-4">
          <span className="mb-4">{t("countryView.ImgPanel.map")}</span>
          <div className="flex">
            <a className="mx-4 w-32" href={country.mapInfo?.google} target="_blank">
              <img className="" src={googleMapLogo} alt="" />
            </a>
            <a className="mx-4 w-32" href={country.mapInfo?.osm} target="_blank">
              <img className="" src={osmLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="m-10 p-10">
      <Splitter layout={ isMobile ? "vertical" : "horizontal"}>
        <SplitterPanel size={35} minSize={35}>
          <div className="flex flex-col w-full p-10 self-center">
            {displayImgsPanel()}
          </div>
        </SplitterPanel>
        <SplitterPanel size={65} minSize={65}>
          <div className="flex flex-col w-full p-10 self-center">
            <div className="text-center text-3xl hover:cursor-pointer" onClick={()=> setModalOpen(true)}>
              <h2  className='animate-jump text-2xl'> {country.names?.common} </h2>
            </div>
            <CountryModalButton country={country} open={modalOpen} onClose={()=> setModalOpen(false)} />
            <div className="m-6 justify-around self-center">
              <div className="flex justify-center">
                <NamesBodyTemplate country={country} viewType="detail" showDemomym={true} />
                <div className="flex mx-4 gap-x-2">
                  <CountryUNMemberBodyTemplate country={country} />
                  <CountryIndependantBodyTemplate country={country} />
                </div>
              </div>
              <div className="my-12">
                <ContinentRegionBodyTemplate country={country} viewType="detail" />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-4 gap-16 self-center">
              <CapitalBodyTemplate country={country} viewType="detail" />
              <PopulationBodyTemplate country={country} viewType="detail" />
              <LanguagesBodyTemplate country={country} viewType="detail" />
              <CodesBodyTemplate country={country} viewType="detail" />              
              <TimeZonesBodyTemplate country={country} viewType="detail" />
              <StartOfWeekBodyTemplate country={country} viewType="detail" />
              <CurrenciesBodyTemplate country={country} viewType="detail" />
              <CarInfoBodyTemplate country={country} viewType="detail" />
            </div>
          </div>          
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
