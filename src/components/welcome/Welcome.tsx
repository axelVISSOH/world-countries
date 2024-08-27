import { useContext, useEffect, useRef } from "react";
import { CountryContext } from "../../contexts/country/CountryContext";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { useNavigate } from "react-router-dom";

import logo from "/images/logo.jpg";
import Globe from "react-globe.gl";
import { ReactTyped } from "react-typed";

export default function Welcome() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { isCountryContextLoaded } = useContext(CountryContext);
  const globeRef = useRef<{
    controls: () => { autoRotate: boolean; autoRotateSpeed: number };
  }>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-rotate
    const globe = globeRef.current;
    if (globe) {
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 7;
    }

    const intervalId = setInterval(() => {
      if (isCountryContextLoaded()) {
        navigate("/countries", { replace: true });
      }
    }, 5000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 20000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isCountryContextLoaded, navigate]);

  return (
    <div className={`p-10 h-screen flex flex-col justify-center items-center ${theme.colors.text}`}
      style={{ backgroundColor: theme.colors.background }} >

      <ReactTyped className="inline-block whitespace-nowrap text-2xl sm:text-xl xs:text-l"
                  strings={[t("greeting", { appTitle: t("appTitle") })]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop />

      <Globe
        //@ts-ignore
        ref={globeRef}          
        width={window.innerWidth}
        height={window.innerHeight * 0.5}
        backgroundColor={"rgba(0,0,0,0)"}
        globeImageUrl={logo}/>

    </div>
  );
}
