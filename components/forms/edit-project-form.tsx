"use client";

import { projectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { addProject, deleteProject, editProject } from "@/actions/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useProjectlDialog from "@/hooks/use-project-dialog";

export const EditProjectForm = ({ id, name }: { id: string; name: string }) => {
  const { setIsOpen } = useProjectlDialog();
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: name,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof projectSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      editProject(values, id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }

        if (data?.success) {
          toast.success(data.success);
          router.push("/projects");
          router.refresh();
          // setIsOpen();
        }
      });
    });
  }

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this project! This action cannot be undone"
    );

    if (confirmation) {
      startTransistion(() => {
        deleteProject(id).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh();
            router.push(`/projects`);
          }
        });
      });
    }
  };
  return (
    <>
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
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project name here"
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
    </>
  );
};
