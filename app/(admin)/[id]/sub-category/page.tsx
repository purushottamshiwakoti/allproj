import { AddSubCategoryDialog } from "@/components/dialogs/add-subcategory-dialog";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";

import _ from "lodash";
import Search from "@/components/search";

async function getData(id: string, name: string) {
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
        name: {
          startsWith: name,
          mode: "insensitive",
        },
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

const SubCategoryPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const id = params.id;
  const name = searchParams.name;
  const data = await getData(id, name);
  const subCategoryData = data.flatMap((item, categoryIndex) =>
    item.subcategories.map((sub, subIndex) => ({
      sn: categoryIndex * item.subcategories.length + subIndex + 1,
      id: sub.id,
      name: sub.name,
      categoryName: item.name,
    }))
  );

  return (
    <div>
      <AddSubCategoryDialog data={data} />

      <div>
        <div className="grid grid-cols-3 mt-3">
          <Search searchKey={"name"} searchParams={searchParams} />
        </div>
        <DataTable columns={columns} data={subCategoryData} />
      </div>
    </div>
  );
};

export default SubCategoryPage;
