import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAxiosInstance } from "../utils/axiosInstance";
import LoadingSpinner from "../components/LeaveApproval/LoadingSpinner";
import ErrorDisplay from "../components/LeaveApproval/ErrorDisplay";
import LeaveApprovalsHeader from "../components/LeaveApproval/LeaveApprovalsHeader";
import FilterButtons from "../components/LeaveApproval/FilterButtons";
import LeaveRequestsTable from "../components/LeaveApproval/LeaveRequestsTable";
import LeaveStatistics from "../components/LeaveApproval/LeaveStatistics";
import LeaveRequestModal from "../components/LeaveApproval/LeaveRequestModal";
import Pagination from "../components/LeaveApproval/Pagination";

const LeaveApprovals = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // Track the filter status
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  // Fetch and data processing logic
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        setLoading(true);
        const response = await axiosInstance.get("/leave/leave-applications/", {
          params: {
            page: currentPage,
          },
        });

        setLeaveRequests(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // Dynamically set the total pages
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch leave requests");
        setLoading(false);
        console.log(err);
      }
    };

    fetchLeaveRequests();
  }, [currentPage, filter]); // Refetch data when page or filter changes

  // const updateStatistics = (statisticFunc) =>{
  //     statisticFunc()
  // }

  // Memoized filtered requests (though we are fetching the filtered data already)
  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(
      (request) => filter === "all" || request.status.toLowerCase() === filter
    );
  }, [leaveRequests, filter]);

  const handleLeaveAction = async (id, action) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const endpoint =
        action === "approve"
          ? `/leave/leave-applications/approve/`
          : `/leave/leave-applications/${id}/reject/`;

      await axiosInstance.post(endpoint, { pk: id });

      // Update local state to reflect the change
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? {
                ...request,
                status: action === "approve" ? "approved" : "rejected",
              }
            : request
        )
      );
    } catch (err) {
      setError(`Failed to ${action} leave request`);
      console.log(err);
    }
  };
  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Render logic
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br font-roboto p-2 lg:p-10"
    >
      <div className="container mx-auto max-w-6xl">
        <LeaveApprovalsHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <LeaveRequestsTable
          filteredRequests={filteredRequests}
          setSelectedRequest={setSelectedRequest}
          handleLeaveAction={handleLeaveAction}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <LeaveStatistics
          requestStats={{ pending: 0, approved: 0, rejected: 0 }}
        />

        <AnimatePresence>
          {selectedRequest && (
            <LeaveRequestModal
              selectedRequest={selectedRequest}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LeaveApprovals;
