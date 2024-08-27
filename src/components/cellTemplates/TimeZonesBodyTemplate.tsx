import tz from "/images/tz.png";
import { IFieldBodyTemplate } from "../../interfaces/interfaces";
import { useTranslation } from "react-i18next";

export default function TimeZonesBodyTemplate({country, viewType = "table",}: IFieldBodyTemplate) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      
    </div>
  );
}
