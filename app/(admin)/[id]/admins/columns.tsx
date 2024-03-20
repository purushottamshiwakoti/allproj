"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  sn: number;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "sn",
    header: "S.N",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActionsRow row={row} />,
  },
];

function UserActionsRow({ row }: { row: any }) {
  const user = row.original;
  const params = useParams();

  return (
    <>
      <div className="flex items-center space-x-2">
        <Link href={`/${params.id}/admins/${user.id}`}>
          <Edit className="w-5 h-5  text-emerald-700" />
        </Link>
        {/* <Link href={"/"}>
          <Trash className="w-5 h-5 text-red-600  " />
        </Link> */}
      </div>
    </>
  );
}
