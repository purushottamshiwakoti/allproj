import { AddCategoryDialog } from "@/components/dialogs/add-category-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";

async function getData(id: string) {
  const category = await db.category.findMany({
    where: {
      projectId: id,
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

const CategoryPage = async ({ params }: { params: any }) => {
  const categoriesData = await getData(params.id!);
  const data = categoriesData.map((item) => ({
    id: item.id,
    name: item.name,
    subcategories: item.subCategories.map((item) => item.name),
  }));

  return (
    <div>
      <AddCategoryDialog />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CategoryPage;
