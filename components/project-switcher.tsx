"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import db from "@/lib/db";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProject } from "@/actions/project";
import { Project } from "@prisma/client";

import _ from "lodash";
import { useGetCurrentUser } from "@/hooks/get-auth-user";

export const ProjectSwitcher = ({ data }: { data: Project[] }) => {
  const user = useGetCurrentUser();
  const params = useParams();
  const id: string | undefined = Array.isArray(params.id)
    ? params.id[0]
    : params.id;
  const filteredProject = data.find((project) => project.id === id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-full flex items-center justify-start"
            variant={"secondary"}
          >
            {id ? (
              <>
                {filteredProject?.name}
                {user?.role == "SUPERADMIN" && (
                  <ChevronsUpDown className="w-4 h-4 ml-3" />
                )}
              </>
            ) : (
              <>
                Switch Projects
                <ChevronsUpDown className="w-4 h-4 ml-3" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        {user?.role == "SUPERADMIN" && (
          <DropdownMenuContent className="w-[14rem]">
            <DropdownMenuSeparator />
            {data.length > 0 ? (
              filteredProject ? (
                <>
                  {data
                    .filter((item) => item.id !== filteredProject.id)
                    .map((item) => (
                      <DropdownMenuItem key={item.id} asChild>
                        <Link href={`/${item.id}`} className="cursor-pointer">
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  {user?.role == "SUPERADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href={"/dashboard"} className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                </>
              ) : (
                data.map((item) => (
                  <DropdownMenuItem key={item.id} asChild>
                    <Link href={item.id} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              )
            ) : (
              <div>No projects added yet!</div>
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};
