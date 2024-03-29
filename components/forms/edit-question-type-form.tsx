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
import { categorySchema, questionTypeSchema } from "@/schemas";
import { addCategory } from "@/actions/category";
import {
  addQuestionType,
  deleteQuestionType,
  editQuestionType,
} from "@/actions/question-type";

export const EditQuestionTypeForm = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const { setIsOpen } = useProjectlDialog();
  const router = useRouter();
  const params = useParams();

  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof questionTypeSchema>>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: {
      name: name,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionTypeSchema>) {
    startTransistion(() => {
      editQuestionType(values, params.questionTypeId as string).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.push(`/${params.id}/question-type`);
          router.refresh();
        }
      });
    });
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter question type here"
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
