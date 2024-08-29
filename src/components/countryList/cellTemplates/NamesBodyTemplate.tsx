import { t } from "i18next";
import DemomymBodyTemplate from "./DemonymBodyTemplate";
import { ICountry, CountryNativeName } from "../../../interfaces/interfaces";
import { ButtonOverlayPanel } from "../sharedList";

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

  return (
    <div className={`flex gap-x-10 ${viewType !== "detail" && "flex-col"} ${(viewType === "list" || viewType === "detail") && "items-center"} m-4`}>
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
        
        <ButtonOverlayPanel
          btnOptions={{
            'type':"button",
            'icon':"pi pi-language",
            'rounded':true,
            'className':"ml-2",
            'tooltip':t("tableView.names.nativeNames")
          }}
          overlayContent = {
            country.names?.nativeNames?.map(
              (nativeName: CountryNativeName, index: number) => {
                return (
                  <ul className="list-none" key={(country.names?.common ? country.names?.common : t('countryInfo.notAvailable')) + index}>
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
            )
          }
        />
        {showDemomym && (
          <DemomymBodyTemplate country={country} viewType="detail" />
        )}
      </div>
    </div>
  );
}
