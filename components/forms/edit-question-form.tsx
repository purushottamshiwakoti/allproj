"use client";

import { questionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FileUploader } from "../file-uploader";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { addQuestion, deleteQuestion, editQuestion } from "@/actions/question";
import { Question } from "@prisma/client";

interface addQuestionFormProps {
  allquestionType: {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    projectId: string | null;
  }[];
  categoriesWithSubcategories: {
    subcategories: {
      id: string;
      name: string;
      slug: string;
      created_at: Date;
      updated_at: Date;
      categoryId: string | null;
    }[];
    id: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    projectId: string | null;
  }[];
  question: Question | null;
}

export const EditQuestionForm = ({
  categoriesWithSubcategories,
  allquestionType,
  question,
}: addQuestionFormProps) => {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const [questionType, setQuestionType] = useState("");

  useEffect(() => {
    if (question !== undefined && question !== null) {
      const newQuestionType =
        (question.question?.length ?? 0) > 0
          ? "text"
          : (question.questionImage?.length ?? 0) > 0
          ? "image"
          : (question.questionAudio?.length ?? 0) > 0
          ? "audio"
          : (question.questionVideo?.length ?? 0) > 0
          ? "video"
          : "unknown"; // Provide a default value if no content type is found
      setQuestionType(newQuestionType);
      setCategory(question.categoryId);
    }
  }, [question]);

  const [isPending, startTransistion] = useTransition();
  const [category, setCategory] = useState<null | string>(null);
  const subcategory = categoriesWithSubcategories
    .filter((item) => item.id === category)
    .flatMap((sub) =>
      sub.subcategories.map((i) => ({
        id: i.id,
        name: i.name,
      }))
    );

  // for question

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: question?.question ?? "",
      questionImage: question?.questionImage ?? "",
      questionAudio: question?.questionAudio ?? "",
      questionVideo: question?.questionVideo ?? "",
      option: question?.option ?? "",
      optionImage: question?.optionImage ?? "",
      optionAudio: question?.optionAudio ?? "",
      optionVideo: question?.optionVideo ?? "",
      option1: question?.option1 ?? "",
      option1Image: question?.option1Image ?? "",
      option1Audio: question?.option1Audio ?? "",
      option1Video: question?.option1Video ?? "",
      option2: question?.option2 ?? "",
      option2Image: question?.option2Image ?? "",
      option2Audio: question?.option2Audio ?? "",
      option2Video: question?.option2Video ?? "",
      option3: question?.option3 ?? "",
      option3Image: question?.option3Image ?? "",
      option3Audio: question?.option3Audio ?? "",
      option3Video: question?.option3Video ?? "",
      categoryId: question?.categoryId ?? "",
      subCategoryId: question?.subCategoryId ?? "",
      typeOfQuestionId: question?.typeOfQuestionId ?? "",
      projectId: question?.projectId ?? "",
      correctOption: question?.correctOption ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    startTransistion(() => {
      editQuestion(
        values,
        params.id as string,
        params.questionId as string
      ).then((data) => {
        if (data?.succcess) {
          toast.success(data.succcess);
          router.push(`/${params.id}/questions`);
          router.refresh();
        }
        if (data?.error) {
          toast.success(data.error);
        }
      });
    });
  }

  const handleDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this question! This action cannot be undone"
    );

    if (confirmation) {
      startTransistion(() => {
        deleteQuestion(params.questionId as string).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);

            router.push(`/${params.id}/questions`);
            router.refresh();
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
      <div>
        {/* select type of queestion  */}
        <div className="flex gap-5 text-primary mb-2">
          <div className="flex items-center ">
            <input
              type="radio"
              name="questionType"
              className="mr-2 cursor-pointer"
              checked={questionType == "text"}
              onClick={() => setQuestionType("text")}
            />
            Text Question
          </div>
          <div className="flex items-center ">
            <input
              type="radio"
              name="questionType"
              className="mr-2 cursor-pointer"
              checked={questionType == "image"}
              onClick={() => setQuestionType("image")}
            />
            Image Question
          </div>
          <div className="flex items-center ">
            <input
              type="radio"
              name="questionType"
              className="mr-2 cursor-pointer"
              checked={questionType == "audio"}
              onClick={() => setQuestionType("audio")}
            />
            Audio Question
          </div>
          <div className="flex items-center ">
            <input
              type="radio"
              name="questionType"
              className="mr-2 cursor-pointer"
              checked={questionType == "video"}
              onClick={() => setQuestionType("video")}
            />
            Video Question
          </div>
          {/* <div className="flex items-center ">
            <input
              type="radio"
              name="questionType"
              className="mr-2 cursor-pointer"
              checked={questionType == "any"}
              onClick={() => setQuestionType("any")}
            />
            Any
          </div> */}
        </div>
        {/* end select type of queestion  */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            method="post"
            encType="multipart/form-data"
          >
            {/* add questions start  */}
            <div>
              {/* question start  */}
              <div className="space-y-2">
                {questionType == "text" && (
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter text question here"
                            {...field}
                            rows={1}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div>
                  {questionType == "image" && (
                    <FormField
                      control={form.control}
                      name="questionImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Image</FormLabel>

                          <FormControl>
                            <div>
                              <FileUploader
                                name="Add Image"
                                type="image"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {questionType == "audio" && (
                    <FormField
                      control={form.control}
                      name="questionAudio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Audio</FormLabel>
                          <FormControl>
                            {/* <Input {...field} /> */}

                            <div>
                              <FileUploader
                                name="Add Audio"
                                type="audio"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {questionType == "video" && (
                    <FormField
                      control={form.control}
                      name="questionVideo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Video</FormLabel>
                          <FormControl>
                            {/* <Input {...field} /> */}
                            <div>
                              <FileUploader
                                name="Add Video"
                                type="video"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* question end  */}

              {/* option1 start  */}
              <div className="space-y-2">
                {/* is correct  */}

                {/* is corret ends  */}
                {questionType == "text" && (
                  <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option1</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter text option1 here"
                            {...field}
                            rows={1}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "image" && (
                  <FormField
                    control={form.control}
                    name="optionImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option1 Image</FormLabel>
                        <div>{field.value}</div>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Image"
                              type="image"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "audio" && (
                  <FormField
                    control={form.control}
                    name="optionAudio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option1 Audio</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Audio"
                              type="audio"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "video" && (
                  <FormField
                    control={form.control}
                    name="optionVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option1 Video</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Video"
                              type="video"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="correctOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2 ">Correct</FormLabel>
                      <FormControl>
                        <input
                          type="radio"
                          name="optionCorrect"
                          className="mr-2 cursor-pointer"
                          checked={field.value == "option"}
                          onClick={() => field.onChange("option")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* option1 end */}

              {/* option2 srart  */}

              <div className="space-y-2">
                <div className="relative">
                  {questionType == "text" && (
                    <FormField
                      control={form.control}
                      name="option1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option2</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter text option2 here"
                              {...field}
                              rows={1}
                              disabled={isPending}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {questionType == "image" && (
                  <FormField
                    control={form.control}
                    name="option1Image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option2 Image</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Image"
                              type="image"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "audio" && (
                  <FormField
                    control={form.control}
                    name="option1Audio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option2 Audio</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Audio"
                              type="audio"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "video" && (
                  <FormField
                    control={form.control}
                    name="option1Video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option2 Video</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Video"
                              type="video"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="correctOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2 ">Correct</FormLabel>
                      <FormControl>
                        <input
                          type="radio"
                          name="optionCorrect"
                          className="mr-2 cursor-pointer"
                          checked={field.value == "option1"}
                          onClick={() => field.onChange("option1")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* option 2 end  */}

              {/* option 3 start  */}
              <div className=" space-y-2 mt-2">
                <div className="relative">
                  <div className=" "></div>
                  {questionType == "text" && (
                    <FormField
                      control={form.control}
                      name="option2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option3</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter text option3 here"
                              {...field}
                              rows={1}
                              disabled={isPending}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {questionType == "image" && (
                  <FormField
                    control={form.control}
                    name="option2Image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option3 Image</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Image"
                              type="image"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "audio" && (
                  <FormField
                    control={form.control}
                    name="option2Audio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option3 Audio</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Audio"
                              type="audio"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "video" && (
                  <FormField
                    control={form.control}
                    name="option2Video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option3 Video</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Video"
                              type="video"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="correctOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2 ">Correct</FormLabel>
                      <FormControl>
                        <input
                          type="radio"
                          name="optionCorrect"
                          className="mr-2 cursor-pointer"
                          checked={field.value == "option2"}
                          onClick={() => field.onChange("option2")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* option 3 end */}

              {/* option 4 start  */}
              <div className="mt-2">
                <div className="relative">
                  <div className=" "></div>
                  {questionType == "text" && (
                    <FormField
                      control={form.control}
                      name="option3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option4</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter text option4 here"
                              {...field}
                              rows={1}
                              disabled={isPending}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {questionType == "image" && (
                  <FormField
                    control={form.control}
                    name="option3Image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option4 Image</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Image"
                              type="image"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "audio" && (
                  <FormField
                    control={form.control}
                    name="option3Audio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option4 Audio</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Audio"
                              type="audio"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {questionType == "video" && (
                  <FormField
                    control={form.control}
                    name="option3Video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option4 Video</FormLabel>
                        <FormControl>
                          <div>
                            <FileUploader
                              name="Add Video"
                              type="video"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="correctOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2 ">Correct</FormLabel>
                      <FormControl>
                        <input
                          type="radio"
                          name="optionCorrect"
                          className="mr-2 cursor-pointer"
                          checked={field.value == "option3"}
                          onClick={() => field.onChange("option3")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* option 4 end */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                <FormField
                  control={form.control}
                  name="typeOfQuestionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Type of question
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type of question" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allquestionType.map((item) => (
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Select Category
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value), setCategory(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesWithSubcategories.map((item) => (
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
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sub Category
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sub category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category ? (
                            subcategory.map((item) => (
                              <SelectItem value={item.id} key={item.id}>
                                {item.name}
                              </SelectItem>
                            ))
                          ) : (
                            <p>Please select category first</p>
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* add questions end  */}
            {/* categories start */}

            {/* categories end*/}

            <Button type="submit" className="w-full" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
