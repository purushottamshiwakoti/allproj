"use client";

import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { addAdmin } from "@/actions/admin";
import { toast } from "sonner";

export const AddUserForm = () => {
  const path = usePathname();
  const params = useParams();
  const id = params.id;
  console.log(id);
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      addAdmin(values, id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          if (id !== undefined) {
            router.push(`/${id}/admins`);
            router.refresh();
          } else {
            router.push("/admins");
            router.refresh();
          }
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name here"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email here"
                  type="email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password here"
                  type="password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {id == undefined && (
                    <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
                  )}
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="SUBADMIN">SUBADMIN</SelectItem>
                </SelectContent>
              </Select>

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
