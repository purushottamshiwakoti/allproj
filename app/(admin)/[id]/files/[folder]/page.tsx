import { AddFiles } from "@/components/add-files";
import { BackButton } from "@/components/back-button";
import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getData(id: string, pg: number) {
  const folders = await db.subFolder.findUnique({
    where: {
      id,
    },
  });

  const pgnum = pg ? pg - 1 : 0;
  const pgsize = 8;

  const files = await db.files.findMany({
    take: pgsize,
    skip: pgnum * pgsize,
    where: {
      subFolderId: id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const totalCount = await db.files.count({
    where: {
      subFolderId: id,
    },
  });
  return { folders, files, totalCount };
}

const FolderPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const pg = parseInt(searchParams.pg);
  const folderId = params.folder;
  const id = params.id;
  const data = await getData(folderId, pg);
  const { files, folders, totalCount } = data;
  if (!data) {
    notFound();
  }

  return (
    <div>
      <BackButton href={`/${id}/files`} />
      <h2 className="capitalize text-primary font-medium text-2xl mt-5">
        {folders?.name}
      </h2>
      <div className="mt-5">
        <AddFiles filesData={files} totalCount={totalCount} />
      </div>
    </div>
  );
};

export default FolderPage;
