// Axios
import axios from "axios";
// React
import React, { useEffect, useRef, useState } from "react";
//
import { useCookies } from "react-cookie";

export default function PopupModal({ name, email, id, fetchData }) {
  const btn = useRef(null);

  const [disablBtn, setDisablBtn] = useState(false);

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: "",
    confirm: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [cookies, setCookie] = useCookies(["token"]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const editUser = async (id) => {
    setDisablBtn(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/update/${id}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      // console.log(response);
      await fetchData();
      btn.current.click();
    } catch (err) {
      setDisablBtn(false);
      console.error(err);
    }
  };

  return (
    <div
      className="modal fade"
      id={`exampleModal${id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update data
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <input
                className="form-control mb-2"
                onChange={handleInputChange}
                value={formData.name}
                type="text"
                name="name"
                placeholder={name}
                required
              />
              <input
                className="form-control mb-2"
                onChange={handleInputChange}
                value={formData.email}
                type="email"
                name="email"
                placeholder={email}
                required
              />
              <input
                className="form-control mb-2"
                onChange={handleInputChange}
                value={formData.password}
                type="password"
                name="password"
                placeholder="********"
                required
              />
            </form>
          </div>

          <div className="modal-footer">
            <button
              ref={btn}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setDisablBtn(false)}
            >
              Close
            </button>
            <button
              onClick={() => editUser(id)}
              // type="button"
              type="submit"
              className="btn btn-primary"
              disabled={disablBtn}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
