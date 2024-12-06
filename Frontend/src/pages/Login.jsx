import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../redux/slice/LoginSlice";

// Email and Password validation function
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

const LoginPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value) ? "" : "Invalid email address");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      validatePassword(e.target.value)
        ? ""
        : "Password must be at least 6 characters"
    );
  };

  const handleSubmit = async () => {
    // Validation before submission
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const loginData = {
        username: email,
        password: password,
      };

      const response = await dispatch(loginAsync(loginData));
      console.log(response);

      //   alert('Login successful');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white font-roboto text-gray-900 flex items-center justify-center p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src="https://media.istockphoto.com/id/1377637277/video/teamwork-and-brainstorming-concept-animation-people-think-talk-and-looking-for-new-bright.jpg?s=640x640&k=20&c=v7TWAYl5EyeDgE1qhmk5VDHpjFnuoILW2LjSt1kkmM4="
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-50"></div>
          <div className="relative z-10 p-10 flex flex-col justify-end h-full text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              Welcome to Our Platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80"
            >
              Streamline your workflow and boost productivity with our
              innovative solutions.
            </motion.p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Login Header */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500 font-medium text-lg">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>
                {emailError && (
                  <div className="text-red-500 text-sm">{emailError}</div>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>
                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}
              </div>

              {/* Forgot Password */}
              {/* <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                >
                  Forgot Password? <ArrowUpRight className="ml-1 w-4 h-4" />
                </a>
              </div> */}

              {/* Submit Button */}
              <motion.button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </motion.button>

              {/* Sign Up Link */}
              {/* <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? {' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </div> */}
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
