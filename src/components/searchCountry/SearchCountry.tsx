import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";

import { ICountry } from "../../interfaces/interfaces";
import { SearchField } from "../countryList/sharedList";
import { CountryContext } from "../../contexts/country/CountryContext";

import noFlag from "/images/noFlag.png";

export default function SearchCountry() {
  const { t } = useTranslation();
  const { countries, persistBrowsedCountry } = useContext(CountryContext);

  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>();
  const [searchedCountry, setSearchedCountry] = useState<ICountry | null>(null);
  const navigate = useNavigate();

  const searchCountry = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let _filteredCountries: ICountry[]; // Assuming `Country` is the type of your country object
  
      const query = event.query.trim().toLowerCase();
  
      if (!query.length) {
        _filteredCountries = [...countries]; // If the query is empty, return all countries
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.names?.common?.toLowerCase().startsWith(query);
        });
      }
  
      setFilteredCountries(_filteredCountries);
    }, 15);
  };

  const onChangeAutoComplete = (event: AutoCompleteChangeEvent) => {
    setSearchedCountry(event.value);

    if (event.value && event.value.names?.common) {
        onClickItemTemplate(event.value); // Trigger navigation when an item is selected
    }
  };

  const onClickItemTemplate = (country: ICountry) => {
    persistBrowsedCountry(country);
    navigate(`/countries/${country.names?.common}`);
  };

  const itemTemplate = (country: ICountry) => {
    return (
      <div className="flex align-items-center" 
           onClick={() => { onClickItemTemplate(country); }}>
        <img alt={country.names?.common}
             src={country.flagsInfo?.png || noFlag}
             className={`flag mr-2`}
             style={{ width: "30px" }}
        />
        <div>{country.names?.common}</div>
      </div>
    );
  };
  
  const searchInput = useCallback(() => {
    return (
      <AutoComplete field="names.common"
                    value={searchedCountry}
                    suggestions={filteredCountries}
                    completeMethod={searchCountry}
                    itemTemplate={itemTemplate}
                    onChange={(e) => onChangeAutoComplete(e)}
                    inputClassName="w-11/12 rounded-md h-10"
                    className="w-full"
                    placeholder={t("navbar.searchCountry.input.placeholder")} />
    );
  }, [searchedCountry, filteredCountries, searchCountry]);


  return (
    <div className="w-full">
      <SearchField inputField={searchInput()}/>
    </div>
  );
}
