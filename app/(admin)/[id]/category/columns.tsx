"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Copy,
  Edit,
  MoreHorizontal,
  Trash,
} from "lucide-react";
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
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/category";

export type Category = {
  id: string;
  name: string;
  subcategories: string[];
  sn: number;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "sn",
    header: "S.N",
  },
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
    accessorKey: "subcategories",
    header: "Subcategories",
  },
  {
    id: "actions",
    header: "Actions",
    cell: CustomCell,
  },
];

function CustomCell({ row }: { row: any }) {
  const { id, name } = row.original;
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const params = useParams();

  const handleClick = () => {
    setClicked(true);
    toast.success("Successfully copied category id");
    navigator.clipboard.writeText(id);
    setTimeout(() => {
      setClicked(false);
    }, 600);
  };

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (confirmation) {
      deleteCategory(id as string).then((data) => {
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
    <>
      <div className="flex items-center space-x-2 cursor-pointer">
        {clicked ? (
          <Check className="h-4 w-4 p-0 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4 p-0" onClick={handleClick} />
        )}
        <Link href={`/${params.id}/category/${id}`}>
          <Edit className="w-4 h-4 text-emerald-700" />
        </Link>
        <Trash className="w-4 h-4 text-red-600" onClick={handleDelete} />
      </div>
    </>
  );
}
