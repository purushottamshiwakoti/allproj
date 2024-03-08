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