import { t } from "i18next";

import isUNLogo from "/images/un.png";
import { Tooltip } from "primereact/tooltip";
import { IFieldBodyTemplate } from "../../../interfaces/interfaces";

export default function CountryUNMemberBodyTemplate({
  country,
  viewType = "table",
}: IFieldBodyTemplate) {
  return (
    <div className="">
      <Tooltip target=".tooltip-target-un" mouseTrack mouseTrackLeft={10} />
      {country.unMember === true && (
        <img
          className="w-20 h-20 tooltip-target-un logo"
          alt="logo"
          src={isUNLogo}
          data-pr-position="left"
          data-pr-tooltip={t("countryView.infoPanel.isUn")}
        />
      )}
    </div>
  );
}
