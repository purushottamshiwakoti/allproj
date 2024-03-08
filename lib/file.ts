import db from "./db";

export const getFolderName=(name:string)=>{
    let folderName=name.split("\\")
           return folderName[folderName.length-1].split("-").join(" ");

}

export const getFolderById=async(id:string)=>{
    try {
        const folder=await  db.folder.findUnique({
            where:{
                id
            }
        });
        return folder;
    } catch (error) {
        return null;
    }

}