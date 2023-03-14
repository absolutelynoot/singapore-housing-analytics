import Navbar from '../Components/navbar'
import { Outlet, Link, useLoaderData, } from "react-router-dom";

const StandardLayout = () => {


    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    )
}

export default StandardLayout