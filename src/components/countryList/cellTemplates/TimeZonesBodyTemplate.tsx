import tzLogo from "/images/tz.png";

import { useTranslation } from "react-i18next";

import { ICountry, IFieldBodyTemplate, viewtype } from "../../../interfaces/interfaces";
import { ButtonOverlayPanel } from "../sharedList";

export function displayTzs (country: ICountry, viewType: viewtype) {
  
  let tzs: string[] = Array.isArray(country.timezones)
                   ? country.timezones
                   : (typeof country.timezones === 'string' && country.timezones.split(', ')) || [];

  const { t } = useTranslation();

  const displayTz = (tz: string, key: number=0) =>{
    return (
      <li key={key}>
        <strong>{tz.toUpperCase()} </strong>
      </li>
    )
  }
  
  return(
    <>
      {
        tzs && tzs.length>0 ?
          (
            <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `} >
            {
              tzs.length==1 ? 
              ( 
                <ul className="list-none"> 
                  {displayTz(tzs[0])} 
                </ul> 
              ) 
              :
              (                  
                <ButtonOverlayPanel 
                  btnOptions={{'label':t("countryInfo.timezones").replace(':', '')}}
                  overlayContent = 
                  {
                    <ul className="list-none">
                      {
                        tzs && 
                        tzs.map( (tz, index) => (
                          <> 
                            {displayTz(tz, index)} 
                          </>
                        ) )
                      }
                    </ul>
                  } 
                />
              )
            }            
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
          displayTzs(country, viewType)
        }
      </div>
    </div>
  );
}
