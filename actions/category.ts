"use server"

import { getCategoryById } from "@/lib/category";
import db from "@/lib/db";
import { generateSlug } from "@/lib/generate-slug";
import { getProjectById } from "@/lib/project";
import { categorySchema } from "@/schemas"
import * as z from "zod"

export const addCategory=async(values: z.infer<typeof categorySchema>,id:string)=>{
    try {
        const validateFeilds=categorySchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name}=validateFeilds.data;

        const project=await getProjectById(id);

        if(!project){
            return {error:"No project found"}
        }
        const slug=generateSlug(name)

        await db.category.create({
            data:{
                name,
                slug,
                projectId:id
            }
        });

        return {success:"Successfully created category"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}

export const editCategory=async(values: z.infer<typeof categorySchema>,id:string,projectId:string)=>{
    try {
        const validateFeilds=categorySchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name}=validateFeilds.data;

        const project=await getProjectById(projectId);

        if(!project){
            return {error:"No project found"}
        }
        const existingCategory=await getCategoryById(id)
        if(!existingCategory){
            return {error:"No category found"}
        }
        const slug=generateSlug(name)

        await db.category.update({
            where:{
                id:existingCategory.id,
            },

            data:{
                name,
                slug,
                projectId
            }
        });

        return {success:"Successfully updated category"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}
export const deleteCategory=async(id:string)=>{
    try {

        const existingCategory=await getCategoryById(id)
        if(!existingCategory){
            return {error:"No category found"}
        }
        

        await db.category.delete({
            where:{
                id:existingCategory.id,
            },          
        });

        return {success:"Successfully delete category"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}

