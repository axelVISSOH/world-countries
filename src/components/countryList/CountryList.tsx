import { Dock } from "primereact/dock";
import { MenuItem } from "primereact/menuitem";
import CountryDataTable from "./CountryDataTable";
import CountryDataView from "./CountryDataView";
import { useCallback, useState } from "react";

import dockTableView from "/images/data-table-2.png";
import dockTableGrid from "/images/data-view-grid-2.png";
import { getItem, setItem } from "../../storage/localStorage";

export default function CountryList() {
  const [toggleDisplay, setToggleDisplay] = useState<string>(getItem('listView') || 'table');

  const toggleListView = useCallback( (view: 'table'|'grid') => {
    setItem('listView', view, false);
    setToggleDisplay(view);
  }, [toggleDisplay] ) 

  const items: MenuItem[] = [
    {
      label: "Table view",
      icon: () => <img alt="Table view" src={dockTableView} width="100%" />,
      command: () => {
        toggleListView('table');
      },
    },
    {
      label: "Grid list View",
      icon: () => <img alt="Grid list View" src={dockTableGrid} width="100%" />,
      command: () => {
        toggleListView('grid');
      },
    },
  ];

  return (
    <div className="">
      <Dock className="z-10 fixed" model={items} position={"right"} />
      {toggleDisplay==='table' ? <CountryDataTable /> : <CountryDataView />}
    </div>
  );
}
