"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, FileAudio, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteQuestion } from "@/actions/question";
import { toast } from "sonner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { nextUrl } from "@/lib/url";

// This type is used to define the shape of our data.
export type Category = {
  id: string;
  question: {
    name: string | null;
    type: any;
  };
  option1: {
    name: string | null;
    type: any;
  };
  option2: {
    name: string | null;
    type: any;
  };
  option3: {
    name: string | null;
    type: any;
  };
  option4: {
    name: string | null;
    type: any;
  };
  correctOption: string | null;
  sn: number;
};

// Function to render question or option content based on its type
const renderContent = (data: {
  name: string | null;
  type: "audio" | "video" | "text" | "image";
}) => {
  if (!data.name) return null;

  switch (data.type) {
    case "text":
      return <p>{data.name}</p>;
    case "image":
      return (
        <div className="relative w-20 h-20">
          <Image src={`${nextUrl}/${data.name}`} alt="/image" fill />
        </div>
      );
    case "audio":
      return (
        <>
          <audio controls className="relative w-32 h-10 ">
            <source src={`${nextUrl}/${data.name}`} />
            Your browser does not support the audio element.
          </audio>
        </>
      );
    case "video":
      return (
        <video className="relative w-32 h-32 ">
          <source src={`${nextUrl}/${data.name}`} />
          Your browser does not support the video element.
        </video>
      );
    default:
      return null;
  }
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "sn",
    header: "S.N",
    accessorFn: (row) => row.sn,
  },
  {
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{renderContent(row.original.question)}</div>,
    accessorFn: (row) => row.question,
  },
  {
    accessorKey: "option1",
    header: "Option 1",
    cell: ({ row }) => <div>{renderContent(row.original.option1)}</div>,
    accessorFn: (row) => row.option1,
  },
  {
    accessorKey: "option2",
    header: "Option 2",
    cell: ({ row }) => <div>{renderContent(row.original.option2)}</div>,
    accessorFn: (row) => row.option2,
  },
  {
    accessorKey: "option3",
    header: "Option 3",
    cell: ({ row }) => <div>{renderContent(row.original.option3)}</div>,
    accessorFn: (row) => row.option3,
  },
  {
    accessorKey: "option4",
    header: "Option 4",
    cell: ({ row }) => <div>{renderContent(row.original.option4)}</div>,
    accessorFn: (row) => row.option4,
  },
  {
    id: "actions",
    cell: CustomCell,
    header: "Actions",
    accessorFn: (row) => row.id, // Assuming `id` is the unique identifier for each row
  },
];

function CustomCell({ row }: { row: any }) {
  const user = row.original;
  const params = useParams();
  const router = useRouter();

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this question! This action cannot be undone"
    );

    if (confirmation) {
      deleteQuestion(user.id as string).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
        }
      });
    }
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer ">
      <Link href={`/${params.id}/questions/${user.id}`}>
        <Edit className="w-4 h-4 text-emerald-700" />
      </Link>
      <Trash className="w-4 h-4 text-red-600" onClick={handleDelete} />
    </div>
  );
}
