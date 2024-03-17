import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(name: string) {
  console.log(name);
  const questions = await db.question.findMany({
    where: {
      question: {
        startsWith: name,
        mode: "insensitive",
      },
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      Project: true,
    },
  });

  return questions;
}

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const question = searchParams.question;
  const questionsData = await getData(question);
  const data = questionsData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    question: item.question,
    project: item.Project?.name,
  }));

  return (
    <>
      <div className="grid grid-cols-3">
        <Search searchKey={"question"} searchParams={searchParams} />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default CategoryPage;
