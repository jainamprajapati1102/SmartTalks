import React from "react";
import Header from "../components/Header";

const Dashboard = () => {
  const handleLogout = () => {
    // Clear auth token or session here
    console.log("User logged out");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header username="Jay Prajapati" onLogout={handleLogout} />

      <div className="flex-1 p-4">
        {/* Page Content */}
        <p>This is your dashboard or chat area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
