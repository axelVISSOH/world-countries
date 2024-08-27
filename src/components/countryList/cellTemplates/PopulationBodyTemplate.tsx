import { t } from "i18next";

import populationLogo from "/images/population.png";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function PopulationBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  return (
    <div className="flex items-center text-center gap-x-10">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={populationLogo} alt="" />
        </span>
      )}
      <div
        className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}
      >
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("tableView.header.population")}</span>
        )}
        <strong>
          {country?.population && new Intl.NumberFormat("en-EN").format(country?.population)}{" "}
        </strong>
      </div>
    </div>
  );
}
