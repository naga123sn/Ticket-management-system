import React from "react";
import Sidebar from "../common/Sidebar";

const adminLinks = [
  { to: "/admin/dashboard", icon: "📊", label: "Ticket Statistics" },
  { to: "/admin/tickets", icon: "📋", label: "All Tickets" },
  { to: "/admin/users", icon: "👤", label: "Manage Users" },
  { to: "/admin/helpers", icon: "👥", label: "Manage Helpers" },
  { to: "/admin/profile", icon: "🙍", label: "Profile" },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={adminLinks} />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;
