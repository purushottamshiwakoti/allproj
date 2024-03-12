"use server"

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