import languageLogo from "/images/languageLogo.png";
import { ICountry, IFieldBodyTemplate, Languages, viewtype } from "../../../interfaces/interfaces";
import { useTranslation } from "react-i18next";
import { ButtonOverlayPanel } from "../sharedList";


export function displaylangs (country: ICountry, viewType: viewtype) {
  
  let langs: Languages[] = Array.isArray(country.languages) ? country.languages : [];

  const { t } = useTranslation();

  const displaylang = (lang: Languages, key: number=0) =>{
    return (
      <li key={lang.key + key}>
        <strong>{lang.key.toUpperCase()} </strong>
        <span>{lang.name}</span>
      </li>
    )
  }

  return (
    <>
      {
        langs && langs.length>0 ?
          (
            <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `} >
            
              {    
                langs.length==1 ? 
                ( 
                  <> 
                    {displaylang(langs[0])} 
                  </> 
                ) 
                :
                (
                  <ButtonOverlayPanel
                    btnOptions={{'label':t("countryInfo.languages").replace(':', '')}}
                    overlayContent = {
                      <ul className="flex flex-col">
                        { langs && 
                          langs.map( (lang, index) => (
                            <>
                              {displaylang(lang, index)}                                              
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
  );
}


export default function LanguagesBodyTemplate({country, viewType = "table",}: IFieldBodyTemplate) {

  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={languageLogo} alt="" />
        </span>
      )}
      <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}>
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("tableView.header.languages")}</span>
        )}
        <ul className="list-none">
          {
           displaylangs(country, viewType)
          }
        </ul>
      </div>
    </div>
  );
}
