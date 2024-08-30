import { t } from "i18next";
import React from "react";

import currencyLogo from "/images/currencyLogo3.png";
import { IFieldBodyTemplate, Currencies, ICountry, viewtype } from "../../../interfaces/interfaces";
import { useTranslation } from "react-i18next";
import { ButtonOverlayPanel } from "../sharedList";


export function displayCurrencies (country: ICountry, viewType: viewtype) {
  
  let currencies: Currencies[] = Array.isArray(country.currencies) ? country.currencies : [];

  const { t } = useTranslation();

  const displayCurrency = (currency: Currencies, key: number=0) =>{
    return (
      <li className="m-2" key={currency.key + key}>
        {currencyKeyRowTemplate(currency)}
        {currencyNameRowTemplate(currency)}
      </li>
    )
  }

  const currencyKeyRowTemplate = (currency: Currencies) => {
    return (
      <React.Fragment key={currency.key?.toUpperCase()}>
        <strong>{currency.key?.toUpperCase()} </strong>
        <strong>{currency.symbol?.toUpperCase()} </strong>
      </React.Fragment>
    );
  };

  const currencyNameRowTemplate = (currency: Currencies) => {
    return (
      <React.Fragment>
        <br></br> <span>{currency.name}</span>
      </React.Fragment>
    );
  };

  return (
    <>
      {
        currencies && currencies.length>0 ?
          (
            <div className={`flex mb-4 ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"} `} >
            
              {    
                currencies.length==1 ? 
                ( 
                  <> 
                    {displayCurrency(currencies[0])} 
                  </> 
                ) 
                :
                (
                  <ButtonOverlayPanel
                    btnOptions={{'label':t("countryInfo.currencies").replace(':', '')}}
                    overlayContent = {
                      <ul className="flex flex-col">
                        { currencies && 
                          currencies.map( (lang, index) => (
                            <>
                              {displayCurrency(lang, index)}                                              
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

export default function CurrenciesBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {

  return (
    <div className="flex items-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={currencyLogo} alt="" />
        </span>
      )}
      <div className={`flex ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}>
        {(viewType === "list" || viewType === "detail") && (
          <span className="mb-2">{t("tableView.header.currencies")}</span>
        )}
        <ul className="list-none">
          {displayCurrencies(country, viewType)}
        </ul>
      </div>
    </div>
  );
}
