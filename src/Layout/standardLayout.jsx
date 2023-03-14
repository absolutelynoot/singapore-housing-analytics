import Navbar from '../Components/navbar'
import { Outlet, Link, useLoaderData, } from "react-router-dom";

const StandardLayout = () => {

    const { hdbParams } = useLoaderData();

    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    )
}

export default StandardLayout