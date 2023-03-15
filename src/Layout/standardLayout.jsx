import Navbar from '../Components/navbar'
import Footer from '../Components/footer'
import { Outlet, Link, useLoaderData, } from "react-router-dom";

const StandardLayout = () => {


    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer />
        </>
    )
}

export default StandardLayout