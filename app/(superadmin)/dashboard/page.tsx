import { DashboardCard } from "@/components/dashboard-card";
import { AddProjectDialog } from "@/components/dialogs/add-project-dialog";
import db from "@/lib/db";
import { BarChart } from "lucide-react";
import React from "react";

async function getData() {
  const projects = await db.project.count();
  const questions = await db.question.count();

  return { projects, questions };
}

const DashboardPage = async () => {
  const data = await getData();
  const { projects, questions } = data;
  return (
    <>
      {/* <AddProjectDialog /> */}
      <div className="grid grid-cols-3 space-x-3 mt-4">
        <DashboardCard name="Total Projects" total={projects} />
        <DashboardCard name="Total Questions" total={questions} />
        {/* <DashboardCard /> */}
      </div>
    </>
  );
};

export default DashboardPage;
