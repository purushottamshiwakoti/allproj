import { BackButton } from "@/components/back-button";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import { EditSubCategoryForm } from "@/components/forms/edit-subcategory-form";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string, projectId: string) {
  const category = await db.subCategory.findUnique({
    where: {
      id,
    },
  });

  const categories = await db.category.findMany({
    where: {
      projectId: projectId,
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

  return { category, categoriesWithSubcategories };
}

const EditCategoryPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const categoryId = params.categoryId;
  const data = await getData(categoryId, id);
  const { categoriesWithSubcategories, category } = data;

  if (!category) {
    notFound();
  }
  return (
    <div>
      <BackButton href={`/${id}/sub-category`} />
      <div className="mt-4">
        <EditSubCategoryForm
          data={categoriesWithSubcategories}
          subCategory={category}
        />
      </div>
    </div>
  );
};

export default EditCategoryPage;
