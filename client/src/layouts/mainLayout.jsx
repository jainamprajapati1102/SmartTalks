import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LeftBar from "../components/LeftBar";

const MainLayout = () => {
  return (
    <div className="flex flex-row w-full h-screen ">
      <LeftBar />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
