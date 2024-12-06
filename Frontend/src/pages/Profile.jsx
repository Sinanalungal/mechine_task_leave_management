import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Mail,
  Calendar,
  Clock,
  Edit,
  Save,
  Camera,
  ArrowUpRight,
  UserCircle,
  Briefcase,
  Phone,
} from "lucide-react";
import { getAxiosInstance } from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
    phone_number: "",
    profilePicture: null,
    created_time: "",
    leaveBalance: {
      annual: 20,
      sick: 10,
      compassionate: 5,
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const { isAuthenticated, role } = useSelector((state) => state.login);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get("/user_authentication/users/");

        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          const updatedProfile = {
            name: `${userData.first_name} ${userData.last_name}`.trim(),
            email: userData.email,
            department: userData.department,
            phone_number: userData.phone_number,
            profilePicture:
              userData.profile_picture ?? "https://via.placeholder.com/150",
            created_time: userData.created_time ?? "N/A",
            leaveBalance: {
              annual: 20,
              sick: 10,
              compassionate: 5,
            },
          };

          console.log(response, userData);

          setProfile(updatedProfile);
          setFormData(updatedProfile);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user profile");
        setIsLoading(false);
        console.error("Profile fetch error:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleSaveProfile = async () => {
    try {
      const axiosInstance = await getAxiosInstance();

      // Create FormData for multipart/form-data upload
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("first_name", formData.name.split(" ")[0]);
      formDataToSubmit.append(
        "last_name",
        formData.name.split(" ").slice(1).join(" ")
      );
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone_number", formData.phone_number);
      formDataToSubmit.append("department", formData.department);

      // Append profile picture if a new file is selected
      if (profilePictureFile) {
        formDataToSubmit.append("profile_picture", profilePictureFile);
      }
      const token = localStorage.getItem("LeaveTrackTokens");
      const decodedToken = parseJwt(token);
      console.log(decodedToken);

      const userId = decodedToken.user_id;
      // Send PATCH request with multipart/form-data
      await axiosInstance.patch(
        `/user_authentication/users/${userId}/`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local state
      setProfile(formData);
      setEditMode(false);

      // Reset profile picture file
      setProfilePictureFile(null);
    } catch (err) {
      console.error("Profile update error:", err);
      // Check if the error has a response and display the message from the response
      if (err.response && err.response.data && err.response.data.email) {
        alert(`${err.response.data.email[0]}`);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.phone_number
      ) {
        alert(err.response.data.phone_number[0]);
      } else {
        alert("An unexpected error occurred while updating the profile.");
      }
    }
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePictureFile(file);

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  max-sm:text-sm font-roboto text-gray-900 p-4 sm:p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="container mx-auto max-w-7xl space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              User Profile
            </h1>
            <p className="text-gray-500 font-medium text-base sm:text-lg">
              Manage your professional information
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={editMode ? handleSaveProfile : handleEditProfile}
            className={`
                            flex items-center px-4 py-2 rounded-lg transition-all duration-300
                            ${
                              editMode
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            } font-semibold text-sm
                        `}
          >
            {editMode ? (
              <>
                <Save className="mr-2 w-4 h-4" /> Save Profile
              </>
            ) : (
              <>
                <Edit className="mr-2 w-4 h-4" /> Edit Profile
              </>
            )}
          </motion.button>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="relative inline-block mb-4 w-full flex justify-center">
              <div className="relative">
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-48 h-48 object-cover rounded-xl mx-auto mb-4 shadow-md"
                />
                {editMode && (
                  <label className="absolute bottom-2 right-1/2 transform translate-x-1/2 bg-indigo-500 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-xl font-bold text-center mb-2 border-b pb-1 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-gray-600 text-center">
                  {profile.department ?? "not updated"}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-center">
                  {profile.name}
                </h2>
                <p className="text-gray-600 text-center">
                  {profile.department}
                </p>
              </>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
                <Users className="mr-3" /> Contact Information
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 flex items-center font-semibold">
                  <Mail className="mr-2 text-indigo-500" /> Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-b pb-1 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 flex items-center font-semibold">
                  <Phone className="mr-2 text-indigo-500" /> Phone
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full border-b pb-1 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.phone_number}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 flex items-center font-semibold">
                  <Briefcase className="mr-2 text-indigo-500" /> Department
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border-b pb-1 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.department}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 flex items-center font-semibold">
                  <Calendar className="mr-2 text-indigo-500" /> Hire Date
                </label>
                <p className="text-gray-600">
                  {formatDate(profile.created_time)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leave Balance */}
        {role != "manager" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center">
                <Clock className="mr-3" /> Leave Balance
              </h3>
              <button className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium flex items-center">
                View Details <ArrowUpRight className="ml-2 w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-50 p-4 rounded-lg hover:shadow-lg transition-all"
              >
                <h4 className="text-indigo-800 font-semibold mb-2">
                  Annual Leave
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                    {profile.leaveBalance.annual} days
                  </p>
                  <Calendar className="text-indigo-500" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-50 p-4 rounded-lg hover:shadow-lg transition-all"
              >
                <h4 className="text-emerald-800 font-semibold mb-2">
                  Sick Leave
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                    {profile.leaveBalance.sick} days
                  </p>
                  <UserCircle className="text-emerald-500" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-amber-50 p-4 rounded-lg hover:shadow-lg transition-all"
              >
                <h4 className="text-amber-800 font-semibold mb-2">
                  Compassionate Leave
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl sm:text-2xl font-bold text-amber-600">
                    {profile.leaveBalance.compassionate} days
                  </p>
                  <Clock className="text-amber-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
