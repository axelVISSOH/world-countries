import { t } from "i18next";
import { useRef } from "react";

import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { IFieldBodyTemplate, Demonym } from "../../../interfaces/interfaces";

export default function DemomymBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  const demomymOverlayPanelRef = useRef<OverlayPanel>(null);

  return (
    <div className="flex">
      {
        <div>
          <Button
            type="button"
            icon="pi pi-users"
            rounded
            className="ml-2"
            tooltip={t("countryView.infoPanel.demomym")}
            onClick={(e) => demomymOverlayPanelRef.current?.toggle(e)}
          />
          <OverlayPanel ref={demomymOverlayPanelRef}>
            {country.demonyms?.map((demomym: Demonym, index: number) => {
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
          </OverlayPanel>
        </div>
      }
    </div>
  );
}
