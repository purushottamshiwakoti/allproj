import db from "./db";

export const getSubCategoryById=async(id:string)=>{
    try {
        const subCategory=await db.subCategory.findUnique({
            where:{
                id
            }
        });
        return subCategory;
        
    } catch (error) {
        console.log(error);

        return null;
    }

}