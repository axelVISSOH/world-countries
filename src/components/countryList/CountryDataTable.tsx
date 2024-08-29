import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";

import { FilterMatchMode, FilterOperator, FilterService } from "primereact/api";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { CountryContext } from "../../contexts/country/CountryContext";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import CountryImage from "./cellTemplates/CountryImage";

import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { currencies } from "../../services/currencyService";

import ActionsBodyTemplate from "./cellTemplates/ActionsBodyTemplate";
import CapitalBodyTemplate from "./cellTemplates/CapitalBodyTemplate";
import ContinentRegionBodyTemplate from "./cellTemplates/ContinentRegionBodyTemplate";
import CurrenciesBodyTemplate from "./cellTemplates/CurrenciesBodyTemplate";
import LanguagesBodyTemplate from "./cellTemplates/LanguagesBodyTemplate";
import NamesBodyTemplate from "./cellTemplates/NamesBodyTemplate";
import PopulationBodyTemplate from "./cellTemplates/PopulationBodyTemplate";

import { ScreenEnum } from "../../enums/screen";
import { useScreenLayout } from "../../hooks/windowWidth";
import { Currencies, filtertype, Languages } from "../../interfaces/interfaces";
import { paginatorOptions } from "./ListPaginator";
import { RenderHeader } from "./sharedList";




FilterService.register(
  "custom_currencies",
  (countryCurrencies: Currencies[], selectedCurrencies: Currencies[]) => {
    if (!selectedCurrencies || selectedCurrencies.length === 0) return true;

    return selectedCurrencies.some((currency) =>
      countryCurrencies.some((c) => c.key === currency.key),
    );
  },
);

FilterService.register(
  "custom_languages",
  (countryLanguages: Languages[], selectedLanguages: Languages[]) => {
    if (!countryLanguages || selectedLanguages.length === 0) return true;

    return selectedLanguages.some((language) =>
      countryLanguages.some((l) => l.key === language.key),
    );
  },
);

FilterService.register(
  "custom_continentAndRegion",
  (
    value: {
      continent: string;
      regions: { region: string; subregion: string };
    },
    filter: { continents: string[]; regions: string[]; subregions: string[] },
  ) => {
    if (!value) return false;
    if (
      !filter ||
      (!filter.continents.length &&
        !filter.regions.length &&
        !filter.subregions.length)
    )
      return true;

    const continentMatch = filter.continents.length
      ? filter.continents.includes(value.continent)
      : true;
    const regionMatch = filter.regions.length
      ? filter.regions.includes(value.regions.region)
      : true;
    const subregionMatch = filter.subregions.length
      ? filter.subregions.includes(value.regions.subregion)
      : true;

    return continentMatch && regionMatch && subregionMatch;
  },
);

FilterService.register(
  "custom_population",
  (value: number, filter: { from: number; to: number }) => {
    if (!value) return false;
    if (!filter) return true;
    if (!filter.to) return filter.from <= value;

    return filter.from <= value && value <= filter.to;
  },
);

