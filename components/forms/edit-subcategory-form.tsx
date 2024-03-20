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
import { categorySchema, subCategorySchema } from "@/schemas";
import { addCategory } from "@/actions/category";
import { Category, SubCategory } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "@/actions/sub-category";

export const EditSubCategoryForm = ({
  data,
  subCategory,
}: {
  data: Category[];
  subCategory: SubCategory;
}) => {
  const { setIsOpen } = useProjectlDialog();
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const id = params.id;

  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: subCategory.name,
      categoryId: subCategory.categoryId!,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof subCategorySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      updateSubCategory(values, params.categoryId as string).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.push(`/${params.id}/sub-category`);
          router.refresh();
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
        deleteSubCategory(params.categoryId as string).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh();
            router.push(`/${params.id}/sub-category`);
          }
        });
      });
    }
  };
  return (
    <div>
      {/* <div className="flex items-end justify-end">
        <Button
          variant={"destructive"}
          onClick={handleDelete}
          disabled={isPending}
        >
          Delete
        </Button>
      </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((item) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter sub category name here"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
