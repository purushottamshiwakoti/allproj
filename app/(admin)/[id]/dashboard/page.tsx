import { DashboardCard } from "@/components/dashboard-card";
import { AddProjectDialog } from "@/components/dialogs/add-project-dialog";
import db from "@/lib/db";
import React from "react";

async function getData(id: string) {
  const category = await db.category.count({
    where: {
      projectId: id,
    },
  });
  const type = await db.typeOfQuestion.count({
    where: {
      projectId: id,
    },
  });
  const questions = await db.question.count({
    where: {
      projectId: id,
    },
  });

  return { category, type, questions };
}

const DashboardPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const data = await getData(id);
  const { category, type, questions } = data;
  return (
    <>
      <div className="grid grid-cols-3 space-x-3 mt-4">
        <DashboardCard name="Total Questions" total={questions} />
        <DashboardCard name="Total Categories" total={category} />
        <DashboardCard name="Total Type of questions" total={type} />
        {/* <DashboardCard /> */}
      </div>
    </>
  );
};

export default DashboardPage;
