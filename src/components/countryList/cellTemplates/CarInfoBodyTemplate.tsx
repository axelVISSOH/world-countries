import { t } from "i18next";

import car from "/images/car3.png";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function CarInfoBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  
  return (
    <div className="flex items-center text-center gap-x-10">
      {viewType === "detail" && (
        <img
          className={`mr-2 w-32 ${country.carInfo?.side === "left" && "transform scale-x-[-1]"} `}
          src={car}
          alt=""
        />
      )}
      <div
        className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}
      >
        {(viewType === "list" || viewType === "detail") && (
          <span>
            {t("countryView.infoPanel.carInfo." + country.carInfo?.side)}
          </span>
        )}
      </div>
    </div>
  );
}
