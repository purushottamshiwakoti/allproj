import { AddButton } from "@/components/add-button";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";

async function getData() {
  const admins = await db.user.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return admins;
}

const AdminsPage = async () => {
  const data = await getData();
  return (
    <div>
      <AddButton href="/admins/add" />
      <div className="mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminsPage;
