import { AddButton } from "@/components/add-button";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/db";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";
import { ExportQuestions } from "@/components/export-questions";
import Search from "@/components/search";

async function getData(projectId: string, name: string) {
  const question = await db.question.findMany({
    where: {
      projectId,
      question: {
        startsWith: name,
        mode: "insensitive",
      },
    },

    orderBy: {
      created_at: "desc",
    },

    include: {
      category: true,
      subCategory: true,
      TypeOfQuestion: true,
    },
  });

  return question;
}

const QuestionsPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const question = searchParams.question;
  const projectId = params.id;
  const data = await getData(projectId, question);
  const refactoredData = data.map((item, index) => ({
    sn: index + 1,
    id: item.id,
    question: item.question
      ? {
          name: item.question,
          type: "text",
        }
      : item.questionImage
      ? {
          name: item.questionImage,
          type: "image",
        }
      : item.questionAudio
      ? {
          name: item.questionAudio,
          type: "audio",
        }
      : {
          name: item.questionVideo,
          type: "audio",
        },
    option1: item.option
      ? {
          name: item.option,
          type: "text",
        }
      : item.optionImage
      ? {
          name: item.optionImage,
          type: "image",
        }
      : item.optionAudio
      ? {
          name: item.optionAudio,
          type: "audio",
        }
      : {
          name: item.optionVideo,
          type: "video",
        },

    option2: item.option1
      ? {
          name: item.option1,
          type: "text",
        }
      : item.option1Image
      ? {
          name: item.option1Image,
          type: "image",
        }
      : item.option1Audio
      ? {
          name: item.option1Audio,
          type: "audio",
        }
      : {
          name: item.option1Video,
          type: "video",
        },
    option3: item.option2
      ? {
          name: item.option2,
          type: "text",
        }
      : item.option2Image
      ? {
          name: item.option2Image,
          type: "image",
        }
      : item.option2Audio
      ? {
          name: item.option2Audio,
          type: "audio",
        }
      : {
          name: item.option2Video,
          type: "video",
        },

    option4: item.option3
      ? {
          name: item.option3,
          type: "text",
        }
      : item.option3Image
      ? {
          name: item.option3Image,
          type: "image",
        }
      : item.option3Audio
      ? {
          name: item.option3Audio,
          type: "audio",
        }
      : {
          name: item.option3Video,
          type: "video",
        },
    correctOption: item.correctOption,
  }));

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-5">
          <AddButton href={`questions/add`} />
          <Button variant={"outline"} className="flex items-center" asChild>
            <Link href={"questions/upload"}>
              <Upload className="w-4 h-4 mr-3" />
              Upload Bulk Questions
            </Link>
          </Button>
          {/* <Button variant={"outline"} className="flex items-center" asChild>
            <Link href={"questions/edit"}>
              <Upload className="w-4 h-4 mr-3" />
              Edit Bulk Questions
            </Link>
          </Button> */}
        </div>
        <div>
          <ExportQuestions />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3">
        <Search searchKey="question" searchParams={searchParams} />
      </div>
      <div className="">
        <DataTable columns={columns} data={refactoredData} />
      </div>
    </div>
  );
};

export default QuestionsPage;
