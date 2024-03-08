"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProjectForm } from "../forms/add-project-form";
import useProjectlDialog from "@/hooks/use-project-dialog";

export const AddProjectDialog = () => {
  const { isOpen, setIsOpen } = useProjectlDialog();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AddProjectForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
