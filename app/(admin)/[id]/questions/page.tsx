import { AddButton } from "@/components/add-button";
import React from "react";

const QuestionsPage = ({ params }: { params: any }) => {
  console.log(params);
  const projectId = params.id;
  return (
    <div>
      <AddButton href={`questions/add`} />
    </div>
  );
};

export default QuestionsPage;
