import db from "./db"

export const getAdminByEmail=async(email:string)=>{
    try {
        const user=await db.user.findUnique({
            where:{
                email
            }
        });
        return user;
        
    } catch (error) {
        return null
    }


}
export const getAdminById=async(id:string)=>{
    try {
        const user=await db.user.findUnique({
            where:{
                id
            }
        });
        return user;
        
    } catch (error) {
        return null
    }


}