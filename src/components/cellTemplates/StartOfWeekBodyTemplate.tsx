import { t } from "i18next";

import startOfWeek from "/images/startOfWeek.png";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function StartOfWeekBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  return (
    <div className="flex items-center text-center">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={startOfWeek} alt="" />
        </span>
      )}
      <div
        className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}
      >
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("countryView.infoPanel.startOfWeek")}</span>
        )}
        <strong> {country?.startOfWeek?.toUpperCase()} </strong>
      </div>
    </div>
  );
}
