import { t } from "i18next";
import React from "react";

import currencyLogo from "/images/currencyLogo3.png";
import { IFieldBodyTemplate, Currencies } from "../../../interfaces/interfaces";

export default function CurrenciesBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
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
    <div className="flex items-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={currencyLogo} alt="" />
        </span>
      )}
      <div
        className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}
      >
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("tableView.header.currencies")}</span>
        )}
        <ul className="list-none">
          {country.currencies?.map((currency: Currencies, index: number) => {
            return (
              <li key={index}>
                {currencyKeyRowTemplate(currency)}
                {currencyNameRowTemplate(currency)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
