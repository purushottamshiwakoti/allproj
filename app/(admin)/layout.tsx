import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="">
        <div className="flex ">
          <Sidebar />
          <div className="ml-[15rem]">
            <Navbar />
          </div>
        </div>
        <div className="ml-[15rem] mt-16 mr-4">{children}</div>
      </div>
    </div>
  );
};

export default ProjectLayout;
