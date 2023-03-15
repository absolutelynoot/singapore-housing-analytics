import { Outlet, Link, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Header from '../Components/header'
import HdbHeaderImage from '../assets/hdb-header.jpg'
import hdbLogo from '../assets/hdb-logo.png'
import BumpChart from "../Components/bumpChart";

const Hdb = () => {

    useEffect(() => {
        document.title = 'Lofty | HDB Housing Analytics';
      }, []);

    const headerText = "HDB Housing Analytics";
    const headerDesc= "Compare prices, resale volume of flats and ammenities";
    const breadCrumbs = {
        "Home": "/",
        "HDB": "/hdb"
    }

    return (
        <>
        <Header headerImage={HdbHeaderImage} headerText={headerText} headerDesc={headerDesc} logo={hdbLogo}/>
        
        <div className="container mb-5">
            <BumpChart/>

        </div>

        </>
    )
}

export default Hdb