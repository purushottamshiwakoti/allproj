import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(2,{
        message: "Project name must be at least 2 characters"
    }).max(50,{
        message: "Project name cannot be more than 50 characters"
    }),
   
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2,{
        message: "Password must be at least 2 characters"
    })
   
});
export const folderSchema = z.object({
    name: z.string().min(2,{
        message: "Folder name must be at least 2 characters"
    }).max(50,{
        message: "Folder name cannot be more than 50 characters"
    }),
   
});
export const userSchema = z.object({
    fullName: z.string().min(2,{
        message: "Full Name must be at least 2 characters"
    }).max(50,{
        message: "Full Name  cannot be more than 50 characters"
    }),

    email:z.string().email(),
    password:z.string().min(8,{message:"Password must be at least 8 characters"}),
    role:z.string().min(1,{message:"Please select role"}),
   
});
