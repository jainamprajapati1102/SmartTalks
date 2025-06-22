import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Home.jsx";
import Chatroom from "./pages/ChatRoom.jsx";
import AuthLayout from "./layouts/authLayout.jsx";
import MainLayout from "./layouts/mainLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Main App Pages */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chatroom />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
