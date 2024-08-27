import tz from "/images/tz.png";
import { IFieldBodyTemplate } from "../../interfaces/interfaces";
import { useTranslation } from "react-i18next";

export default function TimeZonesBodyTemplate({country, viewType = "table",}: IFieldBodyTemplate) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={tz} alt="" />
        </span>
      )}
      <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}>
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("countryView.infoPanel.tz")}</span>
        )}
        {
          country.timezones?.length ? (
            country.timezones.map(tzs => <strong key={tzs}> { tzs.toUpperCase()} </strong>)
          ) : ( <span>toto</span>)
        }
      </div>
    </div>
  );
}
