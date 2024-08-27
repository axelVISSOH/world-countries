import { useRef } from "react";

import { t } from "i18next";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import DemomymBodyTemplate from "./DemonymBodyTemplate";
import { ICountry, CountryNativeName } from "../../../interfaces/interfaces";

interface INamesBodyTemplate {
  country: ICountry;
  viewType?: string;
  showDemomym: boolean;
}

export default function NamesBodyTemplate({
  country,
  viewType = "table",
  showDemomym = true,
}: INamesBodyTemplate) {
  const nativesNameOverlayPanelRef = useRef<OverlayPanel>(null);

  return (
    <div
      className={`flex ${viewType !== "detail" && "flex-col"} ${(viewType === "list" || viewType === "detail") && "items-center"} m-4`}
    >
      <ul className="list-none">
        <li>
          <strong>{t("tableView.names.common")} </strong>
          <span>{country.names?.common}</span>
        </li>
        <li>
          <strong>{t("tableView.names.official")} </strong>
          <span className="text-wrap">{country.names?.official}</span>
        </li>
      </ul>
      <div className="flex">
        <Button
          type="button"
          icon="pi pi-language"
          rounded
          className="ml-2"
          tooltip={t("tableView.names.nativeNames")}
          onClick={(e) => nativesNameOverlayPanelRef.current?.toggle(e)}
        />
        <OverlayPanel ref={nativesNameOverlayPanelRef}>
          {country.names?.nativeNames?.map(
            (nativeName: CountryNativeName, index: number) => {
              return (
                <ul className="list-none" key={country.names?.common || t('countryInfo.notAvailable')+ index}>
                  <strong>{nativeName.lang.toUpperCase()} </strong>
                  <li>
                    <strong>{t("tableView.names.common")} </strong>
                    <span>{nativeName.common}</span>
                  </li>
                  <li>
                    <strong>{t("tableView.names.official")} </strong>
                    <span>{nativeName.official}</span>
                  </li>
                </ul>
              );
            },
          )}
        </OverlayPanel>
        {showDemomym && (
          <DemomymBodyTemplate country={country} viewType="detail" />
        )}
      </div>
    </div>
  );
}
