import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { AuthUser } from "@/lib/auth-user";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await AuthUser();
  if (!user) {
    notFound();
  }
  const projects = await db.project.findFirst({
    where: {
      userIds: {
        has: user.id,
      },
    },
  });

  if (projects) {
    if (user.role == "ADMIN" || (user.role == "SUBADMIN" && projects)) {
      redirect(projects.id);
    }
  }


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

export default DashboardLayout;
