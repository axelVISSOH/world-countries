import { ICountryCardProps } from "../../interfaces/interfaces";
import ActionsBodyTemplate from "../cellTemplates/ActionsBodyTemplate";
import CapitalBodyTemplate from "../cellTemplates/CapitalBodyTemplate";
import ContinentRegionBodyTemplate from "../cellTemplates/ContinentRegionBodyTemplate";
import CountryImage from "../cellTemplates/CountryImage";
import CurrenciesBodyTemplate from "../cellTemplates/CurrenciesBodyTemplate";
import LanguagesBodyTemplate from "../cellTemplates/LanguagesBodyTemplate";
import NamesBodyTemplate from "../cellTemplates/NamesBodyTemplate";
import PopulationBodyTemplate from "../cellTemplates/PopulationBodyTemplate";

export const CountryGridItem = ({country}: ICountryCardProps) => {
  return (
    <div className="m-4 flex flex-col rounded-xl border-2"
      key={country.names?.common}>
      <div className="">
        <div className=" p-2 justify-around ">
          <NamesBodyTemplate
            country={country}
            viewType="list"
            showDemomym={true} />
          <CountryImage
            src={country.flagsInfo?.png}
            alt={country.flagsInfo?.alt} />
        </div>
        <div className="p-2 flex justify-around">
          <CapitalBodyTemplate country={country} viewType="list" />
          <PopulationBodyTemplate country={country} viewType="list" />
        </div>
        <div className="p-2 flex justify-around">
          <ContinentRegionBodyTemplate country={country} viewType="list" />
        </div>
        <div className="p-2 flex justify-around">
          <LanguagesBodyTemplate country={country} viewType="list" />
          <CurrenciesBodyTemplate country={country} viewType="list" />
        </div>
        <div className="flex justify-end">
          <ActionsBodyTemplate country={country} viewType="list" />
        </div>
      </div>
    </div>
  );
};
