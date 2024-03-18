import { BackButton } from "@/components/back-button";
import { EditProjectForm } from "@/components/forms/edit-project-form";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const project = await db.project.findUnique({
    where: {
      id,
    },
  });

  return project;
}

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const data = await getData(id);
  console.log(data);

  if (!data) {
    notFound();
  }
  return (
    <div>
      <BackButton href="/projects" />
      <div className="mt-4">
        <EditProjectForm id={data.id} name={data.name} />
      </div>
    </div>
  );
};

export default page;
