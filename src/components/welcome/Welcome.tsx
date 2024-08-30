import { useContext, useEffect, useRef, useState } from "react";
import { CountryContext } from "../../contexts/country/CountryContext";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { useNavigate } from "react-router-dom";

import logo from "/images/logo.jpg";
import Globe from "react-globe.gl";
import { ReactTyped } from "react-typed";
import { useScreenLayout } from "../../hooks/windowWidth";
import { ScreenEnum } from "../../enums/screen";

export default function Welcome() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { isCountryContextLoaded } = useContext(CountryContext);

  const layout = useScreenLayout().layout;
  const [fontSize, setFontSize] = useState('4rem')

  const globeRef = useRef<{controls: () => { autoRotate: boolean; autoRotateSpeed: number };}>(null);

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

  useEffect(() => {
    const handleResize = () => {
      if ([ScreenEnum.S.layout, ScreenEnum.XS.layout].includes(layout)) { setFontSize('2.5rem'); } 
      else { setFontSize('4rem'); }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the size based on current screen width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`p-10 h-screen flex flex-col justify-center items-center ${theme.colors.text}`}
      style={{ backgroundColor: theme.colors.background }} >

      <div className="flex justify-center gap-y-4" style={{ 'fontSize': fontSize , 'lineHeight': '1' }}>
        <ReactTyped className="inline-block whitespace-nowrap text-4xl sm:text-xl xs:text-l font-serif font-bold"
                    strings={[t("greeting", { appTitle: t("appTitle") })]}
                    style={{ 'fontSize': fontSize , 'lineHeight': '1' }}
                    typeSpeed={40}
                    backSpeed={50}
                    loop />
        <span>🌍</span>
      </div>
      

      <Globe
        //@ts-ignore
        ref={globeRef}          
        width={window.innerWidth}
        height={window.innerHeight * 0.4}
        backgroundColor={"rgba(0,0,0,0)"}
        globeImageUrl={logo}/>

    </div>
  );
}
