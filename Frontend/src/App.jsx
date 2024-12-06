import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

// Import components
import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import LeaveApplication from './components/LeaveApplication';
// import LeaveCalendar from './components/LeaveCalendar';
// import LeaveApprovals from './components/LeaveApprovals';
// import Profile from './components/Profile';
import Login from './components/Login';
// import RegisterPage from './components/Register';
// import OTPVerificationPage from './components/OtpVerification';
import UserRoutes from './routes/UserRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';


function App() {
  // const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, role } = useSelector(
    (state) => state.login
  );
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  // };

  // Layout component that includes Sidebar
  // const LayoutWithSidebar = () => (
  //   <div className="flex h-screen bg-gray-100">
  //     <Sidebar 
  //       activeTab={activeTab} 
  //       setActiveTab={setActiveTab}
  //       onLogout={handleLogout}
  //     />
  //     <div className="flex-grow p-6 overflow-auto">
  //       <Outlet />
  //     </div>
  //   </div>
  // );

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* <Route path="register" element={<RegisterPage  />} />
        <Route path="otp" element={<OTPVerificationPage  />} /> */}

        <Route >
          {/* {isAuthenticated && role == 'user' && <Route path="/user/*" element={<UserRoutes />} />} */}
          <Route path="/*" element={role=='manager' ?<ManagerRoutes />:<UserRoutes />} />
        </Route>

        {/* 404 Not Found Route */}
        {/* <Route 
          path="*" 
          element={
            isAuthenticated ? (
              <Sidebar>
                <div className="text-center text-2xl text-gray-600">
                  404 - Page Not Found
                </div>
              </Sidebar>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        /> */}
      </Routes>
    </Router>
  );
}

export default App;