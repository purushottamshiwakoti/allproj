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

    // const data = [
    //     { id: 1, name: "John Doe", email: "john@example.com" },
    //     { id: 2, name: "Jane Smith", email: "jane@example.com" },
    //     // Add more data as needed
    //   ];
    const csv = [
        Object.keys(data[0]).join(","),
        ...data.map((obj) => Object.values(obj).join(",")),
      ].join("\n");
      const csvContent = csv;
      return csvContent
}