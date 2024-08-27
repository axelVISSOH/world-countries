import './index.css'
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { APIOptions, FilterMatchMode, PrimeReactProvider } from "primereact/api";

import App from './App.tsx'
import i18n from './contexts/i18n.ts';
import { ThemeProvider } from './contexts/theme/ThemeContext.tsx';
import { CountryProvider } from './contexts/country/CountryContext.tsx';



const root = createRoot(document.getElementById('root')!);

const Root = () => {

  const value: Partial<APIOptions> = {
    filterMatchModeOptions: {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    },
    inputStyle: "filled",
    pt: {},
  };

  return(
    <StrictMode>
      <PrimeReactProvider value={value}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <BrowserRouter>
              <CountryProvider>
                <App />
              </CountryProvider>
            </BrowserRouter>
          </ThemeProvider>
        </I18nextProvider>
      </PrimeReactProvider>      
    </StrictMode>
  );
};

root.render(<Root />);
