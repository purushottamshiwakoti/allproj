export const getFolderName=(name:string)=>{
    let folderName=name.split("\\")
           return folderName[folderName.length-1].split("-").join(" ");

}