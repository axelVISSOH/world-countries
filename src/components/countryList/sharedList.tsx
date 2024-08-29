import { t } from "i18next";
import React, { CSSProperties, ReactNode, useContext, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { IButtonOverlayPanel, IRenderHeaderProps, ISearchFieldProps } from "../../interfaces/interfaces";
import { OverlayPanel } from "primereact/overlaypanel";


export const SearchField: React.FC<ISearchFieldProps> = ({inputField}: ISearchFieldProps) => { 
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex rounded-lg h-14 items-center justify-end py-3 navbar-search" style={{ backgroundColor: theme.colors.searchCountry.background }}>
      <i className="pi pi-search pl-4 px-2" style={{ fontSize: "1.5rem", color: "#708090" }}/>
      <div className="w-full pl-4">
        {inputField}
      </div>
    </div>
  );
};

export const RenderHeader: React.FC<IRenderHeaderProps> = ({clearFilter, headerFilters=null, globalFilterValue, onGlobalFilterChange}: IRenderHeaderProps) => {
    
  const searchInput = () => {    
      return (
          <InputText type="text"
                     keyfilter={"alpha"}
                     className="w-11/12 h-10 rounded-md"
                     value={globalFilterValue || ""}
                     onChange={onGlobalFilterChange}
                     placeholder={t("tableView.header.globalFilter")} />
      );
  };

  return (
    <div className="m-4 flex justify-between">
      <div className="left flex">
        <Button
          className=""
          type="button"
          icon="pi pi-filter-slash"
          outlined
          onClick={clearFilter}
        />
        <div className="filters flex mx-4">
          {headerFilters}
        </div>
      </div>
      <div className="right w-1/3">
          <SearchField inputField={searchInput()}/>
      </div>
      
    </div>
  );
};

export function ButtonOverlayPanel ({btnOptions, overlayContent, overlayStyle, overlayRef }: IButtonOverlayPanel) {

  const localOverlayPanelRef = useRef<OverlayPanel>(null);
  const overlayPanelRef = overlayRef || localOverlayPanelRef;

  return(
    <div >
      <Button {...btnOptions} onClick={(e) => overlayPanelRef.current?.toggle(e)}/>
        <OverlayPanel ref={overlayPanelRef} style={overlayStyle}>
          <ul className="flex flex-col">
              { overlayContent }
          </ul>
        </OverlayPanel>
    </div>
  );

  
}
