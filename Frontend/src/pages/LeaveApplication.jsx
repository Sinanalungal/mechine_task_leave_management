import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAxiosInstance } from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { LeaveApplicationHeader } from "../components/LeaveApplication/LeaveApplicationHeader";
import { LeaveTypeSelector } from "../components/LeaveApplication/LeaveTypeSelector";
import { DateRangeSelector } from "../components/LeaveApplication/DateRangeSelector";
import { ReasonInput } from "../components/LeaveApplication/ReasonInput";
import { ContactDetailsInput } from "../components/LeaveApplication/ContactDetailsInput";
import { LeaveApplicationAlert } from "../components/LeaveApplication/LeaveApplicationAlert";
import { SubmitButton } from "../components/LeaveApplication/SubmitButton";

const LeaveApplication = () => {
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    contact_details: "",
  });
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = await getAxiosInstance();

        // Fetch leave types
        const leaveTypesResponse = await axiosInstance.get(
          "/leave/leave-types/"
        );
        setLeaveTypes(leaveTypesResponse.data);
      } catch (error) {
        toast.error("Failed to load leave information");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const axiosInstance = await getAxiosInstance();

      // Validate form data
      if (!formData.leave_type || !formData.start_date || !formData.end_date) {
        toast.error("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }

      // Submit leave application
      await axiosInstance.post("/leave/leave-applications/", {
        leave_type: Number(formData.leave_type),
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason,
        contact_details: formData.contact_details,
      });

      // Show success message
      toast.success("Leave application submitted successfully");

      // Reset form
      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
        contact_details: "",
      });
    } catch (error) {
      // Handle error
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        "Failed to submit leave application";
      toast.error(errorMsg);
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white font-inter text-gray-900 px-4 py-6 sm:p-6 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="container mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <LeaveApplicationHeader />

        {/* Form Container */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
          {/* Left Side - Form Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Leave Type */}
            <LeaveTypeSelector
              leaveTypes={leaveTypes}
              value={formData.leave_type}
              onChange={handleChange}
            />

            {/* Date Range */}
            <DateRangeSelector
              startDate={formData.start_date}
              endDate={formData.end_date}
              onStartDateChange={handleChange}
              onEndDateChange={handleChange}
            />
          </motion.div>

          {/* Right Side - Additional Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Reason */}
            <ReasonInput value={formData.reason} onChange={handleChange} />

            {/* Contact Details */}
            {/* <ContactDetailsInput 
                            value={formData.contact_details}
                            onChange={handleChange}
                        /> */}
          </motion.div>

          {/* Full Width - Information & Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Alert */}
            <LeaveApplicationAlert />

            {/* Submit Button */}
            <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaveApplication;
