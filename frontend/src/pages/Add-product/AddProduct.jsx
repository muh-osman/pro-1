// Sass
import style from "./AddProduct.module.scss";
// Cookies
import { useCookies } from "react-cookie";
// React
import { useState } from "react";
// React router
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disablBtn, setDisablBtn] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  const [cookies, setCookie] = useCookies(["token"]);
  const apiUrl = process.env.REACT_APP_API_URL;
  async function handleSubmit(e) {
    e.preventDefault();
    setDisablBtn(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/product/create`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      // console.log(response);
      navigate("/dashboard/products");
    } catch (err) {
      setDisablBtn(false);
      console.error(err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className={style.container}>
      <h1 className="mb-4"></h1>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <input
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          placeholder="Description"
          required
        />
        <input
          className="form-control"
          onChange={(e) => setImage(e.target.files.item(0))}
          type="file"
          name="image"
          required
        />

        <button className="btn btn-primary" disabled={disablBtn}>
          Add product
        </button>
      </form>
    </div>
  );
}
