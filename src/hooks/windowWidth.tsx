import { useEffect, useState } from "react";
import { ScreenEnum } from "../enums/screen";

export function useWindowWidth(): number{
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {setWindowWidth(window.innerWidth); };
        window.addEventListener('resize', handleResize);

        return () => { window.removeEventListener('resize', handleResize);};
    }, []);

    return windowWidth;
}

export function useScreenLayout(): ScreenEnum {
    const windowWidth = useWindowWidth();

    return windowWidth > 1500 ? ScreenEnum.L : windowWidth > 1200 ? ScreenEnum.M : windowWidth > 800 ? ScreenEnum.S : ScreenEnum.XS;
}