"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useProjectlDialog from "@/hooks/use-project-dialog";
import { PlusCircle } from "lucide-react";

export const AddQuestionTypeDialog = () => {
  const { isOpen, setIsOpen } = useProjectlDialog();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};
