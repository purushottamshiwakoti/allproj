"use server"

import db from "@/lib/db";
import { generateSlug } from "@/lib/generate-slug";
import { getProjectById } from "@/lib/project";
import { categorySchema } from "@/schemas"
import * as z from "zod"

export const addQuestionType=async(values: z.infer<typeof categorySchema>,id:string)=>{
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

        await db.typeOfQuestion.create({
            data:{
                name,
                slug,
                projectId:id
            }
        });

        return {success:"Successfully created questiontype"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}

export const editQuestionType=async(values: z.infer<typeof categorySchema>,id:string)=>{
    try {
        const validateFeilds=categorySchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name}=validateFeilds.data;

      console.log(id);
        const slug=generateSlug(name)

        await db.typeOfQuestion.update({
            where:{
                id
            },
            data:{
                name,
                slug,
            }
        });

        return {success:"Successfully updated questiontype"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}

export const deleteQuestionType=async(id:string)=>{
    try {
       
        await db.typeOfQuestion.delete({
            where:{
                id
            }
        });

        return {success:"Successfully deleted questiontype"}

        
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
    
}