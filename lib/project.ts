import db from "./db";

export const getProjectBySlug=async(slug:string)=>{
    try {
        const project=await db.project.findUnique({
            where:{
                slug
            }
        });
        return project;
        
    } catch (error) {
        return null;
    }

}
export const getProjectById=async(id:string)=>{
    console.log(id);
    try {
        const project=await db.project.findUnique({
            where:{
                id
            }
        });
        console.log(project);
        return project;
        
    } catch (error) {
        console.log(error);

        return null;
    }

}