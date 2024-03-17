import { AddButton } from "@/components/add-button";
import { AddQuestionTypeDialog } from "@/components/dialogs/add-questiontype-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./colums";
import Search from "@/components/search";

async function getData(id: string, name: string) {
  const typeOfQuestion = await db.typeOfQuestion.findMany({
    where: {
      projectId: id,
      name: {
        startsWith: name,
        mode: "insensitive",
      },
    },

    orderBy: {
      created_at: "desc",
    },
  });

  return typeOfQuestion;
}

const QuestionTypePage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const name = searchParams.name;
  const questionsData = await getData(params.id, name);
  const data = questionsData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    name: item.name,
  }));
  return (
    <>
      <div>
        <AddQuestionTypeDialog />
        <div className="mt-5">
          <div className="grid grid-cols-3">
            <Search searchKey={"name"} searchParams={searchParams} />
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default QuestionTypePage;
