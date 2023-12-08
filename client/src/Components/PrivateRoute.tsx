import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isUserLoggedIn = localStorage.getItem("userData") ? true : false;
    return isUserLoggedIn ? <Outlet /> : <Navigate to="/" state={{
        redirectMessage: "You must be logged in to view this page",
    }} />;
}

export default PrivateRoute;