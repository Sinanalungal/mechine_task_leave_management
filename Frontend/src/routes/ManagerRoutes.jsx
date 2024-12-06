import { Suspense } from "react";
import ManagerPrivateRoute from "./private-routes/ManagerPrivateRoute";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
// import LeaveApplication from '../components/LeaveApplication';
// import LeaveCalendar from '../components/LeaveCalendar';
import LeaveApprovals from '../components/LeaveApprovals';
import Profile from '../components/Profile';
import AddUserComponent from "../components/AddUsers";

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
