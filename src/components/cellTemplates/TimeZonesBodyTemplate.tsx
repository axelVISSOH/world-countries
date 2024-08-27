import tzLogo from "/images/tz.png";

import { useRef } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

import { OverlayPanel } from "primereact/overlaypanel";
import { ICountry, IFieldBodyTemplate } from "../../interfaces/interfaces";

export function displayTz (country: ICountry, viewType: "table" | "list" | "detail") {
  
  let tzs: string[] = Array.isArray(country.timezones)
                   ? country.timezones
                   : (typeof country.timezones === 'string' && country.timezones.split(', ')) || [];

  const { t } = useTranslation();
  const tzsOverlayPanelRef = useRef<OverlayPanel>(null);

  return(
    <>
      {
        tzs ?
          (
            <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `} >
              <Button type="button"
                      label={t("countryInfo.timezones").replace(':', '')}
                      onClick={(e) => tzsOverlayPanelRef.current?.toggle(e)}/>
                <OverlayPanel ref={tzsOverlayPanelRef}>
                  <ul className="flex flex-col">
                      {
                        tzs && 
                        tzs.map( (tz) => (
                          <li key={tz}>
                            <strong> {tz?.toUpperCase()} </strong>
                            <br />
                          </li>
                        ) )
                      }
                  </ul>
                </OverlayPanel>
            </div>
            
          )
          : ( <span>{t("countryView.na")}</span> )
      }
    </>
  )
}

export default function TimeZonesBodyTemplate({country, viewType = "table",}: IFieldBodyTemplate) {
  const { t } = useTranslation();
 
  return (
    <div className="flex items-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={tzLogo} alt="" />
        </span>
      )}
      <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}>
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("countryView.infoPanel.tz")}</span>
        )}
        {
          displayTz(country, viewType)
        }
      </div>
    </div>
  );
}
