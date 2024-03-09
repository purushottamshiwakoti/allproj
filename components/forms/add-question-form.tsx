"use client";

import { questionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "../ui/input";

export const AddQuestionForm = () => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [questionType, setQuestionType] = useState("text");

  //  all states here image audio video

  // for question

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      questionImage: "",
      questionAudio: "",
      questionVideo: "",
      option: "",
      optionCorrect: false,
      optionImage: "",
      optionAudio: "",
      optionVideo: "",
      option1: "",
      option1Correct: false,
      option1Image: "",
      option1Audio: "",
      option1Video: "",
      option2: "",
      option2Correct: false,
      option2Image: "",
      option2Audio: "",
      option2Video: "",
      option3: "",
      option3Correct: false,
      option3Image: "",
      option3Audio: "",
      option3Video: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div>
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            method="post"
            encType="multipart/form-data"
          >
            {/* question start  */}
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
                      {/* <div className="bg-red-500 rounded-md shadow-lg">
                    <CustomEditor
                      initialData={field.value}
                      onEditorChange={field.onChange}
                    />
                  </div> */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="grid grid-cols-3 gap-3">
              {questionType == "image" && (
                <FormField
                  control={form.control}
                  name="questionImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* question end  */}

            {/* option1 start  */}
            <div className="grid grid-cols-4 gap-3">
              <div className="relative">
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
                <div className="absolute right-0 top-0">
                  <FormField
                    control={form.control}
                    name="optionCorrect"
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
              </div>
              {questionType == "image" && (
                <FormField
                  control={form.control}
                  name="optionImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* option1 end */}

            {/* option2 srart  */}

            <div className="grid grid-cols-4 gap-3">
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
                <div className="absolute right-0 top-0">
                  <FormField
                    control={form.control}
                    name="option1Correct"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-2"> Correct</FormLabel>
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
              </div>
              {questionType == "image" && (
                <FormField
                  control={form.control}
                  name="option1Image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option2 Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* option 2 end  */}

            {/* option 3 start  */}
            <div className="grid grid-cols-4 gap-3">
              <div className="relative">
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
                <div className="absolute right-0 top-0">
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
              </div>
              {questionType == "image" && (
                <FormField
                  control={form.control}
                  name="option2Image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option3 Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* option 3 end */}

            {/* option 4 start  */}
            <div className="grid grid-cols-4 gap-3">
              <div className="relative">
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
                <div className="absolute right-0 top-0">
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
              </div>
              {questionType == "image" && (
                <FormField
                  control={form.control}
                  name="option3Image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option4 Image</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* option 4 end */}

            <Button type="submit" className="w-full" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
