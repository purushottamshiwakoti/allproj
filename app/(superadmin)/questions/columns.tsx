"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  question: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
  correctOption: string;
  project: string | null | undefined;
  sn: number;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "sn",
    header: "S.N",
  },
  {
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "option1",
    header: "Option 1",
  },
  {
    accessorKey: "option2",
    header: "Option 2",
  },
  {
    accessorKey: "option3",
    header: "Option 3",
  },
  {
    accessorKey: "option4",
    header: "Option 4",
  },
  {
    accessorKey: "project",
    header: "Project",
  },

  //   {
  //     id: "actions",
  //     cell: CustomCell,
  //   },
];

function CustomCell({ row }: { row: any }) {
  const user = row.original;
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={`/${params.id}/questions/${user.id}`}
            className="cursor-pointer"
          >
            Edit Question
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
