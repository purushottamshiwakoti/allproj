"use server"

import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateToken=async(id:string)=>{
    const token=uuidv4()

    try {
        await db.token.create({
            data:{
                token,
                projectId:id
            }
        });

        return {success:"Successfully created token"}
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}