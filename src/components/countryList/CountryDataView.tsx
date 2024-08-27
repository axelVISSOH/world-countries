import { useContext, useMemo, useRef, useState } from "react";

import { DataView } from "primereact/dataview";

import { CountryContext } from "../../contexts/country/CountryContext";
import { useTranslation } from "react-i18next";
import { paginatorOptions } from "./ListPaginator";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { filtertype, ICountry } from "../../interfaces/interfaces";
import { RenderHeader } from "./sharedList";
import { useScreenLayout } from "../../hooks/windowWidth";
import { CountryGridItem } from "../country/CountryGridItem";

export interface IFiltersRegister{
  type: 'golbal' | 'continent',
  expression: any,
  result: ICountry[]
}

const filterCountriesByField = (
  countries: ICountry[],
  _field: string,
  filter: string,
) => {
  return countries.filter((country) =>
    (country.names?.common as string)
      .toLowerCase()
      .startsWith(filter.toLowerCase()),
  );
};

export default function CountryDataView() {

  const { t } = useTranslation();  
  const { countries } = useContext(CountryContext);
  const contientAndRegionOverlayPanelRef = useRef<OverlayPanel>(null);

  const gridCount = useScreenLayout().gridCount;
  const paginator = useMemo(() => paginatorOptions(gridCount), [gridCount]);
  
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [appliedFiltersCountries, setAppliedFiltersCountries] = useState([filteredCountries]);

  const [globalFilterValue, setGlobalFilterValue] = useState<string | null>(null);
  const [selectedRegionsFilter, setSelectedRegionsFilter] = useState<string[]>([]);
  const [selectedContinentsFilter, setSelectedContinentsFilter] = useState<string[]>([]);
  const [selectedSubRegionsFilter, setSelectedSubRegionsFilter] = useState<string[]>([]);

  // useEffect(()=>{
  //   setFilteredCountries(countries);
  // }, [countries]);

  const initFilters = () => {
    setGlobalFilterValue(null);
    setFilteredCountries(countries);
    initContinentAndRegionFilter();
  };

  const initContinentAndRegionFilter = () => {
    setSelectedContinentsFilter([]);
    setSelectedRegionsFilter([]);
    setSelectedSubRegionsFilter([]);
    setFilteredCountries(countries);
  };

  const clearFilter = () => {
    initFilters();
    initContinentAndRegionFilter();
  };

  const applyFilters = (filterValues: {
    continents: string[];
    regions: string[];
    subregions: string[];
  }) => {
    let _filteredCountries = countries.slice();

    if (filterValues.continents.length > 0)
      _filteredCountries = _filteredCountries.filter((country) =>
        country.continentAndRegion?.continent && filterValues.continents.includes(
          country.continentAndRegion.continent,
        ),
      );

    if (filterValues.regions.length > 0)
      _filteredCountries = _filteredCountries.filter((country) =>
        country.continentAndRegion?.regions?.region && filterValues.regions.includes(
          country.continentAndRegion?.regions?.region,
        ),
      );

    if (filterValues.subregions.length > 0)
      _filteredCountries = _filteredCountries.filter((country) =>
        country.continentAndRegion?.regions?.subregion && filterValues.subregions.includes(
          country.continentAndRegion?.regions?.subregion,
        ),
      );

    setFilteredCountries(_filteredCountries);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValueToApplyGlobally = e.target.value;

    console.log(filterValueToApplyGlobally)
    
    let currentFilteredCoutries = appliedFiltersCountries[appliedFiltersCountries.length - 1].slice();    
    
    let _filteredCoutries = filterCountriesByField(
      currentFilteredCoutries,
      "names.common",
      filterValueToApplyGlobally,
    );

    setFilteredCountries(_filteredCoutries);
    setAppliedFiltersCountries([...appliedFiltersCountries, _filteredCoutries]);
    setGlobalFilterValue(filterValueToApplyGlobally);
  };

  const continentRegionFilterTemplate = () => {
    let _countries = filteredCountries.slice();
    // let _countries = countries.slice();
    const continents = _countries
      .map((c) => c.continentAndRegion?.continent)
      .filter((value, index, self) => self.indexOf(value) === index);

    const regions = _countries
      .map((c) => c.continentAndRegion?.regions?.region)
      .filter((value, index, self) => self.indexOf(value) === index);

    const subregions = _countries
      .map((c) => c.continentAndRegion?.regions?.subregion)
      .filter((value, index, self) => self.indexOf(value) === index && value);

    const optionTemplate = (
      filterType: filtertype,
      value: filtertype,
      index: number,
      setSelectedFunction: React.Dispatch<React.SetStateAction<string[]>>,
      selectedFilterOptions: string[],
    ) => {
      const key = filterType + "_" + index;
      return (
        <div key={key} className="flex align-items-center">
          <Checkbox
            inputId={key}
            name={filterType + "_" + value}
            value={value}
            onChange={(e) =>
              onFilterOptionChange(filterType, setSelectedFunction, e)
            }
            checked={
              selectedFilterOptions
                ? selectedFilterOptions.includes(value ||'') //
                : false
            }
          />
          <label htmlFor={key} className="ml-2">
            {value}
          </label>
        </div>
      );
    };

    const onFilterOptionChange = (
      filterType: filtertype,
      setSelectedFunction: React.Dispatch<React.SetStateAction<string[]>>,
      event: CheckboxChangeEvent,
    ) => {
      setSelectedFunction((prevSelectedOptions) => {
        let _selectedFilterOptions = [...prevSelectedOptions];

        if (event.checked) _selectedFilterOptions.push(event.value);
        else
          _selectedFilterOptions = _selectedFilterOptions.filter(
            (option) => option !== event.value,
          );

        let filterValues: {
          continents: string[];
          regions: string[];
          subregions: string[];
        } = { continents: [], regions: [], subregions: [] };

        switch (filterType) {
          case "continent":
            filterValues = {
              continents: _selectedFilterOptions,
              regions: selectedRegionsFilter,
              subregions: selectedSubRegionsFilter,
            };
            break;
          case "region":
            filterValues = {
              continents: selectedContinentsFilter,
              regions: _selectedFilterOptions,
              subregions: selectedSubRegionsFilter,
            };
            break;
          case "subregion":
            filterValues = {
              continents: selectedContinentsFilter,
              regions: selectedRegionsFilter,
              subregions: _selectedFilterOptions,
            };
            break;
          default:
            break;
        }

        applyFilters(filterValues);
        return _selectedFilterOptions;
      });
    };


    return (
      <>
        <Button
          type="button"
          label={t("tableView.filter.continent.placeholder")}
          onClick={(e) => contientAndRegionOverlayPanelRef.current?.toggle(e)}/>
        <OverlayPanel ref={contientAndRegionOverlayPanelRef}>
          <div className="">
            <div className="filters flex justify-around">
              <div className="justify-items-center mr-12">
                <h2>CONTINENT</h2>
                {continents.map((continent, index) => {
                  return optionTemplate(
                    "continent",
                    continent,
                    index,
                    setSelectedContinentsFilter,
                    selectedContinentsFilter,
                  );
                })}
              </div>

              <div className="justify-items-center  mr-12">
                <h2>REGIONS</h2>
                {regions.map((region, index) => {
                  return optionTemplate(
                    "region",
                    region,
                    index,
                    setSelectedRegionsFilter,
                    selectedRegionsFilter,
                  );
                })}
              </div>

              <div className="justify-items-center  mr-12">
                <h2>SUB-REGIONS</h2>
                <div className="grid grid-rows-6 grid-flow-col gap-4">
                  {subregions.map((subregion, index) => {
                    return optionTemplate(
                      "subregion",
                      subregion,
                      index,
                      setSelectedSubRegionsFilter,
                      selectedSubRegionsFilter,
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="footer flex justify-between">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                outlined
                onClick={initContinentAndRegionFilter}
              />
              <Button
                type="button"
                icon="pi pi-filter"
                onClick={(e) => {
                  contientAndRegionOverlayPanelRef.current?.toggle(e);
                }}
              />
            </div>
          </div>
        </OverlayPanel>
      </>
    );
  }; 
  
  const renderDatalistView = () => {
    const header = RenderHeader({clearFilter, headerFilters: continentRegionFilterTemplate(), globalFilterValue, onGlobalFilterChange});
    
    const itemTemplate = (country: ICountry, _layout: "grid" | "list") => {
      if (!country) { return; }
      return <CountryGridItem country={country}/>;
    };

    if (!filteredCountries || filteredCountries.length === 0) {
      return (
        <div className="flex justify-center items-center h-52">
          <p>Loading...</p>
        </div>
      );
    }    

    return (
      <div className="p-10 rounded-lg">
        <DataView className=""
                  key={gridCount}
                  value={filteredCountries}
                  itemTemplate={itemTemplate}
                  layout="grid"
                  header={header}
                  paginator={paginator.paginator}
                  rows={paginator.rows}
                  rowsPerPageOptions={paginator.rowsPerPageOptions}
                  paginatorTemplate={paginator.paginatorTemplate}
                  currentPageReportTemplate={paginator.currentPageReportTemplate}
                  paginatorLeft={paginator.paginatorLeft()}
                  paginatorRight={paginator.paginatorRight()}/>
      </div>
    );
  };
  
  return (
    <>
      {renderDatalistView()}
    </>
  );

}


