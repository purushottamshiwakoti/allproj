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
import { addQuestion } from "@/actions/question";
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
      optionCorrect: question?.optionCorrect ?? false,
      optionImage: question?.optionImage ?? "",
      optionAudio: question?.optionAudio ?? "",
      optionVideo: question?.optionVideo ?? "",
      option1: question?.option1 ?? "",
      option1Correct: question?.option1Correct ?? false,
      option1Image: question?.option1Image ?? "",
      option1Audio: question?.option1Audio ?? "",
      option1Video: question?.option1Video ?? "",
      option2: question?.option2 ?? "",
      option2Correct: question?.option2Correct ?? false,
      option2Image: question?.option2Image ?? "",
      option2Audio: question?.option2Audio ?? "",
      option2Video: question?.option2Video ?? "",
      option3: question?.option3 ?? "",
      option3Correct: question?.option3Correct ?? false,
      option3Image: question?.option3Image ?? "",
      option3Audio: question?.option3Audio ?? "",
      option3Video: question?.option3Video ?? "",
      categoryId: question?.categoryId ?? "",
      subCategoryId: question?.subCategoryId ?? "",
      typeOfQuestionId: question?.typeOfQuestionId ?? "",
      projectId: question?.projectId ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    startTransistion(() => {
      addQuestion(values, params.id as string).then((data) => {
        if (data?.succcess) {
          toast.success(data.succcess);
        }

        if (data?.error) {
          toast.success(data.error);
        }
      });
    });
  }

  return (
    <div>
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
            <div className="grid grid-cols-2 gap-10">
              {/* add questions start  */}
              <div>
                {/* question start  */}
                <div>
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
                              rows={10}
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
                <div>
                  {/* is correct  */}
                  <FormField
                    control={form.control}
                    name="optionCorrect"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-2 ">Correct</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* is corret ends  */}
                  {questionType == "text" && (
                    <FormField
                      control={form.control}
                      name="option"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter text option1 here"
                              {...field}
                              rows={10}
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
                          <FormLabel>Option Image</FormLabel>
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
                          <FormLabel>Option Audio</FormLabel>
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
                          <FormLabel>Option Video</FormLabel>
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
                </div>

                {/* option1 end */}

                {/* option2 srart  */}

                <div className="">
                  <FormField
                    control={form.control}
                    name="option1Correct"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-2">Correct</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                                rows={10}
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
                </div>
                {/* option 2 end  */}

                {/* option 3 start  */}
                <div className="">
                  <div className="relative">
                    <div className=" ">
                      <FormField
                        control={form.control}
                        name="option2Correct"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mr-2">Correct</FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                                rows={10}
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
                </div>
                {/* option 3 end */}

                {/* option 4 start  */}
                <div className="">
                  <div className="relative">
                    <div className=" ">
                      <FormField
                        control={form.control}
                        name="option3Correct"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mr-2">Correct</FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                                rows={10}
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
                </div>
                {/* option 4 end */}
              </div>
              {/* add questions end  */}
              {/* categories start */}
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="typeOfQuestionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of question</FormLabel>
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
                      <FormLabel>Select Category</FormLabel>
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
                      <FormLabel>Sub Category</FormLabel>
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
              {/* categories end*/}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
