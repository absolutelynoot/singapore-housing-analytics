import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import LoftyLogo from "../assets/lofty-logo.png";
import SingaporeFlag from "../assets/sg-flag.png";

const Navbar = () => {
  return (
    <nav className="navbar py-3 mb-0 border-bottom navbar-expand-xl shadow">
      <div className="container-fluid px-5">
        <a className="navbar-brand brand fs-3" href={`/`}>
          <img alt="logo" className="border-end pe-3 brand img-fluid d-none d-md-inline" src={LoftyLogo} />
          <img
            src={SingaporeFlag}
            alt="singapore-flag"
            className="ms-4 brand-sm d-none d-lg-inline border"
          />
          <span className="ms-3 fs-sm-5 fs-md-2">SG Housing Analytics</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto me-3 fs-5 mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <a href={`/`} className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item mx-3">
              <a href={`/hdb`} className="nav-link">
                HDB
              </a>
            </li>
            <li className="nav-item mx-3">
              <a href={`/private_property`} className="nav-link">
                Private Property
              </a>
            </li>
            <li className="nav-item ms-lg-3 p-0 align-self-lg-center">
              <button className="btn btn-danger fw-bold" type="submit">
                <FontAwesomeIcon className="me-2" icon={faMugHot} />
                Buy us a coffee
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
