
import './App.css'

import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import CountryPage from './pages/CountryPage';
import Welcome from './components/welcome/Welcome';

function App() {

  const { t } = useTranslation();
  document.title = t("appTitle");
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/countries" element={<HomePage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/countries/:countryName" element={<CountryPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App
