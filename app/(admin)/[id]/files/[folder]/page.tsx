import { AddFiles } from "@/components/add-files";
import { BackButton } from "@/components/back-button";
import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const admins = await db.subFolder.findUnique({
    where: {
      id,
    },
  });

  return admins;
}

const FolderPage = async ({ params }: { params: any }) => {
  const folderId = params.folder;
  const id = params.id;
  const data = await getData(folderId);
  if (!data) {
    notFound();
  }
  return (
    <div>
      <BackButton href={`/${id}/files`} />
      <h2 className="capitalize text-primary font-medium text-2xl mt-5">
        {data.name}
      </h2>
      <div className="mt-5">
        <AddFiles />
      </div>
    </div>
  );
};

export default FolderPage;
