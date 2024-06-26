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
import { addCategory } from "@/actions/category";

export const AddCategoryForm = () => {
  const { setIsOpen } = useProjectlDialog();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categorySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      addCategory(values, id as string).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
          setIsOpen();
        }
      });
    });
  }
  return (
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
          Submit
        </Button>
      </form>
    </Form>
  );
};
