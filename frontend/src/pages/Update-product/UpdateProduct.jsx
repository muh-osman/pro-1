// Sass
import style from "./UpdateProduct.module.scss";
// Axios
import axios from "axios";
// React
import React, { useEffect, useRef, useState } from "react";
// Cookies
import { useCookies } from "react-cookie";
// React router
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();
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
  const editUser = async () => {
    setDisablBtn(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );

      navigate("/dashboard/products");
    } catch (err) {
      setDisablBtn(false);
      console.error(err);
    }
  };

  const fetchPlaceholderData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/product/showbyid/${id}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      setProducts(response.data);
      // setLoading(false);
      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlaceholderData();
  }, []);

  return (
    <div className={style.container}>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        Update product
      </h1>

      <form>
        <input
          className="form-control mb-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          placeholder={products[0]?.title}
          required
        />
        <input
          className="form-control mb-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          placeholder={products[0]?.description}
          required
        />
        <input
          className="form-control mb-2"
          onChange={(e) => setImage(e.target.files.item(0))}
          type="file"
          name="image"
          required
        />

        <button
          onClick={editUser}
          type="submit"
          className="btn btn-primary"
          disabled={disablBtn}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
