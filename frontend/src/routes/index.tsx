import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to={""} />} />
      <Route path="" element={<Login />} />
      <Route path="register/" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
