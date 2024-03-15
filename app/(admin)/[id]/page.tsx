import { redirect } from "next/navigation";
import React from "react";

const ProjectPage = ({ params }: { params: any }) => {
  console.log(params.id);
  redirect(`${params.id}/dashboard`);
};

export default ProjectPage;
