import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid min-h-screen grid-cols-[1fr_5fr] grid-rows-[0.8fr_7fr]">
        <Header />
        <Sidebar />
        {children}
      </div>
    </>
  );
};
