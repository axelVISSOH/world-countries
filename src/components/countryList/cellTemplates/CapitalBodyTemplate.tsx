import { t } from "i18next";

import capitalLogo from "/images/capitalLogo.png";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function CapitalBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  return (
    <div className="flex items-center text-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={capitalLogo} alt="" />
        </span>
      )}
      <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}>
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("tableView.header.capital")}</span>
        )}
        <strong> {(country?.capital?.name || t('countryInfo.notAvailable')).toUpperCase()} </strong>
      </div>
    </div>
  );
}
