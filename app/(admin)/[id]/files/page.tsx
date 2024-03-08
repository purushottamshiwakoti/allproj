import { CustomPagination } from "@/components/custom-pagination";
import { AddFolderDialog } from "@/components/dialogs/add-folder-dialog";
import db from "@/lib/db";
import { getFolderName } from "@/lib/file";
import { Folder } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string, pg: number) {
  // Retrieving folders with pagination
  const project = await db.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    notFound();
  }

  const folder = await db.folder.findUnique({
    where: {
      slug: project.slug,
    },
  });

  if (!folder) {
    notFound();
  }
  const pgnum = pg ? pg - 1 : 0;
  const pgsize = 8;
  const subFolder = await db.subFolder.findMany({
    take: pgsize,
    skip: pgnum * pgsize,
    orderBy: {
      created_at: "desc",
    },
    where: {
      folderId: folder.id,
    },
  });

  const totalFolders = await db.subFolder.count({
    where: {
      folderId: folder.id,
    },
  });

  return { folder, subFolder, totalFolders };
}

const FilesPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const pg = parseInt(searchParams.pg);
  const folderData = await getData(params.id, pg);
  const { folder, subFolder, totalFolders } = folderData;

  return (
    <>
      <div>
        <h2 className="capitalize text-primary font-medium text-2xl">
          {folder?.name}
        </h2>
        <div className="mt-4 grid grid-cols-4 gap-10"></div>
        <div className="mt-3">
          <div className="flex items-center space-x-4">
            <AddFolderDialog id={folder.id} />
          </div>
        </div>
        <div>
          <div className="mt-4 grid grid-cols-4 gap-10">
            {subFolder.map((item) => (
              <Link href={`files/${item.id}`}>
                <div
                  key={item.id}
                  className="p-20 border-2 border-dashed flex items-center justify-center cursor-pointer"
                >
                  <Folder className="w-5 h-5 mr-2" />
                  {getFolderName(item.name)}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-7">
          <CustomPagination length={totalFolders} />
        </div>
      </div>
    </>
  );
};

export default FilesPage;
