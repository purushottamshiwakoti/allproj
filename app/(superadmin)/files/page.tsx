import { CustomPagination } from "@/components/custom-pagination";
import db from "@/lib/db";
import { getFolderName } from "@/lib/file";
import { Folder } from "lucide-react";
import React from "react";

async function getData(pg: number) {
  const pgnum = pg - 1 ?? 0;
  const pgsize = 8;
  const folders = await db.folder.findMany({
    skip: pgnum * pgsize,
    take: pgsize,
    orderBy: {
      created_at: "desc",
    },
  });

  const totalFolders = await db.folder.count();

  return { folders, totalFolders };
}

const FilesPage = async ({ searchParams }: { searchParams: any }) => {
  const pg = searchParams.pg;
  const foldersData = await getData(pg);
  const { folders, totalFolders } = foldersData;
  return (
    <>
      <div>
        <h2 className="capitalize text-primary font-medium text-2xl">
          mY FILES
        </h2>
        <div className="mt-4 grid grid-cols-4 gap-10 ">
          {folders.map((item) => (
            <div
              key={item.id}
              className="p-20 border-2 border-dashed flex items-center justify-center "
            >
              <Folder className="w-5 h-5 mr-2" />
              {getFolderName(item.name)}
            </div>
          ))}
        </div>
        <div className="mt-7">
          <CustomPagination length={totalFolders} />
        </div>
      </div>
    </>
  );
};

export default FilesPage;
