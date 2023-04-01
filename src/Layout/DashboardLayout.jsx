import React from 'react'
import { Outlet } from "react-router-dom";
import Sidenav from '../Components/Sidenav';
import TwitterTimeline from '../Components/TwitterTimeline';

const DashboardLayout = ({sideNavData}) => {
  return (
    <div className="container-fluid ms-5 me-5">
        <div className="row gx-4">
            <div className="col-2">
                <Sidenav sideNavData={sideNavData}/>
            </div>
            <div className="col-7">
                <Outlet/>
            </div>
            <div className="col-2">
                <TwitterTimeline screenName="SingaporeHDB"/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout