import { useContext, useMemo, useRef, useState } from "react";

import { DataView } from "primereact/dataview";

import { CountryContext } from "../../contexts/country/CountryContext";
import { useTranslation } from "react-i18next";
import { paginatorOptions } from "./ListPaginator";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { filtertype, ICountry } from "../../interfaces/interfaces";
import { ButtonOverlayPanel, RenderHeader } from "./sharedList";
import { useScreenLayout } from "../../hooks/windowWidth";
import { CountryGridItem } from "../country/CountryGridItem";
import { OverlayPanel } from "primereact/overlaypanel";

export interface IFiltersRegister{
  type: 'golbal' | 'continent',
  expression: any,
  result: ICountry[]
}

const filterCountriesByField = (
  countries: ICountry[],
  filter: string,
) => {

  let letFilteredCountries = countries.slice().filter((country) => {
    const nameMatch = (country.names?.common as string)
                        .toLowerCase()
                        .startsWith(filter.toLowerCase());

    if (nameMatch) { return true; }

    const codeMatch = (country.codes?.cca3 as string)
                        .toLowerCase()
                        .startsWith(filter.toLowerCase());

    return codeMatch;
  });
  
  return letFilteredCountries.length !== 0 ? letFilteredCountries : countries.slice();
};

export default function CountryDataView() {

  const { t } = useTranslation();  
  const { countries } = useContext(CountryContext);
  const overlayPanelRef = useRef<OverlayPanel>(null);

  const gridCount = useScreenLayout().gridCount;
  const paginator = useMemo(() => paginatorOptions(gridCount), [gridCount]);
  
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [globalFilterValue, setGlobalFilterValue] = useState<string | null>(null);
  const [selectedRegionsFilter, setSelectedRegionsFilter] = useState<string[]>([]);
  const [selectedContinentsFilter, setSelectedContinentsFilter] = useState<string[]>([]);
  const [selectedSubRegionsFilter, setSelectedSubRegionsFilter] = useState<string[]>([]);

  const [sortNameOrder, setSortNameOrder] = useState(true);
  const [sortPopulationOrder, setSortPopulationOrder] = useState(true);

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
    initContinentAndRegionFilter();
    const filterValueToApplyGlobally = e.target.value;
   
    let currentFilteredCoutries = countries.slice();    
    
    let _filteredCoutries = filterCountriesByField(
      currentFilteredCoutries,
      filterValueToApplyGlobally,
    );

    setFilteredCountries(_filteredCoutries);
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
        <ButtonOverlayPanel
          btnOptions={{'label':t("tableView.filter.continent.placeholder").replace(':', '')}}
          overlayContent=
          {
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
                      selectedContinentsFilter
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
                      selectedRegionsFilter
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
                        selectedSubRegionsFilter
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
                  onClick={() => { initContinentAndRegionFilter() } } />
                <Button
                  type="button"
                  icon="pi pi-filter"
                  onClick={(e) => { overlayPanelRef.current?.toggle(e); } } />
              </div>
            </div>
          }
          overlayRef={overlayPanelRef}
        />
      </>
    );
  }; 
  
  const headerFilters = () =>{

    const sortName = () => {
      const sortedCountries = [...filteredCountries].sort((c1, c2) => {
        const nameA = c1.names?.common ?? "";
        const nameB = c2.names?.common ?? "";
    
        if (sortNameOrder) { return nameA.localeCompare(nameB); }
        else { return nameB.localeCompare(nameA); }
      });

      setFilteredCountries(sortedCountries);
      setSortNameOrder(!sortNameOrder);
    }

    const sortPopulation = () => {
      const sortedCountries = [...filteredCountries].sort((c1, c2) => {
        const popA = c1.population ?? Number.MAX_VALUE;
        const popB = c2.population ?? Number.MAX_VALUE;

        if (sortPopulationOrder) { return popA - popB; } 
        else { return popB - popA; }
      });

      setFilteredCountries(sortedCountries);
      setSortPopulationOrder(!sortPopulationOrder);
    }

    return(
      <div className="flex justify-center">
          { continentRegionFilterTemplate() }
            <div className="sort flex justify-center">
              <Button className="ml-10"
                type="button" 
                icon={sortNameOrder?'pi pi-sort-alpha-up':'pi pi-sort-alpha-down'}
                rounded 
                onClick={sortName}
                tooltipOptions={{position:"bottom"}}
                tooltip={t('countryView.sort.name')}
              />
              <Button className="mx-4"
                type="button" 
                icon={sortPopulationOrder ? 'pi pi-sort-numeric-up':'pi pi-sort-numeric-down'}
                rounded 
                onClick={sortPopulation}
                tooltip={t('countryView.sort.population')}
              />
            </div>
            
      </div>
    )
  }

  const renderDatalistView = () => {
    const header = RenderHeader({clearFilter, headerFilters: headerFilters(), globalFilterValue, onGlobalFilterChange});
    
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
        <DataView 
          className=""
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
        />
      </div>
    );
  };
  
  return (
    <>
      {renderDatalistView()}
    </>
  );

}


