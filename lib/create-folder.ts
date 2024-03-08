import path from "path";
import fs from "fs"
export const createFolder=(name:string)=>{

    const publicDir=path.join(process.cwd(),"public");
    const folderName=path.join(publicDir,name)
   try {
    fs.mkdirSync(folderName);
    return folderName;
   } catch (error) {
    return null
   }

}