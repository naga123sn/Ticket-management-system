import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { PriorityBadge, StatusBadge } from "../../components/common/TicketBadge";
import { formatDate } from "../../utils/helpers";
import {
  getTicketById,
  updateTicketStatus,
  updateTicketPriority,
  assignTicket,
  addComment,
} from "../../services/ticketService";
import { getAllHelpers } from "../../services/userService";

const AdminTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [helpers, setHelpers] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTicket = async () => {
    try {
      const res = await getTicketById(id);
      setTicket(res.data);
    } catch {
      setError("Failed to load ticket.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    getAllHelpers().then((res) => setHelpers(res.data)).catch(() => {});
    // eslint-disable-next-line
  }, [id]);

  const handleStatusChange = async (e) => {
    await updateTicketStatus(id, e.target.value);
    fetchTicket();
  };

  const handlePriorityChange = async (e) => {
    await updateTicketPriority(id, e.target.value);
    fetchTicket();
  };

  const handleAssign = async (e) => {
    await assignTicket(id, parseInt(e.target.value));
    fetchTicket();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment(id, comment);
    setComment("");
    fetchTicket();
  };

  if (loading) return <AdminLayout><p className="text-gray-500">Loading...</p></AdminLayout>;
  if (error) return <AdminLayout><p className="text-red-500">{error}</p></AdminLayout>;

  return (
    <AdminLayout>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Tickets
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2">{ticket.title}</h1>
            <div className="flex gap-2 mb-4">
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} />
            </div>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">{ticket.description}</p>
            <p className="text-xs text-gray-400 mt-4">Created: {formatDate(ticket.created_at)}</p>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Comments</h2>
            {ticket.comments && ticket.comments.length > 0 ? (
              <ul className="space-y-3 mb-4">
                {ticket.comments.map((c) => (
                  <li key={c.id} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    <p>{c.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(c.created_at)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 mb-4">No comments yet.</p>
            )}
            <form onSubmit={handleComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">STATUS</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                value={ticket.status}
                onChange={handleStatusChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">PRIORITY</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                value={ticket.priority}
                onChange={handlePriorityChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">ASSIGN TO HELPER</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                value={ticket.helper_id || ""}
                onChange={handleAssign}
              >
                <option value="">Unassigned</option>
                {helpers.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">TICKET INFO</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">User ID:</span> {ticket.user_id}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Helper ID:</span>{" "}
              {ticket.helper_id ? ticket.helper_id : "Not assigned"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Created:</span> {formatDate(ticket.created_at)}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTicketDetail;
