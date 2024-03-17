import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(name: string) {
  const subCategory = await db.subCategory.findMany({
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
      Category: {
        include: {
          Project: true,
        },
      },
    },
  });

  return subCategory;
}

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const name = searchParams.name;
  const categoryData = await getData(name);
  const data = categoryData.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    name: item.name,
    category: item.Category?.name,
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
