import { BackButton } from "@/components/back-button";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import { EditQuestionTypeForm } from "@/components/forms/edit-question-type-form";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const questionType = await db.typeOfQuestion.findUnique({
    where: {
      id,
    },
  });
  return questionType;
}

const EditQuestionTypePage = async ({ params }: { params: any }) => {
  const id = params.id;
  const questionTypeId = params.questionTypeId;
  const data = await getData(questionTypeId);

  console.log(data);

  if (!data) {
    notFound();
  }
  return (
    <div>
      <BackButton href={`/${id}/question-type`} />
      <div className="mt-4">
        <EditQuestionTypeForm id={data.id} name={data.name} />
      </div>
    </div>
  );
};

export default EditQuestionTypePage;
