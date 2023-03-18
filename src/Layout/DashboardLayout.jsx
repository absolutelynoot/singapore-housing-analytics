import React from 'react'
import { Outlet } from "react-router-dom";
import Sidenav from '../Components/Sidenav';

const DashboardLayout = ({sideNavData}) => {
  return (
    <div className="container px-0">
        <div className="row">
            <div className="col-2">
                <Sidenav sideNavData={sideNavData}/>
            </div>
            <div className="col-9">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout