import { BackButton } from "@/components/back-button";
import { AddQuestionForm } from "@/components/forms/add-question-form";
import React from "react";

const QuestionAddPage = ({ params }: { params: any }) => {
  const projectId = params.id;

  return (
    <div>
      <BackButton href={`/${projectId}/questions`} />
      <div className="mt-5">
        <AddQuestionForm />
      </div>
    </div>
  );
};

export default QuestionAddPage;
