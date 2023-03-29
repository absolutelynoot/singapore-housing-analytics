// import libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// import components
import ErrorPage from "./errorPage";
import StandardLayout from './Layout/StandardLayout'
import Home from './Views/home'
import Hdb from './Views/hdb'
import PrivateProperty from './Views/privateProperty';
import Overview from "./DashboardViews/Overview";
import Pricing from './DashboardViews/Pricing';
import Lease from './DashboardViews/Lease';
import HousingType from './DashboardViews/HousingType';
import Location from './DashboardViews/Location';
import Transportation from './DashboardViews/Transportation';
import Parks from './DashboardViews/Parks';

// import styles
import './styles/custom.scss'
import * as bootstrap from 'bootstrap' // bootstrap js for animation ** do not delete

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StandardLayout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "hdb",
        element: <Hdb />,
        children: [
          {
            path: "overview",
            element: <Overview />
          },
          {
            path: "pricing",
            element: <Pricing />
          },
          {
            path: "lease",
            element: <Lease />
          },
          {
            path: "location",
            element:<React.StrictMode> <Location /> </React.StrictMode>
          },
          {
            path: "house-type",
            element: <HousingType />
          },
          {
            path: "transportation",
            element: <Transportation />
          },
          {
            path: "parks",
            element: <Parks />
          },
        ]
      },
      {
        path: "private-property",
        element: <PrivateProperty />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
