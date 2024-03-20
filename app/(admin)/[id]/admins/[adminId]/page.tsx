import { EditUserForm } from "@/components/forms/edit-user-form";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

const page = async ({ params }: { params: any }) => {
  const adminId = params.adminId;
  const data = await getData(adminId);
  if (!data) {
    notFound();
  }
  return (
    <>
      <EditUserForm
        id={data.id}
        email={data.email}
        fullName={data.fullName}
        role={data.role}
      />
    </>
  );
};

export default page;
