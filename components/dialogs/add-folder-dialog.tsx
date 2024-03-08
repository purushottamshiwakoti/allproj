"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useProjectlDialog from "@/hooks/use-project-dialog";
import { PlusCircle } from "lucide-react";
import { AddProjectForm } from "../forms/add-project-form";
import { AddFolderForm } from "../forms/add-folder-form";

export const AddFolderDialog = ({ id }: { id: string }) => {
  const { isOpen, setIsOpen } = useProjectlDialog();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Folder
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AddFolderForm id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};
