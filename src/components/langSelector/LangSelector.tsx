import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

import frIcon from "/icon/fr.png";
import enIcon from "/icon/en.png";
import { ILang } from "../../interfaces/interfaces";
import { getItem, setItem } from "../../storage/localStorage";

export default function LangSelector({}) {
  const { t, i18n } = useTranslation();

  const langs: ILang[] = [
    { name: "lang.en", code: "en", icon: enIcon },
    { name: "lang.fr", code: "fr", icon: frIcon },
  ];

  const savedLangCode = getItem("lang");
  const [selectedLang, setSelectedLang] = useState<ILang | null>(
    () =>
      langs.find(
        (lang) =>
          lang.code ===
          (savedLangCode != null ? savedLangCode : navigator.language),
      ) || null,
  );

  const onDropdownItemSelected = (e: DropdownChangeEvent) => {
    setSelectedLang(e.value as ILang);
    setItem("lang", e.value.code, false);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLang?.code);
  }, [selectedLang]);

  const selectedLangTemplate = (lang: ILang, props: any) => {
    if (lang) {
      return (
        <div className="flex flex-row">
          <img alt={t(lang.name)} src={lang.icon} className="mr-2 w-5" />
          <span>{t(lang.name)}</span>
        </div>
      );
    } else {
      return <span>{props.placeholder}</span>;
    }
  };

  const langOptionTemplate = (lang: ILang) => {
    return (
      <div className="flex align-items-center option-template">
        <img alt={t(lang.name)} src={lang.icon} className="mr-2 w-5" />
        <span>{t(lang.name)}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center">
      <span>{t("footer.top.lang")} : </span>
      <Dropdown
        value={selectedLang}
        onChange={(e: DropdownChangeEvent) => {
          onDropdownItemSelected(e);
        }}
        options={langs}
        optionLabel="name"
        className="ml-1 px-1 border-solid border-2 border-slate-600 rounded bg-transparent"
        placeholder={t("lang.selector.placeholder")}
        valueTemplate={selectedLangTemplate}
        itemTemplate={langOptionTemplate}
      />
    </div>
  );
}
