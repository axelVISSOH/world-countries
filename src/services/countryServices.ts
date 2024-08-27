import { ICountry } from "../interfaces/interfaces";

export const BASE_API_URL = "https://restcountries.com/v3.1/";
export const ENDPOINTS = {
  ALL: "all",
  NAME: "name/{0}",
};

const createCountryFromDataJSON = (country: any): ICountry => {
  return {
    names: {
      common: country.name.common,
      official: country.name.official,
      nativeNames: Object.entries(country.name.nativeName || {}).map(
        ([key, value]) => ({
          lang: key,
          common: (value as any).common,
          official: (value as any).official,
        }),
      ),
    },
    codes: {
      cca2: country.cca2,
      ccn3: country.ccn3,
      cca3: country.cca3,
      cioc: country.cioc,
      indic: {
        root: country.idd.root,
        suffixes: country.idd.suffixes
      },
      fifa: country.fifa,
      gini: country.gini

    },
    borders: country.borders,
    independent: country.independent,
    landlocked: country.landlocked,
    unMember: country.unMember,
    currencies: Object.entries(country.currencies || {}).map(
      ([key, value]) => ({
        key,
        name: (value as any).name,
        symbol: (value as any).symbol,
      }),
    ),
    capital: {
      name: country.capital?.[0] || "",
      pos: {
        lat: country.latlng[0],
        long: country.latlng[1],
      },
    },
    continentAndRegion: {
      continent: country.continents?.[0] || "",
      regions: {
        region: country.region,
        subregion: country.subregion,
      },
    },
    languages: Object.entries(country.languages || {}).map(([key, value]) => ({
      key,
      name: value as string,
    })),
    demonyms: Object.entries(country.demonyms || {}).map(([key, value]) => ({
      lang: key,
      f: (value as any).f,
      m: (value as any).m,
    })),
    mapInfo: {
      pos: {
        lat: country.latlng[0],
        long: country.latlng[1],
      },
      google: country.maps.googleMaps,
      osm: country.maps.openStreetMaps,
    },
    flagsInfo: {
      flag: country.flag,
      png: country.flags.png,
      svg: country.flags.svg,
      alt: country.flags.alt,
    },
    population: country.population,
    carInfo: {
      signs: country.car?.signs || [],
      side: country.car?.side || "",
    },
    timezones: country.timezones,
    coatOfArms: {
      png: country.coatOfArms?.png || "",
      svg: country.coatOfArms?.svg || "",
    },
    startOfWeek: country.startOfWeek,
    fifa: country.fifa,
    communityInfos: [],
  };
};

export const fetchCountries = async (): Promise<ICountry[]> => {
  const URL = BASE_API_URL + ENDPOINTS.ALL;
  try {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    return data.map(createCountryFromDataJSON);
  } catch (error) {
    console.error(`Failed to fetch countries from ${URL} due to: `, error);
    return [];
  }
};

export const getCountryByName = async (countryName: string, ): Promise<ICountry | null> => {
  const URL = BASE_API_URL + formatString(ENDPOINTS.NAME, countryName);
  try {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    return data.length > 0 ? createCountryFromDataJSON(data[0]) : null;
  } catch (error) {
    console.error(`Failed to fetch country from due to: ${countryName}`, error);
    return null;
  }
};

function formatString(template: string, ...values: string[]) {
  return template.replace(/{(\d+)}/g, (_, index) => values[index] || "");
}