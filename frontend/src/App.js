//React router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Pages & Components
import SignUp from './pages/SignUp/SignUp';
import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/Users/Users";
import Create from "./pages/Create/Create";
// 
import RequireAuth from "./protected-routes/RequireAuth";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
          <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
          </Route>

          <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="create" element={<Create />} />
              </Route>
          </Route>

      </Route>
    )
  );


  return (
    < >
      <RouterProvider router={router} />
    </>
  );
}

export default App;
