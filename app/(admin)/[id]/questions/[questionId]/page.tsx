import { BackButton } from "@/components/back-button";
import { EditQuestionForm } from "@/components/forms/edit-question-form";
import db from "@/lib/db";
import React from "react";

async function getData(projectId: string, questionId: string) {
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

  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
  });

  return { questionType, categoriesWithSubcategories, question };
}

const EditQuestionPage = async ({ params }: { params: any }) => {
  const projectId = params.id;
  const questionId = params.questionId;
  const data = await getData(projectId, questionId);
  const { categoriesWithSubcategories, questionType, question } = data;
  return (
    <>
      <div>
        <BackButton href={`/${projectId}/questions`} />
        <div className="mt-5">
          <EditQuestionForm
            categoriesWithSubcategories={categoriesWithSubcategories}
            allquestionType={questionType}
            question={question}
          />
        </div>
      </div>
    </>
  );
};

export default EditQuestionPage;
