import { Outlet, Link, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Header from '../Components/header'
import HdbHeaderImage from '../assets/hdb-header.jpg'
import hdbLogo from '../assets/hdb-logo.png'
import BreadCrumbs from "../Components/breadCrumbs";

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
        
        <div className="container mt-5">
            <div className="list-group">
                <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                    The current button
                </button>
                <Link className="text-link" to={`hdb/1`}><button type="button" className="list-group-item list-group-item-action">A second button item</button></Link>
                <button type="button" className="list-group-item list-group-item-action">A third button item</button>
                <button type="button" className="list-group-item list-group-item-action">A fourth button item</button>
         

            </div>

        </div>

        </>
    )
}

export default Hdb