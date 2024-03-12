"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useProjectlDialog from "@/hooks/use-project-dialog";
import { Category } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { AddSubCategoryForm } from "../forms/add-subcategory-form";

export const AddSubCategoryDialog = ({ data }: { data: Category[] }) => {
  const { isOpen, setIsOpen } = useProjectlDialog();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Sub Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AddSubCategoryForm data={data} />
        </DialogContent>
      </Dialog>
    </>
  );
};
