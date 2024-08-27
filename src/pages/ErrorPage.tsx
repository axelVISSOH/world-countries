import { Link, useLocation } from "react-router-dom";

import errorPageNotFound from "/images/404_error_page.jpg";

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/theme/ThemeContext";
import { Button } from "primereact/button";

export default function ErrorPage() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <div className={`flex flex-col justify-around flex-grow items-center text-center ${theme.colors.text}`}
         style={{ backgroundColor: theme.colors.background, overflowY: "hidden" }}>

      <div className="my-10">
        {t("error.page.404.text", {pageName: '"' + location.pathname.replace("/", "") + '"',})}
      </div>

      <img className="rounded"
           alt="app logo"
           src={errorPageNotFound}
           style={{ height: "80vh", width: "auto" }}/>

      <Link to="/">
        <Button className={`my-10 ${theme.colors.text}`}
                label={`${t("error.page.navigateToWelcome.text")}`}
                link />
      </Link>

    </div>
  );
}
