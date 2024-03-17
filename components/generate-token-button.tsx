"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { generateToken } from "@/actions/token";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export const GenerateTokenButton = () => {
  const [isPending, startTranslation] = useTransition();
  const router = useRouter();
  const params = useParams();
  console.log(params.id);

  const token = () => {
    startTranslation(() => {
      generateToken(params.id as string).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.refresh();
        }

        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <>
      <Button disabled={isPending} onClick={token}>
        Generate Token
      </Button>
    </>
  );
};
