"use server"

import { getCategoryById } from "@/lib/category";
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
export const updateSubCategory=async(values: z.infer<typeof subCategorySchema>,id:string)=>{
    try {
        console.log(id)
        const validateFeilds=subCategorySchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name,categoryId}=validateFeilds.data;
        const project=await getCategoryById(categoryId);

        if(!project){
            return {error:"No category found"}
        }
        const slug=generateSlug(name)

        await db.subCategory.update({
            where:{
                id
            },
            data:{
                name,
                slug,
                categoryId: categoryId
            }
        });

        return {success:"Successfully updated subcategory"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}

export const deleteSubCategory=async(id:string)=>{
    try {
      

        await db.subCategory.delete({
            where:{
                id
            },
            
        });

        return {success:"Successfully deleted subcategory"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}