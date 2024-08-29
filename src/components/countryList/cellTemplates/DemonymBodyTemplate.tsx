import { t } from "i18next";

import { IFieldBodyTemplate, Demonym } from "../../../interfaces/interfaces";
import { ButtonOverlayPanel } from "../sharedList";

//@ts-ignore
export default function DemomymBodyTemplate({ country, viewType = "table",}: IFieldBodyTemplate) {

  return (
    <div className="flex gap-x-10">
      {
        <div>
          <ButtonOverlayPanel 
            btnOptions={{
              'type':"button", 
              'icon':"pi pi-users", 
              'rounded': true, 
              'className':"ml-2", 
              'tooltip':t("countryView.infoPanel.demomym")
            }}
            overlayContent = {country.demonyms?.map((demomym: Demonym, index: number) => {
              return (
                <ul className="list-none" key={(country.names?.common ||  t('countryInfo.notAvailable')) + index}>
                  <strong>{demomym.lang.toUpperCase()}</strong>
                  <br></br>
                  <li>
                    <strong>{t("countryView.infoPanel.demomym.f")} </strong>
                    <span>{demomym.f}</span>
                  </li>
                  <li>
                    <strong>{t("countryView.infoPanel.demomym.m")} </strong>
                    <span>{demomym.m}</span>
                  </li>
                </ul>
              );
            })}
          />
        </div>
      }
    </div>
  );
}
