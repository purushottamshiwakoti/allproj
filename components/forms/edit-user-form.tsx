"use client";

import { editUserSchema, userSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { addAdmin, editUser } from "@/actions/admin";
import { toast } from "sonner";
import { ROLE } from "@prisma/client";

interface EditUserProps {
  id: string;
  fullName: string;
  email: string;
  role: ROLE;
}

export const EditUserForm = ({ email, fullName, role, id }: EditUserProps) => {
  const path = usePathname();
  const [changePassword, setChangePassword] = useState(false);
  const params = useParams();
  const pageId = params.id;
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: fullName,
      email: email,
      role: role,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof editUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      editUser(values, id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          if (id !== undefined) {
            router.push(`/${pageId}/admins`);
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
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
        {/* <FormField
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
        /> */}
        <Button type="submit" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};
