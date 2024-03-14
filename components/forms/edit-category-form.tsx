"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addFolder } from "@/actions/file";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProjectlDialog from "@/hooks/use-project-dialog";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { categorySchema } from "@/schemas";
import { addCategory, deleteCategory, editCategory } from "@/actions/category";

interface Category {
  id: string;
  name: string;

  projectId: string | null;
}

export const EditCategoryForm = ({ id, name, projectId }: Category) => {
  const router = useRouter();
  const params = useParams();
  // const id = params.id;
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: name,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categorySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      editCategory(values, id as string, projectId as string).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();

          router.push(`/${projectId}/category`);
        }
      });
    });
  }

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this category! This action cannot be undone"
    );

    if (confirmation) {
      startTransistion(() => {
        deleteCategory(id as string).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh();

            router.push(`/${projectId}/category`);
          }
        });
      });
    }
  };

  return (
    <div>
      <div className="flex items-end justify-end">
        <Button
          variant={"destructive"}
          onClick={handleDelete}
          disabled={isPending}
        >
          Delete
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category name here"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
