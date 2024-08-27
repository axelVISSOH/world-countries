import Globe from "react-globe.gl";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import logo from "/images/logo.jpg";

import SwitchTheme from "../switchTheme/SwitchTheme";
import SearchCountry from "../searchCountry/SearchCountry";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { BASE_API_URL, ENDPOINTS } from "../../services/countryServices";

export default function Navbar() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const globeRef = useRef<{
    controls: () => { autoRotate: boolean; autoRotateSpeed: number };
  }>(null);

  return (
    <nav className="top-0 left-0 rounded-b-[30px] sticky z-10"
      style={{ backgroundColor: theme.colors.navbarFooterBackground }}>
      <div className="flex items-center justify-between py-4 mx-auto w-11/12">
        <div className="flex items-center w-3/5">
          <Link className="mr-8" to="/">
            <Globe
              //@ts-ignore
              ref={globeRef}
              width={80}
              height={80}
              backgroundColor={"rgba(0,0,0,0)"}
              globeImageUrl={logo}
            />
          </Link>
          <div className="w-2/3">
            <SearchCountry />
          </div>
        </div>
        <div className={"flex items-center justify-end " + theme.colors.text}>
          <ul className="flex list-none mx-2">
            <li className="inline px-4">
              <Link to="/countries">{t("navbar.link.home")}</Link>
            </li>
            <li className="inline px-4">
              <Link to="/list">{t("navbar.link.list")}</Link>
            </li>
            <li className="inline px-4">
              <a href={BASE_API_URL + ENDPOINTS.ALL} target="_blank">
                {t("navbar.link.api")}
              </a>
            </li>
          </ul>
          <SwitchTheme />
        </div>
      </div>
    </nav>
  );
}
