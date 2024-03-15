import { AddButton } from "@/components/add-button";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";

async function getData() {
  const admins = await db.user.findMany({
    include: {
      projects: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return admins;
}

const AdminsPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const adminsData = await getData();

  const data = adminsData.filter((item) =>
    item.projects?.find((i) => i.id == id)
  );

  return (
    <div>
      <div className="flex">
        <AddButton href={`/${id}/admins/add`} />
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={data} searchKey=" " />
      </div>
    </div>
  );
};

export default AdminsPage;
