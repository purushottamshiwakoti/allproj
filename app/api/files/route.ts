import { NextRequest, NextResponse } from "next/server";

import path from "path";
import fs from "fs"
import db from "@/lib/db";

export async function POST(req:NextRequest){
  try{
    let projectName;
    let folderName;
  const data: any = await req.formData();
  console.log(data);
  for (const [name, file] of data.entries()) {
    console.log(name)

    if(name=="folderId"){
       const folder= await db.subFolder.findFirst({
            where:{
                id:file
            }
        })

       folderName=folder?.slug;
    }
    if(name=="projectId"){
        console.log(file)
            const project=await db.project.findUnique({
            where:{
                id:file
            }
        });
        console.log(projectName)
        projectName=project?.slug
    }

    // if(name=="projectId"){
    //     console.log(file);
    //     const project=await db.project.findUnique({
    //         where:{
    //             id:file
    //         }
    //     });
    //     console.log(project)

    //     projectName=project?.slug
    //     console.log(projectName);
    // }
    console.log(projectName)
    console.log(folderName)
   if(projectName&&folderName){
    const dir=path.join(process.cwd(),"public",projectName,folderName)
    console.log(dir)
   }else{
    return NextResponse.json({message:"Something went wrong"},{status:400})

   }

  }
  
  return NextResponse.json({message:"yes"},{status:200})
    } catch (error) {
        console.log("error is",error);
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}