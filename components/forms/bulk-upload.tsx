"use client";

import { startTransition, useState, useTransition } from "react";
import { Input } from "../ui/input";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { addBulkQuestion } from "@/actions/question";
import { date } from "zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Question } from "@prisma/client";

interface DataProps {
  SN: string | null;
  typeOfQuestionId: string | null;
  categoryId: string | null;
  subCategoryId: string | null;
  question: string | null;
  questionImage: string | null;
  questionAudio: string | null;
  questionVideo: string | null;
  option: string | null;
  optionCorrect: string | null;
  optionImage: string | null;
  optionAudio: string | null;
  optionVideo: string | null;
  option1: string | null;
  option1Correct: string | null;
  option1Image: string | null;
  option1Audio: string | null;
  option1Video: string | null;
  option2: string | null;
  option2Correct: string | null;
  option2Image: string | null;
  option2Audio: string | null;
  option2Video: string | null;
  option3: string | null;
  option3Correct: string | null;
  option3Image: string | null;
  option3Audio: string | null;
  option3Video: string | null;
}

export const BulkUpload = () => {
  const allValues: any[] = [];

  const [csvData, setCsvData] = useState<DataProps[] | null>(null);
  const [isPending, startTransistion] = useTransition();

  const params = useParams();

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const contents = event.target.result as string;
          parseCsvData(contents);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCsvData = (d: string) => {
    const parsedResult = Papa.parse<DataProps>(d, { header: true });
    const { data } = parsedResult;
    data.pop();
    console.log(data);
    if (data) {
      setCsvData(data);
    }
  };

  const handleUpload = () => {
    startTransistion(() => {
      if (csvData) {
        // Assuming csvData is an array of DataProps
      }
    });
    csvData!.forEach((item) => {
      // Construct values object for each item
      const values = {
        optionCorrect:
          item.optionCorrect !== null &&
          item.optionCorrect.toLowerCase() === "true",
        option1Correct:
          item.option1Correct !== null &&
          item.option1Correct.toLowerCase() === "true",
        option2Correct:
          item.option2Correct !== null &&
          item.option2Correct.toLowerCase() === "true",
        option3Correct:
          item.option3Correct !== null &&
          item.option3Correct.toLowerCase() === "true",
        typeOfQuestionId: item.typeOfQuestionId || "",
        categoryId: item.categoryId || "",
        subCategoryId: item.subCategoryId || "",
        question: item.question || "",
        questionImage: item.questionImage || "",
        questionAudio: item.questionAudio || "",
        questionVideo: item.questionVideo || "",
        option: item.option || "",
        optionImage: item.optionImage || "",
        optionAudio: item.optionAudio || "",
        optionVideo: item.optionVideo || "",
        option1: item.option1 || "",
        option1Image: item.option1Image || "",
        option1Audio: item.option1Audio || "",
        option1Video: item.option1Video || "",
        option2: item.option2 || "",
        option2Image: item.option2Image || "",
        option2Audio: item.option2Audio || "",
        option2Video: item.option2Video || "",
        option3: item.option3 || "",
        option3Image: item.option3Image || "",
        option3Audio: item.option3Audio || "",
        option3Video: item.option3Video || "",
        projectId: params.id!,
      };

      // Push values for each question to allValues array
      allValues.push(values);
    });

    // Now, you can pass allValues to addBulkQuestion function
    addBulkQuestion(allValues as any, params.id as string).then((data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Successfully uploaded questions");
        router.refresh();
        router.push(`/${params.id}/questions`);
      }
    });
  };

  return (
    <>
      {!csvData && (
        <div>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
      )}
      <div>
        {csvData && (
          <>
            <div className="flex items-end justify-end">
              <Button onClick={handleUpload} disabled={isPending}>
                Upload Questions
              </Button>
            </div>
            <div className="mt-5">
              <Table>
                <TableCaption>A list of all your questions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">S.N</TableHead>
                    <TableHead>typeOfQuestionId</TableHead>
                    <TableHead>categoryId</TableHead>
                    <TableHead>subCategoryId</TableHead>
                    <TableHead>question</TableHead>
                    <TableHead>questionImage</TableHead>
                    <TableHead>questionAudio</TableHead>
                    <TableHead>questionVideo</TableHead>
                    <TableHead>option</TableHead>
                    <TableHead>optionCorrect</TableHead>
                    <TableHead>optionImage</TableHead>
                    <TableHead>optionAudio</TableHead>
                    <TableHead>optionVideo</TableHead>
                    <TableHead>option1</TableHead>
                    <TableHead>option1Correct</TableHead>
                    <TableHead>option1Image</TableHead>
                    <TableHead>option1Audio</TableHead>
                    <TableHead>option1Video</TableHead>
                    <TableHead>option2</TableHead>
                    <TableHead>option2Correct</TableHead>
                    <TableHead>option2Image</TableHead>
                    <TableHead>option2Audio</TableHead>
                    <TableHead>option2Video</TableHead>
                    <TableHead>option3</TableHead>
                    <TableHead>option3Correct</TableHead>
                    <TableHead>option3Image</TableHead>
                    <TableHead>option3Audio</TableHead>
                    <TableHead>option3Video</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.map((item, index) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.typeOfQuestionId}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.categoryId}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.subCategoryId}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.question}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.questionImage}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.questionAudio}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.questionVideo}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.optionCorrect}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.optionImage}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.optionAudio}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.optionVideo}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option1Correct}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option1Image}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option1Audio}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option1Video}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option2}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option2Correct}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option2Image}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option2Audio}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option2Video}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option3}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option3Correct}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option3Image}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option3Audio}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.option3Video}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};
