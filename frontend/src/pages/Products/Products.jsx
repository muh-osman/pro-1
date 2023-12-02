// React
import { useContext, useEffect, useState } from "react";
// Sass
import style from "./Product.module.scss";
// Axios
import axios from "axios";
// Icons
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
// Cookie
import { useCookies } from "react-cookie";
// React router
import { Link } from "react-router-dom";


export default function Product() {

  const [cookies, setCookie] = useCookies(['token']);


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/product/show`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      setProducts(response.data);
      setLoading(false);
      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/product/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };



  const table = products.map((product) => (
    <tr key={product.id}>
      <th scope="row">{product.id}</th>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <div className={style.btn_box}>
          <Link to={`${product.id}`}>
            <FaPenToSquare />
          </Link>

          <button onClick={() => deleteProduct(product.id)}>
            <FaTrashCan />
          </button>
        </div>

      </td>
    </tr>
  ));

  return (
    <div className={style.container}>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      )}
    </div>
  );
}
