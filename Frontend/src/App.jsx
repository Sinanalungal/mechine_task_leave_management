import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Import components
import Login from "./pages/Login";
import UserRoutes from "./routes/UserRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  // const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, role } = useSelector((state) => state.login);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        <Route>
          <Route
            path="/*"
            element={role == "manager" ? <ManagerRoutes /> : <UserRoutes />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
