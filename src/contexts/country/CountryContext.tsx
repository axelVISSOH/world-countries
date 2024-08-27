import React, { useCallback, useEffect, useState } from "react";

import { fetchCountries } from "../../services/countryServices";
import { getItemToJSON, setItem } from "../../storage/localStorage";
import { ICountry, ICountryContextType, IThemeProviderProps} from "../../interfaces/interfaces";

const CountryContext = React.createContext<ICountryContextType>({
  countries: [],
  browsedCountry: null,
  persistBrowsedCountry: () => {},
  isCountryContextLoaded: () => false,
});

const CountryProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [countries, setCountries] = useState<ICountry[]>(() => {
    return getItemToJSON<ICountry[]>('countries') || [];
  });

  const [browsedCountry, setBrowsedCountry] = useState<ICountry | null>(
    getItemToJSON("browsedCountry"),
  );

  const isCountryContextLoaded = useCallback(() => countries.length > 0, [countries]);

  const persistBrowsedCountry = useCallback((country: ICountry) => {
    setBrowsedCountry(country);
    setItem("browsedCountry", country);
  }, []);

  useEffect(() => {
    if (countries.length === 0) {      
      const loadCountries = async () => {
        const data = await fetchCountries();
        setCountries(data);
        setItem('countries', data, true);
      };
      loadCountries();
    }    
  }, [countries.length]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        browsedCountry,
        persistBrowsedCountry,
        isCountryContextLoaded,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };
