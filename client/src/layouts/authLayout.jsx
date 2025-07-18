import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet /> {/* This renders Login or Signup */}
    </div>
  );
};

export default AuthLayout;
