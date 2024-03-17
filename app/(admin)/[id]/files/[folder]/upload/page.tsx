import { AddFiles } from "@/components/add-files";
import { BackButton } from "@/components/back-button";
import db from "@/lib/db";
import React from "react";

async function getData(id: string) {
  const totalCount = await db.files.count({
    where: {
      subFolderId: id,
    },
  });
  return totalCount;
}

const UploaFilesPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const folderId = params.folder;
  const id = params.id;
  const data = await getData(folderId);
  return (
    <div>
      <BackButton href={`/${id}/files/${folderId}`} />

      <div className="mt-4">
        <AddFiles totalCount={data} />
      </div>
    </div>
  );
};

export default UploaFilesPage;
