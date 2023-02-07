import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useClientContext } from "../../contexts/ClientContext";
import { CircularProgress, Container } from "@mui/material";

const ProtectedRoutes = () => {
  const { loading } = useClientContext();
  const location = useLocation();

  const token = localStorage.getItem("@client:token");

  if (loading) {
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
