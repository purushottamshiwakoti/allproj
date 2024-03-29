"use server"

import * as z from "zod"

import { folderSchema } from "@/schemas";
import { getFolderById } from "@/lib/file";
import db from "@/lib/db";
import { generateSlug } from "@/lib/generate-slug";
import { createFolder } from "@/lib/create-folder";

import path from "path";
import fs from "fs"

export const addFolder=async(values: z.infer<typeof folderSchema>,id:string)=>{
    try {
        const validateFeilds=folderSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };
        const {name}=validateFeilds.data;
        const folder=await getFolderById(id);
        if(!folder){
            return {error:"No folder found"}
        }
        const slug=generateSlug(name)
        console.log(slug)

       const publicDir=path.join(process.cwd(),"public",folder.slug)
       const folderName=path.join(publicDir,slug)
      
       try {
        const folderExists=fs.existsSync(folderName)
        if(folderExists){
            return {error:"Folder already exists"}
        }


    fs.mkdirSync(folderName);
    } catch (error) {
        console.log(error);
        return { error: "Failed to create folder" };
    }


        await db.subFolder.create({
            data:{
                name,
                slug,
                folderId:id
            }
        });

        return {success:"Successfully created folder"}

        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }
}


export const deleteFile=async(id:string)=>{

    try{
await db.files.delete({
    where:{
        id
    }
});
return {success:"Successfully deleted file"}

    }catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}
