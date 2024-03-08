import { AddButton } from "@/components/add-button";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";

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
  console.log(id);
  const adminsData = await getData();
  console.log(adminsData);
  console.log(
    adminsData.filter((item) => item.projects?.filter((i) => i.id != id))
  );
  const data = adminsData.filter((item) =>
    item.projects?.find((i) => i.id == id)
  );

  return (
    <div>
      <AddButton href={`/${id}/admins/add`} />
      <div className="mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminsPage;
