import { t } from "i18next";
import { useContext, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { CountryContext } from "../../contexts/country/CountryContext";
import { IFieldBodyTemplate } from "../../interfaces/interfaces";
import CountryModalButton from "../country/CountryModalButton";
import ListViewActionBtn from "../countryList/ListViewActionBtn";

//@ts-ignore
export default function ActionsBodyTemplate( {country, viewType} : IFieldBodyTemplate) {
  
  const [modalOpen, setModalOpen] = useState(false);

  //@ts-ignore
  const { countries, persistBrowsedCountry } = useContext(CountryContext);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const items: MenuItem[] = [
    {
      label: t("tableView.actions.moreInfo"),
      icon: "pi pi-info-circle",
      style: { fontSize: "1.5rem" },
      command: () => {
        persistBrowsedCountry(country);
        navigate(`/countries/${country.names?.common}`);
      },
    },
    {
      label: t("countryInfo.btn"),
      icon: "pi pi-info-circle",
      style: { fontSize: "1.5rem" },
      command: () => {
        setModalOpen(true);
      },
    }
  ];

  return (
    <div className="flex flex-row gap-4 m-4">
      <ListViewActionBtn items={items} direction="up" />
      <CountryModalButton country={country} open={modalOpen} onClose={closeModal} />
    </div>
  );
}
