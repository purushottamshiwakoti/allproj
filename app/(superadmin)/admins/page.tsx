import { AddButton } from "@/components/add-button";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import Search from "@/components/search";

async function getData(name: string, email: string) {
  const admins = await db.user.findMany({
    where: {
      fullName: {
        startsWith: name,
        mode: "insensitive",
      },
      email: {
        startsWith: email,
        mode: "insensitive",
      },
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      projects: true,
    },
  });

  return admins;
}

const AdminsPage = async ({ searchParams }: { searchParams: any }) => {
  const name = searchParams.name;
  const email = searchParams.email;
  const adminsData = await getData(name, email);
  const data = adminsData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    role: item.role,
    projects: item.projects.length
      ? item.projects.map((proj) => proj.name)
      : ["none"],
  }));

  return (
    <div>
      {/* <AddButton href="/admins/add" /> */}
      <div className="mt-5">
        <div className="grid grid-cols-3">
          <Search searchKey={"name"} searchParams={searchParams} />
          <Search searchKey={"email"} searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminsPage;
