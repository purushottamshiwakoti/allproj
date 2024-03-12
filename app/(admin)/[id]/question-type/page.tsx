import { AddButton } from "@/components/add-button";
import { AddQuestionTypeDialog } from "@/components/dialogs/add-questiontype-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./colums";

 async function getData(id: string) {
  const typeOfQuestion = await db.typeOfQuestion.findMany({
    where: {
      projectId: id,
    },

    orderBy: {
      created_at: "desc",
    },
  });

  return typeOfQuestion;
}

const QuestionTypePage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  return (
    <>
      <div>
        <AddQuestionTypeDialog />
        <div className="mt-5">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default QuestionTypePage;
