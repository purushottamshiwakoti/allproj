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