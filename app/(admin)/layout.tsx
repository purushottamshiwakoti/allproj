import { Sidebar } from "@/components/sidebar";
import React from "react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <Sidebar />
        <div className="ml-[15rem] mt-2 mr-4">{children}</div>
      </div>
    </div>
  );
};

export default ProjectLayout;
