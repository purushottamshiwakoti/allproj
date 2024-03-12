import { AddSubCategoryDialog } from "@/components/dialogs/add-subcategory-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";

import _ from "lodash";

async function getData(id: string) {
  // Fetch categories based on projectId
  const categories = await db.category.findMany({
    where: {
      projectId: id,
    },
  });

  // Fetch subcategories for each category
  const subcategoriesPromises = categories.map(async (category) => {
    const subcategory = await db.subCategory.findMany({
      where: {
        categoryId: category.id,
      },
    });
    return subcategory;
  });

  const subcategories = await Promise.all(subcategoriesPromises);

  const categoriesWithSubcategories = categories.map((category, index) => ({
    ...category,
    subcategories: subcategories[index],
  }));

  return categoriesWithSubcategories;
}

const SubCategoryPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const data = await getData(id);
  const subCategoryData = data.flatMap((item) =>
    item.subcategories.map((sub) => ({
      id: sub.id,
      name: sub.name,
      categoryName: item.name,
    }))
  );

  return (
    <div>
      <AddSubCategoryDialog data={data} />

      <div>
        <DataTable columns={columns} data={subCategoryData} />
      </div>
    </div>
  );
};

export default SubCategoryPage;
