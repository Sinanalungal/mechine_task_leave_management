import { Suspense } from "react";
import ManagerPrivateRoute from "./private-routes/ManagerPrivateRoute";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LeaveApprovals from '../pages/LeaveApprovals';
import Profile from '../pages/Profile';
import AddUserComponent from "../pages/AddUsers";

function ManagerRoutes() {


  return (
    <Suspense
      fallback={
        <div>Loading...................</div>
      }
    >
      <Routes>
        <Route path="*" element={<ManagerPrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="leave-approvals" element={<LeaveApprovals />} />
          <Route path="add-user" element={<AddUserComponent />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ManagerRoutes;
