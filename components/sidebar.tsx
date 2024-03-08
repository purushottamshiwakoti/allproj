import { getProject } from "@/actions/project";
import { ProjectSwitcher } from "./project-switcher";
import { sidebarNav } from "@/lib/nav";
import { Button } from "./ui/button";
import Link from "next/link";
import { SideNavs } from "./side-navs";

export const Sidebar = async () => {
  const data = await getProject();
  return (
    <>
      <div className="w-[14rem] h-full p-3 fixed top-0 bg-[#1C2434] ">
        <h2 className="text-lg text-secondary ">Admin Dashboard</h2>
        {/* switch projects here */}
        <div className="mt-4 mb-4">
          <ProjectSwitcher data={data} />
        </div>
        <SideNavs />
      </div>
    </>
  );
};
