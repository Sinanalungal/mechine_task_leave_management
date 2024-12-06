import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/LoginSlice";
import Sidebar from "../../components/Sidebar";

const ManagerPrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector(
    (state) => state.login
  );
  const authTokens = localStorage.getItem("LeaveTrackTokens");

  useEffect(() => {
    if (!authTokens || !isAuthenticated) {
      dispatch(logout());
    }
  }, [authTokens, isAuthenticated, dispatch]);

  if (isAuthenticated && role === "manager" && authTokens) {
    return (
      <Sidebar>
        <Outlet />
        </Sidebar>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ManagerPrivateRoute;
