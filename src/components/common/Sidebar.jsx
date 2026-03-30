import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ links }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-[#450a0a] text-white flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-40">
      {/* Branding Header */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-[#450a0a] text-xl font-black italic">Q</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.3em] uppercase leading-none">Query.io</span>
            <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest mt-1">Enterprise Suite</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[9px] font-black text-red-300/50 uppercase tracking-[0.4em] mb-4">Main Navigation</p>
        
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#450a0a] shadow-xl shadow-black/20 translate-x-1"
                  : "text-red-100/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {/* Active Indicator Bar */}
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {isActive && (
                   <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#450a0a]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer / User Session */}
      <div className="p-6 mt-auto">
        <div className="bg-black/10 rounded-2xl p-4 border border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full group transition-all"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-white tracking-widest uppercase">Terminate</span>
              <span className="text-[9px] font-bold text-red-400/80 uppercase">Secure Logout</span>
            </div>
            <div className="p-2 rounded-lg bg-red-900/30 group-hover:bg-red-500 transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-10V7a3 3 0 00-6 0v1" />
              </svg>
            </div>
          </button>
        </div>
        
        <p className="mt-6 text-center text-[8px] font-bold text-red-400/30 uppercase tracking-[0.5em]">
          E2E Encrypted Session
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;