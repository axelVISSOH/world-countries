import { useContext } from "react";
import { useTranslation } from "react-i18next";

import LangSelector from "../langSelector/LangSelector";
import { ThemeContext } from "../../contexts/theme/ThemeContext";

import "primeicons/primeicons.css";
import CustomBreadCrumb from "../siteBreadCrumb/CustomBreadCrumb";
import { Tooltip } from "primereact/tooltip";

export default function Footer() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={"rounded-t-[30px] bottom-0 left-0 flex justify-center items-center " + theme.colors.text}
            style={{ backgroundColor: theme.colors.navbarFooterBackground }}>

      <div className="w-11/12 mx-auto p-2 footer-container">
        
        <div className="flex items-center justify-between my-2 top-footer">
          <CustomBreadCrumb />
          <LangSelector />
        </div>

        <hr className="border-slate-600" />

        <Tooltip target=".info-tooltip" />

        <div className="flex items-center justify-between my-2 bottom-footer">
          
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()}{" "}
            {t("footer.bottom.copyright", { appTitle: t("appTitle") })}
          </div>

          <div className="footer-link footer-media-link">
            <ul className="list-none">
              <li className="inline mr-2">
                <a href="#">
                  <i className="pi pi-github" style={{ color: "slateblue", fontSize: "1.5rem" }}></i>
                </a>
              </li>
              <li className="inline mr-2 ml-2">
                <a href="#">
                  <i className="pi pi-linkedin" style={{ color: "blue", fontSize: "1.5rem" }}></i>
                </a>
              </li>
              <li className="inline ml-2">
                <i className="pi pi-info-circle info-tooltip" style={{ color: "gray", fontSize: "1.5rem" }}
                  data-pr-tooltip={t("footer.info")} data-pr-position="left" ></i>
              </li>
            </ul>
          </div>

        </div>

      </div>
      
    </footer>
  );
}
