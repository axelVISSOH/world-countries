import { Button } from "primereact/button";

const paginatorLeft = () => {
  return <Button type="button" icon="pi pi-refresh" text />;
};

const paginatorRight = () => {
  return <Button type="button" icon="pi pi-download" text />;
};


export const paginatorOptions = (gridColumns: number) => {

  let rows = gridColumns*2;
  let rowsPerPageOptions = [gridColumns*2, gridColumns*4, gridColumns*6, 60];
  
  return {
    rows,
    paginator: true,
    rowsPerPageOptions,
    paginatorTemplate:
      "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "{first} to {last} of {totalRecords}",
    paginatorLeft: paginatorLeft,  
    paginatorRight: paginatorRight 
  };
};
