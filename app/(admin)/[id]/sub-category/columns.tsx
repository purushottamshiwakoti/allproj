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
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { deleteSubCategory } from "@/actions/sub-category";

export type Category = {
  id: string;
  name: string;
  categoryName: string;
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
    accessorKey: "categoryName",
    header: "Category Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: CustomCell,
  },
];

function CustomCell({ row }: { row: any }) {
  const router = useRouter();
  const { id, categoryName } = row.original;
  const [clicked, setClicked] = useState(false);
  const params = useParams();

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this category? This action cannot be undone."
    );

    if (confirmation) {
      deleteSubCategory(id).then((data) => {
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

  const handleClick = (categoryId: string) => {
    setClicked(true);
    toast.success("Successfully copied category id");
    navigator.clipboard.writeText(categoryId);
    setTimeout(() => {
      setClicked(false);
    }, 600);
  };

  return (
    <>
      <div className="flex items-center space-x-2 cursor-pointer">
        {clicked ? (
          <Check className="h-4 w-4 p-0 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4 p-0" onClick={() => handleClick(id)} />
        )}
        <Link href={`/${params.id}/sub-category/${id}`}>
          <Edit className="w-4 h-4 text-emerald-700" />
        </Link>
        <Trash className="w-4 h-4 text-red-600" onClick={handleDelete} />
      </div>
    </>
  );
}
