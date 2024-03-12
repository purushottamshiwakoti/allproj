"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { downloadQuestions } from "@/actions/csv-download";

export const ExportQuestions = () => {
  const params = useParams();
  const [isPending, startTransistion] = useTransition();
  function exportToCSV() {
    startTransistion(async () => {
      const files = await downloadQuestions(params.id);

      const blob = new Blob([files], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "questionFiles.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  return (
    <>
      <div>
        <Button disabled={isPending} onClick={exportToCSV}>
          Export Questions{" "}
        </Button>
      </div>
    </>
  );
};
