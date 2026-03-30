import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import { PriorityBadge, StatusBadge } from "../../components/common/TicketBadge";
import { formatDate } from "../../utils/helpers";
import { getTicketById, addComment } from "../../services/ticketService";

const UserTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTicket = async () => {
    try {
      const res = await getTicketById(id);
      setTicket(res.data);
    } catch {
      setError("System was unable to retrieve ticket data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment(id, comment);
    setComment("");
    fetchTicket();
  };

  if (loading) return (
    <UserLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#450a0a] rounded-full animate-spin"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Decrypting Data...</span>
        </div>
      </div>
    </UserLayout>
  );

  if (error) return (
    <UserLayout>
      <div className="max-w-md mx-auto mt-20 text-center p-8 border border-red-100 bg-red-50 rounded-2xl">
        <p className="text-red-900 font-bold text-sm uppercase tracking-widest">{error}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-xs font-black text-red-700 underline uppercase tracking-tighter">Return to safety</button>
      </div>
    </UserLayout>
  );

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <nav className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate("/user/dashboard")}>Platform</span>
              <span>/</span>
              <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate("/user/tickets")}>Tickets</span>
              <span>/</span>
              <span className="text-red-900 font-black">Ref: #{id?.slice(-6) || id}</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              {ticket.title}
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-[#450a0a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Registry
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Workspace (Left) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Ticket Core Content */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Incident Report</span>
                <span className="text-[10px] font-medium text-slate-400 italic">{formatDate(ticket.created_at)}</span>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex gap-3 mb-8">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed text-base font-medium whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Interaction Timeline (Comments) */}
            <div className="space-y-6">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#450a0a]"></span>
                Interaction Log
              </h2>

              <div className="space-y-4">
                {ticket.comments && ticket.comments.length > 0 ? (
                  <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-8 py-4">
                    {ticket.comments.map((c) => (
                      <div key={c.id} className="relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-[#450a0a] transition-colors"></div>
                        
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all">
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">{c.comment}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="w-4 h-[1px] bg-slate-200"></div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              Timestamp: {formatDate(c.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting system or agent response</p>
                  </div>
                )}
              </div>

              {/* Add Comment Field */}
              <div className="bg-white border border-slate-200 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-[#450a0a] transition-all">
                <form onSubmit={handleComment} className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter technical update or inquiry..."
                    className="flex-1 bg-transparent px-6 py-4 text-sm text-slate-900 focus:outline-none placeholder:text-slate-300 font-medium"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#450a0a] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-900 transition-all shadow-lg shadow-red-900/10"
                  >
                    Post Update
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Metadata (Right) */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden sticky top-10">
              <div className="bg-[#450a0a] px-6 py-4">
                 <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">System Metadata</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Operational Status</label>
                  <StatusBadge status={ticket.status} />
                </div>
                
                <div className="h-[1px] bg-slate-100 w-full"></div>

                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Priority Classification</label>
                  <PriorityBadge priority={ticket.priority} />
                </div>

                <div className="h-[1px] bg-slate-100 w-full"></div>

                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Assigned Investigator</label>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 italic">
                       {ticket.helper_id ? "H" : "N"}
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      {ticket.helper_id ? `Technician ID: ${ticket.helper_id}` : "Awaiting Assignment"}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 w-full"></div>

                <div className="pt-2">
                  <p className="text-[9px] leading-relaxed text-slate-400 font-medium">
                    This ticket is protected under enterprise-grade encryption. All interactions are logged for audit.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default UserTicketDetail;