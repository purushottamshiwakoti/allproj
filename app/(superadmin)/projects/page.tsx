import { AddProjectDialog } from "@/components/dialogs/add-project-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";

async function getData() {
  const projects = await db.project.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return projects;
}

const ProjectsPage = async () => {
  const data = await getData();
  return (
    <div>
      <AddProjectDialog />
      <div className="mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProjectsPage;
