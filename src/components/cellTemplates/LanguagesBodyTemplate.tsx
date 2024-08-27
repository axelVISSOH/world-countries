import languageLogo from "/images/languageLogo.png";
import { IFieldBodyTemplate, Languages } from "../../../interfaces/interfaces";
import { useTranslation } from "react-i18next";

export default function LanguagesBodyTemplate({country, viewType = "table",}: IFieldBodyTemplate) {

  const { t } = useTranslation();

  function isString(value: string | unknown): value is string {
    return typeof value === 'string';
  }

  return (
    <div className="flex items-center">
      {viewType === "detail" && (
        <span className="">
          <img className="mr-2 w-32" src={languageLogo} alt="" />
        </span>
      )}
      <div
        className={`flex  ${viewType === "list" || viewType === "detail" ? "flex-col" : "justify-center"}  `}
      >
        {(viewType === "list" || viewType === "detail") && (
          <span>{t("tableView.header.languages")}</span>
        )}
        <ul className="list-none">
          {
            country.languages?.map((language: Languages, index: number) => (
              <li key={index}>
                <strong>{language?.key?.toUpperCase() ?? t('countryInfo.notAvailable')} </strong>
                <span>{language.name}</span>
                {/* {language?.name && isString(language.name) && <span>{language.name}</span>} */}
              </li>
            )) || <li>{t('countryInfo.notAvailable')}</li>
          }
        </ul>
      </div>
    </div>
  );
}
