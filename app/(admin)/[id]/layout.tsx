import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { AuthUser } from "@/lib/auth-user";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: any) {
  const data = await db.project.findUnique({
    where: {
      id,
    },
  });

  return data;
}

const ProjectLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  const user = await AuthUser();

  const isValidHex = isHexString(params.id);
  if (!isValidHex) {
    notFound();
  }
  const data = await getData(params.id);
  if (!data) {
    return notFound();
  }

  const ids = data.userIds;
  if (!ids.includes(user?.id!)) {
    return notFound();
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

export default ProjectLayout;

function isHexString(str: string): boolean {
  // Regular expression to match a hexadecimal string
  const hexRegex = /^[0-9A-Fa-f]+$/;

  // Test if the string matches the hexRegex
  return hexRegex.test(str);
}
