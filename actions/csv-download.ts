"use server"

import db from "@/lib/db";

export const downloadFiles=async(id:any)=>{

    const data=await db.files.findMany({
        where:{
subFolderId:id
        }
    })

        if (data.length === 0) {
            throw new Error("No files found");
        }

   
    const csv = [
        Object.keys(data[0]).join(","),
        ...data.map((obj) => Object.values(obj).join(",")),
      ].join("\n");
      const csvContent = csv;
      return csvContent
}

export const downloadQuestions=async(id:any)=>{

    const data=await db.question.findMany({
        where:{
projectId:id
        }
    })

        if (data.length === 0) {
            throw new Error("No files found");
        }

   
    const csv = [
        Object.keys(data[0]).join(","),
        ...data.map((obj) => Object.values(obj).join(",")),
      ].join("\n");
      const csvContent = csv;
      return csvContent
}