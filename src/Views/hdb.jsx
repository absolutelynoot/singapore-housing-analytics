import { useEffect } from "react";
import Header from "../Components/Header";
import HdbHeaderImage from "../assets/hdb-header.jpg";
import hdbLogo from "../assets/hdb-logo.png";
import BumpChart from "../Components/BumpChart";
import LineChart from "../Components/LineChartHDBTransactions";
import BarChart from "../Components/BarChartHDBAveragePriceSQM";
import Overview from "../DashboardViews/Overview";
import DashboardLayout from "../Layout/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import Pricing from "../DashboardViews/Pricing";
import Lease from "../DashboardViews/Lease";
import HousingType from "../DashboardViews/HousingType";
import Location from "../DashboardViews/Location";
import Transportation from "../DashboardViews/Transportation";
import Parks from "../DashboardViews/Parks";

const sideNavData = [
    { 
      name: 'Overview', 
      path: '/hdb/',
    },
    {
      name : 'General Analysis',
      path : '/hdb/',
      subPages: [
        {
          name: 'Pricing Analysis',
          path: 'pricing'
        },
        {
          name: 'Lease Analysis',
          path: 'lease'
        },
        {
          name: 'Location Analysis',
          path: 'location'
        },
        {
          name: 'Housing Types',
          path: 'house-type'
        },
      ]
    },
    {
        name : 'Ammenties Analysis',
        path : '/hdb/',
        subPages: [
          {
            name: 'Transporation Analysis (coming soon)',
            path: 'transportation'
          },
          {
            name: 'Park and other ammenities (coming soon)',
            path: 'parks'
          }
        ]
      }
  ]

const Hdb = () => {
  useEffect(() => {
    document.title = "Lofty | HDB Housing Analytics";
  }, []);

  const headerText = "HDB Housing Analytics";
  const headerDesc = "Compare prices, resale volume of flats and ammenities";
  const breadCrumbs = {
    Home: "/",
    HDB: "/hdb",
  };

  return (
    <>
      <Header
        headerImage={HdbHeaderImage}
        headerText={headerText}
        headerDesc={headerDesc}
        logo={hdbLogo}
      />

      <Routes>
        <Route path="/" element={<DashboardLayout sideNavData={sideNavData}/>}>
            <Route index element={<Overview />} />
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="lease" element={<Lease/>}/>
            <Route path="location" element={<Location/>}/>
            <Route path="house-type" element={<HousingType/>}/>
            <Route path="transportation" element={<Transportation/>}/>
            <Route path="parks" element={<Parks/>}/>
        </Route>
      </Routes>

    </>
  );
};

export default Hdb;
