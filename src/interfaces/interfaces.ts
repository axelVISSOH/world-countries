import { ReactNode } from "react";

export interface ICountry {
  // [key: string]: any;
    names?: {
        common?: string;
        official?: string;
        nativeNames?: CountryNativeName[];
    };
    codes?: ICodes;
    borders?: string[];
    independent?: boolean;
    landlocked?: boolean;
    unMember?: boolean;
    currencies?: Currencies[];
    capital?: {
        name?: string;
        pos?: LatLong;
    };
    continentAndRegion?: ContinentAndRegion;
    languages?: Languages[];
    demonyms?: Demonym[];
    mapInfo?: MapsInfo;
    flagsInfo?: FlagsInfo;
    population?: number;
    carInfo?: {
        signs?: string[];
        side?: string;
    };
    timezones?: string[] | string | null;
    coatOfArms?: {
        png?: string;
        svg?: string;
    };
    startOfWeek?: string;
    fifa?: string;
    communityInfos?: any[];
}


export interface CountryNativeName {
  lang: string;
  common: string;
  official: string;
}

export interface ContinentAndRegion {
  continent?: string;
  regions?: {
      region?: string;
      subregion?: string;
  };
};

export interface Currencies {
  key: string;
  name: string;
  symbol: string;
}

export interface Languages {
  key: string;
  name?: string;
}

interface LatLong {
  lat?: number;
  long?: number;
}

export interface Demonym {
  lang: string;
  f: string;
  m: string;
}

export interface MapsInfo {
  pos?: LatLong;
  google?: string;
  osm?: string;
}

interface FlagsInfo {
  flag?: string;
  png?: string;
  svg?: string;
  alt?: string;
}

export interface ICountryContextType {
  countries: ICountry[];
  browsedCountry: ICountry | null;
  persistBrowsedCountry: (country: ICountry) => void;
  isCountryContextLoaded: () => boolean;
}

export interface IBreadCrumbItems {
  icon: string;
}


export interface IFieldBodyTemplate {
  country: ICountry;
  viewType?: "table" | "list" | "detail";
}

export interface ILang {
  name: string;
  code: string;
  icon: string;
}

export interface ICodes {
  cca2?: string;
  ccn3?: string;
  cca3?: string;
  cioc?: string;
  indic?: {
    root?: string;
    suffixes?: string[];
  };
  fifa?: string;
  gini?: { [key: string]: number };
}


export interface IPageComponentProps {
  children: React.ReactNode;
}

export interface ITheme {
  id: string;
  name: string;
  href: string,
  colors: {
    body: string;
    text: string;
    background: string;
    navbarFooterBackground: string;
    iconBase: string;
    searchCountry: {
      background: string;
    };
    button: {
      text: string;
      background: string;
    };
  };
  font: string;
}

export interface IThemeContextType {
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  toggleTheme: () => void;
}

export interface IThemeProviderProps {
  children: ReactNode;
}

export interface IRenderHeaderProps {
  clearFilter: ()=> void,
  headerFilters: any
  globalFilterValue: string | null,
  onGlobalFilterChange: (e: any)=> void,
}

export interface ISearchFieldProps {
  inputField: any
}

export interface ICountryModalButtonProps {
  country: ICountry;
  open: boolean;
  onClose: () => void;
};

export interface ICountryCardProps {
  country: ICountry;
};

export interface ICountryImageProps {
  src?: string;
  alt?: string;
  shape?: "circle" | "square";
}

export type filtertype = "continent" | "region" | "subregion" | undefined | string;

export interface CountryProps {
  country: {
      names: {
          common: string;
          official: string;
          nativeNames: Array<{ lang: string, common: string, official: string }>;
      };
      codes: {
          cca2: string;
          ccn3: string;
          cca3: string;
          cioc: string;
          indic: { root: string, suffixes: string[] };
          fifa: string;
          gini: number;
      };
      borders: string[];
      independent: boolean;
      landlocked: boolean;
      unMember: boolean;
      currencies: Array<{ key: string, name: string, symbol: string }>;
      capital: {
          name: string;
          pos: { lat: number, long: number };
      };
      continentAndRegion: {
          continent: string;
          regions: { region: string, subregion: string };
      };
      languages: Array<{ key: string, name: string }>;
      demonyms: Array<{ lang: string, f: string, m: string }>;
      mapInfo: { pos: { lat: number, long: number }, google: string, osm: string };
      flagsInfo: { flag: string, png: string, svg: string, alt: string };
      population: number;
      carInfo: { signs: string[], side: string };
      timezones: string;
      coatOfArms: { png: string, svg: string };
      startOfWeek: string;
      fifa: string;
      communityInfos: any[];
  };
}