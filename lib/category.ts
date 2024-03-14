import db from "./db";

export const getCategoryById=async(id:string)=>{
    try {
        const category=await db.category.findUnique({
            where:{
                id
            }
        });
        return category;
        
    } catch (error) {
        console.log(error);

        return null;
    }

}