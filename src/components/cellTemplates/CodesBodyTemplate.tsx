import indic from "/images/indic_1.png";

import { useRef } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { OverlayPanel } from "primereact/overlaypanel";

import { ICodes, IFieldBodyTemplate } from "../../interfaces/interfaces";

export default function CodesBodyTemplate({country, viewType = "detail",}: IFieldBodyTemplate) {
  const { t } = useTranslation();
  const codesOverlayPanelRef = useRef<OverlayPanel>(null);

  const codes = country.codes;

  function displayCodes(codes: ICodes) {
    return (
      <div className="m-2">
        {codes && (
          <div className="flex flex-col gap-y-5">
            <div className="flex gap-4">
              {codes.cca2 && (
                <div>
                  <strong>{t('countryInfo.cca2')}</strong>
                  <span>{codes.cca2.toUpperCase()}</span>
                </div>
              )}
              {codes.ccn3 && (
                <div>
                  <strong>{t('countryInfo.ccn3')}</strong>
                  <span>{codes.ccn3}</span>
                </div>
              )}
              {codes.cca3 && (
                <div>
                  <strong>{t('countryInfo.cca3')}</strong>
                  <span>{codes.cca3.toUpperCase()}</span>
                </div>
              )}
              {codes.cioc && (
                <div>
                  <strong>{t('countryInfo.cioc')}</strong>
                  <span>{codes.cioc.toUpperCase()}</span>
                </div>
              )}
            </div>

            {codes.indic && (
              <div>
                <strong>{t('countryInfo.indic')}</strong>
                  {codes?.indic?.suffixes && codes?.indic?.suffixes.length > 0 && 
                    ( codes?.indic?.suffixes.map( (suf, index) =>  <strong key={index}> { (codes.indic?.root+suf).toUpperCase() + (codes?.indic?.suffixes && index <= codes?.indic?.suffixes.length-2 ? ',':'')} </strong> ) )
                  }
              </div>
            )}
            {codes.fifa && (
              <div>
                <strong>{t('countryInfo.fifa')}</strong>
                <span>{codes.fifa.toUpperCase()}</span>
              </div>
            )}
            {codes.gini && (
              <div>
                <strong>{t('countryInfo.gini')}</strong>
                <div>
                  {Object.entries(codes.gini).map(([year, value]) => (
                    <div key={year}>
                      <span>{year}: {value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    )
  }
  return (
    <div className="flex items-center">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={indic} alt="" />
        </span>
      )}
      <div className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `} >
        
        <Button type="button"
                label={t("countryInfo.codes").replace(':', '')}
                onClick={(e) => codesOverlayPanelRef.current?.toggle(e)} />
          <OverlayPanel ref={codesOverlayPanelRef}>
            {(codes) && displayCodes(codes)}
          </OverlayPanel>
      </div>
    </div>
  );
}
