import React from "react";
import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6">{children}</main>
    </div>
  );
};

export default AppLayout;
