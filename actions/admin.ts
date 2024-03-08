"use server"

import { getAdminByEmail } from "@/lib/admin";
import { userSchema } from "@/schemas";
import * as z from "zod"
import db from "@/lib/db";

import bcrypt from "bcryptjs"

export const addAdmin=async(values: z.infer<typeof userSchema>,id:any)=>{
    try {
        console.log(id)
        const validateFeilds=userSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };

        const {fullName,email,role,password}=validateFeilds.data
        
        const existigAdmin=await getAdminByEmail(email);
        if(existigAdmin){
            return {error:"Admin already exists"}
        }
        const hashedPassword=await bcrypt.hash(password,10)
        if(role=="SUPERADMIN"){
            await db.user.create({
                data:{
                    email,
                    fullName,
                    role,
                    password:hashedPassword,
                }
            });

            return {success:"Successfully created superadmin"}
        }else if(role=="ADMIN") {
            if(id!==undefined){

                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                        projects:{
                            connect:{
                                id
                            }
                        }
                    }
                });
            }else{
                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                       
                    }
                });
            }
            

            return {success:"Successfully created admin"}
        }else if(role=="SUBADMIN"){
            if(id!==undefined){

                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                        projects:{
                            connect:{
                                id
                            }
                        }
                    }
                });
            }else{
                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                       
                    }
                });
            }
          


            return {success:"Successfully created subadmin"}
        }

        return {error:"You cannot create other for now"}
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}