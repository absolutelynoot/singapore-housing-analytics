import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidenav = ({ sideNavData }) => {
  const location = useLocation();
  return (
    <div className="border-end pe-4">
      {sideNavData.map((item) => (
        <React.Fragment key={item.name}>
          <nav className="nav nav-pills flex-column">
            <Link
              className={`nav-link fw-bold fs-5 ${(location.pathname == item.path && !("subPages" in item)) ? "active" : ""} ${("subPages" in item) ? "pe-none" : "" }`}
              to={`${item.path}`}
            >
              {item.name}
            </Link>
            {item.subPages &&
              item.subPages.map((subItem) => (
                <React.Fragment key={subItem.name}>
                  <nav className="nav nav-pills flex-column">
                    <Link
                      className={`nav-link ms-3 my-1 ${
                        location.pathname == item.path+subItem.path ? "active" : ""
                      }`}
                      to={`${subItem.path}`}
                    >
                      {subItem.name}
                    </Link>
                  </nav>
                </React.Fragment>
              ))}
          </nav>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidenav;
