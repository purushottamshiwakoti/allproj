import { AddButton } from "@/components/add-button";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";
import { ExportQuestions } from "@/components/export-questions";

async function getData(projectId: string, name: string) {
  const question = await db.question.findMany({
    where: {
      projectId,
      question: {
        startsWith: name,
        mode: "insensitive",
      },
    },

    orderBy: {
      created_at: "desc",
    },

    include: {
      category: true,
      subCategory: true,
      TypeOfQuestion: true,
    },
  });

  return question;
}

const QuestionsPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const question = searchParams.question;
  const projectId = params.id;
  const data = await getData(projectId, question);
  const refactoredData = data.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    question:
      item.question !== null
        ? item.question
        : item.questionAudio !== null
        ? item.questionAudio
        : item.questionVideo !== null
        ? item.questionVideo
        : item.questionImage
        ? item.questionImage
        : null,
    category: item.category?.name,
    subCategory: item.subCategory?.name,
    typeOfQuestion: item.TypeOfQuestion?.name,
  }));

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-5">
          <AddButton href={`questions/add`} />
          <Button variant={"outline"} className="flex items-center" asChild>
            <Link href={"questions/upload"}>
              <Upload className="w-4 h-4 mr-3" />
              Upload Bulk Questions
            </Link>
          </Button>
          <Button variant={"outline"} className="flex items-center" asChild>
            <Link href={"questions/edit"}>
              <Upload className="w-4 h-4 mr-3" />
              Edit Bulk Questions
            </Link>
          </Button>
        </div>
        <div>
          <ExportQuestions />
        </div>
      </div>

      <div className="mt-3">
        <DataTable columns={columns} data={refactoredData} />
      </div>
    </div>
  );
};

export default QuestionsPage;
