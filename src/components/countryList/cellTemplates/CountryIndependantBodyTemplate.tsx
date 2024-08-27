import { t } from "i18next";

import independant from "/images/independant.png";
import { Tooltip } from "primereact/tooltip";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function CountryIndependantBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  return (
    <div className="">
      <Tooltip
        target=".tooltip-target-isIndependant"
        mouseTrack
        mouseTrackLeft={10}
      />
      {country.unMember === true && (
        <img
          className="w-24 h-24 tooltip-target-isIndependant logo"
          alt="logo"
          src={independant}
          data-pr-position="left"
          data-pr-tooltip={t("countryView.infoPanel.isIndependant")}
        />
      )}
    </div>
  );
}
