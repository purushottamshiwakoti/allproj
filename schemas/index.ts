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
export const categorySchema = z.object({
    name: z.string().min(2,{
        message: "Category name must be at least 2 characters"
    }).max(50,{
        message: "Category name cannot be more than 50 characters"
    }),
   
});
export const questionTypeSchema = z.object({
    name: z.string().min(2,{
        message: "Question type must be at least 2 characters"
    }).max(50,{
        message: "Question type cannot be more than 50 characters"
    }),
   
});
export const subCategorySchema = z.object({
    name: z.string().min(2,{
        message: "Question type must be at least 2 characters"
    }).max(50,{
        message: "Question type cannot be more than 50 characters"
    }),
    categoryId:z.string().min(1,{
        message:"Please select a category"
    })
   
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
export const editUserSchema = z.object({
    fullName: z.string().min(2,{
        message: "Full Name must be at least 2 characters"
    }).max(50,{
        message: "Full Name  cannot be more than 50 characters"
    }),

    email:z.string().email(),
    role:z.string().min(1,{message:"Please select role"}),
   
});


export const questionSchema = z.object({
    question: z.optional(z.any()),
    questionImage: z.optional(z.any()),
    questionAudio: z.optional(z.any()),
    questionVideo: z.optional(z.any()),
    option: z.optional(z.any()),
    correctOption:z.string(),
    optionImage: z.optional(z.any()),
    optionAudio: z.optional(z.any()),
    optionVideo: z.optional(z.any()),
    option1: z.optional(z.any()),
    option1Image: z.optional(z.any()),
    option1Audio: z.optional(z.any()),
    option1Video: z.optional(z.any()),
    option2: z.optional(z.any()),
    option2Image: z.optional(z.any()),
    option2Audio: z.optional(z.any()),
    option2Video: z.optional(z.any()),
    option3: z.optional(z.any()),
    option3Image: z.optional(z.any()),
    option3Audio: z.optional(z.any()),
    option3Video: z.optional(z.any()),
    projectId: z.optional(z.any()),
    typeOfQuestionId:z.string().min(1,{
        message:"Please select a question type"
    }),
    categoryId:z.string().min(1,{
        message:"Please select a category"
    }),
    subCategoryId:z.string().min(1,{
        message:"Please select a question subcategory"
    })
   
  
  });