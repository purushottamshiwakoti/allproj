import { AddButton } from "@/components/add-button";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
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
    include: {
      projects: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return admins;
}

const AdminsPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const name = searchParams.name;
  const email = searchParams.email;
  const id = params.id;
  const adminsData = await getData(name, email);

  const filteredData = adminsData.filter((item) =>
    item.projects?.find((i) => i.id == id)
  );
  const data = filteredData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    role: item.role,
  }));

  return (
    <div>
      <div className="flex">
        <AddButton href={`/${id}/admins/add`} />
      </div>
      <div className="mt-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2">
          <Search searchKey={"name"} searchParams={searchParams} />
          <Search searchKey={"email"} searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminsPage;
