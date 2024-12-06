import React from "react";
import { PieChart, FileText, Users } from "lucide-react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import LeaveStatistics from "../components/Dashboard/LeaveStatistics";
import RecentLeaveRequests from "../components/Dashboard/RecentLeaveRequests";
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <PieChart className="mr-2" /> },
    {
      id: "requests",
      label: "Leave Requests",
      icon: <FileText className="mr-2" />,
    },
    { id: "team", label: "Team", icon: <Users className="mr-2" /> },
  ];

  return (
    <DashboardLayout>
      <LeaveStatistics />
      <RecentLeaveRequests />
    </DashboardLayout>
  );
};

export default Dashboard;