export default function CountryDataTable() {

  
  const { t } = useTranslation();
  //@ts-ignore
  const { theme } = useContext(ThemeContext);
  
  //@ts-ignore  
  const { countries, persistBrowsedCountry } = useContext(CountryContext);

  const languages = Array.from(
    new Set(countries.flatMap((country) => country.languages).map((lang) => lang?.key)),
  ).map((key) =>
    countries
      .flatMap((country) => country.languages)
      .find((lang) => lang?.key === key),
  );

  //@ts-ignore
  const [selectedLanguagesFilter, setSelectedLanguagesFilter] = useState<[] | null>(null);
  //@ts-ignore
  const [selectedCurrenciesFilter, setSelectedCurrenciesFilter] = useState<[] | null>(null);

  const [selectedContinentsFilter, setSelectedContinentsFilter] = useState<string[]>([]);
  const [selectedRegionsFilter, setSelectedRegionsFilter] = useState<string[]>([]);
  const [selectedSubRegionsFilter, setSelectedSubRegionsFilter] = useState<string[]>([]);
  const [continentAndRegionSortField, setcontinentAndRegionSortField] = useState<string>("");

  const [selectedPopulationRangeFilter, setSelectedPopulationRangeFilter] =
    useState<{ range: string; from: number; to: number } | null>(null);

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "names.common": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "capital.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    continentAndRegion: { value: null, matchMode: FilterMatchMode.CUSTOM },
    languages: { value: null, matchMode: FilterMatchMode.CUSTOM },
    currencies: { value: null, matchMode: FilterMatchMode.CUSTOM },
    population: { value: null, matchMode: FilterMatchMode.CUSTOM },
  };

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string | null>(null);

  useEffect(() => {
  }, [theme]);

  useEffect(() => {
    clearFilter();
  }, []);

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue(null);
  };

  const initContinentAndRegionFilter = () => {
    setSelectedContinentsFilter([]);
    setSelectedRegionsFilter([]);
    setSelectedSubRegionsFilter([]);
    setcontinentAndRegionSortField("continentAndRegion.continent");
  };

  const clearFilter = () => {
    initFilters();
    initContinentAndRegionFilter();
    setSelectedPopulationRangeFilter(null);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValueToApplyGlobally = e.target.value;
    let _filters = { ...filters };

    //@ts-ignore
    _filters["global"].value = filterValueToApplyGlobally;
    setFilters(_filters);
    setGlobalFilterValue(filterValueToApplyGlobally);
  };

  const currencyKeyRowTemplate = (currency: Currencies) => {
    return (
      <React.Fragment key={currency.key?.toUpperCase()}>
        <strong>{currency.key?.toUpperCase()} </strong>
        <strong>{currency.symbol?.toUpperCase()} </strong>
      </React.Fragment>
    );
  };

  const languagesRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    const onLanguagesFilterChange = (
      e: MultiSelectChangeEvent,
      options: ColumnFilterElementTemplateOptions,
    ) => {
      const _filters = { ...filters };

      if (_filters["languages"] && "value" in _filters["languages"]) {
        _filters["languages"].value = e.value;
      }

      setFilters(_filters);
      setSelectedLanguagesFilter(e.value);
      options.filterApplyCallback(e.value);
    };

    return (
      <MultiSelect
        value={options.value}
        options={languages}
        itemTemplate={currencyKeyRowTemplate}
        onChange={(e) => onLanguagesFilterChange(e, options)}
        optionLabel="key"
        placeholder={t("tableView.filter.languages.placeholder")}
        className="p-column-filter"
        display="chip"
        style={{ minWidth: "14rem" }}
        filter
      />
    );
  };

  const currenciesRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    const onCurrencyFilterChange = (
      e: MultiSelectChangeEvent,
      options: ColumnFilterElementTemplateOptions,
    ) => {
      const _filters = { ...filters };

      if (_filters["currencies"] && "value" in _filters["currencies"]) {
        _filters["currencies"].value = e.value;
      }

      setFilters(_filters);
      setSelectedCurrenciesFilter(e.value);
      options.filterApplyCallback(e.value);
    };

    return (
      <MultiSelect
        value={options.value}
        options={currencies}
        itemTemplate={currencyKeyRowTemplate}
        onChange={(e) => onCurrencyFilterChange(e, options)}
        optionLabel="key"
        placeholder={t("tableView.filter.currencies.placeholder")}
        className="p-column-filter"
        display="chip"
        style={{ minWidth: "14rem" }}
        filter
      />
    );
  };

  const continentRegionFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    const continents = countries
      .map((c) => c.continentAndRegion?.continent)
      .filter((value, index, self) => self.indexOf(value) === index);

    const regions = countries
      .map((c) => c.continentAndRegion?.regions?.region)
      .filter((value, index, self) => self.indexOf(value) === index);

    const subregions = countries
      .map((c) => c.continentAndRegion?.regions?.subregion)
      .filter((value, index, self) => self.indexOf(value) === index && value);

    const optionTemplate = (
      filterType: filtertype,
      value: filtertype,
      index: number,
      setSelectedFunction: React.Dispatch<React.SetStateAction<string[]>>,
      selectedFilterOptions: string[],
      //@ts-ignore
      option: any,
    ) => {
      const key = filterType + "_" + index;
      return (
        <div key={key} className="flex align-items-center">
          <Checkbox
            inputId={key}
            name={filterType + "_" + value}
            value={value}
            onChange={(e) =>
              onFilterOptionChange(
                filterType,
                setSelectedFunction,
                selectedFilterOptions,
                e,
              )
            }
            checked={
              selectedFilterOptions
                ? selectedFilterOptions.includes(value || '') //FIX ME: 
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
      //@ts-ignore
      selectedFilterOptions: string[],
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

    const applyFilters = (filterValues: {
      continents: string[];
      regions: string[];
      subregions: string[];
    }) => {
      const _filters = { ...filters };

      if (
        _filters["continentAndRegion"] &&
        "value" in _filters["continentAndRegion"]
      ) {
        _filters["continentAndRegion"].value = filterValues;
      }

      setFilters(_filters);
      options.filterApplyCallback(filterValues);

      setcontinentAndRegionSortField("continentAndRegion.regions.subregion");
    };

    return (
      <div className="flex justify-around">
        <div className="justify-items-center mr-12">
          <h2>CONTINENT</h2>
          {continents.map((continent, index) => {
            return optionTemplate(
              "continent",
              continent,
              index,
              setSelectedContinentsFilter,
              selectedContinentsFilter,
              options,
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
              options,
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
                options,
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const populationRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    const offsets = [
      { range: "0 - 10000", from: 0, to: 10000 },
      { range: "10000 - 500000", from: 10000, to: 500000 },
      { range: "500000 - 1000000", from: 500000, to: 1000000 },
      { range: "1000000 - 50000000", from: 1000000, to: 50000000 },
      { range: "50000000 - 100000000", from: 50000000, to: 100000000 },
      { range: "100000000 - 500000000", from: 100000000, to: 500000000 },
      { range: "500000000 - 1000000000", from: 500000000, to: 1000000000 },
      { range: "1000000000 - ...", from: 1000000000, to: null },
    ];

    const onPopulationFilterChange = (
      e: DropdownChangeEvent,
      options: ColumnFilterElementTemplateOptions,
    ) => {
      const _filters = { ...filters };

      if (_filters["population"] && "value" in _filters["population"]) {
        _filters["population"].value = e.value;
      }

      setFilters(_filters);
      setSelectedPopulationRangeFilter(e.value);
      options.filterApplyCallback(e.value);
    };

    const populationOffsetsTemplate = (offset: {
      range: string;
      from: number;
      to: number;
    }) => {
      return (
        <React.Fragment>
          <strong>
            {" "}
            {offset.from} - {offset.to ? offset.to : " ... "}
          </strong>
        </React.Fragment>
      );
    };

    return (
      <Dropdown
        value={selectedPopulationRangeFilter}
        options={offsets}
        onChange={(e) => onPopulationFilterChange(e, options)}
        itemTemplate={populationOffsetsTemplate}
        placeholder={t("tableView.filter.population.placeholder")}
        optionLabel="range"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const header = RenderHeader({clearFilter, headerFilters: null, globalFilterValue, onGlobalFilterChange});

  const emptyMessageTemplate = () => {
    return <div className="text-center">{t("tableView.noData")}</div>;
  };

  const paginator = paginatorOptions([ScreenEnum.S.layout, ScreenEnum.XS.layout].includes(useScreenLayout().layout) ? 8 : 4);
  const scrollHeight = [ScreenEnum.S.layout, ScreenEnum.XS.layout].includes(useScreenLayout().layout) ? "1600px" : "900px";

  const renderDataTableView = () => {
    if (!countries || countries.length === 0) {
      return (
        <div className="flex justify-center items-center h-52">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <>
        <DataTable
          tableClassName=""
          className={`theme-${theme} m-10`}
          value={countries}
          alt="ALT TEST"
          showGridlines
          resizableColumns
          stripedRows
          scrollable
          scrollHeight={scrollHeight}
          size="small"
          header={header}
          sortField="continent"
          sortMode="multiple"
          sortOrder={-1}
          dataKey="names.common"
          filters={filters}
          globalFilterFields={["names.common", "capital.name", "continent"]}
          emptyMessage={emptyMessageTemplate}
          paginator={paginator.paginator}
          rows={paginator.rows}
          rowsPerPageOptions={paginator.rowsPerPageOptions}
          paginatorTemplate={paginator.paginatorTemplate}
          currentPageReportTemplate={paginator.currentPageReportTemplate} >
            
          <Column
            field="names.common"
            header={t("tableView.header.names")}
            style={{ width: "15%" }}
            sortable
            filter
            filterPlaceholder={t("tableView.filter.name.placeholder")}
            body={(data) => (
              <NamesBodyTemplate
                country={data}
                viewType="table"
                showDemomym={true}
              />
            )}
          />

          <Column
            field="flagsInfo"
            header={t("tableView.header.flagsInfo")}
            style={{ width: "20%" }}
            body={(data) => (
              <CountryImage src={data.flagsInfo.png} alt={data.flagsInfo.alt} />
            )}
          />

          <Column
            field="capital.name"
            header={t("tableView.header.capital")}
            style={{ width: "15%" }}
            sortable
            filter
            filterField="capital.name"
            filterPlaceholder={t("tableView.filter.capital.placeholder")}
            body={(data) => <CapitalBodyTemplate country={data} />}
          />

          <Column
            field="continentAndRegion"
            header={t("tableView.header.continent")}
            style={{ width: "15%" }}
            sortable
            sortField={continentAndRegionSortField}
            filterField="continentAndRegion"
            filter
            showFilterMatchModes={false}
            filterPlaceholder={t("tableView.filter.continent.placeholder")}
            filterElement={continentRegionFilterTemplate}
            body={(data) => <ContinentRegionBodyTemplate country={data} />}
          />

          <Column
            field="languages"
            header={t("tableView.header.languages")}
            style={{ width: "10%" }}
            filter
            filterField="languages"
            showFilterMatchModes={false}
            filterElement={languagesRowFilterTemplate}
            body={(data) => <LanguagesBodyTemplate country={data} />}
          />

          <Column
            field="currencies"
            header={t("tableView.header.currencies")}
            style={{ width: "10%" }}
            filter
            filterField="currencies"
            showFilterMatchModes={false}
            filterElement={currenciesRowFilterTemplate}
            body={(data) => <CurrenciesBodyTemplate country={data} />}
          />

          <Column
            field="population"
            header={t("tableView.header.population")}
            style={{ width: "10%" }}
            sortable
            filter
            filterPlaceholder={t("tableView.filter.population.placeholder")}
            filterElement={populationRowFilterTemplate}
            showFilterMatchModes={false}
            body={(data) => <PopulationBodyTemplate country={data} />}
          />

          <Column
            header="Actions"
            style={{ width: "5%" }}
            body={(data) => <ActionsBodyTemplate country={data} />}
          />
        </DataTable>
      </>
    );
  };
  

  return (
    <>
      {renderDataTableView()}
    </>
  );
}
