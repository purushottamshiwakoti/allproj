import { BackButton } from "@/components/back-button";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

const EditCategoryPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const categoryId = params.categoryId;
  const data = await getData(categoryId);

  if (!data) {
    notFound();
  }
  return (
    <div>
      <BackButton href={`/${id}/category`} />
      <div className="mt-4">
        <EditCategoryForm
          id={data.id}
          name={data.name}
          projectId={data.projectId}
        />
      </div>
    </div>
  );
};

export default EditCategoryPage;
