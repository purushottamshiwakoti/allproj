import { AddProjectDialog } from "@/components/dialogs/add-project-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(name: string) {
  const projects = await db.project.findMany({
    where: {
      name: {
        startsWith: name,
        mode: "insensitive",
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return projects;
}

const ProjectsPage = async ({ searchParams }: { searchParams: any }) => {
  const name = searchParams.name;
  const projectsData = await getData(name);
  const data = projectsData.map((item, index) => ({
    id: item.id,
    name: item.name,
    sn: index + 1,
  }));
  return (
    <div>
      <AddProjectDialog />
      <div className="mt-5">
        <div className="grid grid-cols-3">
          <Search searchKey={"name"} searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProjectsPage;
