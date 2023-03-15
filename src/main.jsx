// import react libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// import components
import ErrorPage from "./errorPage";
import StandardLayout from './Layout/standardLayout'
import Home from './Views/home'
import Hdb from './Views/hdb'
import PrivateProperty from './Views/privateProperty';

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
      },
      {
        path: "private_property",
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
