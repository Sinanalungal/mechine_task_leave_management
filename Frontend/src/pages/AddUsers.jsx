import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { getAxiosInstance } from "../utils/axiosInstance";

// Validation Schema
const AddUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  
  department: Yup.string()
    .required("Department is required")
    .min(2, "Department must be at least 2 characters"),
  
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref('password'), null], "Passwords must match")
});

const AddUserComponent = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("/user_authentication/users/", {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        department: values.department,
        password: values.password,
        username: values.email,
      });

      if (response.status === 201) {
        toast.success("User added successfully!");
        resetForm();
      } else {
        throw new Error("Failed to add user");
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Object.keys(data).forEach((field) => {
            if (field !== "username") {
              toast.error(
                `${field.charAt(0).toUpperCase() + field.slice(1)}: ${data[field].join(" ")}`
              );
            }
          });
          setErrors(data);
        } else {
          toast.error(`Unexpected error occurred. Status: ${status}`);
        }
      } else {
        toast.error("Failed to add user. Please check your network connection.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-8 rounded-lg font-roboto max-sm:text-xs text-sm xl:text-base bg-white">
       {/* Header Section */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-10 space-y-4 md:space-y-0">
        <div className="text-center md:text-left w-full">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 mb-2">
            Add New User
          </h1>
          <p className="text-gray-500/80 font-medium text-base sm:text-lg">
            Fill in the user details to add a new user.
          </p>
        </div>
      </div>

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          department: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={AddUserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="sm:grid grid-cols-2 max-sm:space-y-3 gap-6">
            {/* First Name */}
            <div>
              <label 
                htmlFor="first_name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <Field
                name="first_name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter first name"
              />
              {errors.first_name && touched.first_name && (
                <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label 
                htmlFor="last_name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <Field
                name="last_name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter last name"
              />
              {errors.last_name && touched.last_name && (
                <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>
              )}
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter email address"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="phone_number" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <Field
                name="phone_number"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter phone number"
              />
              {errors.phone_number && touched.phone_number && (
                <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>
              )}
            </div>

            {/* Department */}
            <div>
              <label 
                htmlFor="department" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department
              </label>
              <Field
                name="department"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter department"
              />
              {errors.department && touched.department && (
                <div className="text-red-500 text-sm mt-1">{errors.department}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Enter password"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label 
                htmlFor="confirm_password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <Field
                name="confirm_password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                placeholder="Confirm password"
              />
              {errors.confirm_password && touched.confirm_password && (
                <div className="text-red-500 text-sm mt-1">{errors.confirm_password}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-2  mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full bg-slate-800 font-medium text-white py-3 rounded-xl 
                  hover:bg-gray-800 transition-all 
                  disabled:opacity-50
                "
              >
                {isSubmitting ? 'Adding User...' : 'Add User'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUserComponent;