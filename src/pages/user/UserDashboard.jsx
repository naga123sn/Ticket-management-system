import React, { useEffect, useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import { useAuth } from "../../context/AuthContext";
import { getMyTickets } from "../../services/ticketService";

// Professional Minimalist Icons (SVG)
const Icons = {
  Total: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Pending: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Progress: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Resolved: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const StatCard = ({ label, value, colorClass, icon: IconComponent }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-red-900/30 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-md bg-slate-50 ${colorClass} group-hover:bg-opacity-80 transition-all`}>
        <IconComponent />
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Metric</span>
    </div>
    <div className="space-y-1">
      <h3 className="text-3xl font-light text-slate-900 tracking-tight">
        {value}
      </h3>
      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </p>
    </div>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getMyTickets()
      .then((res) => {
        const tickets = res.data;
        setStats({
          total: tickets.length,
          pending: tickets.filter((t) => t.status === "pending").length,
          in_progress: tickets.filter((t) => t.status === "in_progress").length,
          resolved: tickets.filter((t) => t.status === "resolved").length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-100">
          <div>
            <nav className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <span>Platform</span>
              <span>/</span>
              <span className="text-red-900">User Dashboard</span>
            </nav>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">
              Welcome, {user?.name || "System User"}
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Operational overview and ticket lifecycle metrics.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-50 transition-all">
              Export Data
            </button>
            <button className="px-5 py-2.5 bg-[#450a0a] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-red-900 shadow-lg shadow-red-900/20 transition-all">
              Create Ticket
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard 
            label="Total Submissions" 
            value={stats?.total ?? "—"} 
            colorClass="text-[#450a0a]" 
            icon={Icons.Total}
          />
          <StatCard 
            label="Pending Review" 
            value={stats?.pending ?? "—"} 
            colorClass="text-amber-600" 
            icon={Icons.Pending}
          />
          <StatCard 
            label="In Active Progress" 
            value={stats?.in_progress ?? "—"} 
            colorClass="text-blue-700" 
            icon={Icons.Progress}
          />
          <StatCard 
            label="Resolution Completed" 
            value={stats?.resolved ?? "—"} 
            colorClass="text-emerald-700" 
            icon={Icons.Resolved}
          />
        </div>

        {/* Contextual Information Section (Lower Engagement) */}
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-md">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Priority Support</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Our engineering team is currently maintaining an average response time of <span className="text-red-900 font-bold underline decoration-red-200 underline-offset-4">1.8 hours</span> for enterprise queries.
              </p>
            </div>
            <div className="flex gap-12">
                <div className="text-center">
                    <p className="text-xl font-bold text-[#450a0a]">99.8%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SLA Compliance</p>
                </div>
                <div className="text-center border-l border-slate-200 pl-12">
                    <p className="text-xl font-bold text-[#450a0a]">24/7</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Monitoring</p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default UserDashboard;