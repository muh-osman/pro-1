// React
import { useContext, useState } from "react";
// SASS
import style from "./Login.module.scss";
// Axios
import axios from "axios";
// Icons
import { BiLogIn } from "react-icons/bi";
// 
import { UserContext } from "../../contexts/UserProvider";
// 
import { useNavigate } from "react-router-dom";



export default function Login() {


  const { userAuth, setUserAuth } = useContext(UserContext);

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post(`${apiUrl}/api/login`, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);

      const token = response.data.data.token
      const name = response.data.data.user.name
      const email = response.data.data.user.email
      const id = response.data.data.user.id

      // console.log(token, name, email, id)

      setUserAuth({token, name, email, id})
      navigate("/", { replace: true })

    } catch (err) {
      setDisablBtn(false);
      console.error(err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className={style.container}>
      <h1 className="mb-1">
        <BiLogIn />
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
        <button className="btn btn-primary" disabled={disablBtn}>
          Login
        </button>
      </form>
    </div>
  );
}
