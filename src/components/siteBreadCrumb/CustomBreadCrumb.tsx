import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ICountry } from "../../interfaces/interfaces";
import { CountryContext } from "../../contexts/country/CountryContext";

import noFlag from "/images/noFlag.png";

export default function CustomBreadCrumb() {
  
  const location = useLocation();

  const { browsedCountry } = useContext(CountryContext);
  const locationPathnames = location.pathname.split("/");
  let pathnames = locationPathnames;
  const [breadCrumbItemLabels, setBreadCrumbItemLabels] = useState<string[]>([]);

  useEffect(() => {
    let pathNameJoined = "";
    const newBreadCrumbItemLabels: string[] = [];

    pathnames.forEach((pathName) => {
      if (pathName.length === 0) {
        newBreadCrumbItemLabels.push("/");
      } else {
        pathNameJoined += "/" + pathName;
        newBreadCrumbItemLabels.push(pathNameJoined);
      }
    });

    setBreadCrumbItemLabels(newBreadCrumbItemLabels);
  }, [location]);

  const breadcrumbHomeTemplate = () => {
    return (
      <Link to="/">
        <i className="pi pi-home" style={{ fontSize: "1.5rem" }}></i>
      </Link>
    );
  };

  const renderSimpleEndpoint = (label: string) => {
    return <span>{label}</span>;
  };

  const renderCountryEndpoint = (country: ICountry | null) => {
    return (
      <div>
        <img
          src={country?.flagsInfo?.png  || noFlag }
          alt={country?.flagsInfo?.alt}
          style={{ width: "50px", height: "30px" }}
          title={country?.names?.common}
        ></img>
      </div>
    );
  };

  const breadcrumbEndpointTemplate = (path: string, isLink: boolean) => {
    let lastEndpointInPath = path.replace("%20", " ").split("/").pop();
    let breadcrumbLabel =lastEndpointInPath?.charAt(0).toUpperCase() + "" + lastEndpointInPath?.slice(1);

    const endpointContent = browsedCountry?.names?.common !== lastEndpointInPath
                                          ? renderSimpleEndpoint(breadcrumbLabel)
                                          : renderCountryEndpoint(browsedCountry);

    return (
      <>
        {isLink ? (
          <Link to={path} className="text-center"> {endpointContent} </Link>
        ) : (
          <>{endpointContent}</>
        )}
      </>
    );
  };

  return (
    <div className="flex items-center text-center justify-start">
      {breadCrumbItemLabels.map((label, index) => (
        <div key={index}>
          {index === 0
            ? breadcrumbHomeTemplate()
            : breadcrumbEndpointTemplate(
                label,
                index < breadCrumbItemLabels.length - 1,
              )}
          {index < breadCrumbItemLabels.length - 1 && (
            <i className="pi pi-angle-right" style={{ fontSize: "1.5rem" }}></i>
          )}
        </div>
      ))}
    </div>
  );
}
