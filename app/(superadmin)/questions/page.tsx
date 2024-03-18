import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(name: string) {
  const questions = await db.question.findMany({
    where: {
      question: {
        startsWith: name,
        mode: "insensitive",
      },
    },
    include: {
      Project: true,
    },
  });

  return questions;
}

const page = async ({ searchParams }: { searchParams: any }) => {
  const question = searchParams.question;
  const questionData = await getData(question);
  const data = questionData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    question: item.question,
    option1: item.option,
    option2: item.option1,
    option3: item.option2,
    option4: item.option3,
    correctOption: item.correctOption,
    project: item.Project?.name,
  }));

  return (
    <>
      <div>
        <div className="mb-4">
          <Search searchKey="question" searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default page;
