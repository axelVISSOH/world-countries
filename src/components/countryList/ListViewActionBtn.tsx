import { MenuItem } from "primereact/menuitem";
import { useRef } from "react";
import React from "react";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";

type SpeedDialDirection =
  | "left"
  | "right"
  | "up"
  | "down"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right"
  | undefined;

interface IListViewActionBtn {
  items: MenuItem[];
  direction?: SpeedDialDirection ;
}

export default function ListViewActionBtn({
  items,
}: IListViewActionBtn) {
  const itemRef = useRef<TieredMenu | null>(null);
  return (
    <React.Fragment>
      <div className="card flex justify-content-center">
        <TieredMenu
          model={items}
          popup
          ref={itemRef}
          style={{ width: "300px" }}
        />
        <Button label="Action(s)" onClick={(e) => itemRef.current?.toggle(e)} />
      </div>
    </React.Fragment>
  );
}
