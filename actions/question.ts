"use server"

import db from "@/lib/db";
import { questionSchema } from "@/schemas";
import * as z from "zod"

export const addQuestion=async(values: z.infer<typeof questionSchema>,id:string)=>{
    try {
        const validateFeilds=questionSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
         values.projectId=id;

        await db.question.create({
            data:{
                ...values
            }
        });

        return {succcess:"Successfully created questions "}
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}

export const addBulkQuestion = async (values: z.infer<typeof questionSchema>, id: string) => {
    try {
      // Validate values against questionSchema
    //   const validationResult = questionSchema.safeParse(values);
    //   if (!validationResult.success) {
    //     throw new Error("Validation failed: " + validationResult.error.errors.join(", "));
    //   }
  
      // Set projectId
    //   values.projectId = id;


      console.log(values)
  
     const upload= await db.question.createMany({
        data: values 
      });
  
     if(upload){
      console.log(upload)
        return { success: "Successfully created question " };
     }
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong" };
    }
  };


  export const editQuestion=async(values: z.infer<typeof questionSchema>,id:string,qid:string)=>{
    try {
        const validateFeilds=questionSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
         values.projectId=id;

        await db.question.update({
          where:{
            id:qid
          },
            data:{
                ...values
            }
        });

        return {succcess:"Successfully updated question "}
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}


export const deleteQuestion=async(id:string)=>{
  try {
    await db.question.delete({
      where:{
        id
      }
    });
    return {success:"Successfully deleted question "}
    
  } catch (error) {
    console.log(error);
        return {error:"Something went wrong"}
  }
}