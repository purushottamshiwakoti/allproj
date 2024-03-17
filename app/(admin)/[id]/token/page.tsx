import { CopyToken } from "@/components/copy-token";
import { GenerateTokenButton } from "@/components/generate-token-button";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import React from "react";

async function getData(id: string) {
  const token = await db.token.findFirst({
    where: {
      projectId: id,
    },
  });

  return token;
}

const TokenPage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  return (
    <>
      <div>
        {!data ? (
          <div className="space-y-3">
            <h2>You dont have any tokens </h2>
            <GenerateTokenButton />
          </div>
        ) : (
          <CopyToken token={data.token} />
        )}
      </div>
    </>
  );
};

export default TokenPage;
