// React router
import { Link } from "react-router-dom";
// React
import { useContext } from "react";
// SASS
import style from "./Navbar.module.scss";
// Logo
import logo from "../../assets/images/uniswap-uni-logo.png"
// Context
import { UserContext } from "../../contexts/UserProvider";


export default function Navbar() {

  const { userAuth, setUserAuth } = useContext(UserContext);


  return (
    <nav className="navbar navbar-expand-lg text-white bg-dark">
      <div className="container">
        <Link style={{padding: 0}} to="/" className="navbar-brand text-white">
          <img className={style.logo} src={logo} alt="logo" />
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
            <li className="nav-item">
              <Link to="/" className="nav-link active text-white" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="dashboard" className="nav-link active text-white  " aria-current="page">
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {!userAuth.token ? (
              <>
                <Link to="signup" className="btn btn-outline-primary me-2">
                  SignUp
                </Link>

                <Link to="login" className="btn btn-primary">
                  LogIn
                </Link>
              </>
            ) : (
              <button onClick={()=> setUserAuth({
                token: "",
                name: "",
                id: "",
                email: "",
              })} className="btn btn-outline-primary">
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
