import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(name: string) {
  const category = await db.category.findMany({
    where: {
      name: {
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

  return category;
}

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const name = searchParams.name;
  const categoryData = await getData(name);
  const data = categoryData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    name: item.name,
    project: item.Project?.name,
  }));
  return (
    <>
      <div className="grid grid-cols-3">
        <Search searchKey={"name"} searchParams={searchParams} />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default CategoryPage;
