import { BackButton } from "@/components/back-button";
import { AddQuestionForm } from "@/components/forms/add-question-form";
import db from "@/lib/db";
import React from "react";

async function getData(projectId: string) {
  const questionType = await db.typeOfQuestion.findMany({
    where: {
      projectId,
    },
  });
  const categories = await db.category.findMany({
    where: {
      projectId,
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

  return { questionType, categoriesWithSubcategories };
}

const QuestionAddPage = async ({ params }: { params: any }) => {
  const projectId = params.id;
  const data = await getData(projectId);
  const { categoriesWithSubcategories, questionType } = data;

  return (
    <div>
      <BackButton href={`/${projectId}/questions`} />
      <div className="mt-5">
        <AddQuestionForm
          categoriesWithSubcategories={categoriesWithSubcategories}
          allquestionType={questionType}
        />
      </div>
    </div>
  );
};

export default QuestionAddPage;
