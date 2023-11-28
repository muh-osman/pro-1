// React router
import { useEffect, useState } from "react";
// Sass
import style from "./Users.module.scss";
// Axios
import axios from "axios";
// Icons
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
// Components
import PopupModal from "../../components/PopupModal/PopupModal";

export default function Users() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchData = async()=> {
    try {
      const response = await axios.get(`${apiUrl}/api/user/show`);
      setusers(response.data);
      setLoading(false);
      // console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/user/delete/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const table = users.map((user) => (
    <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className={style.btn_box}>
          <button data-bs-toggle="modal" data-bs-target={`#exampleModal${user.id}`}>
            <FaPenToSquare />
          </button>

          <button onClick={() => deleteUser(user.id)}>
            <FaTrashCan />
          </button>
        </div>

        <PopupModal name={user.name} email={user.email} id={user.id} fetchData={fetchData} />

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
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      )}
    </div>
  );
}
