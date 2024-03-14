"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Copy, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [clicked, setClicked] = useState(false);

      const params = useParams();

      const handleClick = (id: string) => {
        setClicked(true);
        toast.success("Successfully copied question type id");
        navigator.clipboard.writeText(id);

        // Reset the clicked state after a short delay to allow the animation to play
        setTimeout(() => {
          setClicked(false);
        }, 600); // Adjust the duration of the animation (in milliseconds) as needed
      };

      return (
        <div className="flex items-center space-x-2 cursor-pointer ">
          {clicked ? (
            <Check className="h-4 w-4 p-0 text-emerald-500" />
          ) : (
            <Copy
              className="h-4 w-4 p-0"
              onClick={() => handleClick(user.id)}
            />
          )}
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
                  href={`/${params.id}/question-type/${user.id}`}
                  className="cursor-pointer"
                >
                  Edit Question Type
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
