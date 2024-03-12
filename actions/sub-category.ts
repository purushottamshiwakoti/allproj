"use server"

import db from "@/lib/db";
import { generateSlug } from "@/lib/generate-slug";
import { getProjectById } from "@/lib/project";
import { categorySchema, subCategorySchema } from "@/schemas"
import * as z from "zod"

export const addSubCategory=async(values: z.infer<typeof subCategorySchema>,id:string)=>{
    try {
        const validateFeilds=subCategorySchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name,categoryId}=validateFeilds.data;

        const project=await getProjectById(id);

        if(!project){
            return {error:"No project found"}
        }
        const slug=generateSlug(name)

        await db.subCategory.create({
            data:{
                name,
                slug,
                categoryId: categoryId
            }
        });

        return {success:"Successfully created subcategory"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}