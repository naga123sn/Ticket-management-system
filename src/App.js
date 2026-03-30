import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";

// Auth
import Login from "./pages/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminTicketDetail from "./pages/admin/AdminTicketDetail";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminHelpers from "./pages/admin/AdminHelpers";
import AdminProfile from "./pages/admin/AdminProfile";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserTickets from "./pages/user/UserTickets";
import UserTicketDetail from "./pages/user/UserTicketDetail";
import CreateTicket from "./pages/user/CreateTicket";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/tickets" element={<PrivateRoute role="admin"><AdminTickets /></PrivateRoute>} />
          <Route path="/admin/tickets/:id" element={<PrivateRoute role="admin"><AdminTicketDetail /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
          <Route path="/admin/helpers" element={<PrivateRoute role="admin"><AdminHelpers /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute role="admin"><AdminProfile /></PrivateRoute>} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>} />
          <Route path="/user/tickets" element={<PrivateRoute role="user"><UserTickets /></PrivateRoute>} />
          <Route path="/user/tickets/:id" element={<PrivateRoute role="user"><UserTicketDetail /></PrivateRoute>} />
          <Route path="/user/create-ticket" element={<PrivateRoute role="user"><CreateTicket /></PrivateRoute>} />
          <Route path="/user/profile" element={<PrivateRoute role="user"><UserProfile /></PrivateRoute>} />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
