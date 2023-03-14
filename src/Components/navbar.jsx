import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
        <nav className="navbar py-3 mb-4 border-bottom navbar-expand-lg shadow-sm">
        <div className="container-fluid px-5">
            <a className="navbar-brand brand fs-3" href="#">Lofty | <span>SG Housing Analytics</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ms-auto me-3 fs-5 border-end mb-2 mb-lg-0">
                    <li className="nav-item mx-3">
                    <a href={`/hdb`} className="nav-link fw-semibold">HDB</a>
                    </li>
                    <li className="nav-item mx-3">
                    <a href={`/private_property`} className="nav-link fw-semibold">Private Property</a>
                    </li>
                    <li className="nav-item mx-3">
                    <a href={`/about`} className="nav-link fw-semibold">About</a>
                    </li>
                </ul>
            </div>
            <button className="btn btn-danger fw-bold" type="submit">
                <FontAwesomeIcon className="me-2" icon={faMugHot} />
                Buy us a coffee
            </button>
        </div>
        </nav>
  )
}

export default Navbar

