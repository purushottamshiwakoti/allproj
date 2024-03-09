import { auth } from "@/auth"

export const AuthUser=async()=>{
    const session=await auth()
    console.log(session);
    return session?.user;

}