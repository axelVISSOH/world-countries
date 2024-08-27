import "./switchTheme.css";

import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/theme/ThemeContext";


export default function SwitchTheme() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(theme.name === "dark");
  
  const switchTheme = (value: boolean) => {
    setIsDarkMode(value);
    toggleTheme();
  };

  return (
    <div className="tooltip" onClick={() => switchTheme(!isDarkMode)}>
      <i className={`pi ${isDarkMode ? "pi-moon" : "pi-sun"} `}></i>
      <span className="tooltiptext">
        {!isDarkMode ? t("theme.switcher.dark") : t("theme.switcher.light")}
      </span>
    </div>
  );
}
