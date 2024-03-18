"use server"

import { createFolder } from "@/lib/create-folder";
import db from "@/lib/db";
import { generateSlug } from "@/lib/generate-slug";
import { getProjectBySlug } from "@/lib/project";
import { projectSchema } from "@/schemas";
import * as z from "zod"


export const addProject=async(values:z.infer<typeof projectSchema>)=>{
    try {
       
        const validateFeilds=projectSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };

        const {name}=validateFeilds.data
        const slug=generateSlug(name);

        const existingProject=await getProjectBySlug(slug)

        if(existingProject){
            return {error:"Project already exists"}
        }

        const folder=createFolder(slug)
        if(!folder){
            return {error:"Something went wrong creating folder"}
        }

      if(!folder){
        return {error:"Something went wrong"}
      }
        await db.project.create({
            data:{
                name,
                slug,
                folders:{
                    create:{
                        name:name,
                        slug:slug,

                    }
                }
            }
        });

        return{success:"Successfully created project"}

       

        
    } catch (error) {
        console.error(error);
        return {error:"Something went wrong"}
    }
}


export const getProject=async()=>{
    try {
        const projects = await db.project.findMany({
          orderBy: {
            updated_at: "desc",
          },
        });
        return projects;
      } catch (error) {
        throw new Error("Error fetching projects from database");
      }
}

export const editProject=async(values:z.infer<typeof projectSchema>,id:string)=>{
  try {
     
      const validateFeilds=projectSchema.safeParse(values);
      if(!validateFeilds.success){
          return {error:"Invalid feilds"}
      };

      const {name}=validateFeilds.data
      const slug=generateSlug(name);

      // const existingProject=await getProjectBySlug(slug)

      // if(existingProject){
      //     return {error:"Project already exists"}
      // }

      const folder=createFolder(slug)
      if(!folder){
          return {error:"Something went wrong creating folder"}
      }

    if(!folder){
      return {error:"Something went wrong"}
    }
      await db.project.update({
        where:{
          id
        },
          data:{
              name,
              slug,
              folders:{
                  create:{
                      name:name,
                      slug:slug,

                  }
              }
          }
      });

      return{success:"Successfully updated project"}

     

      
  } catch (error) {
      console.error(error);
      return {error:"Something went wrong"}
  }
}


export const deleteProject=async(id:string)=>{
  try {
     
     
      await db.project.delete({
        where:{
          id
        }
         
      });

      return{success:"Successfully deleted project"}

     

      
  } catch (error) {
      console.error(error);
      return {error:"Something went wrong"}
  }
}