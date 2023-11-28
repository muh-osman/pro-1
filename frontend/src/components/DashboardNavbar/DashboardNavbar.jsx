// React router
import { Link } from "react-router-dom";
// Logo
import logo from "../../assets/images/uniswap-uni-logo.png"

export default function DashboardNavbar() {
  return (
    <nav className="navbar navbar-expand-lg text-white bg-dark">
    <div className="container">
      <Link style={{padding: 0}} to="/" className="navbar-brand text-white">
        <img  width="40" src={logo} alt="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{backgroundColor: "#ff007a"}}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* <li className="nav-item">
          <Link
            to="dashboard"
            className="nav-link active"
            aria-current="page"
          >
            Dashboard
          </Link>
        </li> */}
        </ul>

        <div className="d-flex">
          <Link to="/" className="btn btn-primary me-2">
            Go to website
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
}
