import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Image } from "primereact/image";
import { ICountryImageProps } from "../../../interfaces/interfaces";

import noFlag from "/images/noFlag.png";
import { CountryContext } from "../../../contexts/country/CountryContext";
import { ButtonOverlayPanel } from "../sharedList";

export default function CountryImage({src, alt, shape = "circle",}: ICountryImageProps) {
  const { t } = useTranslation();

  useContext(CountryContext);

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        className={`${ (shape === "square") && 'border border-slate-800'}`}
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
          <ButtonOverlayPanel
            btnOptions={{
              'type': "button",
              'label':t("tableView.flagsInfo.description").replace(':', '')
            }}
            overlayContent = { <div className="text-justify"> {alt} </div> }
            overlayStyle={{ width: "350px" }}
          />
        </div>
      )}
    </div>
  );
}
