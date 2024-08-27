import { t } from "i18next";

import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useTranslation } from "react-i18next";
import { useContext, useRef } from "react";
import { CountryContext } from "../../../contexts/country/CountryContext";
import { ICountryImageInterfaceProps } from "../../../interfaces/interfaces";

import noFlag from "/images/noFlag.png";

export default function CountryImage({src, alt, shape = "circle",}: ICountryImageInterfaceProps) {
  const { t } = useTranslation();

  const { countries, browsedCountry } = useContext(CountryContext);
  const flagsDescriptionOverlayPanelRef = useRef<OverlayPanel>(null);

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={src || noFlag}
        zoomSrc={src || noFlag}
        alt={alt || t('countryInfo.notAvailable')}
        indicatorIcon={<i className="pi pi-search"></i>}
        preview
        imageClassName={shape === "circle" ? "w-44 h-40" : "w-72 h-60"}
        imageStyle={shape === "circle" ? { borderRadius: "50%" } : {}}
        zoomInIcon={
          <i
            className="pi pi-search-plus"
            style={{ fontSize: "1.5rem", color: "slateblue" }}
          />
        }
        zoomOutIcon={
          <i
            className="pi pi-search-minus"
            style={{ fontSize: "1.5rem", color: "slateblue" }}
          />
        }
        rotateLeftIcon={
          <i
            className="pi pi-replay"
            style={{ fontSize: "1.5rem", color: "slateblue" }}
          />
        }
        rotateRightIcon={
          <i
            className="pi pi-refresh"
            style={{ fontSize: "1.5rem", color: "slateblue" }}
          />
        }
        closeIcon={
          <i
            className="pi pi-times"
            style={{ fontSize: "1.5rem", color: "slateblue" }}
          />
        }
      />
      {alt && (
        <div className="mt-2">
          <Button
            type="button"
            label={t("tableView.flagsInfo.description")}
            onClick={(e) => flagsDescriptionOverlayPanelRef.current?.toggle(e)}
          />
          <OverlayPanel
            style={{ width: "350px" }}
            ref={flagsDescriptionOverlayPanelRef}
          >
            <div className="text-justify"> {alt} </div>
          </OverlayPanel>
        </div>
      )}
    </div>
  );
}
