import { useContext } from "react";

import PageComponent from "./PageComponent";
import CountryComponent from "../components/country/CountryComponent";
import { CountryContext } from "../contexts/country/CountryContext";

export default function CountryPage() {
  const { browsedCountry } = useContext(CountryContext);

  return (
    <PageComponent>
      {browsedCountry != null && <CountryComponent country={browsedCountry} />}
    </PageComponent>
  );
}
