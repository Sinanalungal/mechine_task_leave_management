import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  ClipboardList,
  UserCheck,
  UserCircle2,
  LogOut,
  Zap,
  Menu,
  X,
  UserPlus,
} from "lucide-react";

import LogoutConfirmationModal from "./LogoutConfimationModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/LoginSlice";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { isAuthenticated, role } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsLogoutModalOpen(false);
  };
  const sidebarItemsForUser = [
    {
      icon: ClipboardList,
      label: "Apply Leave",
      path: "/apply-leave",
      gradient: "from-slate-900 to-gray-500",
    },
    {
      icon: Calendar,
      label: "Leave Calendar",
      path: "/leave-calendar",
      gradient: "from-slate-900 to-gray-500",
    },
  ];

  const sidebarItemsForManager = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/",
      gradient: "from-slate-900 to-gray-500",
    },
    {
      icon: UserPlus,
      label: "Add Users",
      path: "/add-user",
      gradient: "from-slate-900 to-gray-500",
    },

    {
      icon: UserCheck,
      label: "Leave Approvals",
      path: "/leave-approvals",
      gradient: "from-slate-900 to-gray-500",
    },
    {
      icon: UserCircle2,
      label: "Profile",
      path: "/profile",
      gradient: "from-slate-900 to-gray-500",
    },
  ];
  const sidebarItems =
    role === "employee" ? sidebarItemsForUser : sidebarItemsForManager;

  const handleNavigation = (path, isMobile = false) => {
    navigate(path);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  const renderSidebarContent = (isMobile = false) => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center justify-center space-x-3"
      >
        <img src="/logo.png" className="object-contain max-h-[100px] " alt="LeaveTracker" />
      </motion.div>

      <nav className="space-y-4 flex-grow">
        {sidebarItems.map((item) => (
          <motion.div
            key={item.path}
            onClick={() => handleNavigation(item.path, isMobile)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${
              location.pathname === item.path
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl`
                : "hover:bg-gray-100 text-gray-600 bg-white"
            }`}
          >
            {location.pathname === item.path && (
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20`}
              ></div>
            )}
            <item.icon
              className={`mr-4 w-6 h-6 ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-400 group-hover:text-gray-700 transition-colors"
              }`}
            />
            <span className="font-semibold relative z-10">{item.label}</span>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="mt-6 flex items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-all duration-300 text-gray-600 hover:text-gray-800 relative z-50"
      >
        <LogOut className="mr-4 w-6 h-6" />
        <span className="font-semibold">Logout</span>
      </motion.div>
    </>
  );

  return (
    <div className="flex  min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block h-screen overflow-y-scroll bg-white text-gray-800 w-80 p-6 flex flex-col shadow-2xl font-inter relative overflow-hidden border-r">
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-indigo-50/50 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-50/50 rounded-full"></div>
        {renderSidebarContent()}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 h-screen overflow-y-scroll ">
        <Outlet />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-full"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto lg:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 z-50 bg-gray-100 p-2 rounded-full"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <div className="p-6 flex flex-col min-h-screen">
              {renderSidebarContent(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={confirmLogout}
      />
    </div>
  );
};

export default Sidebar;
