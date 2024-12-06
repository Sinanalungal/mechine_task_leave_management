import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserPrivateRoute from "./private-routes/UserPrivateRoute";
import LeaveApplication from '../pages/LeaveApplication';
import LeaveCalendar from '../pages/LeaveCalendar';

function UserRoutes() {


  return (
    <Suspense
      fallback={
        <div>Loading...................</div>
       
      }
    >
      <Routes>
        <Route path="*" element={<UserPrivateRoute />}>
            <Route path="" element={<div>Dashboard</div>} />
            <Route path="apply-leave" element={<LeaveApplication />} />
            <Route path="leave-calendar" element={<LeaveCalendar />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
