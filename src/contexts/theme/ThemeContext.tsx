import React, { useCallback, useContext, useEffect, useState } from "react";
import themes from "./themes.json";
import { getItemToJSON, setItem } from "../../storage/localStorage";
import { ITheme, IThemeContextType, IThemeProviderProps } from "../../interfaces/interfaces";
import { PrimeReactContext } from "primereact/api";
import { updateThemeLink } from "./themeUtils";

const getTheme = (): ITheme => {
  const storedTheme = getItemToJSON<string>("theme");
  const isDarkMode = storedTheme ? storedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const theme = isDarkMode ? themes.data.dark : themes.data.light;

  updateThemeLink(theme.href, 'pr-theme-link');

  if (!storedTheme) { setItem("theme", theme.name); }

  return theme;
};

const ThemeContext = React.createContext<IThemeContextType>({
  theme: getTheme(),
  setTheme: () => {},
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);
  const { changeTheme } = useContext(PrimeReactContext);

  const toggleTheme = useCallback(() => {
    const nextTheme =  (theme.name === "dark" ? themes.data.light : themes.data.dark);
    setTheme(nextTheme);
    changeTheme && changeTheme(theme.id, nextTheme.id, 'pr-theme-link', () => setTheme(nextTheme) );    
  }, [theme, changeTheme]);

  useEffect(() => {
    setItem("theme", theme.name);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
