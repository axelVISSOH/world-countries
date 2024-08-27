import { t } from "i18next";
import React, { useContext, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IFieldBodyTemplate, ICountry, ContinentAndRegion } from "../../interfaces/interfaces";
import { ThemeContext } from "../../contexts/theme/ThemeContext";

export default function ({ country, viewType = "table" }: IFieldBodyTemplate) {
  
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
  }, [theme]);

  const tableView = (country: ICountry) => {
    return (
      <div className="flex flex-col">
        <ul className="list-none">
          <li>
            {country.continentAndRegion?.continent && (
              <React.Fragment>
                <strong>{t("tableView.continent")} </strong>
                <span>{country.continentAndRegion?.continent}</span>
              </React.Fragment>
            )}
          </li>
          <li>
            {country.continentAndRegion?.regions?.region && (
              <React.Fragment>
                <strong>{t("tableView.region")} </strong>
                <span>{country.continentAndRegion?.regions.region}</span>
              </React.Fragment>
            )}
          </li>
          <li>
            {country.continentAndRegion?.regions?.subregion && (
              <React.Fragment>
                <strong>{t("tableView.subregion")} </strong>
                <span>{country.continentAndRegion?.regions.subregion}</span>
              </React.Fragment>
            )}
          </li>
        </ul>
      </div>
    );
  };

  const listView = (country: ICountry) => {
    let values: ContinentAndRegion | any = [];
    values.push(country.continentAndRegion);
    return (
      <div className="">
        <DataTable className={`theme-${theme}`} value={values} size="normal" stripedRows showGridlines>
          <Column
            field="continent"
            header={t("listView.header.continent")}
          ></Column>
          <Column
            field="regions.region"
            header={t("listView.header.region")}
          ></Column>
          <Column
            field="regions.subregion"
            header={t("listView.header.subregion")}
          ></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <React.Fragment>
      {viewType === "table" ? tableView(country) : listView(country)}
    </React.Fragment>
  );
}


