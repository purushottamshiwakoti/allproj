import { AddCategoryDialog } from "@/components/dialogs/add-category-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import Search from "@/components/search";

async function getData(id: string, name: string) {
  const category = await db.category.findMany({
    where: {
      projectId: id,
      name: {
        startsWith: name,
        mode: "insensitive",
      },
    },
    include: {
      subCategories: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return category;
}

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const name = searchParams.name;
  const categoriesData = await getData(params.id!, name);
  const data = categoriesData.map((item, index) => ({
    id: item.id,
    sn: index + 1,
    name: item.name,
    subcategories: item.subCategories.map((item) => item.name),
  }));

  return (
    <div>
      <AddCategoryDialog />
      <div>
        <div className="grid grid-cols-3 mt-3">
          <Search searchKey={"name"} searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CategoryPage;
