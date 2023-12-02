// React
import { useState, useContext, useLayoutEffect, useEffect } from "react";
// React router
import { useNavigate } from "react-router-dom";
// SASS
import style from "./SignUp.module.scss";
// Axios
import axios from "axios";
// Icons
import { FaLock } from "react-icons/fa6";
// Cookie
import { useCookies } from 'react-cookie';



export default function SignUp() {

  const [cookies, setCookie] = useCookies(['token']);


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState(null);
  const [disablBtn, setDisablBtn] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  async function handleSubmit(e) {
    e.preventDefault();
    setDisablBtn(true);
    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password,
      });

      
      const token = response.data.data.token
      const name = response.data.data.user.name
      const email = response.data.data.user.email
      const id = response.data.data.user.id


      setCookie('token', token, { path: '/' });
      // setCookie('name', name, { path: '/' });
      // setCookie('email', email, { path: '/' });
      // setCookie('id', id, { path: '/' });

      navigate("/", { replace: true })

    } catch (err) {
      setDisablBtn(false);
      console.error(err);
      setError(err.response.data.message);
    }
  }

  useEffect(() => {
    cookies.token && navigate("/")
  }, [])

  return (
    <div className={style.container}>
      <h1 className="mb-4">
        <FaLock />
      </h1>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          onChange={handleInputChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          className="form-control"
          onChange={handleInputChange}
          value={formData.email}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="form-control"
          onChange={handleInputChange}
          value={formData.password}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {/* <input
          className="form-control"
          onChange={handleInputChange}
          value={formData.confirm}
          type="password"
          name="confirm"
          placeholder="Confirm password"
          required
        /> */}
        <button className="btn btn-primary" disabled={disablBtn}>
          Sign up
        </button>
      </form>
    </div>
  );
}
