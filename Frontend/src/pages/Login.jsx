import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowUpRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../redux/slice/LoginSlice";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required")
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const loginData = {
        username: values.email,
        password: values.password,
      };

      const response = await dispatch(loginAsync(loginData));
      console.log(response);
      setSubmitting(false);
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ submit: "Login failed. Please try again." });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto text-gray-900 flex items-center justify-center p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/475/353/non_2x/annual-leave-happy-businessman-running-with-luggage-from-calendar-with-annual-leave-note-modern-flat-illustration-vector.jpg"
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent opacity-50"></div>
          <div className="relative z-10 p-10 flex flex-col justify-end h-full text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl text-gray-800 font-bold mb-4"
            >
              Welcome to Our Platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600/80"
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
              <h1 className="text-4xl font-black tracking-tight text-black mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 font-medium text-lg">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
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
                      <Field
                        type="email"
                        name="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        placeholder="you@gmail.com"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
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
                      <Field
                        type="password"
                        name="password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        placeholder="Enter your password"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </motion.button>

                  {/* Global Form Error */}
                  {errors.submit && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {errors.submit}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;