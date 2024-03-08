import { BackButton } from "@/components/back-button";
import { AddUserForm } from "@/components/forms/add-user-form";
import React from "react";

const AddAdminPage = ({ params }: { params: any }) => {
  const id = params.id;
  return (
    <div>
      <BackButton href={`/${id}/admins`} />
      <div className="mt-10">
        <AddUserForm />
      </div>
    </div>
  );
};

export default AddAdminPage;
